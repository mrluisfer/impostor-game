import { useEffect, useState, useCallback } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Badge } from '@/components/ui/badge';
import { type AppTheme, isAppTheme } from '@/lib/themes';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { useGame } from './hooks/useGame';
import { PlayerForm } from './components/PlayerForm';
import { PlayerList } from './components/PlayerList';
import { CategorySelector } from './components/CategorySelector';
import { GameConfig } from './components/GameConfig';
import { GameBoard } from './components/GameBoard';
import { PlayerReveal } from './components/PlayerReveal';
import CategoryInput, { type GeneratedWord } from './components/CategoryInput';

const THEME_STORAGE_KEY = 'impostor-theme';

function getInitialTheme(): AppTheme {
  if (typeof window === 'undefined') {
    return 'midnight';
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme && isAppTheme(savedTheme)) {
    return savedTheme;
  }

  return 'midnight';
}

function App() {
  const [pendingGeneratedWord, setPendingGeneratedWord] = useState<GeneratedWord | null>(null);
  const [theme, setTheme] = useState<AppTheme>(getInitialTheme);

  const {
    players,
    selectedCategories,
    phase,
    impostorCount,
    currentRevealIndex,
    categories,
    canStartGame,
    starterPlayerIndex,
    addPlayer,
    removePlayer,
    selectCategory,
    toggleAllCategories,
    setImpostorCount,
    startGame,
    startGameWithGeneratedWord,
    previousReveal,
    nextReveal,
    skipToGame,
    revealImpostors,
    resetGame,
    changeWord,
  } = useGame();

  const isSetup = phase === 'setup';
  const isRevealing = phase === 'revealing';
  const isPlaying = phase === 'playing';
  const isFinished = phase === 'finished';
  const phaseLabel = isSetup
    ? 'Preparación'
    : isRevealing
      ? 'Revelación'
      : isFinished
        ? 'Final'
        : 'Partida';

  // Scroll al inicio cuando cambia la fase del juego
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [phase]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('dark');
    root.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const handleStartGame = useCallback(() => {
    if (pendingGeneratedWord) {
      startGameWithGeneratedWord(pendingGeneratedWord);
      setPendingGeneratedWord(null);
    } else {
      startGame();
    }
  }, [pendingGeneratedWord, startGameWithGeneratedWord, startGame]);

  const handleResetGame = useCallback(() => {
    setPendingGeneratedWord(null);
    resetGame();
  }, [resetGame]);

  const handleChangeWord = useCallback(() => {
    setPendingGeneratedWord(null);
    changeWord();
  }, [changeWord]);

  return (
    <>
      {isRevealing && players.length > 0 ? (
        <div className="app-shell bg-background flex min-h-dvh flex-col p-4">
          <div className="mb-4 flex justify-end">
            <ThemeSwitcher theme={theme} onChange={setTheme} compact />
          </div>
          <div className="flex flex-1 items-center justify-center">
            <PlayerReveal
              player={players[currentRevealIndex]}
              currentIndex={currentRevealIndex}
              totalPlayers={players.length}
              onPrevious={previousReveal}
              onNext={nextReveal}
              onSkip={skipToGame}
            />
          </div>
        </div>
      ) : (
        <main className="app-shell mx-auto min-h-dvh w-full max-w-6xl p-4 pb-8 sm:p-6">
          <header className="surface-panel mb-6 rounded-2xl p-4 sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <p className="text-primary/80 text-xs font-semibold tracking-[0.22em] uppercase">
                  Juego Social
                </p>
                <h1 className="game-logo mt-1 text-3xl font-black sm:text-4xl">El Impostor</h1>
                <p className="text-muted-foreground mt-2 max-w-xl text-sm text-balance">
                  Deducción rápida, pistas creativas y caos divertido entre amigos.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-base-200 px-2.5 text-xs">
                    <span className="truncate">{phaseLabel}</span>
                  </Badge>
                  <Badge variant="outline" className="bg-base-200/70 max-w-44 px-2.5 text-xs">
                    <span className="truncate">
                      {players.length} jugador{players.length === 1 ? '' : 'es'}
                    </span>
                  </Badge>
                  <Badge variant="outline" className="bg-base-200/70 max-w-44 px-2.5 text-xs">
                    <span className="truncate">
                      {selectedCategories.length} categoría
                      {selectedCategories.length === 1 ? '' : 's'}
                    </span>
                  </Badge>
                </div>
              </div>
              <ThemeSwitcher
                theme={theme}
                onChange={setTheme}
                className="self-start lg:self-auto"
              />
            </div>
          </header>

          {isSetup && (
            <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-8">
              <section className="flex flex-col gap-4">
                <h2 className="sr-only">Registro de Jugadores</h2>
                <PlayerForm onAddPlayer={addPlayer} />
                <PlayerList players={players} onRemovePlayer={removePlayer} />
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="sr-only">Selección de Categoría</h2>
                <CategorySelector
                  categories={categories}
                  selectedCategories={selectedCategories}
                  onSelectCategory={selectCategory}
                  onToggleAll={toggleAllCategories}
                />
                <CategoryInput onWordGenerated={setPendingGeneratedWord} />
                <GameConfig
                  playerCount={players.length}
                  impostorCount={impostorCount}
                  selectedCategoriesCount={selectedCategories.length}
                  canStart={canStartGame || (players.length >= 3 && pendingGeneratedWord !== null)}
                  onStartGame={handleStartGame}
                  onImpostorCountChange={setImpostorCount}
                  hasGeneratedWord={pendingGeneratedWord !== null}
                />
              </section>
            </div>
          )}

          {(isPlaying || isFinished) && (
            <GameBoard
              players={players}
              categories={selectedCategories}
              showRoles={isFinished}
              starterPlayerIndex={starterPlayerIndex}
              onRevealImpostors={revealImpostors}
              onResetGame={handleResetGame}
              onChangeWord={handleChangeWord}
            />
          )}
        </main>
      )}
      <Analytics />
    </>
  );
}

export default App;
