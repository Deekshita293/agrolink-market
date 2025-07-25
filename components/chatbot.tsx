"use client"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const botResponses: { [key: string]: string } = {
  hello: "Hello! I'm here to help you with CropConnect. How can I assist you today?",
  hi: "Hi there! Welcome to CropConnect. What would you like to know?",
  "how to sell":
    "To sell your crops: 1) Register as a seller 2) View current prices on dashboard 3) Click 'Sell Now' next to your crop 4) Fill in quantity, location, and quality details 5) Submit for admin review",
  prices:
    "All crop prices are fixed by admin and updated regularly. You can view current prices on the dashboard or prices page. No negotiation is allowed.",
  "contact admin":
    "You can contact admin via: WhatsApp (+91 98765 43210), Email (admin@cropconnect.com), or use our contact form. We respond within 24 hours.",
  registration:
    "To register: Click 'Register' → Fill your details (name, email, phone, role) → Choose Farmer or Middleman → Complete registration → Start selling!",
  payment:
    "Payment details will be shared by admin after your crop submission is approved. We support bank transfer, UPI, and cash payments.",
  help: "I can help you with: How to sell crops, Current prices, Registration process, Contacting admin, Payment information. What would you like to know?",
  default:
    "I'm sorry, I didn't understand that. You can ask me about: selling crops, prices, registration, contacting admin, or payment. Type 'help' for more options.",
}

export function
\
