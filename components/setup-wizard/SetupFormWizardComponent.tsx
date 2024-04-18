'use client';
import { BaseSyntheticEvent, useState } from 'react';
import SetupFormStep1Component from './SetupFormStep1Component';
import { SwapperUser } from '@/lib/models/SwapperUserBase';

export default function SetupFormWizardComponent({ user }: { user: SwapperUser }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    nickname: '',
    contact: '',
  });

  const handleInputChange = (event: BaseSyntheticEvent) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    setCurrentStep(currentStep + 1);
  };

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
    case 2: return <>
      <div className="flex flex-col items-center justify-center py-2">
        <div className="text-4xl font-bold mb-5 mt-5">You are on step 2!</div>
        <div className="text-xl mb-10 text-primary font-medium justify-center text-center">
          TODO
        </div>
      </div>
    </>
  }

  return null;
}
