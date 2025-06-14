
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PatientWelcomeSection = () => {
  return (
    <div className="mb-8 text-center">
      <div className="flex justify-center mb-4">
        <Avatar className="w-20 h-20">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback className="text-xl">JP</AvatarFallback>
        </Avatar>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John Doe</h1>
      <p className="text-gray-600">Patient ID: PAT001 | Member since 2022</p>
    </div>
  );
};

export default PatientWelcomeSection;
