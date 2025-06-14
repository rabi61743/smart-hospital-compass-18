
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, LogIn, LogOut, Coffee, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ClockInOutCardProps {
  currentTime: Date;
}

const ClockInOutCard = ({ currentTime }: ClockInOutCardProps) => {
  const { toast } = useToast();
  const [clockedIn, setClockedIn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [todayHours, setTodayHours] = useState(6.5);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleClockIn = () => {
    setClockedIn(true);
    toast({
      title: "Clocked In",
      description: `Successfully clocked in at ${formatTime(currentTime)}`,
    });
  };

  const handleClockOut = () => {
    setClockedIn(false);
    setOnBreak(false);
    toast({
      title: "Clocked Out",
      description: `Successfully clocked out at ${formatTime(currentTime)}`,
    });
  };

  const handleBreakToggle = () => {
    setOnBreak(!onBreak);
    toast({
      title: onBreak ? "Break Ended" : "Break Started",
      description: `Break ${onBreak ? 'ended' : 'started'} at ${formatTime(currentTime)}`,
    });
  };

  const getStatusBadge = () => {
    if (!clockedIn) return <Badge variant="secondary">Clocked Out</Badge>;
    if (onBreak) return <Badge className="bg-orange-100 text-orange-800">On Break</Badge>;
    return <Badge className="bg-green-100 text-green-800">Active</Badge>;
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Time Clock
          </div>
          {getStatusBadge()}
        </CardTitle>
        <CardDescription>
          {formatDate(currentTime)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Current Time */}
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {formatTime(currentTime)}
            </div>
            <p className="text-sm text-muted-foreground">Current Time</p>
          </div>

          {/* Today's Hours */}
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {todayHours}h
            </div>
            <p className="text-sm text-muted-foreground">Hours Today</p>
          </div>

          {/* Location */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <MapPin className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium">Main Office</span>
            </div>
            <p className="text-sm text-muted-foreground">Current Location</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          {!clockedIn ? (
            <Button onClick={handleClockIn} size="lg" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Clock In
            </Button>
          ) : (
            <>
              <Button 
                onClick={handleBreakToggle} 
                variant="outline" 
                size="lg"
                className="flex items-center gap-2"
              >
                <Coffee className="h-4 w-4" />
                {onBreak ? 'End Break' : 'Start Break'}
              </Button>
              <Button 
                onClick={handleClockOut} 
                variant="destructive" 
                size="lg"
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Clock Out
              </Button>
            </>
          )}
        </div>

        {/* Recent Activity */}
        <div className="mt-6 p-4 bg-white rounded-lg">
          <h4 className="font-medium mb-3">Today's Activity</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Clock In</span>
              <span className="text-muted-foreground">09:00 AM</span>
            </div>
            <div className="flex justify-between">
              <span>Break Start</span>
              <span className="text-muted-foreground">12:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Break End</span>
              <span className="text-muted-foreground">01:00 PM</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClockInOutCard;
