import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, RefreshCw, BarChart3, Target, Clock, Zap } from "lucide-react";
import type { GameResults } from "@/pages/Index";

interface ResultsScreenProps {
  results: GameResults;
  onPlayAgain: () => void;
  onShowLeaderboard: () => void;
}

export const ResultsScreen = ({ results, onPlayAgain, onShowLeaderboard }: ResultsScreenProps) => {
  const getWpmRating = (wpm: number) => {
    if (wpm >= 80) return { label: "Expert", color: "text-accent", icon: "🚀" };
    if (wpm >= 60) return { label: "Advanced", color: "text-primary", icon: "⚡" };
    if (wpm >= 40) return { label: "Good", color: "text-yellow-400", icon: "👍" };
    if (wpm >= 20) return { label: "Beginner", color: "text-orange-400", icon: "📝" };
    return { label: "Practice More", color: "text-muted-foreground", icon: "🐌" };
  };

  const getAccuracyRating = (accuracy: number) => {
    if (accuracy >= 95) return { label: "Perfect", color: "text-accent" };
    if (accuracy >= 85) return { label: "Excellent", color: "text-primary" };
    if (accuracy >= 75) return { label: "Good", color: "text-yellow-400" };
    if (accuracy >= 60) return { label: "Fair", color: "text-orange-400" };
    return { label: "Needs Work", color: "text-destructive" };
  };

  const wpmRating = getWpmRating(results.wpm);
  const accuracyRating = getAccuracyRating(results.accuracy);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">
            {results.userWon ? "🎉" : "🤖"}
          </div>
          <h1 className="text-4xl font-orbitron font-black mb-2">
            {results.userWon ? (
              <span className="text-accent">VICTORY!</span>
            ) : (
              <span className="text-destructive">AI WINS</span>
            )}
          </h1>
          <p className="text-xl text-muted-foreground">
            {results.userWon 
              ? "You defeated the AI opponent!" 
              : "The AI was faster this time. Try again!"
            }
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-glow p-6 text-center">
            <div className="text-3xl mb-2">{wpmRating.icon}</div>
            <div className="text-3xl font-bold text-primary mb-1">{results.wpm}</div>
            <div className="text-sm text-muted-foreground mb-2">Words Per Minute</div>
            <Badge variant="outline" className={wpmRating.color}>
              {wpmRating.label}
            </Badge>
          </Card>

          <Card className="card-glow p-6 text-center">
            <Target className="w-8 h-8 mx-auto mb-2 text-accent" />
            <div className="text-3xl font-bold text-accent mb-1">{results.accuracy}%</div>
            <div className="text-sm text-muted-foreground mb-2">Accuracy</div>
            <Badge variant="outline" className={accuracyRating.color}>
              {accuracyRating.label}
            </Badge>
          </Card>

          <Card className="card-glow p-6 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-secondary" />
            <div className="text-3xl font-bold text-secondary mb-1">{results.timeSpent}s</div>
            <div className="text-sm text-muted-foreground mb-2">Time Used</div>
            <Badge variant="outline">
              {60 - results.timeSpent}s remaining
            </Badge>
          </Card>

          <Card className="card-glow p-6 text-center">
            <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
            <div className="text-2xl font-bold text-yellow-400 mb-1">
              {results.difficulty.toUpperCase()}
            </div>
            <div className="text-sm text-muted-foreground mb-2">AI Difficulty</div>
            <Badge variant="outline">
              {results.wordDifficulty} words
            </Badge>
          </Card>
        </div>

        {/* Performance Analysis */}
        <Card className="card-cyberpunk p-6 mb-8">
          <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Performance Analysis
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Speed Analysis</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Your WPM:</span>
                  <span className="font-mono">{results.wpm}</span>
                </div>
                <div className="flex justify-between">
                  <span>AI Target WPM:</span>
                  <span className="font-mono">
                    {results.difficulty === "slow" ? 40 :
                     results.difficulty === "normal" ? 70 :
                     results.difficulty === "fast" ? 100 : 150}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Characters/Min:</span>
                  <span className="font-mono">{results.wpm * 5}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Accuracy Analysis</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Accuracy:</span>
                  <span className="font-mono">{results.accuracy}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Error Rate:</span>
                  <span className="font-mono">{100 - results.accuracy}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Grade:</span>
                  <span className={`font-mono ${accuracyRating.color}`}>
                    {accuracyRating.label}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={onPlayAgain} size="lg" className="btn-cyberpunk">
            <RefreshCw className="w-5 h-5 mr-2" />
            PLAY AGAIN
          </Button>
          
          <Button onClick={onShowLeaderboard} variant="outline" size="lg" className="btn-neon">
            <Trophy className="w-5 h-5 mr-2" />
            LEADERBOARD
          </Button>
        </div>

        {/* Tips */}
        <div className="text-center mt-8">
          <div className="text-sm text-muted-foreground">
            {results.wpm < 40 && "💡 Tip: Focus on accuracy first, speed will follow naturally"}
            {results.wpm >= 40 && results.wpm < 60 && "💡 Tip: Practice touch typing to improve speed"}
            {results.wpm >= 60 && results.accuracy < 90 && "💡 Tip: Slow down slightly to improve accuracy"}
            {results.wpm >= 60 && results.accuracy >= 90 && "💡 Excellent work! You're becoming a typing master!"}
          </div>
        </div>
      </div>
    </div>
  );
};