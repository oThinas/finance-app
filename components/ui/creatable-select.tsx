'use client';

/** Core */
import { useMemo } from 'react';
import { SingleValue } from 'react-select';
import CreatableSelectPrimitive, { CreatableProps } from 'react-select/creatable';

/** Interfaces */
import { ISelectOptions } from '@/interfaces/select-options';

interface CreatableSelectProps {
  onChange(value?: string): void;
  onCreate?(value: string): void;
  options?: ISelectOptions[];
  value?: string | null | undefined;
  disabled?: boolean;
  placeholder?: string;
}

export function CreatableSelect({
  options = [],
  ...props
}: CreatableSelectProps & CreatableProps<ISelectOptions, false, { options: ISelectOptions[] }>) {
  const formattedValue = useMemo(() => {
    return options.find((option) => option.value === props.value);
  }, [options, props.value]);

  function handleSelectChange(option: SingleValue<ISelectOptions>) {
    props.onChange(option?.value);
  }

  return (
    <CreatableSelectPrimitive
      {...props}
      placeholder={props.placeholder} className="h-10 text-sm" value={formattedValue} options={options}
      onCreateOption={props.onCreate} onChange={handleSelectChange} isDisabled={props.disabled} blurInputOnSelect
      theme={(theme) => ({
        ...theme,
        spacing: {
          ...theme.spacing,
          menuGutter: 0,
        },
        colors: {
          ...theme.colors,
          primary: '#0F172A',
          primary25: '#3B82F6',
        },
      })}
      styles={{
        control: (base, state) => ({
          ...base,
          cursor: 'pointer',
          borderColor: '#0F172A',
          borderWidth: state.isFocused ? 2 : 1,
          '&:hover': { borderColor: '#0F172A' },
        }),
      }}
    />
  );
}
