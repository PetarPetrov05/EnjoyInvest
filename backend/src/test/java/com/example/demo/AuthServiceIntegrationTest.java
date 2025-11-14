package com.example.demo;

import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.repoModels.RepoRole;
import com.example.demo.security.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test") // ensures it uses application-test.properties
class AuthFlowIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    private final String testEmail = "fullflow@example.com";
    private final String testPassword = "password123";

    @BeforeEach
    void setUp() {
        // Ensure USER role exists
        if (roleRepository.findByName("USER").isEmpty()) {
            RepoRole role = new RepoRole();
            role.setName("USER");
            roleRepository.save(role);
        }

        // Delete test user if exists
        userRepository.findByEmail(testEmail).ifPresent(userRepository::delete);
    }

    @Test
    void fullUserFlow_RegisterLoginAccessProtectedEndpoint() throws Exception {
        // --- REGISTER ---
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"" + testEmail + "\",\"password\":\"" + testPassword + "\",\"name\":\"Full Flow\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists())
                .andExpect(jsonPath("$.roles[0]").value("USER"));

        // --- LOGIN ---
        String loginResponse = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"" + testEmail + "\",\"password\":\"" + testPassword + "\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists())
                .andReturn()
                .getResponse()
                .getContentAsString();

        String token = loginResponse.split("\"token\":\"")[1].split("\"")[0];

        // Optionally test protected endpoint
        // mockMvc.perform(get("/api/users/me")
        //                 .header("Authorization", "Bearer " + token))
        //         .andExpect(status().isOk())
        //         .andExpect(jsonPath("$.email").value(testEmail))
        //         .andExpect(jsonPath("$.roles[0]").value("USER"));
    }

    @Test
    void loginWithWrongPassword_ShouldFail() throws Exception {
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"" + testEmail + "\",\"password\":\"" + testPassword + "\",\"name\":\"Full Flow\"}"))
                .andExpect(status().isOk());

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"" + testEmail + "\",\"password\":\"wrongpassword\"}"))
                .andExpect(status().isUnauthorized());
    }
}
