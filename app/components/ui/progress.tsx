import * as React from 'react';

import { cn } from '@/lib/utils';

const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: number }
>(({ className, value, ...props }, ref) => (
  <div ref={ref} className={cn('w-full bg-secondary', className)} {...props}>
    <div
      className='h-full bg-primary transition-all'
      style={{ width: `${value}%` }}
    />
  </div>
));
Progress.displayName = 'Progress';

export { Progress };
