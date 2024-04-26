import React from 'react';
import Select from 'react-select';

interface OptionType {
  value: string;
  label: string;
}

interface SubprovinceSelectProps {
  id: string;
  name: string;
  value: string;
  onChange: (event: { value: string; name: string }) => void;
  options: OptionType[];
  placeholder?: string;
  disabled?: boolean;
}

const SubprovinceSelect: React.FC<SubprovinceSelectProps> = ({ id, name, value, onChange, options, placeholder, disabled }) => {
  const handleChange = (selectedOption: OptionType | null) => {
    onChange({ value: selectedOption ? selectedOption.value : '', name });
  };

  return (
    <Select
      inputId={id}
      name={name}
      value={options.find(option => option.value === value)}
      onChange={handleChange}
      options={options}
      className="basic-single"
      classNamePrefix="select"
      placeholder={placeholder || "Select a subprovince..."}
      isClearable
      isSearchable
      isDisabled={disabled}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderColor: state.isFocused ? '#00AEEC' : '#6D3AFA',
          borderBlockColor: state.isFocused ? '#00AEEC' : '#6D3AFA',
          textDecorationColor: state.isFocused ? '#00AEEC' : '#6D3AF',
        }),
      }}
    />
  );
};

export default SubprovinceSelect;
