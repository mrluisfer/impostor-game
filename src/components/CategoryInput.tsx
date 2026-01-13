import { useState, useEffect } from 'react';
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
      setError('Sin conexión a internet');
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
      setError('Sin conexión a internet');
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
        throw new Error('Error al generar la palabra');
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
        throw new Error('Respuesta inválida del servidor');
      }
    } catch (err) {
      if (!navigator.onLine) {
        setError('Sin conexión a internet');
      } else {
        setError(err instanceof Error ? err.message : 'Error desconocido');
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
      <div className="flex items-center gap-2">
        <span className="text-base-content/70 text-sm font-medium">O genera con IA:</span>
        {!isOnline && (
          <span className="badge badge-warning badge-sm gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-3 w-3"
            >
              <path
                fillRule="evenodd"
                d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            Sin conexión
          </span>
        )}
        {isGenerated && isOnline && (
          <span className="badge badge-success badge-sm gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-3 w-3"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              />
            </svg>
            Palabra lista
          </span>
        )}
      </div>
      <div className="relative">
        <textarea
          className={`textarea focus-within:textarea-accent bg-base-300 text-base-content/80 placeholder:text-base-content/50 w-full resize-none pr-20 transition-all ${!isOnline ? 'cursor-not-allowed opacity-60' : ''}`}
          placeholder={
            isOnline
              ? 'Escribe una categoría (ej: comidas mexicanas, películas de terror, deportes extremos...)'
              : 'Sin conexión a internet...'
          }
          value={categoryInput}
          onChange={(e) => {
            if (!isOnline) return;
            setCategoryInput(e.target.value);
            if (isGenerated) {
              setIsGenerated(false);
              onWordGenerated?.(null);
            }
          }}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          rows={2}
        />
        <div className="absolute right-2 bottom-2 flex gap-1">
          {(categoryInput || isGenerated) && (
            <button
              type="button"
              onClick={handleClear}
              className="btn btn-circle btn-ghost btn-sm"
              title="Limpiar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          )}
          <button
            type="button"
            onClick={handleGenerateWord}
            disabled={isLoading || !categoryInput.trim() || !isOnline}
            className="btn btn-circle btn-sm btn-accent disabled:opacity-50"
            title={isOnline ? 'Generar palabra' : 'Sin conexión'}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-error text-sm">
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
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
