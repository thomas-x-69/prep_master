import React, { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300",
  {
    variants: {
      variant: {
        default: "border-border",
        glass: "glass border-white/20 shadow-xl",
        "glass-dark": "glass-dark border-white/10 shadow-2xl",
        elevated: "shadow-lg hover:shadow-xl border-0",
        interactive: "hover:scale-105 cursor-pointer hover:shadow-lg",
        gradient:
          "bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-lg",
        neon: "border-brand-primary/50 shadow-[0_0_20px_rgba(255,226,77,0.3)] hover:shadow-[0_0_30px_rgba(255,226,77,0.5)]",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
    },
  }
);

const Card = forwardRef(
  (
    { className, variant, padding, hover = false, glow = false, ...props },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        cardVariants({ variant, padding }),
        hover && "hover:scale-105",
        glow && "animate-pulse-glow",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  >
    {children}
  </h3>
));
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// Special PrepMaster card variants
const SpecializationCard = forwardRef(
  (
    {
      className,
      icon,
      title,
      description,
      comingSoon = false,
      featured = false,
      children,
      ...props
    },
    ref
  ) => (
    <Card
      ref={ref}
      variant={featured ? "neon" : "glass"}
      className={cn(
        "group relative overflow-hidden",
        comingSoon && "opacity-70",
        featured && "ring-2 ring-brand-primary/50",
        className
      )}
      hover={!comingSoon}
      {...props}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Coming soon badge */}
      {comingSoon && (
        <div className="absolute top-4 right-4 px-3 py-1 bg-brand-primary text-black text-xs font-bold rounded-full">
          Coming Soon
        </div>
      )}

      {/* Featured badge */}
      {featured && (
        <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-green-400 to-green-600 text-white text-xs font-bold rounded-full">
          Available Now
        </div>
      )}

      <CardContent className="relative z-10">
        {icon && (
          <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
        )}

        {title && (
          <CardTitle className="mb-2 text-white group-hover:text-brand-primary transition-colors duration-300">
            {title}
          </CardTitle>
        )}

        {description && (
          <CardDescription className="text-gray-300">
            {description}
          </CardDescription>
        )}

        {children}
      </CardContent>
    </Card>
  )
);
SpecializationCard.displayName = "SpecializationCard";

const FeatureCard = forwardRef(
  (
    {
      className,
      icon,
      title,
      description,
      highlight = false,
      children,
      ...props
    },
    ref
  ) => (
    <Card
      ref={ref}
      variant={highlight ? "gradient" : "glass"}
      className={cn(
        "group text-center hover:bg-white/10 transition-all duration-300",
        highlight && "border-brand-primary/30",
        className
      )}
      hover
      {...props}
    >
      <CardContent className="flex flex-col items-center space-y-4">
        {icon && (
          <div className="p-3 rounded-full bg-brand-primary/20 text-brand-primary group-hover:bg-brand-primary group-hover:text-black transition-all duration-300">
            {icon}
          </div>
        )}

        {title && <CardTitle className="text-lg text-white">{title}</CardTitle>}

        {description && (
          <CardDescription className="text-gray-300 text-center">
            {description}
          </CardDescription>
        )}

        {children}
      </CardContent>
    </Card>
  )
);
FeatureCard.displayName = "FeatureCard";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  SpecializationCard,
  FeatureCard,
  cardVariants,
};
