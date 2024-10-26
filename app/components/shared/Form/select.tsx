'use client';

import * as React from 'react';

import * as SelectPrimitive from '@radix-ui/react-select';
import {
  IconCheck,
  IconChevronDown,
  IconChevronUp,
  IconSquare,
  IconSquareCheck,
} from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '@/lib/utils';

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'bg-white border-gray-300 text-primary-blue focus:ring-blue-500 focus:border-blue-500 flex h-12 w-full items-center justify-between rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:focus:ring-gray-500 dark:focus:border-gray-500 transition-all duration-300 hover:shadow-glow',
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <IconChevronDown className='h-4 w-4 text-gray-400 dark:text-gray-500 transition-transform duration-300' />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700',
      className
    )}
    {...props}
  >
    <IconChevronUp className='h-4 w-4' />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700',
      className
    )}
    {...props}
  >
    <IconChevronDown className='h-4 w-4' />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'bg-white text-gray-900 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg border border-gray-200 shadow-lg dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      'py-1.5 pl-8 pr-2 font-semibold text-sm text-gray-700 dark:text-gray-400',
      className
    )}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'focus:bg-blue-100 focus:text-blue-900 dark:focus:bg-gray-700 dark:focus:text-gray-100 relative flex w-full cursor-default select-none items-center rounded-md py-2 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200',
      className
    )}
    {...props}
  >
    <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
      <SelectPrimitive.ItemIndicator>
        <IconCheck className='h-4 w-4 text-blue-600' />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-gray-200 dark:bg-gray-700', className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

const SelectCheckboxItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
    checked?: boolean;
  }
>(({ className, children, checked, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 dark:hover:bg-gray-700',
      className
    )}
    {...props}
  >
    <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
      {checked ? (
        <IconSquareCheck className='h-4 w-4 text-blue-600' />
      ) : (
        <IconSquare className='h-4 w-4 text-gray-400 dark:text-gray-500' />
      )}
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectCheckboxItem.displayName = 'SelectCheckboxItem';

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
