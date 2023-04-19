package com.ssackthree.ssackthree_back.service;

import com.ssackthree.ssackthree_back.dto.CustomerNicknameRequestDto;
import com.ssackthree.ssackthree_back.dto.JoinRequestDto;
import com.ssackthree.ssackthree_back.entity.CustomerProfileFileEntity;
import com.ssackthree.ssackthree_back.entity.UserEntity;
import com.ssackthree.ssackthree_back.enums.RoleEnum;
import com.ssackthree.ssackthree_back.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${upload-path}")
    private String uploadPath;

    public void join(JoinRequestDto joinRequestDto) throws Exception{
        RoleEnum role = joinRequestDto.getRole().equals("customer") ? RoleEnum.ROLE_CUSTOMER : RoleEnum.ROLE_MANAGER;

        UserEntity userEntity = UserEntity.builder()
                .username(joinRequestDto.getUsername())
                .password(passwordEncoder.encode(joinRequestDto.getPassword()))
                .role(role)
                .repName(joinRequestDto.getRepName())
                .build();

        userRepository.save(userEntity);

    }



//    public String setNickname(CustomerNicknameRequestDto customerNicknameRequestDto) throws Exception{
//        long id = customerNicknameRequestDto.getUserId();
//        Optional<UserEntity> user = userRepository.findById(id);
//        if(user.isPresent()){
//            UserEntity userEntity = UserEntity.builder()
//                    .id(id)
//                    .repName(customerNicknameRequestDto.getNickname())
//                    .password(user.get().getPassword())
//                    .username(user.get().getUsername())
//                    .role(user.get().getRole())
//                    .build();
//            userRepository.save(userEntity);
//        }
//        return "success";
//    }
}
