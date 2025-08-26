import { marked } from 'marked';
import { AnimatedSection } from './animated-section';

export const AnimatedMarkdown = ({ content }: { content: string }) => {
  const tokens = marked.lexer(content);
  return (
    <>
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
    </>
  );
};
