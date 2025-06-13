
import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface LogicTypeSelectorProps {
  logic: 'AND' | 'OR';
  onChange: (logic: 'AND' | 'OR') => void;
}

const LogicTypeSelector = ({ logic, onChange }: LogicTypeSelectorProps) => {
  return (
    <div>
      <Label>Condition Logic</Label>
      <RadioGroup
        value={logic}
        onValueChange={onChange}
        className="flex space-x-4 mt-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="AND" id="and" />
          <Label htmlFor="and">AND (All conditions must be true)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="OR" id="or" />
          <Label htmlFor="or">OR (Any condition can be true)</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default LogicTypeSelector;
