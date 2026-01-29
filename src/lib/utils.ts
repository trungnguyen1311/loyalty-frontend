import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  extend: {
    theme: {
      borderRadius: [
        "big-comp-sm",
        "comp-lg",
        "comp-md",
        "comp-sm",
        "big-comp-md",
        "figma-md",
        "xxl",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
