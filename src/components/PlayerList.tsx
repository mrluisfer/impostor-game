import { useEffect, useRef, useState } from 'react';
import { Users, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
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
      <Card className="bg-base-200 ring-border/70">
        <CardContent className="flex flex-col items-center py-10 text-center">
          <Users className="text-base-content/50 h-12 w-12" />
          <p className="text-base-content text-lg">Aún no hay jugadores</p>
          <p className="text-base-content/70 text-sm">Agrega al menos 3 jugadores para comenzar</p>
        </CardContent>
      </Card>
    );
  }

  // Mostrar los jugadores más recientes primero (reversed)
  const displayPlayers = [...players].reverse();

  return (
    <Card className="bg-base-200 ring-border/70">
      <CardContent className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <CardTitle className="inline-flex min-w-0 items-center gap-2 text-lg">
            <Users className="h-5 w-5 shrink-0" /> Jugadores
          </CardTitle>
          <div className="flex items-center gap-2">
            {players.length >= 3 && (
              <span className="text-success text-xs font-medium">✓ Listo</span>
            )}
            <Badge className="h-6 px-2 text-sm font-bold tabular-nums" variant="default">
              {players.length}
            </Badge>
          </div>
        </div>

        <div className="relative">
          <ul
            ref={listRef}
            onScroll={handleScroll}
            className="max-h-80 space-y-2 overflow-y-auto overscroll-contain scroll-smooth sm:max-h-150"
          >
            {displayPlayers.map((player) => {
              const originalIndex = players.findIndex((p) => p.id === player.id);
              const isNew = player.id === animatingId;

              return (
                <li
                  key={player.id}
                  className={cn(
                    'bg-base-300 flex min-h-14 items-center gap-3 rounded-lg p-3 transition-all duration-300 ease-out',
                    isNew && 'animate-slide-in'
                  )}
                >
                  <Badge
                    className="bg-base-100/50 min-w-8 px-2 font-mono text-xs tabular-nums"
                    variant="outline"
                  >
                    {originalIndex + 1}
                  </Badge>
                  <span className="flex-1 truncate font-medium" title={player.name}>
                    {player.name}
                  </span>
                  {!disabled && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon-sm"
                      className="h-10 w-10 touch-manipulation"
                      onClick={() => onRemovePlayer(player.id)}
                      aria-label={`Eliminar a ${player.name}`}
                    >
                      <X className="size-4" />
                    </Button>
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
      </CardContent>
    </Card>
  );
}
