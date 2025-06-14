
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, DollarSign } from "lucide-react";
import EmployeeSelector from './salary/EmployeeSelector';
import SalaryBreakdownCard from './salary/SalaryBreakdownCard';
import OvertimeSection from './salary/OvertimeSection';
import BonusCommissionSection from './salary/BonusCommissionSection';
import DeductionsSection from './salary/DeductionsSection';
import SalaryCalculationResults from './salary/SalaryCalculationResults';
import { Employee, OvertimeRecord, Bonus, Commission, Deduction } from '@/types/salary';
import { SalaryCalculator } from '@/utils/salaryCalculations';

const SalaryCalculatorTab = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [overtimeRecords, setOvertimeRecords] = useState<OvertimeRecord[]>([]);
  const [bonuses, setBonuses] = useState<Bonus[]>([]);
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [deductions, setDeductions] = useState<Deduction[]>([]);
  const [calculationResult, setCalculationResult] = useState(null);

  const handleCalculate = () => {
    if (!selectedEmployee) return;

    const result = SalaryCalculator.calculateSalary(
      selectedEmployee,
      overtimeRecords,
      bonuses,
      commissions,
      deductions
    );
    setCalculationResult(result);
  };

  const clearCalculation = () => {
    setSelectedEmployee(null);
    setOvertimeRecords([]);
    setBonuses([]);
    setCommissions([]);
    setDeductions([]);
    setCalculationResult(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Salary & Wage Calculator
          </CardTitle>
          <CardDescription>
            Calculate comprehensive salary including basic pay, overtime, bonuses, commissions, and deductions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <EmployeeSelector
                selectedEmployee={selectedEmployee}
                onEmployeeSelect={setSelectedEmployee}
              />

              {selectedEmployee && (
                <>
                  <SalaryBreakdownCard employee={selectedEmployee} />
                  
                  <OvertimeSection
                    overtimeRecords={overtimeRecords}
                    onOvertimeRecordsChange={setOvertimeRecords}
                    employeeId={selectedEmployee.id}
                  />

                  <BonusCommissionSection
                    bonuses={bonuses}
                    commissions={commissions}
                    onBonusesChange={setBonuses}
                    onCommissionsChange={setCommissions}
                    employeeId={selectedEmployee.id}
                  />

                  <DeductionsSection
                    deductions={deductions}
                    onDeductionsChange={setDeductions}
                    employeeId={selectedEmployee.id}
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={handleCalculate}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                    >
                      <Calculator className="h-4 w-4" />
                      Calculate Salary
                    </button>
                    <button
                      onClick={clearCalculation}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Clear
                    </button>
                  </div>
                </>
              )}
            </div>

            <div>
              {calculationResult && (
                <SalaryCalculationResults
                  result={calculationResult}
                  employee={selectedEmployee}
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalaryCalculatorTab;
