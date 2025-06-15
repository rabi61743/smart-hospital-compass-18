
export const getComparativeData = (comparisonType: string) => {
  switch (comparisonType) {
    case 'month-over-month':
      return [
        { period: 'Oct 2023', current: 125000, previous: 118000, growth: 5.9 },
        { period: 'Nov 2023', current: 142000, previous: 125000, growth: 13.6 },
        { period: 'Dec 2023', current: 168000, previous: 142000, growth: 18.3 },
        { period: 'Jan 2024', current: 155000, previous: 168000, growth: -7.7 },
        { period: 'Feb 2024', current: 178000, previous: 155000, growth: 14.8 },
        { period: 'Mar 2024', current: 195000, previous: 178000, growth: 9.6 }
      ];
    case 'quarter-over-quarter':
      return [
        { period: 'Q1 2023', current: 425000, previous: 380000, growth: 11.8 },
        { period: 'Q2 2023', current: 468000, previous: 425000, growth: 10.1 },
        { period: 'Q3 2023', current: 512000, previous: 468000, growth: 9.4 },
        { period: 'Q4 2023', current: 485000, previous: 512000, growth: -5.3 },
        { period: 'Q1 2024', current: 528000, previous: 485000, growth: 8.9 }
      ];
    case 'year-over-year':
      return [
        { period: '2020', current: 1450000, previous: 1280000, growth: 13.3 },
        { period: '2021', current: 1680000, previous: 1450000, growth: 15.9 },
        { period: '2022', current: 1920000, previous: 1680000, growth: 14.3 },
        { period: '2023', current: 2150000, previous: 1920000, growth: 12.0 },
        { period: '2024', current: 2380000, previous: 2150000, growth: 10.7 }
      ];
    default:
      return [];
  }
};
