
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Heart, Calendar, Settings, Bell, Hospital } from "lucide-react";
import { Link } from "react-router-dom";
import { HorizontalLayout } from "@/components/layout/HorizontalLayout";

const Index = () => {
  const features = [{
    icon: <Hospital className="h-8 w-8" />,
    title: "Complete Patient Management",
    description: "Digital patient records, appointment scheduling, and comprehensive medical history tracking"
  }, {
    icon: <Users className="h-8 w-8" />,
    title: "Multi-Role Dashboard",
    description: "Customized interfaces for doctors, administrators, patients, and staff with role-based access"
  }, {
    icon: <Heart className="h-8 w-8" />,
    title: "Integrated Commission Tracking",
    description: "Real-time commission calculations for doctors, agents, and departments with flexible rules"
  }, {
    icon: <Calendar className="h-8 w-8" />,
    title: "Smart Scheduling",
    description: "Automated appointment booking with conflict detection and patient reminders"
  }, {
    icon: <Settings className="h-8 w-8" />,
    title: "Analytics & Reporting",
    description: "Comprehensive dashboards for revenue tracking, patient flow, and performance metrics"
  }, {
    icon: <Bell className="h-8 w-8" />,
    title: "Automated Notifications",
    description: "SMS, email, and WhatsApp notifications for appointments, results, and reminders"
  }];

  const userTypes = [{
    name: "Hospital Admin",
    color: "bg-blue-500",
    users: "Administrators, Finance Teams"
  }, {
    name: "Medical Staff",
    color: "bg-green-500",
    users: "Doctors, Nurses, Lab Technicians"
  }, {
    name: "Patients",
    color: "bg-purple-500",
    users: "Patients, Family Members"
  }, {
    name: "Partners",
    color: "bg-orange-500",
    users: "Insurance, Labs, Pharmacies"
  }];

  return (
    <HorizontalLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Next-Generation Hospital Management
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Unified Hospital Management
              <span className="text-blue-600 block">with Integrated Commission Tracking</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your hospital operations with our comprehensive platform that integrates patient care, 
              staff management, commission tracking, and analytics in one powerful system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="w-full sm:w-auto">
                  Explore Dashboard
                </Button>
              </Link>
              <Link to="/doctor-dashboard">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Doctor Portal
                </Button>
              </Link>
              <Link to="/pharmacy-dashboard">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Pharmacy Portal
                </Button>
              </Link>
              <Link to="/finance-dashboard">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Finance Portal
                </Button>
              </Link>
              <Link to="/commission-tracking">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Commission Tracking
                </Button>
              </Link>
              <Link to="/patient-portal">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Patient Portal
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* User Types */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Designed for Every Stakeholder
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {userTypes.map((type, index) => <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`w-12 h-12 ${type.color} rounded-lg flex items-center justify-center mb-3`}>
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{type.name}</CardTitle>
                    <CardDescription>{type.users}</CardDescription>
                  </CardHeader>
                </Card>)}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Comprehensive Healthcare Solutions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => <Card key={index} className="hover:shadow-lg transition-shadow bg-white">
                  <CardHeader>
                    <div className="text-blue-600 mb-3">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>)}
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
                <div className="text-gray-600">Commission Accuracy</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
                <div className="text-gray-600">Integrated Modules</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
                <div className="text-gray-600">System Availability</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-600 mb-2">99.9%</div>
                <div className="text-gray-600">Uptime Guarantee</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-green-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Hospital?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join leading hospitals worldwide in delivering exceptional patient care with intelligent management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  View Live Demo
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-blue-600">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Hospital className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">MediFlow HMS</span>
            </div>
            <p className="text-gray-400">
              Empowering healthcare institutions with intelligent management solutions.
            </p>
          </div>
        </footer>
      </div>
    </HorizontalLayout>
  );
};

export default Index;
