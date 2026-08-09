import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {
  label: string;
  error?: string;
  as?: "input" | "textarea" | "select";
  children?: React.ReactNode;
}

export function FormField({ label, error, as = "input", className, children, ...props }: FormFieldProps) {
  const id = React.useId();
  const errorId = `${id}-error`;

  const baseClasses = cn(
    "w-full border bg-transparent px-4 py-3 text-base text-foreground transition-[color,background-color,border-color,box-shadow] placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 sm:text-sm",
    error
      ? "border-red-500 focus:ring-red-500/60 dark:border-red-500/90"
      : "border-border hover:border-accent/40 focus:border-accent focus:ring-accent",
    className,
  );

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/70">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea id={id} className={cn(baseClasses, "min-h-[120px] resize-y")} aria-invalid={!!error} aria-describedby={error ? errorId : undefined} {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : as === "select" ? (
        <div className="relative">
          <select
            id={id}
            className={cn(baseClasses, "appearance-none cursor-pointer pr-10 [&>option]:bg-background [&>option]:text-foreground")}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
          >
            {children}
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60"
          />
        </div>
      ) : (
        <input id={id} className={baseClasses} aria-invalid={!!error} aria-describedby={error ? errorId : undefined} {...props} />
      )}
      {error && (
        <p id={errorId} className="text-xs text-red-500 dark:text-red-400" role="alert">{error}</p>
      )}
    </div>
  );
}
