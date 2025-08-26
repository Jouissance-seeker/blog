'use client';

import { ConceptCard } from './concept-card';
import { ResultEmpty } from '@/containers/routes/global/result-empty';
import { Concept } from '@/types/concept';
import { AnimatedSection } from '../global/animated-section';

interface ConceptListProps {
  initialConcepts: Concept[];
}

export const ConceptList = (props: ConceptListProps) => {
  const filteredConcepts = props.initialConcepts
    .filter((concept) => concept.isActive == 'yes')
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime(),
    );

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
