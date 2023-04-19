package com.ssackthree.ssackthree_back.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StoreRegisterResponseDto {
    private long id;
    private String mainAddress;
    private String detailAddress;
    private String zipcode;
    private String phoneNumber;
    private String startTime;
    private String endTime;
    private String holiday;
    private String introduce;
    private String menuFileName;
}
