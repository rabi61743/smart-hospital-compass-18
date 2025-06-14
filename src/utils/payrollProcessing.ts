
import { Employee, SalaryBreakdown } from '@/types/salary';
import { PayrollRun, PayrollEntry, PayrollCorrection, BulkProcessingOptions, PayrollBatch } from '@/types/payrollProcessing';
import { SalaryCalculator } from './salaryCalculations';

export class PayrollProcessor {
  static createPayrollRun(
    name: string,
    frequency: 'weekly' | 'bi-weekly' | 'monthly',
    startDate: string,
    endDate: string,
    payDate: string
  ): PayrollRun {
    return {
      id: `PR-${Date.now()}`,
      name,
      payPeriod: `${startDate} to ${endDate}`,
      startDate,
      endDate,
      payDate,
      frequency,
      status: 'draft',
      totalEmployees: 0,
      totalGrossPay: 0,
      totalDeductions: 0,
      totalNetPay: 0,
      createdAt: new Date().toISOString(),
    };
  }

  static calculatePayrollEntries(
    payrollRun: PayrollRun,
    employees: Employee[],
    options: BulkProcessingOptions = {
      includeDepartments: [],
      excludeEmployees: [],
      autoApprove: false,
      sendNotifications: true,
      generatePayslips: true,
    }
  ): PayrollEntry[] {
    const filteredEmployees = employees.filter(emp => {
      if (options.excludeEmployees.includes(emp.id)) return false;
      if (options.includeDepartments.length > 0 && !options.includeDepartments.includes(emp.department)) return false;
      return true;
    });

    return filteredEmployees.map(employee => {
      const salaryBreakdown = SalaryCalculator.calculateSalary(employee, [], [], [], []);
      
      return {
        id: `PE-${payrollRun.id}-${employee.id}`,
        payrollRunId: payrollRun.id,
        employeeId: employee.id,
        employee,
        salaryBreakdown,
        status: options.autoApprove ? 'approved' : 'calculated',
        corrections: [],
        calculatedAt: new Date().toISOString(),
      };
    });
  }

  static applyCorrection(
    payrollEntry: PayrollEntry,
    correction: Omit<PayrollCorrection, 'id' | 'payrollEntryId' | 'appliedAt' | 'approved'>
  ): PayrollEntry {
    const newCorrection: PayrollCorrection = {
      ...correction,
      id: `PC-${Date.now()}`,
      payrollEntryId: payrollEntry.id,
      appliedAt: new Date().toISOString(),
      approved: false,
    };

    const updatedEntry = {
      ...payrollEntry,
      corrections: [...payrollEntry.corrections, newCorrection],
      status: 'pending' as const,
    };

    // Recalculate salary with corrections
    updatedEntry.salaryBreakdown = this.recalculateWithCorrections(
      payrollEntry.salaryBreakdown,
      updatedEntry.corrections
    );

    return updatedEntry;
  }

  static recalculateWithCorrections(
    originalBreakdown: SalaryBreakdown,
    corrections: PayrollCorrection[]
  ): SalaryBreakdown {
    let adjustedBreakdown = { ...originalBreakdown };

    corrections.forEach(correction => {
      if (!correction.approved) return;

      switch (correction.type) {
        case 'bonus':
          adjustedBreakdown.bonuses = [
            ...adjustedBreakdown.bonuses,
            {
              id: correction.id,
              employeeId: '',
              type: 'other',
              amount: correction.amount,
              description: correction.description,
              date: correction.appliedAt,
            },
          ];
          break;
        case 'adjustment':
          adjustedBreakdown.netSalary += correction.amount;
          break;
        case 'deduction':
          adjustedBreakdown.otherDeductions = [
            ...adjustedBreakdown.otherDeductions,
            {
              id: correction.id,
              employeeId: '',
              type: 'other',
              amount: Math.abs(correction.amount),
              description: correction.description,
              mandatory: false,
            },
          ];
          break;
      }
    });

    // Recalculate totals
    const totalBonuses = adjustedBreakdown.bonuses.reduce((sum, bonus) => sum + bonus.amount, 0);
    const totalOtherDeductions = adjustedBreakdown.otherDeductions.reduce((sum, ded) => sum + ded.amount, 0);
    
    adjustedBreakdown.grossSalary = adjustedBreakdown.basicPay + adjustedBreakdown.hra + 
                                   adjustedBreakdown.da + adjustedBreakdown.medicalAllowance + 
                                   adjustedBreakdown.transportAllowance + adjustedBreakdown.overtimePay + totalBonuses;
    
    adjustedBreakdown.totalDeductions = adjustedBreakdown.incomeTax + adjustedBreakdown.pf + 
                                       adjustedBreakdown.esi + 200 + totalOtherDeductions; // 200 is professional tax
    
    adjustedBreakdown.netSalary = adjustedBreakdown.grossSalary - adjustedBreakdown.totalDeductions;

    return adjustedBreakdown;
  }

  static processBatch(
    payrollEntries: PayrollEntry[],
    batchSize: number = 10
  ): PayrollBatch[] {
    const batches: PayrollBatch[] = [];
    
    for (let i = 0; i < payrollEntries.length; i += batchSize) {
      const batchEntries = payrollEntries.slice(i, i + batchSize);
      
      batches.push({
        id: `PB-${Date.now()}-${i}`,
        payrollRunId: batchEntries[0]?.payrollRunId || '',
        entries: batchEntries,
        status: 'pending',
        startedAt: new Date().toISOString(),
        errors: [],
      });
    }
    
    return batches;
  }

  static updatePayrollRunTotals(payrollRun: PayrollRun, entries: PayrollEntry[]): PayrollRun {
    const totalGrossPay = entries.reduce((sum, entry) => sum + entry.salaryBreakdown.grossSalary, 0);
    const totalDeductions = entries.reduce((sum, entry) => sum + entry.salaryBreakdown.totalDeductions, 0);
    const totalNetPay = entries.reduce((sum, entry) => sum + entry.salaryBreakdown.netSalary, 0);

    return {
      ...payrollRun,
      totalEmployees: entries.length,
      totalGrossPay,
      totalDeductions,
      totalNetPay,
    };
  }
}
