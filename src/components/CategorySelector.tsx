import { useState, useMemo } from 'react';
import { CheckCheck, X, Search } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');

  const selectedCount = selectedCategories.length;
  const totalCount = categories.length;
  const threshold = totalCount / 2;
  const shouldSelectAll = selectedCount <= threshold;

  // Filtrar categorías por búsqueda
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    const query = searchQuery.toLowerCase();
    return categories.filter(
      (cat) => cat.name.toLowerCase().includes(query) || cat.emoji.includes(query)
    );
  }, [categories, searchQuery]);

  return (
    <div className="card bg-base-200">
      <div className="card-body gap-3 p-4">
        {/* Header con contador y acciones */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Categorías</h2>
            <p className="text-base-content/70 text-sm">
              {selectedCount === 0 ? (
                <span className="text-warning">Selecciona al menos 1 categoría</span>
              ) : (
                <>
                  {selectedCount} de {totalCount} seleccionadas
                </>
              )}
            </p>
          </div>
          <button
            type="button"
            className={`btn btn-sm gap-2 ${shouldSelectAll ? 'btn-primary' : 'btn-ghost bg-base-300'}`}
            onClick={onToggleAll}
            disabled={disabled}
            aria-label={
              shouldSelectAll
                ? 'Seleccionar todas las categorías'
                : 'Deseleccionar todas las categorías'
            }
          >
            {shouldSelectAll ? (
              <>
                <CheckCheck className="h-4 w-4" />
                Todas
              </>
            ) : (
              <>
                <X className="h-4 w-4" />
                Ninguna
              </>
            )}
          </button>
        </div>

        {/* Barra de búsqueda */}
        <div className="relative">
          <Search className="text-base-content/50 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar categoría..."
            className="input input-bordered bg-base-300 w-full pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={disabled}
          />
          {searchQuery && (
            <button
              type="button"
              className="btn btn-circle btn-ghost btn-xs absolute top-1/2 right-2 -translate-y-1/2"
              onClick={() => setSearchQuery('')}
              aria-label="Limpiar búsqueda"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>

        {/* Grid de categorías con scroll */}
        <div className="relative">
          <div
            className="max-h-64 overflow-y-auto overscroll-contain pr-1"
            role="group"
            aria-label="Categorías disponibles"
          >
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {filteredCategories.map((category, index) => {
                const isSelected = selectedCategories.some((c) => c.id === category.id);
                return (
                  <button
                    key={category.id}
                    type="button"
                    className={`btn animate-stagger relative h-auto min-h-14 flex-col gap-1 px-2 py-2 transition-transform active:scale-95 ${
                      isSelected ? 'btn-primary' : 'btn-ghost bg-base-300'
                    }`}
                    style={{ '--stagger-delay': `${index * 0.03}s` } as React.CSSProperties}
                    onClick={() => onSelectCategory(category)}
                    disabled={disabled}
                    aria-pressed={isSelected}
                    aria-label={`Categoría: ${category.name}`}
                  >
                    <span className="text-xl" aria-hidden="true">
                      {category.emoji}
                    </span>
                    <span className="line-clamp-1 text-xs font-medium">{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Indicador de scroll */}
          {filteredCategories.length > 8 && (
            <div
              className="from-base-200 pointer-events-none absolute right-2 bottom-0 left-0 h-6 bg-linear-to-t to-transparent"
              aria-hidden="true"
            />
          )}
        </div>

        {/* Mensaje cuando no hay resultados */}
        {filteredCategories.length === 0 && (
          <p className="text-base-content/60 py-4 text-center">
            No se encontraron categorías con "{searchQuery}"
          </p>
        )}
      </div>
    </div>
  );
}
