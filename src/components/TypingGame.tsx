import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Bot, User } from "lucide-react";
import { generateText } from "@/lib/textGenerator";
import { VirtualKeyboard } from "@/components/VirtualKeyboard";
import type { Difficulty, WordDifficulty, GameResults } from "@/pages/Index";

interface TypingGameProps {
  difficulty: Difficulty;
  wordDifficulty: WordDifficulty;
  customText?: string;
  onGameFinish: (results: GameResults) => void;
  onBackToMenu: () => void;
}

const AI_SPEEDS = {
  slow: 40,
  normal: 70,
  fast: 100,
  flash: 150,
};

export const TypingGame = ({ difficulty, wordDifficulty, customText, onGameFinish, onBackToMenu }: TypingGameProps) => {
  const [text, setText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<number | null>(null);
  const aiIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize text on mount
  useEffect(() => {
    setText(customText || generateText(wordDifficulty));
  }, [wordDifficulty, customText]);

  // Focus input when game starts
  useEffect(() => {
    if (gameStarted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameStarted]);

  // Timer effect
  useEffect(() => {
    if (!gameStarted || gameFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          finishGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameFinished]);

  // AI typing simulation
  useEffect(() => {
    if (!gameStarted || gameFinished) return;

    const aiSpeed = AI_SPEEDS[difficulty];
    const wordsPerSecond = aiSpeed / 60;
    const charactersPerSecond = wordsPerSecond * 5; // Average word length
    const intervalMs = 1000 / charactersPerSecond;

    aiIntervalRef.current = setInterval(() => {
      setAiProgress((prev) => {
        const newProgress = Math.min(prev + (100 / text.length), 100);
        if (newProgress >= 100 && !gameFinished) {
          finishGame();
        }
        return newProgress;
      });
    }, intervalMs);

    return () => {
      if (aiIntervalRef.current) {
        clearInterval(aiIntervalRef.current);
      }
    };
  }, [gameStarted, gameFinished, difficulty, text.length]);

  // Calculate stats
  useEffect(() => {
    if (!gameStarted || !startTimeRef.current) return;

    const elapsed = (Date.now() - startTimeRef.current) / 1000 / 60; // minutes
    const wordsTyped = userInput.trim().split(/\s+/).length;
    const currentWpm = elapsed > 0 ? Math.round(wordsTyped / elapsed) : 0;
    
    let correctChars = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === text[i]) {
        correctChars++;
      }
    }
    
    const currentAccuracy = userInput.length > 0 
      ? Math.round((correctChars / userInput.length) * 100)
      : 100;

    setWpm(currentWpm);
    setAccuracy(currentAccuracy);

    // Check if user finished
    if (userInput.length >= text.length) {
      finishGame();
    }
  }, [userInput, gameStarted, text]);

  const startGame = () => {
    setGameStarted(true);
    startTimeRef.current = Date.now();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const finishGame = useCallback(() => {
    setGameFinished(true);
    setGameStarted(false);
    
    if (aiIntervalRef.current) {
      clearInterval(aiIntervalRef.current);
    }

    const userProgress = (userInput.length / text.length) * 100;
    const userWon = userProgress > aiProgress;
    
    const results: GameResults = {
      wpm,
      accuracy,
      timeSpent: 60 - timeLeft,
      userWon,
      difficulty,
      wordDifficulty,
    };

    // Save to leaderboard
    const leaderboard = JSON.parse(localStorage.getItem("typingGameLeaderboard") || "[]");
    leaderboard.push({
      ...results,
      date: new Date().toISOString(),
    });
    leaderboard.sort((a: any, b: any) => b.wpm - a.wpm);
    localStorage.setItem("typingGameLeaderboard", JSON.stringify(leaderboard.slice(0, 10)));

    setTimeout(() => onGameFinish(results), 1000);
  }, [userInput.length, text.length, aiProgress, wpm, accuracy, timeLeft, difficulty, wordDifficulty, onGameFinish]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!gameStarted || gameFinished) return;
    setUserInput(e.target.value);
  };

  const renderText = () => {
    return text.split("").map((char, index) => {
      let className = "text-muted-foreground";
      
      if (index < userInput.length) {
        if (userInput[index] === char) {
          className = "text-correct";
        } else {
          className = "text-error bg-destructive/20";
        }
      } else if (index === userInput.length) {
        className = "typing-cursor bg-primary/20";
      }
      
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  const userProgress = (userInput.length / text.length) * 100;

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Button onClick={onBackToMenu} variant="ghost" className="text-muted-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Menu
        </Button>
        
        <div className="flex gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">{timeLeft}s</div>
            <div className="text-sm text-muted-foreground">Time Left</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">{wpm}</div>
            <div className="text-sm text-muted-foreground">WPM</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-secondary">{accuracy}%</div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </div>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="card-cyberpunk p-4">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-5 h-5 text-primary" />
            <span className="font-bold text-primary">You</span>
            <span className="text-sm text-muted-foreground ml-auto">{userProgress.toFixed(1)}%</span>
          </div>
          <Progress value={userProgress} className="h-3" />
        </Card>
        
        <Card className="card-cyberpunk p-4">
          <div className="flex items-center gap-2 mb-2">
            <Bot className="w-5 h-5 text-destructive" />
            <span className="font-bold text-destructive">AI ({difficulty.toUpperCase()})</span>
            <span className="text-sm text-muted-foreground ml-auto">{aiProgress.toFixed(1)}%</span>
          </div>
          <Progress value={aiProgress} className="h-3" />
        </Card>
      </div>

      {/* Text Display */}
      <Card className="card-glow p-6 mb-6">
        <div className="text-lg leading-relaxed font-mono select-none">
          {renderText()}
        </div>
      </Card>

      {/* Input */}
      <div className="max-w-2xl mx-auto">
        {!gameStarted && !gameFinished && (
          <div className="text-center">
            <Button onClick={startGame} size="lg" className="btn-cyberpunk mb-4">
              START TYPING
            </Button>
            <p className="text-muted-foreground">Click start and begin typing the text above</p>
          </div>
        )}
        
        {gameStarted && (
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            className="w-full p-4 bg-input border border-border rounded-lg text-lg font-mono focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Start typing..."
            disabled={gameFinished}
          />
        )}
        
        {gameFinished && (
          <div className="text-center">
            <div className="text-xl mb-4">
              {userProgress > aiProgress ? (
                <span className="text-accent font-bold">🎉 You Won!</span>
              ) : (
                <span className="text-destructive font-bold">🤖 AI Won!</span>
              )}
            </div>
            <p className="text-muted-foreground">Calculating final results...</p>
          </div>
        )}
      </div>

      {/* Virtual Keyboard */}
      {gameStarted && (
        <div className="mt-8">
          <VirtualKeyboard className="opacity-60" />
        </div>
      )}
    </div>
  );
};