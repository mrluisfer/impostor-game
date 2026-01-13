import { Play, Minus, Plus, AlertTriangle } from 'lucide-react';

interface GameConfigProps {
  playerCount: number;
  impostorCount: number;
  canStart: boolean;
  onStartGame: () => void;
  onImpostorCountChange: (count: number) => void;
}

export function GameConfig({
  playerCount,
  impostorCount,
  canStart,
  onStartGame,
  onImpostorCountChange,
}: GameConfigProps) {
  const minPlayers = 3;
  const needMorePlayers = playerCount < minPlayers;
  const maxImpostors = Math.max(1, playerCount - 1);

  return (
    <div className="card bg-base-200">
      <div className="card-body p-4 gap-4">
        <div className="flex justify-around items-center py-4 bg-base-300 rounded-lg">
          <div className="text-center">
            <div className="text-base-content/70 text-sm mb-1">Jugadores</div>
            <div className="text-4xl font-bold text-primary">{playerCount}</div>
          </div>
          
          <div className="divider divider-horizontal mx-2"></div>
          
          <div className="text-center">
            <div className="text-base-content/70 text-sm mb-1">Impostores</div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="btn btn-circle btn-neutral btn-square"
                onClick={() => onImpostorCountChange(impostorCount - 1)}
                disabled={impostorCount <= 1}
                aria-label="Disminuir impostores"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-4xl font-bold text-error w-5">{impostorCount}</span>
              <button
                type="button"
                className="btn btn-circle btn-neutral btn-square"
                onClick={() => onImpostorCountChange(impostorCount + 1)}
                disabled={impostorCount >= maxImpostors}
                aria-label="Aumentar impostores"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {needMorePlayers && (
          <div className="alert alert-warning">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span>Necesitas al menos {minPlayers} jugadores</span>
          </div>
        )}

        <button
          type="button"
          className="btn btn-primary btn-lg w-full min-h-14 text-lg"
          onClick={onStartGame}
          disabled={!canStart}
          aria-label="Iniciar el juego"
        >
          <span className="inline-flex items-center gap-2">
            <Play className="w-5 h-5 shrink-0" />
            ¡Iniciar Juego!
          </span>
        </button>
      </div>
    </div>
  );
}
