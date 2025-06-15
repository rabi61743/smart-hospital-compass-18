
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Power, ExternalLink, Zap } from "lucide-react";

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

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'clinical': return '🏥';
      case 'financial': return '💰';
      case 'operations': return '⚙️';
      default: return '📋';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'clinical': return 'bg-blue-50 border-blue-200';
      case 'financial': return 'bg-green-50 border-green-200';
      case 'operations': return 'bg-purple-50 border-purple-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            <Power className="h-6 w-6 text-white" />
          </div>
          Quick Access Control Center
        </CardTitle>
        <CardDescription className="text-base text-gray-600 mt-2">
          Instant access to all hospital management systems and administrative tools. 
          Click any module to launch it in a new window or execute system operations.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="modules" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 h-12 bg-gray-100">
            <TabsTrigger value="modules" className="flex items-center gap-2 text-base font-medium">
              <Power className="h-4 w-4" />
              Hospital Modules
            </TabsTrigger>
            <TabsTrigger value="tools" className="flex items-center gap-2 text-base font-medium">
              <Zap className="h-4 w-4" />
              System Tools
            </TabsTrigger>
          </TabsList>

          <TabsContent value="modules">
            <div className="space-y-8">
              {Object.entries(groupedModules).map(([category, categoryModules]) => (
                <div key={category} className={`p-6 rounded-xl border-2 ${getCategoryColor(category)}`}>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">{getCategoryIcon(category)}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 capitalize">{category} Systems</h3>
                      <p className="text-sm text-gray-600">{categoryModules.length} modules available</p>
                    </div>
                    <Badge variant="secondary" className="ml-auto">
                      {categoryModules.length}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {categoryModules.map((module) => {
                      const IconComponent = module.icon;
                      return (
                        <Button
                          key={module.name}
                          variant="outline"
                          className={`h-32 flex-col p-6 transition-all duration-300 ${module.color} border-2 hover:shadow-lg hover:scale-105 hover:-translate-y-1 group relative overflow-hidden`}
                          onClick={() => handleModuleAccess(module.path)}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <IconComponent className="h-8 w-8 mb-3 group-hover:scale-110 transition-transform" />
                          <span className="text-sm font-semibold text-center leading-tight truncate w-full" title={module.name}>
                            {module.name}
                          </span>
                          <span className="text-xs text-center opacity-75 mt-2 truncate w-full leading-relaxed" title={module.description}>
                            {module.description}
                          </span>
                          <ExternalLink className="absolute top-2 right-2 h-3 w-3 opacity-0 group-hover:opacity-70 transition-opacity" />
                        </Button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tools">
            <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="h-6 w-6 text-orange-500" />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Administrative Tools</h3>
                  <p className="text-sm text-gray-600">Essential system management and maintenance tools</p>
                </div>
                <Badge variant="secondary" className="ml-auto">
                  {tools.length} tools
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {tools.map((tool) => {
                  const IconComponent = tool.icon;
                  return (
                    <Button
                      key={tool.name}
                      variant="outline"
                      className={`h-32 flex-col p-6 transition-all duration-300 ${tool.color} border-2 hover:shadow-lg hover:scale-105 hover:-translate-y-1 group relative overflow-hidden`}
                      onClick={tool.action}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <IconComponent className="h-8 w-8 mb-3 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-semibold text-center leading-tight truncate w-full" title={tool.name}>
                        {tool.name}
                      </span>
                      <span className="text-xs text-center opacity-75 mt-2 truncate w-full leading-relaxed" title={tool.description}>
                        {tool.description}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default QuickAccessModules;
