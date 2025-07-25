"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  DollarSign,
  BarChart3,
  PieChart,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock analytics data
const salesData = [
  { month: "Jan", sales: 45000, submissions: 120, users: 25 },
  { month: "Feb", sales: 52000, submissions: 145, users: 32 },
  { month: "Mar", sales: 48000, submissions: 135, users: 28 },
  { month: "Apr", sales: 61000, submissions: 165, users: 41 },
  { month: "May", sales: 55000, submissions: 150, users: 35 },
  { month: "Jun", sales: 67000, submissions: 180, users: 45 },
]

const topCrops = [
  { name: "Rice", submissions: 45, revenue: 180000, percentage: 35 },
  { name: "Wheat", submissions: 32, revenue: 128000, percentage: 25 },
  { name: "Tomato", submissions: 28, revenue: 84000, percentage: 22 },
  { name: "Onion", submissions: 23, revenue: 46000, percentage: 18 },
]

const recentActivity = [
  { action: "New crop submission", user: "Ravi Kumar", crop: "Rice", time: "2 minutes ago", status: "pending" },
  { action: "Price updated", admin: "Admin", crop: "Tomato", time: "15 minutes ago", status: "completed" },
  { action: "User registered", user: "Lakshmi Devi", role: "Farmer", time: "1 hour ago", status: "completed" },
  { action: "Submission approved", user: "Suresh Patel", crop: "Wheat", time: "2 hours ago", status: "completed" },
]

export default function AdminAnalytics() {
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
              <h1 className="text-xl font-bold text-blue-800">Analytics & Reports</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹3,28,000</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">180</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +8% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +15% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                -2% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="crops">Crop Performance</TabsTrigger>
            <TabsTrigger value="users">User Analytics</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Monthly Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {salesData.slice(-3).map((data, index) => (
                      <div key={data.month} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <h4 className="font-medium">{data.month} 2024</h4>
                          <p className="text-sm text-gray-600">{data.submissions} submissions</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">₹{data.sales.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">{data.users} new users</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="h-5 w-5" />
                    <span>Top Performing Crops</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topCrops.map((crop) => (
                      <div key={crop.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <div>
                            <h4 className="font-medium">{crop.name}</h4>
                            <p className="text-sm text-gray-600">{crop.submissions} submissions</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">₹{crop.revenue.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">{crop.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Crop Performance Tab */}
          <TabsContent value="crops">
            <Card>
              <CardHeader>
                <CardTitle>Crop Performance Analysis</CardTitle>
                <CardDescription>Detailed breakdown of crop submissions and revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {topCrops.map((crop) => (
                    <div key={crop.name} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold text-lg">{crop.name}</h3>
                        <Badge variant="outline">{crop.percentage}% of total</Badge>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <span className="text-sm text-gray-500">Total Submissions</span>
                          <p className="text-2xl font-bold">{crop.submissions}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Total Revenue</span>
                          <p className="text-2xl font-bold text-green-600">₹{crop.revenue.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Avg per Submission</span>
                          <p className="text-2xl font-bold">
                            ₹{Math.round(crop.revenue / crop.submissions).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Analytics Tab */}
          <TabsContent value="users">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                      <div>
                        <h4 className="font-medium">Total Farmers</h4>
                        <p className="text-sm text-gray-600">Active sellers</p>
                      </div>
                      <div className="text-2xl font-bold text-green-600">124</div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                      <div>
                        <h4 className="font-medium">Total Middlemen</h4>
                        <p className="text-sm text-gray-600">Active traders</p>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">32</div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                      <div>
                        <h4 className="font-medium">New This Month</h4>
                        <p className="text-sm text-gray-600">Recent registrations</p>
                      </div>
                      <div className="text-2xl font-bold text-purple-600">45</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Active Users (Last 30 days)</span>
                        <span className="text-sm font-medium">89%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "89%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Submission Rate</span>
                        <span className="text-sm font-medium">76%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "76%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Repeat Sellers</span>
                        <span className="text-sm font-medium">64%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: "64%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Recent Activity Tab */}
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent System Activity</CardTitle>
                <CardDescription>Latest actions and events in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            activity.status === "pending" ? "bg-yellow-500" : "bg-green-500"
                          }`}
                        ></div>
                        <div>
                          <h4 className="font-medium">{activity.action}</h4>
                          <p className="text-sm text-gray-600">
                            {activity.user && `by ${activity.user}`}
                            {activity.admin && `by ${activity.admin}`}
                            {activity.crop && ` - ${activity.crop}`}
                            {activity.role && ` as ${activity.role}`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={activity.status === "pending" ? "secondary" : "default"}>
                          {activity.status}
                        </Badge>
                        <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
