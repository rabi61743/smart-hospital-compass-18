
export const handlePresetRange = (
  preset: string,
  onDateFromChange: (date?: Date) => void,
  onDateToChange: (date?: Date) => void
) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  switch (preset) {
    case 'today':
      onDateFromChange(today);
      onDateToChange(today);
      break;
    case 'yesterday':
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      onDateFromChange(yesterday);
      onDateToChange(yesterday);
      break;
    case 'last-7-days':
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      onDateFromChange(weekAgo);
      onDateToChange(today);
      break;
    case 'last-30-days':
      const monthAgo = new Date(today);
      monthAgo.setDate(monthAgo.getDate() - 30);
      onDateFromChange(monthAgo);
      onDateToChange(today);
      break;
    case 'this-month':
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      onDateFromChange(monthStart);
      onDateToChange(today);
      break;
    case 'last-month':
      const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
      onDateFromChange(lastMonthStart);
      onDateToChange(lastMonthEnd);
      break;
    case 'this-quarter':
      const quarterStart = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
      onDateFromChange(quarterStart);
      onDateToChange(today);
      break;
    case 'this-year':
      const yearStart = new Date(now.getFullYear(), 0, 1);
      onDateFromChange(yearStart);
      onDateToChange(today);
      break;
    default:
      break;
  }
};
