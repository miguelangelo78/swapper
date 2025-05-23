import React, { ChangeEvent, useState } from 'react';
import { SwapperUser } from '@/lib/models/SwapperUser.types';
import AutoSelect from './AutoSelect';
import { SelectOptionType } from './SetupFormWizardComponent';
import majors from '@/lib/data/majors.json';
import { SwapperButton } from '../SwapperButton';

const ENABLE_MAJOR_SWAPPING = false;

export default function SetupFormStep4Component({ user, formData, handleInputChange, handleSubmit, handlePreviousStep }: {
  user: SwapperUser,
  formData: any,
  handleInputChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement> | SelectOptionType) => void,
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  handlePreviousStep: () => void,
}) {
  const [disableDestination, setDisableDestination] = useState(formData.disableDestinationMajor);

  const handleDisableDestinationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDisableDestination(event.target.checked);
    formData.disableDestinationMajor = event.target.checked;
    if (event.target.checked) {
      formData.destinationMajor = '';  // Clear the destination if disabled
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="text-2xl font-black mb-2 mt-5 justify-center text-center">Step 4: Select your Major</div>
      <div className="text-xl mb-5 text-primary font-medium justify-center text-center">
        Where would you like to swap to and from?
      </div>
      <div className="flex flex-wrap justify-center">
        <div className="w-full mx-auto">
          <form className="flex flex-wrap flex-col items-center justify-center w-86" onSubmit={handleSubmit}>
            <div className="w-full">
              <label htmlFor="originMajor" className="block text-xl font-medium text-gray-700 mb-2">Select your origin major</label>
              <AutoSelect
                id="originMajor"
                name="originMajor"
                value={formData.originMajor}
                onChange={handleInputChange}
                options={majors.map(option => ({ value: option, label: option }))}
                placeholder="Origin major..."
                required={true}
              />
            </div>
            {ENABLE_MAJOR_SWAPPING ? (
              <>
                <div className="flex justify-center">
                  <span className="text-5xl font-black text-primary">↓</span>
                </div>
                <div className="w-full">
                  <label htmlFor="destinationMajor" className="block text-xl font-medium text-gray-700 mb-2">Select your destination major</label>
                  <AutoSelect
                    id="destinationMajor"
                    name="destinationMajor"
                    value={formData.destinationMajor}
                    onChange={handleInputChange}
                    options={majors.map(option => ({ value: option, label: option }))}
                    placeholder="Destination major..."
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
                      <label htmlFor="disableDestination" className="ml-2 text-sm font-medium text-gray-900 cursor-pointer select-none">I don&apos;t want to select a destination major</label>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
            <div className="flex w-full gap-4 justify-between mt-5">
              <SwapperButton text='Previous Step' styleType='secondary' onClick={handlePreviousStep} />
              <SwapperButton type='submit' text='Next Step' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
