package com.example.demo.service;

import com.example.demo.model.Role;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.repoModels.RepoRole;
import com.example.demo.repository.repoModels.RepoUser;
import com.example.demo.model.AuthResult;
import com.example.demo.model.User;
import com.example.demo.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthService {

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
        if (userOpt.isEmpty()) return null;

        var user = userOpt.get();
        if (!passwordEncoder.matches(password, user.getPassword())) return null;

        Set<Role> roles = user.getRoles().stream()
                      .<Role>map(repoRole -> Role.valueOf(repoRole.getName()))
                      .collect(Collectors.toSet());

        User authUser = new User(user.getId(), user.getEmail(), roles,user.getUsername());
        String token = jwtUtil.generateToken(authUser);

        return new AuthResult(token, roles);
    }

    public AuthResult register(String email, String password,String name,String username) {
        if (userRepository.findByEmail(email).isPresent()) return null;

        var encodedPassword = passwordEncoder.encode(password);

        // fetch an existing persisted role and assign it (do NOT create a new RepoRole)
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

        User authUser = new User(newUser.getId(), newUser.getEmail(),roles,newUser.getUsername());
        String token = jwtUtil.generateToken(authUser);

        return new AuthResult(token, roles);
    }
}
