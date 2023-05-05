package com.ssackthree.ssackthree_back.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class KakaoPayHistoryResponseDto {
    private int total;
    private int tax_free;
    private int vat;
    private int point;
    private int discount;
}
