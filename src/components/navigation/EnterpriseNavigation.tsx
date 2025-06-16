
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronRight, 
  Menu, 
  X,
  LayoutDashboard,
  Stethoscope,
  Users,
  UserCheck,
  Pill,
  DollarSign,
  Receipt,
  TrendingUp,
  Building,
  Shield,
  FileText,
  Activity,
  Settings,
  Database,
  FlaskConical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { NavigationItem } from '@/types/navigation';
import { useNavigationContext } from './NavigationProvider';
import { cn } from '@/lib/utils';

// Icon mapping for navigation items
const iconMap: { [key: string]: React.ComponentType<any> } = {
  LayoutDashboard,
  Stethoscope,
  Users,
  UserCheck,
  Pill,
  DollarSign,
  Receipt,
  TrendingUp,
  Building,
  Shield,
  FileText,
  Activity,
  Settings,
  Database,
  FlaskConical
};

interface NavigationItemProps {
  item: NavigationItem;
  level: number;
  isCollapsed: boolean;
}

const NavigationItemComponent: React.FC<NavigationItemProps> = ({ item, level, isCollapsed }) => {
  const { toggleExpanded, isExpanded, isActive } = useNavigationContext();
  
  const hasChildren = item.children && item.children.length > 0;
  const isItemExpanded = isExpanded(item.id);
  const isItemActive = isActive(item.id);
  const IconComponent = item.icon ? iconMap[item.icon] : null;
  
  const indentationClass = level > 0 ? `ml-${Math.min(level * 4, 16)}` : '';
  const baseItemClasses = cn(
    "group flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
    "hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500",
    isItemActive && "bg-blue-50 text-blue-700 border-r-2 border-blue-500",
    !isItemActive && "text-gray-700",
    indentationClass
  );

  const handleClick = () => {
    if (hasChildren) {
      toggleExpanded(item.id);
    }
  };

  const renderItemContent = () => (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-3 min-w-0 flex-1">
        {IconComponent && (
          <IconComponent 
            className={cn(
              "h-5 w-5 flex-shrink-0",
              isItemActive ? "text-blue-600" : "text-gray-500 group-hover:text-gray-700"
            )}
          />
        )}
        {!isCollapsed && (
          <div className="min-w-0 flex-1">
            <span className="truncate">{item.label}</span>
            {item.metadata?.isNew && (
              <Badge variant="secondary" className="ml-2 text-xs">New</Badge>
            )}
            {item.metadata?.isBeta && (
              <Badge variant="outline" className="ml-2 text-xs">Beta</Badge>
            )}
          </div>
        )}
      </div>
      {!isCollapsed && hasChildren && (
        <div className="flex-shrink-0">
          {isItemExpanded ? (
            <ChevronDown className="h-4 w-4 text-gray-400" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-400" />
          )}
        </div>
      )}
    </div>
  );

  const content = (
    <div>
      {item.path ? (
        <Link to={item.path} className={baseItemClasses}>
          {renderItemContent()}
        </Link>
      ) : (
        <button onClick={handleClick} className={baseItemClasses}>
          {renderItemContent()}
        </button>
      )}
      
      {!isCollapsed && hasChildren && isItemExpanded && (
        <div className="ml-2 mt-1 space-y-1">
          {item.children?.map((child) => (
            <NavigationItemComponent
              key={child.id}
              item={child}
              level={level + 1}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      )}
    </div>
  );

  if (isCollapsed && item.description) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {content}
          </TooltipTrigger>
          <TooltipContent side="right" className="ml-2">
            <div>
              <div className="font-medium">{item.label}</div>
              <div className="text-sm text-gray-500">{item.description}</div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
};

export const EnterpriseNavigation: React.FC = () => {
  const { navigationItems, navigationState, toggleCollapsed, currentUser } = useNavigationContext();
  const isCollapsed = navigationState.isCollapsed;

  return (
    <div className={cn(
      "flex flex-col h-screen bg-white border-r border-gray-200 shadow-lg transition-all duration-300",
      isCollapsed ? "w-16" : "w-80"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">MediFlow HMS</h1>
              <p className="text-xs text-blue-100">Enterprise Edition</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleCollapsed}
          className="text-white hover:bg-white/20"
        >
          {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </Button>
      </div>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              {currentUser.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">{currentUser.name}</p>
              <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
              <div className="flex space-x-1 mt-1">
                {currentUser.roles.map((role: string) => (
                  <Badge key={role} variant="secondary" className="text-xs">
                    {role}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Items */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <NavigationItemComponent
              key={item.id}
              item={item}
              level={0}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        {!isCollapsed ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>System Status</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Online</span>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              Version 2.1.0 - Build 1234
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};
