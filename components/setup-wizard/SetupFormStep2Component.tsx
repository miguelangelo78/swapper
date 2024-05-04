import React, { ChangeEvent, useEffect, useState } from 'react';
import { SwapperUser } from '@/lib/models/SwapperUser.types';
import AutoSelect, { AutoSelectType } from './AutoSelect';
import { SelectOptionType } from './SetupFormWizardComponent';
import provinceData from '@/lib/data/provinces.json';
import subprovinceData from '@/lib/data/subprovinces.json';
import { SwapperButton } from '../SwapperButton';

export default function SetupFormStep2Component({ user, formData, handleInputChange, handleSubmit, handlePreviousStep }: {
  user: SwapperUser,
  formData: any,
  handleInputChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement> | SelectOptionType) => void,
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  handlePreviousStep: () => void,
}) {
  // State to hold filtered subprovince options
  const [filteredOriginSubprovinceOptions, setFilteredOriginSubprovinceOptions] = useState([] as { value: string, label: string }[]);
  const [filteredDestinationSubprovinceOptions, setFilteredDestinationSubprovinceOptions] = useState([] as { value: string, label: string }[]);

  useEffect(() => {
    // Update subprovince options when the origin province changes
    if (formData.originProvince) {
      const subprovince = subprovinceData[formData.originProvince as string as keyof typeof subprovinceData] || [];
      setFilteredOriginSubprovinceOptions(subprovince.map(option => ({ value: option, label: option })));
    }

    // Update subprovince options when the destination province changes
    if (formData.destinationProvince) {
      const subprovince = subprovinceData[formData.destinationProvince as string as keyof typeof subprovinceData] || [];
      setFilteredDestinationSubprovinceOptions(subprovince.map(option => ({ value: option, label: option })));
    }
  }, [formData.originProvince, formData.destinationProvince]); // Reacts to changes in originProvince and destinationProvince

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="text-2xl font-black mb-2 mt-5 justify-center text-center">Step 2: Select your Province</div>
      <div className="text-xl mb-10 text-primary font-medium justify-center text-center">
        Where would you like to swap to and from?
      </div>
      <div className="flex flex-wrap justify-center">
        <div className="w-full mx-auto">
          <form className="flex flex-wrap flex-col items-center justify-center w-80" onSubmit={handleSubmit}>
            <div className="w-full">
              <label htmlFor="originProvince" className="block text-xl font-medium text-gray-700 mb-2">Select your origin province</label>
              <AutoSelect
                id="originProvince"
                name="originProvince"
                value={formData.originProvince}
                onChange={handleInputChange}
                options={provinceData.map(option => ({ value: option, label: option }))}
                placeholder="Origin province..."
                required={true}
              />
              <div className="transition-all duration-500 ease-in-out mt-1">
                <AutoSelect
                  id="originSubprovince"
                  type={AutoSelectType.Secondary}
                  name="originSubprovince"
                  value={formData.originSubprovince}
                  onChange={handleInputChange}
                  options={filteredOriginSubprovinceOptions}
                  placeholder={formData.originProvince ? "Subprovince..." : "Select a province first"}
                  disabled={!formData.originProvince}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <span className="text-5xl font-black text-primary">↓</span>
            </div>
            <div className="w-full mb-5">
              <label htmlFor="destinationProvince" className="block text-xl font-medium text-gray-700 mb-2">Select your destination province</label>
              <AutoSelect
                id="destinationProvince"
                name="destinationProvince"
                value={formData.destinationProvince}
                onChange={handleInputChange}
                options={provinceData.map(option => ({ value: option, label: option }))}
                placeholder="Destination province..."
                required={true}
              />
              <div className="transition-all duration-500 ease-in-out mt-1">
                <AutoSelect
                  id="destinationSubprovince"
                  type={AutoSelectType.Secondary}
                  name="destinationSubprovince"
                  value={formData.destinationSubprovince}
                  onChange={handleInputChange}
                  options={filteredDestinationSubprovinceOptions}
                  placeholder={formData.destinationProvince ? "Subprovince..." : "Select a province first"}
                  disabled={!formData.destinationProvince}
                />
              </div>
            </div>
            <div className="flex w-full gap-4 justify-between">
              <SwapperButton text='Previous Step' styleType='secondary' onClick={handlePreviousStep} />
              <SwapperButton type='submit' text='Next Step' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
