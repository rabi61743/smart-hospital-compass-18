
import React from 'react';
import { AlertCircle } from "lucide-react";

interface ImportResultsProps {
  results: {
    totalRows: number;
    successful: number;
    failed: number;
    duplicates: number;
    errors: Array<{ row: number; error: string }>;
  };
}

const ImportResults = ({ results }: ImportResultsProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{results.totalRows}</div>
          <div className="text-sm text-blue-600">Total Rows</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{results.successful}</div>
          <div className="text-sm text-green-600">Successful</div>
        </div>
        <div className="text-center p-4 bg-red-50 rounded-lg">
          <div className="text-2xl font-bold text-red-600">{results.failed}</div>
          <div className="text-sm text-red-600">Failed</div>
        </div>
        <div className="text-center p-4 bg-yellow-50 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">{results.duplicates}</div>
          <div className="text-sm text-yellow-600">Duplicates</div>
        </div>
      </div>

      {results.errors.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-500" />
            Import Errors
          </h4>
          <div className="max-h-32 overflow-y-auto space-y-1">
            {results.errors.map((error, index) => (
              <div key={index} className="text-sm p-2 bg-red-50 rounded text-red-700">
                Row {error.row}: {error.error}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImportResults;
