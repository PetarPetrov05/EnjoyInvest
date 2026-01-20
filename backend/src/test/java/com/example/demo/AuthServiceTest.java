package com.example.demo;

import com.example.demo.dto.UserDTO;
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

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
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

    @Test
    void testGetAllUsers_ReturnsMappedDTOs() {
        RepoRole role1 = new RepoRole();
        role1.setName("USER");

        RepoUser user1 = new RepoUser();
        user1.setId(1L);
        user1.setUsername("user1");
        user1.setEmail("user1@test.com");
        user1.setName("User One");
        user1.setRoles(Set.of(role1));

        when(userRepository.findAll()).thenReturn(List.of(user1));

        List<UserDTO> result = authService.getAllUsers();

        assertEquals(1, result.size());
        UserDTO dto = result.get(0);
        assertEquals(user1.getId(), dto.getId());
        assertEquals(user1.getUsername(), dto.getUsername());
        assertEquals(user1.getEmail(), dto.getEmail());
        assertTrue(dto.getRoles().contains("USER"));
    }

    @Test
void testUpdateUserRole_Success() {
    RepoRole newRole = new RepoRole();
    newRole.setName("ADMIN");

    RepoRole oldRole = new RepoRole();
    oldRole.setName("USER");

    RepoUser user = new RepoUser();
    user.setId(1L);
    user.setRoles(new HashSet<>(Set.of(oldRole))); // <- mutable set

    when(userRepository.findById(1L)).thenReturn(Optional.of(user));
    when(roleRepository.findByName("ADMIN")).thenReturn(Optional.of(newRole));
    when(userRepository.save(any(RepoUser.class))).thenReturn(user);

    UserDTO updatedDTO = authService.updateUserRole(1L, "ADMIN");

    assertNotNull(updatedDTO);
    assertTrue(updatedDTO.getRoles().contains("ADMIN"));
    verify(userRepository, times(1)).save(user);
}
    @Test
    void testUpdateUserRole_UserNotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                authService.updateUserRole(1L, "ADMIN"));

        assertEquals("User not found", exception.getMessage());
    }

    @Test
    void testUpdateUserRole_RoleNotFound() {
        RepoUser user = new RepoUser();
        user.setId(1L);
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(roleRepository.findByName("ADMIN")).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                authService.updateUserRole(1L, "ADMIN"));

        assertEquals("Role not found", exception.getMessage());
    }

    @Test
    void login_NullEmail_ReturnsNull() {
        AuthResult result = authService.login(null, "password");
        assertNull(result);
    }

    @Test
    void login_EmptyEmail_ReturnsNull() {
        AuthResult result = authService.login("", "password");
        assertNull(result);
    }

    @Test
    void login_NullPassword_ReturnsNull() {
        AuthResult result = authService.login("test@example.com", null);
        assertNull(result);
    }

    @Test
    void register_NullEmail_ReturnsNull() {
        AuthResult result = authService.register(null, "password", "name", "username");
        assertNull(result);
    }

    @Test
    void register_EmptyEmail_ReturnsNull() {
        AuthResult result = authService.register("", "password", "name", "username");
        assertNull(result);
    }

    @Test
    void register_InvalidEmail_ReturnsNull() {
        AuthResult result = authService.register("invalid", "password", "name", "username");
        assertNull(result);
    }
}
