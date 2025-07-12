"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, Send, User, Bot, MessageSquare } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: number
  text: string
  sender: "user" | "support"
  timestamp: string
  senderName: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "مرحباً بك في خدمة العملاء! كيف يمكنني مساعدتك اليوم؟",
      sender: "support",
      timestamp: new Date().toISOString(),
      senderName: "فريق الدعم",
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [isNameSet, setIsNameSet] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Auto scroll to bottom when new message is added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSetName = (e: React.FormEvent) => {
    e.preventDefault()
    if (customerName.trim()) {
      setIsNameSet(true)
      toast({
        title: "مرحباً بك! 👋",
        description: `أهلاً ${customerName}، يمكنك الآن بدء المحادثة`,
        variant: "success",
      })
    }
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
      timestamp: new Date().toISOString(),
      senderName: customerName,
    }

    setMessages([...messages, message])
    setNewMessage("")

    // محاكاة رد تلقائي من فريق الدعم
    setTimeout(() => {
      const autoReply: Message = {
        id: Date.now() + 1,
        text: "شكراً لك على رسالتك. سيقوم أحد أعضاء فريق الدعم بالرد عليك قريباً.",
        sender: "support",
        timestamp: new Date().toISOString(),
        senderName: "نظام تلقائي",
      }
      setMessages((prev) => [...prev, autoReply])
    }, 1000)
  }

  if (!isNameSet) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">مكتبة الأمل</h1>
              </Link>

              <div className="flex items-center space-x-4">
                <Link href="/">
                  <Button variant="outline" size="sm">
                    العودة للمتجر
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-md mx-auto px-4 py-16">
          <Card>
            <CardHeader className="text-center">
              <MessageSquare className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>مرحباً بك في خدمة العملاء</CardTitle>
              <CardDescription>أدخل اسمك للبدء في المحادثة</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSetName} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    placeholder="اسمك الكريم..."
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="text-right"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  بدء المحادثة
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">مكتبة الأمل - الدردشة</h1>
            </Link>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 hidden sm:block">مرحباً {customerName}</span>
              <Link href="/">
                <Button variant="outline" size="sm">
                  العودة للمتجر
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        <Card className="h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle>الدردشة المباشرة</CardTitle>
            <CardDescription>تواصل مع فريق خدمة العملاء</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            {/* Messages Area */}
            <ScrollArea className="flex-1 mb-4 p-4 border rounded-lg bg-gray-50" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === "user" ? "bg-blue-600 text-white" : "bg-white border border-gray-200"
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        {message.sender === "user" ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
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
            <form onSubmit={handleSendMessage} className="flex gap-2">
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
