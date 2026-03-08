import { useState, useCallback } from 'react';
import { User, UserX, Eye, EyeOff, Skull } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Player } from '../types/game';

interface PlayerCardProps {
  player: Player;
  showRole?: boolean;
}

export function PlayerCard({ player, showRole = false }: PlayerCardProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isEliminated, setIsEliminated] = useState(false);

  const toggleReveal = useCallback(() => {
    if (!showRole) {
      setIsRevealed((prev) => !prev);
    }
  }, [showRole]);

  const toggleEliminate = useCallback(() => {
    if (player.isImpostor) {
      setIsEliminated((prev) => !prev);
    }
  }, [player.isImpostor]);

  const showWord = isRevealed || showRole;

  // Determinar si mostrar como impostor revelado (global o individual)
  const isImpostorRevealed = showRole && player.isImpostor;
  const isIndividuallyEliminated = !showRole && isEliminated && player.isImpostor;

  return (
    <Card
      className={cn(
        'transition-all duration-300',
        isImpostorRevealed || isIndividuallyEliminated
          ? 'border-destructive/40 bg-destructive/15 text-destructive-foreground ring-destructive/35'
          : 'bg-base-200 ring-border/70',
        isIndividuallyEliminated && 'scale-[0.98] opacity-75'
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="bg-base-300 h-12 w-12">
            <AvatarFallback
              className={cn(
                isImpostorRevealed || isIndividuallyEliminated
                  ? 'bg-destructive/25 text-destructive'
                  : 'bg-base-300'
              )}
            >
              {isImpostorRevealed || isIndividuallyEliminated ? (
                <UserX className="h-6 w-6" />
              ) : (
                <User className="h-6 w-6" />
              )}
            </AvatarFallback>
          </Avatar>
          <CardTitle
            className={cn(
              'min-w-0 flex-1 truncate text-lg',
              isIndividuallyEliminated && 'line-through opacity-80'
            )}
            title={player.name}
          >
            {player.name}
          </CardTitle>
          {(isImpostorRevealed || isIndividuallyEliminated) && (
            <Badge className="shrink-0 gap-1 font-bold" variant="destructive">
              {isIndividuallyEliminated && <Skull className="h-4 w-4" />}
              IMPOSTOR
            </Badge>
          )}
        </div>

        <div className="mt-4">
          {!showWord ? (
            <Button
              type="button"
              variant="outline"
              className="bg-base-300/50 text-base-content/75 min-h-14 w-full justify-center gap-2"
              onClick={toggleReveal}
              disabled={showRole}
              aria-label={`Ver palabra de ${player.name}`}
            >
              <Eye className="h-5 w-5" />
              Ver palabra
            </Button>
          ) : (
            <div className="animate-fade-in space-y-2 text-center">
              <p
                className={cn(
                  'text-sm',
                  isIndividuallyEliminated
                    ? 'text-destructive-foreground/70'
                    : 'text-base-content/70'
                )}
              >
                {player.isImpostor ? 'Pista:' : 'Palabra:'}
              </p>
              <p
                className={cn(
                  'animate-reveal line-clamp-2 text-2xl font-bold break-words',
                  isIndividuallyEliminated
                    ? 'text-destructive-foreground line-through'
                    : player.isImpostor
                      ? 'text-warning'
                      : 'text-success'
                )}
              >
                {player.assignedWord}
              </p>
              {!showRole && (
                <div className="flex flex-col gap-2 pt-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="mx-auto w-full gap-1 text-sm sm:w-auto"
                    onClick={toggleReveal}
                    aria-label={`Ocultar palabra de ${player.name}`}
                  >
                    <EyeOff className="h-4 w-4" />
                    Ocultar palabra
                  </Button>
                  {player.isImpostor && (
                    <Button
                      type="button"
                      variant={isEliminated ? 'secondary' : 'destructive'}
                      size="sm"
                      className="mx-auto w-full gap-1 sm:w-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleEliminate();
                      }}
                      aria-label={
                        isEliminated ? 'Desmarcar como eliminado' : 'Marcar como eliminado'
                      }
                    >
                      <Skull className="h-4 w-4" />
                      {isEliminated ? 'Restaurar' : 'Eliminar'}
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
