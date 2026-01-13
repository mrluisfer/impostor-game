import { useState, useCallback } from 'react';
import { User, UserX, Eye, EyeOff, Skull } from 'lucide-react';
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

  const isClickable = !showRole;
  const showWord = isRevealed || showRole;

  // Determinar si mostrar como impostor revelado (global o individual)
  const isImpostorRevealed = showRole && player.isImpostor;
  const isIndividuallyEliminated = !showRole && isEliminated && player.isImpostor;

  return (
    <div
      className={`card transition-all duration-300 ${
        isImpostorRevealed || isIndividuallyEliminated
          ? 'bg-error text-error-content'
          : 'bg-base-200'
      } ${isIndividuallyEliminated ? 'scale-[0.98] opacity-75' : ''} ${isClickable ? 'cursor-pointer transition-transform active:scale-[0.98]' : ''}`}
      onClick={toggleReveal}
      onKeyDown={(e) => {
        if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          toggleReveal();
        }
      }}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-pressed={isClickable ? isRevealed : undefined}
      aria-label={
        isClickable ? `${isRevealed ? 'Ocultar' : 'Ver'} palabra de ${player.name}` : undefined
      }
    >
      <div className="card-body p-4">
        <div className="flex items-center gap-3">
          <div className="avatar placeholder">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full ${
                isImpostorRevealed || isIndividuallyEliminated
                  ? 'bg-error-content text-error'
                  : 'bg-base-300'
              }`}
            >
              {isImpostorRevealed || isIndividuallyEliminated ? (
                <UserX className="h-6 w-6" />
              ) : (
                <User className="h-6 w-6" />
              )}
            </div>
          </div>
          <h3
            className={`card-title flex-1 text-lg ${isIndividuallyEliminated ? 'line-through opacity-80' : ''}`}
          >
            {player.name}
          </h3>
          {(isImpostorRevealed || isIndividuallyEliminated) && (
            <span className="badge badge-lg gap-1 font-bold">
              {isIndividuallyEliminated && <Skull className="h-4 w-4" />}
              IMPOSTOR
            </span>
          )}
        </div>

        <div className="mt-4">
          {!showWord ? (
            <div className="bg-base-300/50 text-base-content/70 flex min-h-14 items-center justify-center gap-2 rounded-lg">
              <Eye className="h-5 w-5" />
              <span>Toca para ver</span>
            </div>
          ) : (
            <div className="animate-fade-in space-y-2 text-center">
              <p
                className={`text-sm ${isIndividuallyEliminated ? 'text-error-content/70' : 'text-base-content/70'}`}
              >
                {player.isImpostor ? 'Pista:' : 'Palabra:'}
              </p>
              <p
                className={`animate-reveal text-2xl font-bold ${
                  isIndividuallyEliminated
                    ? 'text-error-content line-through'
                    : player.isImpostor
                      ? 'text-warning'
                      : 'text-success'
                }`}
              >
                {player.assignedWord}
              </p>
              {!showRole && (
                <div className="flex flex-col gap-2 pt-1">
                  <div className="text-base-content/50 flex items-center justify-center gap-1 text-sm">
                    <EyeOff className="h-4 w-4" />
                    <span>Toca para ocultar</span>
                  </div>
                  {player.isImpostor && (
                    <button
                      type="button"
                      className={`btn btn-sm ${isEliminated ? 'btn-ghost' : 'btn-error'} gap-1`}
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
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
