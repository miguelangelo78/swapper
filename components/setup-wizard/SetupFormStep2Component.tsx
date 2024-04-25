import { SwapperUser } from '@/lib/models/SwapperUserBase';

export default function SetupFormStep1Component({ user, formData, handleInputChange, handleSubmit }: {
  user: SwapperUser,
  formData: any,
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}) {
  return (
    <>
      <div className="flex flex-col items-center justify-center py-2">
        <div className="text-4xl font-bold mb-5 mt-5">You are on step 2!</div>
        <div className="text-xl mb-10 text-primary font-medium justify-center text-center">
          TODO
        </div>
      </div>
    </>
  )
}
