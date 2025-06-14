
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, FileText, Shield, Plus, Upload } from "lucide-react";
import InsuranceCardsTab from "./insurance/InsuranceCardsTab";
import ClaimsTrackingTab from "./insurance/ClaimsTrackingTab";
import PreAuthorizationsTab from "./insurance/PreAuthorizationsTab";

const InsuranceManagement = () => {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Policies</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Claims</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <FileText className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">YTD Deductible</p>
                <p className="text-2xl font-bold">₹15,000</p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="cards" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cards">Insurance Cards</TabsTrigger>
          <TabsTrigger value="claims">Claims Tracking</TabsTrigger>
          <TabsTrigger value="preauth">Pre-Authorizations</TabsTrigger>
        </TabsList>

        <TabsContent value="cards" className="space-y-4">
          <InsuranceCardsTab />
        </TabsContent>

        <TabsContent value="claims" className="space-y-4">
          <ClaimsTrackingTab />
        </TabsContent>

        <TabsContent value="preauth" className="space-y-4">
          <PreAuthorizationsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InsuranceManagement;
