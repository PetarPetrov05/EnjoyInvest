package com.example.demo.controller;

import com.example.demo.dto.*;
import com.example.demo.service.AuthService;
import com.example.demo.util.LogMessages;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
    logger.info(LogMessages.LOGIN_REQUEST, request.getEmail());

    var loginResult = authService.login(request.getEmail(), request.getPassword());
    if (loginResult == null) {
        logger.warn(LogMessages.LOGIN_FAILED, request.getEmail());
        return ResponseEntity.status(401).build();
    }

    logger.info(LogMessages.LOGIN_SUCCESS, request.getEmail());
    return ResponseEntity.ok(new LoginResponse(loginResult.getToken(), loginResult.getRoles()));
}

@PostMapping("/register")
public ResponseEntity<LoginResponse> register(@RequestBody RegisterRequest request) {
    logger.info(LogMessages.REGISTER_REQUEST, request.getEmail());

    var registerResult = authService.register(
            request.getEmail(),
            request.getPassword(),
            request.getName(),
            request.getUsername()
    );

    if (registerResult == null) {
        logger.warn(LogMessages.REGISTER_FAILED, request.getEmail());
        return ResponseEntity.status(400).build();
    }

    logger.info(LogMessages.REGISTER_SUCCESS, request.getEmail());
    return ResponseEntity.ok(new LoginResponse(registerResult.getToken(), registerResult.getRoles()));
}

@GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        logger.info("Fetching all users");
        List<UserDTO> users = authService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/users/{userId}/role")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDTO> updateUserRole(@PathVariable Long userId, @RequestBody UpdateRoleRequest request) {
        logger.info("Updating role for user {} to {}", userId, request.getRole());
        UserDTO updatedUser = authService.updateUserRole(userId, request.getRole());
        return ResponseEntity.ok(updatedUser);
    }
}
