"use client";

import { cn } from "@/lib/cn";
import {
  transformerNotationDiff,
  transformerNotationFocus,
} from "@shikijs/transformers";
import { FileIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, useMemo } from "react";

interface CodeFile {
  filename: string;
  code: string;
  language: string;
}

interface CodeComparisonProps {
  beforeCode?: string;
  afterCode?: string;
  beforeFiles?: CodeFile[];
  afterFiles?: CodeFile[];
  language?: string;
  filename?: string;
  lightTheme: string;
  darkTheme: string;
  highlightColor?: string;
}

export function CodeComparison({
  beforeCode,
  afterCode,
  beforeFiles,
  afterFiles,
  language = "typescript",
  filename = "code",
  lightTheme,
  darkTheme,
  highlightColor = "#ff3333",
}: CodeComparisonProps) {
  const { theme, systemTheme } = useTheme();
  const [highlightedBefore, setHighlightedBefore] = useState("");
  const [highlightedAfter, setHighlightedAfter] = useState("");
  const [hasLeftFocus, setHasLeftFocus] = useState(false);
  const [hasRightFocus, setHasRightFocus] = useState(false);
  const [activeBeforeTab, setActiveBeforeTab] = useState(0);
  const [activeAfterTab, setActiveAfterTab] = useState(0);

  // Use multi-file mode if files are provided, otherwise use single-file mode
  const isMultiFile = beforeFiles && afterFiles;
  const currentBeforeFile = isMultiFile
    ? beforeFiles[activeBeforeTab]
    : { filename, code: beforeCode || "", language };
  const currentAfterFile = isMultiFile
    ? afterFiles[activeAfterTab]
    : { filename, code: afterCode || "", language };

  const selectedTheme = useMemo(() => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    return currentTheme === "dark" ? darkTheme : lightTheme;
  }, [theme, systemTheme, darkTheme, lightTheme]);

  useEffect(() => {
    if (highlightedBefore || highlightedAfter) {
      setHasLeftFocus(highlightedBefore.includes('class="line focused"'));
      setHasRightFocus(highlightedAfter.includes('class="line focused"'));
    }
  }, [highlightedBefore, highlightedAfter]);

  useEffect(() => {
    async function highlightCode() {
      try {
        const { codeToHtml } = await import("shiki");
        const { transformerNotationHighlight } = await import(
          "@shikijs/transformers"
        );

        const before = await codeToHtml(currentBeforeFile.code, {
          lang: currentBeforeFile.language,
          theme: selectedTheme,
          transformers: [
            transformerNotationHighlight({ matchAlgorithm: "v3" }),
            transformerNotationDiff({ matchAlgorithm: "v3" }),
            transformerNotationFocus({ matchAlgorithm: "v3" }),
          ],
        });
        const after = await codeToHtml(currentAfterFile.code, {
          lang: currentAfterFile.language,
          theme: selectedTheme,
          transformers: [
            transformerNotationHighlight({ matchAlgorithm: "v3" }),
            transformerNotationDiff({ matchAlgorithm: "v3" }),
            transformerNotationFocus({ matchAlgorithm: "v3" }),
          ],
        });
        setHighlightedBefore(before);
        setHighlightedAfter(after);
      } catch (error) {
        console.error("Error highlighting code:", error);
        setHighlightedBefore(`<pre>${currentBeforeFile.code}</pre>`);
        setHighlightedAfter(`<pre>${currentAfterFile.code}</pre>`);
      }
    }
    highlightCode();
  }, [currentBeforeFile, currentAfterFile, selectedTheme]);

  const renderCode = (code: string, highlighted: string) => {
    if (highlighted) {
      return (
        <div
          style={{ "--highlight-color": highlightColor } as React.CSSProperties}
          className={cn(
            "h-full w-full overflow-auto bg-background font-mono text-xs",
            "[&>pre]:h-full [&>pre]:!w-screen [&>pre]:py-2",
            "[&>pre>code]:!inline-block [&>pre>code]:!w-full",
            "[&>pre>code>span]:!inline-block [&>pre>code>span]:w-full [&>pre>code>span]:px-4 [&>pre>code>span]:py-0.5",
            "[&>pre>code>.highlighted]:inline-block [&>pre>code>.highlighted]:w-full [&>pre>code>.highlighted]:!bg-[var(--highlight-color)]",
            "group-hover/left:[&>pre>code>:not(.focused)]:!opacity-100 group-hover/left:[&>pre>code>:not(.focused)]:!blur-none",
            "group-hover/right:[&>pre>code>:not(.focused)]:!opacity-100 group-hover/right:[&>pre>code>:not(.focused)]:!blur-none",
            "[&>pre>code>.add]:bg-[rgba(16,185,129,.16)] [&>pre>code>.remove]:bg-[rgba(244,63,94,.16)]",
            "group-hover/left:[&>pre>code>:not(.focused)]:transition-all group-hover/left:[&>pre>code>:not(.focused)]:duration-300",
            "group-hover/right:[&>pre>code>:not(.focused)]:transition-all group-hover/right:[&>pre>code>:not(.focused)]:duration-300"
          )}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      );
    } else {
      return (
        <pre className="h-full overflow-auto break-all bg-background p-4 font-mono text-xs text-foreground">
          {code}
        </pre>
      );
    }
  };

  const renderTabs = (
    files: CodeFile[],
    activeTab: number,
    setActiveTab: (index: number) => void,
    side: "before" | "after"
  ) => {
    if (!isMultiFile || files.length <= 1) return null;

    return (
      <div className="flex border-b border-primary/20 bg-muted/50">
        {files.map((file, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={cn(
              "px-3 py-2 text-xs font-medium transition-colors border-r border-primary/20 last:border-r-0",
              activeTab === index
                ? "bg-accent text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            )}
          >
            {file.filename}
          </button>
        ))}
        <div className="ml-auto px-3 py-2 text-xs text-muted-foreground">
          {side}
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="group relative w-full overflow-hidden rounded-md border border-border">
        <div className="relative grid md:grid-cols-2">
          <div
            className={cn(
              "leftside group/left border-primary/20 md:border-r",
              hasLeftFocus &&
                "[&>div>pre>code>:not(.focused)]:!opacity-50 [&>div>pre>code>:not(.focused)]:!blur-[0.095rem]",
              "[&>div>pre>code>:not(.focused)]:transition-all [&>div>pre>code>:not(.focused)]:duration-300"
            )}
          >
            {isMultiFile ? (
              renderTabs(
                beforeFiles!,
                activeBeforeTab,
                setActiveBeforeTab,
                "before"
              )
            ) : (
              <div className="flex items-center border-b border-primary/20 bg-accent p-2 text-sm text-foreground">
                <FileIcon className="mr-2 h-4 w-4" />
                {currentBeforeFile.filename}
                <span className="ml-auto hidden md:block">before</span>
              </div>
            )}
            {renderCode(currentBeforeFile.code, highlightedBefore)}
          </div>
          <div
            className={cn(
              "rightside group/right border-t border-primary/20 md:border-t-0",
              hasRightFocus &&
                "[&>div>pre>code>:not(.focused)]:!opacity-50 [&>div>pre>code>:not(.focused)]:!blur-[0.095rem]",
              "[&>div>pre>code>:not(.focused)]:transition-all [&>div>pre>code>:not(.focused)]:duration-300"
            )}
          >
            {isMultiFile ? (
              renderTabs(
                afterFiles!,
                activeAfterTab,
                setActiveAfterTab,
                "after"
              )
            ) : (
              <div className="flex items-center border-b border-primary/20 bg-accent p-2 text-sm text-foreground">
                <FileIcon className="mr-2 h-4 w-4" />
                {currentAfterFile.filename}
                <span className="ml-auto hidden md:block">after</span>
              </div>
            )}
            {renderCode(currentAfterFile.code, highlightedAfter)}
          </div>
        </div>
        <div className="absolute left-1/2 top-1/2 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md border border-primary/20 bg-accent text-xs text-foreground md:flex">
          VS
        </div>
      </div>
    </div>
  );
}
