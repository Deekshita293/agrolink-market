import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sprout, TrendingUp, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock crop data with admin-set prices
const cropPrices = [
  { id: 1, name: "Tomato", price: 15, unit: "kg", trend: "up", category: "Vegetable", lastUpdated: "2 hours ago" },
  { id: 2, name: "Onion", price: 10, unit: "kg", trend: "stable", category: "Vegetable", lastUpdated: "1 hour ago" },
  { id: 3, name: "Rice", price: 45, unit: "kg", trend: "up", category: "Grain", lastUpdated: "3 hours ago" },
  { id: 4, name: "Wheat", price: 25, unit: "kg", trend: "down", category: "Grain", lastUpdated: "1 hour ago" },
  { id: 5, name: "Potato", price: 8, unit: "kg", trend: "stable", category: "Vegetable", lastUpdated: "4 hours ago" },
  { id: 6, name: "Corn", price: 20, unit: "kg", trend: "up", category: "Grain", lastUpdated: "2 hours ago" },
  { id: 7, name: "Carrot", price: 12, unit: "kg", trend: "stable", category: "Vegetable", lastUpdated: "1 hour ago" },
  { id: 8, name: "Cabbage", price: 6, unit: "kg", trend: "down", category: "Vegetable", lastUpdated: "3 hours ago" },
]

const categories = ["All", "Vegetable", "Grain"]

export default function PricesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Sprout className="h-6 w-6 text-green-600" />
              <h1 className="text-xl font-bold text-green-800">Current Prices</h1>
            </div>
          </div>
          <div className="space-x-2">
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Register to Sell</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Today's Crop Prices</h2>
          <p className="text-gray-600 mb-4">Fixed prices set by admin. Updated regularly throughout the day.</p>
          <Badge variant="outline" className="text-sm">
            Last updated: {new Date().toLocaleTimeString()}
          </Badge>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-white p-1 rounded-lg border">
            {categories.map((category) => (
              <Button key={category} variant={category === "All" ? "default" : "ghost"} size="sm">
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Price Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {cropPrices.map((crop) => (
            <Card key={crop.id} className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-xl">{crop.name}</h3>
                    <Badge variant="outline" className="text-xs mt-1">
                      {crop.category}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">₹{crop.price}</div>
                    <div className="text-sm text-gray-500">per {crop.unit}</div>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-3">
                  <Badge
                    variant={crop.trend === "up" ? "default" : crop.trend === "down" ? "destructive" : "secondary"}
                    className="text-xs"
                  >
                    {crop.trend === "up" ? "↗ Rising" : crop.trend === "down" ? "↘ Falling" : "→ Stable"}
                  </Badge>
                  <span className="text-xs text-gray-500">{crop.lastUpdated}</span>
                </div>

                <Button size="sm" className="w-full" asChild>
                  <Link href="/register">Register to Sell</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Price Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Crops Listed:</span>
                <span className="font-medium">{cropPrices.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Average Price:</span>
                <span className="font-medium">
                  ₹{Math.round(cropPrices.reduce((acc, crop) => acc + crop.price, 0) / cropPrices.length)}/kg
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Price Updates:</span>
                <span className="font-medium">Every 2-4 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Negotiation:</span>
                <span className="font-medium text-red-600">Not allowed</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-sm">Register as Seller</h4>
                  <p className="text-sm text-gray-600">Create your account as farmer or middleman</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-sm">View Fixed Prices</h4>
                  <p className="text-sm text-gray-600">Check current admin-set prices for your crops</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-sm">Submit Crop Details</h4>
                  <p className="text-sm text-gray-600">Upload quantity, location, and quality info</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-medium text-sm">Admin Review</h4>
                  <p className="text-sm text-gray-600">Get approval and contact details within 24 hours</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 bg-green-600 text-white p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Selling?</h3>
          <p className="text-lg mb-6">Join thousands of farmers already using CropConnect</p>
          <div className="space-x-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register">Register Now</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-green-600 bg-transparent"
              asChild
            >
              <Link href="/contact">Contact Admin</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
