import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader className="text-center">
              <Shield className="h-16 w-16 text-destructive mx-auto mb-4" />
              <CardTitle className="text-2xl">Access Denied</CardTitle>
              <CardDescription>You don't have permission to access this page.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">This page requires:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Admin or approved business account access</li>
                  <li>• Proper account verification</li>
                  <li>• Specific role permissions</li>
                </ul>
              </div>

              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  If you believe this is an error, please contact our support team.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Button asChild>
                    <Link href="/">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Go Home
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/contact">Contact Support</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
