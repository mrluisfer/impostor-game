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
    const currentIds = players.map(p => p.id);
    const prevIds = prevPlayerIdsRef.current;
    
    // Encontrar el ID que está en current pero no en prev
    const newId = currentIds.find(id => !prevIds.includes(id));
    
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
        <div className="card-body items-center text-center py-10">
          <Users className="w-12 h-12 text-base-content/50" />
          <p className="text-base-content text-lg">Aún no hay jugadores</p>
          <p className="text-sm text-base-content/70">Agrega al menos 3 jugadores para comenzar</p>
        </div>
      </div>
    );
  }

  // Mostrar los jugadores más recientes primero (reversed)
  const displayPlayers = [...players].reverse();

  return (
    <div className="card bg-base-200">
      <div className="card-body p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="card-title text-lg inline-flex items-center gap-2">
            <Users className="w-5 h-5 shrink-0" /> Jugadores
          </h2>
          <div className="flex items-center gap-2">
            {players.length >= 3 && (
              <span className="text-xs text-success font-medium">✓ Listo</span>
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
            className="space-y-2 max-h-80 overflow-y-auto overscroll-contain scroll-smooth"
          >
            {displayPlayers.map((player) => {
              const originalIndex = players.findIndex(p => p.id === player.id);
              const isNew = player.id === animatingId;
              
              return (
                <li 
                  key={player.id} 
                  className={`
                    flex items-center gap-3 p-3 rounded-lg bg-base-300 min-h-14
                    transition-all duration-300 ease-out
                    ${isNew ? 'animate-slide-in' : ''}
                  `}
                >
                  <span className="badge badge-neutral badge-sm font-mono tabular-nums min-w-8">
                    {originalIndex + 1}
                  </span>
                  <span className="flex-1 font-medium truncate">{player.name}</span>
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
              className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-base-200 to-transparent pointer-events-none"
              aria-hidden="true"
            />
          )}
        </div>

        {/* Helper text para UX */}
        {players.length > 0 && players.length < 3 && (
          <p className="text-xs text-base-content/60 text-center mt-2">
            Agrega {3 - players.length} jugador{3 - players.length > 1 ? 'es' : ''} más para comenzar
          </p>
        )}
      </div>
    </div>
  );
}
