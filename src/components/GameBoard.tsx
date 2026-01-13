import { Drama, RefreshCw, PlusCircle } from 'lucide-react';
import type { Player, Category } from '../types/game';
import { PlayerCard } from './PlayerCard';

interface GameBoardProps {
  players: Player[];
  categories: Category[];
  showRoles: boolean;
  onRevealImpostors: () => void;
  onNewGame: () => void;
  onResetGame: () => void;
}

export function GameBoard({
  players,
  categories,
  showRoles,
  onRevealImpostors,
  onNewGame,
  onResetGame,
}: GameBoardProps) {
  return (
    <div className="space-y-6 pb-6">
      {/* Categories horizontal scroll - mobile optimized */}
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

      <div className="flex flex-col justify-center gap-3 pt-4 sm:flex-row">
        {!showRoles ? (
          <button
            type="button"
            className="btn btn-warning btn-lg min-h-14 w-full text-lg sm:w-auto"
            onClick={onRevealImpostors}
            aria-label="Revelar quiénes son los impostores"
          >
            <span className="inline-flex items-center gap-2">
              <Drama className="h-5 w-5 shrink-0" /> Revelar Impostores
            </span>
          </button>
        ) : (
          <>
            <button
              type="button"
              className="btn btn-primary btn-lg min-h-14 flex-1 sm:flex-initial"
              onClick={onResetGame}
              aria-label="Jugar otra ronda con los mismos jugadores"
            >
              <span className="inline-flex items-center gap-2">
                <RefreshCw className="h-5 w-5 shrink-0" /> Otra Ronda
              </span>
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-lg min-h-14 flex-1 sm:flex-initial"
              onClick={onNewGame}
              aria-label="Comenzar un juego nuevo"
            >
              <span className="inline-flex items-center gap-2">
                <PlusCircle className="h-5 w-5 shrink-0" /> Nuevo Juego
              </span>
            </button>
          </>
        )}
      </div>

      <div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
        aria-label="Tarjetas de jugadores"
      >
        {players.map((player) => (
          <div key={player.id} role="listitem">
            <PlayerCard player={player} showRole={showRoles} />
          </div>
        ))}
      </div>
    </div>
  );
}
