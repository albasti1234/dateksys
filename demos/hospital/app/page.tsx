import { redirect } from 'next/navigation';

export default function RootPage() {
  // Since this is a static export configuration, middleware won't automatically 
  // redirect the user from the root path to the default locale path.
  // We use redirect here to ensure users visiting /demos/hospital are 
  // properly sent to the default English locale.
  redirect('/en');
}
