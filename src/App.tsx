
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
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
          <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/patient-portal" element={<AppLayout><PatientPortal /></AppLayout>} />
          <Route path="/doctor-dashboard" element={<AppLayout><DoctorDashboard /></AppLayout>} />
          <Route path="/pharmacy-dashboard" element={<AppLayout><PharmacyDashboard /></AppLayout>} />
          <Route path="/finance-dashboard" element={<AppLayout><FinanceDashboard /></AppLayout>} />
          <Route path="/billing-dashboard" element={<AppLayout><BillingDashboard /></AppLayout>} />
          <Route path="/payroll-dashboard" element={<AppLayout><PayrollDashboard /></AppLayout>} />
          <Route path="/performance-dashboard" element={<AppLayout><PerformanceDashboard /></AppLayout>} />
          <Route path="/audit-dashboard" element={<AppLayout><AuditDashboard /></AppLayout>} />
          <Route path="/patient-registration" element={<AppLayout><PatientRegistration /></AppLayout>} />
          <Route path="/patient-history" element={<AppLayout><PatientHistory /></AppLayout>} />
          <Route path="/lab-results" element={<AppLayout><LabResults /></AppLayout>} />
          <Route path="/prescription-management" element={<AppLayout><PrescriptionManagement /></AppLayout>} />
          <Route path="/commission-tracking" element={<AppLayout><CommissionTracking /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
