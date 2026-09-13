import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl text-[0.9375rem] font-semibold tracking-[-0.005em] transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-out select-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[1.05em] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // White on #0063DB passes WCAG AA (approx 5.5:1)
        primary:
          "bg-electric-600 text-white shadow-[0_10px_28px_-10px_rgb(0_99_219/0.55)] hover:bg-electric-500 hover:shadow-[0_14px_32px_-10px_rgb(0_123_255/0.6)]",
        secondary:
          "border border-navy-700/20 bg-white text-navy-700 shadow-[0_1px_2px_rgb(6_22_47/0.05)] hover:border-navy-700/40 hover:bg-skywash",
        ghostDark:
          "border border-white/20 bg-white/[0.04] text-white backdrop-blur-sm hover:border-white/40 hover:bg-white/[0.09]",
        ghostLight:
          "border border-navy-700/15 bg-transparent text-navy-700 hover:border-navy-700/35 hover:bg-navy-700/[0.04]",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6",
        lg: "h-[3.25rem] px-7 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { buttonVariants };
