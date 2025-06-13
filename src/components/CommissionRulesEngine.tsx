
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { TrendingUp, Users, Receipt, Plus, Edit, Trash2, Copy } from "lucide-react";

interface CommissionRule {
  id: string;
  name: string;
  type: 'doctor' | 'agent' | 'department';
  rateType: 'percentage' | 'fixed' | 'tiered';
  rate: number;
  minAmount?: number;
  maxAmount?: number;
  conditions: string;
  isActive: boolean;
  category: string;
}

const CommissionRulesEngine = () => {
  const [activeRules, setActiveRules] = useState<CommissionRule[]>([
    {
      id: '1',
      name: 'Standard Doctor Consultation',
      type: 'doctor',
      rateType: 'percentage',
      rate: 15,
      conditions: 'Per consultation completed',
      isActive: true,
      category: 'consultation'
    },
    {
      id: '2',
      name: 'Surgery Commission',
      type: 'doctor',
      rateType: 'percentage',
      rate: 18,
      minAmount: 5000,
      conditions: 'Major surgical procedures',
      isActive: true,
      category: 'surgery'
    },
    {
      id: '3',
      name: 'Referral Agent Standard',
      type: 'agent',
      rateType: 'fixed',
      rate: 850,
      conditions: 'Per successful patient referral',
      isActive: true,
      category: 'referral'
    }
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [isCreating, setIsCreating] = useState(false);

  const form = useForm({
    defaultValues: {
      name: '',
      type: 'doctor',
      rateType: 'percentage',
      rate: 0,
      minAmount: 0,
      maxAmount: 0,
      conditions: '',
      category: '',
      isActive: true
    }
  });

  const ruleTemplates = [
    {
      id: 'doctor-consultation',
      name: 'Doctor Consultation',
      description: 'Standard percentage-based commission for consultations',
      type: 'doctor',
      rateType: 'percentage',
      rate: 15,
      category: 'consultation'
    },
    {
      id: 'doctor-surgery',
      name: 'Surgery Commission',
      description: 'Higher percentage for surgical procedures',
      type: 'doctor',
      rateType: 'percentage',
      rate: 18,
      category: 'surgery'
    },
    {
      id: 'agent-referral',
      name: 'Referral Agent',
      description: 'Fixed amount per successful referral',
      type: 'agent',
      rateType: 'fixed',
      rate: 850,
      category: 'referral'
    },
    {
      id: 'lab-percentage',
      name: 'Lab Commission',
      description: 'Percentage-based lab test commission',
      type: 'department',
      rateType: 'percentage',
      rate: 15,
      category: 'laboratory'
    },
    {
      id: 'pharmacy-tiered',
      name: 'Pharmacy Tiered',
      description: 'Tiered commission based on sales volume',
      type: 'department',
      rateType: 'tiered',
      rate: 10,
      category: 'pharmacy'
    }
  ];

  const handleCreateRule = (data: any) => {
    const newRule: CommissionRule = {
      id: Date.now().toString(),
      ...data,
      conditions: data.conditions || `${data.rateType === 'percentage' ? data.rate + '%' : '₹' + data.rate} commission`
    };
    setActiveRules([...activeRules, newRule]);
    setIsCreating(false);
    form.reset();
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = ruleTemplates.find(t => t.id === templateId);
    if (template) {
      form.setValue('name', template.name);
      form.setValue('type', template.type as any);
      form.setValue('rateType', template.rateType as any);
      form.setValue('rate', template.rate);
      form.setValue('category', template.category);
      form.setValue('conditions', template.description);
    }
  };

  const toggleRuleStatus = (ruleId: string) => {
    setActiveRules(rules =>
      rules.map(rule =>
        rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule
      )
    );
  };

  const deleteRule = (ruleId: string) => {
    setActiveRules(rules => rules.filter(rule => rule.id !== ruleId));
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="active-rules" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active-rules">Active Rules</TabsTrigger>
          <TabsTrigger value="create-rule">Create Rule</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="active-rules" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Active Commission Rules</h3>
              <p className="text-sm text-muted-foreground">Manage your current commission rules</p>
            </div>
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Rule
            </Button>
          </div>

          <div className="grid gap-4">
            {activeRules.map((rule) => (
              <Card key={rule.id} className={`${!rule.isActive ? 'opacity-60' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">{rule.name}</CardTitle>
                      <CardDescription>{rule.conditions}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={rule.isActive ? "default" : "secondary"}>
                        {rule.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <Badge variant="outline">{rule.type}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div>
                        <span className="text-2xl font-bold text-green-600">
                          {rule.rateType === 'percentage' ? `${rule.rate}%` : `₹${rule.rate}`}
                        </span>
                        <p className="text-xs text-muted-foreground">{rule.rateType} rate</p>
                      </div>
                      {rule.minAmount && (
                        <div>
                          <span className="text-sm font-medium">Min: ₹{rule.minAmount}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={rule.isActive}
                        onCheckedChange={() => toggleRuleStatus(rule.id)}
                      />
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => deleteRule(rule.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create-rule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Commission Rule</CardTitle>
              <CardDescription>Define a new commission structure for your organization</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleCreateRule)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rule Name</FormLabel>
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
                          <FormLabel>Category</FormLabel>
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
                          <FormLabel>Rule Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                          <FormLabel>Rate Type</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
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
                          <FormLabel>Rate Value</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter rate"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
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
                            <Input
                              type="number"
                              placeholder="Minimum amount"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
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
                            <Input
                              type="number"
                              placeholder="Maximum amount"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="conditions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Conditions & Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe when this rule applies and any special conditions"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator />

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => form.reset()}>
                      Reset
                    </Button>
                    <Button type="submit">Create Rule</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Commission Rule Templates</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Use these pre-configured templates to quickly set up common commission structures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ruleTemplates.map((template) => (
              <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">{template.name}</CardTitle>
                      <CardDescription className="text-xs">{template.description}</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {template.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <span className="text-xl font-bold text-blue-600">
                        {template.rateType === 'percentage' ? `${template.rate}%` : `₹${template.rate}`}
                      </span>
                      <p className="text-xs text-muted-foreground">{template.rateType} commission</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          handleTemplateSelect(template.id);
                          setIsCreating(true);
                        }}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Use Template
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommissionRulesEngine;
