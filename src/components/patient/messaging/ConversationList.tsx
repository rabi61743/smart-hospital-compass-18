
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, AlertTriangle } from "lucide-react";

interface Conversation {
  id: string;
  doctorName: string;
  doctorSpecialty: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isUrgent: boolean;
}

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversation: string | null;
  onConversationSelect: (id: string) => void;
}

const ConversationList = ({ conversations, selectedConversation, onConversationSelect }: ConversationListProps) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Conversations
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 cursor-pointer border-b hover:bg-gray-50 transition-colors ${
                selectedConversation === conversation.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
              }`}
              onClick={() => onConversationSelect(conversation.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-sm">{conversation.doctorName}</h4>
                  <p className="text-xs text-gray-500">{conversation.doctorSpecialty}</p>
                </div>
                <div className="flex items-center gap-1">
                  {conversation.isUrgent && (
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  )}
                  {conversation.unreadCount > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {conversation.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-600 line-clamp-2 mb-1">
                {conversation.lastMessage}
              </p>
              <p className="text-xs text-gray-400">{conversation.timestamp}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversationList;
