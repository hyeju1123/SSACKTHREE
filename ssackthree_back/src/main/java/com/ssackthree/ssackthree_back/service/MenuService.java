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

    public void getLatestMenuList(LocationDto locationDto){
        List<MenuLocationEntity> menuLocationEntityList = menuLocationRepository.findAll();


    }
}
