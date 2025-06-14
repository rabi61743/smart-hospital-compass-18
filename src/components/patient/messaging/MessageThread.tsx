
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip, Shield } from "lucide-react";

interface Message {
  id: string;
  sender: 'patient' | 'doctor';
  senderName: string;
  content: string;
  timestamp: string;
  isUrgent?: boolean;
}

interface MessageThreadProps {
  conversationId: string;
}

const MessageThread = ({ conversationId }: MessageThreadProps) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages] = useState<Message[]>([
    {
      id: "1",
      sender: "doctor",
      senderName: "Dr. Sarah Johnson",
      content: "Hello! I wanted to follow up on your recent lab results. Everything looks good overall, but I'd like to discuss a few points with you.",
      timestamp: "2 days ago at 10:30 AM"
    },
    {
      id: "2",
      sender: "patient",
      senderName: "You",
      content: "Thank you for reaching out. I have some questions about the cholesterol levels you mentioned in our last appointment.",
      timestamp: "2 days ago at 2:15 PM"
    },
    {
      id: "3",
      sender: "doctor",
      senderName: "Dr. Sarah Johnson",
      content: "Your lab results are ready for review. Please schedule a follow-up appointment to discuss the next steps in your treatment plan.",
      timestamp: "2 hours ago"
    }
  ]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-600" />
          Secure Conversation
        </CardTitle>
        <p className="text-sm text-gray-600">
          This conversation is encrypted and HIPAA compliant
        </p>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.sender === 'patient'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="text-xs font-medium mb-1 opacity-80">
                  {message.senderName}
                </div>
                <p className="text-sm">{message.content}</p>
                <div className="text-xs mt-2 opacity-70">
                  {message.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t p-4 flex-shrink-0">
          <div className="flex gap-2">
            <div className="flex-1">
              <Textarea
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="min-h-[80px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Button variant="outline" size="sm">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button onClick={handleSendMessage} size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageThread;
