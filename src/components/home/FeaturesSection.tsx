
import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Heart, Calendar, Settings, Bell, Hospital } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Hospital className="h-8 w-8" />,
      title: "Complete Patient Management",
      description: "Digital patient records, appointment scheduling, and comprehensive medical history tracking"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Multi-Role Dashboard",
      description: "Customized interfaces for doctors, administrators, patients, and staff with role-based access"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Integrated Commission Tracking",
      description: "Real-time commission calculations for doctors, agents, and departments with flexible rules"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Smart Scheduling",
      description: "Automated appointment booking with conflict detection and patient reminders"
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Analytics & Reporting",
      description: "Comprehensive dashboards for revenue tracking, patient flow, and performance metrics"
    },
    {
      icon: <Bell className="h-8 w-8" />,
      title: "Automated Notifications",
      description: "SMS, email, and WhatsApp notifications for appointments, results, and reminders"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Comprehensive Healthcare Solutions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow bg-white">
              <CardHeader>
                <div className="text-blue-600 mb-3">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
