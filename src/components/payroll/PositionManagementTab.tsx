
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PositionList from "./PositionList";
import AddPositionDialog from "./AddPositionDialog";

interface Position {
  id: string;
  title: string;
  department: string;
  description: string;
  level: 'Entry' | 'Mid' | 'Senior' | 'Lead' | 'Manager' | 'Director' | 'VP' | 'C-Level';
  reportsTo: string;
  minSalary: number;
  maxSalary: number;
  responsibilities: string[];
  requirements: string[];
  employeeCount: number;
  status: 'Active' | 'Inactive';
}

const PositionManagementTab = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [positions, setPositions] = useState<Position[]>([
    {
      id: 'POS001',
      title: 'Senior Cardiologist',
      department: 'Cardiology',
      description: 'Lead cardiologist responsible for complex cardiac procedures',
      level: 'Senior',
      reportsTo: 'Department Head - Cardiology',
      minSalary: 150000,
      maxSalary: 200000,
      responsibilities: ['Perform cardiac procedures', 'Lead cardiac team', 'Patient consultations'],
      requirements: ['MD in Cardiology', '10+ years experience', 'Board certification'],
      employeeCount: 3,
      status: 'Active'
    },
    {
      id: 'POS002',
      title: 'Head Nurse',
      department: 'General Medicine',
      description: 'Senior nursing position overseeing patient care coordination',
      level: 'Lead',
      reportsTo: 'Department Manager - General Medicine',
      minSalary: 55000,
      maxSalary: 70000,
      responsibilities: ['Supervise nursing staff', 'Patient care coordination', 'Staff scheduling'],
      requirements: ['BSN degree', '5+ years nursing experience', 'Leadership experience'],
      employeeCount: 2,
      status: 'Active'
    },
    {
      id: 'POS003',
      title: 'Emergency Physician',
      department: 'Emergency',
      description: 'Emergency room physician handling critical care cases',
      level: 'Senior',
      reportsTo: 'Emergency Department Director',
      minSalary: 120000,
      maxSalary: 160000,
      responsibilities: ['Emergency patient care', 'Trauma response', 'Critical decision making'],
      requirements: ['MD in Emergency Medicine', 'Emergency medicine residency', 'ACLS certification'],
      employeeCount: 4,
      status: 'Active'
    },
    {
      id: 'POS004',
      title: 'Lab Technician',
      department: 'Laboratory',
      description: 'Medical laboratory technician for diagnostic testing',
      level: 'Mid',
      reportsTo: 'Laboratory Supervisor',
      minSalary: 35000,
      maxSalary: 45000,
      responsibilities: ['Conduct lab tests', 'Equipment maintenance', 'Quality control'],
      requirements: ['Associates degree in Medical Technology', '2+ years lab experience', 'Certification'],
      employeeCount: 5,
      status: 'Active'
    },
    {
      id: 'POS005',
      title: 'Pharmacist',
      department: 'Pharmacy',
      description: 'Licensed pharmacist for medication dispensing and consultation',
      level: 'Senior',
      reportsTo: 'Pharmacy Manager',
      minSalary: 80000,
      maxSalary: 100000,
      responsibilities: ['Medication dispensing', 'Patient counseling', 'Drug interaction checks'],
      requirements: ['PharmD degree', 'State pharmacy license', '3+ years experience'],
      employeeCount: 2,
      status: 'Active'
    }
  ]);

  const handleAddPosition = (newPosition: Omit<Position, 'id'>) => {
    const position: Position = {
      ...newPosition,
      id: `POS${String(positions.length + 1).padStart(3, '0')}`
    };
    setPositions([...positions, position]);
  };

  const handleEditPosition = (updatedPosition: Position) => {
    setPositions(positions.map(pos => 
      pos.id === updatedPosition.id ? updatedPosition : pos
    ));
  };

  const handleDeletePosition = (positionId: string) => {
    setPositions(positions.filter(pos => pos.id !== positionId));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Position Management</CardTitle>
              <CardDescription>Define job positions, hierarchy, and reporting relationships</CardDescription>
            </div>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Position
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <PositionList
            positions={positions}
            onEdit={handleEditPosition}
            onDelete={handleDeletePosition}
          />
        </CardContent>
      </Card>

      <AddPositionDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAdd={handleAddPosition}
      />
    </div>
  );
};

export default PositionManagementTab;
