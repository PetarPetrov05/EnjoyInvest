"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, X, Upload } from "lucide-react";
import { notFound } from "next/navigation";
import { useAuth } from "@/lib/contexts/auth-context";
import { getOfferById,updateOffer, BACKEND_URL } from "@/lib/data/offers";

interface EditOfferPageProps {
  params: {
    id: string;
  };
}

export default function EditOfferPage({ params }: EditOfferPageProps) {
  const router = useRouter();
  const { getAuthHeader } = useAuth(); // ✅ call hook at top
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [offer, setOffer] = useState<any>(null);

  // Current images
  const [currentMainImage, setCurrentMainImage] = useState<string>("");
  const [currentAdditionalImages, setCurrentAdditionalImages] = useState<string[]>([]);

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
  });

  const [specifications, setSpecifications] = useState<Array<{ key: string; value: string }>>([{ key: "", value: "" }]);

  // Load offer data
  useEffect(() => {
    const loadOffer = async () => {
      const loadedOffer = await getOfferById(Number(params.id));
      if (!loadedOffer) notFound();

      const additionalImages = loadedOffer.images.filter((img: string) => img !== loadedOffer.image);

      setFormData({
        title: loadedOffer.title,
        description: loadedOffer.description,
        fullDescription: loadedOffer.fullDescription,
        price: loadedOffer.price,
        type: loadedOffer.type,
        category: loadedOffer.category,
        location: loadedOffer.location,
        contactPhone: loadedOffer.phone,
        contactEmail: loadedOffer.email,
        mainImage: null,
        additionalImages: [],
      });

      setCurrentMainImage(loadedOffer.image);
      setCurrentAdditionalImages(additionalImages);

      // Load specifications if present
      if (loadedOffer.specifications) {
        const specsArr = Object.entries(loadedOffer.specifications).map(([key, value]) => ({ key, value }));
        setSpecifications(specsArr.length ? specsArr : [{ key: "", value: "" }]);
      }

      setOffer(loadedOffer);
      setIsLoading(false);
    };

    loadOffer();
  }, [params.id]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  // Additional images handlers
  const addAdditionalImage = () => setFormData((prev) => ({ ...prev, additionalImages: [...prev.additionalImages, null] }));
  const updateAdditionalImage = (index: number, file: File | null) => {
    const newImages = [...formData.additionalImages];
    newImages[index] = file;
    setFormData((prev) => ({ ...prev, additionalImages: newImages }));
  };
  const removeAdditionalImage = (index: number) => {
    setFormData((prev) => ({ ...prev, additionalImages: prev.additionalImages.filter((_, i) => i !== index) }));
  };

  const formatLocalDateTime = (date: Date) => {
  const pad = (n: number) => n.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};
  // Submit update
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
      await updateOffer(Number(params.id), formDataObj);
      router.push("/admin/offers");
    } catch (err) {
      console.error("Update failed", err);
      setIsSubmitting(false);
    }
  };

  if (isLoading)
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Loading offer...</p>
        </div>
      </AdminLayout>
    );

  if (!offer) notFound();

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
            <h1 className="text-3xl font-bold">Edit Offer</h1>
            <p className="text-muted-foreground">Update the details for this offer.</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Update the main details about the offer.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="title">Offer Title *</Label>
                  <Input id="title" value={formData.title} onChange={(e) => handleInputChange("title", e.target.value)} required data-cy="title-input" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Offer Type *</Label>
                  <Select value={formData.type} onValueChange={(val) => handleInputChange("type", val)}>
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
                  <Input id="category" value={formData.category} onChange={(e) => handleInputChange("category", e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price *</Label>
                  <Input id="price" value={formData.price} onChange={(e) => handleInputChange("price", e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input id="location" value={formData.location} onChange={(e) => handleInputChange("location", e.target.value)} required />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Short Description *</Label>
                  <Textarea id="description" value={formData.description} onChange={(e) => handleInputChange("description", e.target.value)} rows={2} required />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="fullDescription">Full Description *</Label>
                  <Textarea id="fullDescription" value={formData.fullDescription} onChange={(e) => handleInputChange("fullDescription", e.target.value)} rows={6} required />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
              <CardDescription>The main image will be displayed in listings. Upload new images to replace existing ones.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Main Image</Label>
                {currentMainImage && (
                  <div className="mb-2">
                    <p className="text-sm text-muted-foreground">Current:</p>
                    <img src={`${BACKEND_URL}/images/${currentMainImage}`} alt="Current Main" className="w-full max-w-md h-48 object-cover rounded-lg border" />
                  </div>
                )}
                <div className="flex gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData(prev => ({...prev, mainImage: e.target.files ? e.target.files[0] : null}))}
                  />
                </div>
                {formData.mainImage && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground">New:</p>
                    <img src={URL.createObjectURL(formData.mainImage)} alt="New Main" className="w-full max-w-md h-48 object-cover rounded-lg border" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Additional Images</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addAdditionalImage}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Image
                  </Button>
                </div>
                {currentAdditionalImages.length > 0 && (
                  <div className="mb-2">
                    <p className="text-sm text-muted-foreground">Current:</p>
                    <div className="grid grid-cols-4 gap-2">
                      {currentAdditionalImages.map((image, index) => (
                        <img
                          key={index}
                          src={`${BACKEND_URL}/images/${image}`}
                          alt={`Current Additional ${index + 1}`}
                          className="w-full h-20 object-cover rounded"
                        />
                      ))}
                    </div>
                  </div>
                )}
                {formData.additionalImages.map((file, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => updateAdditionalImage(index, e.target.files ? e.target.files[0] : null)}
                      />
                      <Button type="button" variant="outline" size="icon" onClick={() => removeAdditionalImage(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    {file && (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`New Additional ${index + 1}`}
                        className="w-full max-w-md h-32 object-cover rounded-lg border"
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phone *</Label>
                <Input value={formData.contactPhone} onChange={(e) => handleInputChange("contactPhone", e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Email *</Label>
                <Input value={formData.contactEmail} onChange={(e) => handleInputChange("contactEmail", e.target.value)} required />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" asChild>
              <Link href="/admin/offers">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting} data-cy="save-changes-button">
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
