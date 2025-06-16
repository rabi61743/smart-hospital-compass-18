
import { NavigationItem } from "@/types/navigation";

export const NAVIGATION_SCHEMA: NavigationItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: "LayoutDashboard",
    requiredRoles: ["*"], // All roles
    metadata: { order: 1 }
  },
  {
    id: "clinical",
    label: "Clinical Operations",
    icon: "Stethoscope",
    requiredRoles: ["doctor", "nurse", "admin", "super-admin"],
    children: [
      {
        id: "clinical.doctor",
        label: "Doctor Portal",
        path: "/doctor-dashboard",
        icon: "UserCheck",
        requiredRoles: ["doctor", "admin", "super-admin"]
      },
      {
        id: "clinical.patients",
        label: "Patient Management",
        icon: "Users",
        requiredRoles: ["doctor", "nurse", "admin", "super-admin"],
        children: [
          {
            id: "clinical.patients.portal",
            label: "Patient Portal",
            path: "/patient-portal",
            requiredRoles: ["doctor", "nurse", "admin", "super-admin"]
          },
          {
            id: "clinical.patients.registration",
            label: "Patient Registration",
            path: "/patient-registration",
            requiredRoles: ["nurse", "admin", "super-admin"]
          },
          {
            id: "clinical.patients.history",
            label: "Patient History",
            path: "/patient-history",
            requiredRoles: ["doctor", "nurse", "admin", "super-admin"]
          },
          {
            id: "clinical.patients.medical-records",
            label: "Medical Records",
            requiredRoles: ["doctor", "admin", "super-admin"],
            children: [
              {
                id: "clinical.patients.medical-records.ehr",
                label: "Electronic Health Records",
                path: "/ehr",
                requiredRoles: ["doctor", "admin", "super-admin"]
              },
              {
                id: "clinical.patients.medical-records.lab-results",
                label: "Lab Results",
                path: "/lab-results",
                requiredRoles: ["doctor", "lab-tech", "admin", "super-admin"]
              },
              {
                id: "clinical.patients.medical-records.imaging",
                label: "Medical Imaging",
                requiredRoles: ["doctor", "radiologist", "admin", "super-admin"],
                children: [
                  {
                    id: "clinical.patients.medical-records.imaging.xrays",
                    label: "X-Rays",
                    path: "/imaging/xrays",
                    requiredRoles: ["doctor", "radiologist", "admin", "super-admin"]
                  },
                  {
                    id: "clinical.patients.medical-records.imaging.mri",
                    label: "MRI Scans",
                    path: "/imaging/mri",
                    requiredRoles: ["doctor", "radiologist", "admin", "super-admin"]
                  },
                  {
                    id: "clinical.patients.medical-records.imaging.ct",
                    label: "CT Scans",
                    path: "/imaging/ct",
                    requiredRoles: ["doctor", "radiologist", "admin", "super-admin"]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "clinical.pharmacy",
        label: "Pharmacy",
        icon: "Pill",
        requiredRoles: ["pharmacist", "doctor", "admin", "super-admin"],
        children: [
          {
            id: "clinical.pharmacy.dashboard",
            label: "Pharmacy Dashboard",
            path: "/pharmacy-dashboard",
            requiredRoles: ["pharmacist", "admin", "super-admin"]
          },
          {
            id: "clinical.pharmacy.prescriptions",
            label: "Prescription Management",
            path: "/prescription-management",
            requiredRoles: ["pharmacist", "doctor", "admin", "super-admin"]
          },
          {
            id: "clinical.pharmacy.inventory",
            label: "Drug Inventory",
            requiredRoles: ["pharmacist", "admin", "super-admin"],
            children: [
              {
                id: "clinical.pharmacy.inventory.stock",
                label: "Stock Management",
                path: "/pharmacy/inventory/stock",
                requiredRoles: ["pharmacist", "admin", "super-admin"]
              },
              {
                id: "clinical.pharmacy.inventory.orders",
                label: "Purchase Orders",
                path: "/pharmacy/inventory/orders",
                requiredRoles: ["pharmacist", "admin", "super-admin"]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "financial",
    label: "Financial Management",
    icon: "DollarSign",
    requiredRoles: ["finance", "admin", "super-admin"],
    children: [
      {
        id: "financial.dashboard",
        label: "Finance Dashboard",
        path: "/finance-dashboard",
        requiredRoles: ["finance", "admin", "super-admin"]
      },
      {
        id: "financial.billing",
        label: "Billing & Payments",
        icon: "Receipt",
        requiredRoles: ["finance", "billing", "admin", "super-admin"],
        children: [
          {
            id: "financial.billing.dashboard",
            label: "Billing Dashboard",
            path: "/billing-dashboard",
            requiredRoles: ["finance", "billing", "admin", "super-admin"]
          },
          {
            id: "financial.billing.insurance",
            label: "Insurance Claims",
            requiredRoles: ["finance", "billing", "admin", "super-admin"],
            children: [
              {
                id: "financial.billing.insurance.claims",
                label: "Manage Claims",
                path: "/billing/insurance/claims",
                requiredRoles: ["finance", "billing", "admin", "super-admin"]
              },
              {
                id: "financial.billing.insurance.verification",
                label: "Insurance Verification",
                path: "/billing/insurance/verification",
                requiredRoles: ["finance", "billing", "admin", "super-admin"]
              }
            ]
          }
        ]
      },
      {
        id: "financial.commissions",
        label: "Commission Tracking",
        path: "/commission-tracking",
        icon: "TrendingUp",
        requiredRoles: ["finance", "admin", "super-admin"]
      },
      {
        id: "financial.payroll",
        label: "Payroll Management",
        path: "/payroll-dashboard",
        icon: "Users",
        requiredRoles: ["hr", "finance", "admin", "super-admin"]
      }
    ]
  },
  {
    id: "operations",
    label: "Operations & HR",
    icon: "Building",
    requiredRoles: ["hr", "admin", "super-admin"],
    children: [
      {
        id: "operations.performance",
        label: "Performance Dashboard",
        path: "/performance-dashboard",
        requiredRoles: ["hr", "admin", "super-admin"]
      },
      {
        id: "operations.staff",
        label: "Staff Management",
        requiredRoles: ["hr", "admin", "super-admin"],
        children: [
          {
            id: "operations.staff.directory",
            label: "Staff Directory",
            path: "/staff/directory",
            requiredRoles: ["hr", "admin", "super-admin"]
          },
          {
            id: "operations.staff.scheduling",
            label: "Staff Scheduling",
            path: "/staff/scheduling",
            requiredRoles: ["hr", "admin", "super-admin"]
          },
          {
            id: "operations.staff.training",
            label: "Training & Development",
            requiredRoles: ["hr", "admin", "super-admin"],
            children: [
              {
                id: "operations.staff.training.programs",
                label: "Training Programs",
                path: "/staff/training/programs",
                requiredRoles: ["hr", "admin", "super-admin"]
              },
              {
                id: "operations.staff.training.certifications",
                label: "Certifications",
                path: "/staff/training/certifications",
                requiredRoles: ["hr", "admin", "super-admin"]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "administration",
    label: "System Administration",
    icon: "Shield",
    requiredRoles: ["admin", "super-admin"],
    children: [
      {
        id: "administration.admin-dashboard",
        label: "Admin Dashboard",
        path: "/admin-dashboard",
        requiredRoles: ["admin", "super-admin"]
      },
      {
        id: "administration.users",
        label: "User Management",
        requiredRoles: ["admin", "super-admin"],
        children: [
          {
            id: "administration.users.accounts",
            label: "User Accounts",
            path: "/admin/users",
            requiredRoles: ["admin", "super-admin"]
          },
          {
            id: "administration.users.roles",
            label: "Role Management",
            path: "/admin/roles",
            requiredRoles: ["super-admin"]
          },
          {
            id: "administration.users.permissions",
            label: "Permission Matrix",
            path: "/admin/permissions",
            requiredRoles: ["super-admin"]
          }
        ]
      },
      {
        id: "administration.system",
        label: "System Configuration",
        requiredRoles: ["super-admin"],
        children: [
          {
            id: "administration.system.settings",
            label: "Global Settings",
            path: "/admin/settings",
            requiredRoles: ["super-admin"]
          },
          {
            id: "administration.system.modules",
            label: "Module Management",
            path: "/admin/modules",
            requiredRoles: ["super-admin"]
          },
          {
            id: "administration.system.integrations",
            label: "System Integrations",
            requiredRoles: ["super-admin"],
            children: [
              {
                id: "administration.system.integrations.apis",
                label: "API Management",
                path: "/admin/integrations/apis",
                requiredRoles: ["super-admin"]
              },
              {
                id: "administration.system.integrations.third-party",
                label: "Third-party Services",
                path: "/admin/integrations/third-party",
                requiredRoles: ["super-admin"]
              }
            ]
          }
        ]
      },
      {
        id: "administration.security",
        label: "Security & Compliance",
        requiredRoles: ["super-admin"],
        children: [
          {
            id: "administration.security.audit",
            label: "Audit Dashboard",
            path: "/audit-dashboard",
            requiredRoles: ["super-admin"]
          },
          {
            id: "administration.security.logs",
            label: "Security Logs",
            path: "/admin/security/logs",
            requiredRoles: ["super-admin"]
          },
          {
            id: "administration.security.compliance",
            label: "Compliance Management",
            path: "/admin/compliance",
            requiredRoles: ["super-admin"]
          }
        ]
      }
    ]
  }
];

export const DEFAULT_ROLES = [
  {
    id: "super-admin",
    name: "super-admin",
    displayName: "Super Administrator",
    description: "Full system access with all permissions",
    permissions: ["*"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "admin",
    name: "admin",
    displayName: "Administrator",
    description: "Administrative access to most system functions",
    permissions: ["admin.*", "users.*", "billing.*", "reports.*"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "doctor",
    name: "doctor",
    displayName: "Doctor",
    description: "Clinical staff with patient care responsibilities",
    permissions: ["clinical.*", "patients.*", "medical-records.*"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "nurse",
    name: "nurse",
    displayName: "Nurse",
    description: "Nursing staff with patient care responsibilities",
    permissions: ["clinical.basic", "patients.view", "patients.vitals"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "finance",
    name: "finance",
    displayName: "Finance Staff",
    description: "Financial operations and billing management",
    permissions: ["finance.*", "billing.*", "payroll.*"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "pharmacist",
    name: "pharmacist",
    displayName: "Pharmacist",
    description: "Pharmacy operations and medication management",
    permissions: ["pharmacy.*", "prescriptions.*", "inventory.*"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "hr",
    name: "hr",
    displayName: "Human Resources",
    description: "HR operations and staff management",
    permissions: ["hr.*", "staff.*", "payroll.*"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
