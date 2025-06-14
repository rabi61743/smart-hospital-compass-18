
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, DollarSign, TrendingUp, AlertTriangle } from "lucide-react";
import CostCenterList from './CostCenterList';
import AddCostCenterDialog from './AddCostCenterDialog';

interface CostCenter {
  id: string;
  code: string;
  name: string;
  description: string;
  department: string;
  manager: string;
  budgetAllocated: number;
  budgetUsed: number;
  budgetRemaining: number;
  lastPeriodSpend: number;
  status: 'Active' | 'Inactive' | 'Suspended';
  createdDate: string;
  fiscalYear: string;
}

const CostCenterManagementTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showAddDialog, setShowAddDialog] = useState(false);

  const [costCenters, setCostCenters] = useState<CostCenter[]>([
    {
      id: 'CC001',
      code: 'CC-CARD-001',
      name: 'Cardiology Operations',
      description: 'Primary cost center for cardiology department operations',
      department: 'Cardiology',
      manager: 'Dr. Rajesh Kumar',
      budgetAllocated: 500000,
      budgetUsed: 342000,
      budgetRemaining: 158000,
      lastPeriodSpend: 38000,
      status: 'Active',
      createdDate: '2024-01-15',
      fiscalYear: '2024'
    },
    {
      id: 'CC002',
      code: 'CC-GMED-002',
      name: 'General Medicine',
      description: 'Cost center for general medicine department',
      department: 'General Medicine',
      manager: 'Dr. Priya Sharma',
      budgetAllocated: 350000,
      budgetUsed: 198000,
      budgetRemaining: 152000,
      lastPeriodSpend: 24000,
      status: 'Active',
      createdDate: '2024-01-15',
      fiscalYear: '2024'
    },
    {
      id: 'CC003',
      code: 'CC-EMER-003',
      name: 'Emergency Services',
      description: 'Emergency department cost center',
      department: 'Emergency',
      manager: 'Dr. Michael Chen',
      budgetAllocated: 600000,
      budgetUsed: 523000,
      budgetRemaining: 77000,
      lastPeriodSpend: 52000,
      status: 'Active',
      createdDate: '2024-01-15',
      fiscalYear: '2024'
    },
    {
      id: 'CC004',
      code: 'CC-LAB-004',
      name: 'Laboratory Services',
      description: 'Medical testing and diagnostics cost center',
      department: 'Laboratory',
      manager: 'Dr. Sarah Johnson',
      budgetAllocated: 250000,
      budgetUsed: 178000,
      budgetRemaining: 72000,
      lastPeriodSpend: 19000,
      status: 'Active',
      createdDate: '2024-01-15',
      fiscalYear: '2024'
    },
    {
      id: 'CC005',
      code: 'CC-PHAR-005',
      name: 'Pharmacy Operations',
      description: 'Pharmacy department cost center',
      department: 'Pharmacy',
      manager: 'John Smith',
      budgetAllocated: 180000,
      budgetUsed: 134000,
      budgetRemaining: 46000,
      lastPeriodSpend: 15000,
      status: 'Active',
      createdDate: '2024-01-15',
      fiscalYear: '2024'
    }
  ]);

  const departments = ['Cardiology', 'General Medicine', 'Emergency', 'Laboratory', 'Pharmacy'];

  const filteredCostCenters = useMemo(() => {
    return costCenters.filter(cc => {
      const matchesSearch = cc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cc.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cc.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cc.manager.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = selectedDepartment === 'all' || cc.department === selectedDepartment;
      const matchesStatus = selectedStatus === 'all' || cc.status === selectedStatus;
      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [costCenters, searchTerm, selectedDepartment, selectedStatus]);

  const handleAddCostCenter = (newCostCenter: Omit<CostCenter, 'id'>) => {
    const costCenter: CostCenter = {
      ...newCostCenter,
      id: `CC${String(costCenters.length + 1).padStart(3, '0')}`
    };
    setCostCenters([...costCenters, costCenter]);
  };

  const handleEditCostCenter = (updatedCostCenter: CostCenter) => {
    setCostCenters(costCenters.map(cc => 
      cc.id === updatedCostCenter.id ? updatedCostCenter : cc
    ));
  };

  const handleDeleteCostCenter = (costCenterId: string) => {
    setCostCenters(costCenters.filter(cc => cc.id !== costCenterId));
  };

  // Calculate summary statistics
  const totalBudgetAllocated = filteredCostCenters.reduce((sum, cc) => sum + cc.budgetAllocated, 0);
  const totalBudgetUsed = filteredCostCenters.reduce((sum, cc) => sum + cc.budgetUsed, 0);
  const totalBudgetRemaining = filteredCostCenters.reduce((sum, cc) => sum + cc.budgetRemaining, 0);
  const budgetUtilization = totalBudgetAllocated > 0 ? (totalBudgetUsed / totalBudgetAllocated) * 100 : 0;
  const overBudgetCenters = filteredCostCenters.filter(cc => cc.budgetUsed > cc.budgetAllocated).length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Cost Center Management
              </CardTitle>
              <CardDescription>Manage budget allocation and expense tracking by organizational units</CardDescription>
            </div>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Cost Center
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Budget Allocated</p>
                  <p className="text-2xl font-bold text-blue-900">₹{totalBudgetAllocated.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Budget Used</p>
                  <p className="text-2xl font-bold text-green-900">₹{totalBudgetUsed.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Budget Remaining</p>
                  <p className="text-2xl font-bold text-purple-900">₹{totalBudgetRemaining.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">Budget Utilization</p>
                  <p className="text-2xl font-bold text-orange-900">{budgetUtilization.toFixed(1)}%</p>
                  {overBudgetCenters > 0 && (
                    <p className="text-xs text-red-600">{overBudgetCenters} over budget</p>
                  )}
                </div>
                {overBudgetCenters > 0 ? (
                  <AlertTriangle className="h-8 w-8 text-orange-600" />
                ) : (
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                )}
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search cost centers, codes, or managers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Cost Center List */}
          <CostCenterList
            costCenters={filteredCostCenters}
            onEdit={handleEditCostCenter}
            onDelete={handleDeleteCostCenter}
          />
        </CardContent>
      </Card>

      <AddCostCenterDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAdd={handleAddCostCenter}
      />
    </div>
  );
};

export default CostCenterManagementTab;
