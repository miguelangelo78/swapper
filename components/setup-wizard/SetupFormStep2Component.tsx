import React, { ChangeEvent } from 'react';
import { SwapperUser } from '@/lib/models/SwapperUser.types';
import ProvinceSelect from './ProvinceSelect';

// Dummy data for the dropdowns - replace this with actual data
const provinceOptions = [
  { value: 'Bangkok', label: 'Bangkok' },
  { value: 'Chiang Mai', label: 'Chiang Mai' },
  { value: 'Phuket', label: 'Phuket' },
  { value: 'Khon Kaen', label: 'Khon Kaen' },
  { value: 'Udon Thani', label: 'Udon Thani' },
];

const areas = ["Area Office 1", "Area Office 2", "Area Office 3"];

export default function SetupFormStep2Component({ user, formData, handleInputChange, handleSubmit, handlePreviousStep }: {
  user: SwapperUser,
  formData: any,
  handleInputChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement> | { value: string; name: string }) => void,
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  handlePreviousStep: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="text-4xl font-bold mb-5 mt-5 justify-center text-center">Step 2</div>
      <div className="text-xl mb-10 text-primary font-medium justify-center text-center">
        Please provide details about your origin and destination
      </div>
      <div className="flex flex-wrap justify-center">
        <div className="w-full mx-auto">
          <form className="flex flex-wrap flex-col items-center justify-center w-96 p-4" onSubmit={handleSubmit}>
            <div className="w-full mb-5">
              <label htmlFor="originProvince" className="block text-lg font-medium text-gray-700">Select your origin province:</label>
              <ProvinceSelect
                id="originProvince"
                name="originProvince"
                value={formData.originProvince}
                onChange={handleInputChange}
                options={provinceOptions}
                placeholder="Select your origin province..."
              />
            </div>
            <div className="w-full mb-5">
              <label htmlFor="destinationProvince" className="block text-lg font-medium text-gray-700">Select your destination province:</label>
              <ProvinceSelect
                id="destinationProvince"
                name="destinationProvince"
                value={formData.destinationProvince}
                onChange={handleInputChange}
                options={provinceOptions}
                placeholder="Select your destination province..."
              />
            </div>
            {/* Additional fields below for less critical data */}
            <div className="w-full mb-5">
              <label htmlFor="originAreaOffice" className="block text-sm font-medium text-gray-700">Origin Area Office:</label>
              <select
                id="originAreaOffice"
                name="originAreaOffice"
                value={formData.originAreaOffice}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="">-- Select an area office --</option>
                {areas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
            {/* More fields like subprovince and major could be added similarly */}
            <div className="flex w-full justify-between">
              <button
                type="button"
                className="py-2 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                onClick={handlePreviousStep}
              >
                Previous Step
              </button>
              <button
                type="submit"
                className="py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Next Step
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
