// package com.example.demo;

// import com.example.demo.model.Message;
// import com.example.demo.repository.MessageRepository;
// import com.example.demo.repository.repoModels.RepoMessage;
// import com.example.demo.service.MessageService;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.mockito.MockitoAnnotations;

// import java.time.LocalDateTime;
// import java.util.Arrays;
// import java.util.List;
// import java.util.Optional;

// import static org.junit.jupiter.api.Assertions.*;
// import static org.mockito.Mockito.*;

// public class MessageServiceTest {

//     @Mock
//     private MessageRepository messageRepository;

//     @InjectMocks
//     private MessageService messageService;

//     @BeforeEach
//     void setUp() {
//         MockitoAnnotations.openMocks(this);
//     }

//     @Test
//     void saveMessage_ShouldSaveAndReturnModel() {
//         Message model = new Message();
//         model.setContent("Hello");
//         model.setSenderId(1L);
//         model.setTimestamp(LocalDateTime.now());

//         RepoMessage repoMessage = new RepoMessage();
//         repoMessage.setId(10L);
//         repoMessage.setContent("Hello");
//         repoMessage.setSenderId(1L);
//         repoMessage.setTimestamp(model.getTimestamp());

//         when(messageRepository.save(any(RepoMessage.class))).thenReturn(repoMessage);

//         Message result = messageService.save(model);

//         assertEquals(10L, result.getId());
//         assertEquals("Hello", result.getContent());
//         assertEquals(1L, result.getSenderId());
//         verify(messageRepository, times(1)).save(any(RepoMessage.class));
//     }

//     @Test
//     void getAllMessages_ShouldReturnListOfModels() {
//         RepoMessage m1 = new RepoMessage();
//         m1.setId(1L);
//         m1.setContent("Test1");
//         m1.setSenderId(101L);
//         m1.setTimestamp(LocalDateTime.now());

//         RepoMessage m2 = new RepoMessage();
//         m2.setId(2L);
//         m2.setContent("Test2");
//         m2.setSenderId(102L);
//         m2.setTimestamp(LocalDateTime.now());

//         when(messageRepository.findAll()).thenReturn(Arrays.asList(m1, m2));

//         List<Message> result = messageService.findAll();

//         assertEquals(2, result.size());
//         assertEquals("Test1", result.get(0).getContent());
//         assertEquals(102L, result.get(1).getSenderId());
//         verify(messageRepository, times(1)).findAll();
//     }

//     @Test
//     void getMessageById_ShouldReturnModel_WhenExists() {
//         RepoMessage repoMessage = new RepoMessage();
//         repoMessage.setId(5L);
//         repoMessage.setContent("Some content");
//         repoMessage.setSenderId(123L);
//         repoMessage.setTimestamp(LocalDateTime.now());

//         when(messageRepository.findById(5L)).thenReturn(Optional.of(repoMessage));

//         Message result = messageService.findById(5L);

//         assertEquals(5L, result.getId());
//         assertEquals("Some content", result.getContent());
//         verify(messageRepository, times(1)).findById(5L);
//     }

//     @Test
//     void getMessageById_ShouldThrow_WhenNotFound() {
//         when(messageRepository.findById(999L)).thenReturn(Optional.empty());
//         assertThrows(RuntimeException.class, () -> messageService.findById(999L));
//     }
// }
