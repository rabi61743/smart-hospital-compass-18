
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Heart, Calendar, Settings, Bell, Hospital, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import ConsultationSchedulingDialog from "@/components/consultation/ConsultationSchedulingDialog";

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

  const primaryActions = [
    { title: "Main Dashboard", href: "/dashboard", description: "Complete overview", primary: true },
    { title: "Doctor Portal", href: "/doctor-dashboard", description: "Medical staff interface" },
    { title: "Patient Portal", href: "/patient-portal", description: "Patient self-service" }
  ];

  const secondaryActions = [
    { title: "Pharmacy", href: "/pharmacy-dashboard" },
    { title: "Finance", href: "/finance-dashboard" },
    { title: "Commission Tracking", href: "/commission-tracking" }
  ];

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              <Sparkles className="h-3 w-3 mr-1" />
              Next-Generation Hospital Management
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Unified Hospital Management
              <span className="text-blue-600 block">with Integrated Commission Tracking</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Transform your hospital operations with our comprehensive platform that integrates patient care, 
              staff management, commission tracking, and analytics in one powerful system.
            </p>
            
            {/* Enhanced Button Section */}
            <div className="space-y-8">
              {/* Primary Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {primaryActions.map((action, index) => (
                  <Link key={index} to={action.href} className="group">
                    <Card className="h-full transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 hover:border-blue-200 bg-white/80 backdrop-blur-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center justify-between">
                          {action.title}
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </CardTitle>
                        <CardDescription className="text-sm">{action.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Button 
                          className={`w-full ${action.primary 
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800' 
                            : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
                          }`}
                          size="lg"
                        >
                          {action.primary ? 'Get Started' : 'Explore'}
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* Secondary Actions */}
              <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto">
                {secondaryActions.map((action, index) => (
                  <Link key={index} to={action.href}>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="group border-2 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
                    >
                      {action.title}
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-12">
                <div className="text-center p-4 bg-white/60 rounded-lg backdrop-blur-sm">
                  <div className="text-2xl font-bold text-blue-600">50+</div>
                  <div className="text-sm text-gray-600">Modules</div>
                </div>
                <div className="text-center p-4 bg-white/60 rounded-lg backdrop-blur-sm">
                  <div className="text-2xl font-bold text-green-600">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
                <div className="text-center p-4 bg-white/60 rounded-lg backdrop-blur-sm">
                  <div className="text-2xl font-bold text-purple-600">100%</div>
                  <div className="text-sm text-gray-600">Accuracy</div>
                </div>
                <div className="text-center p-4 bg-white/60 rounded-lg backdrop-blur-sm">
                  <div className="text-2xl font-bold text-orange-600">99.9%</div>
                  <div className="text-sm text-gray-600">Uptime</div>
                </div>
              </div>
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
              <ConsultationSchedulingDialog>
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-blue-600">
                  Schedule Consultation
                </Button>
              </ConsultationSchedulingDialog>
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
    </AppLayout>
  );
};

export default Index;
