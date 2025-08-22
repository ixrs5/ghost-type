import { useState, useEffect } from "react";

interface VirtualKeyboardProps {
  className?: string;
}

const KEYBOARD_LAYOUT = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

const SPECIAL_KEYS = [
  { key: ' ', label: 'SPACE', width: 'w-32' },
  { key: 'Shift', label: 'SHIFT', width: 'w-20' },
  { key: 'Enter', label: 'ENTER', width: 'w-20' }
];

export const VirtualKeyboard = ({ className = "" }: VirtualKeyboardProps) => {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      setPressedKeys(prev => new Set(prev).add(key));
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      setPressedKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const renderKey = (key: string, label?: string, width: string = 'w-8') => {
    const isPressed = pressedKeys.has(key.toLowerCase());
    
    return (
      <div
        key={key}
        className={`
          ${width} h-8 border border-border/50 rounded 
          flex items-center justify-center text-xs font-mono
          transition-all duration-75
          ${isPressed 
            ? 'bg-primary/30 border-primary shadow-[var(--glow-cyan)] text-primary' 
            : 'bg-card/30 text-muted-foreground hover:border-primary/30'
          }
        `}
      >
        {label || key.toUpperCase()}
      </div>
    );
  };

  return (
    <div className={`select-none ${className}`}>
      <div className="space-y-2">
        {/* Number row */}
        <div className="flex justify-center gap-1">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map(key => 
            renderKey(key)
          )}
        </div>
        
        {/* Letter rows */}
        {KEYBOARD_LAYOUT.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1">
            {row.map(key => renderKey(key))}
          </div>
        ))}
        
        {/* Special keys */}
        <div className="flex justify-center gap-2">
          {SPECIAL_KEYS.map(({ key, label, width }) => 
            renderKey(key, label, width)
          )}
        </div>
      </div>
    </div>
  );
};