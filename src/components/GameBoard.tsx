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
          className="flex gap-2 px-4 sm:px-0 sm:justify-center overflow-x-auto overscroll-x-contain touch-pan-x scrollbar-none pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category) => (
            <span 
              key={category.id} 
              className="badge badge-primary badge-lg gap-2 py-3 px-4 shrink-0"
            >
              <span aria-hidden="true">{category.emoji}</span> {category.name}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="list" aria-label="Tarjetas de jugadores">
        {players.map((player) => (
          <div key={player.id} role="listitem">
            <PlayerCard player={player} showRole={showRoles} />
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
        {!showRoles ? (
          <button
            type="button"
            className="btn btn-warning btn-lg w-full sm:w-auto min-h-14 text-lg"
            onClick={onRevealImpostors}
            aria-label="Revelar quiénes son los impostores"
          >
            <span className="inline-flex items-center gap-2">
              <Drama className="w-5 h-5 shrink-0" /> Revelar Impostores
            </span>
          </button>
        ) : (
          <>
            <button
              type="button"
              className="btn btn-primary btn-lg flex-1 sm:flex-initial min-h-14"
              onClick={onResetGame}
              aria-label="Jugar otra ronda con los mismos jugadores"
            >
              <span className="inline-flex items-center gap-2">
                <RefreshCw className="w-5 h-5 shrink-0" /> Otra Ronda
              </span>
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-lg flex-1 sm:flex-initial min-h-14"
              onClick={onNewGame}
              aria-label="Comenzar un juego nuevo"
            >
              <span className="inline-flex items-center gap-2">
                <PlusCircle className="w-5 h-5 shrink-0" /> Nuevo Juego
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
