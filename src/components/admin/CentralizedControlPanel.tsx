import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Monitor, 
  Users, 
  Shield, 
  Stethoscope,
  Pill,
  TestTube,
  DollarSign,
  UserCheck,
  TrendingUp,
  BarChart3,
  UserPlus,
  Clipboard,
  FileText,
  Database,
  Settings,
  Heart,
  Bell,
  Search,
  Headphones,
  RefreshCw
} from "lucide-react";

import AlertsSection from './control-panel/AlertsSection';
import SystemMetricsGrid from './control-panel/SystemMetricsGrid';
import QuickAccessModules from './control-panel/QuickAccessModules';
import SystemModulesOverview from './control-panel/SystemModulesOverview';
import PerformanceMetrics from './control-panel/PerformanceMetrics';

const CentralizedControlPanel = () => {
  const systemModules = [
    {
      id: 'patient-management',
      name: 'Patient Management',
      icon: Users,
      status: 'active',
      uptime: '99.9%',
      activeUsers: 342,
      lastUpdate: '2 minutes ago',
      version: 'v2.1.4',
      criticalAlerts: 0
    },
    {
      id: 'doctor-portal',
      name: 'Doctor Portal',
      icon: Stethoscope,
      status: 'active',
      uptime: '99.8%',
      activeUsers: 89,
      lastUpdate: '5 minutes ago',
      version: 'v2.0.8',
      criticalAlerts: 0
    },
    {
      id: 'pharmacy-system',
      name: 'Pharmacy System',
      icon: Pill,
      status: 'active',
      uptime: '99.5%',
      activeUsers: 45,
      lastUpdate: '1 minute ago',
      version: 'v1.9.2',
      criticalAlerts: 1
    },
    {
      id: 'laboratory-system',
      name: 'Laboratory System',
      icon: TestTube,
      status: 'active',
      uptime: '99.7%',
      activeUsers: 67,
      lastUpdate: '3 minutes ago',
      version: 'v2.2.1',
      criticalAlerts: 0
    },
    {
      id: 'billing-finance',
      name: 'Billing & Finance',
      icon: DollarSign,
      status: 'active',
      uptime: '99.9%',
      activeUsers: 23,
      lastUpdate: '1 minute ago',
      version: 'v3.0.1',
      criticalAlerts: 0
    },
    {
      id: 'payroll-hr',
      name: 'Payroll & HR',
      icon: UserCheck,
      status: 'maintenance',
      uptime: '95.2%',
      activeUsers: 156,
      lastUpdate: '30 minutes ago',
      version: 'v1.8.5',
      criticalAlerts: 2
    }
  ];

  const systemMetrics = {
    totalUsers: 1247,
    activeUsers: 847,
    systemUptime: 99.8,
    dataStorage: 78,
    networkLatency: 45,
    cpuUsage: 34,
    memoryUsage: 67,
    diskUsage: 45
  };

  const criticalAlerts = [
    { 
      id: 1, 
      module: 'Pharmacy System', 
      message: 'High medication inventory threshold reached', 
      severity: 'warning',
      time: '5 minutes ago'
    },
    { 
      id: 2, 
      module: 'Payroll System', 
      message: 'Maintenance window scheduled for tonight', 
      severity: 'info',
      time: '1 hour ago'
    },
    { 
      id: 3, 
      module: 'Network Infrastructure', 
      message: 'Elevated response times detected', 
      severity: 'warning',
      time: '15 minutes ago'
    }
  ];

  const quickAccessModules = [
    {
      name: 'Patient Management',
      description: 'Manage patient records and appointments',
      icon: Users,
      path: '/patient-portal',
      color: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
      category: 'Clinical'
    },
    {
      name: 'Doctor Portal',
      description: 'Medical staff interface and tools',
      icon: Stethoscope,
      path: '/doctor-dashboard',
      color: 'bg-green-100 text-green-700 hover:bg-green-200',
      category: 'Clinical'
    },
    {
      name: 'Pharmacy System',
      description: 'Drug inventory and prescriptions',
      icon: Pill,
      path: '/pharmacy-dashboard',
      color: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
      category: 'Clinical'
    },
    {
      name: 'Laboratory',
      description: 'Lab tests and results management',
      icon: TestTube,
      path: '/lab-results',
      color: 'bg-orange-100 text-orange-700 hover:bg-orange-200',
      category: 'Clinical'
    },
    {
      name: 'Finance & Billing',
      description: 'Financial operations and billing',
      icon: DollarSign,
      path: '/finance-dashboard',
      color: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200',
      category: 'Financial'
    },
    {
      name: 'Commission Tracking',
      description: 'Track and manage commissions',
      icon: TrendingUp,
      path: '/commission-tracking',
      color: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
      category: 'Financial'
    },
    {
      name: 'Payroll & HR',
      description: 'Employee management and payroll',
      icon: UserCheck,
      path: '/payroll-dashboard',
      color: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
      category: 'Operations'
    },
    {
      name: 'Performance Tracking',
      description: 'Monitor staff performance',
      icon: BarChart3,
      path: '/performance-dashboard',
      color: 'bg-pink-100 text-pink-700 hover:bg-pink-200',
      category: 'Operations'
    },
    {
      name: 'Audit & Compliance',
      description: 'Security and regulatory compliance',
      icon: Shield,
      path: '/audit-dashboard',
      color: 'bg-red-100 text-red-700 hover:bg-red-200',
      category: 'Operations'
    },
    {
      name: 'Patient Registration',
      description: 'Register new patients',
      icon: UserPlus,
      path: '/patient-registration',
      color: 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200',
      category: 'Clinical'
    },
    {
      name: 'Prescription Management',
      description: 'Manage prescriptions and medications',
      icon: Clipboard,
      path: '/prescription-management',
      color: 'bg-teal-100 text-teal-700 hover:bg-teal-200',
      category: 'Clinical'
    },
    {
      name: 'Patient History',
      description: 'View patient medical history',
      icon: FileText,
      path: '/patient-history',
      color: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
      category: 'Clinical'
    }
  ];

  const systemTools = [
    {
      name: 'User Management',
      description: 'Manage system users and permissions',
      icon: Users,
      action: () => alert('Opening User Management...'),
      color: 'bg-blue-100 text-blue-700 hover:bg-blue-200'
    },
    {
      name: 'Backup Systems',
      description: 'Database backup and recovery',
      icon: Database,
      action: () => alert('Initiating system backup...'),
      color: 'bg-green-100 text-green-700 hover:bg-green-200'
    },
    {
      name: 'Security Scan',
      description: 'Run comprehensive security audit',
      icon: Shield,
      action: () => alert('Starting security scan...'),
      color: 'bg-red-100 text-red-700 hover:bg-red-200'
    },
    {
      name: 'System Monitor',
      description: 'Real-time system performance',
      icon: Monitor,
      action: () => alert('Opening system monitor...'),
      color: 'bg-purple-100 text-purple-700 hover:bg-purple-200'
    },
    {
      name: 'Global Settings',
      description: 'Configure system-wide settings',
      icon: Settings,
      action: () => alert('Opening global settings...'),
      color: 'bg-orange-100 text-orange-700 hover:bg-orange-200'
    },
    {
      name: 'Health Check',
      description: 'Comprehensive system health check',
      icon: Heart,
      action: () => alert('Running health check...'),
      color: 'bg-pink-100 text-pink-700 hover:bg-pink-200'
    },
    {
      name: 'Reports Generator',
      description: 'Generate system reports',
      icon: FileText,
      action: () => alert('Opening reports generator...'),
      color: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
    },
    {
      name: 'Notification Center',
      description: 'Manage system notifications',
      icon: Bell,
      action: () => alert('Opening notification center...'),
      color: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
    },
    {
      name: 'System Search',
      description: 'Search across all modules',
      icon: Search,
      action: () => alert('Opening system search...'),
      color: 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'
    },
    {
      name: 'Support Center',
      description: 'Get help and documentation',
      icon: Headphones,
      action: () => alert('Opening support center...'),
      color: 'bg-teal-100 text-teal-700 hover:bg-teal-200'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Centralized Control Panel
              </CardTitle>
              <CardDescription>
                Real-time overview and control of all hospital management systems
              </CardDescription>
            </div>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh All
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Critical Alerts */}
      <AlertsSection alerts={criticalAlerts} />

      {/* System Overview Metrics */}
      <SystemMetricsGrid metrics={systemMetrics} />

      {/* Quick Access to All Modules */}
      <QuickAccessModules modules={quickAccessModules} tools={systemTools} />

      {/* System Modules Status */}
      <SystemModulesOverview modules={systemModules} />

      {/* Performance Metrics */}
      <PerformanceMetrics 
        cpuUsage={systemMetrics.cpuUsage}
        memoryUsage={systemMetrics.memoryUsage}
        diskUsage={systemMetrics.diskUsage}
      />
    </div>
  );
};

export default CentralizedControlPanel;
