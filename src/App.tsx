
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
          <Route path="/patient-portal" element={<HorizontalLayout><PatientPortal /></HorizontalLayout>} />
          <Route path="/doctor-dashboard" element={<HorizontalLayout><DoctorDashboard /></HorizontalLayout>} />
          <Route path="/pharmacy-dashboard" element={<HorizontalLayout><PharmacyDashboard /></HorizontalLayout>} />
          <Route path="/finance-dashboard" element={<HorizontalLayout><FinanceDashboard /></HorizontalLayout>} />
          <Route path="/billing-dashboard" element={<HorizontalLayout><BillingDashboard /></HorizontalLayout>} />
          <Route path="/payroll-dashboard" element={<HorizontalLayout><PayrollDashboard /></HorizontalLayout>} />
          <Route path="/performance-dashboard" element={<HorizontalLayout><PerformanceDashboard /></HorizontalLayout>} />
          <Route path="/audit-dashboard" element={<HorizontalLayout><AuditDashboard /></HorizontalLayout>} />
          <Route path="/patient-registration" element={<HorizontalLayout><PatientRegistration /></HorizontalLayout>} />
          <Route path="/patient-history" element={<HorizontalLayout><PatientHistory /></HorizontalLayout>} />
          <Route path="/lab-results" element={<HorizontalLayout><LabResults /></HorizontalLayout>} />
          <Route path="/prescription-management" element={<HorizontalLayout><PrescriptionManagement /></HorizontalLayout>} />
          <Route path="/commission-tracking" element={<HorizontalLayout><CommissionTracking /></HorizontalLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
