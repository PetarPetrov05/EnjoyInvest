package com.example.demo.model;


import lombok.*;
import java.util.Set;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
public class User {
    private Long id;
    private String email;
    private Set<Role> roles;
    private String username;
}