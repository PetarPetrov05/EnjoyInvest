"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { MessageThread } from "@/components/messaging/message-thread"
import { ContactForm } from "@/components/messaging/contact-form"
import { useAuth } from "@/lib/contexts/auth-context"
import { getMessages, type Message } from "@/lib/data/messages"
import { formatDistanceToNow } from "date-fns"
import { Search, Plus, MessageSquare, Send } from "lucide-react"

export default function UserMessagesPage() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [showNewMessage, setShowNewMessage] = useState(false)

  useEffect(() => {
    // Filter messages for current user (in real app, this would be an API call)
    const allMessages = getMessages()
    const userMessages = allMessages.filter(
      (msg) => msg.sender.email === user?.email || msg.recipient?.email === user?.email,
    )
    setMessages(userMessages)
  }, [user])

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const handleMessageUpdate = (updatedMessage: Message) => {
    setMessages((prev) => prev.map((msg) => (msg.id === updatedMessage.id ? updatedMessage : msg)))
  }

  const getStatusBadge = (status: Message["status"]) => {
    switch (status) {
      case "unread":
        return <Badge variant="destructive">New</Badge>
      case "replied":
        return <Badge variant="default">Replied</Badge>
      case "read":
        return <Badge variant="secondary">Read</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">My Messages</h1>
                <p className="text-muted-foreground">View and manage your conversations with Enjoy Transport.</p>
              </div>
              <Dialog open={showNewMessage} onOpenChange={setShowNewMessage}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Message
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <ContactForm />
                </DialogContent>
              </Dialog>
            </div>

            {/* Search */}
            <Card>
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search your messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Messages List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Your Messages ({filteredMessages.length})
                </CardTitle>
                <CardDescription>Your conversation history with our support team.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 border rounded-lg ${message.status === "unread" ? "bg-muted/50" : ""}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <Avatar>
                            <AvatarFallback>
                              {getInitials(message.sender.email === user?.email ? "You" : message.sender.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-medium">{message.subject}</h3>
                              {getStatusBadge(message.status)}
                            </div>
                            <div className="text-sm text-muted-foreground mb-2">
                              <span>{formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}</span>
                              {message.replies && message.replies.length > 0 && (
                                <span>
                                  {" "}
                                  • {message.replies.length} {message.replies.length === 1 ? "reply" : "replies"}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">{message.content}</p>
                          </div>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedMessage(message)}>
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                            {selectedMessage && (
                              <MessageThread message={selectedMessage} onMessageUpdate={handleMessageUpdate} />
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))}

                  {filteredMessages.length === 0 && (
                    <div className="text-center py-8">
                      <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
                      <p className="text-muted-foreground mb-4">
                        {searchTerm ? "No messages found matching your search." : "Start a conversation with our team."}
                      </p>
                      {!searchTerm && (
                        <Button onClick={() => setShowNewMessage(true)}>
                          <Send className="h-4 w-4 mr-2" />
                          Send Your First Message
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  )
}
