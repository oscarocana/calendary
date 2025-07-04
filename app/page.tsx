import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import LandingPage from './components/LandingPage';

export default async function HomePage() {
  
  const user = await currentUser();
  
  // If the user is not authenticated, redirect to the landing page
  if (!user) return <LandingPage />

  // If the user is authenticated, redirect to the events page
  return redirect('/events')
}
