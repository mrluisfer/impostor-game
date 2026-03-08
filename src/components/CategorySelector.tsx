import { useState, useMemo } from 'react';
import { CheckCheck, X, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
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
    <Card className="bg-base-200 ring-border/70 md:min-h-fit">
      <CardContent className="space-y-3 p-4">
        {/* Header con contador y acciones */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold">Categorías</h2>
            <p className="text-base-content/70 text-sm" aria-live="polite">
              {selectedCount === 0 ? (
                <span className="text-warning">Selecciona al menos 1 categoría</span>
              ) : (
                <>
                  {selectedCount} de {totalCount} seleccionadas
                </>
              )}
            </p>
          </div>
          <Button
            type="button"
            size="sm"
            variant={shouldSelectAll ? 'default' : 'outline'}
            className={cn('gap-2', !shouldSelectAll && 'bg-base-300 hover:bg-base-300/80')}
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
          </Button>
        </div>

        {/* Barra de búsqueda */}
        <div className="relative">
          <Search className="text-base-content/50 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Buscar categoría..."
            className="bg-base-300 h-10 pr-9 pl-10 text-base md:text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={disabled}
            aria-label="Buscar categoría"
          />
          {searchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              className="absolute top-1/2 right-2 -translate-y-1/2"
              onClick={() => setSearchQuery('')}
              aria-label="Limpiar búsqueda"
            >
              <X className="h-3 w-3" />
            </Button>
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
                  <Button
                    key={category.id}
                    type="button"
                    variant={isSelected ? 'default' : 'outline'}
                    className={cn(
                      'animate-stagger relative h-auto min-h-14 flex-col gap-1 px-2 py-2 text-left transition-transform active:scale-95',
                      !isSelected && 'bg-base-300 hover:bg-base-300/85'
                    )}
                    style={{ '--stagger-delay': `${index * 0.03}s` } as React.CSSProperties}
                    onClick={() => onSelectCategory(category)}
                    disabled={disabled}
                    aria-pressed={isSelected}
                    aria-label={`Categoría: ${category.name}`}
                  >
                    <span className="text-xl leading-none" aria-hidden="true">
                      {category.emoji}
                    </span>
                    <span className="line-clamp-1 text-xs font-medium">{category.name}</span>
                    {isSelected && (
                      <Badge
                        variant="secondary"
                        className="absolute top-1 right-1 h-4 min-w-4 rounded-full px-1 py-0 text-[10px]"
                      >
                        ✓
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mensaje cuando no hay resultados */}
        {filteredCategories.length === 0 && (
          <p className="text-base-content/60 py-4 text-center">
            No se encontraron categorías con "{searchQuery}"
          </p>
        )}
      </CardContent>
    </Card>
  );
}
