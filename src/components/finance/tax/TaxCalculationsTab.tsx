
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calculator, Plus, FileText } from "lucide-react";

const TaxCalculationsTab = () => {
  const [amount, setAmount] = useState('');
  const [taxRate, setTaxRate] = useState('18');
  const [calculationType, setCalculationType] = useState('exclusive');

  const calculateTax = () => {
    const baseAmount = parseFloat(amount) || 0;
    const rate = parseFloat(taxRate) || 0;
    
    if (calculationType === 'exclusive') {
      const taxAmount = (baseAmount * rate) / 100;
      return {
        baseAmount,
        taxAmount,
        totalAmount: baseAmount + taxAmount
      };
    } else {
      const baseAmountInclusive = baseAmount / (1 + rate / 100);
      const taxAmount = baseAmount - baseAmountInclusive;
      return {
        baseAmount: baseAmountInclusive,
        taxAmount,
        totalAmount: baseAmount
      };
    }
  };

  const result = calculateTax();

  const recentCalculations = [
    {
      description: "Emergency Department Services",
      baseAmount: 125000,
      taxRate: 18,
      taxAmount: 22500,
      totalAmount: 147500,
      date: "2024-06-15"
    },
    {
      description: "Pharmacy Sales",
      baseAmount: 85000,
      taxRate: 5,
      taxAmount: 4250,
      totalAmount: 89250,
      date: "2024-06-15"
    },
    {
      description: "Laboratory Tests",
      baseAmount: 65000,
      taxRate: 18,
      taxAmount: 11700,
      totalAmount: 76700,
      date: "2024-06-14"
    }
  ];

  const gstRates = [
    { category: "Essential Medical Services", rate: 0, description: "Basic healthcare, emergency services" },
    { category: "Medical Equipment", rate: 5, description: "Basic medical devices, medicines" },
    { category: "Hospital Room Charges", rate: 12, description: "AC room charges, amenities" },
    { category: "Diagnostic Services", rate: 18, description: "Lab tests, imaging, consultations" },
    { category: "Cosmetic Procedures", rate: 28, description: "Non-essential medical procedures" }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tax Calculator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              GST/VAT Calculator
            </CardTitle>
            <CardDescription>Calculate tax amounts for services and products</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tax-rate">Tax Rate (%)</Label>
              <Select value={taxRate} onValueChange={setTaxRate}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0% - Exempt</SelectItem>
                  <SelectItem value="5">5% - Essential Items</SelectItem>
                  <SelectItem value="12">12% - Standard Rate</SelectItem>
                  <SelectItem value="18">18% - Services</SelectItem>
                  <SelectItem value="28">28% - Luxury Items</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="calculation-type">Calculation Type</Label>
              <Select value={calculationType} onValueChange={setCalculationType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="exclusive">Tax Exclusive</SelectItem>
                  <SelectItem value="inclusive">Tax Inclusive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {amount && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span>Base Amount:</span>
                  <span className="font-medium">₹{result.baseAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax Amount ({taxRate}%):</span>
                  <span className="font-medium">₹{result.taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-2">
                  <span>Total Amount:</span>
                  <span>₹{result.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            )}

            <Button className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Save Calculation
            </Button>
          </CardContent>
        </Card>

        {/* GST Rate Guide */}
        <Card>
          <CardHeader>
            <CardTitle>GST Rate Guide</CardTitle>
            <CardDescription>Standard GST rates for healthcare services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {gstRates.map((rate, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{rate.category}</div>
                    <div className="text-sm text-muted-foreground">{rate.description}</div>
                  </div>
                  <Badge variant={rate.rate === 0 ? "secondary" : "outline"}>
                    {rate.rate}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Calculations */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Tax Calculations</CardTitle>
          <CardDescription>History of recent GST/VAT calculations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCalculations.map((calc, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">{calc.description}</div>
                    <div className="text-sm text-muted-foreground">{calc.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">₹{calc.totalAmount.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">
                    Tax: ₹{calc.taxAmount.toLocaleString()} ({calc.taxRate}%)
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxCalculationsTab;
