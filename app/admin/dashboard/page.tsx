"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  Package,
  Users,
  MessageSquare,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  BarChart3,
  Settings,
  Bell,
  Download,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock data
const cropPrices = [
  { id: 1, name: "Tomato", price: 15, unit: "kg", category: "Vegetable", lastUpdated: "2 hours ago" },
  { id: 2, name: "Onion", price: 10, unit: "kg", category: "Vegetable", lastUpdated: "1 hour ago" },
  { id: 3, name: "Rice", price: 45, unit: "kg", category: "Grain", lastUpdated: "3 hours ago" },
  { id: 4, name: "Wheat", price: 25, unit: "kg", category: "Grain", lastUpdated: "1 hour ago" },
]

const cropSubmissions = [
  {
    id: 1,
    cropName: "Tomato",
    sellerName: "John Farmer",
    quantity: "500",
    unit: "kg",
    location: "Bangalore, Karnataka",
    status: "pending",
    submittedAt: "2 hours ago",
    totalValue: 7500,
    quality: "Fresh",
  },
  {
    id: 2,
    cropName: "Rice",
    sellerName: "Ravi Kumar",
    quantity: "2",
    unit: "tons",
    location: "Mysore, Karnataka",
    status: "approved",
    submittedAt: "1 day ago",
    totalValue: 90000,
    quality: "Grade A",
  },
  {
    id: 3,
    cropName: "Onion",
    sellerName: "Suresh Patel",
    quantity: "300",
    unit: "kg",
    location: "Hubli, Karnataka",
    status: "rejected",
    submittedAt: "3 hours ago",
    totalValue: 3000,
    quality: "Average",
  },
]

const userQueries = [
  {
    id: 1,
    name: "Ramesh Farmer",
    email: "ramesh@example.com",
    subject: "Payment Issue",
    message: "I haven't received payment for my approved tomato submission...",
    priority: "high",
    status: "open",
    submittedAt: "1 hour ago",
  },
  {
    id: 2,
    name: "Lakshmi Devi",
    email: "lakshmi@example.com",
    subject: "How to upload crop images?",
    message: "I'm having trouble uploading images of my crops...",
    priority: "medium",
    status: "resolved",
    submittedAt: "5 hours ago",
  },
]

