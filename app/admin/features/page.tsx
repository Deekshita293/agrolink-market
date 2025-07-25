"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, ArrowLeft, Package, Users, MessageSquare, BarChart3, Settings, Eye } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const adminFeatures = [
  {
    category: "Crop Management",
    icon: Package,
    color: "text-green-600",
    features: [
      { name: "Add New Crops", description: "Create new crop listings with fixed prices", status: "active" },
      { name: "Edit Crop Prices", description: "Update existing crop prices and details", status: "active" },
      { name: "Delete Crops", description: "Remove crops from the platform", status: "active" },
      { name: "Price History", description: "Track price changes over time", status: "active" },
      { name: "Bulk Price Updates", description: "Update multiple crop prices at once", status: "planned" },
    ],
  },
  {
    category: "Submission Management",
    icon: Eye,
    color: "text-blue-600",
    features: [
      { name: "Review Submissions", description: "View all crop submissions from sellers", status: "active" },
      { name: "Approve/Reject", description: "One-click approval or rejection", status: "active" },
      { name: "Bulk Operations", description: "Approve/reject multiple submissions", status: "active" },
      { name: "Quality Assessment", description: "Rate crop quality and freshness", status: "planned" },
      { name: "Auto-Approval Rules", description: "Set automatic approval criteria", status: "planned" },
    ],
  },
  {
    category: "User Management",
    icon: Users,
    color: "text-purple-600",
    features: [
      { name: "User Directory", description: "View all registered farmers and middlemen", status: "active" },
      { name: "Account Management", description: "Activate/deactivate user accounts", status: "active" },
      { name: "User Analytics", description: "Track user activity and engagement", status: "active" },
      { name: "Bulk User Actions", description: "Perform actions on multiple users", status: "planned" },
      { name: "User Verification", description: "Verify farmer and middleman credentials", status: "planned" },
    ],
  },
  {
    category: "Communication",
    icon: MessageSquare,
    color: "text-orange-600",
    features: [
      { name: "Query Management", description: "Handle user support requests", status: "active" },
      { name: "Email Templates", description: "Customizable email templates", status: "planned" },
      { name: "SMS Notifications", description: "Send SMS alerts to users", status: "planned" },
      { name: "WhatsApp Integration", description: "Direct WhatsApp communication", status: "active" },
      { name: "Broadcast Messages", description: "Send announcements to all users", status: "planned" },
    ],
  },
  {
    category: "Analytics & Reports",
    icon: BarChart3,
    color: "text-red-600",
    features: [
      { name: "Sales Analytics", description: "Track revenue and sales trends", status: "active" },
      { name: "User Growth", description: "Monitor user registration and activity", status: "active" },
      { name: "Crop Performance", description: "Analyze crop submission patterns", status: "active" },
      { name: "Export Reports", description: "Download data in CSV/Excel format", status: "planned" },
      { name: "Custom Dashboards", description: "Create personalized admin views", status: "planned" },
    ],
  },
  {
    category: "System Settings",
    icon: Settings,
    color: "text-gray-600",
    features: [
      { name: "Platform Configuration", description: "Basic platform settings", status: "active" },
      { name: "Notification Settings", description: "Configure alert preferences", status: "active" },
      { name: "Business Rules", description: "Set commission rates and limits", status: "active" },
      { name: "Security Settings", description: "Manage access controls", status: "planned" },
      { name: "Backup & Recovery", description: "Data backup and restore options", status: "planned" },
    ],
  },
]

export default function AdminFeatures() {
  const [admin, setAdmin] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }
    const parsedUser = JSON.parse(userData)

    if (parsedUser.role !== "admin") {
      router.push("/dashboard")
      return
    }

    setAdmin(parsedUser)
  }, [router])

  if (!admin) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "planned":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-bold text-blue-800">Admin Features Overview</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {adminFeatures.reduce((acc, category) => acc + category.features.length, 0)}
              </div>
              <p className="text-sm text-gray-600">Available admin features</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {adminFeatures.reduce(
                  (acc, category) => acc + category.features.filter((f) => f.status === "active").length,
                  0,
                )}
              </div>
              <p className="text-sm text-gray-600">Currently available</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Planned Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {adminFeatures.reduce(
                  (acc, category) => acc + category.features.filter((f) => f.status === "planned").length,
                  0,
                )}
              </div>
              <p className="text-sm text-gray-600">Coming soon</p>
            </CardContent>
          </Card>
        </div>

        {/* Feature Categories */}
        <div className="space-y-8">
          {adminFeatures.map((category) => {
            const IconComponent = category.icon
            return (
              <Card key={category.category}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <IconComponent className={`h-6 w-6 ${category.color}`} />
                    <span>{category.category}</span>
                  </CardTitle>
                  <CardDescription>
                    {category.features.filter((f) => f.status === "active").length} of {category.features.length}{" "}
                    features active
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {category.features.map((feature) => (
                      <div key={feature.name} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{feature.name}</h4>
                          <Badge className={getStatusColor(feature.status)}>{feature.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Admin Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="h-20 flex flex-col space-y-2" asChild>
                <Link href="/admin/crops/add">
                  <Package className="h-6 w-6" />
                  <span>Add New Crop</span>
                </Link>
              </Button>
              <Button className="h-20 flex flex-col space-y-2 bg-transparent" variant="outline" asChild>
                <Link href="/admin/dashboard?tab=submissions">
                  <Eye className="h-6 w-6" />
                  <span>Review Submissions</span>
                </Link>
              </Button>
              <Button className="h-20 flex flex-col space-y-2 bg-transparent" variant="outline" asChild>
                <Link href="/admin/users">
                  <Users className="h-6 w-6" />
                  <span>Manage Users</span>
                </Link>
              </Button>
              <Button className="h-20 flex flex-col space-y-2 bg-transparent" variant="outline" asChild>
                <Link href="/admin/analytics">
                  <BarChart3 className="h-6 w-6" />
                  <span>View Analytics</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
