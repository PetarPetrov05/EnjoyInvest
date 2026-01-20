package com.example.demo;

import com.example.demo.model.Message;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class MessageUnitTests {

    @Test
    void testConstructorsAndSettersGetters() {
        // Default constructor
        Message msg1 = new Message();
        msg1.setId(1L);
        msg1.setContent("Hello");
        LocalDateTime now = LocalDateTime.now();
        msg1.setTimestamp(now);
        msg1.setSenderId(2L);

        assertEquals(1L, msg1.getId());
        assertEquals("Hello", msg1.getContent());
        assertEquals(now, msg1.getTimestamp());
        assertEquals(2L, msg1.getSenderId());

        // All-args constructor
        Message msg2 = new Message(3L, "World", now, 4L);
        assertEquals(3L, msg2.getId());
        assertEquals("World", msg2.getContent());
        assertEquals(now, msg2.getTimestamp());
        assertEquals(4L, msg2.getSenderId());
    }
}
