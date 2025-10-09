"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { MessageThread } from "@/components/messaging/message-thread"
import { Search, Reply, Eye, Clock, CheckCircle, User, Shield, Crown } from "lucide-react"
import { useState, useEffect } from "react"
import { getMessages, type Message } from "@/lib/data/messages"
import { formatDistanceToNow } from "date-fns"

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | Message["status"]>("all")
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  useEffect(() => {
    setMessages(getMessages())
  }, [])

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || message.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const handleMessageUpdate = (updatedMessage: Message) => {
    setMessages((prev) => prev.map((msg) => (msg.id === updatedMessage.id ? updatedMessage : msg)))
  }

  const getStatusBadge = (status: Message["status"]) => {
    switch (status) {
      case "unread":
        return <Badge variant="destructive">Unread</Badge>
      case "replied":
        return <Badge variant="default">Replied</Badge>
      case "read":
        return <Badge variant="secondary">Read</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: Message["priority"]) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return <Badge variant="outline">Medium</Badge>
      case "low":
        return <Badge variant="secondary">Low</Badge>
      default:
        return null
    }
  }

  const getCategoryBadge = (category: Message["category"]) => {
    const colors = {
      complaint: "bg-red-100 text-red-800",
      support: "bg-blue-100 text-blue-800",
      sales: "bg-green-100 text-green-800",
      general: "bg-gray-100 text-gray-800",
    }

    return (
      <Badge variant="outline" className={colors[category]}>
        {category}
      </Badge>
    )
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="h-3 w-3" />
      case "approved":
        return <Shield className="h-3 w-3" />
      default:
        return <User className="h-3 w-3" />
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
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground">Manage customer inquiries and communications.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-red-100 rounded-full">
                  <Clock className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Unread</p>
                  <p className="text-2xl font-bold">{messages.filter((m) => m.status === "unread").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Eye className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Read</p>
                  <p className="text-2xl font-bold">{messages.filter((m) => m.status === "read").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Replied</p>
                  <p className="text-2xl font-bold">{messages.filter((m) => m.status === "replied").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-orange-100 rounded-full">
                  <Reply className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Total</p>
                  <p className="text-2xl font-bold">{messages.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("all")}
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === "unread" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("unread")}
                >
                  Unread
                </Button>
                <Button
                  variant={filterStatus === "read" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("read")}
                >
                  Read
                </Button>
                <Button
                  variant={filterStatus === "replied" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("replied")}
                >
                  Replied
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Messages List */}
        <Card>
          <CardHeader>
            <CardTitle>Messages ({filteredMessages.length})</CardTitle>
            <CardDescription>Customer inquiries and communications.</CardDescription>
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
                        <AvatarFallback>{getInitials(message.sender.name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1 flex-wrap">
                          <h3 className="font-medium">{message.subject}</h3>
                          {getPriorityBadge(message.priority)}
                          {getCategoryBadge(message.category)}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2 flex-wrap">
                          <div className="flex items-center gap-1">
                            {getRoleIcon(message.sender.role)}
                            <span>From: {message.sender.name}</span>
                          </div>
                          <span>•</span>
                          <span>{message.sender.email}</span>
                          <span>•</span>
                          <span>{formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}</span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{message.content}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {getStatusBadge(message.status)}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedMessage(message)}>
                            <Eye className="h-4 w-4 mr-2" />
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
                </div>
              ))}

              {filteredMessages.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No messages found matching your criteria.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
