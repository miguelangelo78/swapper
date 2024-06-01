'use client';
import toast, { Toaster } from 'react-hot-toast';
import { SwapperButton } from '@/components/SwapperButton';

const notify = () => toast('Messaging will be supported after Swapper Beta. Stay tuned for updates.');

export default function SendMessageButton() {
  return (
    <>
      <SwapperButton text='Send Message' styleType='tertiary' className='w-40' onClick={notify} />
      <Toaster position="bottom-center" toastOptions={{ style: { fontWeight: 'bold' } }} />
    </>
  )
}
