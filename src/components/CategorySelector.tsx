import { CheckCheck, X } from 'lucide-react';
import type { Category } from '../types/game';

interface CategorySelectorProps {
  categories: Category[];
  selectedCategories: Category[];
  onSelectCategory: (category: Category) => void;
  onToggleAll: () => void;
  disabled?: boolean;
}

export function CategorySelector({
  categories,
  selectedCategories,
  onSelectCategory,
  onToggleAll,
  disabled = false,
}: CategorySelectorProps) {
  const selectedCount = selectedCategories.length;
  const totalCount = categories.length;
  const threshold = totalCount / 2;
  const shouldSelectAll = selectedCount <= threshold;

  return (
    <div className="flex flex-col gap-3">
      {/* Botón toggle todas */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-base-content/70 text-sm">
          {selectedCount} de {totalCount} seleccionadas
        </p>
        <button
          type="button"
          className={`btn min-h-12 px-4 gap-2 ${
            shouldSelectAll 
              ? 'btn-primary' 
              : 'btn-ghost bg-base-200'
          }`}
          onClick={onToggleAll}
          disabled={disabled}
          aria-label={shouldSelectAll ? 'Seleccionar todas las categorías' : 'Deseleccionar todas las categorías'}
        >
          {shouldSelectAll ? (
            <>
              <CheckCheck className="w-5 h-5" />
              Seleccionar todas
            </>
          ) : (
            <>
              <X className="w-5 h-5" />
              Deseleccionar
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3" role="group" aria-label="Categorías disponibles">
      {categories.map((category) => {
        const isSelected = selectedCategories.some(c => c.id === category.id);
        return (
          <button
            key={category.id}
            type="button"
            className={`btn h-auto min-h-20 py-4 flex-col gap-2 relative ${
              isSelected 
                ? 'btn-primary' 
                : 'btn-ghost bg-base-200'
            }`}
            onClick={() => onSelectCategory(category)}
            disabled={disabled}
            aria-pressed={isSelected}
            aria-label={`Categoría: ${category.name}`}
          >
            <span className="text-3xl" aria-hidden="true">
              {category.emoji}
            </span>
            <span className="text-sm font-medium">{category.name}</span>
            {isSelected && (
              <span className="absolute top-2 right-2 badge badge-sm badge-secondary" aria-hidden="true">
                ✓
              </span>
            )}
          </button>
        );
      })}
      </div>
    </div>
  );
}
