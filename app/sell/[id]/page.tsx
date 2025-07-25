"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Sprout, Upload, MapPin, Package, FileText, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock crop data
const cropPrices = [
  { id: 1, name: "Tomato", price: 15, unit: "kg", category: "Vegetable" },
  { id: 2, name: "Onion", price: 10, unit: "kg", category: "Vegetable" },
  { id: 3, name: "Rice", price: 45, unit: "kg", category: "Grain" },
  { id: 4, name: "Wheat", price: 25, unit: "kg", category: "Grain" },
  { id: 5, name: "Potato", price: 8, unit: "kg", category: "Vegetable" },
  { id: 6, name: "Corn", price: 20, unit: "kg", category: "Grain" },
  { id: 7, name: "Carrot", price: 12, unit: "kg", category: "Vegetable" },
  { id: 8, name: "Cabbage", price: 6, unit: "kg", category: "Vegetable" },
]

export default function SellCropPage({ params }: { params: { id: string } }) {
  const [crop, setCrop] = useState<any>(null)
  const [formData, setFormData] = useState({
    quantity: "",
    unit: "kg",
    location: "",
    variety: "",
    freshness: "",
    notes: "",
    image: null as File | null,
  })
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(userData))

    const foundCrop = cropPrices.find((c) => c.id === Number.parseInt(params.id))
    if (foundCrop) {
      setCrop(foundCrop)
      setFormData((prev) => ({ ...prev, unit: foundCrop.unit }))
    }
  }, [params.id, router])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Calculate total value
    const totalValue = Number.parseFloat(formData.quantity) * crop.price

    // Simulate submission to admin
    alert(
      `Crop submission successful!\n\nDetails:\n- Crop: ${crop.name}\n- Quantity: ${formData.quantity} ${formData.unit}\n- Total Value: ₹${totalValue.toLocaleString()}\n- Location: ${formData.location}\n\nYour request has been sent to admin for review.`,
    )

    router.push("/dashboard")
  }

  if (!crop || !user) return null

  const totalValue = formData.quantity ? Number.parseFloat(formData.quantity) * crop.price : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Sprout className="h-6 w-6 text-green-600" />
              <h1 className="text-xl font-bold text-green-800">Sell {crop.name}</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Crop Info Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5" />
                  <span>Crop Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold">{crop.name}</h3>
                  <Badge variant="outline">{crop.category}</Badge>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Fixed Price</div>
                  <div className="text-3xl font-bold text-green-600">₹{crop.price}</div>
                  <div className="text-sm text-gray-600">per {crop.unit}</div>
                </div>

                {formData.quantity && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Estimated Total</div>
                    <div className="text-2xl font-bold text-blue-600">₹{totalValue.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">
                      {formData.quantity} {formData.unit} × ₹{crop.price}
                    </div>
                  </div>
                )}

                <div className="text-sm text-gray-600 bg-yellow-50 p-3 rounded">
                  <strong>Note:</strong> Prices are fixed by admin. No negotiation required. Submit your crop details
                  for admin review.
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sell Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Crop Submission Form</CardTitle>
                <CardDescription>Fill in the details below to submit your crop for admin review</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Quantity Section */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Package className="h-5 w-5 text-gray-600" />
                      <h3 className="text-lg font-semibold">Quantity Details</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity *</Label>
                        <Input
                          id="quantity"
                          type="number"
                          placeholder="Enter quantity"
                          value={formData.quantity}
                          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="unit">Unit</Label>
                        <Select
                          value={formData.unit}
                          onValueChange={(value) => setFormData({ ...formData, unit: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kg">Kilograms (kg)</SelectItem>
                            <SelectItem value="tons">Tons</SelectItem>
                            <SelectItem value="quintal">Quintal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Location Section */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-gray-600" />
                      <h3 className="text-lg font-semibold">Location Details</h3>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Pickup Location *</Label>
                      <Input
                        id="location"
                        placeholder="Village, District, State"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Crop Quality Section */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-gray-600" />
                      <h3 className="text-lg font-semibold">Quality Information</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="variety">Variety (Optional)</Label>
                        <Input
                          id="variety"
                          placeholder="e.g., Hybrid, Organic, Local"
                          value={formData.variety}
                          onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="freshness">Freshness</Label>
                        <Select
                          value={formData.freshness}
                          onValueChange={(value) => setFormData({ ...formData, freshness: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select freshness" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fresh">Fresh (Harvested today)</SelectItem>
                            <SelectItem value="1-2days">1-2 days old</SelectItem>
                            <SelectItem value="3-5days">3-5 days old</SelectItem>
                            <SelectItem value="week">About a week old</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any additional information about quality, storage conditions, etc."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Image Upload Section */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Upload className="h-5 w-5 text-gray-600" />
                      <h3 className="text-lg font-semibold">Crop Image (Optional)</h3>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image">Upload Image</Label>
                      <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
                      <p className="text-sm text-gray-500">
                        Upload a clear image of your crop to help admin assess quality
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6 border-t">
                    <Button type="submit" size="lg" className="w-full">
                      Submit Crop for Review
                    </Button>
                    <p className="text-sm text-gray-500 text-center mt-2">
                      Admin will review your submission and contact you within 24 hours
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
