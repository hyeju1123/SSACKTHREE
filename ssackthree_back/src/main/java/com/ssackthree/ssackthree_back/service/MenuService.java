package com.ssackthree.ssackthree_back.service;

import com.ssackthree.ssackthree_back.dto.LocationDto;
import com.ssackthree.ssackthree_back.dto.MenuInDistanceResponseDto;
import com.ssackthree.ssackthree_back.dto.MenuRegisterRequestDto;
import com.ssackthree.ssackthree_back.entity.*;
import com.ssackthree.ssackthree_back.enums.MenuStatusEnum;
import com.ssackthree.ssackthree_back.enums.MenuTypeEnum;
import com.ssackthree.ssackthree_back.repository.*;
import com.ssackthree.ssackthree_back.service.customizedClass.MenuIdDistance;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

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

    public List<MenuInDistanceResponseDto> getMenuListInDistance(LocationDto locationDto){
        List<MenuIdDistance> idDistanceList = getMenuIdDistance(locationDto);
        List<Long> menuIdList = new ArrayList<>();
        List<Double> menuDistanceList = new ArrayList<>();
        List<MenuInDistanceResponseDto> menuIdDistanceResponseDtoList = new ArrayList<>();
        int i = 0;

        for(MenuIdDistance menuIdDistance : idDistanceList){
            menuIdList.add(menuIdDistance.getId());
            menuDistanceList.add(menuIdDistance.getDistance());
        }

        List<MenuEntity> menuEntityList = menuRepository.findAllById(menuIdList);

        for(MenuEntity menuEntity : menuEntityList){
            MenuInDistanceResponseDto menuInDistanceResponseDto = MenuInDistanceResponseDto.builder()
                    .menuId(menuEntity.getId())
                    .name(menuEntity.getName())
                    .originalPrice(menuEntity.getOriginalPrice())
                    .discountedPrice(menuEntity.getDiscountedPrice())
                    .distance(menuDistanceList.get(i))
                    .storeName(menuEntity.getStoreEntity().getStoreName())
                    .build();

            menuIdDistanceResponseDtoList.add(menuInDistanceResponseDto);

            i++;


        }

        return menuIdDistanceResponseDtoList;
    }

    public List<MenuIdDistance> getMenuIdDistance(LocationDto locationDto){
        List<MenuLocationEntity> menuLocationEntityList = menuLocationRepository.findAll();
        List<MenuIdDistance> menuIdDistanceList = new ArrayList<>();
        for(MenuLocationEntity menuLocation : menuLocationEntityList){
            double distance = getDistance(locationDto.getLatitude(), locationDto.getLongitude(), menuLocation.getLatitude(), menuLocation.getLongitude());
            if(distance <= locationDto.getKm()){
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


