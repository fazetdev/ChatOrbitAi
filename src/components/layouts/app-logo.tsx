import Image from "next/image";

import { BRAND } from "@/constants/branding";
import { cn } from "@/lib/utils";

interface AppLogoProps {
  compact?: boolean;
  showTagline?: boolean;
  className?: string;
}

export default function AppLogo({
  compact = false,
  showTagline = true,
  className,
}: AppLogoProps): React.JSX.Element {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Image
        src="/branding/icon.png"
        alt={BRAND.name}
        width={48}
        height={48}
        priority
      />

      {!compact && (
        <div className="flex flex-col">
          <h1 className="text-lg font-bold tracking-tight">
            {BRAND.name}
          </h1>

          {showTagline && (
            <p className="text-sm text-muted-foreground">
              {BRAND.tagline}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
