package com.example.demo.service;

import com.example.demo.dto.MessageDTO;
import com.example.demo.model.Message;
import com.example.demo.repository.MessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public MessageDTO saveMessage(MessageDTO messageDTO) {
        Message message = convertToEntity(messageDTO);
        Message savedMessage = messageRepository.save(message);
        return convertToDTO(savedMessage);
    }

    public List<MessageDTO> getAllMessages() {
        return messageRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public MessageDTO getMessageById(Long id) {
        Message message = messageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Message not found with id: " + id));
        return convertToDTO(message);
    }

    public void deleteMessage(Long id) {
        if (!messageRepository.existsById(id)) {
            throw new RuntimeException("Message not found with id: " + id);
        }
        messageRepository.deleteById(id);
    }

    // Helper method to convert Message entity to MessageDTO
    private MessageDTO convertToDTO(Message message) {
        MessageDTO dto = new MessageDTO();
        dto.setMessageId(message.getId());
        dto.setContent(message.getContent());
        dto.setSenderId(message.getSenderId());
        dto.setTimestamp(message.getTimestamp() != null ? message.getTimestamp().toString() : null);
        return dto;
    }

    // Helper method to convert MessageDTO to Message entity
    private Message convertToEntity(MessageDTO dto) {
        Message message = new Message();
        message.setContent(dto.getContent());
        message.setSenderId(dto.getSenderId());
        return message;
    }
}