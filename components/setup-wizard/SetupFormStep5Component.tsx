import React, { ChangeEvent, useEffect, useState } from 'react';
import { SwapperUser } from '@/lib/models/SwapperUser.types';
import { SelectOptionType } from './SetupFormWizardComponent';
import { SwapperButton } from '../SwapperButton';
import { completeSetup } from '@/lib/services/client/user.service';
import { useRouter } from 'next/navigation';
import imageCompression from 'browser-image-compression';
import Image from 'next/image';

export default function SetupFormStep5Component({ user, formData, handleInputChange, handleSubmit, handlePreviousStep }: {
  user: SwapperUser,
  formData: any,
  handleInputChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement> | SelectOptionType) => void,
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  handlePreviousStep: () => void,
}) {
  const router = useRouter()
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    // Set the initial profile image if it exists
    if (formData.profileImage) {
      setProfileImage(formData.profileImage);
    }
  }, [formData.profileImage]);

  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      // Compress the image
      const options = {
        maxSizeMB: 1,          // Maximum file size in MB
        maxWidthOrHeight: 500, // Maximum width or height
        useWebWorker: true,    // Use web workers for better performance
      };
      const compressedFile = await imageCompression(file, options);

      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target!.result as string);  // Update local state with new image
        handleInputChange({ name: 'profileImage', value: e.target!.result as any }); // Update formData state in parent component
      };
      reader.readAsDataURL(compressedFile);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('profileImageInput')!.click();
  };

  const handleCompleteSetup = async () => {
    completeSetup(formData)
      .then(() => router.push('/welcome'));
  };

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="text-2xl font-black mb-2 mt-5 justify-center text-center">Step 5: Change your picture</div>
      <div className="text-xl mb-10 text-primary font-medium justify-center text-center">
        Would you like to change your profile picture?
      </div>
      <div className="w-full flex justify-center">
        {profileImage ? (
          <Image src={profileImage} alt="Profile" width={400} height={400} className="w-40 h-40 rounded-full object-cover object-center cursor-pointer" onClick={triggerFileInput} />
        ) : (
          <div className="text-lg text-gray-400">No image selected</div>
        )}
      </div>

      <div className="flex flex-wrap justify-center">
        <div className="w-full mx-auto">
          <div className="flex flex-wrap flex-col items-center justify-center w-80">
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
            <label htmlFor="profileImageInput" className="py-2 w-full text-center text-xl mt-6 cursor-pointer border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Upload a new profile picture</label>
            <div className="flex w-full gap-4 justify-center mt-5">
              <SwapperButton text='Previous Step' styleType='secondary' onClick={handlePreviousStep} />
              <SwapperButton text='Complete Setup' useSpinner={true} onClick={handleCompleteSetup} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
