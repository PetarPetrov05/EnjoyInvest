"use client";
import Link from "next/link"
import { Truck, Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Truck className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Enjoy Transport</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Your reliable partner in transportation. We provide truck rental, sales, and organized transport trips.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Home
              </Link>
              <Link href="/offers" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Offers
              </Link>
              <Link href="/company" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Company Info
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold">Services</h3>
            <div className="flex flex-col space-y-2">
              <span className="text-muted-foreground text-sm">Truck Rental</span>
              <span className="text-muted-foreground text-sm">Truck Sales</span>
              <span className="text-muted-foreground text-sm">Organized Trips</span>
              <span className="text-muted-foreground text-sm">Transport Solutions</span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact Info</h3>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@enjoytransport.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>123 Transport Ave, City, State 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">© 2024 Enjoy Transport. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
