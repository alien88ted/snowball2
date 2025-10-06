"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Send } from "lucide-react"

export function FrostyChat() {
  const [messages, setMessages] = useState([
    { id: 1, user: "SnowQueen", message: "Hey everyone! ❄️", time: "10:30 AM" },
    { id: 2, user: "FrostyBob", message: "Ready for the snowball fight? ⛄", time: "10:32 AM" },
    { id: 3, user: "IcePrincess", message: "Count me in! 🎿", time: "10:33 AM" },
  ])
  const [newMessage, setNewMessage] = useState("")

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          user: "You",
          message: newMessage,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
      setNewMessage("")
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-foreground mb-2 font-serif">Frosty Chat</h2>
        <p className="text-muted-foreground">Real-time messaging with cool winter-themed emojis</p>
      </div>

      <Card className="h-[600px] flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Winter Wonderland Group</h3>
          <p className="text-sm text-muted-foreground">3 members online</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.user === "You" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] ${msg.user === "You" ? "order-2" : ""}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-foreground">{msg.user}</span>
                  <span className="text-xs text-muted-foreground">{msg.time}</span>
                </div>
                <div
                  className={`rounded-2xl px-4 py-2 ${msg.user === "You" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}
                >
                  {msg.message}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              placeholder="Type a message... ❄️"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1"
            />
            <Button onClick={sendMessage} className="bg-primary hover:bg-primary/90">
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-2 mt-2">
            {["❄️", "⛄", "🎿", "🏂", "⛷️", "🌨️"].map((emoji) => (
              <button
                key={emoji}
                onClick={() => setNewMessage(newMessage + emoji)}
                className="text-2xl hover:scale-110 transition-transform"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
