
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

interface TransactionFormProps {
  newTransaction: {
    amount: string;
    quantity: string;
    category: string;
    type: 'doctor' | 'agent' | 'department';
    description: string;
  };
  onTransactionChange: (transaction: any) => void;
  onAddTransaction: () => void;
}

const procedureCategories = [
  // Consultations
  { value: 'general-consultation', label: 'General Consultation', group: 'Consultations' },
  { value: 'specialist-consultation', label: 'Specialist Consultation', group: 'Consultations' },
  { value: 'follow-up-consultation', label: 'Follow-up Consultation', group: 'Consultations' },
  { value: 'emergency-consultation', label: 'Emergency Consultation', group: 'Consultations' },
  
  // Surgeries
  { value: 'minor-surgery', label: 'Minor Surgery', group: 'Surgeries' },
  { value: 'major-surgery', label: 'Major Surgery', group: 'Surgeries' },
  { value: 'cardiac-surgery', label: 'Cardiac Surgery', group: 'Surgeries' },
  { value: 'orthopedic-surgery', label: 'Orthopedic Surgery', group: 'Surgeries' },
  { value: 'neurological-surgery', label: 'Neurological Surgery', group: 'Surgeries' },
  
  // Diagnostic Procedures
  { value: 'blood-test', label: 'Blood Test', group: 'Diagnostics' },
  { value: 'x-ray', label: 'X-Ray', group: 'Diagnostics' },
  { value: 'mri-scan', label: 'MRI Scan', group: 'Diagnostics' },
  { value: 'ct-scan', label: 'CT Scan', group: 'Diagnostics' },
  { value: 'ultrasound', label: 'Ultrasound', group: 'Diagnostics' },
  { value: 'ecg', label: 'ECG/EKG', group: 'Diagnostics' },
  { value: 'endoscopy', label: 'Endoscopy', group: 'Diagnostics' },
  
  // Therapeutic Procedures
  { value: 'physiotherapy', label: 'Physiotherapy', group: 'Therapy' },
  { value: 'chemotherapy', label: 'Chemotherapy', group: 'Therapy' },
  { value: 'radiotherapy', label: 'Radiotherapy', group: 'Therapy' },
  { value: 'dialysis', label: 'Dialysis', group: 'Therapy' },
  
  // Dental Procedures
  { value: 'dental-cleaning', label: 'Dental Cleaning', group: 'Dental' },
  { value: 'dental-filling', label: 'Dental Filling', group: 'Dental' },
  { value: 'root-canal', label: 'Root Canal', group: 'Dental' },
  { value: 'dental-extraction', label: 'Dental Extraction', group: 'Dental' },
  { value: 'dental-implant', label: 'Dental Implant', group: 'Dental' },
  
  // Eye Care
  { value: 'eye-exam', label: 'Eye Examination', group: 'Eye Care' },
  { value: 'cataract-surgery', label: 'Cataract Surgery', group: 'Eye Care' },
  { value: 'laser-eye-surgery', label: 'Laser Eye Surgery', group: 'Eye Care' },
  
  // Pharmacy
  { value: 'prescription-medicine', label: 'Prescription Medicine', group: 'Pharmacy' },
  { value: 'otc-medicine', label: 'OTC Medicine', group: 'Pharmacy' },
  { value: 'medical-supplies', label: 'Medical Supplies', group: 'Pharmacy' },
  
  // Emergency Services
  { value: 'emergency-room', label: 'Emergency Room Visit', group: 'Emergency' },
  { value: 'ambulance-service', label: 'Ambulance Service', group: 'Emergency' },
  
  // Preventive Care
  { value: 'vaccination', label: 'Vaccination', group: 'Preventive' },
  { value: 'health-screening', label: 'Health Screening', group: 'Preventive' },
  { value: 'annual-checkup', label: 'Annual Checkup', group: 'Preventive' }
];

const TransactionForm = ({ newTransaction, onTransactionChange, onAddTransaction }: TransactionFormProps) => {
  const groupedCategories = procedureCategories.reduce((acc, category) => {
    if (!acc[category.group]) {
      acc[category.group] = [];
    }
    acc[category.group].push(category);
    return acc;
  }, {} as Record<string, typeof procedureCategories>);

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-3 p-4 bg-gray-50 rounded-lg">
      <div>
        <Label htmlFor="amount">Amount *</Label>
        <Input
          id="amount"
          type="number"
          placeholder="Amount"
          value={newTransaction.amount}
          onChange={(e) => onTransactionChange({...newTransaction, amount: e.target.value})}
        />
      </div>
      <div>
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          id="quantity"
          type="number"
          value={newTransaction.quantity}
          onChange={(e) => onTransactionChange({...newTransaction, quantity: e.target.value})}
        />
      </div>
      <div>
        <Label htmlFor="category">Procedure Category *</Label>
        <Select 
          value={newTransaction.category || 'general-consultation'} 
          onValueChange={(value) => onTransactionChange({...newTransaction, category: value})}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select procedure" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(groupedCategories).map(([group, categories]) => (
              <div key={group}>
                <div className="px-2 py-1 text-xs font-semibold text-muted-foreground bg-muted/50">
                  {group}
                </div>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </div>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="type">Type</Label>
        <Select 
          value={newTransaction.type || 'doctor'} 
          onValueChange={(value: 'doctor' | 'agent' | 'department') => onTransactionChange({...newTransaction, type: value})}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="doctor">Doctor</SelectItem>
            <SelectItem value="agent">Agent</SelectItem>
            <SelectItem value="department">Department</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          placeholder="Optional details"
          value={newTransaction.description}
          onChange={(e) => onTransactionChange({...newTransaction, description: e.target.value})}
        />
      </div>
      <div className="flex items-end">
        <Button onClick={onAddTransaction} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>
    </div>
  );
};

export default TransactionForm;
