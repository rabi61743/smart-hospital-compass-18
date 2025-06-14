
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  AlertTriangle,
  IndianRupee,
  Users
} from "lucide-react";

const PharmacyStatsCards = () => {
  const stats = [
    {
      title: "Total Products",
      value: "2,847",
      change: "+12%",
      icon: Package,
      color: "text-blue-600"
    },
    {
      title: "Today's Sales",
      value: "₹45,280",
      change: "+8.2%",
      icon: ShoppingCart,
      color: "text-green-600"
    },
    {
      title: "Low Stock Items",
      value: "23",
      change: "-5 from yesterday",
      icon: AlertTriangle,
      color: "text-orange-600"
    },
    {
      title: "Monthly Revenue",
      value: "₹12.4L",
      change: "+15.3%",
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Customers Served",
      value: "156",
      change: "+22 today",
      icon: Users,
      color: "text-cyan-600"
    },
    {
      title: "Avg Transaction",
      value: "₹290",
      change: "+₹15",
      icon: IndianRupee,
      color: "text-emerald-600"
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
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default PharmacyStatsCards;
