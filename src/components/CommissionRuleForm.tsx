
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UseFormReturn } from "react-hook-form";
import { CommissionRule } from "@/types/commission";
import { CommissionRuleFormData } from "@/schemas/commissionValidation";
import { AdvancedConditions, ConditionRule, TimeBasedRate } from "@/types/conditions";
import AdvancedConditionsBuilder from "./AdvancedConditionsBuilder";
import RealtimeCommissionPreview from "./RealtimeCommissionPreview";
import BasicConfigurationForm from "./form/BasicConfigurationForm";
import RateConfiguration from "./form/RateConfiguration";
import FormActions from "./form/FormActions";
import TimeBasedRatesBuilder from "./form/TimeBasedRatesBuilder";

interface CommissionRuleFormProps {
  form: UseFormReturn<CommissionRuleFormData>;
  editingRule: CommissionRule | null;
  onSubmit: (data: CommissionRuleFormData) => void;
  onCancel: () => void;
}

const CommissionRuleForm = ({ form, editingRule, onSubmit, onCancel }: CommissionRuleFormProps) => {
  const watchRateType = form.watch("rateType");
  const watchRate = form.watch("rate");
  const watchAdvancedConditions = form.watch("advancedConditions");
  const watchTimeBasedRates = form.watch("timeBasedRates");
  const watchName = form.watch("name");
  const watchType = form.watch("type");
  const watchCategory = form.watch("category");
  const watchMinAmount = form.watch("minAmount");
  const watchMaxAmount = form.watch("maxAmount");
  const watchConditions = form.watch("conditions");

  const handleFormSubmit = (data: CommissionRuleFormData) => {
    console.log("Form submitted with data:", data);
    onSubmit(data);
  };

  const handleAdvancedConditionsChange = (conditions: AdvancedConditions) => {
    form.setValue("advancedConditions", conditions);
  };

  const handleTimeBasedRatesChange = (rates: TimeBasedRate[]) => {
    form.setValue("timeBasedRates", rates);
  };

  // Ensure we always have a valid AdvancedConditions object with proper ConditionRule objects
  const getAdvancedConditions = (): AdvancedConditions => {
    const formConditions = watchAdvancedConditions;
    const normalizedConditions: ConditionRule[] = (formConditions?.conditions || []).map((condition, index) => {
      const conditionRule: ConditionRule = {
        id: condition.id || `condition-${Date.now()}-${index}`,
        field: condition.field || 'amount',
        operator: condition.operator || 'gt',
        value: condition.value || '',
        secondValue: condition.secondValue,
      };

      if (condition.rateOverride && condition.rateOverride.rateType && typeof condition.rateOverride.rate === 'number') {
        conditionRule.rateOverride = {
          rateType: condition.rateOverride.rateType,
          rate: condition.rateOverride.rate
        };
      }

      return conditionRule;
    });

    return {
      logic: formConditions?.logic || 'AND',
      conditions: normalizedConditions
    };
  };

  // Ensure we always have valid TimeBasedRate objects
  const getTimeBasedRates = (): TimeBasedRate[] => {
    const formRates = watchTimeBasedRates || [];
    return formRates.map((rate, index) => ({
      id: rate.id || `time-rate-${Date.now()}-${index}`,
      name: rate.name || `Time Rate ${index + 1}`,
      rateMultiplier: rate.rateMultiplier || 1.0,
      conditions: rate.conditions || {}
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Form */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>
              {editingRule ? `Edit Rule: ${editingRule.name}` : 'Create New Commission Rule'}
            </CardTitle>
            <CardDescription>
              {editingRule ? 'Modify the existing commission rule' : 'Define a new commission structure with advanced conditional logic and time-based rates'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
                <Tabs defaultValue="basic" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">Basic Configuration</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced Conditions</TabsTrigger>
                    <TabsTrigger value="time-based">Time-Based Rates</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-4">
                    <BasicConfigurationForm form={form} />
                    
                    <RateConfiguration 
                      form={form} 
                      watchRateType={watchRateType} 
                      watchRate={watchRate} 
                    />
                  </TabsContent>

                  <TabsContent value="advanced" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="advancedConditions"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <AdvancedConditionsBuilder
                              conditions={getAdvancedConditions()}
                              onChange={handleAdvancedConditionsChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  <TabsContent value="time-based" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="timeBasedRates"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <TimeBasedRatesBuilder
                              timeBasedRates={getTimeBasedRates()}
                              onChange={handleTimeBasedRatesChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                </Tabs>

                <Separator />

                <FormActions editingRule={editingRule} onCancel={onCancel} />
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Preview Sidebar */}
      <div className="lg:col-span-1">
        <div className="sticky top-4">
          <RealtimeCommissionPreview
            ruleData={{
              name: watchName || '',
              type: watchType,
              rateType: watchRateType,
              rate: watchRate || 0,
              minAmount: watchMinAmount,
              maxAmount: watchMaxAmount,
              category: watchCategory || '',
              conditions: watchConditions || ''
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CommissionRuleForm;
