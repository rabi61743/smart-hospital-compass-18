
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus, Edit, Trash2, Star } from "lucide-react";
import { PaymentMethod } from "./types";
import AddPaymentMethodDialog from "./AddPaymentMethodDialog";

const PaymentMethodsTab = () => {
  const [paymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'credit_card',
      last4: '4242',
      brand: 'Visa',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true,
      nickname: 'Primary Card'
    },
    {
      id: '2',
      type: 'debit_card',
      last4: '1234',
      brand: 'Mastercard',
      expiryMonth: 8,
      expiryYear: 2026,
      isDefault: false,
      nickname: 'Backup Card'
    }
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);

  const getCardIcon = (brand?: string) => {
    return <CreditCard className="w-6 h-6" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Payment Methods</h3>
          <p className="text-sm text-muted-foreground">Manage your saved payment methods</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Payment Method
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentMethods.map((method) => (
          <Card key={method.id} className={`relative ${method.isDefault ? 'ring-2 ring-blue-500' : ''}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getCardIcon(method.brand)}
                  <div>
                    <CardTitle className="text-base">
                      {method.brand} •••• {method.last4}
                    </CardTitle>
                    <CardDescription>
                      {method.nickname}
                    </CardDescription>
                  </div>
                </div>
                {method.isDefault && (
                  <Badge variant="default" className="bg-blue-100 text-blue-800">
                    <Star className="w-3 h-3 mr-1" />
                    Default
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Expires {method.expiryMonth?.toString().padStart(2, '0')}/{method.expiryYear}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AddPaymentMethodDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />
    </div>
  );
};

export default PaymentMethodsTab;
