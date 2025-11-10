"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Heart, MessageCircle, Bookmark, Phone, Mail, MapPin, Calendar, Share2, ArrowLeft } from "lucide-react";

import { getOfferById } from "@/lib/data/offers";
import type { Offer } from "@/lib/data/offers";

export default function OfferDetailPage() {
  const params = useParams();
  const id = params?.id;

  const [offer, setOffer] = useState<Offer | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    async function fetchOffer() {
      if (!id) return;
      const data = await getOfferById(Number(id));
      if (!data) return; // optionally handle not found
      setOffer(data);
      setIsSaved(data.saved);
      setLikeCount(data.likes);
    }
    fetchOffer();
  }, [id]);

  if (!offer) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));
  };

  const handleSave = () => setIsSaved(!isSaved);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      console.log("New comment:", newComment);
      alert("Comment submitted! (This would be saved in a real application)");
      setNewComment("");
    }
  };

  const handleContactSubmit = () => setShowContactForm(true);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/offers" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Offers</span>
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={offer.image || "/placeholder.svg"}
                    alt={offer.title}
                    className="w-full h-96 object-cover rounded-t-lg"
                  />
                  <Badge
                    className="absolute top-4 right-4"
                    variant={
                      offer.type === "For Rent"
                        ? "default"
                        : offer.type === "For Sale"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {offer.type}
                  </Badge>
                </div>

                {/* Additional Images */}
                {offer.images.length > 1 && (
                  <div className="p-4">
                    <div className="grid grid-cols-4 gap-2">
                      {offer.images.slice(1).map((image, index) => (
                        <img
                          key={index}
                          src={image || "/placeholder.svg"}
                          alt={`${offer.title} ${index + 2}`}
                          className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Offer Details */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl">{offer.title}</CardTitle>
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline">{offer.category}</Badge>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{offer.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">{offer.price}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-6">{offer.fullDescription}</p>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLike}
                      className={isLiked ? "text-red-500" : ""}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                      {likeCount}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {/* {offer.comments.length} */}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSave}
                      className={isSaved ? "text-primary" : ""}
                    >
                      <Bookmark className={`h-4 w-4 mr-2 ${isSaved ? "fill-current" : ""}`} />
                      {isSaved ? "Saved" : "Save"}
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Specifications */}
            {offer.specifications && (
              <Card>
                <CardHeader>
                  <CardTitle>Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(offer.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-border last:border-b-0">
                        <span className="font-medium">{key}:</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Comments Section */}
            <Card>
              <CardHeader>
                <CardTitle>Comments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* {offer.comments.map(comment => (
                  <div key={comment.id} className="flex space-x-4">
                    <Avatar>
                      <AvatarFallback>
                        {comment.author
                          .split(" ")
                          .map(n => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{comment.author}</span>
                        <span className="text-sm text-muted-foreground">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{comment.content}</p>
                    </div>
                  </div>
                ))} */}

                <Separator />

                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="comment">Add a comment</Label>
                    <Textarea
                      id="comment"
                      value={newComment}
                      onChange={e => setNewComment(e.target.value)}
                      placeholder="Share your thoughts about this offer..."
                      rows={3}
                    />
                  </div>
                  <Button type="submit" disabled={!newComment.trim()}>
                    Post Comment
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact About This Offer</CardTitle>
                <CardDescription>
                  Get in touch with us to learn more or make a reservation.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-sm">{offer.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-sm">{offer.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm">
                      Updated {new Date(offer.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <Separator />

                <Button className="w-full" onClick={handleContactSubmit}>
                  Contact Company About This Offer
                </Button>

                {showContactForm && (
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Contact form would open here in a real application, allowing users to send a message directly
                      about this specific offer.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Type:</span>
                  <Badge variant="outline">{offer.type}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Category:</span>
                  <span className="text-sm text-muted-foreground">{offer.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Location:</span>
                  <span className="text-sm text-muted-foreground">{offer.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Listed:</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(offer.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
