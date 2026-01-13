import { useState, useRef } from 'react';
import type { FormEvent } from 'react';

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
      <div className="join w-full">
        <input
          ref={inputRef}
          type="text"
          className={`input input-bordered input-lg join-item flex-1 bg-base-200 ${error ? 'input-error' : ''}`}
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
        <button
          type="submit"
          className="btn btn-primary join-item px-6 text-xl"
          disabled={disabled || !name.trim()}
          aria-label="Agregar jugador"
        >
          +
        </button>
      </div>
      {error && (
        <p className="text-error text-sm mt-2" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
