import React, { useRef } from 'react';
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

  const selectRef = useRef(null as HTMLDivElement | null);

  const handleFocus = () => {
    // Delay scrolling a bit to wait for the mobile keyboard to appear
    setTimeout(() => {
      const selectDOM = selectRef.current ;
      if (selectDOM) {
        const bounding = selectDOM.getBoundingClientRect();
        if (bounding.top < 0 || bounding.bottom > window.innerHeight) {
          window.scrollTo({
            top: bounding.top + window.scrollY - 20, // Adjust as needed
            behavior: 'smooth',
          });
        }
      }
    }, 400); // Adjust delay as needed to sync with keyboard animation
  };

  return (
    <div ref={selectRef}>
      <Select
        inputId={id}
        name={name}
        options={options}
        className="basic-single"
        classNamePrefix="select"
        placeholder={placeholder || "Select..."}
        isClearable
        menuPlacement="auto"
        menuShouldScrollIntoView={true}
        onChange={handleChange}
        onFocus={handleFocus}
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
    </div>
  );
};

export default ProvinceSelect;
