'use client';
import { BaseSyntheticEvent, ChangeEvent, useEffect, useState } from 'react';
import { SwapperUser } from '@/lib/models/SwapperUser.types';
import SetupFormStep1Component from './SetupFormStep1Component';
import SetupFormStep2Component from './SetupFormStep2Component';
import SetupFormStep3Component from './SetupFormStep3Component';
import SetupFormStep4Component from './SetupFormStep4Component';
import SetupFormStep5Component from './SetupFormStep5Component';

export interface SelectOptionType {
  value: string;
  name: string;
}

export default function SetupFormWizardComponent({ user }: { user: SwapperUser }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    nickname: '',
    contactEmail: user.email,
    contactLine: '',
    contactFacebook: '',
    contactPhone: '',
    originProvince: '',
    destinationProvince: '',
    originSubprovince: '',
    destinationSubprovince: '',
    originAreaOffice: '',
    destinationAreaOffice: '',
    originMajor: '',
    destinationMajor: '',
    profileImage: user.picture,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement> | SelectOptionType) => {
    const name = 'name' in event ? event.name : event.target.name;
    const value = 'value' in event ? event.value : event.target.value;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    // Whenever currentStep changes, scroll to the top of the page
    window.scrollTo(0, 0);
  }, [currentStep]);

  // Ask the following details:
  // First name
  // Last name
  // Age
  // Upload a profile picture
  // Educational Service Area Office: origin and destination
  // Major
  // Province
  // Subprovince
  // Contact (at least one: phone number, facebook, line, email, etc.)

  // After the user has filled out the form, they should be able to submit it.
  // The form data should be sent to the server to be saved in the database.
  // The user should then be redirected to the matcher page.

  switch (currentStep) {
    case 1: return <SetupFormStep1Component user={user} formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
    case 2: return <SetupFormStep2Component user={user} formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} handlePreviousStep={handlePreviousStep} />
    case 3: return <SetupFormStep3Component user={user} formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} handlePreviousStep={handlePreviousStep} />
    case 4: return <SetupFormStep4Component user={user} formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} handlePreviousStep={handlePreviousStep} />
    case 5: return <SetupFormStep5Component user={user} formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} handlePreviousStep={handlePreviousStep} />
  }

  return (
    <>
      <div className='justify-center text-center'>
        <div className='text-4xl font-bold mb-5 mt-5 justify-center text-center'>You are on step {currentStep}!</div>
        <button
          type="button"
          className="py-2 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          onClick={handlePreviousStep}
        >
          Previous Step
        </button>
      </div>
    </>
  );
}
