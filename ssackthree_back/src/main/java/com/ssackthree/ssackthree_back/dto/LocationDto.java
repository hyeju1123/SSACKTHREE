package com.ssackthree.ssackthree_back.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LocationDto {

    private double latitude;
    private double longitude;
    private int km;
}
