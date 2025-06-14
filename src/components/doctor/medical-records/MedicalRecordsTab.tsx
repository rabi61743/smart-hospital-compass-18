
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ElectronicHealthRecords from './ElectronicHealthRecords';
import PrescriptionWriter from './PrescriptionWriter';
import MedicalImagingViewer from './MedicalImagingViewer';
import ClinicalNotesTemplates from './ClinicalNotesTemplates';
import ClinicalDecisionSupport from './ClinicalDecisionSupport';

const MedicalRecordsTab = () => {
  return (
    <Tabs defaultValue="ehr" className="space-y-6">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="ehr">EHR</TabsTrigger>
        <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
        <TabsTrigger value="imaging">Medical Imaging</TabsTrigger>
        <TabsTrigger value="notes">Clinical Notes</TabsTrigger>
        <TabsTrigger value="decision-support">Clinical Support</TabsTrigger>
      </TabsList>

      <TabsContent value="ehr" className="space-y-6">
        <ElectronicHealthRecords />
      </TabsContent>

      <TabsContent value="prescriptions" className="space-y-6">
        <PrescriptionWriter />
      </TabsContent>

      <TabsContent value="imaging" className="space-y-6">
        <MedicalImagingViewer />
      </TabsContent>

      <TabsContent value="notes" className="space-y-6">
        <ClinicalNotesTemplates />
      </TabsContent>

      <TabsContent value="decision-support" className="space-y-6">
        <ClinicalDecisionSupport />
      </TabsContent>
    </Tabs>
  );
};

export default MedicalRecordsTab;
