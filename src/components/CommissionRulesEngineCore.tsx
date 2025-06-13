
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { commissionRuleTemplates } from "@/data/commissionTemplates";
import { useCommissionRulesEngine } from "@/hooks/useCommissionRulesEngine";
import ActiveRulesTab from "./ActiveRulesTab";
import CreateRuleTab from "./CreateRuleTab";
import TemplatesTab from "./TemplatesTab";
import ConflictsTab from "./ConflictsTab";
import HistoryTab from "./HistoryTab";

const CommissionRulesEngineCore = () => {
  const {
    activeRules,
    editingRule,
    activeTab,
    selectedRuleIds,
    highlightedRuleIds,
    form,
    auditLog,
    setActiveTab,
    setSelectedRuleIds,
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
    startCreating,
    toggleRuleStatus,
    deleteRule
  } = useCommissionRulesEngine();

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="active-rules">Active Rules</TabsTrigger>
          <TabsTrigger value="create-rule">
            {editingRule ? 'Edit Rule' : 'Create Rule'}
          </TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="conflicts">Conflicts</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="active-rules">
          <ActiveRulesTab
            activeRules={activeRules}
            selectedRuleIds={selectedRuleIds}
            highlightedRuleIds={highlightedRuleIds}
            onStartCreating={startCreating}
            onToggleStatus={toggleRuleStatus}
            onEdit={handleEditRule}
            onDelete={deleteRule}
            onRuleSelection={handleRuleSelection}
            onSelectAll={handleSelectAll}
            onBulkEnable={handleBulkEnable}
            onBulkDisable={handleBulkDisable}
            onBulkDelete={handleBulkDelete}
            onClearSelection={() => setSelectedRuleIds([])}
          />
        </TabsContent>

        <TabsContent value="create-rule">
          <CreateRuleTab
            form={form}
            editingRule={editingRule}
            onSubmit={handleCreateRule}
            onCancel={handleCancelEdit}
          />
        </TabsContent>

        <TabsContent value="templates">
          <TemplatesTab
            templates={commissionRuleTemplates}
            onTemplateSelect={handleTemplateSelect}
          />
        </TabsContent>

        <TabsContent value="conflicts">
          <ConflictsTab
            rules={activeRules}
            onHighlightRules={handleHighlightRules}
            onClearHighlight={handleClearHighlight}
          />
        </TabsContent>

        <TabsContent value="history">
          <HistoryTab auditLog={auditLog} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommissionRulesEngineCore;
