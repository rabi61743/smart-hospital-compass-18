
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Power } from "lucide-react";

interface QuickAccessModule {
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  path: string;
  color: string;
  category: string;
}

interface SystemTool {
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  action: () => void;
  color: string;
}

interface QuickAccessModulesProps {
  modules: QuickAccessModule[];
  tools: SystemTool[];
}

const QuickAccessModules = ({ modules, tools }: QuickAccessModulesProps) => {
  const handleModuleAccess = (path: string) => {
    window.open(path, '_blank');
  };

  const groupedModules = modules.reduce((acc, module) => {
    if (!acc[module.category]) {
      acc[module.category] = [];
    }
    acc[module.category].push(module);
    return acc;
  }, {} as Record<string, typeof modules>);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Power className="h-5 w-5" />
          Quick Access to All Modules
        </CardTitle>
        <CardDescription>
          Direct access to all hospital management modules and systems
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="modules" className="space-y-4">
          <TabsList>
            <TabsTrigger value="modules">Hospital Modules</TabsTrigger>
            <TabsTrigger value="tools">System Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="modules">
            <div className="space-y-6">
              {Object.entries(groupedModules).map(([category, categoryModules]) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold mb-3 text-gray-700">{category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {categoryModules.map((module) => {
                      const IconComponent = module.icon;
                      return (
                        <Button
                          key={module.name}
                          variant="outline"
                          className={`h-24 flex-col p-4 transition-all duration-200 ${module.color} border-2 hover:shadow-md`}
                          onClick={() => handleModuleAccess(module.path)}
                        >
                          <IconComponent className="h-6 w-6 mb-2" />
                          <span className="text-sm font-medium text-center leading-tight truncate w-full">{module.name}</span>
                          <span className="text-xs text-center opacity-75 mt-1 truncate w-full" title={module.description}>{module.description}</span>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tools">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {tools.map((tool) => {
                const IconComponent = tool.icon;
                return (
                  <Button
                    key={tool.name}
                    variant="outline"
                    className={`h-24 flex-col p-4 transition-all duration-200 ${tool.color} border-2 hover:shadow-md`}
                    onClick={tool.action}
                  >
                    <IconComponent className="h-6 w-6 mb-2" />
                    <span className="text-sm font-medium text-center leading-tight truncate w-full">{tool.name}</span>
                    <span className="text-xs text-center opacity-75 mt-1 truncate w-full" title={tool.description}>{tool.description}</span>
                  </Button>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default QuickAccessModules;
