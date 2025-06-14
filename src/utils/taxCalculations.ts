
import { TaxConfiguration, TaxCalculationResult, EmployeeTaxDetails } from '@/types/taxManagement';
import { Employee, SalaryBreakdown } from '@/types/salary';

export class TaxCalculator {
  private static readonly DEFAULT_TAX_RATES = {
    INCOME_TAX: 0.10,
    PF: 0.12,
    ESI: 0.0075,
    PROFESSIONAL_TAX: 200,
    ESI_THRESHOLD: 21000
  };

  static calculateIncomeTax(
    taxableIncome: number,
    taxRegime: 'old' | 'new' = 'new'
  ): number {
    if (taxRegime === 'new') {
      return this.calculateNewRegimeTax(taxableIncome);
    } else {
      return this.calculateOldRegimeTax(taxableIncome);
    }
  }

  private static calculateNewRegimeTax(income: number): number {
    if (income <= 250000) return 0;
    if (income <= 500000) return (income - 250000) * 0.05;
    if (income <= 750000) return 12500 + (income - 500000) * 0.10;
    if (income <= 1000000) return 37500 + (income - 750000) * 0.15;
    if (income <= 1250000) return 75000 + (income - 1000000) * 0.20;
    if (income <= 1500000) return 125000 + (income - 1250000) * 0.25;
    return 187500 + (income - 1500000) * 0.30;
  }

  private static calculateOldRegimeTax(income: number): number {
    if (income <= 250000) return 0;
    if (income <= 500000) return (income - 250000) * 0.05;
    if (income <= 1000000) return 12500 + (income - 500000) * 0.20;
    return 112500 + (income - 1000000) * 0.30;
  }

  static calculatePF(basicSalary: number): number {
    const pfCeiling = 15000; // PF ceiling as per current rules
    const pfBasic = Math.min(basicSalary, pfCeiling);
    return pfBasic * this.DEFAULT_TAX_RATES.PF;
  }

  static calculateESI(grossSalary: number): number {
    if (grossSalary > this.DEFAULT_TAX_RATES.ESI_THRESHOLD) {
      return 0; // ESI not applicable above threshold
    }
    return grossSalary * this.DEFAULT_TAX_RATES.ESI;
  }

  static calculateProfessionalTax(grossSalary: number): number {
    // Professional tax slabs (example for Maharashtra)
    if (grossSalary <= 15000) return 0;
    if (grossSalary <= 25000) return 175;
    return this.DEFAULT_TAX_RATES.PROFESSIONAL_TAX;
  }

  static calculateTaxableIncome(
    salaryBreakdown: SalaryBreakdown,
    exemptions: number = 0,
    investments: number = 0
  ): number {
    const standardDeduction = 50000; // Standard deduction limit
    const taxableIncome = salaryBreakdown.grossSalary - 
                         standardDeduction - 
                         exemptions - 
                         investments;
    return Math.max(0, taxableIncome);
  }

  static calculateMonthlyTax(
    employee: Employee,
    salaryBreakdown: SalaryBreakdown,
    taxDetails?: EmployeeTaxDetails
  ): TaxCalculationResult {
    const annualGross = salaryBreakdown.grossSalary * 12;
    
    // Calculate exemptions and investments
    const totalExemptions = taxDetails?.exemptions
      .filter(e => e.approved)
      .reduce((sum, e) => sum + e.amount, 0) || 0;
    
    const totalInvestments = taxDetails?.investments
      .filter(i => i.approved)
      .reduce((sum, i) => sum + i.amount, 0) || 0;

    const taxableIncome = this.calculateTaxableIncome(
      { ...salaryBreakdown, grossSalary: annualGross },
      totalExemptions,
      totalInvestments
    );

    const annualIncomeTax = this.calculateIncomeTax(
      taxableIncome,
      taxDetails?.taxRegime || 'new'
    );

    const monthlyIncomeTax = annualIncomeTax / 12;
    const pf = this.calculatePF(salaryBreakdown.basicPay);
    const esi = this.calculateESI(salaryBreakdown.grossSalary);
    const professionalTax = this.calculateProfessionalTax(salaryBreakdown.grossSalary);

    const totalTax = monthlyIncomeTax + pf + esi + professionalTax;
    const netSalary = salaryBreakdown.grossSalary - totalTax;

    return {
      employeeId: employee.id,
      payrollPeriod: new Date().toISOString().substring(0, 7),
      grossSalary: salaryBreakdown.grossSalary,
      taxableIncome: taxableIncome / 12,
      incomeTax: monthlyIncomeTax,
      pf,
      esi,
      professionalTax,
      totalTax,
      netSalary,
      calculatedAt: new Date().toISOString()
    };
  }

  static generateTDSCertificate(
    employee: Employee,
    taxCalculations: TaxCalculationResult[],
    financialYear: string
  ) {
    const totalTDS = taxCalculations.reduce((sum, calc) => sum + calc.incomeTax, 0);
    const totalGross = taxCalculations.reduce((sum, calc) => sum + calc.grossSalary, 0);

    return {
      employeeId: employee.id,
      employeeName: employee.name,
      pan: 'XXXXX0000X', // Should come from employee tax details
      financialYear,
      totalGrossIncome: totalGross,
      totalTDSDeducted: totalTDS,
      generatedAt: new Date().toISOString(),
      certificateNumber: `TDS-${employee.id}-${financialYear}`
    };
  }
}
