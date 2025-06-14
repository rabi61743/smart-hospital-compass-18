
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pill, Clock, CheckCircle, AlertTriangle, TrendingUp, Calendar } from "lucide-react";
import { format, isToday, isPast } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { MedicationReminder } from "./types";

interface MedicationRemindersProps {
  reminders: MedicationReminder[];
}

const MedicationReminders = ({ reminders }: MedicationRemindersProps) => {
  const { toast } = useToast();
  const [selectedMedication, setSelectedMedication] = useState<MedicationReminder | null>(null);

  const handleMarkTaken = (medicationId: string) => {
    console.log('Marking medication as taken:', medicationId);
    toast({
      title: "Medication Recorded",
      description: "Your medication has been marked as taken.",
    });
  };

  const handleSnoozeReminder = (medicationId: string, minutes: number) => {
    console.log('Snoozing reminder for', minutes, 'minutes:', medicationId);
    toast({
      title: "Reminder Snoozed",
      description: `Reminder will alert you again in ${minutes} minutes.`,
    });
  };

  const getMedicationStatus = (medication: MedicationReminder) => {
    const nextDue = new Date(medication.nextDue);
    if (isPast(nextDue) && medication.isActive) {
      return { status: 'overdue', color: 'bg-red-100 text-red-800' };
    }
    if (isToday(nextDue) && medication.isActive) {
      return { status: 'due today', color: 'bg-yellow-100 text-yellow-800' };
    }
    if (medication.isActive) {
      return { status: 'on track', color: 'bg-green-100 text-green-800' };
    }
    return { status: 'inactive', color: 'bg-gray-100 text-gray-800' };
  };

  const getAdherenceColor = (rate: number) => {
    if (rate >= 95) return 'text-green-600';
    if (rate >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {reminders.map((medication) => {
        const status = getMedicationStatus(medication);
        const nextDue = new Date(medication.nextDue);
        const isOverdue = isPast(nextDue) && medication.isActive;

        return (
          <Card key={medication.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Pill className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold">{medication.medicationName}</h3>
                    <Badge className={status.color}>
                      {status.status}
                    </Badge>
                    {isOverdue && (
                      <Badge variant="destructive">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Overdue
                      </Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-muted-foreground">Dosage & Frequency</p>
                      <p className="font-medium">{medication.dosage} - {medication.frequency}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Next Due</p>
                      <p className="font-medium">{format(nextDue, "MMM dd, h:mm a")}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Streak</p>
                      <p className="font-medium">{medication.streak} days</p>
                    </div>
                  </div>

                  {/* Adherence Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Adherence Rate</span>
                      <span className={`text-sm font-medium ${getAdherenceColor(medication.adherenceRate)}`}>
                        {medication.adherenceRate}%
                      </span>
                    </div>
                    <Progress value={medication.adherenceRate} className="h-2" />
                  </div>

                  {/* Scheduled Times */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Scheduled: {medication.times.join(', ')}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" onClick={() => setSelectedMedication(medication)}>
                        <TrendingUp className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Medication Details</DialogTitle>
                      </DialogHeader>
                      {selectedMedication && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">Medication</label>
                              <p>{selectedMedication.medicationName} {selectedMedication.dosage}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Frequency</label>
                              <p>{selectedMedication.frequency}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Start Date</label>
                              <p>{format(new Date(selectedMedication.startDate), "PPP")}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Current Streak</label>
                              <p>{selectedMedication.streak} days</p>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Scheduled Times</label>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {selectedMedication.times.map((time, i) => (
                                <Badge key={i} variant="outline">{time}</Badge>
                              ))}
                            </div>
                          </div>
                          {selectedMedication.lastTaken && (
                            <div>
                              <label className="text-sm font-medium">Last Taken</label>
                              <p className="text-sm">
                                {format(new Date(selectedMedication.lastTaken), "PPP 'at' h:mm a")}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  
                  {medication.isActive && (
                    <>
                      <Button 
                        size="sm" 
                        onClick={() => handleMarkTaken(medication.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Mark Taken
                      </Button>
                      
                      {isOverdue && (
                        <div className="flex gap-1">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleSnoozeReminder(medication.id, 15)}
                          >
                            15m
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleSnoozeReminder(medication.id, 30)}
                          >
                            30m
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MedicationReminders;
