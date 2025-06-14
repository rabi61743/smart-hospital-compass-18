
import { Employee, OvertimeRecord, Bonus, Commission, Deduction, SalaryCalculation, SalaryBreakdown } from '@/types/salary';

export class SalaryCalculator {
  // Tax rates and standard percentages
  private static readonly TAX_RATES = {
    INCOME_TAX: 0.10,
    PF: 0.12,
    ESI: 0.0075,
    PROFESSIONAL_TAX: 200
  };

  private static readonly ALLOWANCE_RATES = {
    HRA: 0.40, // 40% of basic
    DA: 0.15,  // 15% of basic
    MEDICAL: 1250,
    TRANSPORT: 1600
  };

  static calculateBasicAllowances(basicSalary: number) {
    return {
      hra: basicSalary * this.ALLOWANCE_RATES.HRA,
      da: basicSalary * this.ALLOWANCE_RATES.DA,
      medical: this.ALLOWANCE_RATES.MEDICAL,
      transport: this.ALLOWANCE_RATES.TRANSPORT
    };
  }

  static calculateOvertimePay(overtimeRecords: OvertimeRecord[], hourlyRate: number): number {
    return overtimeRecords
      .filter(record => record.approved)
      .reduce((total, record) => {
        return total + (record.hours * hourlyRate * record.rate);
      }, 0);
  }

  static calculateTotalBonuses(bonuses: Bonus[]): number {
    return bonuses.reduce((total, bonus) => total + bonus.amount, 0);
  }

  static calculateTotalCommissions(commissions: Commission[]): number {
    return commissions.reduce((total, commission) => total + commission.amount, 0);
  }

  static calculateDeductions(grossSalary: number, customDeductions: Deduction[] = []): {
    incomeTax: number;
    pf: number;
    esi: number;
    professionalTax: number;
    customDeductions: number;
    total: number;
  } {
    const incomeTax = grossSalary * this.TAX_RATES.INCOME_TAX;
    const pf = grossSalary * this.TAX_RATES.PF;
    const esi = grossSalary * this.TAX_RATES.ESI;
    const professionalTax = this.TAX_RATES.PROFESSIONAL_TAX;
    
    const customDeductionsTotal = customDeductions.reduce((total, deduction) => {
      if (deduction.percentage) {
        return total + (grossSalary * (deduction.percentage / 100));
      }
      return total + deduction.amount;
    }, 0);

    const total = incomeTax + pf + esi + professionalTax + customDeductionsTotal;

    return {
      incomeTax,
      pf,
      esi,
      professionalTax,
      customDeductions: customDeductionsTotal,
      total
    };
  }

  static calculateSalary(
    employee: Employee,
    overtimeRecords: OvertimeRecord[] = [],
    bonuses: Bonus[] = [],
    commissions: Commission[] = [],
    customDeductions: Deduction[] = []
  ): SalaryBreakdown {
    const allowances = this.calculateBasicAllowances(employee.basicSalary);
    const hourlyRate = employee.hourlyRate || employee.basicSalary / (30 * 8); // Estimate if not provided
    const overtimePay = this.calculateOvertimePay(overtimeRecords, hourlyRate);
    const totalBonuses = this.calculateTotalBonuses(bonuses);
    const totalCommissions = this.calculateTotalCommissions(commissions);

    const grossSalary = employee.basicSalary + 
                       allowances.hra + 
                       allowances.da + 
                       allowances.medical + 
                       allowances.transport + 
                       overtimePay + 
                       totalBonuses + 
                       totalCommissions;

    const deductions = this.calculateDeductions(grossSalary, customDeductions);
    const netSalary = grossSalary - deductions.total;

    return {
      basicPay: employee.basicSalary,
      hra: allowances.hra,
      da: allowances.da,
      medicalAllowance: allowances.medical,
      transportAllowance: allowances.transport,
      overtimePay,
      bonuses,
      commissions,
      grossSalary,
      incomeTax: deductions.incomeTax,
      pf: deductions.pf,
      esi: deductions.esi,
      otherDeductions: customDeductions,
      totalDeductions: deductions.total,
      netSalary
    };
  }
}
