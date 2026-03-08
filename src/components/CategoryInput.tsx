import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, SendHorizontal, WifiOff, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { WordWithClues } from '../types/game';

export interface GeneratedWord extends WordWithClues {
  category: string;
}

interface CategoryInputProps {
  onWordGenerated?: (data: GeneratedWord | null) => void;
}

export default function CategoryInput({ onWordGenerated }: CategoryInputProps) {
  const [categoryInput, setCategoryInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(() =>
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  // Detectar cambios en la conexión
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
      setError(null);
    }

    function handleOffline() {
      setIsOnline(false);
      setError('No hay conexión a internet. Verifica tu red.');
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  async function handleGenerateWord() {
    if (!categoryInput.trim()) return;

    // Verificar conexión antes de intentar
    if (!navigator.onLine) {
      setError('No hay conexión a internet. Verifica tu red.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setIsGenerated(false);
    onWordGenerated?.(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: categoryInput.trim(),
          type: 'generate_word',
        }),
      });

      if (!res.ok) {
        throw new Error('No pudimos generar la palabra. Intenta de nuevo.');
      }

      const data = await res.json();

      if (data.word) {
        const wordData: GeneratedWord = {
          category: data.category || categoryInput.trim(),
          word: data.word,
          clues: data.clues || [],
        };
        setIsGenerated(true);
        onWordGenerated?.(wordData);
      } else {
        throw new Error('La respuesta no es válida. Intenta nuevamente.');
      }
    } catch (err) {
      if (!navigator.onLine) {
        setError('No hay conexión a internet. Verifica tu red.');
      } else {
        setError(err instanceof Error ? err.message : 'Algo salió mal. Intenta de nuevo.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handleClear() {
    setCategoryInput('');
    setIsGenerated(false);
    setError(null);
    onWordGenerated?.(null);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerateWord();
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-base-content/70 text-sm font-medium">Genera una palabra con IA</span>
        {!isOnline && (
          <Badge
            className="gap-1 border-amber-500/50 bg-amber-500/10 text-amber-300"
            variant="outline"
          >
            <WifiOff className="h-3 w-3" />
            Sin conexión
          </Badge>
        )}
        {isGenerated && isOnline && (
          <Badge
            className="gap-1 border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
            variant="outline"
          >
            <CheckCircle2 className="h-3 w-3" />
            ¡Listo para jugar!
          </Badge>
        )}
      </div>
      <div className="relative">
        <Textarea
          className={cn(
            'bg-base-300 text-base-content/80 placeholder:text-base-content/50 min-h-24 resize-none pr-20 md:text-base',
            !isOnline && 'cursor-not-allowed opacity-60'
          )}
          placeholder={
            isOnline
              ? 'Ej: comidas mexicanas, películas de terror, marcas de autos...'
              : 'Esperando conexión a internet...'
          }
          value={categoryInput}
          onChange={(e) => {
            setCategoryInput(e.target.value);
            if (isGenerated) {
              setIsGenerated(false);
              onWordGenerated?.(null);
            }
          }}
          onKeyDown={handleKeyDown}
          disabled={isLoading || !isOnline}
          rows={2}
          aria-label="Escribe una categoría para generar palabras"
        />
        <div className="absolute right-2 bottom-2 flex gap-1">
          {(categoryInput || isGenerated) && (
            <Button
              type="button"
              onClick={handleClear}
              variant="ghost"
              size="icon-sm"
              title="Borrar todo"
              aria-label="Borrar categoría"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <Button
            type="button"
            onClick={handleGenerateWord}
            disabled={isLoading || !categoryInput.trim() || !isOnline}
            size="icon-sm"
            className="bg-accent text-accent-content hover:bg-accent/85"
            title={isOnline ? 'Generar palabra' : 'Sin conexión a internet'}
            aria-label={isLoading ? 'Generando palabra...' : 'Generar palabra'}
            aria-busy={isLoading}
          >
            {isLoading ? <Spinner className="h-4 w-4" /> : <SendHorizontal className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="bg-destructive/10">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
