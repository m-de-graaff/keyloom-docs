"use client";

import { cn } from "@/lib/cn";
import {
  transformerNotationDiff,
  transformerNotationFocus,
} from "@shikijs/transformers";
import {
  FileIcon,
  ChevronDown,
  ChevronUp,
  FileText,
  Database,
  Settings,
  Code,
} from "lucide-react";
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
  const [isBeforeExpanded, setIsBeforeExpanded] = useState(false);
  const [isAfterExpanded, setIsAfterExpanded] = useState(false);

  // Use multi-file mode if files are provided, otherwise use single-file mode
  const isMultiFile = beforeFiles && afterFiles;
  const currentBeforeFile = isMultiFile
    ? beforeFiles[activeBeforeTab]
    : { filename, code: beforeCode || "", language };
  const currentAfterFile = isMultiFile
    ? afterFiles[activeAfterTab]
    : { filename, code: afterCode || "", language };

  // Check if content is long enough to need expansion
  const beforeNeedsExpansion = currentBeforeFile.code.split("\n").length > 20;
  const afterNeedsExpansion = currentAfterFile.code.split("\n").length > 20;

  // Reset expanded state when switching tabs
  useEffect(() => {
    setIsBeforeExpanded(false);
  }, [activeBeforeTab]);

  useEffect(() => {
    setIsAfterExpanded(false);
  }, [activeAfterTab]);

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

  // Helper function to get file type icon
  const getFileIcon = (filename: string) => {
    if (filename.includes("schema.prisma") || filename.includes("database"))
      return Database;
    if (filename.includes("config") || filename.includes("Config"))
      return Settings;
    if (filename.includes(".ts") || filename.includes(".js")) return Code;
    if (filename.includes("Generated") || filename.includes("Summary"))
      return FileText;
    return FileIcon;
  };

  const renderCode = (
    code: string,
    highlighted: string,
    isExpanded: boolean,
    needsExpansion: boolean
  ) => {
    const maxHeight = isExpanded ? "none" : needsExpansion ? "400px" : "auto";

    if (highlighted) {
      return (
        <div
          style={
            {
              "--highlight-color": highlightColor,
              maxHeight,
              transition: "max-height 0.3s ease-in-out",
            } as React.CSSProperties
          }
          className={cn(
            "w-full overflow-auto bg-background font-mono text-xs relative",
            "[&>pre]:py-2 [&>pre]:overflow-x-auto",
            "[&>pre>code]:!block [&>pre>code]:!w-full [&>pre>code]:whitespace-pre-wrap [&>pre>code]:break-words",
            "[&>pre>code>span]:!block [&>pre>code>span]:px-4 [&>pre>code>span]:py-0.5 [&>pre>code>span]:whitespace-pre-wrap [&>pre>code>span]:break-words",
            "[&>pre>code>.highlighted]:block [&>pre>code>.highlighted]:w-full [&>pre>code>.highlighted]:!bg-[var(--highlight-color)]",
            "group-hover/left:[&>pre>code>:not(.focused)]:!opacity-100 group-hover/left:[&>pre>code>:not(.focused)]:!blur-none",
            "group-hover/right:[&>pre>code>:not(.focused)]:!opacity-100 group-hover/right:[&>pre>code>:not(.focused)]:!blur-none",
            "[&>pre>code>.add]:bg-[rgba(16,185,129,.16)] [&>pre>code>.remove]:bg-[rgba(244,63,94,.16)]",
            "group-hover/left:[&>pre>code>:not(.focused)]:transition-all group-hover/left:[&>pre>code>:not(.focused)]:duration-300",
            "group-hover/right:[&>pre>code>:not(.focused)]:transition-all group-hover/right:[&>pre>code>:not(.focused)]:duration-300",
            !isExpanded && needsExpansion && "overflow-hidden"
          )}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      );
    } else {
      return (
        <pre
          style={{
            maxHeight,
            transition: "max-height 0.3s ease-in-out",
          }}
          className={cn(
            "overflow-auto bg-background p-4 font-mono text-xs text-foreground whitespace-pre-wrap break-words",
            !isExpanded && needsExpansion && "overflow-hidden"
          )}
        >
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
      <div className="flex border-b border-primary/20 bg-muted/30 overflow-x-auto">
        {files.map((file, index) => {
          const IconComponent = getFileIcon(file.filename);
          const isActive = activeTab === index;
          const needsExpansion = file.code.split("\n").length > 20;

          return (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={cn(
                "flex items-center gap-2 px-3 py-2.5 text-xs font-medium transition-all duration-200 border-r border-primary/20 last:border-r-0 whitespace-nowrap relative group",
                isActive
                  ? "bg-accent text-foreground shadow-sm border-b-2 border-b-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/60 hover:shadow-sm"
              )}
            >
              <IconComponent className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="truncate max-w-[120px] sm:max-w-none">
                {file.filename}
              </span>
              {needsExpansion && (
                <div
                  className="h-1.5 w-1.5 rounded-full bg-orange-400 flex-shrink-0"
                  title="Large file - expandable"
                />
              )}
              {isActive && (
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-primary rounded-t-sm" />
              )}
            </button>
          );
        })}
        <div className="ml-auto px-3 py-2.5 text-xs text-muted-foreground font-medium bg-muted/50 border-l border-primary/20">
          {side}
        </div>
      </div>
    );
  };

  const renderExpandButton = (
    isExpanded: boolean,
    setIsExpanded: (expanded: boolean) => void,
    needsExpansion: boolean
  ) => {
    if (!needsExpansion) return null;

    return (
      <div className="border-t border-primary/20 bg-muted/30">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors flex items-center justify-center gap-2"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-3 w-3" />
              <span>Collapse</span>
            </>
          ) : (
            <>
              <ChevronDown className="h-3 w-3" />
              <span>Expand</span>
            </>
          )}
        </button>
      </div>
    );
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="group relative w-full overflow-hidden rounded-md border border-border">
        <div className="relative grid md:grid-cols-2">
          <div
            className={cn(
              "leftside group/left border-primary/20 md:border-r flex flex-col",
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
            <div className="flex-1">
              {renderCode(
                currentBeforeFile.code,
                highlightedBefore,
                isBeforeExpanded,
                beforeNeedsExpansion
              )}
            </div>
            {renderExpandButton(
              isBeforeExpanded,
              setIsBeforeExpanded,
              beforeNeedsExpansion
            )}
          </div>
          <div
            className={cn(
              "rightside group/right border-t border-primary/20 md:border-t-0 flex flex-col",
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
            <div className="flex-1">
              {renderCode(
                currentAfterFile.code,
                highlightedAfter,
                isAfterExpanded,
                afterNeedsExpansion
              )}
            </div>
            {renderExpandButton(
              isAfterExpanded,
              setIsAfterExpanded,
              afterNeedsExpansion
            )}
          </div>
        </div>
        <div className="absolute left-1/2 top-1/2 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md border border-primary/20 bg-accent text-xs text-foreground md:flex bg-background">
          VS
        </div>
      </div>
    </div>
  );
}
