
import React from 'react';
import AttendanceStatsCards from './AttendanceStatsCards';
import TodayAttendanceTable from './TodayAttendanceTable';

const AttendanceOverview = () => {
  const todayAttendance = [
    {
      id: 'EMP001',
      name: 'Dr. Sarah Johnson',
      department: 'Cardiology',
      clockIn: '08:45 AM',
      clockOut: null,
      status: 'Present',
      hoursWorked: 7.25,
      isLate: false
    },
    {
      id: 'EMP002',
      name: 'Nurse Mary Wilson',
      department: 'General Medicine',
      clockIn: '09:15 AM',
      clockOut: null,
      status: 'Present',
      hoursWorked: 6.75,
      isLate: true
    },
    {
      id: 'EMP003',
      name: 'Dr. Michael Chen',
      department: 'Emergency',
      clockIn: '07:30 AM',
      clockOut: '04:00 PM',
      status: 'Completed',
      hoursWorked: 8.5,
      isLate: false
    },
    {
      id: 'EMP004',
      name: 'Lab Tech John Smith',
      department: 'Laboratory',
      clockIn: null,
      clockOut: null,
      status: 'Absent',
      hoursWorked: 0,
      isLate: false
    },
    {
      id: 'EMP005',
      name: 'Pharmacy Tech Lisa Davis',
      department: 'Pharmacy',
      clockIn: '08:55 AM',
      clockOut: null,
      status: 'On Break',
      hoursWorked: 6.0,
      isLate: false
    }
  ];

  const attendanceStats = {
    totalEmployees: 124,
    present: 89,
    absent: 12,
    late: 23,
    onLeave: 11
  };

  return (
    <div className="space-y-6">
      <AttendanceStatsCards attendanceStats={attendanceStats} />
      <TodayAttendanceTable todayAttendance={todayAttendance} />
    </div>
  );
};

export default AttendanceOverview;
