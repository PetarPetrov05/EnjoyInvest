"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { type Message, replyToMessage, updateMessageStatus } from "@/lib/data/messages"
import { formatDistanceToNow } from "date-fns"
import { Reply, User, Shield, Crown } from "lucide-react"

interface MessageThreadProps {
  message: Message
  onMessageUpdate?: (message: Message) => void
}

export function MessageThread({ message, onMessageUpdate }: MessageThreadProps) {
  const [replyContent, setReplyContent] = useState("")
  const [isReplying, setIsReplying] = useState(false)

  const handleReply = async () => {
    if (!replyContent.trim()) return

    setIsReplying(true)
    try {
      await replyToMessage(message.id, replyContent, {
        id: "admin1",
        name: "Support Team",
        email: "support@enjoytransport.com",
        role: "admin",
      })

      setReplyContent("")
      if (onMessageUpdate) {
        onMessageUpdate(message)
      }
    } catch (error) {
      console.error("Failed to send reply:", error)
    } finally {
      setIsReplying(false)
    }
  }

  const markAsRead = () => {
    if (message.status === "unread") {
      updateMessageStatus(message.id, "read")
      if (onMessageUpdate) {
        onMessageUpdate(message)
      }
    }
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

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-green-100 text-green-800"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "complaint":
        return "bg-red-100 text-red-800"
      case "support":
        return "bg-blue-100 text-blue-800"
      case "sales":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl">{message.subject}</CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className={getPriorityColor(message.priority)}>
                {message.priority} priority
              </Badge>
              <Badge variant="outline" className={getCategoryColor(message.category)}>
                {message.category}
              </Badge>
              <Badge
                variant="outline"
                className={
                  message.status === "unread"
                    ? "bg-red-100 text-red-800"
                    : message.status === "replied"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                }
              >
                {message.status}
              </Badge>
            </div>
          </div>
          {message.status === "unread" && (
            <Button variant="outline" size="sm" onClick={markAsRead}>
              Mark as Read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Original Message */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>
                {message.sender.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{message.sender.name}</span>
                <Badge variant="outline" className={getRoleColor(message.sender.role)}>
                  {getRoleIcon(message.sender.role)}
                  <span className="ml-1 capitalize">{message.sender.role}</span>
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                {message.sender.email} • {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
              </div>
            </div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
        </div>

        {/* Replies */}
        {message.replies && message.replies.length > 0 && (
          <>
            <Separator />
            <div className="space-y-4">
              <h4 className="font-medium text-sm text-muted-foreground">Replies</h4>
              {message.replies.map((reply) => (
                <div key={reply.id} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {reply.sender.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{reply.sender.name}</span>
                        <Badge variant="outline" className={getRoleColor(reply.sender.role)}>
                          {getRoleIcon(reply.sender.role)}
                          <span className="ml-1 capitalize">{reply.sender.role}</span>
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                  <div className="ml-12 bg-muted/30 rounded-lg p-4">
                    <p className="whitespace-pre-wrap">{reply.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Reply Form */}
        <Separator />
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <Reply className="h-4 w-4" />
            Reply to this message
          </h4>
          <Textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Type your reply here..."
            rows={4}
          />
          <div className="flex justify-end">
            <Button onClick={handleReply} disabled={isReplying || !replyContent.trim()}>
              {isReplying ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Reply className="h-4 w-4 mr-2" />
                  Send Reply
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
