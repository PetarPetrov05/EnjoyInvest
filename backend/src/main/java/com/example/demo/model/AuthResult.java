package com.example.demo.model;
import lombok.AllArgsConstructor;
import lombok.Getter;
import java.util.Set;

@Getter
@AllArgsConstructor
public class AuthResult {
    private String token;
    private Set<String> roles;
}