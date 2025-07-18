import React, { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Custom PrepMaster variants
        brand:
          "bg-brand-primary text-black font-bold hover:bg-brand-primary/90 hover:scale-105 transition-all duration-300 btn-hover",
        "brand-outline":
          "border-2 border-brand-primary text-brand-primary bg-transparent hover:bg-brand-primary hover:text-black transition-all duration-300",
        "brand-glass":
          "glass text-white border border-white/20 hover:bg-white/20 backdrop-blur-lg",
        "brand-dark":
          "bg-black text-white hover:bg-gray-900 border border-gray-800 hover:border-brand-primary transition-all duration-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = forwardRef(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      icon,
      iconPosition = "left",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        className={cn(
          buttonVariants({ variant, size, className }),
          loading && "cursor-not-allowed opacity-70",
          "group relative overflow-hidden"
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
          </div>
        )}

        <span
          className={cn(
            "flex items-center gap-2 transition-opacity duration-200",
            loading && "opacity-0"
          )}
        >
          {icon && iconPosition === "left" && (
            <span className="transition-transform duration-200 group-hover:scale-110">
              {icon}
            </span>
          )}

          {children}

          {icon && iconPosition === "right" && (
            <span className="transition-transform duration-200 group-hover:scale-110">
              {icon}
            </span>
          )}
        </span>

        {/* Hover effect overlay */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
