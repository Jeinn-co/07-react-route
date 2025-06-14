import { Suspense } from 'react';

export default function PageWrapper({ children }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
  );
} 