
import React from 'react';
import { UseFormReturn } from "react-hook-form";
import { CommissionRule } from "@/types/commission";
import { CommissionRuleFormData } from "@/schemas/commissionValidation";
import CommissionRuleForm from "./CommissionRuleForm";

interface CreateRuleTabProps {
  form: UseFormReturn<CommissionRuleFormData>;
  editingRule: CommissionRule | null;
  onSubmit: (data: CommissionRuleFormData) => void;
  onCancel: () => void;
}

const CreateRuleTab = ({ form, editingRule, onSubmit, onCancel }: CreateRuleTabProps) => {
  return (
    <div className="space-y-4">
      <CommissionRuleForm
        form={form}
        editingRule={editingRule}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </div>
  );
};

export default CreateRuleTab;
