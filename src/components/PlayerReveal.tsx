import { useState } from 'react';
import { User, Eye, Play, ArrowRight, ChevronLeft } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { Player } from '../types/game';

interface PlayerRevealProps {
  player: Player;
  currentIndex: number;
  totalPlayers: number;
  onPrevious: () => void;
  onNext: () => void;
  onSkip: () => void;
}

export function PlayerReveal({
  player,
  currentIndex,
  totalPlayers,
  onPrevious,
  onNext,
  onSkip,
}: PlayerRevealProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const isLast = currentIndex === totalPlayers - 1;
  const isFirst = currentIndex === 0;

  const handlePrevious = () => {
    setIsRevealed(false);
    onPrevious();
  };

  const handleReveal = () => {
    setIsRevealed(true);
  };

  const handleNext = () => {
    setIsRevealed(false);
    onNext();
  };

  const progress = ((currentIndex + 1) / totalPlayers) * 100;

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4 px-4">
      {/* Botón atrás - siempre visible para navegación */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="-mb-2 gap-1 self-start"
        onClick={handlePrevious}
        disabled={isFirst}
        aria-label="Volver al jugador anterior"
      >
        <ChevronLeft className="h-4 w-4" />
        Anterior
      </Button>

      <div className="text-center">
        <p className="text-base-content/70 mb-2 text-lg">
          Jugador {currentIndex + 1} de {totalPlayers}
        </p>
        <Progress value={progress} className="gap-0" />
      </div>

      <Card className="animate-scale-in bg-base-200 ring-border/70">
        <CardContent className="items-center p-5 text-center">
          <Avatar className="bg-primary/20 mb-2 h-16 w-16">
            <AvatarFallback className="bg-primary text-primary-foreground">
              <User className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
          <CardTitle className="mb-3 max-w-full truncate text-2xl" title={player.name}>
            {player.name}
          </CardTitle>

          {!isRevealed ? (
            <div className="w-full space-y-4">
              <p className="text-base-content/70">
                Pasa el dispositivo a <strong className="text-primary">{player.name}</strong>
              </p>
              <Button
                type="button"
                size="lg"
                className="animate-glow min-h-14 w-full text-lg"
                onClick={handleReveal}
              >
                <span className="inline-flex items-center gap-2">
                  <Eye className="h-5 w-5 shrink-0" />
                  Ver mi palabra
                </span>
              </Button>
            </div>
          ) : (
            <div className="animate-fade-in w-full space-y-4">
              <p className="text-base-content/70 text-sm">
                {player.isImpostor ? 'Tu pista es:' : 'Tu palabra es:'}
              </p>
              <div className="animate-reveal bg-base-300 text-base-content rounded-lg p-4 text-2xl font-bold break-words">
                {player.assignedWord}
              </div>
              <p className="text-base-content/60 text-sm">
                {player.isImpostor
                  ? '🤫 Eres impostor — adivina la palabra'
                  : '✓ Eres civil — no reveles tu palabra'}
              </p>
              <Button
                type="button"
                size="lg"
                className="min-h-14 w-full border-emerald-500/60 bg-emerald-500/20 text-emerald-100 hover:bg-emerald-500/30"
                onClick={handleNext}
              >
                {isLast ? (
                  <span className="inline-flex items-center gap-2">
                    <Play className="h-5 w-5 shrink-0" />
                    ¡Comenzar juego!
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <ArrowRight className="h-5 w-5 shrink-0" />
                    Siguiente jugador
                  </span>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-center">
        <Button type="button" variant="ghost" size="sm" onClick={onSkip}>
          Omitir y mostrar tablero
        </Button>
      </div>
    </div>
  );
}
