"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sprout, TrendingUp, Package, Phone, MessageCircle, Mail, User, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock crop data with admin-set prices
const cropPrices = [
  { id: 1, name: "Tomato", price: 15, unit: "kg", trend: "up", category: "Vegetable" },
  { id: 2, name: "Onion", price: 10, unit: "kg", trend: "stable", category: "Vegetable" },
  { id: 3, name: "Rice", price: 45, unit: "kg", trend: "up", category: "Grain" },
  { id: 4, name: "Wheat", price: 25, unit: "kg", trend: "down", category: "Grain" },
  { id: 5, name: "Potato", price: 8, unit: "kg", trend: "stable", category: "Vegetable" },
  { id: 6, name: "Corn", price: 20, unit: "kg", trend: "up", category: "Grain" },
  { id: 7, name: "Carrot", price: 12, unit: "kg", trend: "stable", category: "Vegetable" },
  { id: 8, name: "Cabbage", price: 6, unit: "kg", trend: "down", category: "Vegetable" },
]

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }
    const parsedUser = JSON.parse(userData)

    // Redirect admin users to admin dashboard
    if (parsedUser.role === "admin") {
      router.push("/admin/dashboard")
      return
    }

    setUser(parsedUser)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Sprout className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-green-800">AgroLink Market</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium">{user.name}</span>
              <Badge variant="secondary">{user.role}</Badge>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}!</h2>
          <p className="text-gray-600">View today's crop prices and start selling your produce</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Crops</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cropPrices.length}</div>
              <p className="text-xs text-muted-foreground">Available for selling</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Price</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₹{Math.round(cropPrices.reduce((acc, crop) => acc + crop.price, 0) / cropPrices.length)}
              </div>
              <p className="text-xs text-muted-foreground">Per kg average</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contact Admin</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button size="sm" className="w-full" asChild>
                  <Link href="/contact">Quick Contact</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Crop Prices Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Today's Crop Prices</span>
            </CardTitle>
            <CardDescription>Fixed prices set by admin. No negotiation required.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cropPrices.map((crop) => (
                <Card key={crop.id} className="border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{crop.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {crop.category}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">₹{crop.price}</div>
                        <div className="text-sm text-gray-500">per {crop.unit}</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <Badge
                        variant={crop.trend === "up" ? "default" : crop.trend === "down" ? "destructive" : "secondary"}
                        className="text-xs"
                      >
                        {crop.trend === "up" ? "↗ Rising" : crop.trend === "down" ? "↘ Falling" : "→ Stable"}
                      </Badge>

                      <Button size="sm" asChild>
                        <Link href={`/sell/${crop.id}`}>Sell Now</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Need Help? Contact Admin</CardTitle>
            <CardDescription>Multiple ways to reach out for support and queries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-16 flex flex-col space-y-2 bg-transparent" asChild>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                  <span>WhatsApp</span>
                </a>
              </Button>

              <Button variant="outline" className="h-16 flex flex-col space-y-2 bg-transparent" asChild>
                <Link href="/contact">
                  <Mail className="h-6 w-6 text-blue-600" />
                  <span>Contact Form</span>
                </Link>
              </Button>

              <Button variant="outline" className="h-16 flex flex-col space-y-2 bg-transparent" asChild>
                <a href="tel:+919876543210">
                  <Phone className="h-6 w-6 text-purple-600" />
                  <span>Call Direct</span>
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
