import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Hospital, 
  LayoutDashboard, 
  Stethoscope, 
  Pill, 
  DollarSign, 
  Receipt, 
  Users, 
  UserCheck, 
  TrendingUp, 
  FileText, 
  Shield,
  FlaskConical,
  UserPlus,
  Bell,
  Settings
} from "lucide-react";

const navigationSections = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        description: "Main system dashboard"
      },
      {
        title: "Home",
        url: "/",
        icon: Hospital,
        description: "Hospital home page"
      },
      {
        title: "Admin Portal",
        url: "/admin-dashboard",
        icon: Shield,
        description: "Super admin control center"
      },
    ]
  },
  {
    title: "Clinical",
    items: [
      {
        title: "Doctor Portal",
        url: "/doctor-dashboard",
        icon: Stethoscope,
        description: "Doctor management system"
      },
      {
        title: "Pharmacy",
        url: "/pharmacy-dashboard",
        icon: Pill,
        description: "Pharmacy operations"
      },
      {
        title: "Lab Results",
        url: "/lab-results",
        icon: FlaskConical,
        description: "Laboratory management"
      },
    ]
  },
  {
    title: "Patient Care",
    items: [
      {
        title: "Patient Portal",
        url: "/patient-portal",
        icon: UserCheck,
        description: "Patient self-service portal"
      },
      {
        title: "Patient Registration",
        url: "/patient-registration",
        icon: UserPlus,
        description: "New patient registration"
      },
      {
        title: "Patient History",
        url: "/patient-history",
        icon: FileText,
        description: "Patient medical history"
      },
      {
        title: "Prescriptions",
        url: "/prescription-management",
        icon: Pill,
        description: "Prescription management"
      },
    ]
  },
  {
    title: "Financial",
    items: [
      {
        title: "Finance Dashboard",
        url: "/finance-dashboard",
        icon: DollarSign,
        description: "Financial overview and analytics"
      },
      {
        title: "Billing",
        url: "/billing-dashboard",
        icon: Receipt,
        description: "Billing and invoicing"
      },
      {
        title: "Commission Tracking",
        url: "/commission-tracking",
        icon: TrendingUp,
        description: "Commission management"
      },
    ]
  },
  {
    title: "HR & Operations",
    items: [
      {
        title: "Payroll",
        url: "/payroll-dashboard",
        icon: Users,
        description: "Payroll management system"
      },
      {
        title: "Performance",
        url: "/performance-dashboard",
        icon: TrendingUp,
        description: "Performance management"
      },
      {
        title: "Audit & Records",
        url: "/audit-dashboard",
        icon: Shield,
        description: "Audit and compliance"
      },
    ]
  },
];

export function HorizontalNavbar() {
  const location = useLocation();

  return (
    <div className="w-full bg-white/95 backdrop-blur-sm border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Hospital className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-gray-900">MediFlow</span>
              <Badge variant="secondary" className="ml-2 text-xs">HMS</Badge>
            </div>
          </Link>

          {/* Navigation Menu */}
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-1">
              {navigationSections.map((section) => (
                <NavigationMenuItem key={section.title}>
                  <NavigationMenuTrigger className="text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
                    {section.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-6 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {section.items.map((item) => (
                        <Link
                          key={item.title}
                          to={item.url}
                          className={`group grid h-auto w-full items-center justify-start gap-1 rounded-lg bg-white p-4 text-sm font-medium transition-all hover:bg-blue-50 hover:shadow-md focus:bg-blue-50 focus:shadow-md focus:outline-none border border-transparent hover:border-blue-200 ${
                            location.pathname === item.url ? 'bg-blue-50 border-blue-200 shadow-sm' : ''
                          }`}
                        >
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`p-2 rounded-md ${location.pathname === item.url ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 group-hover:bg-blue-600 group-hover:text-white'} transition-colors`}>
                              <item.icon className="h-4 w-4" />
                            </div>
                            <div className="text-sm font-semibold leading-none text-gray-900">
                              {item.title}
                            </div>
                          </div>
                          <div className="line-clamp-2 text-xs leading-relaxed text-muted-foreground pl-11">
                            {item.description}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2 pl-3 border-l">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/api/placeholder/32/32" alt="Admin" />
                <AvatarFallback className="bg-blue-600 text-white text-sm">AD</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <span className="text-sm font-medium text-gray-900">Admin User</span>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
