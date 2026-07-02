import { cn } from "@/lib/utils";

/* =========================
   CARD ROOT
========================= */

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps): React.JSX.Element {
  return (
    <div
      className={cn(
        "rounded-xl border bg-background shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

/* =========================
   CARD HEADER
========================= */

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({
  children,
  className,
}: CardHeaderProps): React.JSX.Element {
  return (
    <div className={cn("flex flex-col space-y-1 p-6", className)}>
      {children}
    </div>
  );
}

/* =========================
   CARD TITLE
========================= */

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({
  children,
  className,
}: CardTitleProps): React.JSX.Element {
  return (
    <h3
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
}

/* =========================
   CARD DESCRIPTION
========================= */

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardDescription({
  children,
  className,
}: CardDescriptionProps): React.JSX.Element {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </p>
  );
}

/* =========================
   CARD CONTENT
========================= */

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({
  children,
  className,
}: CardContentProps): React.JSX.Element {
  return <div className={cn("p-6 pt-0", className)}>{children}</div>;
}

/* =========================
   CARD FOOTER
========================= */

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({
  children,
  className,
}: CardFooterProps): React.JSX.Element {
  return (
    <div
      className={cn(
        "flex items-center p-6 pt-0",
        className
      )}
    >
      {children}
    </div>
  );
}
