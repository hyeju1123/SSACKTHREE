package com.ssackthree.ssackthree_back.dto;

import lombok.*;
import org.apache.catalina.Store;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MenuInDistanceResponseDto {

    private long menuId;
    private String name;
    private int originalPrice;
    private int discountedPrice;
    private int distance;

}
