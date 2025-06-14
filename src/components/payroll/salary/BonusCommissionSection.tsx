
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Gift, TrendingUp, Plus, Trash2 } from "lucide-react";
import { Bonus, Commission } from '@/types/salary';

interface BonusCommissionSectionProps {
  bonuses: Bonus[];
  commissions: Commission[];
  onBonusesChange: (bonuses: Bonus[]) => void;
  onCommissionsChange: (commissions: Commission[]) => void;
  employeeId: string;
}

const BonusCommissionSection = ({ 
  bonuses, 
  commissions, 
  onBonusesChange, 
  onCommissionsChange, 
  employeeId 
}: BonusCommissionSectionProps) => {
  const [newBonus, setNewBonus] = useState({
    type: 'performance' as const,
    amount: '',
    description: ''
  });

  const [newCommission, setNewCommission] = useState({
    amount: '',
    description: ''
  });

  const addBonus = () => {
    if (!newBonus.amount || !newBonus.description) return;

    const bonus: Bonus = {
      id: Date.now().toString(),
      employeeId,
      type: newBonus.type,
      amount: parseFloat(newBonus.amount),
      description: newBonus.description,
      date: new Date().toISOString().split('T')[0]
    };

    onBonusesChange([...bonuses, bonus]);
    setNewBonus({ type: 'performance', amount: '', description: '' });
  };

  const addCommission = () => {
    if (!newCommission.amount || !newCommission.description) return;

    const commission: Commission = {
      id: Date.now().toString(),
      employeeId,
      amount: parseFloat(newCommission.amount),
      description: newCommission.description,
      date: new Date().toISOString().split('T')[0]
    };

    onCommissionsChange([...commissions, commission]);
    setNewCommission({ amount: '', description: '' });
  };

  const removeBonus = (id: string) => {
    onBonusesChange(bonuses.filter(bonus => bonus.id !== id));
  };

  const removeCommission = (id: string) => {
    onCommissionsChange(commissions.filter(commission => commission.id !== id));
  };

  return (
    <div className="space-y-4">
      {/* Bonuses Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Bonuses
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <div>
              <Label htmlFor="bonus-type">Type</Label>
              <Select 
                value={newBonus.type} 
                onValueChange={(value: any) => setNewBonus(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                  <SelectItem value="festival">Festival</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="bonus-amount">Amount (₹)</Label>
              <Input
                id="bonus-amount"
                type="number"
                placeholder="Amount"
                value={newBonus.amount}
                onChange={(e) => setNewBonus(prev => ({ ...prev, amount: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="bonus-description">Description</Label>
              <Input
                id="bonus-description"
                placeholder="Bonus description"
                value={newBonus.description}
                onChange={(e) => setNewBonus(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addBonus} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>

          {bonuses.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Added Bonuses</h4>
              {bonuses.map((bonus) => (
                <div key={bonus.id} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <div className="flex gap-4">
                      <span className="text-sm font-medium">{bonus.type}</span>
                      <span className="text-sm font-bold text-green-600">₹{bonus.amount.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{bonus.description}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeBonus(bonus.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Commissions Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Commissions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div>
              <Label htmlFor="commission-amount">Amount (₹)</Label>
              <Input
                id="commission-amount"
                type="number"
                placeholder="Commission amount"
                value={newCommission.amount}
                onChange={(e) => setNewCommission(prev => ({ ...prev, amount: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="commission-description">Description</Label>
              <Input
                id="commission-description"
                placeholder="Commission description"
                value={newCommission.description}
                onChange={(e) => setNewCommission(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addCommission} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>

          {commissions.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Added Commissions</h4>
              {commissions.map((commission) => (
                <div key={commission.id} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <div className="flex gap-4">
                      <span className="text-sm font-bold text-blue-600">₹{commission.amount.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{commission.description}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeCommission(commission.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BonusCommissionSection;
