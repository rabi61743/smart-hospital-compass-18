
import { CommissionRule } from "@/types/commission";
import { useCommissionRules } from "@/hooks/useCommissionRules";
import { useToast } from "@/hooks/use-toast";
import { useCommissionRulesForm } from "./useCommissionRulesForm";
import { useCommissionRulesSelection } from "./useCommissionRulesSelection";
import { useCommissionRulesUI } from "./useCommissionRulesUI";

export const useCommissionRulesEngine = () => {
  const { toast } = useToast();
  const { 
    activeRules, 
    createRule, 
    updateRule, 
    toggleRuleStatus, 
    deleteRule, 
    bulkToggleStatus, 
    bulkDeleteRules,
    auditLog,
    getRuleHistory,
    getRecentActivity,
    setActiveRules
  } = useCommissionRules();

  const { isCreating, activeTab, setActiveTab, startCreating, stopCreating } = useCommissionRulesUI();
  
  const {
    editingRule,
    form,
    handleCreateRule: formHandleCreateRule,
    handleEditRule,
    handleCancelEdit: formHandleCancelEdit,
    handleTemplateSelect
  } = useCommissionRulesForm(createRule, updateRule, setActiveTab);

  const {
    selectedRuleIds,
    highlightedRuleIds,
    setSelectedRuleIds,
    handleRuleSelection,
    handleSelectAll,
    handleBulkEnable,
    handleBulkDisable,
    handleBulkDelete,
    handleHighlightRules,
    handleClearHighlight
  } = useCommissionRulesSelection(activeRules, bulkToggleStatus, bulkDeleteRules);

  const handleCreateRule = (data: any) => {
    try {
      formHandleCreateRule(data);
      stopCreating();
    } catch (error) {
      // Handle error if needed
      console.error('Error creating rule:', error);
    }
  };

  const handleCancelEdit = () => {
    formHandleCancelEdit();
    stopCreating();
  };

  const enhancedStartCreating = () => {
    startCreating();
    form.reset();
  };

  const handleImportRules = (importedRules: CommissionRule[]) => {
    try {
      // Generate new IDs for imported rules to avoid conflicts
      const rulesWithNewIds = importedRules.map(rule => ({
        ...rule,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
      }));
      
      setActiveRules(rulesWithNewIds);
      
      toast({
        title: "Import Successful",
        description: `${importedRules.length} rules imported successfully.`,
      });
    } catch (error) {
      toast({
        title: "Import Failed",
        description: "Failed to import rules. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    // State
    activeRules,
    isCreating,
    editingRule,
    activeTab,
    selectedRuleIds,
    highlightedRuleIds,
    form,
    auditLog,
    
    // Setters
    setActiveTab,
    setSelectedRuleIds,
    
    // Handlers
    handleCreateRule,
    handleEditRule,
    handleCancelEdit,
    handleTemplateSelect,
    handleRuleSelection,
    handleSelectAll,
    handleBulkEnable,
    handleBulkDisable,
    handleBulkDelete,
    handleHighlightRules,
    handleClearHighlight,
    startCreating: enhancedStartCreating,
    
    // Rule operations
    toggleRuleStatus,
    deleteRule,
    
    // Audit functions
    getRuleHistory,
    getRecentActivity,
    
    // Import rules
    handleImportRules
  };
};
