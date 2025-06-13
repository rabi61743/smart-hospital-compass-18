
import { useState } from 'react';

export const useCommissionRulesUI = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState('active-rules');

  const startCreating = () => {
    setIsCreating(true);
    setActiveTab('create-rule');
  };

  const stopCreating = () => {
    setIsCreating(false);
  };

  return {
    isCreating,
    activeTab,
    setActiveTab,
    startCreating,
    stopCreating
  };
};
