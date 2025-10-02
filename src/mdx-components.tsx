import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { NpmIcon, PnpmIcon, YarnIcon, BunIcon } from "@/components/icons";
import { Mermaid } from "@/components/mdx/mermaid";

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    pre: ({ ref: _ref, ...props }) => (
      <CodeBlock {...props}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),
    ...TabsComponents,
    // Custom icons available in MDX
    NpmIcon,
    PnpmIcon,
    YarnIcon,
    BunIcon,
    // Mermaid diagram component
    Mermaid,
    ...components,
  };
}
