import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl text-[0.9375rem] font-semibold tracking-[-0.005em] transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-out select-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[1.05em] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background hover:bg-foreground/90 shadow-sm",
        primary:
          "bg-electric-600 text-white shadow-[0_10px_28px_-10px_rgb(0_99_219/0.55)] hover:bg-electric-500 hover:shadow-[0_14px_32px_-10px_rgb(0_123_255/0.6)]",
        secondary:
          "border border-slate-200/80 bg-white text-slate-800 shadow-[0_1px_2px_rgb(6_22_47/0.05)] hover:border-slate-300 hover:bg-slate-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200",
        outline:
          "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        ghost:
          "hover:bg-accent hover:text-accent-foreground",
        ghostDark:
          "border border-white/20 bg-white/[0.04] text-white backdrop-blur-sm hover:border-white/40 hover:bg-white/[0.09]",
        ghostLight:
          "border border-slate-300/40 bg-transparent text-slate-700 hover:border-slate-400/50 hover:bg-slate-100/50",
        destructive:
          "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90",
        link:
          "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 text-sm",
        sm: "h-9 rounded-lg px-3 text-xs",
        md: "h-12 px-6",
        lg: "h-[3.25rem] px-7 text-base",
        icon: "size-10 rounded-xl",
        "icon-sm": "size-8 rounded-lg p-0",
        "icon-lg": "size-12 rounded-xl p-0",
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
