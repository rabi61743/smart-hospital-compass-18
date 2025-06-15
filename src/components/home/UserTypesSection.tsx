
import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

const UserTypesSection = () => {
  const userTypes = [
    {
      name: "Hospital Admin",
      color: "bg-blue-500",
      users: "Administrators, Finance Teams"
    },
    {
      name: "Medical Staff",
      color: "bg-green-500",
      users: "Doctors, Nurses, Lab Technicians"
    },
    {
      name: "Patients",
      color: "bg-purple-500",
      users: "Patients, Family Members"
    },
    {
      name: "Partners",
      color: "bg-orange-500",
      users: "Insurance, Labs, Pharmacies"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Designed for Every Stakeholder
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {userTypes.map((type, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className={`w-12 h-12 ${type.color} rounded-lg flex items-center justify-center mb-3`}>
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">{type.name}</CardTitle>
                <CardDescription>{type.users}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserTypesSection;
