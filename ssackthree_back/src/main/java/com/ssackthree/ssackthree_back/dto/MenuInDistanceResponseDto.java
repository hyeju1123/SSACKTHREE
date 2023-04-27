package com.ssackthree.ssackthree_back.dto;

import lombok.*;
import org.apache.catalina.Store;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;

import java.io.Serializable;


@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MenuInDistanceResponseDto implements Serializable {

    private long menuId;
    private String name;
    private int originalPrice;
    private int discountedPrice;
    private double distance;
    private String storeName;
    private String menuImagePath;

}
