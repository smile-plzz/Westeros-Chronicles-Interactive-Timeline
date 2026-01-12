
import React from 'react';
import { Episode } from '../types';
import { Play, Pause, SkipBack, SkipForward, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

interface TimelineProps {
  episodes: Episode[];
  allEpisodes: Episode[];
  currentIndex: number;
  seasonFilter: number | 'ALL';
  isPlaying: boolean;
  onSelect: (index: number) => void;
  onTogglePlay: () => void;
  onSeasonChange: (season: number | 'ALL') => void;
}

const TimelineSlider: React.FC<TimelineProps> = ({ 
  episodes, 
  currentIndex, 
  seasonFilter, 
  isPlaying, 
  onSelect, 
  onTogglePlay, 
  onSeasonChange,
  allEpisodes
}) => {
  const currentEp = episodes[currentIndex] || allEpisodes[0];
  const seasons = Array.from(new Set(allEpisodes.map(e => e.season))).sort((a, b) => a - b);

  return (
    <div className="w-full bg-black/90 backdrop-blur-3xl border-t border-white/5 p-6 md:p-8 sticky bottom-0 z-50 shadow-[0_-20px_100px_rgba(0,0,0,0.95)]">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Controls: Era Selection & Master Indicator */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar max-w-full">
            <div className="flex items-center gap-2 text-amber-500/50 mr-3 shrink-0">
              <Layers size={14} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Select Era:</span>
            </div>
            <button
              onClick={() => onSeasonChange('ALL')}
              className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all shrink-0 border ${seasonFilter === 'ALL' ? 'bg-amber-600/20 border-amber-500 text-amber-500 shadow-[0_0_20px_rgba(217,119,6,0.1)]' : 'bg-white/5 border-white/5 text-gray-500 hover:text-gray-300'}`}
            >
              All Seasons
            </button>
            {seasons.map(s => (
              <button
                key={s}
                onClick={() => onSeasonChange(s)}
                className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all shrink-0 border ${seasonFilter === s ? 'bg-amber-600 border-amber-500 text-white' : 'bg-white/5 border-white/5 text-gray-500 hover:text-gray-300'}`}
              >
                Season {s}
              </button>
            ))}
          </div>

          <div className="hidden md:flex flex-col items-end gap-1 shrink-0">
            <span className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.2em]">Master Chronicle</span>
            <span className="text-xs font-mono font-bold bg-white/5 px-4 py-1.5 rounded-md border border-white/10 text-amber-500/90">
              {currentIndex + 1} / {episodes.length}
            </span>
          </div>
        </div>

        {/* Main Display: Playback & Title */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="flex items-center gap-6 md:gap-8 shrink-0">
            <button 
              disabled={currentIndex === 0}
              onClick={() => onSelect(currentIndex - 1)} 
              className="text-gray-600 hover:text-amber-500 transition-colors disabled:opacity-5 active:scale-90"
            >
              <SkipBack size={24} />
            </button>
            <button 
              onClick={onTogglePlay} 
              className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center text-white hover:bg-amber-500 transition-all active:scale-95 shadow-[0_0_40px_rgba(217,119,6,0.25)] hover:shadow-[0_0_50px_rgba(217,119,6,0.4)]"
            >
              {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
            </button>
            <button 
              disabled={currentIndex === episodes.length - 1}
              onClick={() => onSelect(currentIndex + 1)} 
              className="text-gray-600 hover:text-amber-500 transition-colors disabled:opacity-5 active:scale-90"
            >
              <SkipForward size={24} />
            </button>
          </div>

          <div className="flex-1 text-center lg:text-left min-w-0">
            <motion.div 
              key={currentEp.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col"
            >
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                <span className="text-[10px] text-amber-500/70 font-black tracking-[0.4em] uppercase">Season {currentEp.season} · Episode {currentEp.episode}</span>
                {currentEp.events.length > 0 && <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]" />}
              </div>
              <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-tight truncate">
                {currentEp.title}
              </h2>
            </motion.div>
          </div>
        </div>

        {/* Progress Slider (Full Width) */}
        <div className="relative h-10 flex items-center group pt-4">
          <div className="absolute inset-0 h-[2px] bg-white/5 rounded-full self-center" />
          
          <div className="absolute inset-0 pointer-events-none flex justify-between items-center px-0.5">
            {episodes.map((ep, idx) => {
              const isMajor = ep.events.some(e => e.type === 'BATTLE' || e.type === 'DEATH');
              const isCurrent = idx === currentIndex;
              return (
                <div 
                  key={idx} 
                  className={`relative z-10 transition-all duration-300 rounded-full
                    ${isCurrent ? 'w-1 h-6 bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,1)]' : 
                      (isMajor ? 'w-0.5 h-3 bg-red-900/40' : 'w-px h-1.5 bg-white/10')}
                  `}
                />
              );
            })}
          </div>

          <input
            type="range"
            min="0"
            max={Math.max(0, episodes.length - 1)}
            value={currentIndex}
            onChange={(e) => onSelect(parseInt(e.target.value))}
            className="absolute inset-0 w-full opacity-0 cursor-pointer z-20 h-full"
          />
          
          <div 
            className="absolute left-0 h-[2px] bg-amber-500 rounded-full pointer-events-none transition-all duration-300 shadow-[0_0_10px_rgba(245,158,11,0.3)]" 
            style={{ width: `${(currentIndex / (episodes.length - 1 || 1)) * 100}%` }} 
          />
        </div>
      </div>
    </div>
  );
};

export default TimelineSlider;
