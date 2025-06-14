
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
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

const navigationItems = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Home",
        url: "/",
        icon: Hospital,
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
      },
      {
        title: "Pharmacy",
        url: "/pharmacy-dashboard",
        icon: Pill,
      },
      {
        title: "Lab Results",
        url: "/lab-results",
        icon: FlaskConical,
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
      },
      {
        title: "Patient Registration",
        url: "/patient-registration",
        icon: UserPlus,
      },
      {
        title: "Patient History",
        url: "/patient-history",
        icon: FileText,
      },
      {
        title: "Prescriptions",
        url: "/prescription-management",
        icon: Pill,
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
      },
      {
        title: "Billing",
        url: "/billing-dashboard",
        icon: Receipt,
      },
      {
        title: "Commission Tracking",
        url: "/commission-tracking",
        icon: TrendingUp,
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
      },
      {
        title: "Performance",
        url: "/performance-dashboard",
        icon: TrendingUp,
      },
      {
        title: "Audit & Records",
        url: "/audit-dashboard",
        icon: Shield,
      },
    ]
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <Hospital className="h-6 w-6 text-blue-600" />
          <span className="text-lg font-bold text-gray-900">MediFlow HMS</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        {navigationItems.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                      <Link to={item.url} className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="text-xs text-gray-500">
          © 2024 MediFlow HMS
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
