
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

const TicketSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <div className="h-48 bg-gray-200 animate-pulse"></div>
      <CardHeader>
        <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded mt-2"></div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full grid grid-cols-3 gap-2">
          <div className="h-9 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-9 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-9 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TicketSkeleton;
