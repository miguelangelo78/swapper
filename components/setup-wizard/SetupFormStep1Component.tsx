'use client';
import { SwapperUser } from '@/lib/models/SwapperUserBase';
import Required from './RequiredCheckComponent';

export default function SetupFormStep1Component({ user, formData, handleInputChange, handleSubmit }: {
  user: SwapperUser,
  formData: any,
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}) {
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="text-4xl font-bold mb-5 mt-5">Almost there {user.name}!</div>
      <div className="text-xl mb-10 text-primary font-medium justify-center text-center">
        Please fill in the information below before you can start matching
      </div>
      <div className="flex flex-wrap justify-center">
        <div className="max-w-lg w-full mx-auto">
          <form className="space-y-4 w-96" onSubmit={handleSubmit}>
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
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact <Required /></label>
              <input type="text" id="contact" name="contact" defaultValue={formData.contact}
                onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Next step
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
