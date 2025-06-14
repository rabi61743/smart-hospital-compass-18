
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Building, Users, TrendingUp, MapPin, DollarSign } from "lucide-react";
import { useMultiLocationCommissions } from '@/hooks/useMultiLocationCommissions';

const MultiLocationDashboard = () => {
  const {
    branches,
    locationSummaries,
    getAggregatedSummary
  } = useMultiLocationCommissions();

  const aggregated = getAggregatedSummary();
  
  const topPerformingLocation = locationSummaries.reduce((max, current) => 
    current.totalCalculated > max.totalCalculated ? current : max
  );

  const totalLocations = branches.length;
  const averageCommissionPerLocation = aggregated.totalCalculated / totalLocations;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Locations</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLocations}</div>
            <p className="text-xs text-muted-foreground">
              Active hospital branches
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{aggregated.totalCalculated.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Total calculated commissions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg per Location</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{Math.round(averageCommissionPerLocation).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Average commission revenue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commissions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{aggregated.commissionCount}</div>
            <p className="text-xs text-muted-foreground">
              Across all locations
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Location Performance Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Location Performance</CardTitle>
          <CardDescription>
            Commission performance across all hospital branches
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {locationSummaries.map((location) => {
              const branch = branches.find(b => b.id === location.locationId);
              const performancePercentage = (location.totalCalculated / topPerformingLocation.totalCalculated) * 100;
              const discrepancyPercentage = location.totalCalculated > 0 
                ? Math.abs(location.totalDiscrepancy / location.totalCalculated) * 100 
                : 0;

              return (
                <Card key={location.locationId} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{location.locationName}</CardTitle>
                      <Badge variant="outline">{branch?.code}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {branch?.address.city}, {branch?.address.state}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Commission Revenue</span>
                        <span className="font-medium">₹{location.totalCalculated.toLocaleString()}</span>
                      </div>
                      <Progress value={performancePercentage} className="h-2" />
                      <div className="text-xs text-muted-foreground">
                        {performancePercentage.toFixed(1)}% of top performer
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium">{location.commissionCount}</div>
                        <div className="text-muted-foreground">Commissions</div>
                      </div>
                      <div>
                        <div className="font-medium">
                          <Badge variant={discrepancyPercentage > 5 ? "destructive" : "default"}>
                            {discrepancyPercentage.toFixed(1)}%
                          </Badge>
                        </div>
                        <div className="text-muted-foreground">Discrepancy</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium">Top Performers</div>
                      {location.topPerformers.slice(0, 2).map((performer, index) => (
                        <div key={index} className="flex justify-between text-xs">
                          <span className="truncate">{performer.name}</span>
                          <span className="font-medium">₹{performer.amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Branch Details */}
      <Card>
        <CardHeader>
          <CardTitle>Branch Information</CardTitle>
          <CardDescription>
            Detailed information about each hospital branch
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {branches.map((branch) => (
              <div key={branch.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium">{branch.name}</h3>
                    <p className="text-sm text-muted-foreground">Code: {branch.code}</p>
                  </div>
                  <Badge variant={branch.isActive ? "default" : "secondary"}>
                    {branch.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-medium mb-1">Address</div>
                    <div className="text-muted-foreground">
                      {branch.address.street}<br />
                      {branch.address.city}, {branch.address.state} {branch.address.zipCode}
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-medium mb-1">Contact</div>
                    <div className="text-muted-foreground">
                      {branch.contactInfo.phone}<br />
                      {branch.contactInfo.email}
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-medium mb-1">Commission Settings</div>
                    <div className="text-muted-foreground">
                      Multiplier: {branch.commissionSettings.defaultRateMultiplier}x<br />
                      Specific rules: {branch.commissionSettings.enableLocationSpecificRules ? 'Enabled' : 'Disabled'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MultiLocationDashboard;
