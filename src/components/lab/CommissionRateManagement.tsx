
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Edit, Plus, Trash2, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TestTypeRate {
  id: string;
  testType: string;
  category: string;
  rateType: 'percentage' | 'fixed';
  rate: number;
  minAmount?: number;
  maxAmount?: number;
  isActive: boolean;
  lastUpdated: Date;
}

const CommissionRateManagement = () => {
  const { toast } = useToast();
  const [testTypeRates, setTestTypeRates] = useState<TestTypeRate[]>([
    {
      id: '1',
      testType: 'Complete Blood Count (CBC)',
      category: 'blood-tests',
      rateType: 'percentage',
      rate: 12,
      minAmount: 100,
      maxAmount: 2000,
      isActive: true,
      lastUpdated: new Date('2024-01-15')
    },
    {
      id: '2',
      testType: 'MRI Brain',
      category: 'imaging',
      rateType: 'percentage',
      rate: 18,
      minAmount: 3000,
      isActive: true,
      lastUpdated: new Date('2024-01-10')
    },
    {
      id: '3',
      testType: 'Chest X-Ray',
      category: 'imaging',
      rateType: 'fixed',
      rate: 75,
      maxAmount: 1000,
      isActive: true,
      lastUpdated: new Date('2024-01-12')
    },
    {
      id: '4',
      testType: 'Liver Function Test',
      category: 'blood-tests',
      rateType: 'percentage',
      rate: 14,
      minAmount: 200,
      isActive: true,
      lastUpdated: new Date('2024-01-08')
    },
    {
      id: '5',
      testType: 'Urine Culture',
      category: 'microbiology',
      rateType: 'percentage',
      rate: 10,
      minAmount: 200,
      maxAmount: 1500,
      isActive: false,
      lastUpdated: new Date('2024-01-05')
    }
  ]);

  const [editingRate, setEditingRate] = useState<TestTypeRate | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const testCategories = [
    { value: 'all', label: 'All Categories' },
    { value: 'blood-tests', label: 'Blood Tests' },
    { value: 'imaging', label: 'Imaging' },
    { value: 'microbiology', label: 'Microbiology' },
    { value: 'pathology', label: 'Pathology' }
  ];

  const filteredRates = filterCategory === 'all' 
    ? testTypeRates 
    : testTypeRates.filter(rate => rate.category === filterCategory);

  const handleSaveRate = (rateData: Partial<TestTypeRate>) => {
    if (editingRate) {
      // Update existing rate
      setTestTypeRates(rates => 
        rates.map(rate => 
          rate.id === editingRate.id 
            ? { ...rate, ...rateData, lastUpdated: new Date() }
            : rate
        )
      );
      toast({
        title: "Rate Updated",
        description: `Commission rate for ${editingRate.testType} has been updated.`,
      });
    } else {
      // Add new rate
      const newRate: TestTypeRate = {
        id: Date.now().toString(),
        testType: rateData.testType || '',
        category: rateData.category || 'blood-tests',
        rateType: rateData.rateType || 'percentage',
        rate: rateData.rate || 0,
        minAmount: rateData.minAmount,
        maxAmount: rateData.maxAmount,
        isActive: true,
        lastUpdated: new Date()
      };
      setTestTypeRates(rates => [...rates, newRate]);
      toast({
        title: "Rate Added",
        description: `Commission rate for ${newRate.testType} has been added.`,
      });
    }
    setEditingRate(null);
    setShowAddDialog(false);
  };

  const handleDeleteRate = (rateId: string) => {
    const rate = testTypeRates.find(r => r.id === rateId);
    setTestTypeRates(rates => rates.filter(rate => rate.id !== rateId));
    toast({
      title: "Rate Deleted",
      description: `Commission rate for ${rate?.testType} has been deleted.`,
    });
  };

  const handleToggleStatus = (rateId: string) => {
    setTestTypeRates(rates =>
      rates.map(rate =>
        rate.id === rateId
          ? { ...rate, isActive: !rate.isActive, lastUpdated: new Date() }
          : rate
      )
    );
  };

  const RateFormDialog = ({ rate, onSave, onCancel }: {
    rate?: TestTypeRate;
    onSave: (data: Partial<TestTypeRate>) => void;
    onCancel: () => void;
  }) => {
    const [formData, setFormData] = useState({
      testType: rate?.testType || '',
      category: rate?.category || 'blood-tests',
      rateType: rate?.rateType || 'percentage' as 'percentage' | 'fixed',
      rate: rate?.rate || 0,
      minAmount: rate?.minAmount || undefined,
      maxAmount: rate?.maxAmount || undefined
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="testType">Test Type</Label>
            <Input
              id="testType"
              value={formData.testType}
              onChange={(e) => setFormData({ ...formData, testType: e.target.value })}
              placeholder="Enter test name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blood-tests">Blood Tests</SelectItem>
                <SelectItem value="imaging">Imaging</SelectItem>
                <SelectItem value="microbiology">Microbiology</SelectItem>
                <SelectItem value="pathology">Pathology</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="rateType">Rate Type</Label>
            <Select value={formData.rateType} onValueChange={(value: 'percentage' | 'fixed') => setFormData({ ...formData, rateType: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Percentage</SelectItem>
                <SelectItem value="fixed">Fixed Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="rate">Rate Value</Label>
            <Input
              id="rate"
              type="number"
              value={formData.rate}
              onChange={(e) => setFormData({ ...formData, rate: parseFloat(e.target.value) || 0 })}
              placeholder={formData.rateType === 'percentage' ? 'Percentage (0-100)' : 'Fixed amount'}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="minAmount">Min Amount (Optional)</Label>
            <Input
              id="minAmount"
              type="number"
              value={formData.minAmount || ''}
              onChange={(e) => setFormData({ ...formData, minAmount: parseFloat(e.target.value) || undefined })}
              placeholder="Minimum amount"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxAmount">Max Amount (Optional)</Label>
            <Input
              id="maxAmount"
              type="number"
              value={formData.maxAmount || ''}
              onChange={(e) => setFormData({ ...formData, maxAmount: parseFloat(e.target.value) || undefined })}
              placeholder="Maximum amount"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            Save Rate
          </Button>
        </div>
      </form>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Commission Rate Management</CardTitle>
          <CardDescription>
            Manage commission rates for different test types and categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="categoryFilter">Filter by Category:</Label>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {testCategories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Badge variant="outline">
                {filteredRates.length} rate{filteredRates.length !== 1 ? 's' : ''}
              </Badge>
            </div>

            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Rate
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Commission Rate</DialogTitle>
                  <DialogDescription>
                    Configure commission rate for a new test type
                  </DialogDescription>
                </DialogHeader>
                <RateFormDialog
                  onSave={handleSaveRate}
                  onCancel={() => setShowAddDialog(false)}
                />
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Amount Range</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRates.map((rate) => (
                  <TableRow key={rate.id}>
                    <TableCell className="font-medium">{rate.testType}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {testCategories.find(cat => cat.value === rate.category)?.label || rate.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {rate.rateType === 'percentage' ? `${rate.rate}%` : `₹${rate.rate}`}
                      </div>
                      <div className="text-sm text-muted-foreground">{rate.rateType}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {rate.minAmount && `Min: ₹${rate.minAmount}`}
                        {rate.minAmount && rate.maxAmount && ' | '}
                        {rate.maxAmount && `Max: ₹${rate.maxAmount}`}
                        {!rate.minAmount && !rate.maxAmount && 'No limits'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleStatus(rate.id)}
                      >
                        <Badge variant={rate.isActive ? "default" : "secondary"}>
                          {rate.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </Button>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {rate.lastUpdated.toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingRate(rate)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Commission Rate</DialogTitle>
                              <DialogDescription>
                                Modify the commission rate for {rate.testType}
                              </DialogDescription>
                            </DialogHeader>
                            <RateFormDialog
                              rate={rate}
                              onSave={handleSaveRate}
                              onCancel={() => setEditingRate(null)}
                            />
                          </DialogContent>
                        </Dialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Commission Rate</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete the commission rate for {rate.testType}? 
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteRate(rate.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredRates.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No commission rates found for the selected category.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CommissionRateManagement;
