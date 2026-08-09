import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-[color,background-color,border-color,box-shadow,filter,opacity,transform] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        gold: "bg-accent text-accent-foreground shadow-[0_10px_30px_-10px_rgba(245,180,0,0.7)] hover:shadow-gold-glow hover:brightness-110 group-hover:shadow-gold-glow group-hover:brightness-110 group-hover:-translate-y-0.5 group-hover:scale-[1.02]",
        outline:
          "border border-border bg-transparent hover:bg-secondary/60 hover:border-accent/60 text-foreground dark:border-white/20 dark:hover:border-accent/60 dark:hover:bg-white/5",
        outlineGold:
          "border border-accent/60 bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground dark:border-accent/70 dark:text-white dark:hover:bg-accent dark:hover:text-accent-foreground",
        ghost: "hover:bg-secondary text-foreground dark:hover:bg-white/10",
        link: "text-primary underline-offset-4 hover:underline",
        white:
          "bg-white text-[#111] hover:bg-white/90 shadow-lg shadow-black/10",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-14 rounded-md px-8 text-base",
        icon: "h-10 w-10",
        iconLg: "h-12 w-12 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
