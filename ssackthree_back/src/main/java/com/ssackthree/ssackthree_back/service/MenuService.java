package com.ssackthree.ssackthree_back.service;

import com.ssackthree.ssackthree_back.dto.*;
import com.ssackthree.ssackthree_back.entity.*;
import com.ssackthree.ssackthree_back.enums.MenuStatusEnum;
import com.ssackthree.ssackthree_back.enums.MenuTypeEnum;
import com.ssackthree.ssackthree_back.repository.*;
import com.ssackthree.ssackthree_back.service.customizedClass.MenuIdDistance;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class MenuService {
    private final MenuRepository menuRepository;
    private final StoreRepository storeRepository;
    private final StoreLocationRepository storeLocationRepository;
    private final MenuLocationRepository menuLocationRepository;
    private final MenuFileRepository menuFileRepository;
    private final MenuStatusRepository menuStatusRepository;
    private final MenuBargainningRepository menuBargainningRepository;

    public static final double EARTH_RADIUS = 6371.0088; // 지구 반지름 상수 선언

    @Value("${upload-path}")
    private String uploadPath;

    public void registerMenu(MenuRegisterRequestDto menuRegisterRequestDto, MultipartFile[] menus){

        MenuTypeEnum menuTypeEnum = getMenuType(menuRegisterRequestDto.getType());

        // 메뉴 내용
        Optional<StoreEntity> storeEntity = storeRepository.findByUserEntityId(menuRegisterRequestDto.getUserId());
        MenuEntity menuEntity = MenuEntity.builder()
                .name(menuRegisterRequestDto.getMenuName())
                .originalPrice(menuRegisterRequestDto.getOriginalPrice())
                .discountedPrice(menuRegisterRequestDto.getDiscountedPrice())
                .isBargainning(menuRegisterRequestDto.getIsBargainning())
                .type(menuTypeEnum)
                .endTime(menuRegisterRequestDto.getEndTime())
                .storeEntity(storeEntity.get())
                .createdDate(LocalDateTime.now())
                .build();
        menuRepository.save(menuEntity);

        // 메뉴 장소
        registerMenuLocation(storeEntity.get().getStoreLocationEntity(), menuEntity);

        // 메뉴 이미지
        registerMenuImageFile(menus, menuEntity);

        // 메뉴 상태
        registerMenuStatus(menuRegisterRequestDto.getIsBargainning(), menuEntity);

        // 흥정일 경우 흥정 세부 내용
        if(menuRegisterRequestDto.getIsBargainning().equals("T")){
            registerMenuBargainning(menuRegisterRequestDto.getMenuBargainningDto(), menuEntity);
        }
    }

    public void registerMenuBargainning(MenuBargainningDto menuBargainningDto, MenuEntity menuEntity){
        MenuBargainningEntity menuBargainningEntity = MenuBargainningEntity.builder()
                .limitTime(menuBargainningDto.getLimitTime())
                .minPrice(menuBargainningDto.getMinPrice())
                .menuEntity(menuEntity)
                .build();

        menuBargainningRepository.save(menuBargainningEntity);
    }

    public void registerMenuStatus(String isBargainning, MenuEntity menuEntity){
        MenuStatusEnum menuStatusEnum = MenuStatusEnum.ORDER_ING;
        if(isBargainning.equals("T")){
            menuStatusEnum = MenuStatusEnum.BARGAIN_ING;
        }
        MenuStatusEntity menuStatusEntity = MenuStatusEntity.builder()
                .menuStatus(menuStatusEnum)
                .menuEntity(menuEntity)
                .build();

        menuStatusRepository.save(menuStatusEntity);
    }

    public void registerMenuImageFile(MultipartFile[] menus, MenuEntity menuEntity){
        if(menus != null){
            ArrayList<MenuFileEntity> menuFileEntities = new ArrayList<>();

            for(MultipartFile menu : menus){
                String menuOriginName = menu.getOriginalFilename();
                UUID menuUuid = UUID.randomUUID();
                String menuSavedFileName = menuUuid.toString() + "_" + menuOriginName;
                String menuFilePath = uploadPath+menuSavedFileName;

                MenuFileEntity menuFileEntity = MenuFileEntity.builder()
                        .fileOriginName(menuOriginName)
                        .fileName(menuSavedFileName)
                        .filePath(menuFilePath)
                        .menuEntity(menuEntity)
                        .build();
                menuFileEntities.add(menuFileEntity);
                try {
                    menu.transferTo(new File(menuFilePath));
                } catch (IOException e) {
                    log.error("메뉴 사진 등록 실패");
                }
            }
            menuFileRepository.saveAll(menuFileEntities);

        }
    }

    public void registerMenuLocation(StoreLocationEntity storeLocationEntity, MenuEntity menuEntity){
        MenuLocationEntity menuLocationEntity = MenuLocationEntity.builder()
                .latitude(storeLocationEntity.getLatitude())
                .longitude(storeLocationEntity.getLongitude())
                .menuEntity(menuEntity)
                .build();
        menuLocationRepository.save(menuLocationEntity);
    }

    public MenuTypeEnum getMenuType(String menuTypeStr){
        switch (menuTypeStr){
            case "expiration":
                return MenuTypeEnum.EXPIRATION;
            case "wrongOrder":
                return MenuTypeEnum.WRONG_ORDER;
            case "b":
                return MenuTypeEnum.B;
            default:
                return MenuTypeEnum.EXPIRATION;
        }
    }

//    public MenuStatusEnum getMenuStatus(String menuStatusStr){
//        switch (menuStatusStr){
//            case "orderIng":
//                return MenuStatusEnum.ORDER_ING;
//            case "orderCompleted":
//                return MenuStatusEnum.ORDER_COMPLETED;
//            case "bargainIng":
//                return MenuStatusEnum.BARGAIN_ING;
//            case "bargainCompleted":
//                return MenuStatusEnum.BARGAIN_COMPLETED;
//            case "bargainSuccess":
//                return MenuStatusEnum.BARGAIN_SUCCESS;
//            case "bargainFail":
//                return MenuStatusEnum.BARGAIN_FAIL;
//            default:
//                return MenuStatusEnum.ORDER_ING;
//        }
//    }

    public List<MenuInDistanceResponseDto> getMenuListInDistance(HomePageRequestDto homePageRequestDto){
        // 특정 거리 안에 있는 메뉴들 id, 거리 구하기
        List<MenuIdDistance> idDistanceList = getMenuIdDistance(homePageRequestDto);

        List<Long> menuIdList = new ArrayList<>();
        List<Double> menuDistanceList = new ArrayList<>();

        List<MenuInDistanceResponseDto> menuIdDistanceResponseDtoList = new ArrayList<>();
        int i = 0;

        for(MenuIdDistance menuIdDistance : idDistanceList){
            menuIdList.add(menuIdDistance.getId());
            menuDistanceList.add(menuIdDistance.getDistance());
        }

        // 특정 거리 안에 있는 menuEntity 리스트 구하기
        List<MenuEntity> menuEntityList = menuRepository.findAllById(menuIdList);
        List<MenuFileEntity> menuFileEntityList = new ArrayList<>();

        // 특정 거리 안에 있는 menuEntity에 대응하는 menuFileEntity 구하기
        // TODO: 2023-04-27 : for문 안에 sql 안 날리는 방향으로 바꾸고 싶음 
        for(long id : menuIdList){ 
            menuFileEntityList.add(menuFileRepository.findFirstByMenuEntityId(id));
        }


        // return 할 dto 리스트 생성
        for(MenuEntity menuEntity : menuEntityList){
            MenuInDistanceResponseDto menuInDistanceResponseDto = MenuInDistanceResponseDto.builder()
                    .menuId(menuEntity.getId())
                    .name(menuEntity.getName())
                    .originalPrice(menuEntity.getOriginalPrice())
                    .discountedPrice(menuEntity.getDiscountedPrice())
                    .distance(menuDistanceList.get(i))
                    .menuImagePath(menuFileEntityList.get(i).getFilePath())
                    .storeName(menuEntity.getStoreEntity().getStoreName())
                    .createdDate(menuEntity.getCreatedDate())
                    .build();

            menuIdDistanceResponseDtoList.add(menuInDistanceResponseDto);

            i++;
        }

        // 정렬
        menuIdDistanceResponseDtoList = sort(homePageRequestDto, menuIdDistanceResponseDtoList);




        return menuIdDistanceResponseDtoList;
    }

    public List<MenuInDistanceResponseDto> sort(HomePageRequestDto homePageRequestDto, List<MenuInDistanceResponseDto> menuInDistanceResponseDto){
        Comparator<MenuInDistanceResponseDto> createdAtComparator = Comparator.comparing(MenuInDistanceResponseDto::getCreatedDate);
        Comparator<MenuInDistanceResponseDto> distanceComparator = Comparator.comparing(MenuInDistanceResponseDto::getDistance);

        switch (homePageRequestDto.getSortType()){
            case "latest":
                Collections.sort(menuInDistanceResponseDto, createdAtComparator);
                return menuInDistanceResponseDto;
            case "shortest":
                Collections.sort(menuInDistanceResponseDto, distanceComparator);
                return menuInDistanceResponseDto;
            default:
                return menuInDistanceResponseDto;
        }

    }

    public List<MenuIdDistance> getMenuIdDistance(HomePageRequestDto homePageRequestDto){
        List<MenuLocationEntity> menuLocationEntityList = menuLocationRepository.findAll();
        List<MenuIdDistance> menuIdDistanceList = new ArrayList<>();
        for(MenuLocationEntity menuLocation : menuLocationEntityList){
            double distance = getDistance(homePageRequestDto.getLatitude(), homePageRequestDto.getLongitude(), menuLocation.getLatitude(), menuLocation.getLongitude());
            if(distance <= homePageRequestDto.getKm()){
                menuIdDistanceList.add(new MenuIdDistance(menuLocation.getMenuEntity().getId(), distance));
            }
        }

        return menuIdDistanceList;
    }


    public double getDistance(double lat1, double lon1, double lat2, double lon2) {
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat/2)* Math.sin(dLat/2)+ Math.cos(Math.toRadians(lat1))* Math.cos(Math.toRadians(lat2))* Math.sin(dLon/2)* Math.sin(dLon/2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        double d =EARTH_RADIUS* c * 1000;
        return d;
    }
}


