import React, { ChangeEvent, useState } from 'react';
import { SwapperUser } from '@/lib/models/SwapperUser.types';
import AutoSelect from './AutoSelect';
import { SelectOptionType } from './SetupFormWizardComponent';
import areaOffices from '@/lib/data/areaOffices.json';
import { SwapperButton } from '../SwapperButton';

export default function SetupFormStep2Component({ user, formData, handleInputChange, handleSubmit, handlePreviousStep }: {
  user: SwapperUser,
  formData: any,
  handleInputChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement> | SelectOptionType) => void,
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  handlePreviousStep: () => void,
}) {
  const [disableDestination, setDisableDestination] = useState(formData.disableDestinationAreaOffice);

  const handleDisableDestinationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDisableDestination(event.target.checked);
    formData.disableDestinationAreaOffice = event.target.checked;
    if (event.target.checked) {
      formData.destinationAreaOffice = '';  // Clear the destination if disabled
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="text-2xl font-black mb-2 mt-5 justify-center text-center">Step 2: Select your Educational Area Office</div>
      <div className="text-xl mb-10 text-primary font-medium justify-center text-center">
        Where would you like to swap to and from?
      </div>
      <div className="flex flex-wrap justify-center">
        <div className="w-full mx-auto">
          <form className="flex flex-wrap flex-col items-center justify-center w-96" onSubmit={handleSubmit}>
            <div className="w-full">
              <label htmlFor="originAreaOffice" className="block text-xl font-medium text-gray-700 mb-2">Select your origin area office</label>
              <AutoSelect
                id="originAreaOffice"
                name="originAreaOffice"
                value={formData.originAreaOffice}
                onChange={handleInputChange}
                options={areaOffices.map(option => ({ value: option, label: option }))}
                placeholder="Origin area office..."
                required={true}
              />
            </div>
            <div className="flex justify-center">
              <span className="text-5xl font-black text-primary">↓</span>
            </div>
            <div className="w-full mb-5">
              <label htmlFor="destinationAreaOffice" className="block text-xl font-medium text-gray-700 mb-2">Select your destination area office</label>
              <AutoSelect
                id="destinationAreaOffice"
                name="destinationAreaOffice"
                value={formData.destinationAreaOffice}
                onChange={handleInputChange}
                options={areaOffices.map(option => ({ value: option, label: option }))}
                placeholder="Destination area office..."
                disabled={disableDestination}
                required={!disableDestination}
              />
              <div className="w-full mt-5">
                <div className="flex items-center mt-3">
                  <input
                    type="checkbox"
                    id="disableDestination"
                    name="disableDestination"
                    checked={disableDestination}
                    onChange={handleDisableDestinationChange}
                    className="form-checkbox h-7 w-7 text-primary border-primary rounded focus:ring-indigo-500 cursor-pointer"
                  />
                  <label htmlFor="disableDestination" className="ml-2 text-sm font-medium text-gray-900 cursor-pointer select-none">I don&apos;t want to select a destination area office</label>
                </div>
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
