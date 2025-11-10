package com.example.demo;


import com.example.demo.model.Message;
import com.example.demo.service.MessageService;
import com.example.demo.repository.MessageRepository;
import com.example.demo.repository.repoModels.RepoMessage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MessageServiceTest {

    @Mock
    private MessageRepository messageRepository;

    @InjectMocks
    private MessageService messageService;

    private RepoMessage repoMessage;
    private Message message;

    @BeforeEach
    void setUp() {
        repoMessage = new RepoMessage();
        repoMessage.setId(1L);
        repoMessage.setContent("Hello World");
        repoMessage.setSenderId(42L);
        repoMessage.setTimestamp(LocalDateTime.now());

        message = new Message();
        message.setId(1L);
        message.setContent("Hello World");
        message.setSenderId(42L);
        message.setTimestamp(repoMessage.getTimestamp());
    }

    @Test
    void testSave() {
        when(messageRepository.save(any(RepoMessage.class))).thenReturn(repoMessage);

        Message saved = messageService.save(message);

        assertNotNull(saved);
        assertEquals("Hello World", saved.getContent());
        assertEquals(42L, saved.getSenderId());
        verify(messageRepository, times(1)).save(any(RepoMessage.class));
    }

    @Test
    void testFindAll() {
        when(messageRepository.findAll()).thenReturn(List.of(repoMessage));

        List<Message> messages = messageService.findAll();

        assertEquals(1, messages.size());
        assertEquals("Hello World", messages.get(0).getContent());
        verify(messageRepository, times(1)).findAll();
    }

    @Test
    void testFindById() {
        when(messageRepository.findById(1L)).thenReturn(Optional.of(repoMessage));

        Message result = messageService.findById(1L);

        assertNotNull(result);
        assertEquals("Hello World", result.getContent());
        verify(messageRepository, times(1)).findById(1L);
    }

    @Test
    void testFindById_NotFound() {
        when(messageRepository.findById(1L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> messageService.findById(1L));
        assertEquals("Message not found with id: 1", exception.getMessage());
        verify(messageRepository, times(1)).findById(1L);
    }
}
