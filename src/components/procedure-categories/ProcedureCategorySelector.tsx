
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, Scissors, TestTube, Activity, Pill, Shield, AlertTriangle } from "lucide-react";

interface ProcedureCategorySelectorProps {
  value: string;
  onChange: (value: string) => void;
  showDescription?: boolean;
}

const categoryIcons = {
  'Consultations': Stethoscope,
  'Surgeries': Scissors,
  'Diagnostics': TestTube,
  'Therapy': Activity,
  'Dental': Stethoscope,
  'Eye Care': Stethoscope,
  'Pharmacy': Pill,
  'Emergency': AlertTriangle,
  'Preventive': Shield
};

const procedureCategories = [
  // Consultations
  { value: 'general-consultation', label: 'General Consultation', group: 'Consultations', baseRate: '15%' },
  { value: 'specialist-consultation', label: 'Specialist Consultation', group: 'Consultations', baseRate: '20%' },
  { value: 'follow-up-consultation', label: 'Follow-up Consultation', group: 'Consultations', baseRate: '12%' },
  { value: 'emergency-consultation', label: 'Emergency Consultation', group: 'Consultations', baseRate: '25%' },
  
  // Surgeries
  { value: 'minor-surgery', label: 'Minor Surgery', group: 'Surgeries', baseRate: '18%' },
  { value: 'major-surgery', label: 'Major Surgery', group: 'Surgeries', baseRate: '22%' },
  { value: 'cardiac-surgery', label: 'Cardiac Surgery', group: 'Surgeries', baseRate: '28%' },
  { value: 'orthopedic-surgery', label: 'Orthopedic Surgery', group: 'Surgeries', baseRate: '24%' },
  { value: 'neurological-surgery', label: 'Neurological Surgery', group: 'Surgeries', baseRate: '30%' },
  
  // Diagnostic Procedures
  { value: 'blood-test', label: 'Blood Test', group: 'Diagnostics', baseRate: '₹50 fixed' },
  { value: 'x-ray', label: 'X-Ray', group: 'Diagnostics', baseRate: '₹75 fixed' },
  { value: 'mri-scan', label: 'MRI Scan', group: 'Diagnostics', baseRate: '12%' },
  { value: 'ct-scan', label: 'CT Scan', group: 'Diagnostics', baseRate: '15%' },
  { value: 'ultrasound', label: 'Ultrasound', group: 'Diagnostics', baseRate: '₹100 fixed' },
  { value: 'ecg', label: 'ECG/EKG', group: 'Diagnostics', baseRate: '₹60 fixed' },
  { value: 'endoscopy', label: 'Endoscopy', group: 'Diagnostics', baseRate: '18%' },
  
  // Therapeutic Procedures
  { value: 'physiotherapy', label: 'Physiotherapy', group: 'Therapy', baseRate: '₹200 fixed' },
  { value: 'chemotherapy', label: 'Chemotherapy', group: 'Therapy', baseRate: '20%' },
  { value: 'radiotherapy', label: 'Radiotherapy', group: 'Therapy', baseRate: '22%' },
  { value: 'dialysis', label: 'Dialysis', group: 'Therapy', baseRate: '₹300 fixed' },
  
  // Dental Procedures
  { value: 'dental-cleaning', label: 'Dental Cleaning', group: 'Dental', baseRate: '₹150 fixed' },
  { value: 'dental-filling', label: 'Dental Filling', group: 'Dental', baseRate: '₹200 fixed' },
  { value: 'root-canal', label: 'Root Canal', group: 'Dental', baseRate: '20%' },
  { value: 'dental-extraction', label: 'Dental Extraction', group: 'Dental', baseRate: '₹180 fixed' },
  { value: 'dental-implant', label: 'Dental Implant', group: 'Dental', baseRate: '25%' },
  
  // Eye Care
  { value: 'eye-exam', label: 'Eye Examination', group: 'Eye Care', baseRate: '₹120 fixed' },
  { value: 'cataract-surgery', label: 'Cataract Surgery', group: 'Eye Care', baseRate: '22%' },
  { value: 'laser-eye-surgery', label: 'Laser Eye Surgery', group: 'Eye Care', baseRate: '26%' },
  
  // Pharmacy
  { value: 'prescription-medicine', label: 'Prescription Medicine', group: 'Pharmacy', baseRate: '8%' },
  { value: 'otc-medicine', label: 'OTC Medicine', group: 'Pharmacy', baseRate: '6%' },
  { value: 'medical-supplies', label: 'Medical Supplies', group: 'Pharmacy', baseRate: '12%' },
  
  // Emergency Services
  { value: 'emergency-room', label: 'Emergency Room Visit', group: 'Emergency', baseRate: '20%' },
  { value: 'ambulance-service', label: 'Ambulance Service', group: 'Emergency', baseRate: '₹500 fixed' },
  
  // Preventive Care
  { value: 'vaccination', label: 'Vaccination', group: 'Preventive', baseRate: '₹75 fixed' },
  { value: 'health-screening', label: 'Health Screening', group: 'Preventive', baseRate: '18%' },
  { value: 'annual-checkup', label: 'Annual Checkup', group: 'Preventive', baseRate: '15%' }
];

const ProcedureCategorySelector = ({ value, onChange, showDescription = false }: ProcedureCategorySelectorProps) => {
  const groupedCategories = procedureCategories.reduce((acc, category) => {
    if (!acc[category.group]) {
      acc[category.group] = [];
    }
    acc[category.group].push(category);
    return acc;
  }, {} as Record<string, typeof procedureCategories>);

  const selectedCategory = procedureCategories.find(cat => cat.value === value);

  return (
    <div className="space-y-3">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select procedure category" />
        </SelectTrigger>
        <SelectContent className="max-h-80">
          {Object.entries(groupedCategories).map(([group, categories]) => {
            const IconComponent = categoryIcons[group as keyof typeof categoryIcons];
            return (
              <div key={group}>
                <div className="flex items-center gap-2 px-2 py-1 text-xs font-semibold text-muted-foreground bg-muted/50">
                  {IconComponent && <IconComponent className="h-3 w-3" />}
                  {group}
                </div>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value} className="pl-6">
                    <div className="flex items-center justify-between w-full">
                      <span>{category.label}</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {category.baseRate}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </div>
            );
          })}
        </SelectContent>
      </Select>

      {showDescription && selectedCategory && (
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              {categoryIcons[selectedCategory.group as keyof typeof categoryIcons] && 
                React.createElement(categoryIcons[selectedCategory.group as keyof typeof categoryIcons], { className: "h-4 w-4" })
              }
              {selectedCategory.label}
            </CardTitle>
            <CardDescription className="text-xs">
              Category: {selectedCategory.group} | Base Rate: {selectedCategory.baseRate}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xs text-muted-foreground">
              This procedure category uses a base commission rate of {selectedCategory.baseRate}. 
              Actual rates may vary based on specific commission rules and conditions.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProcedureCategorySelector;
