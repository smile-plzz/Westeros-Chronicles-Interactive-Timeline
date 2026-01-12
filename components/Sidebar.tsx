
import React, { useState, useMemo } from 'react';
import { House, AppState, Character, Location, Event, Movement } from '../types';
import { CHARACTERS, LOCATIONS, EPISODES } from '../constants';
import { Search, X, ChevronRight, History, User, MapPin, Landmark, ScrollText, Sword, HeartOff, Zap, FlaskConical, Eye, Map as MapIcon, Target, Skull, Crosshair, BarChart3, Trophy, Lock, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  state: AppState;
  updateState: (partial: Partial<AppState>) => void;
  selectedEpisode: any;
  isOpen: boolean;
  onToggle: () => void;
  charactersAtLocation?: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ state, updateState, selectedEpisode, isOpen, onToggle, charactersAtLocation = [] }) => {
  const [search, setSearch] = useState('');

  const filteredCharacters = CHARACTERS.filter(c => {
    const matchesHouse = state.selectedHouse === 'ALL' || c.house === state.selectedHouse;
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    return matchesHouse && matchesSearch;
  });

  const selectedLoc = state.selectedLocationId ? LOCATIONS[state.selectedLocationId] : null;
  const selectedChar = state.selectedCharacterId ? CHARACTERS.find(c => c.id === state.selectedCharacterId) : null;

  const getCharacterStatus = (charId: string) => {
    for (let i = 0; i <= state.currentEpisodeIndex; i++) {
      const death = EPISODES[i].movements.find(m => m.characterId === charId && m.isDead);
      if (death) return 'Dead';
    }
    return 'Alive';
  };

  const realmStats = useMemo(() => {
    let aliveCount = 0;
    let deadCount = 0;
    CHARACTERS.forEach(c => {
      if (getCharacterStatus(c.id) === 'Alive') aliveCount++;
      else deadCount++;
    });
    return { aliveCount, deadCount };
  }, [state.currentEpisodeIndex]);

  // Calculate distances for leaderboard
  const leaderBoard = useMemo(() => {
    const distances: Record<string, number> = {};
    for (let i = 0; i <= state.currentEpisodeIndex; i++) {
      EPISODES[i].movements.forEach(m => {
        const from = LOCATIONS[m.fromLocationId];
        const to = LOCATIONS[m.toLocationId];
        if (from && to) {
          const d = Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));
          distances[m.characterId] = (distances[m.characterId] || 0) + d;
        }
      });
    }
    return Object.entries(distances)
      .map(([id, dist]) => ({ id, dist: Math.round(dist * 10) }))
      .sort((a, b) => b.dist - a.dist);
  }, [state.currentEpisodeIndex]);

  return (
    <>
      <AnimatePresence>{isOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onToggle} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden" />}</AnimatePresence>

      <aside className={`fixed inset-y-0 left-0 w-85 bg-[#05060b] border-r border-white/5 z-50 flex flex-col transition-all duration-500 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:static lg:translate-x-0`}>
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-black to-slate-950">
          <div><h1 className="text-xl font-serif text-amber-500 tracking-tighter leading-none mb-1">CHRONICLES</h1><p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.4em]">Interactive Universe Map</p></div>
          <button onClick={onToggle} className="lg:hidden text-gray-500 p-2"><X size={20} /></button>
        </div>

        <div className="flex bg-black/40 border-b border-white/5 overflow-x-auto no-scrollbar">
          {[
            { id: 'INFO', icon: <History size={14} />, label: 'Story' }, 
            { id: 'LOCATION', icon: <MapPin size={14} />, label: 'Atlas' }, 
            { id: 'CHARACTERS', icon: <User size={14} />, label: 'Cast' }, 
            { id: 'STATS', icon: <Trophy size={14} />, label: 'Stats' },
            { id: 'THEORIES', icon: <FlaskConical size={14} />, label: 'What If' }
          ].map(tab => (
            <button key={tab.id} onClick={() => updateState({ activeTab: tab.id as any })} className={`flex-1 flex flex-col items-center py-3 min-w-[64px] gap-1 transition-colors relative ${state.activeTab === tab.id ? 'text-amber-500' : 'text-gray-600 hover:text-gray-300'}`}>
              {tab.icon}<span className="text-[9px] font-bold uppercase tracking-widest">{tab.label}</span>
              {state.activeTab === tab.id && <motion.div layoutId="activeTab" className="absolute bottom-0 left-2 right-2 h-0.5 bg-amber-500" />}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8 bg-[#070812]">
          {state.activeTab === 'INFO' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <section><span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Season {selectedEpisode.season} Episode {selectedEpisode.episode}</span><h4 className="text-2xl font-serif text-white">"{selectedEpisode.title}"</h4></section>
              
              <section className="p-4 bg-amber-950/20 border border-amber-900/30 rounded-xl">
                 <div className="flex items-center gap-2 mb-3"><BarChart3 size={14} className="text-amber-600" /><h3 className="text-[10px] font-bold uppercase tracking-widest text-amber-500">Realm Status</h3></div>
                 <div className="flex justify-between items-center gap-4">
                    <div className="flex-1 text-center"><p className="text-[8px] uppercase text-gray-500 mb-1 font-bold">Survivors</p><p className="text-xl font-serif text-green-500">{realmStats.aliveCount}</p></div>
                    <div className="w-px h-8 bg-white/5"></div>
                    <div className="flex-1 text-center"><p className="text-[8px] uppercase text-gray-500 mb-1 font-bold">Deceased</p><p className="text-xl font-serif text-red-700">{realmStats.deadCount}</p></div>
                 </div>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-2 text-gray-500 border-b border-white/5 pb-2"><Sword size={14} className="text-amber-700" /><h3 className="text-[10px] font-bold uppercase tracking-widest">Notable Events</h3></div>
                {selectedEpisode.events.map((event: Event) => (
                  <div key={event.id} className="p-4 bg-white/5 rounded-xl border border-white/5 shadow-lg group hover:border-amber-500/30 transition-all cursor-help">
                    <div className="flex justify-between items-start mb-1">
                      <h5 className="text-sm font-bold text-white">{event.title}</h5>
                      <span className="text-[10px] px-1.5 py-0.5 bg-amber-500/10 text-amber-500 rounded font-bold">{event.type}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed">{event.description}</p>
                  </div>
                ))}
              </section>

              <section className="space-y-4">
                 <div className="flex items-center gap-2 mb-4 text-gray-500"><Eye size={14} /><h3 className="text-[10px] font-bold uppercase tracking-widest">Map Overlays</h3></div>
                 <div className="space-y-3 px-1">
                   <label className="flex items-center justify-between cursor-pointer"><span className="text-xs text-gray-500">Trace Paths</span><input type="checkbox" checked={state.showPaths} onChange={e => updateState({ showPaths: e.target.checked })} className="accent-amber-600" /></label>
                   <label className="flex items-center justify-between cursor-pointer"><span className="text-xs text-gray-500">Battle Heatmap</span><input type="checkbox" checked={state.showHeatmap} onChange={e => updateState({ showHeatmap: e.target.checked })} className="accent-orange-600" /></label>
                   <label className="flex items-center justify-between cursor-pointer"><span className="text-xs text-gray-500">Spoiler-Free</span><input type="checkbox" checked={state.spoilerFreeMode} onChange={e => updateState({ spoilerFreeMode: e.target.checked })} className="accent-purple-600" /></label>
                   <label className="flex items-center justify-between cursor-pointer"><span className="text-xs text-gray-500">Winter Horizon</span><input type="checkbox" checked={state.undeadMode} onChange={e => updateState({ undeadMode: e.target.checked })} className="accent-blue-600" /></label>
                 </div>
              </section>
            </motion.div>
          )}

          {state.activeTab === 'CHARACTERS' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {selectedChar ? (
                <div className="p-5 bg-gradient-to-br from-slate-900/40 to-black rounded-xl border border-white/5">
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`text-4xl p-2 bg-black/60 rounded-full ${getCharacterStatus(selectedChar.id) === 'Dead' ? 'grayscale opacity-50' : ''}`}>
                      {(() => {
                        const currentEra = selectedChar.eras?.filter(e => e.atEpisode <= state.currentEpisodeIndex).pop();
                        return currentEra ? currentEra.icon : selectedChar.icon;
                      })()}
                    </span>
                    <div className="flex-1">
                      <h2 className="text-xl font-serif text-white">{selectedChar.name}</h2>
                      <div className="flex items-center gap-2">
                        <p className="text-[10px] uppercase font-bold text-amber-700 tracking-widest">{selectedChar.house}</p>
                        <span className={`text-[8px] px-1.5 py-0.5 rounded font-black uppercase ${getCharacterStatus(selectedChar.id) === 'Dead' ? 'bg-red-950 text-red-500' : 'bg-green-950 text-green-500'}`}>
                          {getCharacterStatus(selectedChar.id)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mb-6 italic leading-relaxed">{selectedChar.bio}</p>
                  
                  <div className="flex flex-col gap-2">
                    <button onClick={() => updateState({ followingCharacterId: state.followingCharacterId === selectedChar.id ? null : selectedChar.id })} className={`w-full py-2 border rounded-lg text-[10px] uppercase font-bold flex items-center justify-center gap-2 transition-all ${state.followingCharacterId === selectedChar.id ? 'bg-red-600 border-red-500 text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}><Crosshair size={12} /> {state.followingCharacterId === selectedChar.id ? 'Unlocked' : 'Lock Camera'}</button>
                    <button onClick={() => updateState({ selectedCharacterId: null, followingCharacterId: null })} className="w-full py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] uppercase font-bold text-gray-500 hover:text-gray-300 transition-colors">Back to Cast</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="relative mb-6"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={14} /><input type="text" placeholder="Search characters..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-xs text-white outline-none focus:border-amber-500/30" /></div>
                  <div className="space-y-1">{filteredCharacters.map(char => {
                    const status = getCharacterStatus(char.id);
                    return (
                      <button key={char.id} onClick={() => updateState({ selectedCharacterId: char.id, followingCharacterId: char.id })} className={`w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-all group ${state.selectedCharacterId === char.id ? 'bg-amber-700 text-white' : 'text-gray-500'}`}>
                        <div className="flex items-center gap-3"><span className={`text-lg ${status === 'Dead' ? 'grayscale opacity-30' : ''}`}>{char.icon}</span><div className="text-left"><p className={`text-xs font-bold ${status === 'Dead' ? 'line-through opacity-50' : 'group-hover:text-white'}`}>{char.name}</p><p className="text-[8px] uppercase tracking-tighter opacity-40">{char.house}</p></div></div>
                        {status === 'Dead' ? <Skull size={12} className="text-red-900" /> : <ChevronRight size={14} />}
                      </button>
                    );
                  })}</div>
                </>
              )}
            </motion.div>
          )}

          {state.activeTab === 'STATS' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-gray-500 border-b border-white/5 pb-2"><Trophy size={14} className="text-amber-500" /><h3 className="text-[10px] font-bold uppercase tracking-widest">Travel Leaderboard</h3></div>
                <p className="text-[10px] text-gray-500 italic">Total distance covered (leagues) based on known coordinates.</p>
                <div className="space-y-2">
                  {leaderBoard.slice(0, 8).map((entry, idx) => {
                    const char = CHARACTERS.find(c => c.id === entry.id);
                    return (
                      <div key={entry.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-bold text-gray-700 w-4">{idx + 1}</span>
                          <span className="text-lg">{char?.icon}</span>
                          <span className="text-xs font-bold text-white">{char?.name}</span>
                        </div>
                        <span className="text-xs font-mono text-amber-500">{entry.dist} L</span>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section className="p-4 bg-purple-950/20 border border-purple-900/30 rounded-xl">
                 <div className="flex items-center gap-2 mb-3"><Zap size={14} className="text-purple-600" /><h3 className="text-[10px] font-bold uppercase tracking-widest text-purple-500">Realism Mode</h3></div>
                 <div className="space-y-3">
                    <p className="text-[11px] text-gray-400">Calculates travel times based on medieval speed. Highlights suspicious fast-travel moments.</p>
                    <label className="flex items-center justify-between cursor-pointer"><span className="text-xs text-gray-300">Enable Tracker</span><input type="checkbox" checked={state.realismMode} onChange={e => updateState({ realismMode: e.target.checked })} className="accent-purple-600" /></label>
                 </div>
              </section>
            </motion.div>
          )}

          {state.activeTab === 'LOCATION' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {selectedLoc ? (
                <div className="space-y-6">
                  <header className="p-5 bg-gradient-to-br from-slate-900 to-black rounded-xl border border-white/5 shadow-xl"><div className="flex items-center gap-2 text-amber-700 mb-2 uppercase tracking-widest text-[10px] font-bold"><MapPin size={12} />{selectedLoc.region}</div><h2 className="text-2xl font-serif text-white mb-2">{selectedLoc.name}</h2><p className="text-xs text-gray-400 leading-relaxed italic">{selectedLoc.description || "A pivotal stronghold in the Known World."}</p></header>
                  <section className="space-y-3"><div className="flex items-center gap-2 text-gray-600"><User size={12} /><h3 className="text-[10px] font-bold uppercase tracking-widest">Presence</h3></div>
                    <div className="space-y-1">{charactersAtLocation.map(charId => {
                        const char = CHARACTERS.find(c => c.id === charId);
                        if (!char) return null;
                        return (<div key={charId} className="flex items-center gap-3 p-2 bg-white/5 rounded-lg border border-white/5"><span>{char.icon}</span><span className="text-xs font-medium text-gray-300">{char.name}</span></div>);
                      })}
                      {charactersAtLocation.length === 0 && <p className="text-[10px] text-gray-600 italic">No major characters currently tracked here.</p>}
                    </div>
                  </section>
                  <button onClick={() => updateState({ selectedLocationId: null })} className="w-full py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] uppercase font-bold text-gray-500 hover:text-gray-300 transition-colors">Reset Atlas</button>
                </div>
              ) : (
                <div className="text-center py-20 px-6 opacity-30"><MapPin size={40} className="mx-auto mb-4" /><p className="text-xs italic leading-relaxed">Select a citadel, castle, or ruin on the map to inspect its records.</p></div>
              )}
            </motion.div>
          )}
          
          {state.activeTab === 'THEORIES' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-center">
              <FlaskConical size={40} className="mx-auto text-purple-600 mb-2" /><h3 className="font-serif text-lg text-white">Citadel Simulation</h3><p className="text-xs text-gray-500 mb-6">Master the paths. Alter character positions to explore non-canonical history.</p>
              <button onClick={() => updateState({ simulationMode: !state.simulationMode, isPlaying: false })} className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all border ${state.simulationMode ? 'bg-purple-700 text-white border-purple-500 shadow-[0_0_30px_rgba(126,34,206,0.3)]' : 'bg-white/5 text-purple-500 border-purple-900/40 hover:bg-white/10'}`}>{state.simulationMode ? 'Exit Simulation' : 'Enter Simulation'}</button>
              {state.simulationMode && (
                <div className="mt-6 p-4 bg-white/5 rounded-xl border border-dashed border-white/20">
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-4 tracking-widest">Modification Panel</p>
                  <div className="text-left space-y-3">
                    <p className="text-[10px] text-gray-400 italic">Drag tokens to reposition them. Note: These changes do not persist after session refresh.</p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>

        <div className="mt-auto p-6 bg-black border-t border-white/5"><p className="text-[8px] text-gray-800 text-center uppercase tracking-[0.6em] font-serif">The North Remembers</p></div>
      </aside>
    </>
  );
};

export default Sidebar;
