
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, TrendingUp, TrendingDown } from "lucide-react";

const ProfitLossStatement = () => {
  const plData = {
    revenue: {
      opd: 1850000,
      surgery: 1480000,
      laboratory: 740000,
      pharmacy: 590000,
      emergency: 340000,
      total: 5000000
    },
    expenses: {
      salaries: 2050000,
      medicalSupplies: 850000,
      equipment: 280000,
      utilities: 170000,
      rent: 300000,
      insurance: 120000,
      marketing: 80000,
      other: 150000,
      total: 4000000
    },
    grossProfit: 1000000,
    operatingExpenses: 500000,
    operatingIncome: 500000,
    otherIncome: 50000,
    otherExpenses: 30000,
    netIncome: 520000
  };

  const marginPercent = ((plData.netIncome / plData.revenue.total) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-lg font-semibold">Profit & Loss Statement</h4>
          <p className="text-sm text-muted-foreground">For the month ending June 30, 2024</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export P&L
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Income Statement</CardTitle>
          <CardDescription>Detailed breakdown of revenue and expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Revenue Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h5 className="font-semibold text-lg">Revenue</h5>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.5%
                </Badge>
              </div>
              <div className="space-y-2 ml-4">
                <div className="flex justify-between">
                  <span>OPD Consultations</span>
                  <span className="font-medium">₹{plData.revenue.opd.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Surgery Revenue</span>
                  <span className="font-medium">₹{plData.revenue.surgery.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Laboratory Services</span>
                  <span className="font-medium">₹{plData.revenue.laboratory.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pharmacy Sales</span>
                  <span className="font-medium">₹{plData.revenue.pharmacy.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Emergency Services</span>
                  <span className="font-medium">₹{plData.revenue.emergency.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total Revenue</span>
                  <span>₹{plData.revenue.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Cost of Goods Sold */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h5 className="font-semibold text-lg">Direct Costs</h5>
                <Badge variant="outline">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  -2.1%
                </Badge>
              </div>
              <div className="space-y-2 ml-4">
                <div className="flex justify-between">
                  <span>Medical Supplies</span>
                  <span className="font-medium">₹{plData.expenses.medicalSupplies.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Equipment Maintenance</span>
                  <span className="font-medium">₹{plData.expenses.equipment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Gross Profit</span>
                  <span className="text-green-600">₹{plData.grossProfit.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Operating Expenses */}
            <div className="space-y-4">
              <h5 className="font-semibold text-lg border-b pb-2">Operating Expenses</h5>
              <div className="space-y-2 ml-4">
                <div className="flex justify-between">
                  <span>Staff Salaries & Benefits</span>
                  <span className="font-medium">₹{plData.expenses.salaries.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rent & Utilities</span>
                  <span className="font-medium">₹{(plData.expenses.rent + plData.expenses.utilities).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Insurance</span>
                  <span className="font-medium">₹{plData.expenses.insurance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Marketing & Advertising</span>
                  <span className="font-medium">₹{plData.expenses.marketing.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Other Operating Expenses</span>
                  <span className="font-medium">₹{plData.expenses.other.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Operating Income</span>
                  <span className="text-blue-600">₹{plData.operatingIncome.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Net Income */}
            <div className="space-y-4 bg-green-50 p-4 rounded-lg">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Other Income</span>
                  <span className="font-medium">₹{plData.otherIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Other Expenses</span>
                  <span className="font-medium">₹{plData.otherExpenses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t pt-3">
                  <span>Net Income</span>
                  <span className="text-green-600">₹{plData.netIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Profit Margin</span>
                  <span className="font-medium">{marginPercent}%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfitLossStatement;
