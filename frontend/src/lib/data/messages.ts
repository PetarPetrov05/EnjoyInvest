export interface Message {
  id: string
  subject: string
  content: string
  sender: {
    id: string
    name: string
    email: string
    role: "user" | "approved" | "admin"
  }
  recipient?: {
    id: string
    name: string
    email: string
    role: "user" | "approved" | "admin"
  }
  status: "unread" | "read" | "replied"
  priority: "low" | "medium" | "high"
  category: "general" | "support" | "sales" | "complaint"
  createdAt: string
  updatedAt: string
  replies?: MessageReply[]
}

export interface MessageReply {
  id: string
  content: string
  sender: {
    id: string
    name: string
    email: string
    role: "user" | "approved" | "admin"
  }
  createdAt: string
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  category: "general" | "support" | "sales" | "complaint"
}

// Mock messages data
export const mockMessages: Message[] = [
  {
    id: "1",
    subject: "Inquiry about truck rental rates",
    content:
      "Hi, I need to rent a truck for a weekend move. Can you provide pricing information for your medium-sized trucks?",
    sender: {
      id: "user1",
      name: "John Smith",
      email: "john.smith@email.com",
      role: "user",
    },
    status: "unread",
    priority: "medium",
    category: "sales",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    subject: "Issue with recent truck purchase",
    content:
      "I purchased a truck last month (Order #12345) and I'm experiencing some issues with the engine. Can someone help me with warranty service?",
    sender: {
      id: "user2",
      name: "Sarah Johnson",
      email: "sarah.j@company.com",
      role: "approved",
    },
    status: "replied",
    priority: "high",
    category: "support",
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-14T16:45:00Z",
    replies: [
      {
        id: "reply1",
        content:
          "Thank you for contacting us. We'll have our service team reach out to you within 24 hours to schedule an inspection.",
        sender: {
          id: "admin1",
          name: "Mike Wilson",
          email: "mike@enjoytransport.com",
          role: "admin",
        },
        createdAt: "2024-01-14T16:45:00Z",
      },
    ],
  },
  {
    id: "3",
    subject: "Group transport for corporate event",
    content:
      "We need transportation for 50 employees for a corporate retreat. Do you offer group transport services? The event is scheduled for March 15th.",
    sender: {
      id: "user3",
      name: "David Chen",
      email: "david.chen@techcorp.com",
      role: "approved",
    },
    status: "read",
    priority: "medium",
    category: "sales",
    createdAt: "2024-01-13T09:15:00Z",
    updatedAt: "2024-01-13T11:30:00Z",
  },
  {
    id: "4",
    subject: "Complaint about service quality",
    content:
      "I rented a truck last week and was very disappointed with the condition of the vehicle. It was dirty and had mechanical issues.",
    sender: {
      id: "user4",
      name: "Lisa Brown",
      email: "lisa.brown@email.com",
      role: "user",
    },
    status: "unread",
    priority: "high",
    category: "complaint",
    createdAt: "2024-01-12T16:00:00Z",
    updatedAt: "2024-01-12T16:00:00Z",
  },
]

export const getMessages = (): Message[] => {
  return mockMessages
}

export const getMessageById = (id: string): Message | undefined => {
  return mockMessages.find((message) => message.id === id)
}

export const getMessagesByStatus = (status: Message["status"]): Message[] => {
  return mockMessages.filter((message) => message.status === status)
}

export const getMessagesByCategory = (category: Message["category"]): Message[] => {
  return mockMessages.filter((message) => message.category === category)
}

export const sendMessage = (messageData: ContactFormData): Promise<Message> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        subject: messageData.subject,
        content: messageData.message,
        sender: {
          id: "temp-user",
          name: messageData.name,
          email: messageData.email,
          role: "user",
        },
        status: "unread",
        priority: "medium",
        category: messageData.category,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      mockMessages.unshift(newMessage)
      resolve(newMessage)
    }, 1000)
  })
}

export const replyToMessage = (
  messageId: string,
  replyContent: string,
  sender: MessageReply["sender"],
): Promise<MessageReply> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const message = mockMessages.find((m) => m.id === messageId)
      if (message) {
        const reply: MessageReply = {
          id: Date.now().toString(),
          content: replyContent,
          sender,
          createdAt: new Date().toISOString(),
        }

        if (!message.replies) {
          message.replies = []
        }
        message.replies.push(reply)
        message.status = "replied"
        message.updatedAt = new Date().toISOString()

        resolve(reply)
      }
    }, 500)
  })
}

export const updateMessageStatus = (messageId: string, status: Message["status"]): void => {
  const message = mockMessages.find((m) => m.id === messageId)
  if (message) {
    message.status = status
    message.updatedAt = new Date().toISOString()
  }
}
