"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { useEffect } from "react";

import { useAuth } from "@/lib/contexts/auth-context";
import { getOffers,deletePoster } from "@/lib/data/offers";
import { BACKEND_URL } from "@/lib/data/offers";
import type { Offer } from "@/lib/data/offers"

export default function AdminOffersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
const [featuredOffers, setFeaturedOffers] = useState<Offer[]>([]);
  const { getAuthHeader } = useAuth();
    useEffect(() => {
      async function loadOffers() {
        const offers = await getOffers();
        setFeaturedOffers(offers);
      }
      loadOffers();
    }, []);
  // Add status to offers for admin view
  const adminOffers = featuredOffers.map((offer) => ({
    ...offer,
    status: Math.random() > 0.2 ? "active" : "inactive",
    views: Math.floor(Math.random() * 500) + 50,
  }))

  const filteredOffers = adminOffers.filter((offer) => {
    const matchesSearch =
      offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || offer.type === filterType
    const matchesStatus = filterStatus === "all" || offer.status === filterStatus

    return matchesSearch && matchesType && matchesStatus
  })

  const handleDelete = async (id: number) => {
  if (confirm("Are you sure you want to delete this offer?")) {
    try {
    await deletePoster(id); // ✅ pass the token function
    console.log("Poster deleted successfully");
    // optionally, refresh UI or navigate
  } catch (error) {
    console.error("Failed to delete poster:", error);
  }
  }
};

  const handleToggleStatus = (id: number) => {
    console.log("Toggle status for offer:", id)
    // In real app, this would call API to update status
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Offers Management</h1>
            <p className="text-muted-foreground">Manage all truck rentals, sales, and trip offers.</p>
          </div>
          <Button asChild>
            <Link href="/admin/offers/new">
              <Plus className="mr-2 h-4 w-4" />
              Add New Offer
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Offers</CardTitle>
            <CardDescription>Search and filter offers by type, status, and keywords.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search offers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="For Rent">For Rent</SelectItem>
                  <SelectItem value="For Sale">For Sale</SelectItem>
                  <SelectItem value="Trip">Trips</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Offers Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Offers ({filteredOffers.length})</CardTitle>
            <CardDescription>Complete list of offers with management options.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Offer</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Likes</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOffers.map((offer) => (
                    <TableRow key={offer.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img
                            src={offer.image ? `${BACKEND_URL}/images/${offer.image}` : "/placeholder.svg"}
                            alt={offer.title}
                            className="w-10 h-10 rounded object-cover"
                          />
                          <div>
                            <div className="font-medium">{offer.title}</div>
                            <div className="text-sm text-muted-foreground">{offer.location}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            offer.type === "For Rent" ? "default" : offer.type === "For Sale" ? "secondary" : "outline"
                          }
                        >
                          {offer.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{offer.category}</TableCell>
                      <TableCell className="font-medium">{offer.price}</TableCell>
                      <TableCell>
                        <Badge variant={offer.status === "active" ? "default" : "secondary"}>{offer.status}</Badge>
                      </TableCell>
                      <TableCell>{offer.views}</TableCell>
                      <TableCell>{offer.likes}</TableCell>
                      <TableCell>{new Date(offer.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link href={`/offers/${offer.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Offer
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/offers/${offer.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Offer
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleToggleStatus(offer.id)}>
                              {offer.status === "active" ? "Deactivate" : "Activate"}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(offer.id)} className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
