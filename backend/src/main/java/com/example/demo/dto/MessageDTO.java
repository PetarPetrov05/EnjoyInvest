package com.example.demo.dto;

public class MessageDTO {
    private Long messageId;
    private String content;
    private Long senderId;
    private String timestamp;

    // Default constructor
    public MessageDTO() {}

    // Constructor with parameters
    public MessageDTO(Long messageId, String content, Long senderId, String timestamp) {
        this.messageId = messageId;
        this.content = content;
        this.senderId = senderId;
        this.timestamp = timestamp;
    }

    // Getters and Setters
    public Long getMessageId() {
        return messageId;
    }

    public void setMessageId(Long messageId) {
        this.messageId = messageId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getSenderId() {
        return senderId;
    }

    public void setSenderId(Long senderId) {
        this.senderId = senderId;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}