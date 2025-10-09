"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Bookmark } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import type { Offer } from "@/lib/data/offers"

interface OfferCardProps {
  offer: Offer
  onLike?: (id: number) => void
  onSave?: (id: number) => void
}

export function OfferCard({ offer, onLike, onSave }: OfferCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(offer.saved)
  const [likeCount, setLikeCount] = useState(offer.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
    onLike?.(offer.id)
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    onSave?.(offer.id)
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img src={offer.image || "/placeholder.svg"} alt={offer.title} className="w-full h-48 object-cover" />
        <Badge
          className="absolute top-2 right-2"
          variant={offer.type === "For Rent" ? "default" : offer.type === "For Sale" ? "secondary" : "outline"}
        >
          {offer.type}
        </Badge>
      </div>

      <CardHeader>
        <CardTitle className="text-lg">{offer.title}</CardTitle>
        <CardDescription>{offer.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-primary">{offer.price}</span>
          <Badge variant="outline">{offer.category}</Badge>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span>{likeCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>{offer.comments.length}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button size="sm" variant="ghost" onClick={handleLike} className={isLiked ? "text-red-500" : ""}>
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
            </Button>
            <Button size="sm" variant="ghost" onClick={handleSave} className={isSaved ? "text-primary" : ""}>
              <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
            </Button>
            <Button size="sm" asChild>
              <Link href={`/offers/${offer.id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
