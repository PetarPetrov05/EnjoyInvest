package com.example.demo.controller;

import com.example.demo.dto.*;
import com.example.demo.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        var loginResult = authService.login(request.getEmail(), request.getPassword());
        if (loginResult == null) {
            return ResponseEntity.status(401).build(); // Unauthorized
        }

        // loginResult contains both token and roles
        return ResponseEntity.ok(new LoginResponse(loginResult.getToken(), loginResult.getRoles()));
    }

    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@RequestBody RegisterRequest request) {
        var registerResult = authService.register(request.getEmail(), request.getPassword(),request.getName(),request.getUsername());
        if (registerResult == null) {
            return ResponseEntity.status(400).build(); // Bad request (email exists)
        }

        // registerResult contains both token and roles
        return ResponseEntity.ok(new LoginResponse(registerResult.getToken(), registerResult.getRoles()));
    }
}
