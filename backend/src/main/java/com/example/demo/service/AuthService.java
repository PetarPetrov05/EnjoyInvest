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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
        if (userRepository.findByEmail(email).isPresent()) {
            logger.warn(LogMessages.REGISTER_FAILED, email);
            return null;
        }

        var encodedPassword = passwordEncoder.encode(password);

        RepoRole defaultRole = roleRepository.findByName("USER")
                .orElseThrow(() -> new IllegalStateException("Default role USER not found"));

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
}
