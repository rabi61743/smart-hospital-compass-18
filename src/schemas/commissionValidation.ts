
import { z } from "zod";

const conditionRuleSchema = z.object({
  id: z.string(),
  field: z.enum(['amount', 'quantity', 'category', 'type', 'date']),
  operator: z.enum(['gt', 'gte', 'lt', 'lte', 'eq', 'neq', 'between', 'in']),
  value: z.any(),
  secondValue: z.any().optional(),
  rateOverride: z.object({
    rateType: z.enum(['percentage', 'fixed', 'tiered']),
    rate: z.number()
  }).optional()
});

const advancedConditionsSchema = z.object({
  logic: z.enum(['AND', 'OR']),
  conditions: z.array(conditionRuleSchema)
});

export const commissionRuleSchema = z.object({
  name: z.string()
    .min(3, "Rule name must be at least 3 characters long")
    .max(50, "Rule name must not exceed 50 characters")
    .regex(/^[a-zA-Z0-9\s\-_]+$/, "Rule name can only contain letters, numbers, spaces, hyphens, and underscores"),
  
  type: z.enum(["doctor", "agent", "department"], {
    required_error: "Please select a rule type",
  }),
  
  rateType: z.enum(["percentage", "fixed", "tiered"], {
    required_error: "Please select a rate type",
  }),
  
  rate: z.number()
    .min(0.01, "Rate must be greater than 0")
    .max(100, "Percentage rate cannot exceed 100%"),
  
  minAmount: z.number()
    .min(0, "Minimum amount cannot be negative")
    .optional(),
  
  maxAmount: z.number()
    .min(0, "Maximum amount cannot be negative")
    .optional(),
  
  category: z.string()
    .min(2, "Category must be at least 2 characters long")
    .max(30, "Category must not exceed 30 characters")
    .regex(/^[a-zA-Z0-9\s\-_]+$/, "Category can only contain letters, numbers, spaces, hyphens, and underscores"),
  
  conditions: z.string()
    .min(10, "Conditions must be at least 10 characters long")
    .max(200, "Conditions must not exceed 200 characters"),
  
  isActive: z.boolean().default(true),
  
  advancedConditions: advancedConditionsSchema.optional()
}).superRefine((data, ctx) => {
  // Cross-field validation
  if (data.minAmount && data.maxAmount && data.minAmount >= data.maxAmount) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Maximum amount must be greater than minimum amount",
      path: ["maxAmount"]
    });
  }
  
  if (data.rateType === "percentage" && data.rate > 100) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Percentage rate cannot exceed 100%",
      path: ["rate"]
    });
  }
  
  if (data.rateType === "fixed" && data.rate > 1000000) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Fixed amount cannot exceed ₹10,00,000",
      path: ["rate"]
    });
  }
});

export type CommissionRuleFormData = z.infer<typeof commissionRuleSchema>;
