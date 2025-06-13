
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Calculator } from "lucide-react";
import { TieredCommissionConfig, TieredRate } from '@/types/tieredCommission';
import { TieredCommissionCalculator } from '@/utils/commission/tieredCommissionCalculator';

interface TieredCommissionBuilderProps {
  config?: TieredCommissionConfig;
  onChange: (config: TieredCommissionConfig) => void;
}

const TieredCommissionBuilder = ({ config, onChange }: TieredCommissionBuilderProps) => {
  const [testAmount, setTestAmount] = useState(50000);
  
  const defaultConfig: TieredCommissionConfig = {
    id: 'custom-tiered',
    name: 'Custom Tiered Commission',
    cumulativeCalculation: true,
    tiers: [
      {
        id: 'tier-1',
        minAmount: 0,
        maxAmount: 10000,
        rate: 5,
        rateType: 'percentage'
      }
    ]
  };

  const currentConfig = config || defaultConfig;

  const updateConfig = (updates: Partial<TieredCommissionConfig>) => {
    onChange({ ...currentConfig, ...updates });
  };

  const addTier = () => {
    const lastTier = currentConfig.tiers[currentConfig.tiers.length - 1];
    const newTier: TieredRate = {
      id: `tier-${Date.now()}`,
      minAmount: lastTier?.maxAmount ? lastTier.maxAmount + 1 : 0,
      rate: 5,
      rateType: 'percentage'
    };
    
    updateConfig({
      tiers: [...currentConfig.tiers, newTier]
    });
  };

  const updateTier = (index: number, updates: Partial<TieredRate>) => {
    const updatedTiers = [...currentConfig.tiers];
    updatedTiers[index] = { ...updatedTiers[index], ...updates };
    updateConfig({ tiers: updatedTiers });
  };

  const removeTier = (index: number) => {
    if (currentConfig.tiers.length > 1) {
      const updatedTiers = currentConfig.tiers.filter((_, i) => i !== index);
      updateConfig({ tiers: updatedTiers });
    }
  };

  const loadTemplate = (templateId: string) => {
    const templates = TieredCommissionCalculator.getDefaultConfigurations();
    const template = templates.find(t => t.id === templateId);
    if (template) {
      onChange(template);
    }
  };

  const testCalculation = () => {
    return TieredCommissionCalculator.calculateTieredCommission(testAmount, currentConfig);
  };

  const testResult = testCalculation();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Tiered Commission Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="config-name">Configuration Name</Label>
              <Input
                id="config-name"
                value={currentConfig.name}
                onChange={(e) => updateConfig({ name: e.target.value })}
                placeholder="Enter configuration name"
              />
            </div>
            <div>
              <Label htmlFor="base-amount">Base Amount (Optional)</Label>
              <Input
                id="base-amount"
                type="number"
                value={currentConfig.baseAmount || ''}
                onChange={(e) => updateConfig({ baseAmount: parseFloat(e.target.value) || undefined })}
                placeholder="Amount exempt from commission"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="cumulative"
              checked={currentConfig.cumulativeCalculation}
              onCheckedChange={(checked) => updateConfig({ cumulativeCalculation: checked })}
            />
            <Label htmlFor="cumulative">Cumulative Calculation</Label>
            <span className="text-xs text-muted-foreground">
              {currentConfig.cumulativeCalculation 
                ? "Each tier applies to its amount range" 
                : "Single tier applies to total amount"}
            </span>
          </div>

          <div className="flex gap-2">
            <Select onValueChange={loadTemplate}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Load template" />
              </SelectTrigger>
              <SelectContent>
                {TieredCommissionCalculator.getDefaultConfigurations().map(template => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center justify-between">
            Commission Tiers
            <Button onClick={addTier} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              Add Tier
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentConfig.tiers.map((tier, index) => (
            <div key={tier.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <Badge variant="outline">Tier {index + 1}</Badge>
                {currentConfig.tiers.length > 1 && (
                  <Button
                    onClick={() => removeTier(index)}
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-4 gap-3">
                <div>
                  <Label htmlFor={`min-${index}`}>Min Amount</Label>
                  <Input
                    id={`min-${index}`}
                    type="number"
                    value={tier.minAmount}
                    onChange={(e) => updateTier(index, { minAmount: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor={`max-${index}`}>Max Amount (Optional)</Label>
                  <Input
                    id={`max-${index}`}
                    type="number"
                    value={tier.maxAmount || ''}
                    onChange={(e) => updateTier(index, { maxAmount: parseFloat(e.target.value) || undefined })}
                  />
                </div>
                <div>
                  <Label htmlFor={`rate-${index}`}>Rate</Label>
                  <Input
                    id={`rate-${index}`}
                    type="number"
                    step="0.01"
                    value={tier.rate}
                    onChange={(e) => updateTier(index, { rate: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor={`rate-type-${index}`}>Rate Type</Label>
                  <Select
                    value={tier.rateType}
                    onValueChange={(value: 'percentage' | 'fixed') => updateTier(index, { rateType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor={`desc-${index}`}>Description (Optional)</Label>
                <Input
                  id={`desc-${index}`}
                  value={tier.description || ''}
                  onChange={(e) => updateTier(index, { description: e.target.value })}
                  placeholder="Tier description"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Test Calculation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="test-amount">Test Amount:</Label>
            <Input
              id="test-amount"
              type="number"
              value={testAmount}
              onChange={(e) => setTestAmount(parseFloat(e.target.value) || 0)}
              className="w-32"
            />
            <Badge variant="secondary">
              Commission: ₹{testResult.totalCommission}
            </Badge>
            <Badge variant="outline">
              Effective Rate: {testResult.effectiveRate}%
            </Badge>
          </div>

          {testResult.tierBreakdown.length > 0 && (
            <div className="space-y-2">
              <Label>Tier Breakdown:</Label>
              {testResult.tierBreakdown.map((breakdown, index) => (
                <div key={index} className="text-xs p-2 bg-muted rounded">
                  <div className="font-medium">{breakdown.tierDescription}</div>
                  <div className="text-muted-foreground">
                    ₹{breakdown.amountInTier.toLocaleString()} × {breakdown.rate}{breakdown.rateType === 'percentage' ? '%' : ''} = ₹{breakdown.commission}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TieredCommissionBuilder;
