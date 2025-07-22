// @ts-nocheck
// components/ui/hover-card.tsx
"use client";
import * as React from "react";
import * as RadixHoverCard from "@radix-ui/react-hover-card";
import { cn } from "../../lib/utils"; // or your own classnames helper

export const HoverCard = RadixHoverCard.Root;

export function HoverCardTrigger({
  className,
  asChild,
  ...props
}: RadixHoverCard.HoverCardTriggerProps & { className?: string }) {
  return (
    <RadixHoverCard.Trigger
      asChild={asChild}
      className={cn("inline-block", className)}
      {...props}
    />
  );
}

export function HoverCardContent({
  className,
  side = "top",
  align = "center",
  ...props
}: RadixHoverCard.HoverCardContentProps & {
  className?: string;
  side?: RadixHoverCard.HoverCardContentProps["side"];
  align?: RadixHoverCard.HoverCardContentProps["align"];
}) {
  return (
    <RadixHoverCard.Portal>
      <RadixHoverCard.Content
        side={side}
        align={align}
        collisionPadding={8}
        className={cn(
          "z-50 animate-in fade-in-80 slide-in-from-bottom-2 overflow-hidden rounded-2xl border bg-zinc-900/90 text-white shadow-md p-4",
          className
        )}
        {...props}
      />
    </RadixHoverCard.Portal>
  );
}