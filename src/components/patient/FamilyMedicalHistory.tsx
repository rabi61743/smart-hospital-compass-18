
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FamilyHistorySummary from './family-history/FamilyHistorySummary';
import FamilyTreeTable from './family-history/FamilyTreeTable';
import GeneticRisksTab from './family-history/GeneticRisksTab';
import ScreeningScheduleTab from './family-history/ScreeningScheduleTab';
import FamilyHealthReportsTab from './family-history/FamilyHealthReportsTab';
import AddFamilyMemberDialog from './family-history/AddFamilyMemberDialog';

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  age?: number;
  isDeceased: boolean;
  ageAtDeath?: number;
  causeOfDeath?: string;
  medicalConditions: string[];
  geneticFactors: string[];
  lifestyle: {
    smoking: boolean;
    alcohol: boolean;
    exercise: string;
  };
}

interface GeneticRisk {
  condition: string;
  riskLevel: 'low' | 'moderate' | 'high';
  inheritancePattern: string;
  recommendedScreening: string[];
  notes?: string;
}

const FamilyMedicalHistory = () => {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: '1',
      name: 'Rajesh Kumar Sr.',
      relationship: 'Father',
      age: 68,
      isDeceased: false,
      medicalConditions: ['Hypertension', 'Diabetes Type 2'],
      geneticFactors: ['High cholesterol'],
      lifestyle: {
        smoking: true,
        alcohol: false,
        exercise: 'minimal'
      }
    },
    {
      id: '2',
      name: 'Sunita Kumar',
      relationship: 'Mother',
      age: 63,
      isDeceased: false,
      medicalConditions: ['Osteoporosis'],
      geneticFactors: ['Breast cancer gene'],
      lifestyle: {
        smoking: false,
        alcohol: false,
        exercise: 'regular'
      }
    },
    {
      id: '3',
      name: 'Ramesh Kumar',
      relationship: 'Paternal Grandfather',
      isDeceased: true,
      ageAtDeath: 72,
      causeOfDeath: 'Heart attack',
      medicalConditions: ['Coronary artery disease', 'Diabetes'],
      geneticFactors: ['Cardiovascular disease'],
      lifestyle: {
        smoking: true,
        alcohol: true,
        exercise: 'minimal'
      }
    }
  ]);

  const [geneticRisks] = useState<GeneticRisk[]>([
    {
      condition: 'Cardiovascular Disease',
      riskLevel: 'moderate',
      inheritancePattern: 'Multifactorial',
      recommendedScreening: ['Annual ECG', 'Lipid profile every 6 months', 'Blood pressure monitoring'],
      notes: 'Family history of heart disease on paternal side'
    },
    {
      condition: 'Type 2 Diabetes',
      riskLevel: 'high',
      inheritancePattern: 'Multifactorial',
      recommendedScreening: ['HbA1c every 6 months', 'Glucose tolerance test annually'],
      notes: 'Both paternal grandfather and father have diabetes'
    },
    {
      condition: 'Breast Cancer',
      riskLevel: 'moderate',
      inheritancePattern: 'Autosomal dominant',
      recommendedScreening: ['Annual mammography from age 40', 'Genetic counseling'],
      notes: 'Maternal history - consider genetic testing'
    }
  ]);

  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMember, setNewMember] = useState<Partial<FamilyMember>>({
    name: '',
    relationship: '',
    isDeceased: false,
    medicalConditions: [],
    geneticFactors: [],
    lifestyle: {
      smoking: false,
      alcohol: false,
      exercise: 'moderate'
    }
  });

  const handleAddMember = () => {
    if (newMember.name && newMember.relationship) {
      const member: FamilyMember = {
        id: Date.now().toString(),
        name: newMember.name,
        relationship: newMember.relationship,
        age: newMember.age,
        isDeceased: newMember.isDeceased || false,
        ageAtDeath: newMember.ageAtDeath,
        causeOfDeath: newMember.causeOfDeath,
        medicalConditions: newMember.medicalConditions || [],
        geneticFactors: newMember.geneticFactors || [],
        lifestyle: newMember.lifestyle || {
          smoking: false,
          alcohol: false,
          exercise: 'moderate'
        }
      };
      setFamilyMembers(prev => [...prev, member]);
      setNewMember({
        name: '',
        relationship: '',
        isDeceased: false,
        medicalConditions: [],
        geneticFactors: [],
        lifestyle: {
          smoking: false,
          alcohol: false,
          exercise: 'moderate'
        }
      });
      setIsAddingMember(false);
    }
  };

  const deleteMember = (id: string) => {
    setFamilyMembers(prev => prev.filter(member => member.id !== id));
  };

  const highRiskCount = geneticRisks.filter(r => r.riskLevel === 'high').length;

  return (
    <div className="space-y-6">
      <FamilyHistorySummary 
        familyMembersCount={familyMembers.length}
        geneticRisksCount={geneticRisks.length}
        highRiskCount={highRiskCount}
      />

      <Tabs defaultValue="family-tree" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="family-tree">Family Tree</TabsTrigger>
            <TabsTrigger value="genetic-risks">Genetic Risks</TabsTrigger>
            <TabsTrigger value="screening">Screening Schedule</TabsTrigger>
            <TabsTrigger value="reports">Health Reports</TabsTrigger>
          </TabsList>
          <AddFamilyMemberDialog
            isOpen={isAddingMember}
            onOpenChange={setIsAddingMember}
            newMember={newMember}
            setNewMember={setNewMember}
            onAddMember={handleAddMember}
          />
        </div>

        <TabsContent value="family-tree" className="space-y-4">
          <FamilyTreeTable 
            familyMembers={familyMembers}
            onDeleteMember={deleteMember}
          />
        </TabsContent>

        <TabsContent value="genetic-risks" className="space-y-4">
          <GeneticRisksTab geneticRisks={geneticRisks} />
        </TabsContent>

        <TabsContent value="screening" className="space-y-4">
          <ScreeningScheduleTab />
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <FamilyHealthReportsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FamilyMedicalHistory;
