
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import PatientPortal from "./pages/PatientPortal";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientRegistration from "./pages/PatientRegistration";
import PatientHistory from "./pages/PatientHistory";
import LabResults from "./pages/LabResults";
import PrescriptionManagement from "./pages/PrescriptionManagement";
import CommissionTracking from "./pages/CommissionTracking";
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patient-portal" element={<PatientPortal />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/patient-registration" element={<PatientRegistration />} />
          <Route path="/patient-history" element={<PatientHistory />} />
          <Route path="/lab-results" element={<LabResults />} />
          <Route path="/prescription-management" element={<PrescriptionManagement />} />
          <Route path="/commission-tracking" element={<CommissionTracking />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
