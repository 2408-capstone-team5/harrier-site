import React from "react";
import { Link } from "react-router-dom";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  markdown: string;
}

const extractHref = (children: React.ReactNode): string => {
  if (typeof children === "string") {
    return children;
  }
  if (Array.isArray(children)) {
    return children.map(extractHref).join("");
  }
  if (React.isValidElement(children)) {
    return extractHref(children.props.children);
  }
  return "";
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown }) => {
  const components: Components = {
    h1: ({ children }) => (
      <Link
        to={`#${extractHref(children).replace(/\s+/g, "-").toLowerCase()}`}
        className="flex flex-shrink-0 no-underline underline-offset-4 hover:underline"
      >
        <h1>{children}</h1>
      </Link>
    ),
    h2: ({ children }) => (
      <Link
        to={`#${extractHref(children).replace(/\s+/g, "-").toLowerCase()}`}
        className="no-underline underline-offset-4 hover:underline"
      >
        <h2 className="my-4 text-xl">{children}</h2>
      </Link>
    ),
    h3: ({ children }) => (
      <Link
        to={`#${extractHref(children).replace(/\s+/g, "-").toLowerCase()}`}
        className="no-underline underline-offset-4 hover:underline"
      >
        <h3>{children}</h3>
      </Link>
    ),
    h4: ({ children }) => (
      <Link
        to={`#${children}`.replace(/\s+/g, "-").toLowerCase()}
        className="no-underline underline-offset-4 hover:underline"
      >
        <h4>{children}</h4>
      </Link>
    ),
    p: ({ children }) => <p className="">{children}</p>,
    img: ({ ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
      <img {...props} />
    ),
    cite: ({ children }) => <cite>{children}</cite>,
    ul: ({ children }) => <ul>{children}</ul>,
    ol: ({ children }) => <ol>{children}</ol>,
    li: ({ children }) => <li>{children}</li>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    pre: ({ children }) => <pre>{children}</pre>,
    code: ({ children }) => <code>{children}</code>,
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    hr: () => <hr className="w" />,
    a: ({ children, href }) => (
      <Link
        to={href || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className=""
      >
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
