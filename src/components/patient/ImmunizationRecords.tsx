
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Calendar, Bell, AlertTriangle, CheckCircle, Clock } from "lucide-react";

interface Vaccination {
  id: string;
  name: string;
  date: Date;
  provider: string;
  batchNumber: string;
  site: string;
  nextDue?: Date;
  status: 'completed' | 'overdue' | 'upcoming';
}

interface VaccinationReminder {
  id: string;
  vaccineName: string;
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
  reminderSet: boolean;
}

const ImmunizationRecords = () => {
  // Mock vaccination history data
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([
    {
      id: '1',
      name: 'COVID-19 (Pfizer)',
      date: new Date('2023-12-15'),
      provider: 'City Health Center',
      batchNumber: 'PF001234',
      site: 'Left arm',
      nextDue: new Date('2024-12-15'),
      status: 'completed'
    },
    {
      id: '2',
      name: 'Influenza',
      date: new Date('2023-10-20'),
      provider: 'Family Clinic',
      batchNumber: 'FLU2023',
      site: 'Right arm',
      nextDue: new Date('2024-10-20'),
      status: 'upcoming'
    },
    {
      id: '3',
      name: 'Tetanus',
      date: new Date('2020-03-10'),
      provider: 'General Hospital',
      batchNumber: 'TET789',
      site: 'Left arm',
      nextDue: new Date('2030-03-10'),
      status: 'completed'
    },
    {
      id: '4',
      name: 'Hepatitis B',
      date: new Date('2019-08-15'),
      provider: 'Vaccination Center',
      batchNumber: 'HEP456',
      site: 'Right arm',
      status: 'completed'
    }
  ]);

  const [reminders, setReminders] = useState<VaccinationReminder[]>([
    {
      id: '1',
      vaccineName: 'Influenza (Annual)',
      dueDate: new Date('2024-10-20'),
      priority: 'high',
      reminderSet: true
    },
    {
      id: '2',
      vaccineName: 'COVID-19 Booster',
      dueDate: new Date('2024-12-15'),
      priority: 'medium',
      reminderSet: false
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'upcoming': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'overdue': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Shield className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge className="bg-green-100 text-green-800">Complete</Badge>;
      case 'upcoming': return <Badge className="bg-yellow-100 text-yellow-800">Due Soon</Badge>;
      case 'overdue': return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      default: return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case 'medium': return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case 'low': return <Badge className="bg-green-100 text-green-800">Low</Badge>;
      default: return <Badge className="bg-gray-100 text-gray-800">Normal</Badge>;
    }
  };

  const toggleReminder = (reminderId: string) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === reminderId 
          ? { ...reminder, reminderSet: !reminder.reminderSet }
          : reminder
      )
    );
  };

  const upcomingVaccinations = vaccinations.filter(v => v.status === 'upcoming' || v.status === 'overdue');
  const completedVaccinations = vaccinations.filter(v => v.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Vaccinations</p>
                <p className="text-2xl font-bold">{vaccinations.length}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Up to Date</p>
                <p className="text-2xl font-bold">{completedVaccinations.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Due Soon</p>
                <p className="text-2xl font-bold">{upcomingVaccinations.length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Reminders Set</p>
                <p className="text-2xl font-bold">{reminders.filter(r => r.reminderSet).length}</p>
              </div>
              <Bell className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="history" className="space-y-4">
        <TabsList>
          <TabsTrigger value="history">Vaccination History</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="reminders">Reminders</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vaccination History</CardTitle>
              <CardDescription>Complete record of your vaccinations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vaccine</TableHead>
                    <TableHead>Date Given</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Batch Number</TableHead>
                    <TableHead>Site</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Next Due</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vaccinations.map((vaccination) => (
                    <TableRow key={vaccination.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(vaccination.status)}
                          <span className="font-medium">{vaccination.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{vaccination.date.toLocaleDateString()}</TableCell>
                      <TableCell>{vaccination.provider}</TableCell>
                      <TableCell>{vaccination.batchNumber}</TableCell>
                      <TableCell>{vaccination.site}</TableCell>
                      <TableCell>{getStatusBadge(vaccination.status)}</TableCell>
                      <TableCell>
                        {vaccination.nextDue ? vaccination.nextDue.toLocaleDateString() : 'N/A'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Vaccinations</CardTitle>
              <CardDescription>Vaccines due soon or overdue</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingVaccinations.length > 0 ? (
                <div className="space-y-4">
                  {upcomingVaccinations.map((vaccination) => (
                    <div key={vaccination.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(vaccination.status)}
                        <div>
                          <h3 className="font-medium">{vaccination.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Due: {vaccination.nextDue?.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(vaccination.status)}
                        <Button size="sm">Schedule</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">All Up to Date!</h3>
                  <p className="text-muted-foreground">You have no upcoming vaccinations at this time.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reminders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vaccination Reminders</CardTitle>
              <CardDescription>Manage your vaccination reminder preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reminders.map((reminder) => (
                  <div key={reminder.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Bell className="w-5 h-5 text-purple-600" />
                      <div>
                        <h3 className="font-medium">{reminder.vaccineName}</h3>
                        <p className="text-sm text-muted-foreground">
                          Due: {reminder.dueDate.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getPriorityBadge(reminder.priority)}
                      <Button
                        variant={reminder.reminderSet ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleReminder(reminder.id)}
                      >
                        {reminder.reminderSet ? "Reminder On" : "Set Reminder"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImmunizationRecords;
