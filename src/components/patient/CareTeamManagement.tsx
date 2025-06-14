
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, UserPlus, Phone, Mail, MapPin, Clock, MessageSquare, Calendar, Star, Heart } from "lucide-react";

interface CareTeamMember {
  id: string;
  name: string;
  specialty: string;
  role: 'primary' | 'specialist' | 'consultant';
  hospital: string;
  phone: string;
  email: string;
  address: string;
  lastVisit: string;
  nextAppointment?: string;
  rating: number;
  isPrimary: boolean;
  notes: string;
}

interface CareCoordination {
  id: string;
  date: string;
  fromDoctor: string;
  toDoctor: string;
  subject: string;
  status: 'pending' | 'completed' | 'in-progress';
  priority: 'low' | 'medium' | 'high';
  description: string;
}

const CareTeamManagement = () => {
  const [careTeam, setCareTeam] = useState<CareTeamMember[]>([
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Primary Care Physician',
      role: 'primary',
      hospital: 'City General Hospital',
      phone: '+91 98765 43210',
      email: 'sarah.johnson@hospital.com',
      address: '123 Medical Center Dr, Mumbai',
      lastVisit: '2024-01-15',
      nextAppointment: '2024-02-15',
      rating: 4.8,
      isPrimary: true,
      notes: 'Managing overall health and coordinating care'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Cardiologist',
      role: 'specialist',
      hospital: 'Heart Care Institute',
      phone: '+91 98765 43211',
      email: 'michael.chen@heartcare.com',
      address: '456 Cardiac Ave, Mumbai',
      lastVisit: '2024-01-10',
      nextAppointment: '2024-02-20',
      rating: 4.9,
      isPrimary: false,
      notes: 'Monitoring heart condition and blood pressure'
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      specialty: 'Endocrinologist',
      role: 'specialist',
      hospital: 'Diabetes & Hormone Center',
      phone: '+91 98765 43212',
      email: 'emily.rodriguez@diabetes.com',
      address: '789 Wellness St, Mumbai',
      lastVisit: '2024-01-05',
      rating: 4.7,
      isPrimary: false,
      notes: 'Managing diabetes and thyroid conditions'
    }
  ]);

  const [coordination, setCoordination] = useState<CareCoordination[]>([
    {
      id: '1',
      date: '2024-01-20',
      fromDoctor: 'Dr. Sarah Johnson',
      toDoctor: 'Dr. Michael Chen',
      subject: 'Blood pressure medication adjustment',
      status: 'completed',
      priority: 'medium',
      description: 'Patient showing elevated BP readings, recommend medication review'
    },
    {
      id: '2',
      date: '2024-01-18',
      fromDoctor: 'Dr. Michael Chen',
      toDoctor: 'Dr. Emily Rodriguez',
      subject: 'Diabetes medication interaction concern',
      status: 'in-progress',
      priority: 'high',
      description: 'Need to review potential interactions between cardiac and diabetes medications'
    }
  ]);

  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'primary': return 'bg-blue-100 text-blue-800';
      case 'specialist': return 'bg-green-100 text-green-800';
      case 'consultant': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 p-4">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-l-blue-500">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-xl font-bold text-gray-900">
            <Users className="h-6 w-6 mr-3 text-blue-600" />
            Care Team Management
          </CardTitle>
          <CardDescription className="text-gray-600">
            Coordinate and manage your healthcare team - doctors, specialists, and care providers
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="team" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="team">My Care Team</TabsTrigger>
          <TabsTrigger value="coordination">Care Coordination</TabsTrigger>
          <TabsTrigger value="communication">Team Communication</TabsTrigger>
        </TabsList>

        {/* Care Team Tab */}
        <TabsContent value="team" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Healthcare Providers</h3>
            <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Provider
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Healthcare Provider</DialogTitle>
                  <DialogDescription>
                    Add a new doctor or specialist to your care team
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="providerName">Provider Name *</Label>
                    <Input id="providerName" placeholder="Dr. John Smith" />
                  </div>
                  <div>
                    <Label htmlFor="specialty">Specialty *</Label>
                    <Input id="specialty" placeholder="e.g., Cardiology, Neurology" />
                  </div>
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="primary">Primary Care</SelectItem>
                        <SelectItem value="specialist">Specialist</SelectItem>
                        <SelectItem value="consultant">Consultant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="hospital">Hospital/Clinic</Label>
                    <Input id="hospital" placeholder="Medical facility name" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddMemberOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddMemberOpen(false)}>
                      Add Provider
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {careTeam.map((member) => (
              <Card key={member.id} className={`${member.isPrimary ? 'border-blue-200 bg-blue-50' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-lg">{member.name}</h4>
                        {member.isPrimary && (
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                            <Heart className="h-3 w-3 mr-1" />
                            Primary Care
                          </Badge>
                        )}
                        <Badge className={getRoleColor(member.role)}>
                          {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-gray-600 font-medium mb-3">{member.specialty}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{member.hospital}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          <span>{member.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          <span>{member.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-2 text-yellow-500" />
                          <span>{member.rating}/5.0 Rating</span>
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <Label className="font-medium text-gray-700">Last Visit</Label>
                          <div>{new Date(member.lastVisit).toLocaleDateString()}</div>
                        </div>
                        {member.nextAppointment && (
                          <div>
                            <Label className="font-medium text-gray-700">Next Appointment</Label>
                            <div>{new Date(member.nextAppointment).toLocaleDateString()}</div>
                          </div>
                        )}
                      </div>

                      {member.notes && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-md">
                          <Label className="font-medium text-gray-700">Notes</Label>
                          <p className="text-sm text-gray-600 mt-1">{member.notes}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col space-y-2">
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="h-4 w-4 mr-1" />
                        Email
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calendar className="h-4 w-4 mr-1" />
                        Schedule
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Care Coordination Tab */}
        <TabsContent value="coordination" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Care Coordination Activities</h3>
            <Button>
              <MessageSquare className="h-4 w-4 mr-2" />
              Request Coordination
            </Button>
          </div>

          <div className="space-y-4">
            {coordination.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold">{item.subject}</h4>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status.replace('-', ' ')}
                        </Badge>
                        <Badge className={getPriorityColor(item.priority)}>
                          {item.priority} priority
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">{item.fromDoctor}</span> → <span className="font-medium">{item.toDoctor}</span>
                      </div>
                      
                      <p className="text-sm text-gray-700">{item.description}</p>
                    </div>
                    
                    <div className="text-sm text-gray-500 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Team Communication Tab */}
        <TabsContent value="communication" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Communication Hub</CardTitle>
              <CardDescription>
                Secure messaging between your healthcare providers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>Team communication features coming soon</p>
                <p className="text-sm mt-2">Healthcare providers will be able to securely communicate about your care</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CareTeamManagement;
