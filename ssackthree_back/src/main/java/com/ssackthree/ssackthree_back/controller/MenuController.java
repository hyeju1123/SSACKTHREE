package com.ssackthree.ssackthree_back.controller;

import com.ssackthree.ssackthree_back.dto.LocationDto;
import com.ssackthree.ssackthree_back.dto.MenuRegisterRequestDto;
import com.ssackthree.ssackthree_back.service.MenuService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/menu")
public class MenuController {

    private final MenuService menuService;

    @PostMapping(path = "register")
    public void registerMenu(@RequestPart(value="dto") MenuRegisterRequestDto menuRegisterRequestDto){
        menuService.registerMenu(menuRegisterRequestDto);
    }

//    @GetMapping(path = "get/distance")
//    public void getMenuListInDistance(@RequestBody LocationDto){
//
//    }

}
