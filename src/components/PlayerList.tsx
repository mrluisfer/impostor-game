import { Users, X } from 'lucide-react';
import type { Player } from '../types/game';

interface PlayerListProps {
  players: Player[];
  onRemovePlayer: (id: string) => void;
  disabled?: boolean;
}

export function PlayerList({ players, onRemovePlayer, disabled = false }: PlayerListProps) {
  if (players.length === 0) {
    return (
      <div className="card bg-base-200">
        <div className="card-body items-center text-center py-10">
          <Users className="w-12 h-12 text-base-content/50" />
          <p className="text-base-content text-lg">Aún no hay jugadores</p>
          <p className="text-sm text-base-content/70">Agrega al menos 3 jugadores para comenzar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-200">
      <div className="card-body p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="card-title text-lg inline-flex items-center gap-2">
            <Users className="w-5 h-5 shrink-0" /> Jugadores
          </h2>
          <div className="badge badge-primary badge-lg font-bold">{players.length}</div>
        </div>
        <ul className="space-y-2 max-h-80 overflow-y-auto overscroll-contain">
          {players.map((player, index) => (
            <li key={player.id} className="flex items-center gap-3 p-3 rounded-lg bg-base-300 min-h-14">
              <span className="badge badge-neutral badge-sm font-mono">{index + 1}</span>
              <span className="flex-1 font-medium truncate">{player.name}</span>
              {!disabled && (
                <button
                  type="button"
                  className="btn btn-error btn-square"
                  onClick={() => onRemovePlayer(player.id)}
                  aria-label={`Eliminar a ${player.name}`}
                >
                  <X className="size-5" />
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
