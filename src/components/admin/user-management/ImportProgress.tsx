
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface ImportProgressProps {
  progress: number;
}

const ImportProgress = ({ progress }: ImportProgressProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Processing...</span>
        <span className="text-sm text-muted-foreground">{progress}%</span>
      </div>
      <Progress value={progress} className="w-full" />
    </div>
  );
};

export default ImportProgress;
