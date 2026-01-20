"use client"

import type React from "react"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, X, Upload } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/contexts/auth-context";
import { createPoster } from "@/lib/data/offers";
export default function NewOfferPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { getAuthHeader } = useAuth();
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fullDescription: "",
    price: "",
    type: "For Rent" as "For Rent" | "For Sale" | "Trip",
    category: "",
    location: "",
    contactPhone: "",
    contactEmail: "",
    mainImage: null as File | null,
    additionalImages: [] as (File | null)[],
  })

  // Specifications state
  
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }





  const addAdditionalImage = () => {
    setFormData((prev) => ({
      ...prev,
      additionalImages: [...prev.additionalImages, null],
    }))
  }

  const updateAdditionalImage = (index: number, file: File | null) => {
    const newImages = [...formData.additionalImages]
    newImages[index] = file
    setFormData((prev) => ({ ...prev, additionalImages: newImages }))
  }

  const removeAdditionalImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  const formDataObj = new FormData();
  formDataObj.append('title', formData.title);
  formDataObj.append('description', formData.description);
  formDataObj.append('fullDescription', formData.fullDescription);
  formDataObj.append('price', formData.price);
  formDataObj.append('type', formData.type);
  formDataObj.append('category', formData.category);
  formDataObj.append('location', formData.location);
  formDataObj.append('phone', formData.contactPhone);
  formDataObj.append('email', formData.contactEmail);
  if (formData.mainImage) {
    formDataObj.append('image', formData.mainImage);
  }
  formData.additionalImages.forEach((file) => {
    if (file) {
      formDataObj.append('images', file);
    }
  });

  try {
    const data = await createPoster(formDataObj);
    console.log("Offer created:", data);
    router.push("/admin/offers"); // redirect after success
  } catch (error) {
    console.error("Error creating offer:", error);
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/offers">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Add New Offer</h1>
            <p className="text-muted-foreground">Create a new investment opportunity or service offering.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the main details about the offer.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="title">Offer Title *</Label>
                  <Input
                    id="title"
                    data-cy="title-input"
                    placeholder="e.g., Premium Investment Portfolio"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Offer Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                    <SelectTrigger id="type" data-cy="type-select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="For Rent">For Rent</SelectItem>
                      <SelectItem value="For Sale">For Sale</SelectItem>
                      <SelectItem value="Trip">Trip/Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    id="category"
                    data-cy="category-input"
                    placeholder="e.g., Real Estate, Stocks, Bonds"
                    value={formData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    data-cy="price-input"
                    placeholder="e.g., $50,000 or $150/month"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    data-cy="location-input"
                    placeholder="e.g., Downtown Office, Online"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Short Description *</Label>
                  <Textarea
                    id="description"
                    data-cy="description-textarea"
                    placeholder="Brief description (1-2 sentences)"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={2}
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="fullDescription">Full Description *</Label>
                  <Textarea
                    id="fullDescription"
                    data-cy="full-description-textarea"
                    placeholder="Detailed description of the offer"
                    value={formData.fullDescription}
                    onChange={(e) => handleInputChange("fullDescription", e.target.value)}
                    rows={6}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
              <CardDescription>Add images for the offer. The main image will be displayed in listings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mainImage">Main Image *</Label>
                <div className="flex gap-2">
                  <Input
                    id="mainImage"
                    data-cy="main-image-input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData(prev => ({...prev, mainImage: e.target.files ? e.target.files[0] : null}))}
                    required
                  />
                </div>
                {formData.mainImage && (
                  <div className="mt-2">
                    <img
                      src={URL.createObjectURL(formData.mainImage)}
                      alt="Main preview"
                      className="w-full max-w-md h-48 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Additional Images</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addAdditionalImage} data-cy="add-image-button">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Image
                  </Button>
                </div>
                {formData.additionalImages.map((image, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        type="file"
                        accept="image/*"
                        data-cy="additional-image-input"
                        onChange={(e) => updateAdditionalImage(index, e.target.files ? e.target.files[0] : null)}
                      />
                      <Button type="button" variant="outline" size="icon" onClick={() => removeAdditionalImage(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    {image && (
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Additional ${index + 1}`}
                        className="w-full max-w-md h-32 object-cover rounded-lg border"
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Specifications
          <Card>
            <CardHeader>
              <CardTitle>Specifications</CardTitle>
              <CardDescription>Add key details and specifications for the offer.</CardDescription>
            </CardHeader>
            {/* <CardContent className="space-y-4">
              <div className="space-y-3">
                {specifications.map((spec, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Specification name (e.g., ROI, Duration)"
                      value={spec.key}
                      onChange={(e) => handleSpecificationChange(index, "key", e.target.value)}
                    />
                    <Input
                      placeholder="Value (e.g., 8% annually, 5 years)"
                      value={spec.value}
                      onChange={(e) => handleSpecificationChange(index, "value", e.target.value)}
                    />
                    {specifications.length > 1 && (
                      <Button type="button" variant="outline" size="icon" onClick={() => removeSpecification(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <Button type="button" variant="outline" onClick={addSpecification}>
                <Plus className="h-4 w-4 mr-2" />
                Add Specification
              </Button>
            </CardContent>
          </Card> */}

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Provide contact details for inquiries about this offer.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone *</Label>
                  <Input
                    id="contactPhone"
                    data-cy="contact-phone-input"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email *</Label>
                  <Input
                    id="contactEmail"
                    data-cy="contact-email-input"
                    type="email"
                    placeholder="contact@enjoyinvest.com"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" asChild data-cy="cancel-button">
              <Link href="/admin/offers">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting} data-cy="create-offer-button">
              {isSubmitting ? "Creating..." : "Create Offer"}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
