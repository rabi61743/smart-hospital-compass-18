
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Screen,
  ScreenShare,
  MessageSquare,
  FileText,
  Camera,
  Settings,
  Users,
  Clock,
  Signal
} from "lucide-react";

interface TelemedicineSession {
  id: string;
  patientName: string;
  patientId: string;
  sessionType: 'video' | 'audio' | 'screen-share';
  status: 'scheduled' | 'waiting' | 'active' | 'completed';
  startTime?: Date;
  duration?: number;
  quality: 'excellent' | 'good' | 'poor';
}

const mockSessions: TelemedicineSession[] = [
  {
    id: '1',
    patientName: 'Michael Chen',
    patientId: 'p2',
    sessionType: 'video',
    status: 'waiting',
    quality: 'excellent'
  },
  {
    id: '2',
    patientName: 'Sarah Johnson',
    patientId: 'p1',
    sessionType: 'video',
    status: 'active',
    startTime: new Date(Date.now() - 15 * 60 * 1000),
    quality: 'good'
  }
];

const TelemedicineHub = () => {
  const [sessions, setSessions] = useState<TelemedicineSession[]>(mockSessions);
  const [activeSession, setActiveSession] = useState<TelemedicineSession | null>(null);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{sender: string, message: string, time: Date}>>([]);
  const [newMessage, setNewMessage] = useState('');

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getQualityIcon = (quality: string) => {
    const bars = quality === 'excellent' ? 4 : quality === 'good' ? 3 : 2;
    return (
      <div className="flex space-x-1">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className={`w-1 h-3 rounded ${
              i < bars ? getQualityColor(quality).replace('text-', 'bg-') : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const startSession = (session: TelemedicineSession) => {
    setActiveSession(session);
    setSessions(sessions.map(s => 
      s.id === session.id 
        ? { ...s, status: 'active' as const, startTime: new Date() }
        : s
    ));
  };

  const endSession = () => {
    if (activeSession) {
      setSessions(sessions.map(s => 
        s.id === activeSession.id 
          ? { ...s, status: 'completed' as const }
          : s
      ));
      setActiveSession(null);
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() && activeSession) {
      setChatMessages([...chatMessages, {
        sender: 'Doctor',
        message: newMessage,
        time: new Date()
      }]);
      setNewMessage('');
    }
  };

  if (activeSession) {
    return (
      <div className="h-full flex flex-col">
        {/* Session Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold">Consultation with {activeSession.patientName}</h2>
            <Badge variant="outline" className="bg-green-100 text-green-800">
              LIVE
            </Badge>
            <div className="flex items-center space-x-2">
              <Signal className="h-4 w-4" />
              {getQualityIcon(activeSession.quality)}
              <span className={`text-sm ${getQualityColor(activeSession.quality)}`}>
                {activeSession.quality}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-600">
              {activeSession.startTime && 
                Math.floor((Date.now() - activeSession.startTime.getTime()) / (1000 * 60))}m
            </span>
          </div>
        </div>

        {/* Video Interface */}
        <div className="flex-1 grid grid-cols-4 gap-4 p-4">
          {/* Main Video Area */}
          <div className="col-span-3 space-y-4">
            {/* Patient Video */}
            <Card className="aspect-video bg-gray-900 relative">
              <CardContent className="p-0 h-full flex items-center justify-center">
                <div className="text-white text-center">
                  <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">{activeSession.patientName}</p>
                  <p className="text-sm opacity-75">Patient Video</p>
                </div>
                <Badge className="absolute top-4 left-4 bg-red-600">
                  REC
                </Badge>
              </CardContent>
            </Card>

            {/* Doctor Video (Picture-in-Picture) */}
            <Card className="absolute bottom-20 right-8 w-48 aspect-video bg-gray-800">
              <CardContent className="p-0 h-full flex items-center justify-center">
                <div className="text-white text-center">
                  <Camera className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">You</p>
                </div>
              </CardContent>
            </Card>

            {/* Controls */}
            <div className="flex justify-center space-x-4">
              <Button
                variant={isVideoOn ? "default" : "destructive"}
                size="lg"
                onClick={() => setIsVideoOn(!isVideoOn)}
                className="rounded-full w-12 h-12"
              >
                {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </Button>
              <Button
                variant={isAudioOn ? "default" : "destructive"}
                size="lg"
                onClick={() => setIsAudioOn(!isAudioOn)}
                className="rounded-full w-12 h-12"
              >
                {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </Button>
              <Button
                variant={isScreenSharing ? "secondary" : "outline"}
                size="lg"
                onClick={() => setIsScreenSharing(!isScreenSharing)}
                className="rounded-full w-12 h-12"
              >
                {isScreenSharing ? <Screen className="h-5 w-5" /> : <ScreenShare className="h-5 w-5" />}
              </Button>
              <Button
                variant="destructive"
                size="lg"
                onClick={endSession}
                className="rounded-full w-12 h-12"
              >
                <PhoneOff className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-4">
            {/* Chat */}
            <Card className="h-64">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Chat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="h-32 overflow-y-auto space-y-2">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className="text-xs">
                      <span className="font-medium">{msg.sender}:</span>
                      <p className="text-gray-600">{msg.message}</p>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="text-xs"
                  />
                  <Button size="sm" onClick={sendMessage}>
                    <MessageSquare className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Take Notes
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Camera className="h-4 w-4 mr-2" />
                  Screenshot
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Telemedicine Hub</h2>
          <p className="text-gray-600">Manage your virtual consultations</p>
        </div>
        <Button>
          <Video className="h-4 w-4 mr-2" />
          Start New Session
        </Button>
      </div>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Virtual Appointments</CardTitle>
          <CardDescription>Scheduled telemedicine sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-gray-600" />
                    <div>
                      <h3 className="font-medium">{session.patientName}</h3>
                      <p className="text-sm text-gray-600">
                        {session.sessionType} consultation
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Signal className="h-4 w-4" />
                    {getQualityIcon(session.quality)}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Badge 
                    className={
                      session.status === 'active' ? 'bg-green-100 text-green-800' :
                      session.status === 'waiting' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }
                  >
                    {session.status.toUpperCase()}
                  </Badge>
                  
                  {session.status === 'waiting' && (
                    <Button onClick={() => startSession(session)}>
                      <Video className="h-4 w-4 mr-2" />
                      Join
                    </Button>
                  )}
                  
                  {session.status === 'active' && (
                    <Button onClick={() => setActiveSession(session)}>
                      <Video className="h-4 w-4 mr-2" />
                      Resume
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Connection Status</p>
                <p className="text-lg font-semibold text-green-600">Excellent</p>
              </div>
              <Signal className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Sessions</p>
                <p className="text-lg font-semibold">
                  {sessions.filter(s => s.status === 'active').length}
                </p>
              </div>
              <Video className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Waiting Patients</p>
                <p className="text-lg font-semibold">
                  {sessions.filter(s => s.status === 'waiting').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TelemedicineHub;
