import { useState } from "react";
import { TypingGame } from "@/components/TypingGame";
import { StartScreen } from "@/components/StartScreen";
import { ResultsScreen } from "@/components/ResultsScreen";
import { Leaderboard } from "@/components/Leaderboard";

export type GameState = "start" | "playing" | "results" | "leaderboard";
export type Difficulty = "slow" | "normal" | "fast" | "flash";
export type WordDifficulty = "easy" | "medium" | "hard";

export interface GameResults {
  wpm: number;
  accuracy: number;
  timeSpent: number;
  userWon: boolean;
  difficulty: Difficulty;
  wordDifficulty: WordDifficulty;
}

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("start");
  const [difficulty, setDifficulty] = useState<Difficulty>("normal");
  const [wordDifficulty, setWordDifficulty] = useState<WordDifficulty>("medium");
  const [customText, setCustomText] = useState<string>("");
  const [gameResults, setGameResults] = useState<GameResults | null>(null);

  const startGame = (selectedDifficulty: Difficulty, selectedWordDifficulty: WordDifficulty, text?: string) => {
    setDifficulty(selectedDifficulty);
    setWordDifficulty(selectedWordDifficulty);
    if (text) setCustomText(text);
    setGameState("playing");
  };

  const finishGame = (results: GameResults) => {
    setGameResults(results);
    setGameState("results");
  };

  const resetGame = () => {
    setGameState("start");
    setGameResults(null);
    setCustomText("");
  };

  const showLeaderboard = () => {
    setGameState("leaderboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1">
        {gameState === "start" && (
          <StartScreen 
            onStartGame={startGame} 
            onShowLeaderboard={showLeaderboard}
          />
        )}
        
        {gameState === "playing" && (
          <TypingGame 
            difficulty={difficulty}
            wordDifficulty={wordDifficulty}
            customText={customText}
            onGameFinish={finishGame}
            onBackToMenu={resetGame}
          />
        )}
        
        {gameState === "results" && gameResults && (
          <ResultsScreen 
            results={gameResults}
            onPlayAgain={resetGame}
            onShowLeaderboard={showLeaderboard}
          />
        )}
        
        {gameState === "leaderboard" && (
          <Leaderboard onBackToMenu={resetGame} />
        )}
      </div>
      
      <footer className="bg-card/20 border-t border-primary/20 p-4">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground text-sm">
            Developed by <span className="text-primary font-semibold">Rejoan Siyam</span> - Full Stack Developer
          </p>
          <p className="text-muted-foreground text-xs mt-1">
            <span className="text-accent">RST</span> © 2024 | <a href="/contact" className="text-primary hover:text-accent transition-colors">Contact</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;