package com.example.demo.service;

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

        Set<String> roleNames = user.getRoles().stream()
                                    .map(RepoRole::getName)
                                    .collect(Collectors.toSet());

        User authUser = new User(user.getId(), user.getEmail(), roleNames);
        String token = jwtUtil.generateToken(authUser);

        return new AuthResult(token, roleNames);
    }

    public AuthResult register(String email, String password,String name) {
        if (userRepository.findByEmail(email).isPresent()) return null;

        var encodedPassword = passwordEncoder.encode(password);
        var defaultRole = roleRepository.findByName("USER").orElseThrow();

        RepoUser newUser = new RepoUser();
        newUser.setEmail(email);
        newUser.setPassword(encodedPassword);
        newUser.setName(name);
        
        newUser.setRoles(Set.of(defaultRole));

        userRepository.save(newUser);

        User authUser = new User(newUser.getId(), newUser.getEmail(), Set.of("USER"));
        String token = jwtUtil.generateToken(authUser);

        return new AuthResult(token, Set.of("USER"));
    }
}
