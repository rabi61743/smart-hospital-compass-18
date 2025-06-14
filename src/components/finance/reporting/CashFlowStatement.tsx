
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, ArrowUpCircle, ArrowDownCircle, DollarSign } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const CashFlowStatement = () => {
  const cashFlow = {
    operating: {
      netIncome: 520000,
      depreciation: 250000,
      accountsReceivableChange: -150000,
      inventoryChange: -50000,
      accountsPayableChange: 100000,
      total: 670000
    },
    investing: {
      equipmentPurchase: -800000,
      assetSale: 150000,
      total: -650000
    },
    financing: {
      loanProceeds: 500000,
      loanRepayment: -200000,
      dividendsPaid: -100000,
      total: 200000
    },
    netCashFlow: 220000,
    beginningCash: 5280000,
    endingCash: 5500000
  };

  const monthlyData = [
    { month: 'Jan', operating: 650000, investing: -200000, financing: 100000, net: 550000 },
    { month: 'Feb', operating: 720000, investing: -150000, financing: -50000, net: 520000 },
    { month: 'Mar', operating: 680000, investing: -300000, financing: 200000, net: 580000 },
    { month: 'Apr', operating: 750000, investing: -100000, financing: -80000, net: 570000 },
    { month: 'May', operating: 690000, investing: -250000, financing: 150000, net: 590000 },
    { month: 'Jun', operating: 670000, investing: -650000, financing: 200000, net: 220000 }
  ];

  const chartConfig = {
    operating: { label: "Operating", color: "#2563eb" },
    investing: { label: "Investing", color: "#dc2626" },
    financing: { label: "Financing", color: "#16a34a" },
    net: { label: "Net Cash Flow", color: "#9333ea" }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-lg font-semibold">Cash Flow Statement</h4>
          <p className="text-sm text-muted-foreground">For the month ending June 30, 2024</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Cash Flow
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cash Flow Details */}
        <Card>
          <CardHeader>
            <CardTitle>Cash Flow Analysis</CardTitle>
            <CardDescription>Breakdown by activity type</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Operating Activities */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h5 className="font-semibold flex items-center gap-2">
                  <ArrowUpCircle className="h-4 w-4 text-green-600" />
                  Operating Activities
                </h5>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  +₹{cashFlow.operating.total.toLocaleString()}
                </Badge>
              </div>
              <div className="space-y-2 ml-6">
                <div className="flex justify-between">
                  <span>Net Income</span>
                  <span className="font-medium">₹{cashFlow.operating.netIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Depreciation</span>
                  <span className="font-medium">₹{cashFlow.operating.depreciation.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Accounts Receivable Change</span>
                  <span className="font-medium text-red-600">(₹{Math.abs(cashFlow.operating.accountsReceivableChange).toLocaleString()})</span>
                </div>
                <div className="flex justify-between">
                  <span>Inventory Change</span>
                  <span className="font-medium text-red-600">(₹{Math.abs(cashFlow.operating.inventoryChange).toLocaleString()})</span>
                </div>
                <div className="flex justify-between">
                  <span>Accounts Payable Change</span>
                  <span className="font-medium">₹{cashFlow.operating.accountsPayableChange.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Net Operating Cash Flow</span>
                  <span className="text-green-600">₹{cashFlow.operating.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Investing Activities */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h5 className="font-semibold flex items-center gap-2">
                  <ArrowDownCircle className="h-4 w-4 text-red-600" />
                  Investing Activities
                </h5>
                <Badge variant="destructive">
                  (₹{Math.abs(cashFlow.investing.total).toLocaleString()})
                </Badge>
              </div>
              <div className="space-y-2 ml-6">
                <div className="flex justify-between">
                  <span>Equipment Purchase</span>
                  <span className="font-medium text-red-600">(₹{Math.abs(cashFlow.investing.equipmentPurchase).toLocaleString()})</span>
                </div>
                <div className="flex justify-between">
                  <span>Asset Sale</span>
                  <span className="font-medium">₹{cashFlow.investing.assetSale.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Net Investing Cash Flow</span>
                  <span className="text-red-600">(₹{Math.abs(cashFlow.investing.total).toLocaleString()})</span>
                </div>
              </div>
            </div>

            {/* Financing Activities */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h5 className="font-semibold flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-blue-600" />
                  Financing Activities
                </h5>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  +₹{cashFlow.financing.total.toLocaleString()}
                </Badge>
              </div>
              <div className="space-y-2 ml-6">
                <div className="flex justify-between">
                  <span>Loan Proceeds</span>
                  <span className="font-medium">₹{cashFlow.financing.loanProceeds.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Loan Repayment</span>
                  <span className="font-medium text-red-600">(₹{Math.abs(cashFlow.financing.loanRepayment).toLocaleString()})</span>
                </div>
                <div className="flex justify-between">
                  <span>Dividends Paid</span>
                  <span className="font-medium text-red-600">(₹{Math.abs(cashFlow.financing.dividendsPaid).toLocaleString()})</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Net Financing Cash Flow</span>
                  <span className="text-blue-600">₹{cashFlow.financing.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Net Cash Flow */}
            <div className="bg-green-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span>Beginning Cash Balance</span>
                <span className="font-medium">₹{cashFlow.beginningCash.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Net Cash Flow</span>
                <span className="font-medium">₹{cashFlow.netCashFlow.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t pt-2">
                <span>Ending Cash Balance</span>
                <span className="text-green-600">₹{cashFlow.endingCash.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cash Flow Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Cash Flow Trends</CardTitle>
            <CardDescription>6-month cash flow analysis by activity</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `₹${(Number(value) / 100000).toFixed(0)}L`} />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value, name) => [
                      `₹${(Number(value) / 100000).toFixed(1)}L`,
                      name
                    ]}
                  />
                  <Bar dataKey="operating" fill="var(--color-operating)" name="Operating" />
                  <Bar dataKey="investing" fill="var(--color-investing)" name="Investing" />
                  <Bar dataKey="financing" fill="var(--color-financing)" name="Financing" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CashFlowStatement;
