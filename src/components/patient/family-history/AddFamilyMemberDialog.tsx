
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

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

interface AddFamilyMemberDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newMember: Partial<FamilyMember>;
  setNewMember: (member: Partial<FamilyMember>) => void;
  onAddMember: () => void;
}

const relationships = [
  'Father', 'Mother', 'Brother', 'Sister', 'Son', 'Daughter',
  'Paternal Grandfather', 'Paternal Grandmother', 'Maternal Grandfather', 'Maternal Grandmother',
  'Paternal Uncle', 'Paternal Aunt', 'Maternal Uncle', 'Maternal Aunt',
  'Cousin', 'Other'
];

const AddFamilyMemberDialog = ({
  isOpen,
  onOpenChange,
  newMember,
  setNewMember,
  onAddMember
}: AddFamilyMemberDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Family Member
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Family Member</DialogTitle>
          <DialogDescription>
            Add a family member and their medical history to track genetic risks.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={newMember.name || ''}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              placeholder="Family member name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="relationship">Relationship</Label>
            <Select
              value={newMember.relationship || ''}
              onValueChange={(value) => setNewMember({ ...newMember, relationship: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>
              <SelectContent>
                {relationships.map(rel => (
                  <SelectItem key={rel} value={rel}>{rel}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={newMember.age || ''}
              onChange={(e) => setNewMember({ ...newMember, age: parseInt(e.target.value) })}
              placeholder="Current age"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deceased">Status</Label>
            <Select
              value={newMember.isDeceased ? 'deceased' : 'living'}
              onValueChange={(value) => setNewMember({ ...newMember, isDeceased: value === 'deceased' })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="living">Living</SelectItem>
                <SelectItem value="deceased">Deceased</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {newMember.isDeceased && (
            <>
              <div className="space-y-2">
                <Label htmlFor="ageAtDeath">Age at Death</Label>
                <Input
                  id="ageAtDeath"
                  type="number"
                  value={newMember.ageAtDeath || ''}
                  onChange={(e) => setNewMember({ ...newMember, ageAtDeath: parseInt(e.target.value) })}
                  placeholder="Age at death"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="causeOfDeath">Cause of Death</Label>
                <Input
                  id="causeOfDeath"
                  value={newMember.causeOfDeath || ''}
                  onChange={(e) => setNewMember({ ...newMember, causeOfDeath: e.target.value })}
                  placeholder="Cause of death"
                />
              </div>
            </>
          )}
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onAddMember}>Add Member</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFamilyMemberDialog;
