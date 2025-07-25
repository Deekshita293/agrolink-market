"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Shield, ArrowLeft, Edit } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock crop data
const cropPrices = [
  { id: 1, name: "Tomato", price: 15, unit: "kg", category: "Vegetable", description: "Fresh red tomatoes" },
  { id: 2, name: "Onion", price: 10, unit: "kg", category: "Vegetable", description: "Quality onions" },
  { id: 3, name: "Rice", price: 45, unit: "kg", category: "Grain", description: "Premium basmati rice" },
  { id: 4, name: "Wheat", price: 25, unit: "kg", category: "Grain", description: "High quality wheat" },
]

export default function EditCropPage({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    unit: "kg",
    category: "",
    description: "",
  })
  const [crop, setCrop] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const foundCrop = cropPrices.find((c) => c.id === Number.parseInt(params.id))
    if (foundCrop) {
      setCrop(foundCrop)
      setFormData({
        name: foundCrop.name,
        price: foundCrop.price.toString(),
        unit: foundCrop.unit,
        category: foundCrop.category,
        description: foundCrop.description || "",
      })
    }
  }, [params.id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Crop "${formData.name}" updated successfully with new price ₹${formData.price}/${formData.unit}`)
    router.push("/admin/dashboard")
  }

  if (!crop) return null

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
              <h1 className="text-xl font-bold text-blue-800">Edit Crop</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Edit className="h-5 w-5" />
                <span>Edit Crop - {crop.name}</span>
              </CardTitle>
              <CardDescription>Update crop details and pricing</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Crop Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Tomato, Rice, Wheat"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Vegetable">Vegetable</SelectItem>
                        <SelectItem value="Grain">Grain</SelectItem>
                        <SelectItem value="Fruit">Fruit</SelectItem>
                        <SelectItem value="Spice">Spice</SelectItem>
                        <SelectItem value="Pulse">Pulse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="Enter price"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit *</Label>
                    <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilogram (kg)</SelectItem>
                        <SelectItem value="ton">Ton</SelectItem>
                        <SelectItem value="quintal">Quintal</SelectItem>
                        <SelectItem value="piece">Piece</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Additional information about this crop..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Price Change Preview</h3>
                  <div className="text-blue-700">
                    <p>
                      Old Price: ₹{crop.price}/{crop.unit}
                    </p>
                    <p>
                      New Price: ₹{formData.price}/{formData.unit}
                    </p>
                    {formData.price && (
                      <p
                        className={`font-medium ${Number.parseFloat(formData.price) > crop.price ? "text-red-600" : "text-green-600"}`}
                      >
                        {Number.parseFloat(formData.price) > crop.price ? "Price Increase" : "Price Decrease"}: ₹
                        {Math.abs(Number.parseFloat(formData.price) - crop.price)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button type="submit" className="flex-1">
                    Update Crop
                  </Button>
                  <Button type="button" variant="outline" className="flex-1 bg-transparent" asChild>
                    <Link href="/admin/dashboard">Cancel</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
