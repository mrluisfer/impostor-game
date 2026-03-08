import { memo } from 'react';
import { Flame, Leaf, MoonStar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type AppTheme } from '@/lib/themes';
import { cn } from '@/lib/utils';

const THEMES: Array<{
  id: AppTheme;
  label: string;
  icon: typeof MoonStar;
}> = [
  { id: 'midnight', label: 'Noche', icon: MoonStar },
  { id: 'sunset', label: 'Sunset', icon: Flame },
  { id: 'mint', label: 'Menta', icon: Leaf },
];

interface ThemeSwitcherProps {
  theme: AppTheme;
  onChange: (theme: AppTheme) => void;
  compact?: boolean;
  className?: string;
}

export const ThemeSwitcher = memo(function ThemeSwitcher({
  theme,
  onChange,
  compact = false,
  className,
}: ThemeSwitcherProps) {
  return (
    <div
      className={cn(
        'border-border/70 bg-card/70 inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-xl border p-1 backdrop-blur-md',
        className
      )}
      role="radiogroup"
      aria-label="Selecciona un tema visual"
    >
      {THEMES.map((option) => {
        const isActive = theme === option.id;
        const Icon = option.icon;
        return (
          <Button
            key={option.id}
            type="button"
            variant={isActive ? 'default' : 'ghost'}
            size="sm"
            className={cn(
              'h-11 touch-manipulation gap-1.5 px-3 text-sm font-medium sm:h-8 sm:px-2.5 sm:text-xs',
              compact && 'w-11 justify-center px-0 sm:w-8',
              !compact && 'min-w-24 justify-start sm:min-w-20',
              !isActive && 'text-muted-foreground active:text-foreground'
            )}
            role="radio"
            aria-checked={isActive}
            aria-label={`Tema ${option.label}`}
            onClick={() => onChange(option.id)}
          >
            <Icon className="h-4 w-4" />
            {!compact && <span className="truncate">{option.label}</span>}
          </Button>
        );
      })}
    </div>
  );
});
