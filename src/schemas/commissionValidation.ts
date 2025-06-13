
import { z } from "zod";

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
    .max(100, "Percentage rate cannot exceed 100%")
    .refine((val, ctx) => {
      const rateType = ctx.parent?.rateType;
      if (rateType === "percentage" && val > 100) {
        return false;
      }
      if (rateType === "fixed" && val > 1000000) {
        return false;
      }
      return true;
    }, {
      message: "Rate value is invalid for the selected rate type"
    }),
  
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
  
  isActive: z.boolean().default(true)
}).superRefine((data, ctx) => {
  // Cross-field validation
  if (data.minAmount && data.maxAmount && data.minAmount >= data.maxAmount) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Maximum amount must be greater than minimum amount",
      path: ["maxAmount"]
    });
  }
  
  // Rate type specific validations
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
