"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "../utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = ({ ...props }) => <TooltipPrimitive.Root {...props} />;
Tooltip.displayName = TooltipPrimitive.Tooltip.displayName;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    variant: "light" | "dark";
  }
>(({ className, variant = "light", sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      variant == "light" &&
        "z-50 max-w-[256px] cursor-default overflow-hidden whitespace-normal rounded-[4px] border bg-white px-3 py-1.5 text-xs text-neutral-900 shadow-md animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",
      variant == "dark" &&
        "z-50 max-w-[256px] overflow-hidden whitespace-normal rounded-md bg-black px-2.5 py-1.5 text-sm text-white shadow-md animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",
      className
      // todo: add triangle to tooltip
      // e.g. something like
      // <div class="w-16 overflow-hidden inline-block">
      // <div class=" h-11 w-11 bg-black -rotate-45 transform origin-top-left"></div>
      // </div>
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
