import { CircleCheck, Minus, Play, Plus, Settings, TriangleAlert } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface GameConfigProps {
  playerCount: number;
  impostorCount: number;
  selectedCategoriesCount: number;
  canStart: boolean;
  onStartGame: () => void;
  onImpostorCountChange: (count: number) => void;
  hasGeneratedWord?: boolean;
}

export function GameConfig({
  playerCount,
  impostorCount,
  selectedCategoriesCount,
  canStart,
  onStartGame,
  onImpostorCountChange,
  hasGeneratedWord = false,
}: GameConfigProps) {
  const minPlayers = 3;
  const needMorePlayers = playerCount < minPlayers;
  const needCategories = selectedCategoriesCount === 0 && !hasGeneratedWord;
  const maxImpostors = Math.max(1, playerCount - 1);

  const issues: string[] = [];
  if (needMorePlayers) {
    const missing = minPlayers - playerCount;
    issues.push(`Agrega ${missing} jugador${missing > 1 ? 'es' : ''} más`);
  }
  if (needCategories) {
    issues.push('Elige una categoría o genera con IA');
  }

  return (
    <Card
      className={cn(
        'bg-base-200 ring-border/70',
        canStart && 'border-primary/50 bg-primary/10 ring-primary/20 ring-2'
      )}
    >
      <CardContent className="space-y-4 p-4 sm:p-6">
        {/* Stats Section */}
        <div className="bg-base-300 rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-around gap-3 sm:gap-6">
            {/* Jugadores */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="text-primary text-3xl font-bold tabular-nums sm:text-4xl">
                {playerCount}
              </div>
              <div className="text-base-content/60 text-xs font-medium sm:text-sm">Jugadores</div>
            </div>

            {/* Separator */}
            <Separator orientation="vertical" className="bg-border/80 h-14" />

            {/* Impostores Control */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="hover:bg-destructive/15 hover:text-destructive touch-manipulation sm:size-9"
                onClick={() => onImpostorCountChange(impostorCount - 1)}
                disabled={impostorCount <= 1}
                aria-label="Reducir impostores"
              >
                <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>

              <div className="flex min-w-15 flex-col items-center gap-1.5 sm:min-w-20">
                <div className="text-error text-3xl font-bold tabular-nums sm:text-4xl">
                  {impostorCount}
                </div>
                <div className="text-base-content/60 text-xs font-medium whitespace-nowrap sm:text-sm">
                  Impostor{impostorCount > 1 ? 'es' : ''}
                </div>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="hover:bg-destructive/15 hover:text-destructive touch-manipulation sm:size-9"
                onClick={() => onImpostorCountChange(impostorCount + 1)}
                disabled={impostorCount >= maxImpostors}
                aria-label="Aumentar impostores"
              >
                <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mensajes de estado */}
        {issues.length > 0 && (
          <Alert className="border-amber-500/40 bg-amber-500/10 text-amber-200">
            <TriangleAlert />
            <AlertDescription className="text-sm leading-relaxed break-words" aria-live="polite">
              {issues.join(' • ')}
            </AlertDescription>
          </Alert>
        )}

        {canStart && (
          <Alert className="border-emerald-500/40 bg-emerald-500/10 text-emerald-200">
            <CircleCheck className="h-5 w-5" />
            <AlertDescription className="text-sm font-medium" aria-live="polite">
              ¡Todo listo para empezar!
            </AlertDescription>
          </Alert>
        )}

        {/* Botón de inicio */}
        <Button
          type="button"
          variant={canStart ? 'default' : 'secondary'}
          size="lg"
          className="h-14 w-full touch-manipulation text-sm font-semibold sm:h-16 sm:text-lg"
          onClick={onStartGame}
          disabled={!canStart}
          aria-label={canStart ? 'Iniciar el juego' : 'Completa la configuración para iniciar'}
        >
          {canStart ? (
            <>
              <Play className="h-5 w-5 sm:h-6 sm:w-6" />
              ¡Comenzar a Jugar!
            </>
          ) : (
            <>
              <Settings />
              Completa la configuración
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
