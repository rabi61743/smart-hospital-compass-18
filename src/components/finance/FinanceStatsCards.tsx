
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard,
  PiggyBank,
  Target
} from "lucide-react";

const FinanceStatsCards = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "₹45.2L",
      change: "+12.5%",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Total Expenses",
      value: "₹32.8L",
      change: "+8.3%",
      trend: "up",
      icon: TrendingDown,
      color: "text-red-600"
    },
    {
      title: "Net Profit",
      value: "₹12.4L",
      change: "+18.7%",
      trend: "up",
      icon: DollarSign,
      color: "text-blue-600"
    },
    {
      title: "Outstanding AR",
      value: "₹8.6L",
      change: "-5.2%",
      trend: "down",
      icon: CreditCard,
      color: "text-orange-600"
    },
    {
      title: "Cash Flow",
      value: "₹15.8L",
      change: "+22.1%",
      trend: "up",
      icon: PiggyBank,
      color: "text-purple-600"
    },
    {
      title: "Profit Margin",
      value: "27.4%",
      change: "+3.2%",
      trend: "up",
      icon: Target,
      color: "text-cyan-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <IconComponent className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default FinanceStatsCards;
