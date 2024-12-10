import React from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  markdown: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown }) => {
  const components: Components = {
    h2: ({ children }) => <h1 className="bg-teal-400 text-4xl font-bold mb-4">{children}</h1>,
    h3: ({ children }) => <h2 className="text-3xl font-semibold mb-3">{children}</h2>,
    ul: ({ children }) => <ul className="list-disc pl-5 mb-4">{children}</ul>,
    p: ({ children }) => <p className="text-base leading-relaxed mb-4">{children}</p>,
  };

  return (
    <div className="prose max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;