import React from 'react';
import Select, { CSSObjectWithLabel, ControlProps, GroupBase } from 'react-select';

export enum AutoSelectType {
  Primary,
  Secondary,
}

interface OptionType {
  value: string;
  label: string;
}

interface AutoSelectProps {
  id: string;
  type?: AutoSelectType;
  name: string;
  value: string;
  onChange: (event: { value: string; name: string }) => void;
  options: OptionType[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

const AutoSelect: React.FC<AutoSelectProps> = ({
  id,
  type = AutoSelectType.Primary,
  name,
  value,
  onChange,
  options,
  placeholder,
  disabled,
  required = false,
}) => {
  const handleChange = (selectedOption: OptionType | null) => {
    onChange({ value: selectedOption ? selectedOption.value : '', name });
  };

  const styles = type === AutoSelectType.Primary ? {
    control: (baseStyles: CSSObjectWithLabel, state: ControlProps<OptionType, false, GroupBase<OptionType>>) => ({
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
    }),
  } : {
    control: (baseStyles: CSSObjectWithLabel, state: ControlProps<OptionType, false, GroupBase<OptionType>>) => ({
      ...baseStyles,
      borderColor: state.isFocused ? '#00AEEC' : '#6D3AFA',
      borderBlockColor: state.isFocused ? '#00AEEC' : '#6D3AFA',
      textDecorationColor: state.isFocused ? '#00AEEC' : '#6D3AF',
      '&:hover': {
        borderColor: disabled ? 'gray' : '#00AEEC',
        borderBlockColor: disabled ? 'gray' : '#00AEEC',
        boxShadow: disabled ? '' : ('0 0 1rem #00AEEC'),
      },
    }),
  };

  return (
    <Select
      inputId={id}
      name={name}
      options={options}
      className="basic-single"
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
      styles={styles}
    />
  );
};

export default AutoSelect;
