import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageCircle, 
  Users, 
  TestTube, 
  AlertTriangle,
  Search,
  Send,
  Phone,
  Video,
  Clock,
  CheckCircle,
  Bell
} from "lucide-react";

const CommunicationHub = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const patientMessages = [
    {
      id: 'pm1',
      patientName: 'Sarah Johnson',
      subject: 'Follow-up Questions',
      preview: 'I have some questions about my recent lab results...',
      timestamp: '2 hours ago',
      unread: true,
      priority: 'normal',
      avatar: '/api/placeholder/32/32'
    },
    {
      id: 'pm2',
      patientName: 'Michael Chen',
      subject: 'Medication Side Effects',
      preview: 'I\'ve been experiencing some side effects...',
      timestamp: '4 hours ago',
      unread: true,
      priority: 'high',
      avatar: '/api/placeholder/32/32'
    },
    {
      id: 'pm3',
      patientName: 'Emily Davis',
      subject: 'Appointment Request',
      preview: 'Could we schedule a follow-up appointment?',
      timestamp: '1 day ago',
      unread: false,
      priority: 'normal',
      avatar: '/api/placeholder/32/32'
    }
  ];

  const staffMessages = [
    {
      id: 'sm1',
      staffName: 'Nurse Jennifer',
      role: 'RN',
      subject: 'Patient Chart Update',
      preview: 'Updated vitals for room 302...',
      timestamp: '30 minutes ago',
      unread: true,
      department: 'ICU'
    },
    {
      id: 'sm2',
      staffName: 'Dr. Martinez',
      role: 'MD',
      subject: 'Consultation Request',
      preview: 'Need your opinion on a complex case...',
      timestamp: '1 hour ago',
      unread: true,
      department: 'Cardiology'
    },
    {
      id: 'sm3',
      staffName: 'Tech Wilson',
      role: 'Tech',
      subject: 'Equipment Status',
      preview: 'MRI machine is back online...',
      timestamp: '3 hours ago',
      unread: false,
      department: 'Radiology'
    }
  ];

  const labNotifications = [
    {
      id: 'ln1',
      patientName: 'Sarah Johnson',
      testType: 'Complete Blood Count',
      status: 'Ready',
      priority: 'normal',
      timestamp: '1 hour ago',
      labTech: 'Dr. Kim',
      abnormalValues: []
    },
    {
      id: 'ln2',
      patientName: 'Robert Wilson',
      testType: 'Cardiac Enzymes',
      status: 'Critical',
      priority: 'critical',
      timestamp: '45 minutes ago',
      labTech: 'Dr. Park',
      abnormalValues: ['Troponin I: 15.2 ng/mL (Critical High)']
    },
    {
      id: 'ln3',
      patientName: 'Lisa Thompson',
      testType: 'Lipid Panel',
      status: 'Ready',
      priority: 'normal',
      timestamp: '2 hours ago',
      labTech: 'Dr. Lee',
      abnormalValues: ['LDL: 185 mg/dL (High)']
    }
  ];

  const emergencyAlerts = [
    {
      id: 'ea1',
      type: 'Code Blue',
      location: 'Room 305 - ICU',
      timestamp: '10 minutes ago',
      status: 'Active',
      severity: 'critical',
      description: 'Cardiac arrest - CPR in progress'
    },
    {
      id: 'ea2',
      type: 'Lab Critical',
      location: 'ER - Bed 12',
      timestamp: '25 minutes ago',
      status: 'Pending',
      severity: 'high',
      description: 'Critical glucose level: 45 mg/dL'
    },
    {
      id: 'ea3',
      type: 'Medication Alert',
      location: 'Room 208',
      timestamp: '1 hour ago',
      status: 'Resolved',
      severity: 'medium',
      description: 'Drug interaction warning resolved'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'high': return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      default: return <MessageCircle className="h-4 w-4 text-blue-600" />;
    }
  };

  const unreadPatientMessages = patientMessages.filter(msg => msg.unread).length;
  const unreadStaffMessages = staffMessages.filter(msg => msg.unread).length;
  const pendingLabResults = labNotifications.filter(lab => lab.status === 'Ready' || lab.priority === 'critical').length;
  const activeAlerts = emergencyAlerts.filter(alert => alert.status === 'Active' || alert.status === 'Pending').length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Patient Messages</p>
                <p className="text-2xl font-bold">{unreadPatientMessages}</p>
              </div>
              <MessageCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Staff Messages</p>
                <p className="text-2xl font-bold">{unreadStaffMessages}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Lab Results</p>
                <p className="text-2xl font-bold">{pendingLabResults}</p>
              </div>
              <TestTube className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold">{activeAlerts}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="patient-messages" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="patient-messages" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Patient Messages
            {unreadPatientMessages > 0 && (
              <Badge variant="destructive" className="ml-1 px-1 py-0 text-xs">
                {unreadPatientMessages}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="staff-communication" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Staff Communication
            {unreadStaffMessages > 0 && (
              <Badge variant="secondary" className="ml-1 px-1 py-0 text-xs">
                {unreadStaffMessages}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="lab-notifications" className="flex items-center gap-2">
            <TestTube className="h-4 w-4" />
            Lab Results
            {pendingLabResults > 0 && (
              <Badge variant="secondary" className="ml-1 px-1 py-0 text-xs">
                {pendingLabResults}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="emergency-alerts" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Emergency Alerts
            {activeAlerts > 0 && (
              <Badge variant="destructive" className="ml-1 px-1 py-0 text-xs">
                {activeAlerts}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="patient-messages" className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patient messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button>
              <Send className="h-4 w-4 mr-2" />
              New Message
            </Button>
          </div>

          <div className="space-y-3">
            {patientMessages.map((message) => (
              <Card key={message.id} className={`cursor-pointer hover:shadow-md transition-shadow ${message.unread ? 'border-l-4 border-l-blue-500' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={message.avatar} alt={message.patientName} />
                        <AvatarFallback>{message.patientName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-sm">{message.patientName}</h4>
                          {message.unread && <Badge variant="secondary" className="text-xs">New</Badge>}
                          {message.priority === 'high' && (
                            <Badge variant="destructive" className="text-xs">High Priority</Badge>
                          )}
                        </div>
                        <p className="font-medium text-sm text-gray-900 mb-1">{message.subject}</p>
                        <p className="text-sm text-gray-600 line-clamp-1">{message.preview}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {message.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Video className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="staff-communication" className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search staff messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button>
              <Send className="h-4 w-4 mr-2" />
              New Message
            </Button>
          </div>

          <div className="space-y-3">
            {staffMessages.map((message) => (
              <Card key={message.id} className={`cursor-pointer hover:shadow-md transition-shadow ${message.unread ? 'border-l-4 border-l-green-500' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-sm">{message.staffName}</h4>
                        <Badge variant="outline" className="text-xs">{message.role}</Badge>
                        <Badge variant="secondary" className="text-xs">{message.department}</Badge>
                        {message.unread && <Badge variant="secondary" className="text-xs">New</Badge>}
                      </div>
                      <p className="font-medium text-sm text-gray-900 mb-1">{message.subject}</p>
                      <p className="text-sm text-gray-600 line-clamp-1 mb-2">{message.preview}</p>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {message.timestamp}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button size="sm">
                        Reply
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="lab-notifications" className="space-y-4">
          <div className="space-y-3">
            {labNotifications.map((lab) => (
              <Card key={lab.id} className={`${lab.priority === 'critical' ? 'border-l-4 border-l-red-500' : lab.abnormalValues.length > 0 ? 'border-l-4 border-l-orange-500' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium text-sm">{lab.patientName}</h4>
                        <Badge className={lab.priority === 'critical' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                          {lab.status}
                        </Badge>
                        {lab.priority === 'critical' && (
                          <Badge variant="destructive" className="text-xs">Critical</Badge>
                        )}
                      </div>
                      <p className="font-medium text-sm text-gray-900 mb-1">{lab.testType}</p>
                      {lab.abnormalValues.length > 0 && (
                        <div className="bg-orange-50 p-2 rounded-md mb-2">
                          <p className="text-xs font-medium text-orange-800 mb-1">Abnormal Values:</p>
                          {lab.abnormalValues.map((value, index) => (
                            <p key={index} className="text-xs text-orange-700">{value}</p>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Lab Tech: {lab.labTech}</span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {lab.timestamp}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        View Results
                      </Button>
                      <Button size="sm">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Acknowledge
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="emergency-alerts" className="space-y-4">
          <div className="space-y-3">
            {emergencyAlerts.map((alert) => (
              <Card key={alert.id} className={`border-l-4 ${alert.severity === 'critical' ? 'border-l-red-500' : alert.severity === 'high' ? 'border-l-orange-500' : 'border-l-yellow-500'}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getPriorityIcon(alert.severity)}
                        <h4 className="font-medium text-sm">{alert.type}</h4>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.status}
                        </Badge>
                      </div>
                      <p className="font-medium text-sm text-gray-900 mb-1">{alert.location}</p>
                      <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {alert.timestamp}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      {alert.status === 'Active' && (
                        <Button size="sm" variant="destructive">
                          <Bell className="h-4 w-4 mr-1" />
                          Respond
                        </Button>
                      )}
                      {alert.status === 'Pending' && (
                        <Button size="sm">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Acknowledge
                        </Button>
                      )}
                      {alert.status === 'Resolved' && (
                        <Button size="sm" variant="outline" disabled>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Resolved
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunicationHub;
