import { Minus, Plus } from 'lucide-react';

interface GameConfigProps {
  playerCount: number;
  impostorCount: number;
  selectedCategoriesCount: number;
  canStart: boolean;
  onStartGame: () => void;
  onImpostorCountChange: (count: number) => void;
}

export function GameConfig({
  playerCount,
  impostorCount,
  selectedCategoriesCount,
  canStart,
  onStartGame,
  onImpostorCountChange,
}: GameConfigProps) {
  const minPlayers = 3;
  const needMorePlayers = playerCount < minPlayers;
  const needCategories = selectedCategoriesCount === 0;
  const maxImpostors = Math.max(1, playerCount - 1);

  const issues: string[] = [];
  if (needMorePlayers) issues.push(`Faltan ${minPlayers - playerCount} jugadores`);
  if (needCategories) issues.push('Selecciona al menos 1 categoría');

  return (
    <div className={`card ${canStart ? 'bg-primary/10 ring-primary ring-2' : 'bg-base-200'}`}>
      <div className="card-body gap-4 p-4">
        {/* Stats compactos */}
        <div className="bg-base-300 flex items-center justify-around rounded-lg py-3">
          <div className="text-center">
            <div className="text-primary text-2xl font-bold">{playerCount}</div>
            <div className="text-base-content/60 text-xs">Jugadores</div>
          </div>

          <div className="divider divider-horizontal mx-2"></div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="btn btn-circle btn-neutral"
              onClick={() => onImpostorCountChange(impostorCount - 1)}
              disabled={impostorCount <= 1}
              aria-label="Disminuir impostores"
            >
              <Minus className="h-4 w-4" />
            </button>
            <div className="text-center">
              <div className="text-error text-2xl font-bold">{impostorCount}</div>
              <div className="text-base-content/60 text-xs">Impostores</div>
            </div>
            <button
              type="button"
              className="btn btn-circle btn-neutral"
              onClick={() => onImpostorCountChange(impostorCount + 1)}
              disabled={impostorCount >= maxImpostors}
              aria-label="Aumentar impostores"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Alertas */}
        {issues.length > 0 && (
          <p className="text-warning text-center text-sm">{issues.join(' • ')}</p>
        )}

        {/* Botón iniciar */}
        <button
          type="button"
          className={`btn btn-lg min-h-14 w-full text-lg ${canStart ? 'btn-primary' : 'btn-disabled'}`}
          onClick={onStartGame}
          disabled={!canStart}
          aria-label="Iniciar el juego"
        >
          {canStart ? '¡Iniciar Juego!' : 'Configura el juego'}
        </button>
      </div>
    </div>
  );
}
