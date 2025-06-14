
import React, { useState } from 'react';
import ReferralStatsCards from './referral/ReferralStatsCards';
import ReferralTrackingTable from './referral/ReferralTrackingTable';
import ReferralPerformanceInsights from './referral/ReferralPerformanceInsights';

interface ReferralData {
  doctorId: string;
  doctorName: string;
  department: string;
  totalReferrals: number;
  completedReferrals: number;
  totalRevenue: number;
  commissionRate: string;
  commissionAmount: number;
  topReferredTests: string[];
  conversionRate: number;
}

interface LabReferralTrackingProps {
  period: string;
  selectedCategory: string;
}

const LabReferralTracking = ({ period, selectedCategory }: LabReferralTrackingProps) => {
  const [sortBy, setSortBy] = useState('commission');

  // Mock referral data
  const referralData: ReferralData[] = [
    {
      doctorId: 'DOC001',
      doctorName: 'Dr. Sarah Johnson',
      department: 'Internal Medicine',
      totalReferrals: 45,
      completedReferrals: 38,
      totalRevenue: 95000,
      commissionRate: '8%',
      commissionAmount: 7600,
      topReferredTests: ['MRI Scan', 'Blood Tests', 'CT Scan'],
      conversionRate: 84.4
    },
    {
      doctorId: 'DOC002',
      doctorName: 'Dr. Michael Chen',
      department: 'Cardiology',
      totalReferrals: 32,
      completedReferrals: 30,
      totalRevenue: 128000,
      commissionRate: '10%',
      commissionAmount: 12800,
      topReferredTests: ['Cardiac MRI', 'ECG', 'Stress Test'],
      conversionRate: 93.8
    },
    {
      doctorId: 'DOC003',
      doctorName: 'Dr. Emily Rodriguez',
      department: 'Neurology',
      totalReferrals: 28,
      completedReferrals: 25,
      totalRevenue: 87500,
      commissionRate: '9%',
      commissionAmount: 7875,
      topReferredTests: ['Brain MRI', 'CT Scan', 'EEG'],
      conversionRate: 89.3
    },
    {
      doctorId: 'DOC004',
      doctorName: 'Dr. James Wilson',
      department: 'Orthopedics',
      totalReferrals: 22,
      completedReferrals: 20,
      totalRevenue: 65000,
      commissionRate: '7%',
      commissionAmount: 4550,
      topReferredTests: ['X-Ray', 'MRI Scan', 'Bone Scan'],
      conversionRate: 90.9
    },
    {
      doctorId: 'DOC005',
      doctorName: 'Dr. Lisa Thompson',
      department: 'Gastroenterology',
      totalReferrals: 19,
      completedReferrals: 17,
      totalRevenue: 52000,
      commissionRate: '8%',
      commissionAmount: 4160,
      topReferredTests: ['Endoscopy', 'CT Scan', 'Blood Tests'],
      conversionRate: 89.5
    }
  ];

  const sortedData = [...referralData].sort((a, b) => {
    switch (sortBy) {
      case 'commission':
        return b.commissionAmount - a.commissionAmount;
      case 'referrals':
        return b.totalReferrals - a.totalReferrals;
      case 'conversion':
        return b.conversionRate - a.conversionRate;
      case 'revenue':
        return b.totalRevenue - a.totalRevenue;
      default:
        return 0;
    }
  });

  const totalStats = {
    totalReferrals: referralData.reduce((sum, doc) => sum + doc.totalReferrals, 0),
    totalCommission: referralData.reduce((sum, doc) => sum + doc.commissionAmount, 0),
    totalRevenue: referralData.reduce((sum, doc) => sum + doc.totalRevenue, 0),
    averageConversion: referralData.reduce((sum, doc) => sum + doc.conversionRate, 0) / referralData.length
  };

  const handleExportReferralData = () => {
    console.log('Exporting referral tracking data for period:', period);
  };

  return (
    <div className="space-y-6">
      <ReferralStatsCards totalStats={totalStats} />
      
      <ReferralTrackingTable
        period={period}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortedData={sortedData}
        handleExportReferralData={handleExportReferralData}
      />

      <ReferralPerformanceInsights />
    </div>
  );
};

export default LabReferralTracking;
