"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { MessageThread } from "@/components/messaging/message-thread"
import { Button } from "@/components/ui/button"
import { getMessageById, type Message } from "@/lib/data/messages"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

interface MessageDetailPageProps {
  params: {
    id: string
  }
}

export default function MessageDetailPage({ params }: MessageDetailPageProps) {
  const [message, setMessage] = useState<Message | null>(null)

  useEffect(() => {
    const foundMessage = getMessageById(params.id)
    setMessage(foundMessage || null)
  }, [params.id])

  const handleMessageUpdate = (updatedMessage: Message) => {
    setMessage(updatedMessage)
  }

  if (!message) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Link href="/admin/messages">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Messages
              </Button>
            </Link>
          </div>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Message not found.</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/messages">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Messages
            </Button>
          </Link>
        </div>

        <MessageThread message={message} onMessageUpdate={handleMessageUpdate} />
      </div>
    </AdminLayout>
  )
}
