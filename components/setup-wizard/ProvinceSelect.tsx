import React from 'react';
import Select from 'react-select';

interface OptionType {
  value: string;
  label: string;
}

interface ProvinceSelectProps {
  id: string;
  name: string;
  value: string;
  onChange: (event: { value: string; name: string }) => void;
  options: OptionType[];
  placeholder?: string;
}

const ProvinceSelect: React.FC<ProvinceSelectProps> = ({ id, name, value, onChange, options, placeholder }) => {
  const handleChange = (selectedOption: OptionType | null) => {
    onChange({ value: selectedOption ? selectedOption.value : '', name });
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
      onChange={handleChange}
      value={options.find(option => option.value === value)}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderColor: state.isFocused ? '#00AEEC' : '#6D3AFA',
          borderBlockColor: state.isFocused ? '#00AEEC' : '#6D3AFA',
          textDecorationColor: state.isFocused ? '#00AEEC' : '#6D3AFA',
          borderWidth: '0.15rem',
          borderBlockWidth: '0.15rem',
          borderRadius: '0.25rem',
          padding: '0.5rem',
        }),
      }}
    />
  );
};

export default ProvinceSelect;
