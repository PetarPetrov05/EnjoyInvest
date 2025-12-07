package com.example.demo;

import com.example.demo.model.AuthResult;
import com.example.demo.model.Role;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.repoModels.RepoRole;
import com.example.demo.repository.repoModels.RepoUser;
import com.example.demo.security.JwtUtil;
import com.example.demo.service.AuthService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthService authService;

    @Test
    void login_Successful() {
        String email = "test@example.com";
        String rawPassword = "password";
        String encodedPassword = "$2a$10$hash";

        RepoRole role = new RepoRole();
        role.setName("USER");

        RepoUser user = new RepoUser();
        user.setId(1L);
        user.setEmail(email);
        user.setPassword(encodedPassword);
        user.setRoles(Set.of(role));

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(rawPassword, encodedPassword)).thenReturn(true);
        when(jwtUtil.generateToken(any())).thenReturn("jwt-token");

        AuthResult result = authService.login(email, rawPassword);

        assertNotNull(result);
        assertEquals("jwt-token", result.getToken());
        assertTrue(result.getRoles().contains(Role.USER));
    }

    @Test
    void login_WrongPassword_ReturnsNull() {
        String email = "test@example.com";
        String rawPassword = "wrong";
        String encodedPassword = "$2a$10$hash";

        RepoUser user = new RepoUser();
        user.setEmail(email);
        user.setPassword(encodedPassword);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(rawPassword, encodedPassword)).thenReturn(false);

        AuthResult result = authService.login(email, rawPassword);

        assertNull(result);
    }

    @Test
    void login_UserNotFound_ReturnsNull() {
        when(userRepository.findByEmail("nonexistent@example.com")).thenReturn(Optional.empty());

        AuthResult result = authService.login("nonexistent@example.com", "password");

        assertNull(result);
    }

    @Test
    void register_Successful() {
        String email = "new@example.com";
        String password = "password";
        String name = "New User";
        String username = "newuser";
        String encodedPassword = "$2a$10$hash";

        RepoRole role = new RepoRole();
        role.setName("USER");

        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());
        when(passwordEncoder.encode(password)).thenReturn(encodedPassword);
        when(roleRepository.findByName("USER")).thenReturn(Optional.of(role));
        when(jwtUtil.generateToken(any())).thenReturn("jwt-token");

        AuthResult result = authService.register(email, password, name, username);

        assertNotNull(result);
        assertEquals("jwt-token", result.getToken());
        assertTrue(result.getRoles().contains(Role.USER));

        verify(userRepository, times(1)).save(any(RepoUser.class));
    }

    @Test
    void register_EmailAlreadyExists_ReturnsNull() {
        RepoUser existingUser = new RepoUser();
        existingUser.setEmail("existing@example.com");

        when(userRepository.findByEmail("existing@example.com")).thenReturn(Optional.of(existingUser));

        AuthResult result = authService.register("existing@example.com", "password", "Name", "username");

        assertNull(result);
    }
}
