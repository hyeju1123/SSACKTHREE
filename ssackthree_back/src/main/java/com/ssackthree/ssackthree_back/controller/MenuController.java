package com.ssackthree.ssackthree_back.controller;

import com.ssackthree.ssackthree_back.dto.MenuRegisterRequestDto;
import com.ssackthree.ssackthree_back.service.MenuService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

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
}
