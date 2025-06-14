
import { useState, useEffect } from 'react';
import { HospitalBranch, LocationSpecificCommissionRule, MultiLocationCommissionSummary } from '@/types/location';
import { CommissionRule } from '@/types/commission';

// Mock data for hospital branches
const mockBranches: HospitalBranch[] = [
  {
    id: 'main-hospital',
    name: 'Main Hospital Campus',
    code: 'MAIN',
    address: {
      street: '123 Healthcare Avenue',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001',
      country: 'India'
    },
    contactInfo: {
      phone: '+91-22-1234-5678',
      email: 'main@hospital.com'
    },
    isActive: true,
    timezone: 'Asia/Kolkata',
    currency: 'INR',
    commissionSettings: {
      defaultRateMultiplier: 1.0,
      enableLocationSpecificRules: true,
      inheritFromMain: false
    },
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'downtown-branch',
    name: 'Downtown Medical Center',
    code: 'DOWN',
    address: {
      street: '456 Medical Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400002',
      country: 'India'
    },
    contactInfo: {
      phone: '+91-22-2345-6789',
      email: 'downtown@hospital.com'
    },
    isActive: true,
    timezone: 'Asia/Kolkata',
    currency: 'INR',
    commissionSettings: {
      defaultRateMultiplier: 1.1,
      enableLocationSpecificRules: true,
      inheritFromMain: true
    },
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'suburban-clinic',
    name: 'Suburban Family Clinic',
    code: 'SUB',
    address: {
      street: '789 Family Road',
      city: 'Thane',
      state: 'Maharashtra',
      zipCode: '400601',
      country: 'India'
    },
    contactInfo: {
      phone: '+91-22-3456-7890',
      email: 'suburban@hospital.com'
    },
    isActive: true,
    timezone: 'Asia/Kolkata',
    currency: 'INR',
    commissionSettings: {
      defaultRateMultiplier: 0.9,
      enableLocationSpecificRules: false,
      inheritFromMain: true
    },
    createdAt: new Date('2023-09-01'),
    updatedAt: new Date('2024-01-01')
  }
];

// Mock location-specific rules
const mockLocationRules: LocationSpecificCommissionRule[] = [
  {
    id: 'rule-main-1',
    baseRuleId: '1',
    locationId: 'main-hospital',
    locationName: 'Main Hospital Campus',
    rateMultiplier: 1.2,
    isActive: true,
    effectiveFrom: new Date('2024-01-01'),
    notes: 'Premium rates for main campus due to higher operational costs'
  },
  {
    id: 'rule-down-1',
    baseRuleId: '2',
    locationId: 'downtown-branch',
    locationName: 'Downtown Medical Center',
    rateOverride: 20,
    minAmountOverride: 3000,
    isActive: true,
    effectiveFrom: new Date('2024-01-01'),
    notes: 'Higher surgery rates for downtown location'
  }
];

// Mock multi-location summary data
const mockLocationSummaries: MultiLocationCommissionSummary[] = [
  {
    locationId: 'main-hospital',
    locationName: 'Main Hospital Campus',
    totalCalculated: 2850000,
    totalPaid: 2800000,
    totalDiscrepancy: 50000,
    commissionCount: 145,
    topPerformers: [
      { name: 'Dr. Rajesh Kumar', amount: 185000, type: 'doctor' },
      { name: 'Dr. Priya Sharma', amount: 165000, type: 'doctor' },
      { name: 'Cardiology Dept', amount: 145000, type: 'department' }
    ]
  },
  {
    locationId: 'downtown-branch',
    locationName: 'Downtown Medical Center',
    totalCalculated: 1650000,
    totalPaid: 1620000,
    totalDiscrepancy: 30000,
    commissionCount: 98,
    topPerformers: [
      { name: 'Dr. Amit Patel', amount: 125000, type: 'doctor' },
      { name: 'John Smith', amount: 95000, type: 'agent' },
      { name: 'Orthopedics Dept', amount: 88000, type: 'department' }
    ]
  },
  {
    locationId: 'suburban-clinic',
    locationName: 'Suburban Family Clinic',
    totalCalculated: 850000,
    totalPaid: 850000,
    totalDiscrepancy: 0,
    commissionCount: 65,
    topPerformers: [
      { name: 'Dr. Sarah Wilson', amount: 75000, type: 'doctor' },
      { name: 'Maria Garcia', amount: 55000, type: 'agent' },
      { name: 'General Practice', amount: 45000, type: 'department' }
    ]
  }
];

