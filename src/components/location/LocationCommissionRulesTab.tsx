
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Plus, Edit, Trash2, Building, Users, TrendingUp } from "lucide-react";
import { useMultiLocationCommissions } from '@/hooks/useMultiLocationCommissions';
import { LocationSpecificCommissionRule } from '@/types/location';
import { useToast } from '@/hooks/use-toast';

const LocationCommissionRulesTab = () => {
  const {
    branches,
    selectedLocationId,
    setSelectedLocationId,
    locationRules,
    getLocationRules,
    createLocationRule,
    updateLocationRule,
    deleteLocationRule
  } = useMultiLocationCommissions();

  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<LocationSpecificCommissionRule | null>(null);
  const [formData, setFormData] = useState({
    baseRuleId: '',
    locationId: selectedLocationId === 'all' ? '' : selectedLocationId,
    rateOverride: '',
    rateMultiplier: '',
    minAmountOverride: '',
    maxAmountOverride: '',
    notes: ''
  });

  const filteredRules = selectedLocationId === 'all' 
    ? locationRules 
    : getLocationRules(selectedLocationId);

  const handleCreateRule = () => {
    if (!formData.baseRuleId || !formData.locationId) {
      toast({
        title: "Validation Error",
        description: "Please select both base rule and location.",
        variant: "destructive"
      });
      return;
    }

    const selectedLocation = branches.find(b => b.id === formData.locationId);
    
    createLocationRule({
      baseRuleId: formData.baseRuleId,
      locationId: formData.locationId,
      locationName: selectedLocation?.name || '',
      rateOverride: formData.rateOverride ? parseFloat(formData.rateOverride) : undefined,
      rateMultiplier: formData.rateMultiplier ? parseFloat(formData.rateMultiplier) : undefined,
      minAmountOverride: formData.minAmountOverride ? parseFloat(formData.minAmountOverride) : undefined,
      maxAmountOverride: formData.maxAmountOverride ? parseFloat(formData.maxAmountOverride) : undefined,
      isActive: true,
      effectiveFrom: new Date(),
      notes: formData.notes
    });

    toast({
      title: "Success",
      description: "Location-specific rule created successfully."
    });

    setIsCreateDialogOpen(false);
    resetForm();
  };

  const handleEditRule = (rule: LocationSpecificCommissionRule) => {
    setEditingRule(rule);
    setFormData({
      baseRuleId: rule.baseRuleId,
      locationId: rule.locationId,
      rateOverride: rule.rateOverride?.toString() || '',
      rateMultiplier: rule.rateMultiplier?.toString() || '',
      minAmountOverride: rule.minAmountOverride?.toString() || '',
      maxAmountOverride: rule.maxAmountOverride?.toString() || '',
      notes: rule.notes || ''
    });
    setIsCreateDialogOpen(true);
  };

  const handleUpdateRule = () => {
    if (!editingRule) return;

    updateLocationRule(editingRule.id, {
      rateOverride: formData.rateOverride ? parseFloat(formData.rateOverride) : undefined,
      rateMultiplier: formData.rateMultiplier ? parseFloat(formData.rateMultiplier) : undefined,
      minAmountOverride: formData.minAmountOverride ? parseFloat(formData.minAmountOverride) : undefined,
      maxAmountOverride: formData.maxAmountOverride ? parseFloat(formData.maxAmountOverride) : undefined,
      notes: formData.notes
    });

    toast({
      title: "Success",
      description: "Location-specific rule updated successfully."
    });

    setIsCreateDialogOpen(false);
    resetForm();
  };

  const handleDeleteRule = (ruleId: string) => {
    deleteLocationRule(ruleId);
    toast({
      title: "Success",
      description: "Location-specific rule deleted successfully."
    });
  };

  const resetForm = () => {
    setEditingRule(null);
    setFormData({
      baseRuleId: '',
      locationId: selectedLocationId === 'all' ? '' : selectedLocationId,
      rateOverride: '',
      rateMultiplier: '',
      minAmountOverride: '',
      maxAmountOverride: '',
      notes: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Location-Specific Commission Rules
          </CardTitle>
          <CardDescription>
            Manage different commission structures across hospital branches
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="location-select">Location:</Label>
                <Select value={selectedLocationId} onValueChange={setSelectedLocationId}>
                  <SelectTrigger id="location-select" className="w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {branches.map(branch => (
                      <SelectItem key={branch.id} value={branch.id}>
                        {branch.name} ({branch.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Location Rule
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingRule ? 'Edit Location Rule' : 'Create Location Rule'}
                  </DialogTitle>
                  <DialogDescription>
                    Configure location-specific commission overrides
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="base-rule">Base Rule ID</Label>
                      <Input
                        id="base-rule"
                        value={formData.baseRuleId}
                        onChange={(e) => setFormData(prev => ({ ...prev, baseRuleId: e.target.value }))}
                        placeholder="Enter rule ID"
                        disabled={!!editingRule}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Select 
                        value={formData.locationId} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, locationId: value }))}
                        disabled={!!editingRule}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          {branches.map(branch => (
                            <SelectItem key={branch.id} value={branch.id}>
                              {branch.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="rate-override">Rate Override (%)</Label>
                      <Input
                        id="rate-override"
                        type="number"
                        value={formData.rateOverride}
                        onChange={(e) => setFormData(prev => ({ ...prev, rateOverride: e.target.value }))}
                        placeholder="e.g., 18"
                      />
                    </div>
                    <div>
                      <Label htmlFor="rate-multiplier">Rate Multiplier</Label>
                      <Input
                        id="rate-multiplier"
                        type="number"
                        step="0.1"
                        value={formData.rateMultiplier}
                        onChange={(e) => setFormData(prev => ({ ...prev, rateMultiplier: e.target.value }))}
                        placeholder="e.g., 1.2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="min-amount">Min Amount Override</Label>
                      <Input
                        id="min-amount"
                        type="number"
                        value={formData.minAmountOverride}
                        onChange={(e) => setFormData(prev => ({ ...prev, minAmountOverride: e.target.value }))}
                        placeholder="₹5000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="max-amount">Max Amount Override</Label>
                      <Input
                        id="max-amount"
                        type="number"
                        value={formData.maxAmountOverride}
                        onChange={(e) => setFormData(prev => ({ ...prev, maxAmountOverride: e.target.value }))}
                        placeholder="₹100000"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Additional notes for this location rule"
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={editingRule ? handleUpdateRule : handleCreateRule}>
                      {editingRule ? 'Update' : 'Create'} Rule
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Location Rules Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Location Rules</CardTitle>
          <CardDescription>
            Current location-specific commission rule overrides
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredRules.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Base Rule</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Rate Override</TableHead>
                  <TableHead>Multiplier</TableHead>
                  <TableHead>Amount Range</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell className="font-medium">{rule.baseRuleId}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        {rule.locationName}
                      </div>
                    </TableCell>
                    <TableCell>
                      {rule.rateOverride ? `${rule.rateOverride}%` : '-'}
                    </TableCell>
                    <TableCell>
                      {rule.rateMultiplier ? `${rule.rateMultiplier}x` : '-'}
                    </TableCell>
                    <TableCell>
                      {rule.minAmountOverride || rule.maxAmountOverride ? (
                        <span className="text-sm">
                          ₹{rule.minAmountOverride?.toLocaleString() || '0'} - 
                          ₹{rule.maxAmountOverride?.toLocaleString() || '∞'}
                        </span>
                      ) : '-'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={rule.isActive ? "default" : "secondary"}>
                        {rule.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditRule(rule)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteRule(rule.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Location Rules</h3>
              <p className="text-muted-foreground mb-4">
                No location-specific rules configured for the selected location.
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create First Rule
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationCommissionRulesTab;
