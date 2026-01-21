package com.example.demo.service;

import com.example.demo.model.Role;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.repoModels.RepoRole;
import com.example.demo.repository.repoModels.RepoUser;
import com.example.demo.model.AuthResult;
import com.example.demo.model.User;
import com.example.demo.security.JwtUtil;
import com.example.demo.util.LogMessages;

import jakarta.transaction.Transactional;

import com.example.demo.dto.UserDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthResult login(String email, String password) {
        if (email == null || email.isEmpty() || password == null || password.isEmpty()) return null;

        var userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            logger.warn(LogMessages.LOGIN_FAILED, email);
            return null;
        }

        var user = userOpt.get();
        if (!passwordEncoder.matches(password, user.getPassword())) {
            logger.warn(LogMessages.LOGIN_FAILED, email);
            return null;
        }

        Set<Role> roles = user.getRoles().stream()
                .map(repoRole -> Role.valueOf(repoRole.getName()))
                .collect(Collectors.toSet());

        User authUser = new User(user.getId(), user.getEmail(), roles, user.getUsername());
        String token = jwtUtil.generateToken(authUser);

        logger.info(LogMessages.LOGIN_SUCCESS, email);
        return new AuthResult(token, roles);
    }

    public AuthResult register(String email, String password, String name, String username) {
        if (email == null || email.isEmpty() || password == null || password.isEmpty() || name == null || name.isEmpty() || username == null || username.isEmpty()) return null;
        if (!email.contains("@")) return null;

        if (userRepository.findByEmail(email).isPresent()) {
            logger.warn(LogMessages.REGISTER_FAILED, email);
            return null;
        }

        var encodedPassword = passwordEncoder.encode(password);

        RepoRole defaultRole;
        if (userRepository.count() == 0) {
            defaultRole = roleRepository.findByName("ADMIN")
                    .orElseThrow(() -> new IllegalStateException("Default role ADMIN not found"));
        } else {
            defaultRole = roleRepository.findByName("USER")
                    .orElseThrow(() -> new IllegalStateException("Default role USER not found"));
        }

        RepoUser newUser = new RepoUser();
        newUser.setEmail(email);
        newUser.setPassword(encodedPassword);
        newUser.setName(name);
        newUser.setUsername(username);
        newUser.setRoles(Set.of(defaultRole));

        Set<Role> roles = newUser.getRoles().stream()
                .map(repoRole -> Role.valueOf(repoRole.getName()))
                .collect(Collectors.toSet());

        userRepository.save(newUser);

        User authUser = new User(newUser.getId(), newUser.getEmail(), roles, newUser.getUsername());
        String token = jwtUtil.generateToken(authUser);

        logger.info(LogMessages.REGISTER_SUCCESS, email);
        return new AuthResult(token, roles);
    }

    public List<UserDTO> getAllUsers() {
        List<RepoUser> repoUsers = userRepository.findAll();
        return repoUsers.stream()
                .map(this::convertToUserDTO)
                .collect(Collectors.toList());
    }

@Transactional
public UserDTO updateUserRole(Long userId, String roleName) {
    RepoUser user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

    RepoRole role = roleRepository.findByName(roleName.toUpperCase())
            .orElseThrow(() -> new IllegalArgumentException("Role not found"));

    user.getRoles().clear();

    user.getRoles().add(role);

    userRepository.save(user);

    return convertToUserDTO(user);
}
    private UserDTO convertToUserDTO(RepoUser repoUser) {
        Set<String> roles = repoUser.getRoles().stream()
                .map(repoRole -> repoRole.getName())
                .collect(Collectors.toSet());

        return new UserDTO(
                repoUser.getId(),
                repoUser.getUsername(),
                repoUser.getEmail(),
                repoUser.getName(),
                roles,
                null, // createdAt - would need to add to entity
                null, // lastLogin - would need to add to entity
                true  // isApproved - assuming all users are approved for now
        );
    }
}
