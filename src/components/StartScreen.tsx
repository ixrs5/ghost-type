import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Trophy, Zap, Volume2, VolumeX } from "lucide-react";
import { useState, useEffect } from "react";
import type { Difficulty, WordDifficulty } from "@/pages/Index";

interface StartScreenProps {
  onStartGame: (difficulty: Difficulty, wordDifficulty: WordDifficulty, customText?: string) => void;
  onShowLeaderboard: () => void;
}

const difficulties: { key: Difficulty; label: string; wpm: number; color: string }[] = [
  { key: "slow", label: "Slow", wpm: 40, color: "text-green-400" },
  { key: "normal", label: "Normal", wpm: 70, color: "text-yellow-400" },
  { key: "fast", label: "Fast", wpm: 100, color: "text-orange-400" },
  { key: "flash", label: "Flash", wpm: 150, color: "text-red-400" },
];

const wordDifficulties: { key: WordDifficulty; label: string; description: string }[] = [
  { key: "easy", label: "Easy", description: "Common words" },
  { key: "medium", label: "Medium", description: "Mixed vocabulary" },
  { key: "hard", label: "Hard", description: "Complex words" },
];

export const StartScreen = ({ onStartGame, onShowLeaderboard }: StartScreenProps) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("normal");
  const [selectedWordDifficulty, setSelectedWordDifficulty] = useState<WordDifficulty>("medium");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [customText, setCustomText] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("typingGameSoundEnabled");
    if (saved !== null) {
      setSoundEnabled(JSON.parse(saved));
    }
  }, []);

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    localStorage.setItem("typingGameSoundEnabled", JSON.stringify(newState));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-orbitron font-black text-neon mb-4 tracking-wider">
            GHOST TYPE
          </h1>
          <p className="text-xl text-muted-foreground">
            Challenge the AI in the ultimate typing speed test
          </p>
        </div>

        {/* Main Menu */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* AI Difficulty Selection */}
          <Card className="card-glow p-6">
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6" />
              AI Difficulty
            </h2>
            <div className="space-y-3">
              {difficulties.map((diff) => (
                <button
                  key={diff.key}
                  onClick={() => setSelectedDifficulty(diff.key)}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                    selectedDifficulty === diff.key
                      ? "border-primary bg-primary/10 shadow-[var(--glow-cyan)]"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">{diff.label}</span>
                    <Badge variant="outline" className={diff.color}>
                      {diff.wpm} WPM
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Word Difficulty Selection */}
          <Card className="card-glow p-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Word Difficulty</h2>
            <div className="space-y-3">
              {wordDifficulties.map((diff) => (
                <button
                  key={diff.key}
                  onClick={() => setSelectedWordDifficulty(diff.key)}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                    selectedWordDifficulty === diff.key
                      ? "border-accent bg-accent/10 shadow-[var(--glow-green)]"
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">{diff.label}</span>
                    <span className="text-sm text-muted-foreground">{diff.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Custom Text Input */}
        <Card className="card-glow p-6 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Custom Text (Optional)</h2>
          <Textarea
            placeholder="Enter your own text to practice typing... (Leave empty to use generated text)"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="min-h-[100px] bg-background border-border/50 focus:border-primary font-mono"
            maxLength={1000}
          />
          <div className="text-right text-sm text-muted-foreground mt-2">
            {customText.length}/1000 characters
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center items-center">
          <Button
            onClick={() => onStartGame(selectedDifficulty, selectedWordDifficulty, customText.trim() || undefined)}
            size="lg"
            className="btn-cyberpunk px-8 py-4 text-lg"
          >
            START CHALLENGE
          </Button>
          
          <Button
            onClick={onShowLeaderboard}
            variant="outline"
            size="lg"
            className="btn-neon"
          >
            <Trophy className="w-5 h-5 mr-2" />
            LEADERBOARD
          </Button>
          
          <Button
            onClick={toggleSound}
            variant="ghost"
            size="lg"
            className="text-muted-foreground hover:text-primary"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </Button>
        </div>

        {/* Info */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          Type the text as fast and accurately as possible to beat the AI opponent
        </div>
      </div>
    </div>
  );
};