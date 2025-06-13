
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2 } from "lucide-react";
import { CommissionRule } from "@/types/commission";

interface CommissionRuleCardProps {
  rule: CommissionRule;
  isSelected?: boolean;
  isHighlighted?: boolean;
  showSelection?: boolean;
  onToggleStatus: (ruleId: string) => void;
  onEdit: (rule: CommissionRule) => void;
  onDelete: (ruleId: string) => void;
  onSelect?: (ruleId: string, isSelected: boolean) => void;
}

const CommissionRuleCard = ({ 
  rule, 
  isSelected = false,
  isHighlighted = false,
  showSelection = false,
  onToggleStatus, 
  onEdit, 
  onDelete,
  onSelect
}: CommissionRuleCardProps) => {
  const getCardClassName = () => {
    let className = '';
    
    if (!rule.isActive) {
      className += 'opacity-60 ';
    }
    
    if (isSelected) {
      className += 'ring-2 ring-blue-500 bg-blue-50 ';
    } else if (isHighlighted) {
      className += 'ring-2 ring-orange-500 bg-orange-50 ';
    }
    
    return className.trim();
  };

  return (
    <Card className={getCardClassName()}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-3">
            {showSelection && onSelect && (
              <Checkbox
                checked={isSelected}
                onCheckedChange={(checked) => onSelect(rule.id, checked as boolean)}
                className="mt-1"
              />
            )}
            <div>
              <CardTitle className="text-base">{rule.name}</CardTitle>
              <CardDescription>{rule.conditions}</CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isHighlighted && (
              <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">
                Highlighted
              </Badge>
            )}
            <Badge variant={rule.isActive ? "default" : "secondary"}>
              {rule.isActive ? "Active" : "Inactive"}
            </Badge>
            <Badge variant="outline">{rule.type}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div>
              <span className="text-2xl font-bold text-green-600">
                {rule.rateType === 'percentage' ? `${rule.rate}%` : `₹${rule.rate}`}
              </span>
              <p className="text-xs text-muted-foreground">{rule.rateType} rate</p>
            </div>
            {rule.minAmount && (
              <div>
                <span className="text-sm font-medium">Min: ₹{rule.minAmount}</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={rule.isActive}
              onCheckedChange={() => onToggleStatus(rule.id)}
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onEdit(rule)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => onDelete(rule.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommissionRuleCard;
