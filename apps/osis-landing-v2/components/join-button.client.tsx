'use client'

import posthog from 'posthog-js';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const handleSignupClick = (router: ReturnType<typeof useRouter>) => {
  posthog.capture('join_button_clicked');
  router.push('/join');
};

export const JoinButton = () => {
  const router = useRouter();
  return (
    <Button 
      onClick={() => handleSignupClick(router)} 
      className='text-white/90 hover:text-white text-2xl  my-6 hover:underline bg-transparent hover:bg-transparent  cursor-pointer w-fit'
    >
      Sign Up for Early Access →
    </Button>
  );
};