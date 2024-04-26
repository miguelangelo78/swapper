'use client';
import { SwapperUser } from '@/lib/models/SwapperUser.types';
import Required from './RequiredCheckComponent';
import { ChangeEvent } from 'react';
import { SelectOptionType } from './SetupFormWizardComponent';

export default function SetupFormStep1Component({ user, formData, handleInputChange, handleSubmit }: {
  user: SwapperUser,
  formData: any,
  handleInputChange: (event: ChangeEvent<HTMLInputElement> | SelectOptionType) => void,
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}) {
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="text-4xl font-bold mb-5 mt-5 justify-center text-center">Almost there {user.firstName}!</div>
      <div className="text-xl mb-10 text-primary font-medium justify-center text-center">
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
              <div className="text-2xl font-bold text-center">Contact details</div>
              <hr className='w-full bg-secondary mt-1 h-1' />
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
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Next Step
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
