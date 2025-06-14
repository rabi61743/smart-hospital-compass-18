
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Building, DollarSign } from "lucide-react";

const BalanceSheet = () => {
  const balanceSheet = {
    assets: {
      current: {
        cash: 5500000,
        accountsReceivable: 1200000,
        inventory: 800000,
        prepaidExpenses: 150000,
        total: 7650000
      },
      nonCurrent: {
        equipment: 15000000,
        building: 8000000,
        land: 5000000,
        accumulatedDepreciation: -3000000,
        total: 25000000
      },
      totalAssets: 32650000
    },
    liabilities: {
      current: {
        accountsPayable: 900000,
        shortTermLoans: 500000,
        accruedExpenses: 300000,
        total: 1700000
      },
      longTerm: {
        longTermLoans: 8000000,
        bonds: 2000000,
        total: 10000000
      },
      totalLiabilities: 11700000
    },
    equity: {
      capital: 15000000,
      retainedEarnings: 5950000,
      totalEquity: 20950000
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-lg font-semibold">Balance Sheet</h4>
          <p className="text-sm text-muted-foreground">As of June 30, 2024</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Balance Sheet
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assets */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Assets
            </CardTitle>
            <CardDescription>Total assets: ₹{balanceSheet.assets.totalAssets.toLocaleString()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Assets */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h5 className="font-semibold">Current Assets</h5>
                <Badge variant="secondary">Liquid</Badge>
              </div>
              <div className="space-y-2 ml-4">
                <div className="flex justify-between">
                  <span>Cash & Cash Equivalents</span>
                  <span className="font-medium">₹{balanceSheet.assets.current.cash.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Accounts Receivable</span>
                  <span className="font-medium">₹{balanceSheet.assets.current.accountsReceivable.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Inventory</span>
                  <span className="font-medium">₹{balanceSheet.assets.current.inventory.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Prepaid Expenses</span>
                  <span className="font-medium">₹{balanceSheet.assets.current.prepaidExpenses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Total Current Assets</span>
                  <span>₹{balanceSheet.assets.current.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Non-Current Assets */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h5 className="font-semibold">Non-Current Assets</h5>
                <Badge variant="outline">Fixed</Badge>
              </div>
              <div className="space-y-2 ml-4">
                <div className="flex justify-between">
                  <span>Medical Equipment</span>
                  <span className="font-medium">₹{balanceSheet.assets.nonCurrent.equipment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Building</span>
                  <span className="font-medium">₹{balanceSheet.assets.nonCurrent.building.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Land</span>
                  <span className="font-medium">₹{balanceSheet.assets.nonCurrent.land.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>Less: Accumulated Depreciation</span>
                  <span className="font-medium">₹{Math.abs(balanceSheet.assets.nonCurrent.accumulatedDepreciation).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Total Non-Current Assets</span>
                  <span>₹{balanceSheet.assets.nonCurrent.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between text-xl font-bold">
                <span>TOTAL ASSETS</span>
                <span>₹{balanceSheet.assets.totalAssets.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liabilities & Equity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Liabilities & Equity
            </CardTitle>
            <CardDescription>Total: ₹{balanceSheet.assets.totalAssets.toLocaleString()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Liabilities */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h5 className="font-semibold">Current Liabilities</h5>
                <Badge variant="destructive">Due &lt; 1 Year</Badge>
              </div>
              <div className="space-y-2 ml-4">
                <div className="flex justify-between">
                  <span>Accounts Payable</span>
                  <span className="font-medium">₹{balanceSheet.liabilities.current.accountsPayable.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Short-term Loans</span>
                  <span className="font-medium">₹{balanceSheet.liabilities.current.shortTermLoans.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Accrued Expenses</span>
                  <span className="font-medium">₹{balanceSheet.liabilities.current.accruedExpenses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Total Current Liabilities</span>
                  <span>₹{balanceSheet.liabilities.current.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Long-term Liabilities */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h5 className="font-semibold">Long-term Liabilities</h5>
                <Badge variant="secondary">Due &gt; 1 Year</Badge>
              </div>
              <div className="space-y-2 ml-4">
                <div className="flex justify-between">
                  <span>Long-term Loans</span>
                  <span className="font-medium">₹{balanceSheet.liabilities.longTerm.longTermLoans.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bonds Payable</span>
                  <span className="font-medium">₹{balanceSheet.liabilities.longTerm.bonds.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Total Long-term Liabilities</span>
                  <span>₹{balanceSheet.liabilities.longTerm.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Owner's Equity */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h5 className="font-semibold">Owner's Equity</h5>
                <Badge variant="default" className="bg-green-100 text-green-800">68.5%</Badge>
              </div>
              <div className="space-y-2 ml-4">
                <div className="flex justify-between">
                  <span>Paid-in Capital</span>
                  <span className="font-medium">₹{balanceSheet.equity.capital.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Retained Earnings</span>
                  <span className="font-medium">₹{balanceSheet.equity.retainedEarnings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Total Equity</span>
                  <span>₹{balanceSheet.equity.totalEquity.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex justify-between text-xl font-bold">
                <span>TOTAL LIABILITIES & EQUITY</span>
                <span>₹{balanceSheet.assets.totalAssets.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BalanceSheet;
