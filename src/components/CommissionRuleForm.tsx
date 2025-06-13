import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UseFormReturn } from "react-hook-form";
import { CommissionRule } from "@/types/commission";
import { CommissionRuleFormData } from "@/schemas/commissionValidation";
import { AdvancedConditions } from "@/types/conditions";
import AdvancedConditionsBuilder from "./AdvancedConditionsBuilder";
import { AlertTriangle, Info } from "lucide-react";

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
  
  const getRateHelpText = () => {
    if (watchRateType === "percentage") {
      return "Enter percentage value (0-100%)";
    } else if (watchRateType === "fixed") {
      return "Enter fixed amount in rupees";
    } else if (watchRateType === "tiered") {
      return "Enter base rate for tiered structure";
    }
    return "";
  };

  const getRatePrefix = () => {
    if (watchRateType === "percentage") return "%";
    if (watchRateType === "fixed") return "₹";
    return "";
  };

  const handleFormSubmit = (data: CommissionRuleFormData) => {
    console.log("Form submitted with data:", data);
    onSubmit(data);
  };

  const handleAdvancedConditionsChange = (conditions: AdvancedConditions) => {
    form.setValue("advancedConditions", conditions);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {editingRule ? `Edit Rule: ${editingRule.name}` : 'Create New Commission Rule'}
        </CardTitle>
        <CardDescription>
          {editingRule ? 'Modify the existing commission rule' : 'Define a new commission structure with advanced conditional logic'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <Tabs defaultValue="basic" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basic">Basic Configuration</TabsTrigger>
                <TabsTrigger value="advanced">Advanced Conditions</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rule Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter rule name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., consultation, surgery" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rule Type *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="doctor">Doctor</SelectItem>
                            <SelectItem value="agent">Agent</SelectItem>
                            <SelectItem value="department">Department</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rateType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rate Type *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="percentage" id="percentage" />
                              <Label htmlFor="percentage">Percentage</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="fixed" id="fixed" />
                              <Label htmlFor="fixed">Fixed Amount</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="tiered" id="tiered" />
                              <Label htmlFor="tiered">Tiered</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="rate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rate Value *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="Enter rate"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              className={getRatePrefix() === "₹" ? "pl-8" : ""}
                            />
                            {getRatePrefix() && (
                              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                                {getRatePrefix()}
                              </span>
                            )}
                          </div>
                        </FormControl>
                        {getRateHelpText() && (
                          <p className="text-xs text-muted-foreground">{getRateHelpText()}</p>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="minAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Min Amount (Optional)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="Minimum amount"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                              className="pl-8"
                            />
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                              ₹
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maxAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Amount (Optional)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="Maximum amount"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                              className="pl-8"
                            />
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                              ₹
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {watchRateType === "percentage" && watchRate > 50 && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      High percentage rates may significantly impact profitability. Consider reviewing this rate.
                    </AlertDescription>
                  </Alert>
                )}

                {watchRateType === "fixed" && watchRate > 50000 && (
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      This is a high fixed commission amount. Ensure it aligns with your business model.
                    </AlertDescription>
                  </Alert>
                )}

                <FormField
                  control={form.control}
                  name="conditions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Basic Conditions & Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe when this rule applies and any special conditions"
                          {...field}
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
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
                          conditions={field.value || { logic: 'AND', conditions: [] }}
                          onChange={handleAdvancedConditionsChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>

            <Separator />

            <div className="flex justify-end space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingRule ? 'Update Rule' : 'Create Rule'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CommissionRuleForm;
