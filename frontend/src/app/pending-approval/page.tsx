import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Mail, Phone } from "lucide-react"
import Link from "next/link"

export default function PendingApprovalPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader className="text-center">
              <Clock className="h-16 w-16 text-primary mx-auto mb-4" />
              <CardTitle className="text-2xl">Account Pending Approval</CardTitle>
              <CardDescription>
                Your business account is currently under review by our team. We'll notify you once it's approved.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">What happens next?</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Our team will review your business account application</li>
                  <li>• We may contact you for additional information if needed</li>
                  <li>• You'll receive an email notification once approved</li>
                  <li>• Approval typically takes 1-3 business days</li>
                </ul>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">While you wait:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Browse and search all available offers</li>
                  <li>• Like and comment on offers</li>
                  <li>• Save offers to your favorites</li>
                  <li>• Contact us about specific offers</li>
                </ul>
              </div>

              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">Need to expedite your approval or have questions?</p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="mailto:approval@enjoytransport.com">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Support
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="tel:+15551234567">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Us
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="text-center">
                <Button asChild>
                  <Link href="/offers">Browse Offers</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
