import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { audioService } from '../../utils/audioHelper';
import { useApp } from '../../context/AppContext';

interface SoundButtonProps {
  text: string;
  className?: string;
  iconSize?: number;
  label?: string;
}

export const SoundButton: React.FC<SoundButtonProps> = ({
  text,
  className = '',
  iconSize = 18,
  label
}) => {
  const { profile } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
    audioService.speak(text, profile.settings.audioSpeed || 1.0).finally(() => {
      setIsPlaying(false);
    });
  };

  return (
    <button
      onClick={handlePlay}
      title={`Nghe phát âm: ${text}`}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
        isPlaying
          ? 'bg-rose-500 text-white scale-105 shadow-sm'
          : 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/50'
      } ${className}`}
    >
      <Volume2 size={iconSize} className={isPlaying ? 'animate-pulse' : ''} />
      {label && <span>{label}</span>}
    </button>
  );
};
