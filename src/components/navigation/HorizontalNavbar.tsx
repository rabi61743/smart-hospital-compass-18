
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
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
  UserPlus
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
    <div className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Hospital className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-bold text-gray-900">MediFlow HMS</span>
          </div>

          {/* Navigation Menu */}
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-1">
              {navigationSections.map((section) => (
                <NavigationMenuItem key={section.title}>
                  <NavigationMenuTrigger className="text-sm font-medium px-3 py-2">
                    {section.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {section.items.map((item) => (
                        <Link
                          key={item.title}
                          to={item.url}
                          className={`group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 ${
                            location.pathname === item.url ? 'bg-accent text-accent-foreground' : ''
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <item.icon className="h-4 w-4" />
                            <div className="text-sm font-medium leading-none">
                              {item.title}
                            </div>
                          </div>
                          <div className="line-clamp-2 text-xs leading-snug text-muted-foreground">
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
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Admin User</span>
          </div>
        </div>
      </div>
    </div>
  );
}
