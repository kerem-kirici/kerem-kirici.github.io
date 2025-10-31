"use client";

import React from "react";

type TextAs = "p" | "span" | "div";

type TextProps<T extends TextAs = "p"> = {
  as?: T;
  size?: "lg" | "md" | "sm" | "xs";
  tone?: "default" | "muted" | "subtle";
  weight?: "regular" | "medium";
  leading?: "tight" | "normal" | "relaxed";
  align?: "left" | "center" | "right";
  clamp?: 1 | 2 | 3 | 4;
  className?: string;
  children: React.ReactNode;
};

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Text<T extends TextAs = "p">({
  as,
  size = "md",
  tone = "default",
  weight = "regular",
  leading = "normal",
  align = "left",
  clamp,
  className,
  children,
}: TextProps<T>) {
  const Component = (as || "p") as TextAs;
  return (
    <Component
      className={classNames(
        size === "lg"
          ? "text-lg"
          : size === "md"
          ? "text-base"
          : size === "sm"
          ? "text-sm"
          : "text-xs",
        tone === "muted"
          ? "text-zinc-600 dark:text-zinc-400"
          : tone === "subtle"
          ? "text-zinc-700 dark:text-zinc-300"
          : "text-zinc-900 dark:text-zinc-50",
        weight === "medium" ? "font-medium" : "font-normal",
        leading === "tight"
          ? "leading-tight"
          : leading === "relaxed"
          ? "leading-relaxed"
          : "leading-normal",
        align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left",
        clamp ? `line-clamp-${clamp}` : undefined,
        className
      )}
    >
      {children}
    </Component>
  );
}

export default Text;


