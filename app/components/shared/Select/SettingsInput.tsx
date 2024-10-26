import React, { ChangeEvent, FunctionComponent, memo } from 'react';

import { Input } from '@/app/components/shared/Form/input';
import { Textarea } from '@/app/components/shared/Form/textarea';
import { Button } from '@/app/components/ui/button';

// Define the props interface directly instead of extending SettingsComponentProps
interface SettingsInputProps {
  id?: string;
  label: string;
  value: string;
  helperText?: string;
  isEditable?: boolean;
  isButton?: boolean;
  buttonTitle?: string;
  isDestructive?: boolean;
  onButtonClick?: () => void;
  onChange: (value: string) => void;
  isLongInput?: boolean;
}

const SettingsInput: FunctionComponent<SettingsInputProps> = memo(
  ({
    id,
    label,
    value,
    helperText = '',
    isButton = false,
    buttonTitle = 'Button',
    isDestructive = false,
    onButtonClick,
    onChange,
    isLongInput = false,
    isEditable = true,
  }) => {
    const handleChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      onChange(e.target.value);
    };

    const renderInput = () => {
      const inputProps = {
        id,
        name: id,
        value,
        onChange: handleChange,
        disabled: !isEditable,
        className: 'w-full font-regular text-sm rounded-sm py-0.5',
      };

      if (isButton) {
        return (
          <Button
            variant={isDestructive ? 'destructive' : 'default'}
            onClick={onButtonClick}
            className='w-full'
          >
            {buttonTitle}
          </Button>
        );
      } else if (isLongInput) {
        return (
          <Textarea
            {...inputProps}
            rows={4}
            className='w-full rounded-lg font-regular' // Added rounded-lg class for rounded corners
            disabled={!isEditable}
          />
        );
      } else {
        return <Input {...inputProps} />;
      }
    };

    return (
      <div className='flex w-full items-start'>
        <div className='w-full'>
          <label
            htmlFor={id}
            className='block font-medium text-sm tracking-[-0.02em] text-neutral-800 dark:text-neutral-200'
          >
            {label}
          </label>
          <p className='mt-1 font-regular text-sm text-secondary dark:text-neutral-400'>
            {helperText}
          </p>
        </div>
        <div className='w-full'>{renderInput()}</div>
      </div>
    );
  }
);

SettingsInput.displayName = 'SettingsInput';

export default SettingsInput;
