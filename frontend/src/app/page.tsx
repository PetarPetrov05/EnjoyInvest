import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Shield, Clock } from "lucide-react"
import Link from "next/link"
import { offers } from "@/lib/data/offers"
import { OfferCard } from "@/components/offer-card"

export default function HomePage() {
  // Get first 3 offers as featured opportunities
  const featuredOffers = offers.slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-accent/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-balance">
              Your Trusted Partner in <span className="text-primary">Investment</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              From portfolio management and investment opportunities to financial planning, we provide comprehensive
              investment solutions for all your wealth-building needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/offers">Explore Opportunities</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Enjoy Invest?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing reliable, secure, and profitable investment solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="text-center">
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Diverse Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Well-researched investment opportunities across various sectors and risk levels.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Expert Team</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Professional financial advisors and analysts with years of experience in investment management.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Security First</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Comprehensive risk management and secure investment protocols for peace of mind.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>24/7 Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Round-the-clock customer support for all your investment needs and questions.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Offers Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Opportunities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Check out our latest investment opportunities and portfolio options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredOffers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Button size="lg" variant="outline" asChild>
              <Link href="/offers">View All Opportunities</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Investing?</h2>
          <p className="text-xl mb-8 opacity-90">Contact us today for personalized investment solutions.</p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Start Investing Now</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
