
import React from 'react';
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AlertTriangle, Info } from "lucide-react";
import { CommissionRuleFormData } from "@/schemas/commissionValidation";

interface RateConfigurationProps {
  form: UseFormReturn<CommissionRuleFormData>;
  watchRateType: string;
  watchRate: number;
}

const RateConfiguration = ({ form, watchRateType, watchRate }: RateConfigurationProps) => {
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

  return (
    <div className="space-y-4">
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

      {/* Rate validation alerts */}
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
    </div>
  );
};

export default RateConfiguration;
