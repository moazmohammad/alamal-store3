"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, ArrowLeft, Send, User, Bot } from "lucide-react"
import Link from "next/link"
import { getCurrentUser } from "@/lib/store"

interface Message {
  id: number
  text: string
  sender: "user" | "admin"
  timestamp: string
  senderName: string
}

export default function AdminChat() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "مرحباً! كيف يمكنني مساعدتك؟",
      sender: "admin",
      timestamp: new Date().toISOString(),
      senderName: "الدعم الفني",
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const currentUser = getCurrentUser()

  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn")
    if (!loggedIn || !currentUser) {
      router.push("/admin")
    } else {
      setIsAuthenticated(true)
    }
  }, [router, currentUser])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now(),
      text: newMessage,
      sender: "admin",
      timestamp: new Date().toISOString(),
      senderName: currentUser?.name || "المدير",
    }

    setMessages([...messages, message])
    setNewMessage("")

    // محاكاة رد تلقائي
    setTimeout(() => {
      const autoReply: Message = {
        id: Date.now() + 1,
        text: "شكراً لك على رسالتك. سيتم الرد عليك قريباً.",
        sender: "user",
        timestamp: new Date().toISOString(),
        senderName: "النظام التلقائي",
      }
      setMessages((prev) => [...prev, autoReply])
    }, 1000)
  }

  if (!isAuthenticated) {
    return <div>جاري التحميل...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 ml-2" />
                  العودة
                </Button>
              </Link>
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">لوحة الدردشة</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle>الدردشة المباشرة</CardTitle>
            <CardDescription>تواصل مع العملاء والفريق</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            {/* Messages Area */}
            <ScrollArea className="flex-1 mb-4 p-4 border rounded-lg bg-gray-50">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "admin" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === "admin" ? "bg-blue-600 text-white" : "bg-white border border-gray-200"
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        {message.sender === "admin" ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                        <span className="text-xs font-medium">{message.senderName}</span>
                      </div>
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString("ar-EG")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="اكتب رسالتك هنا..."
                className="flex-1 text-right"
              />
              <Button type="submit" disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