export const useMultiLocationCommissions = () => {
  const [branches, setBranches] = useState<HospitalBranch[]>(mockBranches);
  const [selectedLocationId, setSelectedLocationId] = useState<string>('all');
  const [locationRules, setLocationRules] = useState<LocationSpecificCommissionRule[]>(mockLocationRules);
  const [locationSummaries, setLocationSummaries] = useState<MultiLocationCommissionSummary[]>(mockLocationSummaries);
  const [isLoading, setIsLoading] = useState(false);

  const activeBranches = branches.filter(branch => branch.isActive);

  const getLocationSummary = (locationId: string) => {
    return locationSummaries.find(summary => summary.locationId === locationId);
  };

  const getLocationRules = (locationId: string) => {
    return locationRules.filter(rule => rule.locationId === locationId && rule.isActive);
  };

  const getAggregatedSummary = () => {
    const filtered = selectedLocationId === 'all' 
      ? locationSummaries 
      : locationSummaries.filter(s => s.locationId === selectedLocationId);

    return filtered.reduce((acc, summary) => ({
      totalCalculated: acc.totalCalculated + summary.totalCalculated,
      totalPaid: acc.totalPaid + summary.totalPaid,
      totalDiscrepancy: acc.totalDiscrepancy + summary.totalDiscrepancy,
      commissionCount: acc.commissionCount + summary.commissionCount
    }), {
      totalCalculated: 0,
      totalPaid: 0,
      totalDiscrepancy: 0,
      commissionCount: 0
    });
  };

  const createLocationRule = (rule: Omit<LocationSpecificCommissionRule, 'id'>) => {
    const newRule: LocationSpecificCommissionRule = {
      ...rule,
      id: `rule-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    setLocationRules(prev => [...prev, newRule]);
    return newRule;
  };

  const updateLocationRule = (ruleId: string, updates: Partial<LocationSpecificCommissionRule>) => {
    setLocationRules(prev => 
      prev.map(rule => 
        rule.id === ruleId ? { ...rule, ...updates } : rule
      )
    );
  };

  const deleteLocationRule = (ruleId: string) => {
    setLocationRules(prev => prev.filter(rule => rule.id !== ruleId));
  };

  const calculateLocationSpecificRate = (
    baseRule: CommissionRule, 
    locationId: string, 
    amount: number
  ): { rate: number; multiplier: number; details: string } => {
    const branch = branches.find(b => b.id === locationId);
    const locationRule = locationRules.find(r => 
      r.baseRuleId === baseRule.id && 
      r.locationId === locationId && 
      r.isActive
    );

    let rate = baseRule.rate;
    let multiplier = branch?.commissionSettings.defaultRateMultiplier || 1.0;
    let details = `Base rate: ${baseRule.rate}%`;

    if (locationRule) {
      if (locationRule.rateOverride !== undefined) {
        rate = locationRule.rateOverride;
        details += `, Location override: ${rate}%`;
      }
      if (locationRule.rateMultiplier !== undefined) {
        multiplier = locationRule.rateMultiplier;
        details += `, Location multiplier: ${multiplier}x`;
      }
    } else if (branch) {
      details += `, Default multiplier: ${multiplier}x`;
    }

    return { rate, multiplier, details };
  };

  return {
    branches: activeBranches,
    selectedLocationId,
    setSelectedLocationId,
    locationRules,
    locationSummaries,
    isLoading,
    getLocationSummary,
    getLocationRules,
    getAggregatedSummary,
    createLocationRule,
    updateLocationRule,
    deleteLocationRule,
    calculateLocationSpecificRate
  };
};
