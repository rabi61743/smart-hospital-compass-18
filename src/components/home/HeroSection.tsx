
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
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
  );
};

export default HeroSection;
