
import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar.tsx';
import WesterosMap from './components/WesterosMap.tsx';
import TimelineSlider from './components/TimelineSlider.tsx';
import { AppState, Movement, House } from './types.ts';
import { EPISODES, CHARACTERS, LOCATIONS } from './constants.tsx';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    currentEpisodeIndex: 0,
    seasonFilter: 'ALL',
    selectedCharacterId: null,
    followingCharacterId: null,
    selectedLocationId: null,
    selectedHouse: 'ALL',
    showPaths: true,
    isPlaying: false,
    undeadMode: false,
    simulationMode: false,
    simulatedPositions: {},
    activeTab: 'INFO',
    spoilerFreeMode: false,
    maxWatchedEpisode: 0,
    showHeatmap: false,
    realismMode: false,
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const updateState = (partial: Partial<AppState>) => {
    setState(prev => {
      const newState = { ...prev, ...partial };
      if (newState.currentEpisodeIndex > newState.maxWatchedEpisode) {
        newState.maxWatchedEpisode = newState.currentEpisodeIndex;
      }
      return newState;
    });
  };

  const filteredEpisodes = useMemo(() => {
    if (state.seasonFilter === 'ALL') return EPISODES;
    return EPISODES.filter(ep => ep.season === state.seasonFilter);
  }, [state.seasonFilter]);

  const filteredIndex = useMemo(() => {
    const globalEp = EPISODES[state.currentEpisodeIndex];
    const idx = filteredEpisodes.findIndex(ep => ep === globalEp);
    return idx === -1 ? 0 : idx;
  }, [filteredEpisodes, state.currentEpisodeIndex]);

  const handleTimelineSelect = (newFilteredIdx: number) => {
    const targetEp = filteredEpisodes[newFilteredIdx];
    if (!targetEp) return;
    const globalIdx = EPISODES.indexOf(targetEp);
    
    if (state.spoilerFreeMode && globalIdx > state.maxWatchedEpisode) {
      if (!confirm("Spoiler Alert! You haven't watched this far in the chronicle. Proceed?")) return;
    }
    updateState({ currentEpisodeIndex: globalIdx, isPlaying: false });
  };

  const currentMovements = useMemo(() => {
    const moves: Movement[] = [];
    for (let i = 0; i <= state.currentEpisodeIndex; i++) {
      moves.push(...EPISODES[i].movements);
    }
    return moves;
  }, [state.currentEpisodeIndex]);

  useEffect(() => {
    let timer: number;
    if (state.isPlaying) {
      timer = window.setInterval(() => {
        setState(prev => {
          if (prev.currentEpisodeIndex < EPISODES.length - 1) {
            return { ...prev, currentEpisodeIndex: prev.currentEpisodeIndex + 1 };
          }
          return { ...prev, isPlaying: false };
        });
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [state.isPlaying]);

  return (
    <div className="flex h-screen w-full bg-[#030308] text-gray-100 overflow-hidden font-sans">
      <Sidebar 
        state={state} 
        updateState={updateState} 
        selectedEpisode={EPISODES[state.currentEpisodeIndex]}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      <main className="flex-1 flex flex-col relative h-full">
        <div className="absolute top-4 left-4 z-40 lg:hidden">
          <button onClick={() => setIsSidebarOpen(true)} className="p-3 bg-black/80 backdrop-blur-md rounded-2xl border border-white/10 text-amber-500 shadow-2xl">
            <Menu size={20} />
          </button>
        </div>

        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-center w-full px-4">
           <div className="inline-block bg-black/70 backdrop-blur-3xl px-10 py-4 rounded-[30px] border border-white/10 shadow-2xl">
              <h2 className="text-amber-500 font-serif text-lg md:text-2xl tracking-[0.1em] uppercase mb-0.5">
                 {state.simulationMode ? "What If? Simulator" : EPISODES[state.currentEpisodeIndex].title}
              </h2>
              <div className="flex items-center justify-center gap-3 text-[9px] text-gray-500 font-bold tracking-[0.2em] uppercase">
                {!state.simulationMode && (
                  <><span>Season {EPISODES[state.currentEpisodeIndex].season}</span><span>·</span><span>Episode {EPISODES[state.currentEpisodeIndex].episode}</span></>
                )}
              </div>
           </div>
        </div>

        <div className="flex-1 p-2 md:p-6 lg:p-10 relative flex items-center justify-center">
          <WesterosMap 
            state={state} 
            movements={currentMovements}
            onLocationClick={(id) => updateState({ selectedLocationId: id, activeTab: 'LOCATION' })}
            onCharacterClick={(id) => updateState({ selectedCharacterId: id, activeTab: state.simulationMode ? 'THEORIES' : 'CHARACTERS' })}
          />
        </div>
        
        {!state.simulationMode && (
          <TimelineSlider 
            episodes={filteredEpisodes}
            allEpisodes={EPISODES}
            currentIndex={filteredIndex}
            seasonFilter={state.seasonFilter}
            isPlaying={state.isPlaying}
            onSelect={handleTimelineSelect}
            onTogglePlay={() => updateState({ isPlaying: !state.isPlaying })}
            onSeasonChange={(s) => updateState({ seasonFilter: s, currentEpisodeIndex: EPISODES.findIndex(e => s === 'ALL' || e.season === s) })}
          />
        )}
      </main>
    </div>
  );
};

export default App;
