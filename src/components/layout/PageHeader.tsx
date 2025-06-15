
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  actions?: React.ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  stats?: Array<{ label: string; value: string; change?: string; icon?: React.ReactNode }>;
}

export function PageHeader({ 
  title, 
  description, 
  badge, 
  badgeVariant = 'secondary',
  actions, 
  breadcrumbs,
  stats 
}: PageHeaderProps) {
  return (
    <div className="space-y-6 mb-8">
      {/* Breadcrumbs */}
      {breadcrumbs && (
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span>/</span>}
              {crumb.href ? (
                <a href={crumb.href} className="hover:text-foreground transition-colors">
                  {crumb.label}
                </a>
              ) : (
                <span className="text-foreground font-medium">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* Header Content */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
              {title}
            </h1>
            {badge && (
              <Badge variant={badgeVariant} className="px-3 py-1">
                {badge}
              </Badge>
            )}
          </div>
          {description && (
            <p className="text-lg text-muted-foreground max-w-3xl">
              {description}
            </p>
          )}
        </div>
        
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>

      {/* Stats Cards */}
      {stats && stats.length > 0 && (
        <>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    {stat.change && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {stat.change}
                      </p>
                    )}
                  </div>
                  {stat.icon && (
                    <div className="text-blue-600">
                      {stat.icon}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
