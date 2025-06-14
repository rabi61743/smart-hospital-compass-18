
import { Payslip, PayslipTemplate, PayslipDistribution } from '@/types/payslip';
import { PayrollEntry } from '@/types/payrollProcessing';

export class PayslipGenerator {
  static generatePayslip(
    payrollEntry: PayrollEntry,
    template: PayslipTemplate
  ): Payslip {
    return {
      id: `PS-${Date.now()}-${payrollEntry.employeeId}`,
      employeeId: payrollEntry.employeeId,
      employee: payrollEntry.employee,
      payPeriod: payrollEntry.payrollRunId,
      payDate: new Date().toISOString().split('T')[0],
      salaryBreakdown: payrollEntry.salaryBreakdown,
      payrollRunId: payrollEntry.payrollRunId,
      status: 'generated',
      generatedAt: new Date().toISOString(),
      emailStatus: 'pending',
    };
  }

  static generateBulkPayslips(
    payrollEntries: PayrollEntry[],
    template: PayslipTemplate
  ): Payslip[] {
    return payrollEntries.map(entry => this.generatePayslip(entry, template));
  }

  static createDistribution(
    payrollRunId: string,
    payslips: Payslip[],
    method: 'email' | 'portal' | 'both'
  ): PayslipDistribution {
    return {
      id: `PD-${Date.now()}`,
      payrollRunId,
      payslipIds: payslips.map(p => p.id),
      distributionMethod: method,
      status: 'pending',
      summary: {
        total: payslips.length,
        sent: 0,
        failed: 0,
        pending: payslips.length,
      },
    };
  }

  static updatePayslipStatus(
    payslip: Payslip,
    status: Payslip['status'],
    emailStatus?: Payslip['emailStatus']
  ): Payslip {
    const updatedPayslip = {
      ...payslip,
      status,
      emailStatus: emailStatus || payslip.emailStatus,
    };

    // Update timestamps based on status
    switch (status) {
      case 'sent':
        updatedPayslip.sentAt = new Date().toISOString();
        break;
      case 'viewed':
        updatedPayslip.viewedAt = new Date().toISOString();
        break;
      case 'downloaded':
        updatedPayslip.downloadedAt = new Date().toISOString();
        break;
    }

    return updatedPayslip;
  }

  static getDefaultTemplate(): PayslipTemplate {
    return {
      id: 'default-template',
      name: 'Default Hospital Payslip',
      headerColor: '#2563eb',
      fontFamily: 'Arial, sans-serif',
      includeSignature: true,
      customFields: [
        {
          id: 'cf1',
          label: 'Employee Code',
          value: '{{employeeCode}}',
          position: 'header',
          isVisible: true,
        },
        {
          id: 'cf2',
          label: 'Department',
          value: '{{department}}',
          position: 'header',
          isVisible: true,
        },
      ],
      footerText: 'This is a computer-generated payslip and does not require a signature.',
      isDefault: true,
    };
  }
}
