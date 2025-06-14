
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, 
  Pill, 
  TestTube, 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Settings,
  Zap,
  Database,
  Wifi,
  WifiOff,
  RefreshCw,
  Activity
} from "lucide-react";

const IntegrationCapabilities = () => {
  const [refreshing, setRefreshing] = useState(false);

  // Mock integration status data
  const integrations = [
    {
      id: 'lab',
      name: 'Laboratory Systems',
      icon: TestTube,
      status: 'connected',
      description: 'Quest Diagnostics, LabCorp Integration',
      lastSync: '2 minutes ago',
      tests: 1247,
      pending: 23
    },
    {
      id: 'pharmacy',
      name: 'Pharmacy Systems',
      icon: Pill,
      status: 'connected',
      description: 'CVS, Walgreens, Apollo Pharmacy',
      lastSync: '5 minutes ago',
      prescriptions: 892,
      pending: 12
    },
    {
      id: 'insurance',
      name: 'Insurance Verification',
      icon: Shield,
      status: 'connected',
      description: 'HDFC ERGO, Star Health, ICICI Lombard',
      lastSync: '1 hour ago',
      verified: 156,
      pending: 8
    },
    {
      id: 'his',
      name: 'Hospital Information Systems',
      icon: Building2,
      status: 'partial',
      description: 'AIIMS, Apollo, Fortis Integration',
      lastSync: '30 minutes ago',
      records: 2847,
      pending: 45
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'partial': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'disconnected': return <WifiOff className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'disconnected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Integration Capabilities
              </CardTitle>
              <CardDescription>
                Manage integrations with external healthcare systems
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh All
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Integration Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {integrations.map((integration) => {
          const IconComponent = integration.icon;
          return (
            <Card key={integration.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <IconComponent className="h-5 w-5 text-blue-600" />
                    <h3 className="font-medium text-sm">{integration.name}</h3>
                  </div>
                  {getStatusIcon(integration.status)}
                </div>
                
                <p className="text-xs text-muted-foreground mb-3">
                  {integration.description}
                </p>
                
                <div className="space-y-2">
                  <Badge className={getStatusColor(integration.status)}>
                    {integration.status.toUpperCase()}
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    Last sync: {integration.lastSync}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detailed Integration Tabs */}
      <Tabs defaultValue="lab" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="lab">Laboratory</TabsTrigger>
          <TabsTrigger value="pharmacy">Pharmacy</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
          <TabsTrigger value="his">Hospital Systems</TabsTrigger>
        </TabsList>

        <TabsContent value="lab" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-5 w-5" />
                Laboratory System Integration
              </CardTitle>
              <CardDescription>
                Manage connections to laboratory systems for automated test ordering and result retrieval
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Database className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-medium text-blue-900 mb-1">Total Tests</h4>
                  <p className="text-2xl font-bold text-blue-600">1,247</p>
                  <p className="text-sm text-blue-700">This month</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <h4 className="font-medium text-yellow-900 mb-1">Pending Results</h4>
                  <p className="text-2xl font-bold text-yellow-600">23</p>
                  <p className="text-sm text-yellow-700">Awaiting results</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Wifi className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-medium text-green-900 mb-1">Connected Labs</h4>
                  <p className="text-2xl font-bold text-green-600">5</p>
                  <p className="text-sm text-green-700">Active integrations</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Connected Laboratory Partners</h4>
                {['Quest Diagnostics', 'LabCorp', 'SRL Diagnostics', 'Dr. Lal PathLabs', 'Metropolis Healthcare'].map((lab, index) => (
                  <div key={lab} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <TestTube className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">{lab}</p>
                        <p className="text-sm text-muted-foreground">
                          Last sync: {index === 0 ? '2 minutes ago' : `${(index + 1) * 5} minutes ago`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pharmacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-5 w-5" />
                Pharmacy System Integration
              </CardTitle>
              <CardDescription>
                Connect with pharmacy systems for e-prescriptions and medication management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Pill className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-medium text-purple-900 mb-1">Prescriptions Sent</h4>
                  <p className="text-2xl font-bold text-purple-600">892</p>
                  <p className="text-sm text-purple-700">This month</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <h4 className="font-medium text-orange-900 mb-1">Pending Fills</h4>
                  <p className="text-2xl font-bold text-orange-600">12</p>
                  <p className="text-sm text-orange-700">Awaiting fulfillment</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Building2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-medium text-green-900 mb-1">Partner Pharmacies</h4>
                  <p className="text-2xl font-bold text-green-600">8</p>
                  <p className="text-sm text-green-700">Active partners</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Connected Pharmacy Partners</h4>
                {['CVS Pharmacy', 'Walgreens', 'Apollo Pharmacy', 'MedPlus', 'Netmeds', '1mg'].map((pharmacy, index) => (
                  <div key={pharmacy} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Pill className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-medium">{pharmacy}</p>
                        <p className="text-sm text-muted-foreground">
                          E-prescription enabled • API v2.1
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-800">Connected</Badge>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insurance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Insurance Verification System
              </CardTitle>
              <CardDescription>
                Real-time insurance verification and claims processing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-medium text-green-900 mb-1">Verified Today</h4>
                  <p className="text-2xl font-bold text-green-600">156</p>
                  <p className="text-sm text-green-700">Insurance verifications</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <h4 className="font-medium text-yellow-900 mb-1">Pending Claims</h4>
                  <p className="text-2xl font-bold text-yellow-600">8</p>
                  <p className="text-sm text-yellow-700">Under review</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Activity className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-medium text-blue-900 mb-1">Success Rate</h4>
                  <p className="text-2xl font-bold text-blue-600">94.8%</p>
                  <p className="text-sm text-blue-700">Verification success</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Insurance Provider Integrations</h4>
                {[
                  { name: 'HDFC ERGO', status: 'Active', response: '1.2s' },
                  { name: 'Star Health', status: 'Active', response: '0.8s' },
                  { name: 'ICICI Lombard', status: 'Active', response: '1.5s' },
                  { name: 'Max Bupa', status: 'Maintenance', response: 'N/A' },
                  { name: 'Bajaj Allianz', status: 'Active', response: '1.1s' }
                ].map((provider) => (
                  <div key={provider.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">{provider.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Avg response: {provider.response}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={provider.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {provider.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="his" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Hospital Information Systems
              </CardTitle>
              <CardDescription>
                Integration with hospital EMR and patient management systems
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Database className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-medium text-blue-900 mb-1">Patient Records</h4>
                  <p className="text-2xl font-bold text-blue-600">2,847</p>
                  <p className="text-sm text-blue-700">Synchronized</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Activity className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-medium text-purple-900 mb-1">Real-time Updates</h4>
                  <p className="text-2xl font-bold text-purple-600">45</p>
                  <p className="text-sm text-purple-700">Pending sync</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Building2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-medium text-green-900 mb-1">Connected Hospitals</h4>
                  <p className="text-2xl font-bold text-green-600">12</p>
                  <p className="text-sm text-green-700">Active integrations</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Hospital System Integrations</h4>
                {[
                  { name: 'AIIMS Delhi', system: 'Epic EMR', status: 'Connected' },
                  { name: 'Apollo Hospitals', system: 'Cerner', status: 'Connected' },
                  { name: 'Fortis Healthcare', system: 'Allscripts', status: 'Partial' },
                  { name: 'Max Healthcare', system: 'Epic EMR', status: 'Connected' },
                  { name: 'Manipal Hospitals', system: 'Custom HIS', status: 'Connected' }
                ].map((hospital) => (
                  <div key={hospital.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Building2 className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">{hospital.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {hospital.system}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={hospital.status === 'Connected' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {hospital.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationCapabilities;
