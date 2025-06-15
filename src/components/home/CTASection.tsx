
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ConsultationSchedulingDialog from "@/components/consultation/ConsultationSchedulingDialog";

const CTASection = () => {
  return (
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
  );
};

export default CTASection;
