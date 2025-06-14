
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Play, Pause, RotateCcw, Settings } from "lucide-react";
import { PayrollRun, PayrollBatch } from '@/types/payrollProcessing';

interface PayrollBatchProcessorProps {
  payrollRuns: PayrollRun[];
  onBatchProcessed: () => void;
}

const PayrollBatchProcessor = ({ payrollRuns, onBatchProcessed }: PayrollBatchProcessorProps) => {
  const [selectedRun, setSelectedRun] = useState<string>('');
  const [batchSize, setBatchSize] = useState('10');
  const [processingOptions, setProcessingOptions] = useState({
    sendNotifications: true,
    generatePayslips: true,
    autoApprove: false,
    skipErrors: true,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  // Mock batch data
  const [batches, setBatches] = useState<PayrollBatch[]>([
    {
      id: 'PB-1',
      payrollRunId: 'PR-1703123456789',
      entries: [],
      status: 'completed',
      startedAt: '2024-12-16T10:00:00Z',
      completedAt: '2024-12-16T10:15:00Z',
      errors: [],
    },
    {
      id: 'PB-2',
      payrollRunId: 'PR-1703123456789',
      entries: [],
      status: 'processing',
      startedAt: '2024-12-16T10:15:00Z',
      errors: [],
    },
  ]);

  const handleStartProcessing = () => {
    setIsProcessing(true);
    setProgress(0);

    // Simulate batch processing
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          onBatchProcessed();
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handlePauseProcessing = () => {
    setIsProcessing(false);
  };

  const handleRetryBatch = (batchId: string) => {
    setBatches(prev =>
      prev.map(batch =>
        batch.id === batchId
          ? { ...batch, status: 'pending', errors: [] }
          : batch
      )
    );
  };

  const getStatusColor = (status: PayrollBatch['status']) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Batch Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Batch Processing Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="payroll-run">Payroll Run</Label>
              <Select value={selectedRun} onValueChange={setSelectedRun}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payroll run" />
                </SelectTrigger>
                <SelectContent>
                  {payrollRuns.map((run) => (
                    <SelectItem key={run.id} value={run.id}>
                      {run.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="batch-size">Batch Size</Label>
              <Select value={batchSize} onValueChange={setBatchSize}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 employees per batch</SelectItem>
                  <SelectItem value="10">10 employees per batch</SelectItem>
                  <SelectItem value="25">25 employees per batch</SelectItem>
                  <SelectItem value="50">50 employees per batch</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">Processing Options</Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="send-notifications"
                  checked={processingOptions.sendNotifications}
                  onCheckedChange={(checked) =>
                    setProcessingOptions(prev => ({ ...prev, sendNotifications: checked as boolean }))
                  }
                />
                <Label htmlFor="send-notifications">Send email notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="generate-payslips"
                  checked={processingOptions.generatePayslips}
                  onCheckedChange={(checked) =>
                    setProcessingOptions(prev => ({ ...prev, generatePayslips: checked as boolean }))
                  }
                />
                <Label htmlFor="generate-payslips">Generate payslips</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="auto-approve"
                  checked={processingOptions.autoApprove}
                  onCheckedChange={(checked) =>
                    setProcessingOptions(prev => ({ ...prev, autoApprove: checked as boolean }))
                  }
                />
                <Label htmlFor="auto-approve">Auto-approve calculations</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="skip-errors"
                  checked={processingOptions.skipErrors}
                  onCheckedChange={(checked) =>
                    setProcessingOptions(prev => ({ ...prev, skipErrors: checked as boolean }))
                  }
                />
                <Label htmlFor="skip-errors">Skip entries with errors</Label>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleStartProcessing}
              disabled={!selectedRun || isProcessing}
              className="flex-1"
            >
              <Play className="h-4 w-4 mr-2" />
              Start Batch Processing
            </Button>
            {isProcessing && (
              <Button onClick={handlePauseProcessing} variant="outline">
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
            )}
          </div>

          {isProcessing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Processing Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Batch Status */}
      <Card>
        <CardHeader>
          <CardTitle>Batch Processing Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {batches.map((batch) => (
              <div key={batch.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Badge className={getStatusColor(batch.status)}>
                    {batch.status}
                  </Badge>
                  <div>
                    <p className="font-medium">Batch {batch.id}</p>
                    <p className="text-sm text-muted-foreground">
                      Started: {new Date(batch.startedAt).toLocaleString()}
                      {batch.completedAt && (
                        <> • Completed: {new Date(batch.completedAt).toLocaleString()}</>
                      )}
                    </p>
                    {batch.errors.length > 0 && (
                      <p className="text-sm text-red-600">
                        {batch.errors.length} error(s) encountered
                      </p>
                    )}
                  </div>
                </div>
                {batch.status === 'failed' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRetryBatch(batch.id)}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Retry
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollBatchProcessor;
