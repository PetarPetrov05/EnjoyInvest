package com.example.demo.controller;

import com.example.demo.service.MessageService; // Add this import
import com.example.demo.dto.MessageDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/messages")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping
    public ResponseEntity<MessageDTO> sendMessage(@RequestBody MessageDTO message) {
        MessageDTO savedMessage = messageService.saveMessage(message);
        return ResponseEntity.ok(savedMessage);
    }
}