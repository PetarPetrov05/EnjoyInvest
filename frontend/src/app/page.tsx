"use client";
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Shield, Clock, ArrowRight, CheckCircle2, Target, BarChart3, Sparkles } from "lucide-react"
import Link from "next/link"
import { Offer } from "@/lib/data/offers"
import { OfferCard } from "@/components/offer-card"
import { useEffect, useState } from "react";
import { getOffers } from "@/lib/data/offers";

export default function HomePage() {
  const [featuredOffers, setFeaturedOffers] = useState<Offer[]>([]);

  useEffect(() => {
    async function loadOffers() {
      const offers = await getOffers();
      setFeaturedOffers(offers.slice(0, 3));
    }
    loadOffers();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-24 md:py-32">
        <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Trusted Truck & Land Marketplace</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Find Your Next
              <span className="block text-primary mt-2">Truck or Land</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Browse available trucks and land for sale or rent. Compare listings, contact sellers, and secure your next vehicle or property quickly and safely.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="text-lg px-8 h-14" asChild>
                <Link href="/offers">
                  Browse Listings
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 h-14" asChild>
                <Link href="/contact">Contact Seller</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t max-w-2xl mx-auto">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground mt-1">Trucks & Land Listed</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary">100+</div>
                <div className="text-sm text-muted-foreground mt-1">Active Sellers</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground mt-1">Satisfied Buyers & Renters</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide a secure platform with verified listings, competitive prices, and professional guidance for buying or renting trucks and land.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Wide Selection</CardTitle>
                <CardDescription>
                  Choose from a large variety of trucks and land properties for sale or rent.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Safe & Verified</CardTitle>
                <CardDescription>
                  All listings are verified and secure, so you can buy or rent with confidence.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Expert Support</CardTitle>
                <CardDescription>
                  Our team helps you find the right truck or property that fits your needs.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Track Listings</CardTitle>
                <CardDescription>
                  Keep track of your saved listings and get updates on availability and price changes.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Offers Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Target className="w-4 h-4" />
              <span>Handpicked Listings</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Trucks & Land</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our top picks for trucks and land properties currently available for sale or rent.
            </p>
          </div>

          <div id="offers" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredOffers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="text-lg px-8 h-14" asChild>
              <Link href="/offers">
                View All Listings
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Rent or buy your next truck or property in three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connection Lines for Desktop */}
            <div className="hidden md:block absolute top-1/4 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
            
            <div className="relative">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto relative z-10">
                  1
                </div>
                <h3 className="text-xl font-bold">Create Account</h3>
                <p className="text-muted-foreground">
                  Sign up in minutes and start browsing available trucks and land properties.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto relative z-10">
                  2
                </div>
                <h3 className="text-xl font-bold">Browse Listings</h3>
                <p className="text-muted-foreground">
                  Filter and explore trucks and land properties available for rent or purchase.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto relative z-10">
                  3
                </div>
                <h3 className="text-xl font-bold">Buy or Rent</h3>
                <p className="text-muted-foreground">
                  Contact sellers directly and complete your transaction securely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent" />
        <div className="absolute inset-0 bg-grid-white/[0.05]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center text-white space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">Ready to Find Your Truck or Land?</h2>
            <p className="text-xl opacity-90">
              Thousands of trucks and land properties available for rent or purchase. Start browsing today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" variant="secondary" className="text-lg px-8 h-14" asChild>
                <Link href="/contact">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 h-14 bg-white/10 hover:bg-white/20 text-white border-white/30" asChild>
                <Link href="/offers">View Listings</Link>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 pt-8">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>No Hidden Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Secure Platform</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
