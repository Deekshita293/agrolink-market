import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sprout, Users, TrendingUp, Shield } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Sprout className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-green-800">AgroLink Market</h1>
          </div>
          <div className="space-x-4">
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Register</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/admin/login">Admin Panel</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Connect Farmers with Fair Prices</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transparent pricing, direct admin contact, and hassle-free crop selling for farmers and middlemen.
          </p>
          <div className="space-x-4">
            <Button size="lg" asChild>
              <Link href="/register">Start Selling</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/prices">View Prices</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose CropConnect?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Fixed Fair Prices</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Admin-set transparent pricing with no hidden costs or negotiations. Know exactly what you'll earn.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Direct Admin Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Multiple ways to reach admin - WhatsApp, chat, call, or email. Get quick responses to your queries.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Secure & Simple</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Easy crop submission with image upload, location details, and quality notes. Secure transactions
                  guaranteed.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-green-600 text-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Selling?</h3>
          <p className="text-xl mb-8">Join thousands of farmers already using CropConnect</p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register">Get Started Today</Link>
          </Button>
        </div>
      </section>

      {/* Admin Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Platform Administration</h3>
          <p className="text-xl mb-8">Comprehensive admin panel for managing crops, users, and platform operations</p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-700 p-6 rounded-lg">
              <Shield className="h-12 w-12 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Crop Management</h4>
              <p className="text-blue-100">Set prices, add new crops, manage inventory</p>
            </div>
            <div className="bg-blue-700 p-6 rounded-lg">
              <Users className="h-12 w-12 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">User Management</h4>
              <p className="text-blue-100">Monitor farmers, handle registrations, user support</p>
            </div>
            <div className="bg-blue-700 p-6 rounded-lg">
              <TrendingUp className="h-12 w-12 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Analytics & Reports</h4>
              <p className="text-blue-100">Track performance, generate reports, view insights</p>
            </div>
          </div>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/admin/login">Access Admin Panel</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sprout className="h-6 w-6" />
            <span className="text-xl font-bold">AgroLink Market</span>
          </div>
          <p className="text-gray-400">Connecting farmers with fair opportunities through AgroLink Market</p>
        </div>
      </footer>
    </div>
  )
}
