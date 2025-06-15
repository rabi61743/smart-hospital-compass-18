
export const generateUserCSV = (users: any[]) => {
  const headers = ['Name', 'Email', 'Role', 'Department', 'Status', 'Last Login', 'Permissions'];
  const csvRows = [
    headers.join(','),
    ...users.map(user => [
      user.name,
      user.email,
      user.role,
      user.department,
      user.status,
      user.lastLogin,
      user.permissions.join(';')
    ].join(','))
  ];
  return csvRows.join('\n');
};

export const downloadCSV = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const mockUsers = [
  {
    id: 1,
    name: "Dr. Sarah Wilson",
    email: "sarah.wilson@hospital.com",
    role: "Doctor",
    department: "Cardiology",
    status: "Active",
    lastLogin: "2 hours ago",
    permissions: ["Patient Records", "Prescriptions", "Appointments"],
    avatar: "SW"
  },
  {
    id: 2,
    name: "John Anderson",
    email: "john.anderson@hospital.com",
    role: "Admin",
    department: "Administration",
    status: "Active",
    lastLogin: "30 minutes ago",
    permissions: ["Full Access"],
    avatar: "JA"
  },
  {
    id: 3,
    name: "Maria Garcia",
    email: "maria.garcia@hospital.com",
    role: "Nurse",
    department: "Emergency",
    status: "Active",
    lastLogin: "1 hour ago",
    permissions: ["Patient Care", "Medical Records"],
    avatar: "MG"
  },
  {
    id: 4,
    name: "David Chen",
    email: "david.chen@hospital.com",
    role: "Pharmacist",
    department: "Pharmacy",
    status: "Inactive",
    lastLogin: "3 days ago",
    permissions: ["Pharmacy", "Inventory"],
    avatar: "DC"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    email: "lisa.thompson@hospital.com",
    role: "Finance",
    department: "Finance",
    status: "Active",
    lastLogin: "15 minutes ago",
    permissions: ["Billing", "Reports", "Commission"],
    avatar: "LT"
  }
];

export const roles = ["All", "Admin", "Doctor", "Nurse", "Pharmacist", "Finance", "Patient"];
