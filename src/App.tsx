import { useEffect } from 'react';
import { useGame } from './hooks/useGame';
import { PlayerForm } from './components/PlayerForm';
import { PlayerList } from './components/PlayerList';
import { CategorySelector } from './components/CategorySelector';
import { GameConfig } from './components/GameConfig';
import { GameBoard } from './components/GameBoard';
import { PlayerReveal } from './components/PlayerReveal';

function App() {
  const {
    players,
    selectedCategories,
    phase,
    impostorCount,
    currentRevealIndex,
    categories,
    canStartGame,
    addPlayer,
    removePlayer,
    selectCategory,
    toggleAllCategories,
    setImpostorCount,
    startGame,
    previousReveal,
    nextReveal,
    skipToGame,
    revealImpostors,
    resetGame,
    newGame,
  } = useGame();

  const isSetup = phase === 'setup';
  const isRevealing = phase === 'revealing';
  const isPlaying = phase === 'playing';
  const isFinished = phase === 'finished';

  // Scroll al inicio cuando cambia la fase del juego
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [phase]);

  return (
    <>
      {isRevealing && players.length > 0 ? (
        <div className="bg-base-100 flex min-h-dvh items-center justify-center p-4">
          <PlayerReveal
            player={players[currentRevealIndex]}
            currentIndex={currentRevealIndex}
            totalPlayers={players.length}
            onPrevious={previousReveal}
            onNext={nextReveal}
            onSkip={skipToGame}
          />
        </div>
      ) : (
        <main className="mx-auto min-h-dvh w-full max-w-6xl p-4 pb-8 sm:p-6">
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
                <GameConfig
                  playerCount={players.length}
                  impostorCount={impostorCount}
                  selectedCategoriesCount={selectedCategories.length}
                  canStart={canStartGame}
                  onStartGame={startGame}
                  onImpostorCountChange={setImpostorCount}
                />
              </section>
            </div>
          )}

          {(isPlaying || isFinished) && selectedCategories.length > 0 && (
            <GameBoard
              players={players}
              categories={selectedCategories}
              showRoles={isFinished}
              onRevealImpostors={revealImpostors}
              onNewGame={newGame}
              onResetGame={resetGame}
            />
          )}
        </main>
      )}
    </>
  );
}

export default App;
