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
    <div className="w-full max-w-md mx-auto flex flex-col gap-4 px-4">
      {/* Botón atrás - siempre visible para navegación */}
      <button
        type="button"
        className="btn btn-ghost btn-sm self-start gap-1 -mb-2"
        onClick={handlePrevious}
        disabled={isFirst}
        aria-label="Volver al jugador anterior"
      >
        <ChevronLeft className="w-4 h-4" />
        Anterior
      </button>

      <div className="text-center">
        <p className="text-base-content/70 mb-2 text-lg">
          Jugador {currentIndex + 1} de {totalPlayers}
        </p>
        <progress className="progress progress-primary w-full h-3" value={progress} max="100"></progress>
      </div>

      <div className="card bg-base-200">
        <div className="card-body items-center text-center p-5">
          <div className="avatar placeholder mb-2">
            <div className="bg-primary text-primary-content w-16 h-16 rounded-full flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
          </div>
          <h2 className="card-title text-2xl mb-3">{player.name}</h2>

          {!isRevealed ? (
            <div className="space-y-4 w-full">
              <p className="text-base-content/70">
                Pasa el dispositivo a <strong className="text-primary">{player.name}</strong>
              </p>
              <button
                type="button"
                className="btn btn-primary btn-lg w-full min-h-14 text-lg"
                onClick={handleReveal}
              >
                <span className="inline-flex items-center gap-2">
                  <Eye className="w-5 h-5 shrink-0" />
                  Ver mi palabra
                </span>
              </button>
            </div>
          ) : (
            <div className="space-y-4 w-full">
              <p className="text-base-content/70 text-sm">
                {player.isImpostor ? 'Tu pista es:' : 'Tu palabra es:'}
              </p>
              <div className="p-4 rounded-lg text-2xl font-bold bg-base-300 text-base-content">
                {player.assignedWord}
              </div>
              <p className="text-base-content/60 text-sm">
                {player.isImpostor 
                  ? '🤫 Eres impostor — adivina la palabra' 
                  : '✓ Eres civil — no reveles tu palabra'}
              </p>
              <button
                type="button"
                className="btn btn-success btn-lg w-full min-h-14 text-lg"
                onClick={handleNext}
              >
                {isLast ? (
                  <span className="inline-flex items-center gap-2">
                    <Play className="w-5 h-5 shrink-0" />
                    ¡Comenzar juego!
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 shrink-0" />
                    Siguiente jugador
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="text-center">
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={onSkip}
        >
          Omitir y mostrar tablero
        </button>
      </div>
    </div>
  );
}
