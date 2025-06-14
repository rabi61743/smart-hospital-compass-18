
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Calendar, Percent, DollarSign } from "lucide-react";

const PayrollSettingsTab = () => {
  return (
    <div className="space-y-6">
      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            General Settings
          </CardTitle>
          <CardDescription>Configure basic payroll system settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" defaultValue="HealthCare Solutions Ltd." />
            </div>
            <div>
              <Label htmlFor="pay-frequency">Pay Frequency</Label>
              <Select defaultValue="monthly">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pay-date">Default Pay Date</Label>
              <Select defaultValue="last-day">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-day">Last Day of Month</SelectItem>
                  <SelectItem value="15th">15th of Month</SelectItem>
                  <SelectItem value="1st">1st of Month</SelectItem>
                  <SelectItem value="custom">Custom Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select defaultValue="inr">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inr">INR (₹)</SelectItem>
                  <SelectItem value="usd">USD ($)</SelectItem>
                  <SelectItem value="eur">EUR (€)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tax & Deduction Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Percent className="h-5 w-5" />
            Tax & Deduction Settings
          </CardTitle>
          <CardDescription>Configure tax rates and standard deductions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="income-tax">Income Tax Rate (%)</Label>
              <Input id="income-tax" type="number" defaultValue="10" />
            </div>
            <div>
              <Label htmlFor="pf-rate">Provident Fund Rate (%)</Label>
              <Input id="pf-rate" type="number" defaultValue="12" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="esi-rate">ESI Rate (%)</Label>
              <Input id="esi-rate" type="number" defaultValue="0.75" />
            </div>
            <div>
              <Label htmlFor="professional-tax">Professional Tax (₹)</Label>
              <Input id="professional-tax" type="number" defaultValue="200" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Allowances Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Standard Allowances
          </CardTitle>
          <CardDescription>Configure standard allowances for all employees</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="hra-rate">HRA Rate (% of Basic)</Label>
              <Input id="hra-rate" type="number" defaultValue="40" />
            </div>
            <div>
              <Label htmlFor="da-rate">Dearness Allowance (% of Basic)</Label>
              <Input id="da-rate" type="number" defaultValue="15" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="medical-allowance">Medical Allowance (₹)</Label>
              <Input id="medical-allowance" type="number" defaultValue="1250" />
            </div>
            <div>
              <Label htmlFor="transport-allowance">Transport Allowance (₹)</Label>
              <Input id="transport-allowance" type="number" defaultValue="1600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Automation Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Automation Settings</CardTitle>
          <CardDescription>Configure automated payroll processing features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-process">Auto-process Payroll</Label>
              <p className="text-sm text-muted-foreground">Automatically process payroll on the set date</p>
            </div>
            <Switch id="auto-process" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-payslips">Email Payslips</Label>
              <p className="text-sm text-muted-foreground">Automatically email payslips to employees</p>
            </div>
            <Switch id="email-payslips" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="backup-data">Auto Backup</Label>
              <p className="text-sm text-muted-foreground">Automatically backup payroll data</p>
            </div>
            <Switch id="backup-data" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Settings</Button>
      </div>
    </div>
  );
};

export default PayrollSettingsTab;
