package com.ssackthree.ssackthree_back.entity;

import com.ssackthree.ssackthree_back.enums.MenuStatusEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigInteger;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_menu")
public class MenuEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_id")
    private long id;

    private String name;
    private int originalPrice;
    private int discountedPrice;
    private String isBargainning;

    @Enumerated(EnumType.STRING)
    private MenuStatusEnum status;

    private String endTime;

    @ManyToOne
    @JoinColumn(name = "store_id")
    private StoreEntity storeEntity;
}
