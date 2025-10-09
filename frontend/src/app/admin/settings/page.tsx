import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Save } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your application settings and preferences.</p>
        </div>

        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>Update your company details and contact information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" defaultValue="Enjoy Transport" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-email">Contact Email</Label>
                <Input id="company-email" type="email" defaultValue="info@enjoytransport.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company-phone">Phone Number</Label>
                <Input id="company-phone" defaultValue="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-website">Website</Label>
                <Input id="company-website" defaultValue="https://enjoytransport.com" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company-address">Address</Label>
              <Textarea
                id="company-address"
                defaultValue="123 Transport Avenue, Business District, City, State 12345"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company-description">Company Description</Label>
              <Textarea
                id="company-description"
                defaultValue="Your reliable partner in transportation. We provide truck rental, truck sales, and organized transport trips."
                rows={4}
              />
            </div>

            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Company Information
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Configure how you receive notifications and alerts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive email notifications for new messages and offers</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>New Message Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified when customers send new messages</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Account Approval Requests</Label>
                <p className="text-sm text-muted-foreground">Notifications for new business account requests</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weekly Reports</Label>
                <p className="text-sm text-muted-foreground">Receive weekly analytics and performance reports</p>
              </div>
              <Switch />
            </div>

            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Notification Settings
            </Button>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle>System Settings</CardTitle>
            <CardDescription>Configure system-wide settings and preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-approve Regular Accounts</Label>
                <p className="text-sm text-muted-foreground">Automatically approve new regular user accounts</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Require Business License</Label>
                <p className="text-sm text-muted-foreground">Require business license for business account approval</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Public Comments</Label>
                <p className="text-sm text-muted-foreground">Allow public comments on offers without login</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">Enable maintenance mode for system updates</p>
              </div>
              <Switch />
            </div>

            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save System Settings
            </Button>
          </CardContent>
        </Card>

        {/* File Upload Settings */}
        <Card>
          <CardHeader>
            <CardTitle>File Upload Settings</CardTitle>
            <CardDescription>Configure file upload limits and allowed file types.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="max-file-size">Maximum File Size (MB)</Label>
                <Input id="max-file-size" type="number" defaultValue="10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-images">Maximum Images per Offer</Label>
                <Input id="max-images" type="number" defaultValue="5" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="allowed-types">Allowed File Types</Label>
              <Input id="allowed-types" defaultValue="jpg, jpeg, png, gif, pdf" />
            </div>

            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Upload Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
