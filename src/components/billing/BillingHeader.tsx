
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Bell, Settings, User, DollarSign } from "lucide-react";

const BillingHeader = () => {
  return (
    <Card className="border-0 rounded-none bg-gradient-to-r from-blue-600 to-green-600 text-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">Billing Management</h1>
                <p className="text-blue-100">Patient Billing, Insurance & Payments</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-white/20 text-white">
              <DollarSign className="h-3 w-3 mr-1" />
              Live Processing
            </Badge>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BillingHeader;
