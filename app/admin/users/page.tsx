"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, ArrowLeft, Search, Users, UserCheck, UserX, Mail, Phone, MapPin, Calendar } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock user data
const users = [
  {
    id: 1,
    name: "Ravi Kumar",
    email: "ravi@example.com",
    phone: "+91 9876543210",
    role: "farmer",
    location: "Mysore, Karnataka",
    joinDate: "2024-01-15",
    status: "active",
    submissions: 12,
    totalValue: 45000,
    lastActive: "2 hours ago",
  },
  {
    id: 2,
    name: "Lakshmi Devi",
    email: "lakshmi@example.com",
    phone: "+91 9876543211",
    role: "farmer",
    location: "Bangalore, Karnataka",
    joinDate: "2024-02-20",
    status: "active",
    submissions: 8,
    totalValue: 32000,
    lastActive: "1 day ago",
  },
  {
    id: 3,
    name: "Suresh Patel",
    email: "suresh@example.com",
    phone: "+91 9876543212",
    role: "middleman",
    location: "Hubli, Karnataka",
    joinDate: "2024-01-10",
    status: "inactive",
    submissions: 25,
    totalValue: 89000,
    lastActive: "1 week ago",
  },
  {
    id: 4,
    name: "Ramesh Farmer",
    email: "ramesh@example.com",
    phone: "+91 9876543213",
    role: "farmer",
    location: "Mangalore, Karnataka",
    joinDate: "2024-03-05",
    status: "active",
    submissions: 6,
    totalValue: 18000,
    lastActive: "3 hours ago",
  },
]

export default function AdminUsers() {
  const [admin, setAdmin] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
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

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const handleUserAction = (userId: number, action: string) => {
    const user = users.find((u) => u.id === userId)
    alert(`${action} action performed on user: ${user?.name}`)
  }

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
              <h1 className="text-xl font-bold text-blue-800">User Management</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">Registered sellers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {users.filter((u) => u.status === "active").length}
              </div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Farmers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{users.filter((u) => u.role === "farmer").length}</div>
              <p className="text-xs text-muted-foreground">Farmer accounts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Middlemen</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {users.filter((u) => u.role === "middleman").length}
              </div>
              <p className="text-xs text-muted-foreground">Middleman accounts</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>User Directory</CardTitle>
            <CardDescription>Search and filter registered users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="farmer">Farmers</SelectItem>
                  <SelectItem value="middleman">Middlemen</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* User List */}
        <Card>
          <CardHeader>
            <CardTitle>Users ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-semibold">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{user.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Mail className="h-3 w-3" />
                            <span>{user.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="h-3 w-3" />
                            <span>{user.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={user.role === "farmer" ? "default" : "secondary"}>{user.role}</Badge>
                      <Badge variant={user.status === "active" ? "default" : "destructive"}>{user.status}</Badge>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <span className="text-sm text-gray-500">Location</span>
                      <p className="font-medium flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {user.location}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Join Date</span>
                      <p className="font-medium flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(user.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Submissions</span>
                      <p className="font-medium">{user.submissions} crops</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Total Value</span>
                      <p className="font-medium text-green-600">₹{user.totalValue.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Last active: {user.lastActive}</span>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleUserAction(user.id, "View Profile")}>
                        View Profile
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleUserAction(user.id, "Send Message")}>
                        <Mail className="h-3 w-3 mr-1" />
                        Message
                      </Button>
                      {user.status === "active" ? (
                        <Button size="sm" variant="destructive" onClick={() => handleUserAction(user.id, "Deactivate")}>
                          <UserX className="h-3 w-3 mr-1" />
                          Deactivate
                        </Button>
                      ) : (
                        <Button size="sm" onClick={() => handleUserAction(user.id, "Activate")}>
                          <UserCheck className="h-3 w-3 mr-1" />
                          Activate
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
