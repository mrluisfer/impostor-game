import { useState } from 'react';
import { User, Eye, Play, ArrowRight, ChevronLeft } from 'lucide-react';
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
      <button
        type="button"
        className="btn btn-ghost btn-sm -mb-2 gap-1 self-start"
        onClick={handlePrevious}
        disabled={isFirst}
        aria-label="Volver al jugador anterior"
      >
        <ChevronLeft className="h-4 w-4" />
        Anterior
      </button>

      <div className="text-center">
        <p className="text-base-content/70 mb-2 text-lg">
          Jugador {currentIndex + 1} de {totalPlayers}
        </p>
        <progress
          className="progress progress-primary h-3 w-full"
          value={progress}
          max="100"
        ></progress>
      </div>

      <div className="card animate-scale-in bg-base-200">
        <div className="card-body items-center p-5 text-center">
          <div className="avatar placeholder mb-2">
            <div className="bg-primary text-primary-content flex h-16 w-16 items-center justify-center rounded-full">
              <User className="h-8 w-8" />
            </div>
          </div>
          <h2 className="card-title mb-3 text-2xl">{player.name}</h2>

          {!isRevealed ? (
            <div className="w-full space-y-4">
              <p className="text-base-content/70">
                Pasa el dispositivo a <strong className="text-primary">{player.name}</strong>
              </p>
              <button
                type="button"
                className="btn btn-primary btn-lg animate-glow min-h-14 w-full text-lg"
                onClick={handleReveal}
              >
                <span className="inline-flex items-center gap-2">
                  <Eye className="h-5 w-5 shrink-0" />
                  Ver mi palabra
                </span>
              </button>
            </div>
          ) : (
            <div className="animate-fade-in w-full space-y-4">
              <p className="text-base-content/70 text-sm">
                {player.isImpostor ? 'Tu pista es:' : 'Tu palabra es:'}
              </p>
              <div className="animate-reveal bg-base-300 text-base-content rounded-lg p-4 text-2xl font-bold">
                {player.assignedWord}
              </div>
              <p className="text-base-content/60 text-sm">
                {player.isImpostor
                  ? '🤫 Eres impostor — adivina la palabra'
                  : '✓ Eres civil — no reveles tu palabra'}
              </p>
              <button
                type="button"
                className="btn btn-success btn-lg min-h-14 w-full text-lg"
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
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="text-center">
        <button type="button" className="btn btn-ghost btn-sm" onClick={onSkip}>
          Omitir y mostrar tablero
        </button>
      </div>
    </div>
  );
}
