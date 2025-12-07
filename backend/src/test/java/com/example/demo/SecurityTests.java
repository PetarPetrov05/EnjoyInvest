package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.security.JwtUtil;

import io.jsonwebtoken.JwtException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.context.SecurityContextHolder;

import com.example.demo.security.JwtFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Set;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
public class SecurityTests {
    private JwtUtil jwtUtil;

    @BeforeEach
    void setUp() throws Exception {
        jwtUtil = new JwtUtil();

        // Inject private fields via reflection
        var secretField = JwtUtil.class.getDeclaredField("SECRET_KEY");
        secretField.setAccessible(true);
        secretField.set(jwtUtil, "mysecretmysecretmysecretmysecret"); // 32+ chars

        var expField = JwtUtil.class.getDeclaredField("EXPIRATION_TIME");
        expField.setAccessible(true);
        expField.set(jwtUtil, 1000 * 60 * 60L); // 1 hour
    }

    @Test
    void testGenerateAndValidateToken() {
        User user = new User();
        user.setId(1L);
        user.setEmail("test@example.com");
        user.setRoles(Set.of(Role.USER, Role.ADMIN));

        String token = jwtUtil.generateToken(user);
        assertNotNull(token);

        // Extraction tests
        assertEquals("test@example.com", jwtUtil.extractEmail(token));
        assertEquals(1L, jwtUtil.extractUserId(token));
        Set<String> roles = jwtUtil.extractRoles(token);
        assertTrue(roles.contains("USER"));
        assertTrue(roles.contains("ADMIN"));

        // Validation tests
        assertTrue(jwtUtil.validateToken(token, "test@example.com"));
        assertFalse(jwtUtil.validateToken(token, "wrong@example.com"));
    }
    @Test
    void testFilterWithValidToken() throws Exception {
        JwtUtil jwtUtil = mock(JwtUtil.class);
        JwtFilter filter = new JwtFilter(jwtUtil);

        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);
        FilterChain chain = mock(FilterChain.class);

        when(request.getRequestURI()).thenReturn("/api/protected");
        when(request.getHeader("Authorization")).thenReturn("Bearer token123");
        when(jwtUtil.extractEmail("token123")).thenReturn("user@example.com");
        when(jwtUtil.validateToken("token123", "user@example.com")).thenReturn(true);
        when(jwtUtil.extractUserId("token123")).thenReturn(1L);
        when(jwtUtil.extractRoles("token123")).thenReturn(Set.of("USER"));

        filter.doFilter(request, response, chain);

        // Security context should be set
        assertNotNull(SecurityContextHolder.getContext().getAuthentication());
        assertEquals("user@example.com",
                SecurityContextHolder.getContext().getAuthentication().getPrincipal());

        verify(chain, times(1)).doFilter(request, response);

        SecurityContextHolder.clearContext();
    }

    @Test
    void testFilterSkipsPublicEndpoints() throws Exception {
        JwtUtil jwtUtil = mock(JwtUtil.class);
        JwtFilter filter = new JwtFilter(jwtUtil);

        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);
        FilterChain chain = mock(FilterChain.class);

        when(request.getRequestURI()).thenReturn("/api/auth/login");

        filter.doFilter(request, response, chain);

        assertNull(SecurityContextHolder.getContext().getAuthentication());
        verify(chain, times(1)).doFilter(request, response);
    }

    @Test
    void testFilterWithInvalidToken() throws Exception {
        JwtUtil jwtUtil = mock(JwtUtil.class);
        JwtFilter filter = new JwtFilter(jwtUtil);

        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);
        FilterChain chain = mock(FilterChain.class);

        when(request.getRequestURI()).thenReturn("/api/protected");
        when(request.getHeader("Authorization")).thenReturn("Bearer invalid");
       when(jwtUtil.extractEmail("invalid")).thenThrow(new JwtException("Invalid token"));

        filter.doFilter(request, response, chain);

        assertNull(SecurityContextHolder.getContext().getAuthentication());
        verify(chain, times(1)).doFilter(request, response);
    }
}
