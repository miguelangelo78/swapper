'use client';
import { BaseSyntheticEvent, useState } from 'react';
import SetupFormStep1Component from './SetupFormStep1Component';
import SetupFormStep2Component from './SetupFormStep2Component';
import { SwapperUser } from '@/lib/models/SwapperUser.types';

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
  });

  const handleInputChange = (event: BaseSyntheticEvent) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
  }

  return null;
}
