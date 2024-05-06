import React from 'react';
import Select, { CSSObjectWithLabel, ControlProps, GroupBase } from 'react-select';

export enum AutoSelectType {
  Primary,
  Secondary,
}

export interface AutoSelectOptionType {
  value: string;
  label: string;
}

interface AutoSelectProps {
  id: string;
  type?: AutoSelectType;
  name: string;
  className?: string;
  styles?: CSSObjectWithLabel;
  value: string;
  onChange: (event: { value: string; name: string }) => void;
  options: AutoSelectOptionType[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

const AutoSelect: React.FC<AutoSelectProps> = ({
  id,
  type = AutoSelectType.Primary,
  name,
  className = '',
  styles = {},
  value,
  onChange,
  options,
  placeholder,
  disabled,
  required = false,
}) => {
  const handleChange = (selectedOption: AutoSelectOptionType | null) => {
    onChange({ value: selectedOption ? selectedOption.value : '', name });
  };

  const appliedStyles = type === AutoSelectType.Primary ? {
    control: (baseStyles: CSSObjectWithLabel, state: ControlProps<AutoSelectOptionType, false, GroupBase<AutoSelectOptionType>>) => ({
      ...baseStyles,
      borderColor: disabled ? 'gray' : (state.isFocused ? '#00AEEC' : '#6D3AFA'),
      borderBlockColor:  disabled ? 'gray' : (state.isFocused ? '#00AEEC' : '#6D3AFA'),
      textDecorationColor: state.isFocused ? '#00AEEC' : '#6D3AFA',
      fontSize: '1.25rem',
      borderWidth: '0.15rem',
      borderBlockWidth: '0.15rem',
      borderRadius: '0.25rem',
      padding: '0.5rem',
      boxShadow: disabled ? '' : (state.isFocused ? '0 0 1rem #00AEEC' : '0 0 0.5rem #6D3AFA'),
      '&:hover': {
        borderColor: disabled ? 'gray' : '#00AEEC',
        borderBlockColor: disabled ? 'gray' : '#00AEEC',
        boxShadow: disabled ? '' : ('0 0 1rem #00AEEC'),
      },
      ...styles,
    }),
  } : {
    control: (baseStyles: CSSObjectWithLabel, state: ControlProps<AutoSelectOptionType, false, GroupBase<AutoSelectOptionType>>) => ({
      ...baseStyles,
      borderColor: state.isFocused ? '#00AEEC' : '#6D3AFA',
      borderBlockColor: state.isFocused ? '#00AEEC' : '#6D3AFA',
      textDecorationColor: state.isFocused ? '#00AEEC' : '#6D3AF',
      '&:hover': {
        borderColor: disabled ? 'gray' : '#00AEEC',
        borderBlockColor: disabled ? 'gray' : '#00AEEC',
        boxShadow: disabled ? '' : ('0 0 1rem #00AEEC'),
      },
      ...styles,
    }),
  };

  return (
    <Select
      inputId={id}
      name={name}
      options={options}
      className={`basic-single ${className}`}
      classNamePrefix="select"
      placeholder={placeholder || "Select..."}
      isClearable
      isSearchable
      isDisabled={disabled}
      required={!!required}
      menuPlacement="auto"
      menuShouldScrollIntoView={true}
      onChange={handleChange}
      onFocus={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })}
      value={options.find(option => option.value === value)}
      styles={appliedStyles}
    />
  );
};

export default AutoSelect;
