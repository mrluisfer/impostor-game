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
      <div className="card-body gap-4 p-4">
        <div className="bg-base-300 flex items-center justify-around rounded-lg py-4">
          <div className="text-center">
            <div className="text-base-content/70 mb-1 text-sm">Jugadores</div>
            <div className="text-primary text-4xl font-bold">{playerCount}</div>
          </div>

          <div className="divider divider-horizontal mx-2"></div>

          <div className="text-center">
            <div className="text-base-content/70 mb-1 text-sm">Impostores</div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="btn btn-circle btn-neutral btn-square"
                onClick={() => onImpostorCountChange(impostorCount - 1)}
                disabled={impostorCount <= 1}
                aria-label="Disminuir impostores"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-error w-5 text-4xl font-bold">{impostorCount}</span>
              <button
                type="button"
                className="btn btn-circle btn-neutral btn-square"
                onClick={() => onImpostorCountChange(impostorCount + 1)}
                disabled={impostorCount >= maxImpostors}
                aria-label="Aumentar impostores"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {needMorePlayers && (
          <div className="alert alert-warning">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <span>Necesitas al menos {minPlayers} jugadores</span>
          </div>
        )}

        <button
          type="button"
          className="btn btn-primary btn-lg min-h-14 w-full text-lg"
          onClick={onStartGame}
          disabled={!canStart}
          aria-label="Iniciar el juego"
        >
          <span className="inline-flex items-center gap-2">
            <Play className="h-5 w-5 shrink-0" />
            ¡Iniciar Juego!
          </span>
        </button>
      </div>
    </div>
  );
}
