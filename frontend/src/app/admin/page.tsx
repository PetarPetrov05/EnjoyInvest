"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Truck, Users, MessageSquare, TrendingUp, Eye, Heart, Plus } from "lucide-react"
import Link from "next/link"
import { useTranslation } from 'react-i18next'

// Mock data for dashboard
const dashboardStats = {
  totalOffers: 12,
  activeOffers: 8,
  pendingMessages: 3,
  pendingAccounts: 2,
  totalUsers: 156,
  monthlyRevenue: "$24,500",
  totalViews: 1234,
  totalLikes: 89,
}

const recentActivity = [
  {
    id: 1,
    type: "offer",
    title: "New offer posted: Heavy Duty Truck - Ford F-350",
    time: "2 hours ago",
    status: "active",
  },
  {
    id: 2,
    type: "message",
    title: "New message about Mountain Resort Trip",
    time: "4 hours ago",
    status: "unread",
  },
  {
    id: 3,
    type: "account",
    title: "Business account approval request from Alice's Transport Co",
    time: "6 hours ago",
    status: "pending",
  },
  {
    id: 4,
    type: "offer",
    title: "Offer updated: Commercial Van - Mercedes Sprinter",
    time: "1 day ago",
    status: "active",
  },
]

export default function AdminDashboard() {
  const { t } = useTranslation()

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{t('admin.dashboard')}</h1>
            <p className="text-muted-foreground">{t('admin.welcomeMessage')}</p>
          </div>
          <Button asChild>
            <Link href="/admin/offers/new">
              <Plus className="mr-2 h-4 w-4" />
              {t('admin.addNewOffer')}
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Offers</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalOffers}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+2</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.pendingMessages}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.monthlyRevenue}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" asChild>
                <Link href="/admin/offers/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Offer
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/admin/accounts">
                  <Users className="mr-2 h-4 w-4" />
                  Review Pending Accounts ({dashboardStats.pendingAccounts})
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/admin/messages">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Check Messages ({dashboardStats.pendingMessages})
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {activity.type === "offer" && <Truck className="h-4 w-4 text-primary mt-1" />}
                      {activity.type === "message" && <MessageSquare className="h-4 w-4 text-blue-500 mt-1" />}
                      {activity.type === "account" && <Users className="h-4 w-4 text-orange-500 mt-1" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <Badge
                      variant={
                        activity.status === "active"
                          ? "default"
                          : activity.status === "pending"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Key metrics for your offers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Eye className="h-5 w-5 text-primary mr-2" />
                  <span className="text-2xl font-bold">{dashboardStats.totalViews}</span>
                </div>
                <p className="text-sm text-muted-foreground">Total Views</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Heart className="h-5 w-5 text-red-500 mr-2" />
                  <span className="text-2xl font-bold">{dashboardStats.totalLikes}</span>
                </div>
                <p className="text-sm text-muted-foreground">Total Likes</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <MessageSquare className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-2xl font-bold">{dashboardStats.activeOffers}</span>
                </div>
                <p className="text-sm text-muted-foreground">Active Offers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
