import type { MDXComponents } from "mdx/types";
import MediaSlot from "@/components/MediaSlot";
import FlowDiagram from "@/components/FlowDiagram";
import { Callout, CodeSample, Decisions, Revise } from "@/components/mdx";

// Anything listed here can be used inside content/case-studies/*.mdx
// without an import statement.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    MediaSlot,
    FlowDiagram,
    Callout,
    CodeSample,
    Decisions,
    Revise,
    ...components,
  };
}
