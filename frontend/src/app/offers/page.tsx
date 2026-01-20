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
import { useTranslation } from 'react-i18next';

export default function OffersPage() {
  const { t } = useTranslation();
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
            <h1 className="text-4xl font-bold mb-4">{t('offers.title')}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('offers.description')}
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('offers.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-cy="search-input"
              />
            </div>

            <Select value={filterType} onValueChange={setFilterType} data-cy="type-filter">
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder={t('offers.filterByType')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('offers.allTypes')}</SelectItem>
                <SelectItem value="For Rent">{t('offers.forRent')}</SelectItem>
                <SelectItem value="For Sale">{t('offers.forSale')}</SelectItem>
                <SelectItem value="Trip">{t('offers.trips')}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterCategory} onValueChange={setFilterCategory} data-cy="category-filter">
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder={t('offers.filterByCategory')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('offers.allCategories')}</SelectItem>
                <SelectItem value="Heavy Duty">{t('offers.heavyDuty')}</SelectItem>
                <SelectItem value="Light Duty">{t('offers.lightDuty')}</SelectItem>
                <SelectItem value="Commercial">{t('offers.commercial')}</SelectItem>
                <SelectItem value="Tourism">{t('offers.tourism')}</SelectItem>
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
              <p className="text-muted-foreground text-lg">{t('offers.noOffersFound')}</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setFilterType("all")
                  setFilterCategory("all")
                }}
                className="mt-4"
              >
                {t('offers.clearFilters')}
              </Button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-muted-foreground">
                  {t('offers.showingResults', { count: filteredOffers.length, total: featuredOffers.length })}
                </p>
              </div>

              <div id="offers" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-cy="offers-grid">
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
