package com.example.demo;

import com.example.demo.controller.PosterController;
import com.example.demo.exception.ValidationExceptionHandler;
import com.example.demo.service.PosterService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class ValidationExceptionHandlerTest {

    private MockMvc mockMvc;

    @Mock
    private PosterService posterService;

    @InjectMocks
    private PosterController posterController;

    @BeforeEach
    void setUp() {
        // We set up MockMvc with the Controller AND the ExceptionHandler
        mockMvc = MockMvcBuilders.standaloneSetup(posterController)
                .setControllerAdvice(new ValidationExceptionHandler())
                .build();
    }

    @Test
    void whenValidationFails_shouldReturnMapOfErrors() throws Exception {
        // In CreatePosterRequest, 'title' has @Size(min = 4)
        // We send a title that is too short ("abc") to trigger the exception
        mockMvc.perform(multipart("/posters")
                        .param("title", "abc") 
                        .param("description", "too short")
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isOk()) // Your handler returns Map without setting status, so it defaults to 200
                .andExpect(jsonPath("$.title").value("Title must be at least 4 characters"))
                .andExpect(jsonPath("$.description").value("Description must be at least 10 characters"));
    }
}