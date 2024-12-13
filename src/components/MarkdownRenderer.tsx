import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  markdown: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown }) => {
  const components: Components = {
    h1: ({ children }) => <Link to={`#${children}`.replace(/\s+/g, '-').toLowerCase()} className="no-underline" ><h1>{children}</h1></Link>,
    h2: ({ children }) => <Link to={`#${children}`.replace(/\s+/g, '-').toLowerCase()} className="no-underline" ><h2 className="text-xl text-secondary my-4">{children}</h2></Link>,
    h3: ({ children }) => <Link to={`#${children}`.replace(/\s+/g, '-').toLowerCase()} className="no-underline" ><h3>{children}</h3></Link>,
    h4: ({ children }) => <Link to={`#${children}`.replace(/\s+/g, '-').toLowerCase()} className="no-underline" ><h4>{children}</h4></Link>,
    p: ({ children }) => <p className="">{children}</p>,
    img: ({ ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
    ul: ({ children }) => <ul>{children}</ul>,
    ol: ({ children }) => <ol>{children}</ol>,
    li: ({ children }) => <li>{children}</li>,
    blockquote: ({ children }) => (
      <blockquote>{children}</blockquote>
    ),
    pre: ({ children }) => (
      <pre>{children}</pre>
    ),
    code: ({ children }) => (
      <code>{children}</code>
    ),
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    hr: () => (
      <hr className="w" />
    ),
    a: ({ children, href }) => (
      <Link to={href || '#'} target="_blank" rel="noopener noreferrer" className="">
        {children}
      </Link>
    ),
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