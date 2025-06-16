
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HorizontalLayout } from "./components/layout/HorizontalLayout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PatientPortal from "./pages/PatientPortal";
import DoctorDashboard from "./pages/DoctorDashboard";
import PharmacyDashboard from "./pages/PharmacyDashboard";
import FinanceDashboard from "./pages/FinanceDashboard";
import BillingDashboard from "./pages/BillingDashboard";
import PayrollDashboard from "./pages/PayrollDashboard";
import PatientRegistration from "./pages/PatientRegistration";
import PatientHistory from "./pages/PatientHistory";
import LabResults from "./pages/LabResults";
import PrescriptionManagement from "./pages/PrescriptionManagement";
import CommissionTracking from "./pages/CommissionTracking";
import PerformanceDashboard from "./pages/PerformanceDashboard";
import AuditDashboard from "./pages/AuditDashboard";
import AdminPermissionManagement from "./pages/AdminPermissionManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<HorizontalLayout><Dashboard /></HorizontalLayout>} />
          <Route path="/admin-dashboard" element={<HorizontalLayout><AdminDashboard /></HorizontalLayout>} />
          <Route path="/admin/permissions" element={<HorizontalLayout><AdminPermissionManagement /></HorizontalLayout>} />
          <Route path="/admin/users" element={<HorizontalLayout><div className="p-6"><h1 className="text-2xl font-bold">User Accounts</h1><p className="text-gray-600">User management coming soon...</p></div></HorizontalLayout>} />
          <Route path="/admin/roles" element={<HorizontalLayout><div className="p-6"><h1 className="text-2xl font-bold">Role Management</h1><p className="text-gray-600">Role management coming soon...</p></div></HorizontalLayout>} />
          <Route path="/admin/settings" element={<HorizontalLayout><div className="p-6"><h1 className="text-2xl font-bold">Global Settings</h1><p className="text-gray-600">Settings coming soon...</p></div></HorizontalLayout>} />
          <Route path="/admin/modules" element={<HorizontalLayout><div className="p-6"><h1 className="text-2xl font-bold">Module Management</h1><p className="text-gray-600">Module management coming soon...</p></div></HorizontalLayout>} />
          <Route path="/admin/integrations/apis" element={<HorizontalLayout><div className="p-6"><h1 className="text-2xl font-bold">API Management</h1><p className="text-gray-600">API management coming soon...</p></div></HorizontalLayout>} />
          <Route path="/admin/integrations/third-party" element={<HorizontalLayout><div className="p-6"><h1 className="text-2xl font-bold">Third-party Services</h1><p className="text-gray-600">Third-party integrations coming soon...</p></div></HorizontalLayout>} />
          <Route path="/admin/security/logs" element={<HorizontalLayout><div className="p-6"><h1 className="text-2xl font-bold">Security Logs</h1><p className="text-gray-600">Security logs coming soon...</p></div></HorizontalLayout>} />
          <Route path="/admin/compliance" element={<HorizontalLayout><div className="p-6"><h1 className="text-2xl font-bold">Compliance Management</h1><p className="text-gray-600">Compliance management coming soon...</p></div></HorizontalLayout>} />
          <Route path="/patient-portal" element={<HorizontalLayout><PatientPortal /></HorizontalLayout>} />
          <Route path="/doctor-dashboard" element={<HorizontalLayout><DoctorDashboard /></HorizontalLayout>} />
          <Route path="/pharmacy-dashboard" element={<HorizontalLayout><PharmacyDashboard /></HorizontalLayout>} />
          <Route path="/pharmacy/inventory/stock" element={<HorizontalLayout><div className="p-6"><h1 className="text-2xl font-bold">Stock Management</h1><p className="text-gray-600">Stock management coming soon...</p></div></HorizontalLayout>} />
          <Route path="/pharmacy/inventory/orders" element={<HorizontalLayout><div className="p-6"><h1 className="text-2xl font-bold">Purchase Orders</h1><p className="text-gray-600">Purchase orders coming soon...</p></div></HorizontalLayout>} />
          <Route path="/finance-dashboard" element={<HorizontalLayout><FinanceDashboard /></HorizontalLayout>} />
          <Route path="/billing-dashboard" element={<HorizontalLayout><BillingDashboard /></HorizontalLayout>} />
          <Route path="/billing/insurance/claims" element={<HorizontalLayout><div className="p-6"><h1 className="text-2xl font-bold">Manage Claims</h1><p className="text-gray-600">Insurance claims management coming soon...</p></div></HorizontalLayout>} />
          <Route path="/billing/insurance/verification" element={<HorizontalLayout><div className="p-6"><h1 className="text-2xl font-bold">Insurance Verification</h1><p className="text-gray-600">Insurance verification coming soon...</p></div></HorizontalLayout>} />
          <Route path="/payroll-dashboard" element={<HorizontalLayout><PayrollDashboard /></HorizontalLayout>} />
          <Route path="/performance-dashboard" element={<HorizontalLayout><PerformanceDashboard /></HorizontalLayout>} />
          <Route path="/staff/directory" element={<HorizontalLayout><div className="p-6"><h1 className="text-2xl font-bold">Staff Directory</h1><p className="text-gray-600">Staff directory coming soon...</p></div></HorizontalLayout>} />
          <Route path="/staff/scheduling" element={<HorizontalLayout><div className="p-6"><h1 className="text-2xl font-bold">Staff Scheduling</h1><p className="text-gray-600">Staff scheduling coming soon...</p></div></HorizontalLayout>} />
          <Route path="/staff/training/programs" element={<HorizontalLayout><div className="p-6"><h1 className="text-2xl font-bold">Training Programs</h1><p className="text-gray-600">Training programs coming soon...</p></div></HorizontalLayout>} />
          <Route path="/staff/training/certifications" element={<HorizontalLayout><div className="p-6"><h1 className="text-2xl font-bold">Certifications</h1><p className="text-gray-600">Certifications coming soon...</p></div></HorizontalLayout>} />
          <Route path="/audit-dashboard" element={<HorizontalLayout><AuditDashboard /></HorizontalLayout>} />
          <Route path="/patient-registration" element={<HorizontalLayout><PatientRegistration /></HorizontalLayout>} />
          <Route path="/patient-history" element={<HorizontalLayout><PatientHistory /></HorizontalLayout>} />
          <Route path="/ehr" element={<HorizontalLayout><div className="p-6"><h1 className="text-2xl font-bold">Electronic Health Records</h1><p className="text-gray-600">EHR system coming soon...</p></div></HorizontalLayout>} />
          <Route path="/lab-results" element={<HorizontalLayout><LabResults /></HorizontalLayout>} />
          <Route path="/imaging/xrays" element={<HorizontalLayout><div className="p-6"><h1 className="text-2xl font-bold">X-Rays</h1><p className="text-gray-600">X-ray imaging coming soon...</p></div></HorizontalLayout>} />
          <Route path="/imaging/mri" element={<HorizontalLayout><div className="p-6"><h1 className="text-2xl font-bold">MRI Scans</h1><p className="text-gray-600">MRI imaging coming soon...</p></div></HorizontalLayout>} />
          <Route path="/imaging/ct" element={<HorizontalLayout><div className="p-6"><h1 className="text-2xl font-bold">CT Scans</h1><p className="text-gray-600">CT imaging coming soon...</p></div></HorizontalLayout>} />
          <Route path="/prescription-management" element={<HorizontalLayout><PrescriptionManagement /></HorizontalLayout>} />
          <Route path="/commission-tracking" element={<HorizontalLayout><CommissionTracking /></HorizontalLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
