"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Check, X, Eye, Building, User } from "lucide-react"
import { useState } from "react"

// Mock data for pending accounts
const pendingAccounts = [
  {
    id: "4",
    name: "Alice Pending",
    email: "alice@newbusiness.com",
    role: "regular",
    createdAt: "2024-01-04T00:00:00Z",
    isApproved: false,
    companyName: "Alice's Transport Co",
    businessLicense: "BL-2024-001",
    requestedAt: "2024-01-04T10:30:00Z",
    documents: ["Business License", "Insurance Certificate"],
  },
  {
    id: "5",
    name: "Bob Transport",
    email: "bob@bobtransport.com",
    role: "regular",
    createdAt: "2024-01-05T00:00:00Z",
    isApproved: false,
    companyName: "Bob's Logistics LLC",
    businessLicense: "BL-2024-002",
    requestedAt: "2024-01-05T14:15:00Z",
    documents: ["Business License", "Tax ID", "Insurance Certificate"],
  },
]

// Mock data for all users
const allUsers = [
  {
    id: "1",
    name: "John Admin",
    email: "admin@enjoytransport.com",
    role: "admin",
    createdAt: "2024-01-01T00:00:00Z",
    isApproved: true,
    lastLogin: "2024-01-15T09:00:00Z",
  },
  {
    id: "2",
    name: "Jane Business",
    email: "jane@business.com",
    role: "approved",
    createdAt: "2024-01-02T00:00:00Z",
    isApproved: true,
    companyName: "Jane's Logistics",
    lastLogin: "2024-01-14T16:30:00Z",
  },
  {
    id: "3",
    name: "Bob User",
    email: "bob@example.com",
    role: "regular",
    createdAt: "2024-01-03T00:00:00Z",
    isApproved: true,
    lastLogin: "2024-01-13T11:45:00Z",
  },
  ...pendingAccounts,
]

export default function AdminAccountsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAccount, setSelectedAccount] = useState<any>(null)

  const filteredUsers = allUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.companyName && user.companyName.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleApprove = (accountId: string) => {
    console.log("Approve account:", accountId)
    // In real app, this would call API to approve account
    alert("Account approved successfully!")
  }

  const handleReject = (accountId: string) => {
    console.log("Reject account:", accountId)
    // In real app, this would call API to reject account
    alert("Account rejected.")
  }

  const getRoleBadge = (user: any) => {
    if (user.role === "admin") return <Badge variant="destructive">Admin</Badge>
    if (user.role === "approved") return <Badge variant="default">Approved Business</Badge>
    if (user.isApproved) return <Badge variant="secondary">Regular User</Badge>
    return <Badge variant="outline">Pending Approval</Badge>
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Account Management</h1>
          <p className="text-muted-foreground">Manage user accounts and approve business account requests.</p>
        </div>

        {/* Pending Approvals */}
        {pendingAccounts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Pending Approvals</span>
                <Badge variant="secondary">{pendingAccounts.length}</Badge>
              </CardTitle>
              <CardDescription>Business accounts waiting for approval to post offers.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingAccounts.map((account) => (
                  <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>{getInitials(account.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{account.name}</div>
                        <div className="text-sm text-muted-foreground">{account.email}</div>
                        <div className="text-sm text-muted-foreground flex items-center space-x-1">
                          <Building className="h-3 w-3" />
                          <span>{account.companyName}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedAccount(account)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Review
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Review Business Account Request</DialogTitle>
                            <DialogDescription>
                              Review the details and documents for this business account application.
                            </DialogDescription>
                          </DialogHeader>
                          {selectedAccount && (
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium">Account Details</h4>
                                <div className="text-sm text-muted-foreground space-y-1">
                                  <p>Name: {selectedAccount.name}</p>
                                  <p>Email: {selectedAccount.email}</p>
                                  <p>Company: {selectedAccount.companyName}</p>
                                  <p>Business License: {selectedAccount.businessLicense}</p>
                                  <p>Requested: {new Date(selectedAccount.requestedAt).toLocaleString()}</p>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium">Submitted Documents</h4>
                                <div className="text-sm text-muted-foreground">
                                  {selectedAccount.documents.map((doc: string, index: number) => (
                                    <div key={index} className="flex items-center space-x-2">
                                      <Check className="h-3 w-3 text-green-500" />
                                      <span>{doc}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <Button variant="outline" onClick={() => handleReject(selectedAccount?.id)}>
                              <X className="h-4 w-4 mr-2" />
                              Reject
                            </Button>
                            <Button onClick={() => handleApprove(selectedAccount?.id)}>
                              <Check className="h-4 w-4 mr-2" />
                              Approve
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button size="sm" onClick={() => handleApprove(account.id)}>
                        <Check className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleReject(account.id)}>
                        <X className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Users */}
        <Card>
          <CardHeader>
            <CardTitle>All Users ({filteredUsers.length})</CardTitle>
            <CardDescription>Complete list of registered users and their account status.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getRoleBadge(user)}</TableCell>
                      <TableCell>
                        {user.companyName ? (
                          <div className="flex items-center space-x-1">
                            <Building className="h-3 w-3" />
                            <span className="text-sm">{user.companyName}</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1">
                            <User className="h-3 w-3" />
                            <span className="text-sm text-muted-foreground">Personal</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "Never"}</TableCell>
                      <TableCell>
                        <Badge variant={user.isApproved ? "default" : "secondary"}>
                          {user.isApproved ? "Active" : "Pending"}
                        </Badge>
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
