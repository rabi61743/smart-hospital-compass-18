
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ContentSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  headerActions?: React.ReactNode;
  variant?: 'default' | 'card' | 'transparent';
}

export function ContentSection({ 
  title, 
  description, 
  children, 
  className = '', 
  headerActions,
  variant = 'default'
}: ContentSectionProps) {
  const content = (
    <>
      {(title || description || headerActions) && (
        <div className="flex items-center justify-between mb-6">
          <div>
            {title && (
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {headerActions && (
            <div className="flex items-center gap-2">
              {headerActions}
            </div>
          )}
        </div>
      )}
      <div className="space-y-6">
        {children}
      </div>
    </>
  );

  if (variant === 'card') {
    return (
      <Card className={`${className}`}>
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
          {headerActions && (
            <div className="flex justify-end">
              {headerActions}
            </div>
          )}
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    );
  }

  if (variant === 'transparent') {
    return (
      <div className={`${className}`}>
        {content}
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border shadow-sm p-6 ${className}`}>
      {content}
    </div>
  );
}
