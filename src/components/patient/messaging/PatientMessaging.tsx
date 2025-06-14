
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConversationList from "./ConversationList";
import MessageThread from "./MessageThread";
import NewMessageDialog from "./NewMessageDialog";

interface Conversation {
  id: string;
  doctorName: string;
  doctorSpecialty: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isUrgent: boolean;
}

const PatientMessaging = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [conversations] = useState<Conversation[]>([
    {
      id: "1",
      doctorName: "Dr. Sarah Johnson",
      doctorSpecialty: "Primary Care",
      lastMessage: "Your lab results are ready for review. Please schedule a follow-up appointment.",
      timestamp: "2 hours ago",
      unreadCount: 1,
      isUrgent: false
    },
    {
      id: "2",
      doctorName: "Dr. Michael Chen",
      doctorSpecialty: "Cardiology",
      lastMessage: "Please continue taking your medication as prescribed and monitor your blood pressure daily.",
      timestamp: "1 day ago",
      unreadCount: 0,
      isUrgent: false
    },
    {
      id: "3",
      doctorName: "Dr. Emily Rodriguez",
      doctorSpecialty: "Dermatology",
      lastMessage: "The biopsy results are benign. No further treatment needed at this time.",
      timestamp: "3 days ago",
      unreadCount: 0,
      isUrgent: false
    }
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Patient-Doctor Messaging</CardTitle>
          <CardDescription>Secure communication with your healthcare providers</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="messages" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="compose">New Message</TabsTrigger>
            </TabsList>

            <TabsContent value="messages" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
                <div className="lg:col-span-1">
                  <ConversationList
                    conversations={conversations}
                    selectedConversation={selectedConversation}
                    onConversationSelect={setSelectedConversation}
                  />
                </div>
                <div className="lg:col-span-2">
                  {selectedConversation ? (
                    <MessageThread conversationId={selectedConversation} />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
                      <p className="text-gray-500">Select a conversation to view messages</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="compose">
              <NewMessageDialog />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientMessaging;
