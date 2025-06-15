
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pill, Bell, Settings, User, LogOut, UserCog, Store, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PharmacyHeader = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { toast } = useToast();

  const notifications = [
    { id: 1, message: "Low stock alert: Paracetamol", type: "warning", time: "5 min ago" },
    { id: 2, message: "New prescription received", type: "info", time: "10 min ago" },
    { id: 3, message: "Daily sales target achieved", type: "success", time: "1 hour ago" },
  ];

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: `You have ${notifications.length} new notifications`,
    });
  };

  const handleSettingsClick = () => {
    toast({
      title: "Settings",
      description: "Opening pharmacy settings...",
    });
  };

  const handleUserAction = (action: string) => {
    toast({
      title: action,
      description: `${action} functionality would be implemented here`,
    });
  };

  return (
    <Card className="border-0 rounded-none bg-gradient-to-r from-green-600 to-blue-600 text-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Pill className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">MediPharm Plus</h1>
                <p className="text-green-100">Pharmacy Management System</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-white/20 text-white">
              Store #001 - Downtown
            </Badge>
            
            {/* Notifications Button */}
            <Dialog open={notificationsOpen} onOpenChange={setNotificationsOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-white/20 relative"
                  onClick={handleNotificationClick}
                >
                  <Bell className="h-4 w-4" />
                  {notifications.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500">
                      {notifications.length}
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Notifications</DialogTitle>
                  <DialogDescription>
                    Recent pharmacy notifications and alerts
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>

            {/* Settings Button */}
            <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-white/20"
                  onClick={handleSettingsClick}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Pharmacy Settings</DialogTitle>
                  <DialogDescription>
                    Configure your pharmacy system settings
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex-col">
                      <Store className="h-6 w-6 mb-2" />
                      Store Settings
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Bell className="h-6 w-6 mb-2" />
                      Notifications
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <UserCog className="h-6 w-6 mb-2" />
                      User Management
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Settings className="h-6 w-6 mb-2" />
                      System Config
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleUserAction("Profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleUserAction("Settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleUserAction("Logout")} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PharmacyHeader;
