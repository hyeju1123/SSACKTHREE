package com.ssackthree.ssackthree_back.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_store")
public class StoreEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "store_id")
    private long id;

    private String mainAddress;

    private String detailAddress;

    private String zipcode;

    private String phoneNumber;

    private String startTime;

    private String endTime;

    private String holiday;

    private String introduce;

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    @OneToOne(mappedBy = "storeEntity")
    private StoreProfileFileEntity storeProfileFileEntity;

    @OneToOne(mappedBy = "storeEntity")
    private StoreMenuFileEntity storeMenuFileEntity;

    @OneToOne(mappedBy = "storeEntity")
    private StoreLocationEntity storeLocationEntity;
}
