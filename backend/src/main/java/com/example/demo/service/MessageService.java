// package com.example.demo.service;

// import com.example.demo.model.Message;
// import com.example.demo.repository.MessageRepository;
// import com.example.demo.repository.repoModels.RepoMessage;
// import org.springframework.stereotype.Service;

// import java.util.List;
// import java.util.stream.Collectors;

// @Service
// public class MessageService {

//     private final MessageRepository messageRepository;

//     public MessageService(MessageRepository messageRepository) {
//         this.messageRepository = messageRepository;
//     }

//     public Message save(Message message) {
//         RepoMessage repoMessage = toRepoModel(message);
//         RepoMessage saved = messageRepository.save(repoMessage);
//         return toModel(saved);
//     }

//     public List<Message> findAll() {
//         return ((List<RepoMessage>) messageRepository.findAll())
//                 .stream()
//                 .map(this::toModel)
//                 .collect(Collectors.toList());
//     }

//     public Message findById(Long id) {
//         RepoMessage repoMessage = messageRepository.findById(id)
//                 .orElseThrow(() -> new RuntimeException("Message not found with id: " + id));
//         return toModel(repoMessage);
//     }

//     private com.example.demo.repository.repoModels.RepoMessage toRepoModel(Message message) {
//         com.example.demo.repository.repoModels.RepoMessage repo = new com.example.demo.repository.repoModels.RepoMessage();
//         repo.setId(message.getId());
//         repo.setContent(message.getContent());
//         repo.setTimestamp(message.getTimestamp());
//         repo.setSenderId(message.getSenderId());
//         return repo;
//     }

//     private Message toModel(com.example.demo.repository.repoModels.RepoMessage repoMessage) {
//         Message model = new Message();
//         model.setId(repoMessage.getId());
//         model.setContent(repoMessage.getContent());
//         model.setSenderId(repoMessage.getSenderId());
//         model.setTimestamp(repoMessage.getTimestamp());
//         return model;
//     }
// }
