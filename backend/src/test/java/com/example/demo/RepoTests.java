package com.example.demo;

import org.junit.jupiter.api.Test;
import com.example.demo.repository.repoModels.RepoMessage;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class RepoTest {

    @Test
    void testNoArgsConstructor_DefaultValues() {
        RepoMessage message = new RepoMessage();

        assertNull(message.getId());
        assertNull(message.getContent());
        assertNull(message.getSenderId());
        assertNotNull(message.getTimestamp()); // timestamp is initialized automatically
    }

    @Test
    void testAllArgsConstructor_SetsValues() {
        String content = "Hello world!";
        Long senderId = 42L;

        RepoMessage message = new RepoMessage(content, senderId);

        assertNull(message.getId()); // ID not set until saved in DB
        assertEquals(content, message.getContent());
        assertEquals(senderId, message.getSenderId());
        assertNotNull(message.getTimestamp());
        assertTrue(message.getTimestamp().isBefore(LocalDateTime.now().plusSeconds(1)));
    }

    @Test
    void testSettersAndGetters() {
        RepoMessage message = new RepoMessage();

        message.setId(1L);
        message.setContent("Test content");
        LocalDateTime now = LocalDateTime.now();
        message.setTimestamp(now);
        message.setSenderId(99L);

        assertEquals(1L, message.getId());
        assertEquals("Test content", message.getContent());
        assertEquals(now, message.getTimestamp());
        assertEquals(99L, message.getSenderId());
    }

    @Test
    void testTimestampDefaultValueInField() {
        RepoMessage message = new RepoMessage();
        message.setContent("Test");

        // The field initializer sets timestamp to now
        assertNotNull(message.getTimestamp());
        assertTrue(message.getTimestamp().isBefore(LocalDateTime.now().plusSeconds(1)));
    }

    @Test
    void testEqualityByProperties() {
        RepoMessage msg1 = new RepoMessage("Hello", 1L);
        RepoMessage msg2 = new RepoMessage("Hello", 1L);

        // IDs are null, content and senderId match
        assertEquals(msg1.getContent(), msg2.getContent());
        assertEquals(msg1.getSenderId(), msg2.getSenderId());

        // timestamps are different objects but should be set
        assertNotNull(msg1.getTimestamp());
        assertNotNull(msg2.getTimestamp());
    }
}
