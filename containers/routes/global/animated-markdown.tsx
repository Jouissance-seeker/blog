'use client';

import { marked } from 'marked';
import { AnimatedSection } from './animated-section';
import { cn } from '@/utils/cn';
import { useEffect } from 'react';

export const AnimatedMarkdown = (props: {
  content: string;
  className?: string;
}) => {
  const tokens = marked.lexer(props.content);

  // استایل‌های CSS را به صورت inline اعمال می‌کنیم
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `

    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div id="custom-prose" className={cn('w-full', props.className)}>
      {tokens.map((token, index) => {
        const htmlContent = marked.parser([token]);
        const commonProps = {
          dangerouslySetInnerHTML: { __html: htmlContent },
        };

        if (
          ['heading', 'paragraph', 'list', 'blockquote'].includes(token.type)
        ) {
          return (
            <AnimatedSection key={index}>
              <div {...commonProps} />
            </AnimatedSection>
          );
        }

        return <div key={index} {...commonProps} />;
      })}
    </div>
  );
};
