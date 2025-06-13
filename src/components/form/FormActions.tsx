
import React from 'react';
import { Button } from "@/components/ui/button";
import { CommissionRule } from "@/types/commission";

interface FormActionsProps {
  editingRule: CommissionRule | null;
  onCancel: () => void;
}

const FormActions = ({ editingRule, onCancel }: FormActionsProps) => {
  return (
    <div className="flex justify-end space-x-2">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button type="submit">
        {editingRule ? 'Update Rule' : 'Create Rule'}
      </Button>
    </div>
  );
};

export default FormActions;
