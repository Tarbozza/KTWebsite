"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

const components: Components = {
  h1: ({ children }) => (
    <h1 className="text-2xl sm:text-3xl font-sans font-bold text-white mt-8 mb-4 pb-2 border-b border-white/10">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl sm:text-2xl font-sans font-bold text-[#FFAA00] mt-8 mb-3">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg sm:text-xl font-sans font-bold text-[#55AD38] mt-6 mb-2">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-base sm:text-lg font-sans font-semibold text-gray-200 mt-4 mb-2">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base font-sans">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 space-y-1.5 pl-2">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 space-y-1.5 pl-2 list-decimal list-inside">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-gray-300 text-sm sm:text-base font-sans flex gap-2">
      <span className="text-[#55AD38] mt-1.5 shrink-0">▪</span>
      <span className="leading-relaxed">{children}</span>
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-[#FFAA00] pl-4 my-4 bg-[#FFAA00]/5 py-2 pr-3 rounded-r-lg">
      <div className="text-gray-300 text-sm sm:text-base font-sans italic">{children}</div>
    </blockquote>
  ),
  code: ({ children, className }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return (
        <pre className="bg-[#0f0f0f] border border-white/10 rounded-xl p-4 overflow-x-auto my-4">
          <code className="text-[#3DE4FF] text-xs sm:text-sm font-mono leading-relaxed">
            {children}
          </code>
        </pre>
      );
    }
    return (
      <code className="bg-white/10 text-[#3DE4FF] text-xs sm:text-sm font-mono px-1.5 py-0.5 rounded">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <div className="overflow-x-auto my-4">{children}</div>
  ),
  strong: ({ children }) => (
    <strong className="font-bold text-white font-sans">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-gray-200 font-sans">{children}</em>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#55AD38] hover:text-[#FFAA00] underline underline-offset-2 transition-colors font-sans"
    >
      {children}
    </a>
  ),
  hr: () => (
    <hr className="border-white/10 my-6" />
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-4 rounded-xl border border-white/10">
      <table className="w-full text-sm text-left">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-white/5 text-gray-200 font-semibold">
      {children}
    </thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-white/5">
      {children}
    </tbody>
  ),
  tr: ({ children }) => (
    <tr className="hover:bg-white/[0.03] transition-colors">
      {children}
    </tr>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 text-[#FFAA00] font-sans font-semibold text-xs uppercase tracking-wider">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-gray-300 font-sans text-sm">
      {children}
    </td>
  ),
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt ?? ""}
      className="rounded-xl border border-white/10 max-w-full my-4 mx-auto"
    />
  ),
};

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  return (
    <div className={`markdown-body ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
