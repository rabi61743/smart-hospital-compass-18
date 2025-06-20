
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { extendedCommissionTemplates } from "@/data/extendedCommissionTemplates";
import { useCommissionRulesEngine } from "@/hooks/useCommissionRulesEngine";
import ActiveRulesTab from "./ActiveRulesTab";
import CreateRuleTab from "./CreateRuleTab";
import TemplatesTab from "./TemplatesTab";
import ConflictsTab from "./ConflictsTab";
import HistoryTab from "./HistoryTab";
import RuleTestingTab from "./RuleTestingTab";
import CommissionCalculatorTab from "./CommissionCalculatorTab";

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
    handleImportRules,
    startCreating,
    toggleRuleStatus,
    deleteRule
  } = useCommissionRulesEngine();

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="active-rules">Active Rules</TabsTrigger>
          <TabsTrigger value="create-rule">
            {editingRule ? 'Edit Rule' : 'Create Rule'}
          </TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
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
            onImportRules={handleImportRules}
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
            templates={extendedCommissionTemplates}
            onTemplateSelect={handleTemplateSelect}
          />
        </TabsContent>

        <TabsContent value="calculator">
          <CommissionCalculatorTab rules={activeRules} />
        </TabsContent>

        <TabsContent value="testing">
          <RuleTestingTab rules={activeRules} />
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
