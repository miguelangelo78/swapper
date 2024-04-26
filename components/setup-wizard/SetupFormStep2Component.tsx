import React, { ChangeEvent, useEffect, useState } from 'react';
import { SwapperUser } from '@/lib/models/SwapperUser.types';
import ProvinceSelect from './ProvinceSelect';
import SubprovinceSelect from './SubprovinceSelect';
import { SelectOptionType } from './SetupFormWizardComponent';

// Dummy data for the dropdowns - replace this with actual data
const provinceOptions = [
  'Bangkok',
  'Chiang Mai',
  'Phuket',
  'Khon Kaen',
  'Udon Thani',
];

const subprovinceData = {
  'Bangkok': [
    'Pathum Wan',
    'Wattana',
    'Bang Kho Laem',
  ],
  'Chiang Mai': [
    'Mueang Chiang Mai',
    'San Kamphaeng',
    'Hang Dong',
  ],
  'Phuket': [
    'Mueang Phuket',
    'Kathu',
    'Thalang',
  ],
  'Khon Kaen': [
    'Mueang Khon Kaen',
    'Ban Phai',
    'Nong Ruea',
  ],
  'Udon Thani': [
    'Mueang Udon Thani',
    'Kumphawapi',
    'Nong Han',
  ],
};

const areas = ["Area Office 1", "Area Office 2", "Area Office 3"];

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
      <div className="text-4xl font-bold mb-5 mt-5 justify-center text-center">Step 2: Select your Province</div>
      <div className="text-xl mb-10 text-primary font-medium justify-center text-center">
        Where would you like to swap to and from?
      </div>
      <div className="flex flex-wrap justify-center">
        <div className="w-full mx-auto">
          <form className="flex flex-wrap flex-col items-center justify-center w-80" onSubmit={handleSubmit}>
            <div className="w-full">
              <label htmlFor="originProvince" className="block text-xl font-medium text-gray-700 mb-2">Select your origin province</label>
              <ProvinceSelect
                id="originProvince"
                name="originProvince"
                value={formData.originProvince}
                onChange={handleInputChange}
                options={provinceOptions.map(option => ({ value: option, label: option }))}
                placeholder="Origin province..."
              />
              <div className="transition-all duration-500 ease-in-out mt-1">
                <SubprovinceSelect
                  id="originSubprovince"
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
              <ProvinceSelect
                id="destinationProvince"
                name="destinationProvince"
                value={formData.destinationProvince}
                onChange={handleInputChange}
                options={provinceOptions.map(option => ({ value: option, label: option }))}
                placeholder="Destination province..."
              />
              <div className="transition-all duration-500 ease-in-out mt-1">
                <SubprovinceSelect
                  id="destinationSubprovince"
                  name="destinationSubprovince"
                  value={formData.destinationSubprovince}
                  onChange={handleInputChange}
                  options={filteredDestinationSubprovinceOptions}
                  placeholder={formData.destinationProvince ? "Subprovince..." : "Select a province first"}
                  disabled={!formData.destinationProvince}
                />
              </div>
            </div>
            <div className="flex w-full justify-between">
              <button type="button" className="py-2 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50" onClick={handlePreviousStep}>
                Previous Step
              </button>
              <button type="submit" className="py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Next Step
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
