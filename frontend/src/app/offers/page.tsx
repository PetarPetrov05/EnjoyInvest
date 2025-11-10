"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { useState } from "react"
import { Offer } from "@/lib/data/offers"
import { OfferCard } from "@/components/offer-card"
import { useEffect } from "react";
import { getOffers } from "@/lib/data/offers";

export default function OffersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
const [featuredOffers, setFeaturedOffers] = useState<Offer[]>([]);

  useEffect(() => {
    async function loadOffers() {
      const offers = await getOffers();
      setFeaturedOffers(offers);
    }
    loadOffers();
  }, []);
  const filteredOffers = featuredOffers.filter((offer) => {
    const matchesSearch =
      offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || offer.type === filterType
    const matchesCategory = filterCategory === "all" || offer.category === filterCategory

    return matchesSearch && matchesType && matchesCategory
  })

  const handleLike = (id: number) => {
    console.log("Liked offer:", id)
    // In a real app, this would update the backend
  }

  const handleSave = (id: number) => {
    console.log("Saved offer:", id)
    // In a real app, this would update the backend
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header Section */}
      <section className="py-12 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">All Offers</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our complete selection of trucks for rent, trucks for sale, and organized transport trips.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
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

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Heavy Duty">Heavy Duty</SelectItem>
                <SelectItem value="Light Duty">Light Duty</SelectItem>
                <SelectItem value="Commercial">Commercial</SelectItem>
                <SelectItem value="Tourism">Tourism</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredOffers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No offers found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setFilterType("all")
                  setFilterCategory("all")
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredOffers.length} of {featuredOffers  .length} offers
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOffers.map((offer) => (
                  <OfferCard key={offer.id} offer={offer} onLike={handleLike} onSave={handleSave} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
