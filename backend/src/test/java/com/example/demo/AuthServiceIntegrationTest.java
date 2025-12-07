package com.example.demo;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.model.Role;
import com.example.demo.model.AuthResult;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.repoModels.RepoRole;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AuthControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
        roleRepository.deleteAll();

        RepoRole userRole = new RepoRole();
        userRole.setName("USER");
        roleRepository.save(userRole);
    }

    // ------------------ REGISTER ------------------

    @Test
    void register_Successful() throws Exception {
        RegisterRequest request = new RegisterRequest();
        request.setEmail("newuser@example.com");
        request.setPassword("password123");
        request.setName("John Doe");
        request.setUsername("johndoe");

        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists())
                .andExpect(jsonPath("$.roles[0]").value("USER"));
    }

    @Test
    void register_EmailAlreadyExists() throws Exception {
        // First registration
        RegisterRequest request1 = new RegisterRequest();
        request1.setEmail("duplicate@example.com");
        request1.setPassword("password123");
        request1.setName("User One");
        request1.setUsername("userone");

        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request1)))
                .andExpect(status().isOk());

        // Attempt duplicate registration
        RegisterRequest request2 = new RegisterRequest();
        request2.setEmail("duplicate@example.com");
        request2.setPassword("password456");
        request2.setName("User Two");
        request2.setUsername("usertwo");

        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request2)))
                .andExpect(status().isBadRequest());
    }

    // ------------------ LOGIN ------------------

    @Test
    void login_Successful() throws Exception {
        // First register the user
        RegisterRequest register = new RegisterRequest();
        register.setEmail("testuser@example.com");
        register.setPassword("password123");
        register.setName("Test User");
        register.setUsername("testuser");

        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(register)))
                .andExpect(status().isOk());

        // Login request
        LoginRequest login = new LoginRequest();
        login.setEmail("testuser@example.com");
        login.setPassword("password123");

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(login)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists())
                .andExpect(jsonPath("$.roles[0]").value("USER"));
    }

    @Test
    void login_WrongPassword() throws Exception {
        // First register the user
        RegisterRequest register = new RegisterRequest();
        register.setEmail("testuser@example.com");
        register.setPassword("correctpassword");
        register.setName("Test User");
        register.setUsername("testuser");

        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(register)))
                .andExpect(status().isOk());

        // Login with wrong password
        LoginRequest login = new LoginRequest();
        login.setEmail("testuser@example.com");
        login.setPassword("wrongpassword");

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(login)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void login_UserNotFound() throws Exception {
        LoginRequest login = new LoginRequest();
        login.setEmail("nonexistent@example.com");
        login.setPassword("password123");

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(login)))
                .andExpect(status().isUnauthorized());
    }
}
