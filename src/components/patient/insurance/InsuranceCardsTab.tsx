
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, Plus, Upload, Edit, Trash2, Camera } from "lucide-react";
import { useForm } from "react-hook-form";
import { InsuranceCard } from "./types";

const InsuranceCardsTab = () => {
  const [cards, setCards] = useState<InsuranceCard[]>([
    {
      id: '1',
      insuranceProvider: 'Star Health Insurance',
      policyNumber: 'SH123456789',
      groupNumber: 'GRP001',
      memberName: 'John Doe',
      memberId: 'MEM123456',
      effectiveDate: '2024-01-01',
      expirationDate: '2024-12-31',
      copay: 500,
      deductible: 10000,
      isPrimary: true,
      status: 'active'
    },
    {
      id: '2',
      insuranceProvider: 'HDFC ERGO Health',
      policyNumber: 'HE987654321',
      memberName: 'John Doe',
      memberId: 'MEM654321',
      effectiveDate: '2024-01-01',
      expirationDate: '2024-12-31',
      isPrimary: false,
      status: 'active'
    }
  ]);

  const form = useForm();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Insurance Cards</h3>
          <p className="text-sm text-muted-foreground">Manage your insurance cards and policy information</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Insurance Card
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Insurance Card</DialogTitle>
              <DialogDescription>
                Upload your insurance card and enter policy details
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    name="insuranceProvider"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Insurance Provider</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Star Health Insurance" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="policyNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Policy Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Policy number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="memberName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Member Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="memberId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Member ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Member ID" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <Label>Upload Insurance Card Images</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-dashed border-2">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <Camera className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm font-medium">Front of Card</p>
                          <p className="text-xs text-muted-foreground mb-4">Upload front side</p>
                          <Button variant="outline" size="sm">
                            <Upload className="w-3 h-3 mr-1" />
                            Choose File
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-dashed border-2">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <Camera className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm font-medium">Back of Card</p>
                          <p className="text-xs text-muted-foreground mb-4">Upload back side</p>
                          <Button variant="outline" size="sm">
                            <Upload className="w-3 h-3 mr-1" />
                            Choose File
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button type="submit">Save Insurance Card</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cards.map((card) => (
          <Card key={card.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <CardTitle className="text-lg">{card.insuranceProvider}</CardTitle>
                  {card.isPrimary && (
                    <Badge variant="default">Primary</Badge>
                  )}
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Badge className={getStatusColor(card.status)}>
                {card.status.toUpperCase()}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Policy Number</p>
                  <p className="font-medium">{card.policyNumber}</p>
                </div>
                {card.groupNumber && (
                  <div>
                    <p className="text-muted-foreground">Group Number</p>
                    <p className="font-medium">{card.groupNumber}</p>
                  </div>
                )}
                <div>
                  <p className="text-muted-foreground">Member Name</p>
                  <p className="font-medium">{card.memberName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Member ID</p>
                  <p className="font-medium">{card.memberId}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Effective Date</p>
                  <p className="font-medium">{new Date(card.effectiveDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Expiration Date</p>
                  <p className="font-medium">{new Date(card.expirationDate).toLocaleDateString()}</p>
                </div>
                {card.copay && (
                  <div>
                    <p className="text-muted-foreground">Copay</p>
                    <p className="font-medium">₹{card.copay}</p>
                  </div>
                )}
                {card.deductible && (
                  <div>
                    <p className="text-muted-foreground">Deductible</p>
                    <p className="font-medium">₹{card.deductible.toLocaleString()}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InsuranceCardsTab;
