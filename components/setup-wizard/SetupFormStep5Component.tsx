import React, { ChangeEvent, useEffect, useState } from 'react';
import { SwapperUser } from '@/lib/models/SwapperUser.types';
import { SelectOptionType } from './SetupFormWizardComponent';

export default function SetupFormStep5Component({ user, formData, handleInputChange, handleSubmit, handlePreviousStep }: {
  user: SwapperUser,
  formData: any,
  handleInputChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement> | SelectOptionType) => void,
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  handlePreviousStep: () => void,
}) {
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    // Set the initial profile image if it exists
    if (formData.profileImage) {
      setProfileImage(formData.profileImage);
    }
  }, [formData.profileImage]);

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target!.result as string);  // Update local state with new image
        handleInputChange({ name: 'profileImage', value: e.target!.result as any});  // Update formData state in parent component
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('profileImageInput')!.click();
  };

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="text-2xl font-black mb-2 mt-5 justify-center text-center">Step 5: Change your picture</div>
      <div className="text-xl mb-10 text-primary font-medium justify-center text-center">
        Would you like to change your profile picture?
      </div>
      <div className="w-full flex justify-center">
        {profileImage ? (
          <img src={profileImage} alt="Profile" className="w-40 h-40 rounded-full object-cover object-center cursor-pointer" onClick={triggerFileInput} />
        ) : (
          <div className="text-lg text-gray-400">No image selected</div>
        )}
      </div>

      <div className="flex flex-wrap justify-center">
        <div className="w-full mx-auto">
          <form className="flex flex-wrap flex-col items-center justify-center w-80" onSubmit={handleSubmit}>
            <input
              type="file"
              placeholder='Upload a new profile picture'
              id="profileImageInput"
              name="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              title='Upload a new profile picture'
              className="hidden"
            />
            <label htmlFor="profileImageInput" className="py-2 px-6 text-xl mt-6 cursor-pointer border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Upload a new profile picture</label>
            <div className="flex w-full justify-around mt-5">
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
                Complete Setup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
