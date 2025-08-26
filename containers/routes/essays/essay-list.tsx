'use client';

import { EssayCard } from './essay-card';
import { Essay } from '@/types/essay';
import { AnimatedSection } from '../global/animated-section';
import { ResultEmpty } from '../global/result-empty';

interface EssayListProps {
  initialEssays: Essay[];
}

export const EssayList = (props: EssayListProps) => {
  const filteredEssays = props.initialEssays
    .filter((essay) => essay.isActive == 'yes')
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime(),
    );

  return (
    <section className="flex flex-col gap-4">
      {filteredEssays.length === 0 ? (
        <ResultEmpty text="جستاری یافت نشد ..." />
      ) : (
        filteredEssays.map((essay, index) => (
          <AnimatedSection key={essay.id}>
            <EssayCard
              essay={essay}
              number={filteredEssays.length - index - 1}
            />
          </AnimatedSection>
        ))
      )}
    </section>
  );
};
