
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const PatientBillingSummary = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing & Payments</CardTitle>
        <CardDescription>Manage your medical bills and payment history</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Outstanding Bills</h4>
            <p className="text-3xl font-bold text-green-600">₹0</p>
            <p className="text-sm text-green-700">All Clear!</p>
          </div>
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">This Month</h4>
            <p className="text-3xl font-bold text-blue-600">₹2,450</p>
            <p className="text-sm text-blue-700">Total Spent</p>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-purple-900 mb-2">Insurance Covered</h4>
            <p className="text-3xl font-bold text-purple-600">₹1,850</p>
            <p className="text-sm text-purple-700">75% Coverage</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientBillingSummary;
