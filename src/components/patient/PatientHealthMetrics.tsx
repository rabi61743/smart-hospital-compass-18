
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PatientHealthMetrics = () => {
  const healthMetrics = [
    { label: "Blood Pressure", value: "120/80", status: "Normal", color: "text-green-600" },
    { label: "Heart Rate", value: "72 bpm", status: "Normal", color: "text-green-600" },
    { label: "Weight", value: "68 kg", status: "Stable", color: "text-blue-600" },
    { label: "BMI", value: "22.5", status: "Normal", color: "text-green-600" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Metrics</CardTitle>
        <CardDescription>Latest readings from your visits</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {healthMetrics.map((metric, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">{metric.label}</p>
                <p className="text-2xl font-bold">{metric.value}</p>
              </div>
              <Badge variant="secondary" className={metric.color}>
                {metric.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientHealthMetrics;
