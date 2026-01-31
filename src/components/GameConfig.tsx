import { Minus, Plus, Settings, TriangleAlert } from 'lucide-react';

interface GameConfigProps {
  playerCount: number;
  impostorCount: number;
  selectedCategoriesCount: number;
  canStart: boolean;
  onStartGame: () => void;
  onImpostorCountChange: (count: number) => void;
  hasGeneratedWord?: boolean;
}

export function GameConfig({
  playerCount,
  impostorCount,
  selectedCategoriesCount,
  canStart,
  onStartGame,
  onImpostorCountChange,
  hasGeneratedWord = false,
}: GameConfigProps) {
  const minPlayers = 3;
  const needMorePlayers = playerCount < minPlayers;
  const needCategories = selectedCategoriesCount === 0 && !hasGeneratedWord;
  const maxImpostors = Math.max(1, playerCount - 1);

  const issues: string[] = [];
  if (needMorePlayers) {
    const missing = minPlayers - playerCount;
    issues.push(`Agrega ${missing} jugador${missing > 1 ? 'es' : ''} más`);
  }
  if (needCategories) {
    issues.push('Elige una categoría o genera con IA');
  }

  return (
    <div
      className={`card ${canStart ? 'bg-primary/10 border-primary border-2 shadow-lg' : 'bg-base-200'}`}
    >
      <div className="card-body gap-4 p-4 sm:p-6">
        {/* Stats Section */}
        <div className="bg-base-300 rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-around gap-3 sm:gap-6">
            {/* Jugadores */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="text-primary text-3xl font-bold tabular-nums sm:text-4xl">
                {playerCount}
              </div>
              <div className="text-base-content/60 text-xs font-medium sm:text-sm">Jugadores</div>
            </div>

            {/* Separator */}
            <div className="divider divider-horizontal mx-0 w-px"></div>

            {/* Impostores Control */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                className="btn btn-circle btn-sm sm:btn-md btn-ghost hover:btn-error touch-manipulation"
                onClick={() => onImpostorCountChange(impostorCount - 1)}
                disabled={impostorCount <= 1}
                aria-label="Reducir impostores"
              >
                <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              <div className="flex min-w-15 flex-col items-center gap-1.5 sm:min-w-20">
                <div className="text-error text-3xl font-bold tabular-nums sm:text-4xl">
                  {impostorCount}
                </div>
                <div className="text-base-content/60 text-xs font-medium whitespace-nowrap sm:text-sm">
                  Impostor{impostorCount > 1 ? 'es' : ''}
                </div>
              </div>

              <button
                type="button"
                className="btn btn-circle btn-sm sm:btn-md btn-ghost hover:btn-error touch-manipulation"
                onClick={() => onImpostorCountChange(impostorCount + 1)}
                disabled={impostorCount >= maxImpostors}
                aria-label="Aumentar impostores"
              >
                <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mensajes de estado */}
        {issues.length > 0 && (
          <div className="alert alert-warning shadow-sm">
            <TriangleAlert />
            <span className="text-sm">{issues.join(' • ')}</span>
          </div>
        )}

        {canStart && (
          <div className="alert alert-success shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm font-medium">¡Todo listo para empezar!</span>
          </div>
        )}

        {/* Botón de inicio */}
        <button
          type="button"
          className={`btn btn-lg h-14 w-full touch-manipulation text-base font-semibold sm:h-16 sm:text-lg ${
            canStart ? 'btn-primary' : 'btn-disabled'
          }`}
          onClick={onStartGame}
          disabled={!canStart}
          aria-label={canStart ? 'Iniciar el juego' : 'Completa la configuración para iniciar'}
        >
          {canStart ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 sm:h-6 sm:w-6"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                  clipRule="evenodd"
                />
              </svg>
              ¡Comenzar a Jugar!
            </>
          ) : (
            <>
              <Settings />
              Completa la configuración
            </>
          )}
        </button>
      </div>
    </div>
  );
}
