'use client';

import { useQueryState } from 'nuqs';
import { EssayCard } from './essay-card';
import { Essay } from '@/types/essay';
import { AnimatedSection } from '../global/animated-section';
import { ResultEmpty } from '../global/result-empty';

interface EssayListProps {
  initialEssays: Essay[];
}

export const EssayList = (props: EssayListProps) => {
  const [authors] = useQueryState('authors', { defaultValue: '' });

  let filteredEssays = props.initialEssays
    .filter((essay) => essay.isActive == 'yes')
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime(),
    );

  if (authors.trim()) {
    const authorList = authors
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean);
    if (authorList.length > 0) {
      filteredEssays = filteredEssays.filter((essay) =>
        essay.authors?.some((author) => authorList.includes(author)),
      );
    }
  }

  return (
    <section className="flex flex-col gap-4">
      {filteredEssays.length === 0 ? (
        <ResultEmpty text="جستاری یافت نشد ..." />
      ) : (
        filteredEssays.map((essay, index) => (
          <AnimatedSection key={essay._id?.toString()}>
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
