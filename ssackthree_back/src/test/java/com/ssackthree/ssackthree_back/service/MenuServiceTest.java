package com.ssackthree.ssackthree_back.service;

import com.ssackthree.ssackthree_back.dto.LocationDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootTest
@Transactional
class MenuServiceTest {
    @Autowired
    private MenuService menuService;

    @Test
    @DisplayName("두 점 사이 거리 얻기 테스트")
    public void 거리() throws Exception{
        // given
        double lat1 = 37.25044159999999;
        double log1 = 127.0208851;
        double lat2 = 37.25193489999999;
        double log2 = 127.0339108;




        // when
        double dis = menuService.getDistance(lat1, log1, lat2, log2);

        //then
        System.out.println("************");
        System.out.println(dis);
    }

    @Test
    @DisplayName("반경 n미터 메뉴 아이디 구하기")
    public void 반경() throws Exception{
        // given
        LocationDto locationDto = new LocationDto();
//        locationDto.setLongitude(126.9723012);
//        locationDto.setLatitude(37.5454821);
        locationDto.setLongitude(127.0208851);
        locationDto.setLatitude(37.25044159999999);
        locationDto.setKm(1000);


        //when
        List<Long> idList = menuService.getMenuIdInDistance(locationDto);

        //then
        System.out.println("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
        if(idList.isEmpty()){
            System.out.println("비어있음");
        }else{
            for(long id : idList){
                System.out.println(id);
            }
        }

    }
}