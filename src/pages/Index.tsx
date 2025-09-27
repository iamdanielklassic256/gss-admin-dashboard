import React from 'react';
import { ChristianNavigation } from '@/components/ChristianNavigation';
import { ChristianHero } from '@/components/ChristianHero';
import { ChristianAbout } from '@/components/ChristianAbout';
import { ChristianPrograms } from '@/components/ChristianPrograms';
import { ChristianValues } from '@/components/ChristianValues';
import { ChristianFooter } from '@/components/ChristianFooter';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ChristianNavigation />
      <main>
        <ChristianHero />
        <ChristianAbout />
        <ChristianPrograms />
        <ChristianValues />
      </main>
      <ChristianFooter />
    </div>
  );
};

export default Index;