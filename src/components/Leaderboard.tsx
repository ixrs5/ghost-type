import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, Medal, Award, Trash2 } from "lucide-react";
import type { GameResults } from "@/pages/Index";

interface LeaderboardEntry extends GameResults {
  date: string;
}

interface LeaderboardProps {
  onBackToMenu: () => void;
}

export const Leaderboard = ({ onBackToMenu }: LeaderboardProps) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("typingGameLeaderboard");
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  const clearLeaderboard = () => {
    localStorage.removeItem("typingGameLeaderboard");
    setEntries([]);
  };

  const getPositionIcon = (index: number) => {
    switch (index) {
      case 0: return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 1: return <Medal className="w-6 h-6 text-gray-400" />;
      case 2: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <span className="w-6 h-6 flex items-center justify-center text-muted-foreground font-bold">{index + 1}</span>;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "slow": return "text-green-400";
      case "normal": return "text-yellow-400";
      case "fast": return "text-orange-400";
      case "flash": return "text-red-400";
      default: return "text-muted-foreground";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Button onClick={onBackToMenu} variant="ghost" className="text-muted-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Menu
          </Button>
          
          {entries.length > 0 && (
            <Button onClick={clearLeaderboard} variant="outline" className="btn-danger">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-orbitron font-black text-neon mb-4">
            LEADERBOARD
          </h1>
          <p className="text-xl text-muted-foreground">
            Top typing speeds and accuracy records
          </p>
        </div>

        {/* Leaderboard */}
        {entries.length === 0 ? (
          <Card className="card-glow p-12 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold text-muted-foreground mb-4">No Records Yet</h2>
            <p className="text-muted-foreground">
              Complete your first typing challenge to appear on the leaderboard!
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {entries.map((entry, index) => (
              <Card key={index} className={`p-6 transition-all duration-300 hover:scale-[1.02] ${
                index === 0 ? "card-glow border-yellow-400/50" :
                index === 1 ? "card-glow border-gray-400/50" :
                index === 2 ? "card-glow border-amber-600/50" :
                "card-cyberpunk"
              }`}>
                <div className="flex items-center gap-4">
                  {/* Position */}
                  <div className="flex-shrink-0">
                    {getPositionIcon(index)}
                  </div>

                  {/* Stats */}
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-primary">{entry.wpm}</div>
                      <div className="text-xs text-muted-foreground">WPM</div>
                    </div>
                    
                    <div>
                      <div className="text-2xl font-bold text-accent">{entry.accuracy}%</div>
                      <div className="text-xs text-muted-foreground">Accuracy</div>
                    </div>
                    
                    <div>
                      <div className="text-lg font-bold text-secondary">{entry.timeSpent}s</div>
                      <div className="text-xs text-muted-foreground">Time Used</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex flex-col gap-1">
                        <Badge variant="outline" className={getDifficultyColor(entry.difficulty)}>
                          {entry.difficulty.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">
                          {entry.wordDifficulty}
                        </Badge>
                        {entry.userWon && (
                          <Badge variant="outline" className="text-accent">
                            WON
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="text-xs text-muted-foreground text-right hidden md:block">
                    {formatDate(entry.date)}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Stats Summary */}
        {entries.length > 0 && (
          <Card className="card-cyberpunk p-6 mt-8">
            <h2 className="text-xl font-bold text-primary mb-4">Summary Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">
                  {Math.max(...entries.map(e => e.wpm))}
                </div>
                <div className="text-sm text-muted-foreground">Best WPM</div>
              </div>
              
              <div>
                <div className="text-2xl font-bold text-accent">
                  {Math.max(...entries.map(e => e.accuracy))}%
                </div>
                <div className="text-sm text-muted-foreground">Best Accuracy</div>
              </div>
              
              <div>
                <div className="text-2xl font-bold text-secondary">
                  {Math.round(entries.reduce((sum, e) => sum + e.wpm, 0) / entries.length)}
                </div>
                <div className="text-sm text-muted-foreground">Avg WPM</div>
              </div>
              
              <div>
                <div className="text-2xl font-bold text-yellow-400">
                  {entries.filter(e => e.userWon).length}
                </div>
                <div className="text-sm text-muted-foreground">Victories</div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};