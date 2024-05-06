'use client';
import { SwapperUser } from '@/lib/models/SwapperUser.types';
import Required from './RequiredCheckComponent';
import { ChangeEvent } from 'react';
import { SelectOptionType } from './SetupFormWizardComponent';
import { SwapperButton } from '../SwapperButton';

export default function SetupFormStep1Component({ user, formData, handleInputChange, handleSubmit }: {
  user: SwapperUser,
  formData: any,
  handleInputChange: (event: ChangeEvent<HTMLInputElement> | SelectOptionType) => void,
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-2xl font-black mb-2 mt-4 justify-center text-center">Almost there {user.firstName}!</div>
      <div className="text-lg mb-3 text-primary font-medium justify-center text-center">
        Please follow the steps before matching
      </div>
      <div className="flex flex-wrap justify-center">
        <div className="max-w-lg w-full mx-auto">
          <form className="space-y-4 w-80" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name <Required /></label>
              <input type="text" id="firstName" name="firstName" defaultValue={formData.firstName}
                onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name <Required /></label>
              <input type="text" id="lastName" name="lastName" defaultValue={formData.lastName}
                onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">Nickname</label>
              <input type="text" id="nickname" name="nickname" defaultValue={formData.nickname}
                onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700">Current School Name</label>
              <input type="text" id="schoolName" name="schoolName" defaultValue={formData.schoolName}
                onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <div className="text-2xl font-black text-center">Contact details</div>
            </div>
            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">Email <Required /></label>
              <input type="text" id="contactEmail" name="contactEmail" defaultValue={formData.contactEmail}
                onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="contactLine" className="block text-sm font-medium text-gray-700">Line ID</label>
              <input type="text" id="contactLine" name="contactLine" defaultValue={formData.contactLine}
                onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="contactFacebook" className="block text-sm font-medium text-gray-700">Facebook</label>
              <input type="text" id="contactFacebook" name="contactFacebook" defaultValue={formData.contactFacebook}
                onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="text" id="contactPhone" name="contactPhone" defaultValue={formData.contactPhone}
                onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className='pb-7'>
              <SwapperButton className='w-full' type='submit' text='Next Step' />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
