import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, Users, Award, MapPin, Clock, Shield } from "lucide-react"

export default function CompanyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-balance">
              About <span className="text-primary">Enjoy Transport</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              With over 15 years of experience in the transportation industry, we've built our reputation on
              reliability, safety, and exceptional customer service.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Our Mission</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To provide reliable, safe, and affordable transportation solutions that exceed our customers'
                expectations. We're committed to building long-term relationships through exceptional service and
                innovative solutions.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Whether you need a truck for a day, looking to purchase a quality vehicle, or planning an organized
                trip, we're here to make your transportation experience seamless and enjoyable.
              </p>
            </div>
            <div className="relative">
              <img
                src="/professional-transport-company-office.jpg"
                alt="Enjoy Transport Office"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Achievements</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Numbers that speak to our commitment and success in the transportation industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Truck className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold">500+</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Vehicles in Our Fleet</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold">10,000+</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Satisfied Customers</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold">15+</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Years of Experience</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold">50+</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Cities Served</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive transportation solutions tailored to meet your specific needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Truck className="h-8 w-8 text-primary" />
                  <Badge>Popular</Badge>
                </div>
                <CardTitle>Truck Rental</CardTitle>
                <CardDescription>Short-term and long-term truck rentals for all your hauling needs.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Light duty pickup trucks</li>
                  <li>• Heavy duty commercial trucks</li>
                  <li>• Box trucks and vans</li>
                  <li>• Specialized equipment trucks</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Award className="h-8 w-8 text-primary" />
                  <Badge variant="secondary">Quality</Badge>
                </div>
                <CardTitle>Truck Sales</CardTitle>
                <CardDescription>High-quality pre-owned and new trucks with comprehensive warranties.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Certified pre-owned vehicles</li>
                  <li>• New truck dealership</li>
                  <li>• Financing options available</li>
                  <li>• Trade-in programs</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Users className="h-8 w-8 text-primary" />
                  <Badge variant="outline">Adventure</Badge>
                </div>
                <CardTitle>Organized Trips</CardTitle>
                <CardDescription>Comfortable and safe group transportation for tours and events.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• City tours and sightseeing</li>
                  <li>• Corporate events transport</li>
                  <li>• Multi-day trip packages</li>
                  <li>• Custom itinerary planning</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at Enjoy Transport.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <Shield className="h-16 w-16 text-primary mx-auto" />
              <h3 className="text-xl font-semibold">Safety First</h3>
              <p className="text-muted-foreground">
                We prioritize the safety of our customers, drivers, and the public in everything we do. All our vehicles
                undergo regular maintenance and safety inspections.
              </p>
            </div>

            <div className="text-center space-y-4">
              <Clock className="h-16 w-16 text-primary mx-auto" />
              <h3 className="text-xl font-semibold">Reliability</h3>
              <p className="text-muted-foreground">
                Count on us to be there when you need us. We pride ourselves on punctuality, dependability, and
                consistent service quality.
              </p>
            </div>

            <div className="text-center space-y-4">
              <Users className="h-16 w-16 text-primary mx-auto" />
              <h3 className="text-xl font-semibold">Customer Focus</h3>
              <p className="text-muted-foreground">
                Your satisfaction is our success. We listen to your needs and work tirelessly to exceed your
                expectations with personalized service.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
