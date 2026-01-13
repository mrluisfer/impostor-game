import { useEffect, useRef, useState } from 'react';
import { Users, X } from 'lucide-react';
import type { Player } from '../types/game';

interface PlayerListProps {
  players: Player[];
  onRemovePlayer: (id: string) => void;
  disabled?: boolean;
}

export function PlayerList({ players, onRemovePlayer, disabled = false }: PlayerListProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [hasScrollableContent, setHasScrollableContent] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [animatingId, setAnimatingId] = useState<string | null>(null);
  const prevPlayerIdsRef = useRef<string[]>([]);

  // Detectar y animar nuevos jugadores
  useEffect(() => {
    const currentIds = players.map((p) => p.id);
    const prevIds = prevPlayerIdsRef.current;

    // Encontrar el ID que está en current pero no en prev
    const newId = currentIds.find((id) => !prevIds.includes(id));

    if (newId) {
      setAnimatingId(newId);
      const timeout = setTimeout(() => setAnimatingId(null), 500);
      prevPlayerIdsRef.current = currentIds;
      return () => clearTimeout(timeout);
    }

    prevPlayerIdsRef.current = currentIds;
  }, [players]);

  // Verificar si hay contenido scrolleable
  useEffect(() => {
    const checkScrollable = () => {
      if (listRef.current) {
        const { scrollHeight, clientHeight } = listRef.current;
        setHasScrollableContent(scrollHeight > clientHeight);
      }
    };

    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, [players.length]);

  // Manejar el scroll para mostrar/ocultar indicador
  const handleScroll = () => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      const isBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setIsAtBottom(isBottom);
    }
  };

  if (players.length === 0) {
    return (
      <div className="card bg-base-200">
        <div className="card-body items-center py-10 text-center">
          <Users className="text-base-content/50 h-12 w-12" />
          <p className="text-base-content text-lg">Aún no hay jugadores</p>
          <p className="text-base-content/70 text-sm">Agrega al menos 3 jugadores para comenzar</p>
        </div>
      </div>
    );
  }

  // Mostrar los jugadores más recientes primero (reversed)
  const displayPlayers = [...players].reverse();

  return (
    <div className="card bg-base-200">
      <div className="card-body p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="card-title inline-flex items-center gap-2 text-lg">
            <Users className="h-5 w-5 shrink-0" /> Jugadores
          </h2>
          <div className="flex items-center gap-2">
            {players.length >= 3 && (
              <span className="text-success text-xs font-medium">✓ Listo</span>
            )}
            <div className="badge badge-primary badge-lg font-bold tabular-nums">
              {players.length}
            </div>
          </div>
        </div>

        <div className="relative">
          <ul
            ref={listRef}
            onScroll={handleScroll}
            className="max-h-80 space-y-2 overflow-y-auto overscroll-contain scroll-smooth"
          >
            {displayPlayers.map((player) => {
              const originalIndex = players.findIndex((p) => p.id === player.id);
              const isNew = player.id === animatingId;

              return (
                <li
                  key={player.id}
                  className={`bg-base-300 flex min-h-14 items-center gap-3 rounded-lg p-3 transition-all duration-300 ease-out ${isNew ? 'animate-slide-in' : ''} `}
                >
                  <span className="badge badge-neutral badge-sm min-w-8 font-mono tabular-nums">
                    {originalIndex + 1}
                  </span>
                  <span className="flex-1 truncate font-medium">{player.name}</span>
                  {!disabled && (
                    <button
                      type="button"
                      className="btn btn-error btn-square hover:bg-error/90"
                      onClick={() => onRemovePlayer(player.id)}
                      aria-label={`Eliminar a ${player.name}`}
                    >
                      <X className="size-4" />
                    </button>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Indicador de scroll */}
          {hasScrollableContent && !isAtBottom && (
            <div
              className="from-base-200 pointer-events-none absolute right-0 bottom-0 left-0 h-8 bg-linear-to-t to-transparent"
              aria-hidden="true"
            />
          )}
        </div>

        {/* Helper text para UX */}
        {players.length > 0 && players.length < 3 && (
          <p className="text-base-content/60 mt-2 text-center text-xs">
            Agrega {3 - players.length} jugador{3 - players.length > 1 ? 'es' : ''} más para
            comenzar
          </p>
        )}
      </div>
    </div>
  );
}
