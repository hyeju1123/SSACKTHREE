package com.ssackthree.ssackthree_back.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LocationDto {

    private double latitude;
    private double longitude;
    private int km;
}
