import React from "react";
import { Link } from "react-router-dom";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { FaLink } from "react-icons/fa";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
interface MarkdownRendererProps {
  markdown: string;
}

// const Footnote = ({
//   id,
//   content,
// }: {
//   id: string;
//   content: React.ReactNode;
// }) => {
//   return (
//     <div id={`footnote-${id}`} className="footnote mt-4 text-sm">
//       <p>
//         <sup>{id}</sup>. {content}
//       </p>
//     </div>
//   );
// };
const extractHeadingId = (text: string) => {
  const cleanedText = text.replace(/\s*\{#.*\}\s*$/, "");
  const match = text.match(/\{#(.*?)\}/);
  const id = match ? match[1] : "";
  return { cleanedText, id };
};
const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown }) => {
  //   const [footnotes, setFootnotes] = useState<Map<string, React.ReactNode>>(
  //     new Map(),
  //   );
  const components: Components = {
    // h1: (props) => (
    //   <Link
    //     to={`#${extractHref(props.children).replace(/\s+/g, "-").toLowerCase()}`}
    //     className="flex flex-shrink-0 no-underline underline-offset-4 hover:underline"
    //   >
    //     <h1>{props.children}</h1>
    //   </Link>
    // ),

    h2: (props) => {
      const text = props.children?.toString().trim();

      if (text) {
        const { cleanedText, id } = extractHeadingId(text);

        return (
          <h2
            id={id}
            className="group flex items-center text-4xl font-bold text-tertiary"
          >
            <Link to={`#${id}`} className="relative no-underline">
              {cleanedText}
              <span className="absolute bottom-0 left-0 h-[2px] w-full scale-x-0 transform rounded-full bg-current transition-transform duration-500 ease-in-out group-hover:scale-x-100"></span>
            </Link>
            <FaLink
              size="20px"
              className="ml-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
          </h2>
        );
      }

      return null;
    },
    h3: (props) => {
      console.log({ props });
      const text = props.children?.toString().trim();

      if (text) {
        const { cleanedText, id } = extractHeadingId(text);
        return (
          <>
            <h3
              id={id}
              className="group flex items-center text-2xl font-semibold text-tertiary"
            >
              <Link to={`#${id}`} className="relative no-underline">
                {cleanedText}
                <span className="absolute bottom-0 left-0 h-[2px] w-full scale-x-0 transform rounded-full bg-current transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
              </Link>
              <FaLink
                size="16px"
                className="ml-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              />
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
      <div className="prose-blockquote rounded-md border-l-8 border-primary bg-primary/35 p-4 text-gray-700">
        {props.children}
      </div>
    ),
    img: ({ ...props }) => (
      <img className="blockquote:img max-w-full rounded-md" {...props} />
    ),
    p: (props) => (
      <p className="mb-4 mt-4 text-lg font-normal text-gray-600">
        {props.children}
      </p>
    ),
    cite: (props) => <cite>{props.children}</cite>,
    ul: (props) => (
      <ul className="mb-4 list-disc space-y-2 pl-6">{props.children}</ul>
    ),
    ol: (props) => (
      <ol className="mb-4 list-decimal space-y-2 pl-6">{props.children}</ol>
    ),
    li: (props) => <li className="mb-1 text-gray-700">{props.children}</li>,
    pre: (props) => <pre>{props.children}</pre>,
    // code: ({ node, inline, className, children, ...props }) => {
    //   const match = /language-(\w+)/.exec(className || "");
    //   return !inline && match ? (
    //     <SyntaxHighlighter
    //       children={String(children).replace(/\n$/, "")}
    //       style={dracula}
    //       language={match[1]}
    //       PreTag="div"
    //       {...props}
    //     />
    //   ) : (
    //     <code className={className} {...props}>
    //       {children}
    //     </code>
    //   );
    // },
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
    // Handle footnote references (like [^1], [^2])
    // footnoteReference: (props: { id: string }) => {
    //   return (
    //     <sup>
    //       <a
    //         href={`#footnote-${props.id}`}
    //         className="font-semibold text-blue-500 hover:underline" // Apply custom styling
    //       >
    //         [{props.id}]
    //       </a>
    //     </sup>
    //   );
    // },
    // footnote: ({ id, props.children }: { id: string; props.children: React.ReactNode }) => {
    //   // Store the footnote content in state, keyed by its ID
    //   setFootnotes((prevFootnotes) => new Map(prevFootnotes).set(id, props.children));

    //   return (
    //     <sup>
    //       <a href={`#footnote-${id}`} className="footnote-ref">
    //         [{id}]
    //       </a>
    //     </sup>
    //   );
    // },
  };

  return (
    <div className="prose max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
      {/* <div className="footnotes">
        {[...footnotes.entries()].map(([id, content]) => (
          <Footnote key={id} id={id} content={content} />
        ))}
      </div> */}
    </div>
  );
};

export default MarkdownRenderer;
