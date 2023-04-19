package com.ssackthree.ssackthree_back.service;

import com.ssackthree.ssackthree_back.dto.MenuRegisterRequestDto;
import com.ssackthree.ssackthree_back.entity.MenuEntity;
import com.ssackthree.ssackthree_back.entity.StoreEntity;
import com.ssackthree.ssackthree_back.enums.MenuStatusEnum;
import com.ssackthree.ssackthree_back.repository.MenuRepository;
import com.ssackthree.ssackthree_back.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class MenuService {
    private final MenuRepository menuRepository;
    private final StoreRepository storeRepository;

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
                .build();
        menuRepository.save(menuEntity);
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
}
