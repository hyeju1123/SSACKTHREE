package com.ssackthree.ssackthree_back.service;

import com.ssackthree.ssackthree_back.dto.StoreRegisterResponseDto;
import com.ssackthree.ssackthree_back.repository.StoreRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@Transactional
class StoreServiceTest {
    @Autowired
    private StoreService storeService;

    @Autowired
    private StoreRepository storeRepository;

    @Test
    @DisplayName("가게 등록 테스트")
    public void 가게등록() throws Exception{
        //Given

    }

    @Test
    @DisplayName("가게 조회 테스트")
    public void 가게조회() throws Exception{


    }

    @Test
    @DisplayName("위도경도 얻기 테스트")
    public void 위도경도() throws Exception{
        String addr = "서울특별시 용산구 청파로47길 100";
        System.out.println(storeService.getLocation(addr).lat);
    }
}