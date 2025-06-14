
import React, { useState } from 'react';
import ShiftTemplatesTable from './ShiftTemplatesTable';
import WeeklyScheduleTable from './WeeklyScheduleTable';

const ShiftManagement = () => {
  const [selectedWeek, setSelectedWeek] = useState('current');

  const shifts = [
    {
      id: 'SHIFT001',
      name: 'Morning Shift',
      startTime: '08:00',
      endTime: '16:00',
      department: 'Cardiology',
      employeesAssigned: 12,
      maxCapacity: 15,
      status: 'Active'
    },
    {
      id: 'SHIFT002',
      name: 'Evening Shift',
      startTime: '16:00',
      endTime: '00:00',
      department: 'Emergency',
      employeesAssigned: 18,
      maxCapacity: 20,
      status: 'Active'
    },
    {
      id: 'SHIFT003',
      name: 'Night Shift',
      startTime: '00:00',
      endTime: '08:00',
      department: 'General Medicine',
      employeesAssigned: 8,
      maxCapacity: 10,
      status: 'Active'
    },
    {
      id: 'SHIFT004',
      name: 'Weekend Shift',
      startTime: '10:00',
      endTime: '18:00',
      department: 'Laboratory',
      employeesAssigned: 5,
      maxCapacity: 8,
      status: 'Active'
    }
  ];

  const weeklySchedule = [
    {
      employee: 'Dr. Sarah Johnson',
      monday: 'Morning',
      tuesday: 'Morning',
      wednesday: 'Morning',
      thursday: 'Morning',
      friday: 'Morning',
      saturday: 'Off',
      sunday: 'Off'
    },
    {
      employee: 'Nurse Mary Wilson',
      monday: 'Evening',
      tuesday: 'Evening',
      wednesday: 'Off',
      thursday: 'Evening',
      friday: 'Evening',
      saturday: 'Weekend',
      sunday: 'Weekend'
    },
    {
      employee: 'Dr. Michael Chen',
      monday: 'Night',
      tuesday: 'Night',
      wednesday: 'Night',
      thursday: 'Night',
      friday: 'Night',
      saturday: 'Off',
      sunday: 'Off'
    }
  ];

  return (
    <div className="space-y-6">
      <ShiftTemplatesTable shifts={shifts} />
      <WeeklyScheduleTable 
        weeklySchedule={weeklySchedule}
        selectedWeek={selectedWeek}
        onWeekChange={setSelectedWeek}
      />
    </div>
  );
};

export default ShiftManagement;
