
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DoctorTasksTab = () => {
  const pendingTasks = [
    { id: 1, task: "Review lab results for John Doe", priority: "high", time: "Due in 2 hours" },
    { id: 2, task: "Sign prescription for Maria Garcia", priority: "medium", time: "Due today" },
    { id: 3, task: "Complete discharge summary for Tom Wilson", priority: "low", time: "Due tomorrow" },
    { id: 4, task: "Call patient about test results", priority: "high", time: "Overdue" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Management</CardTitle>
        <CardDescription>Manage your daily tasks and reminders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingTasks.map((task) => (
            <div key={task.id} className={`p-4 border rounded-lg ${getPriorityColor(task.priority)}`}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium">{task.task}</div>
                  <div className="text-sm opacity-75 mt-1">{task.time}</div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">Complete</Button>
                  <Button size="sm" variant="outline">Defer</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorTasksTab;
