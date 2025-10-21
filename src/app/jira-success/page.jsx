'use client';

import { Suspense } from 'react';
import { JiraIntegration } from '@/components/integrations/JiraIntegration';

export default function JiraSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JiraIntegration />
    </Suspense>
  );
}
