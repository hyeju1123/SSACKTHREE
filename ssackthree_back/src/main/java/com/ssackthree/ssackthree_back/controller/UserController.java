package com.ssackthree.ssackthree_back.controller;

import com.ssackthree.ssackthree_back.dto.CustomerNicknameRequestDto;
import com.ssackthree.ssackthree_back.dto.JoinRequestDto;
import com.ssackthree.ssackthree_back.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/user")
public class UserController {
    private final UserService userService;

    @PostMapping(path = "join")
    public void join(@RequestBody JoinRequestDto joinRequestDto) throws Exception{
        userService.join(joinRequestDto);
    }


//    @PostMapping(path = "setNickname")
//    public String join(@RequestBody CustomerNicknameRequestDto customerNicknameRequestDto) throws Exception{
//        return userService.setNickname(customerNicknameRequestDto);
//    }
}
