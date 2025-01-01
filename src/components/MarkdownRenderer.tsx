import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { FaLink } from "react-icons/fa";

interface MarkdownRendererProps {
  markdown: string;
}

const extractHeadingId = (text: string) => {
  const cleanedText = text.replace(/\s*\{#.*\}\s*$/, "");
  const match = text.match(/\{#(.*?)\}/);
  const id = match ? match[1] : "";
  return { cleanedText, id };
};
const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown }) => {
  const sectionRef = useRef<HTMLHeadingElement | null>(null);

  const components: Components = {
    h2: (props) => {
      const text = props.children?.toString().trim();

      if (text) {
        const { cleanedText, id } = extractHeadingId(text);

        return (
          <h2
            onClick={() => {
              const el = document.getElementById(id);

              if (el) {
                const offset = 164;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = el.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth",
                });
              }
            }}
            id={id}
            ref={sectionRef}
            className="group flex items-center text-2xl font-bold text-tertiary"
          >
            <Link to={`#${id}`} className="relative flex flex-row no-underline">
              {cleanedText}
              <span className="absolute bottom-0 left-0 h-[2px] w-full scale-x-0 transform rounded-full bg-current transition-transform duration-500 ease-in-out group-hover:scale-x-100"></span>
            </Link>
            <FaLink
              size="16px"
              className="ml-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
          </h2>
        );
      }

      return null;
    },
    h3: (props) => {
      const text = props.children?.toString().trim();

      if (text) {
        const { cleanedText, id } = extractHeadingId(text);
        return (
          <>
            <h3
              id={id}
              className="group flex items-center text-2xl font-semibold text-tertiary"
            >
              {cleanedText}
            </h3>
          </>
        );
      }

      return null;
    },
    h4: (props) => {
      const text = props.children?.toString().trim();
      if (text) {
        const { cleanedText, id } = extractHeadingId(text);
        return (
          <h4
            id={id}
            className="group flex items-center text-lg font-semibold text-tertiary"
          >
            <Link to={`#${id}`} className="relative no-underline">
              {cleanedText}
              <span className="absolute bottom-0 left-0 h-[2px] w-full scale-x-0 transform rounded-full bg-current transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
            </Link>
            <FaLink
              size="12px"
              className="ml-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
          </h4>
        );
      }

      return null;
    },
    blockquote: (props) => (
      <div className="rounded-md border-l-[10px] border-test bg-test/10 p-4 text-gray-700">
        {props.children}
      </div>
    ),
    img: ({ ...props }) => <img className="max-w-full rounded-md" {...props} />,
    p: (props) => <p className="l text-gray-600">{props.children}</p>,
    cite: (props) => <cite>{props.children}</cite>,
    ul: (props) => (
      <ul className="mb-4 list-disc space-y-2 pl-6">{props.children}</ul>
    ),
    ol: (props) => (
      <ol className="mb-4 list-decimal space-y-2 pl-6">{props.children}</ol>
    ),
    li: (props) => <li className="mb-1 text-gray-700">{props.children}</li>,
    pre: (props) => <pre>{props.children}</pre>,
    strong: (props) => <strong>{props.children}</strong>,
    em: (props) => <em>{props.children}</em>,
    hr: () => <hr className="h-5" />,
    a: (props) => (
      <Link
        to={props.href || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className=""
      >
        {props.children}
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
