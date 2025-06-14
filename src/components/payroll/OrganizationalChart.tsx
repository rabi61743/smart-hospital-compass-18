
import React, { useMemo } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Briefcase, Building } from "lucide-react";

interface Position {
  id: string;
  title: string;
  department: string;
  description: string;
  level: 'Entry' | 'Mid' | 'Senior' | 'Lead' | 'Manager' | 'Director' | 'VP' | 'C-Level';
  reportsTo: string;
  minSalary: number;
  maxSalary: number;
  responsibilities: string[];
  requirements: string[];
  employeeCount: number;
  status: 'Active' | 'Inactive';
}

interface OrganizationalChartProps {
  positions: Position[];
  viewMode: 'hierarchy' | 'department';
}

interface HierarchyNode {
  position: Position;
  children: HierarchyNode[];
  level: number;
}

const OrganizationalChart = ({ positions, viewMode }: OrganizationalChartProps) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Entry': return 'bg-blue-100 text-blue-800';
      case 'Mid': return 'bg-yellow-100 text-yellow-800';
      case 'Senior': return 'bg-orange-100 text-orange-800';
      case 'Lead': return 'bg-purple-100 text-purple-800';
      case 'Manager': return 'bg-indigo-100 text-indigo-800';
      case 'Director': return 'bg-pink-100 text-pink-800';
      case 'VP': return 'bg-red-100 text-red-800';
      case 'C-Level': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const buildHierarchy = useMemo(() => {
    if (viewMode === 'department') {
      return positions.reduce((acc, position) => {
        if (!acc[position.department]) {
          acc[position.department] = [];
        }
        acc[position.department].push(position);
        return acc;
      }, {} as Record<string, Position[]>);
    }

    // Build hierarchy tree for hierarchy view
    const hierarchy: HierarchyNode[] = [];
    const positionMap = new Map<string, Position>();
    const childrenMap = new Map<string, Position[]>();

    // Create maps for easy lookup
    positions.forEach(position => {
      positionMap.set(position.id, position);
      positionMap.set(position.title, position);
    });

    // Group positions by their reporting manager
    positions.forEach(position => {
      const manager = position.reportsTo;
      if (!childrenMap.has(manager)) {
        childrenMap.set(manager, []);
      }
      childrenMap.get(manager)?.push(position);
    });

    // Find root positions (those that don't report to positions in our list)
    const rootPositions = positions.filter(position => {
      return !positions.some(p => p.title === position.reportsTo || p.id === position.reportsTo);
    });

    // Build tree recursively
    const buildNode = (position: Position, level: number = 0): HierarchyNode => {
      const children = (childrenMap.get(position.title) || childrenMap.get(position.id) || [])
        .map(child => buildNode(child, level + 1));
      
      return {
        position,
        children,
        level
      };
    };

    return rootPositions.map(position => buildNode(position));
  }, [positions, viewMode]);

  const renderPositionCard = (position: Position, level: number = 0) => {
    const marginLeft = level * 40;
    
    return (
      <Card key={position.id} className="p-4 mb-3" style={{ marginLeft: `${marginLeft}px` }}>
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Briefcase className="h-4 w-4 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-lg">{position.title}</h4>
                <p className="text-sm text-muted-foreground">{position.department}</p>
                <p className="text-xs text-muted-foreground mt-1">{position.description}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge className={getLevelColor(position.level)}>
                  {position.level}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-3 w-3" />
                  <span>{position.employeeCount}</span>
                </div>
              </div>
            </div>
            {position.reportsTo && (
              <div className="mt-2 text-xs text-muted-foreground">
                Reports to: {position.reportsTo}
              </div>
            )}
            <div className="mt-2 text-sm text-muted-foreground">
              Salary Range: ₹{position.minSalary.toLocaleString()} - ₹{position.maxSalary.toLocaleString()}
            </div>
          </div>
        </div>
      </Card>
    );
  };

  const renderHierarchyNode = (node: HierarchyNode): React.ReactNode => {
    return (
      <div key={node.position.id} className="mb-4">
        {renderPositionCard(node.position, node.level)}
        {node.children.length > 0 && (
          <div className="ml-8 border-l-2 border-gray-200 pl-4">
            {node.children.map(child => renderHierarchyNode(child))}
          </div>
        )}
      </div>
    );
  };

  const renderDepartmentView = (departmentData: Record<string, Position[]>) => {
    return (
      <div className="space-y-6">
        {Object.entries(departmentData).map(([department, positions]) => (
          <div key={department} className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Building className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold">{department}</h3>
              <Badge variant="secondary">{positions.length} positions</Badge>
            </div>
            <div className="space-y-3">
              {positions.map(position => renderPositionCard(position, 0))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (positions.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">No positions found matching your criteria</p>
      </div>
    );
  }

  return (
    <div className="min-h-96">
      {viewMode === 'hierarchy' ? (
        <div className="space-y-4">
          {(buildHierarchy as HierarchyNode[]).map(node => renderHierarchyNode(node))}
        </div>
      ) : (
        renderDepartmentView(buildHierarchy as Record<string, Position[]>)
      )}
    </div>
  );
};

export default OrganizationalChart;