export default function AdminDashboard() {
  const [admin, setAdmin] = useState<any>(null)
  const router = useRouter()
  const [notifications, setNotifications] = useState<string[]>([])

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }
    const parsedUser = JSON.parse(userData)

    // Check if user is admin
    if (parsedUser.role !== "admin") {
      router.push("/dashboard")
      return
    }

    setAdmin(parsedUser)

    // Simulate real-time updates (replace with actual backend integration)
    const intervalId = setInterval(() => {
      setNotifications((prev) => [...prev, `New user query received!`])
    }, 60000)

    return () => clearInterval(intervalId)
  }, [router])

  useEffect(() => {
    // Simulate real-time notifications
    const notificationInterval = setInterval(() => {
      const notifications = [
        "New crop submission from Ravi Kumar",
        "Price update request for Tomato",
        "User query: Payment issue",
        "New farmer registration",
        "Bulk submission approved",
      ]
      const randomNotification = notifications[Math.floor(Math.random() * notifications.length)]
      setNotifications((prev) => [randomNotification, ...prev.slice(0, 4)])
    }, 30000) // Every 30 seconds

    return () => clearInterval(notificationInterval)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const handleApproveSubmission = (id: number) => {
    alert(`Crop submission #${id} approved! Seller will be notified.`)
    setNotifications((prev) => [...prev, `Crop submission #${id} approved!`])
  }

  const handleRejectSubmission = (id: number) => {
    alert(`Crop submission #${id} rejected! Seller will be notified with reason.`)
    setNotifications((prev) => [...prev, `Crop submission #${id} rejected!`])
  }

  const handleBulkApprove = () => {
    alert("Bulk approve action triggered (not implemented)")
  }

  const handleBulkReject = () => {
    alert("Bulk reject action triggered (not implemented)")
  }

  if (!admin) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-blue-800">Admin Panel</h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/analytics">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Enhanced Notification System */}
            <div className="relative">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
                {notifications.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                    {notifications.length}
                  </Badge>
                )}
              </Button>
              {notifications.length > 0 && (
                <div className="absolute right-0 mt-2 w-80 bg-white border rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
                  <div className="p-2 border-b bg-gray-50">
                    <h4 className="font-medium text-sm">Recent Notifications</h4>
                  </div>
                  <ul>
                    {notifications.map((notification, index) => (
                      <li key={index} className="px-4 py-3 border-b last:border-b-0 hover:bg-gray-50">
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="text-sm">{notification}</p>
                            <p className="text-xs text-gray-500">Just now</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="p-2 border-t bg-gray-50">
                    <Button size="sm" variant="ghost" className="w-full text-xs">
                      View All Notifications
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">{admin.name}</span>
              <Badge variant="secondary">Administrator</Badge>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Crops</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cropPrices.length}</div>
              <p className="text-xs text-muted-foreground">Active crop listings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {cropSubmissions.filter((s) => s.status === "pending").length}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Queries</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {userQueries.filter((q) => q.status === "open").length}
              </div>
              <p className="text-xs text-muted-foreground">Need response</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">Registered sellers</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="crops" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="crops">Manage Crops</TabsTrigger>
            <TabsTrigger value="submissions">Crop Submissions</TabsTrigger>
            <TabsTrigger value="queries">User Queries</TabsTrigger>
            <TabsTrigger value="users">Manage Users</TabsTrigger>
          </TabsList>

          {/* Manage Crops Tab */}
          <TabsContent value="crops">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Crop Price Management</CardTitle>
                    <CardDescription>Add, edit, or delete crop prices</CardDescription>
                  </div>
                  <Button asChild>
                    <Link href="/admin/crops/add">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Crop
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cropPrices.map((crop) => (
                    <div key={crop.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="font-semibold">{crop.name}</h3>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{crop.category}</Badge>
                            <span className="text-sm text-gray-500">Updated {crop.lastUpdated}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-xl font-bold text-green-600">₹{crop.price}</div>
                          <div className="text-sm text-gray-500">per {crop.unit}</div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/admin/crops/edit/${crop.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700 bg-transparent"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Crop Submissions Tab */}
          <TabsContent value="submissions">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Crop Submissions for Review</CardTitle>
                    <CardDescription>Review and approve/reject crop submissions from sellers</CardDescription>
                  </div>
                  {/* Add bulk action buttons in the submissions header */}
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={handleBulkApprove} className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Bulk Approve
                    </Button>
                    <Button size="sm" variant="destructive" onClick={handleBulkReject}>
                      <XCircle className="h-4 w-4 mr-1" />
                      Bulk Reject
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      Export Data
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cropSubmissions.map((submission) => (
                    <div key={submission.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{submission.cropName}</h3>
                          <p className="text-gray-600">by {submission.sellerName}</p>
                        </div>
                        <Badge
                          variant={
                            submission.status === "approved"
                              ? "default"
                              : submission.status === "rejected"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Quantity</span>
                          <p className="font-medium">
                            {submission.quantity} {submission.unit}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Location</span>
                          <p className="font-medium">{submission.location}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Quality</span>
                          <p className="font-medium">{submission.quality}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Total Value</span>
                          <p className="font-medium text-green-600">₹{submission.totalValue.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Submitted {submission.submittedAt}</span>
                        {submission.status === "pending" && (
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => handleApproveSubmission(submission.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleRejectSubmission(submission.id)}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Queries Tab */}
          <TabsContent value="queries">
            <Card>
              <CardHeader>
                <CardTitle>User Queries & Support</CardTitle>
                <CardDescription>Manage user inquiries and support requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userQueries.map((query) => (
                    <div key={query.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold">{query.subject}</h3>
                          <p className="text-sm text-gray-600">
                            from {query.name} ({query.email})
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={query.priority === "high" ? "destructive" : "secondary"}>
                            {query.priority} priority
                          </Badge>
                          <Badge variant={query.status === "open" ? "default" : "secondary"}>{query.status}</Badge>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-3">{query.message}</p>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Submitted {query.submittedAt}</span>
                        {query.status === "open" && (
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              Reply
                            </Button>
                            <Button size="sm">Mark Resolved</Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manage Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View and manage registered sellers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">User Management</h3>
                  <p className="text-gray-600 mb-4">View user profiles, activity, and manage account status</p>
                  <Button variant="outline">View All Users</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Analytics and Reporting (Placeholder) */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Analytics & Reporting</h2>
          <p className="text-gray-600">
            Detailed analytics and reporting features will be implemented here. (e.g., sales trends, popular crops, user
            activity)
          </p>
        </div>

        {/* System Settings Management (Placeholder) */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">System Settings</h2>
          <p className="text-gray-600">
            System settings management options will be available here. (e.g., platform configurations, email settings)
          </p>
        </div>
      </div>
    </div>
  )
}
