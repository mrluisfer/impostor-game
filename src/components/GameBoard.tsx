import { Drama, RefreshCw, Shuffle } from 'lucide-react';
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
              <span
                key={category.id}
                className="badge badge-primary badge-lg shrink-0 gap-2 px-4 py-3"
              >
                <span aria-hidden="true">{category.emoji}</span> {category.name}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-between">
        {!showRoles ? (
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              className="btn btn-ghost bg-base-200 btn-lg min-h-14 text-lg"
              onClick={onChangeWord}
              aria-label="Cambiar palabra manteniendo roles"
            >
              <span className="inline-flex items-center gap-2">
                <Shuffle className="h-5 w-5 shrink-0" /> Cambiar Palabra
              </span>
            </button>
            <button
              type="button"
              className="btn btn-warning btn-lg min-h-14 text-lg"
              onClick={onRevealImpostors}
              aria-label="Revelar quiénes son los impostores"
            >
              <span className="inline-flex items-center gap-2">
                <Drama className="h-5 w-5 shrink-0" /> Revelar Impostores
              </span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-primary btn-lg min-h-14 w-full text-lg"
            onClick={onResetGame}
            aria-label="Jugar otra ronda"
          >
            <span className="inline-flex items-center gap-2">
              <RefreshCw className="h-5 w-5 shrink-0" /> Jugar de Nuevo
            </span>
          </button>
        )}
      </div>

      {/* Indicador de quién inicia */}
      {!showRoles && starterPlayer && (
        <div className="alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 shrink-0 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-base">
            <strong>{starterPlayer.name}</strong> inicia dando la primera pista
          </span>
        </div>
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
