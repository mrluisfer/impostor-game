import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface PlayerFormProps {
  onAddPlayer: (name: string) => boolean;
  disabled?: boolean;
}

export function PlayerForm({ onAddPlayer, disabled = false }: PlayerFormProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Por favor ingresa un nombre');
      return;
    }

    const success = onAddPlayer(trimmedName);
    if (success) {
      setName('');
      inputRef.current?.focus();
    } else {
      setError('Este nombre ya existe');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex w-full gap-2">
        <Input
          ref={inputRef}
          type="text"
          className={cn('bg-base-200 h-12 text-base md:text-base', error && 'border-destructive')}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError('');
          }}
          placeholder="Nombre del jugador..."
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          autoComplete="off"
        />
        <Button
          type="submit"
          size="lg"
          className="h-12 px-6 text-xl"
          disabled={disabled || !name.trim()}
          aria-label="Agregar jugador"
        >
          +
        </Button>
      </div>
      {error && (
        <p className="text-destructive mt-2 text-sm" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
