package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Set;
@Getter
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private Set<String> roles;
}