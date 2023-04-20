package com.ssackthree.ssackthree_back.service;

import com.ssackthree.ssackthree_back.dto.LocationDto;
import com.ssackthree.ssackthree_back.dto.MenuRegisterRequestDto;
import com.ssackthree.ssackthree_back.entity.MenuEntity;
import com.ssackthree.ssackthree_back.entity.MenuLocationEntity;
import com.ssackthree.ssackthree_back.entity.StoreEntity;
import com.ssackthree.ssackthree_back.entity.StoreLocationEntity;
import com.ssackthree.ssackthree_back.enums.MenuStatusEnum;
import com.ssackthree.ssackthree_back.repository.MenuLocationRepository;
import com.ssackthree.ssackthree_back.repository.MenuRepository;
import com.ssackthree.ssackthree_back.repository.StoreLocationRepository;
import com.ssackthree.ssackthree_back.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class MenuService {
    private final MenuRepository menuRepository;
    private final StoreRepository storeRepository;
    private final StoreLocationRepository storeLocationRepository;
    private final MenuLocationRepository menuLocationRepository;

    public static final double EARTH_RADIUS = 6371.0088; // 지구 반지름 상수 선언

    public void registerMenu(MenuRegisterRequestDto menuRegisterRequestDto){

        MenuStatusEnum menuStatus = getMenuStatus(menuRegisterRequestDto.getStatus());

        Optional<StoreEntity> storeEntity = storeRepository.findByUserEntityId(menuRegisterRequestDto.getUserId());
        MenuEntity menuEntity = MenuEntity.builder()
                .name(menuRegisterRequestDto.getMenuName())
                .originalPrice(menuRegisterRequestDto.getOriginalPrice())
                .discountedPrice(menuRegisterRequestDto.getDiscountedPrice())
                .isBargainning(menuRegisterRequestDto.getIsBargainning())
                .status(menuStatus)
                .endTime(menuRegisterRequestDto.getEndTime())
                .storeEntity(storeEntity.get())
                .createdDate(LocalDateTime.now())
                .build();
        menuRepository.save(menuEntity);

        registerMenuLocation(storeEntity.get().getStoreLocationEntity(), menuEntity);
    }

    public void registerMenuLocation(StoreLocationEntity storeLocationEntity, MenuEntity menuEntity){
        MenuLocationEntity menuLocationEntity = MenuLocationEntity.builder()
                .latitude(storeLocationEntity.getLatitude())
                .longitude(storeLocationEntity.getLongitude())
                .menuEntity(menuEntity)
                .build();
        menuLocationRepository.save(menuLocationEntity);
    }

    public MenuStatusEnum getMenuStatus(String menuStatusStr){
        switch (menuStatusStr){
            case "orderIng":
                return MenuStatusEnum.ORDER_ING;
            case "orderCompleted":
                return MenuStatusEnum.ORDER_COMPLETED;
            case "bargainIng":
                return MenuStatusEnum.BARGAIN_ING;
            case "bargainCompleted":
                return MenuStatusEnum.BARGAIN_COMPLETED;
            case "bargainSuccess":
                return MenuStatusEnum.BARGAIN_SUCCESS;
            case "bargainFail":
                return MenuStatusEnum.BARGAIN_FAIL;
            default:
                return MenuStatusEnum.ORDER_ING;
        }
    }

    public List<Long> getMenuIdInDistance(LocationDto locationDto){
        List<MenuLocationEntity> menuLocationEntityList = menuLocationRepository.findAll();
        List<Long> menuIdList = new ArrayList<>();
        for(MenuLocationEntity menuLocation : menuLocationEntityList){
            double distance = getDistance(locationDto.getLatitude(), locationDto.getLongitude(), menuLocation.getLatitude(), menuLocation.getLongitude());
            if(distance <= locationDto.getKm()){
                menuIdList.add(menuLocation.getMenuEntity().getId());
            }
        }

        return menuIdList;
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
