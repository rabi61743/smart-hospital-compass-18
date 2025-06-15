
import React from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import HeroSection from "@/components/home/HeroSection";
import UserTypesSection from "@/components/home/UserTypesSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import StatisticsSection from "@/components/home/StatisticsSection";
import CTASection from "@/components/home/CTASection";
import FooterSection from "@/components/home/FooterSection";

const Index = () => {
  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <HeroSection />
        <UserTypesSection />
        <FeaturesSection />
        <StatisticsSection />
        <CTASection />
        <FooterSection />
      </div>
    </AppLayout>
  );
};

export default Index;
