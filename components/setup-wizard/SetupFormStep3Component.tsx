import React, { ChangeEvent, useEffect, useState } from 'react';
import { SwapperUser } from '@/lib/models/SwapperUser.types';
import AutoSelect, { AutoSelectType } from './AutoSelect';
import { SelectOptionType } from './SetupFormWizardComponent';
import { SwapperButton } from '../SwapperButton';
import provinceData from '@/lib/data/provinces.json';
import subprovinceData from '@/lib/data/subprovinces.json';
import educationalArea from '@/lib/data/educationalArea.json';

export default function SetupFormStep3Component({ user, formData, handleInputChange, handleSubmit, handlePreviousStep }: {
  user: SwapperUser,
  formData: any,
  handleInputChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement> | SelectOptionType) => void,
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  handlePreviousStep: () => void,
}) {
  // State to hold filtered subprovince options
  const [filteredOriginSubprovinceOptions, setFilteredOriginSubprovinceOptions] = useState([] as { value: string, label: string }[]);
  const [filteredDestinationSubprovinceOptions, setFilteredDestinationSubprovinceOptions] = useState([] as { value: string, label: string }[]);
  const [filteredOriginEducationAreaOptions, setFilteredOriginEducationAreaOptions] = useState([] as { value: string, label: string }[]);
  const [filteredDestinationEducationAreaOptions, setFilteredDestinationEducationAreaOptions] = useState([] as { value: string, label: string }[]);

  const isOriginAreaVisible = filteredOriginEducationAreaOptions.length > 0;
  const isDestinationAreaVisible = filteredDestinationEducationAreaOptions.length > 0;

  const isOriginAreaDisabled = !formData.originProvince;
  const isDestinationAreaDisabled = !formData.destinationProvince;
  const isOriginSubprovinceDisabled = !formData.originProvince;
  const isDestinationSubpriovinceDisabled = !formData.destinationProvince;

  const originAreaRequired = (formData.originProvince && !formData.originSubprovince);
  const destinationAreaRequired = (formData.destinationProvince && !formData.destinationSubprovince);

  useEffect(() => {
    // Update subprovince options when the origin province changes
    if (formData.originProvince) {
      const subprovince = subprovinceData[formData.originProvince as string as keyof typeof subprovinceData] || [];
      setFilteredOriginSubprovinceOptions(subprovince.map(option => ({ value: option, label: option })));

      const areaOffice = educationalArea[formData.originAreaOffice as string as keyof typeof educationalArea];
      const educationArea = areaOffice[formData.originProvince as string as keyof typeof areaOffice];
      const areasList = Array.from({ length: educationArea }, (_, index) => index + 1);
      setFilteredOriginEducationAreaOptions(areasList.map(option => ({ value: `${option}`, label: `${option}` })));
    }

    // Update subprovince options when the destination province changes
    if (formData.destinationProvince) {
      const subprovince = subprovinceData[formData.destinationProvince as string as keyof typeof subprovinceData] || [];
      setFilteredDestinationSubprovinceOptions(subprovince.map(option => ({ value: option, label: option })));

      const areaOffice = educationalArea[(formData.destinationAreaOffice || formData.originAreaOffice) as string as keyof typeof educationalArea];
      const educationArea = areaOffice[formData.destinationProvince as string as keyof typeof areaOffice];
      const areasList = Array.from({ length: educationArea }, (_, index) => index + 1);
      setFilteredDestinationEducationAreaOptions(areasList.map(option => ({ value: `${option}`, label: `${option}` })));
    }
  }, [formData.originProvince, formData.destinationProvince]); // Reacts to changes in originProvince and destinationProvince

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="text-2xl font-black mt-5 justify-center text-center">Step 3: Select your Province, </div>
      <div className="text-2xl font-black mb-2 justify-center text-center">Area <span className='underline'>or</span> Subprovince</div>
      <div className="text-xl mb-10 text-primary font-medium justify-center text-center">
        Where would you like to swap to and from?
      </div>
      <div className="flex flex-wrap justify-center">
        <div className="w-full mx-auto">
          <form className="flex flex-wrap flex-col items-center justify-center w-86" onSubmit={handleSubmit}>
            <div className="w-full">
              <label htmlFor="originProvince" className="block text-xl font-medium text-gray-700 mb-2">Select your origin province</label>
              <AutoSelect
                id="originProvince"
                name="originProvince"
                value={formData.originProvince}
                onChange={(e) => {
                  formData.originSubprovince = '';
                  formData.originEducationArea = '';
                  handleInputChange(e);
                }}
                options={provinceData.map(option => ({ value: option, label: option }))}
                placeholder="Origin province..."
                required={true}
              />
              <div className="flex transition-all duration-500 ease-in-out mt-1 gap-1">
                {/* Origin Area and Subprovince */}
                {isOriginAreaVisible && (
                  <AutoSelect
                    id="originEducationArea"
                    type={AutoSelectType.Secondary}
                    name="originEducationArea"
                    className='w-6/12'
                    value={formData.originEducationArea}
                    onChange={(e) => {
                      formData.originSubprovince = '';
                      handleInputChange(e);
                    }}
                    options={filteredOriginEducationAreaOptions}
                    placeholder={"Area..."}
                    required={originAreaRequired}
                    disabled={isOriginAreaDisabled}
                  />
                )
                }
                <AutoSelect
                  id="originSubprovince"
                  type={AutoSelectType.Secondary}
                  name="originSubprovince"
                  className='w-full'
                  styles={{}}
                  value={formData.originSubprovince}
                  onChange={(e) => {
                    formData.originEducationArea = '';
                    handleInputChange(e);
                  }}
                  options={filteredOriginSubprovinceOptions}
                  placeholder={formData.originProvince ? "Subprovince..." : "Select a province first"}
                  required={!isOriginAreaVisible}
                  disabled={isOriginSubprovinceDisabled}
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
                onChange={(e) => {
                  formData.destinationSubprovince = '';
                  formData.destinationEducationArea = '';
                  handleInputChange(e);
                }}
                options={provinceData.map(option => ({ value: option, label: option }))}
                placeholder="Destination province..."
                required={true}
              />
              <div className="flex transition-all duration-500 ease-in-out mt-1 gap-1">
                {/* Destination Area and Subprovince */}
                {isDestinationAreaVisible && (
                  <AutoSelect
                    id="destinationEducationArea"
                    type={AutoSelectType.Secondary}
                    name="destinationEducationArea"
                    className='w-6/12'
                    value={formData.destinationEducationArea}
                    onChange={(e) => {
                      formData.destinationSubprovince = '';
                      handleInputChange(e);
                    }}
                    options={filteredDestinationEducationAreaOptions}
                    placeholder={"Area..."}
                    required={destinationAreaRequired}
                    disabled={isDestinationAreaDisabled}
                  />
                )
                }
                <AutoSelect
                  id="destinationSubprovince"
                  type={AutoSelectType.Secondary}
                  name="destinationSubprovince"
                  className='w-full'
                  value={formData.destinationSubprovince}
                  onChange={(e) => {
                    formData.destinationEducationArea = '';
                    handleInputChange(e);
                  }}
                  options={filteredDestinationSubprovinceOptions}
                  placeholder={formData.destinationProvince ? "Subprovince..." : "Select a province first"}
                  required={!isDestinationAreaVisible}
                  disabled={isDestinationSubpriovinceDisabled}                
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
