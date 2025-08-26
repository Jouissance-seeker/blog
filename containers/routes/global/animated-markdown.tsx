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
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .prose h2 {
        font-size: 1.25rem !important;
        font-weight: 600 !important;
        margin-bottom: 0.75rem !important;
        margin-top: 1.5rem !important;
        line-height: 1.4 !important;
        color: var(--foreground) !important;
      }
      .prose h2:first-child {
        margin-top: 0 !important;
      }
      .prose p {
        font-size: 1rem !important;
        line-height: 1.6 !important;
        margin-bottom: 1rem !important;
        text-align: justify !important;
        color: hsl(var(--muted-foreground)) !important;
      }
      .prose blockquote p {
        font-size: 1rem !important;
      }
      .prose ul,
      .prose ol {
        font-size: 1rem !important;
        margin-bottom: 1rem !important;
        padding-left: 1.5rem !important;
      }
      .prose li {
        line-height: 1.6 !important;
        margin-bottom: 0.5rem !important;
        color: hsl(var(--muted-foreground)) !important;
      }
      .prose ul {
        list-style-type: disc !important;
      }
      .prose ol {
        list-style-type: decimal !important;
      }
      #custom-prose h2 {
        font-size: 1.20rem !important;
        font-weight: 600 !important;
        margin-bottom: 0.75rem !important;
        margin-top: 1.5rem !important;
        line-height: 1.4 !important;
        color: var(--foreground) !important;
      }
      #custom-prose h2:first-child {
        margin-top: 0 !important;
      }
      #custom-prose p {
        font-size: 1rem !important;
        line-height: 1.6 !important;
        margin-bottom: 1rem !important;
        text-align: justify !important;
        color: hsl(var(--muted-foreground)) !important;
      }
      #custom-prose ul,
      #custom-prose ol {
        font-size: 1rem !important;
        margin-bottom: 1rem !important;
        padding-left: 1.5rem !important;
      }
      #custom-prose li {
        line-height: 1.6 !important;
        margin-bottom: 0.5rem !important;
        color: hsl(var(--muted-foreground)) !important;
      }
      #custom-prose ul {
        list-style-type: disc !important;
      }
      #custom-prose ol {
        list-style-type: decimal !important;
      }
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
