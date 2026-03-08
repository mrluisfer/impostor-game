import { CircleAlert, Drama, RefreshCw, Shuffle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Player, Category } from '../types/game';
import { PlayerCard } from './PlayerCard';

interface GameBoardProps {
  players: Player[];
  categories: Category[];
  showRoles: boolean;
  starterPlayerIndex: number;
  onRevealImpostors: () => void;
  onResetGame: () => void;
  onChangeWord: () => void;
}

export function GameBoard({
  players,
  categories,
  showRoles,
  starterPlayerIndex,
  onRevealImpostors,
  onResetGame,
  onChangeWord,
}: GameBoardProps) {
  const starterPlayer = players[starterPlayerIndex];
  return (
    <div className="space-y-6 pb-6">
      {/* Categories horizontal scroll - mobile optimized */}
      {categories.length > 0 && (
        <div className="-mx-4 sm:mx-0">
          <div
            className="scrollbar-none flex touch-pan-x gap-2 overflow-x-auto overscroll-x-contain px-4 pb-2 sm:justify-center sm:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category) => (
              <Badge
                key={category.id}
                className="h-8 max-w-44 shrink-0 gap-1.5 px-3 text-sm"
                variant="default"
              >
                <span aria-hidden="true">{category.emoji}</span>
                <span className="truncate">{category.name}</span>
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-between">
        {!showRoles ? (
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-between">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="bg-base-200 h-14 touch-manipulation justify-start text-sm sm:justify-center sm:text-lg"
              onClick={onChangeWord}
              aria-label="Cambiar palabra manteniendo roles"
            >
              <span className="inline-flex items-center gap-2 truncate">
                <Shuffle className="h-5 w-5 shrink-0" /> Cambiar Palabra
              </span>
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="lg"
              className="h-14 touch-manipulation justify-start border-amber-400/60 bg-amber-500/15 text-sm text-amber-200 active:bg-amber-500/25 sm:justify-center sm:text-lg"
              onClick={onRevealImpostors}
              aria-label="Revelar quiénes son los impostores"
            >
              <span className="inline-flex items-center gap-2 truncate">
                <Drama className="h-5 w-5 shrink-0" /> Revelar Impostores
              </span>
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            size="lg"
            className="h-14 w-full touch-manipulation text-lg"
            onClick={onResetGame}
            aria-label="Jugar otra ronda"
          >
            <span className="inline-flex items-center gap-2">
              <RefreshCw className="h-5 w-5 shrink-0" /> Jugar de Nuevo
            </span>
          </Button>
        )}
      </div>

      {/* Indicador de quién inicia */}
      {!showRoles && starterPlayer && (
        <Alert
          className="border-sky-500/40 bg-sky-500/10 text-sky-200"
          role="status"
          aria-live="polite"
        >
          <CircleAlert className="h-5 w-5" />
          <AlertDescription className="min-w-0 text-base leading-relaxed break-words">
            <strong title={starterPlayer.name}>{starterPlayer.name}</strong> inicia dando la primera
            pista
          </AlertDescription>
        </Alert>
      )}

      <div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
        aria-label="Tarjetas de jugadores"
      >
        {players.map((player, index) => (
          <div
            key={player.id}
            role="listitem"
            className="animate-stagger"
            style={{ '--stagger-delay': `${index * 0.08}s` } as React.CSSProperties}
          >
            <PlayerCard player={player} showRole={showRoles} />
          </div>
        ))}
      </div>
    </div>
  );
}
