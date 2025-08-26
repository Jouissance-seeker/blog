'use client';

import { useQueryState } from 'nuqs';
import { ConceptCard } from './concept-card';
import { ResultEmpty } from '@/containers/routes/global/result-empty';
import { Concept } from '@/types/concept';
import { AnimatedSection } from '../global/animated-section';

interface ConceptListProps {
  initialConcepts: Concept[];
}

export const ConceptList = ({ initialConcepts }: ConceptListProps) => {
  const [authors] = useQueryState('authors', { defaultValue: '' });

  let filteredConcepts = initialConcepts
    .filter((concept) => concept.isActive == 'yes')
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
      filteredConcepts = filteredConcepts.filter((concept) =>
        authorList.includes(concept.author),
      );
    }
  }

  return (
    <section className="flex flex-col gap-4">
      {filteredConcepts.length === 0 ? (
        <ResultEmpty text="مفهومی یافت نشد ..." />
      ) : (
        filteredConcepts.map((concept, index) => (
          <AnimatedSection key={concept._id?.toString()}>
            <ConceptCard
              concept={concept}
              number={filteredConcepts.length - index - 1}
            />
          </AnimatedSection>
        ))
      )}
    </section>
  );
};
