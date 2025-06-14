
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Settings, Plus, Edit, Trash2, Save } from "lucide-react";
import { TaxConfiguration } from '@/types/taxManagement';
import { useToast } from "@/hooks/use-toast";

const TaxConfigurationTab = () => {
  const { toast } = useToast();
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Mock tax configurations
  const [taxConfigs, setTaxConfigs] = useState<TaxConfiguration[]>([
    {
      id: 'TC001',
      taxType: 'income_tax',
      rate: 0.10,
      minThreshold: 250000,
      maxThreshold: 500000,
      isPercentage: true,
      isActive: true,
      effectiveFrom: '2024-04-01',
      effectiveTo: '2025-03-31'
    },
    {
      id: 'TC002',
      taxType: 'pf',
      rate: 0.12,
      minThreshold: 0,
      maxThreshold: 15000,
      isPercentage: true,
      isActive: true,
      effectiveFrom: '2024-04-01'
    },
    {
      id: 'TC003',
      taxType: 'esi',
      rate: 0.0075,
      minThreshold: 0,
      maxThreshold: 21000,
      isPercentage: true,
      isActive: true,
      effectiveFrom: '2024-04-01'
    },
    {
      id: 'TC004',
      taxType: 'professional_tax',
      rate: 200,
      minThreshold: 15000,
      isPercentage: false,
      isActive: true,
      effectiveFrom: '2024-04-01'
    }
  ]);

  const [newConfig, setNewConfig] = useState<Partial<TaxConfiguration>>({
    taxType: 'income_tax',
    rate: 0,
    isPercentage: true,
    isActive: true,
    effectiveFrom: new Date().toISOString().split('T')[0]
  });

  const handleSaveNew = () => {
    if (!newConfig.taxType || !newConfig.rate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const config: TaxConfiguration = {
      id: `TC${String(taxConfigs.length + 1).padStart(3, '0')}`,
      taxType: newConfig.taxType as TaxConfiguration['taxType'],
      rate: newConfig.rate,
      minThreshold: newConfig.minThreshold,
      maxThreshold: newConfig.maxThreshold,
      isPercentage: newConfig.isPercentage || true,
      isActive: newConfig.isActive || true,
      effectiveFrom: newConfig.effectiveFrom || new Date().toISOString().split('T')[0],
      effectiveTo: newConfig.effectiveTo
    };

    setTaxConfigs([...taxConfigs, config]);
    setIsAddingNew(false);
    setNewConfig({
      taxType: 'income_tax',
      rate: 0,
      isPercentage: true,
      isActive: true,
      effectiveFrom: new Date().toISOString().split('T')[0]
    });

    toast({
      title: "Success",
      description: "Tax configuration added successfully",
    });
  };

  const toggleConfigStatus = (id: string) => {
    setTaxConfigs(configs => 
      configs.map(config => 
        config.id === id 
          ? { ...config, isActive: !config.isActive }
          : config
      )
    );
  };

  const getTaxTypeLabel = (type: TaxConfiguration['taxType']) => {
    switch (type) {
      case 'income_tax': return 'Income Tax';
      case 'pf': return 'Provident Fund';
      case 'esi': return 'ESI';
      case 'professional_tax': return 'Professional Tax';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      {/* Configuration Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Tax Configuration Settings
          </CardTitle>
          <CardDescription>
            Configure tax rates, thresholds, and calculation parameters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setIsAddingNew(true)} disabled={isAddingNew}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Tax Configuration
          </Button>
        </CardContent>
      </Card>

      {/* Add New Configuration */}
      {isAddingNew && (
        <Card>
          <CardHeader>
            <CardTitle>New Tax Configuration</CardTitle>
            <CardDescription>Set up a new tax configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="taxType">Tax Type</Label>
                <Select 
                  value={newConfig.taxType} 
                  onValueChange={(value) => setNewConfig({...newConfig, taxType: value as TaxConfiguration['taxType']})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income_tax">Income Tax</SelectItem>
                    <SelectItem value="pf">Provident Fund</SelectItem>
                    <SelectItem value="esi">ESI</SelectItem>
                    <SelectItem value="professional_tax">Professional Tax</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rate">Rate</Label>
                <Input
                  id="rate"
                  type="number"
                  step="0.01"
                  value={newConfig.rate || ''}
                  onChange={(e) => setNewConfig({...newConfig, rate: parseFloat(e.target.value)})}
                  placeholder="Enter rate"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="minThreshold">Minimum Threshold</Label>
                <Input
                  id="minThreshold"
                  type="number"
                  value={newConfig.minThreshold || ''}
                  onChange={(e) => setNewConfig({...newConfig, minThreshold: parseFloat(e.target.value)})}
                  placeholder="Enter minimum threshold"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxThreshold">Maximum Threshold</Label>
                <Input
                  id="maxThreshold"
                  type="number"
                  value={newConfig.maxThreshold || ''}
                  onChange={(e) => setNewConfig({...newConfig, maxThreshold: parseFloat(e.target.value)})}
                  placeholder="Enter maximum threshold"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="effectiveFrom">Effective From</Label>
                <Input
                  id="effectiveFrom"
                  type="date"
                  value={newConfig.effectiveFrom || ''}
                  onChange={(e) => setNewConfig({...newConfig, effectiveFrom: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="effectiveTo">Effective To (Optional)</Label>
                <Input
                  id="effectiveTo"
                  type="date"
                  value={newConfig.effectiveTo || ''}
                  onChange={(e) => setNewConfig({...newConfig, effectiveTo: e.target.value})}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isPercentage"
                checked={newConfig.isPercentage}
                onCheckedChange={(checked) => setNewConfig({...newConfig, isPercentage: checked})}
              />
              <Label htmlFor="isPercentage">Rate is percentage</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={newConfig.isActive}
                onCheckedChange={(checked) => setNewConfig({...newConfig, isActive: checked})}
              />
              <Label htmlFor="isActive">Active configuration</Label>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSaveNew}>
                <Save className="h-4 w-4 mr-2" />
                Save Configuration
              </Button>
              <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Current Configurations */}
      <Card>
        <CardHeader>
          <CardTitle>Current Tax Configurations</CardTitle>
          <CardDescription>Manage existing tax configuration settings</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tax Type</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Min Threshold</TableHead>
                <TableHead>Max Threshold</TableHead>
                <TableHead>Effective Period</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taxConfigs.map((config) => (
                <TableRow key={config.id}>
                  <TableCell>
                    <div className="font-medium">{getTaxTypeLabel(config.taxType)}</div>
                  </TableCell>
                  <TableCell>
                    {config.isPercentage 
                      ? `${(config.rate * 100).toFixed(2)}%` 
                      : `₹${config.rate.toLocaleString()}`
                    }
                  </TableCell>
                  <TableCell>
                    {config.minThreshold ? `₹${config.minThreshold.toLocaleString()}` : 'No minimum'}
                  </TableCell>
                  <TableCell>
                    {config.maxThreshold ? `₹${config.maxThreshold.toLocaleString()}` : 'No maximum'}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>From: {new Date(config.effectiveFrom).toLocaleDateString()}</div>
                      {config.effectiveTo && (
                        <div>To: {new Date(config.effectiveTo).toLocaleDateString()}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={config.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {config.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleConfigStatus(config.id)}
                      >
                        {config.isActive ? 'Deactivate' : 'Activate'}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxConfigurationTab;
