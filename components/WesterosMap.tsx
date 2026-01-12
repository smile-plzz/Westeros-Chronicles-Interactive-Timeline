
import React, { useMemo, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { LOCATIONS, CHARACTERS, EPISODES } from '../constants.tsx';
import { AppState, Movement, Character, House } from '../types.ts';
import { Plus, Minus, Maximize } from 'lucide-react';

interface MapProps {
  state: AppState;
  movements: Movement[];
  onLocationClick: (locId: string) => void;
  onCharacterClick?: (charId: string) => void;
}

const WesterosMap: React.FC<MapProps> = ({ state, movements, onLocationClick, onCharacterClick }) => {
  const [scale, setScale] = useState(1);
  const [hoveredLocId, setHoveredLocId] = useState<string | null>(null);
  const [hoveredCharId, setHoveredCharId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const currentEpisodeMovements = useMemo(() => {
    return EPISODES[state.currentEpisodeIndex]?.movements || [];
  }, [state.currentEpisodeIndex]);

  const activeEvents = useMemo(() => {
    return EPISODES[state.currentEpisodeIndex]?.events || [];
  }, [state.currentEpisodeIndex]);

  const characterPositions = useMemo(() => {
    const positions: Record<string, { x: number; y: number; char: Character; isDead: boolean }> = {};
    
    CHARACTERS.forEach(char => {
      const startLoc = char.house === House.TARGARYEN ? 'PENTOS' : 'WINTERFELL';
      const loc = LOCATIONS[startLoc];
      if (loc) {
        positions[char.id] = { x: loc.x, y: loc.y, char, isDead: false };
      }
    });

    if (state.simulationMode) {
      Object.entries(state.simulatedPositions).forEach(([charId, locId]) => {
        const loc = LOCATIONS[locId];
        const char = CHARACTERS.find(c => c.id === charId);
        if (loc && char) {
          positions[charId] = { x: loc.x, y: loc.y, char, isDead: false };
        }
      });
    } else {
      movements.forEach(m => {
        const loc = LOCATIONS[m.toLocationId];
        const char = CHARACTERS.find(c => c.id === m.characterId);
        if (loc && char) {
          positions[m.characterId] = { 
            x: loc.x, y: loc.y, 
            char: char,
            isDead: positions[m.characterId]?.isDead || !!m.isDead
          };
        }
      });
    }
    return positions;
  }, [movements, state.simulationMode, state.simulatedPositions]);

  useEffect(() => {
    const charToFollow = state.followingCharacterId || state.selectedCharacterId;
    if (charToFollow && characterPositions[charToFollow] && containerRef.current) {
      const pos = characterPositions[charToFollow];
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const targetX = (50 - pos.x) * (rect.width / 100) * scale;
      const targetY = (50 - pos.y) * (rect.height / 100) * scale;
      x.set(targetX);
      y.set(targetY);
    }
  }, [state.followingCharacterId, state.selectedCharacterId, state.currentEpisodeIndex, scale]);

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) e.preventDefault();
    const delta = e.deltaY > 0 ? 0.85 : 1.15;
    setScale(Math.min(Math.max(scale * delta, 0.4), 15));
  };

  const getBezierPath = (from: {x: number, y: number}, to: {x: number, y: number}) => {
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2 - (from.y > to.y ? 2 : -2); 
    return `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;
  };

  const westerosPath = `M 30,0 L 50,0 L 55,5 L 52,10 L 54,14 L 50,18 L 48,22 L 52,28 L 56,32 L 54,36 L 50,38 L 55,42 L 62,45 L 65,50 L 60,55 L 58,58 L 62,62 L 58,68 L 60,74 L 55,80 L 58,85 L 55,92 L 58,98 L 50,100 L 45,98 L 40,96 L 35,98 L 30,95 L 25,98 L 20,95 L 15,98 L 10,95 L 8,90 L 12,85 L 15,80 L 12,75 L 8,70 L 12,65 L 15,60 L 12,55 L 8,50 L 12,45 L 15,40 L 12,35 L 15,30 L 12,25 L 15,20 L 20,15 L 25,10 L 30,5 Z`;
  const essosPath = `M 70,30 L 78,28 L 85,30 L 90,35 L 95,45 L 98,55 L 95,65 L 98,75 L 95,85 L 98,95 L 92,100 L 85,98 L 78,100 L 72,95 L 68,90 L 65,85 L 68,80 L 65,75 L 68,70 L 65,65 L 68,60 L 65,55 L 68,50 L 65,45 L 68,40 Z`;

  return (
    <div ref={containerRef} className="relative w-full h-full bg-[#05060b] overflow-hidden rounded-[2.5rem] shadow-[inset_0_0_120px_rgba(0,0,0,1)] border border-white/5 group cursor-grab active:cursor-grabbing" onWheel={handleWheel}>
      <div className="absolute inset-0 map-grain z-0 opacity-20 pointer-events-none" />
      
      {/* Container for movement - Drag is now less restricted */}
      <motion.div 
        drag 
        style={{ x, y, scale }} 
        dragElastic={0.1}
        className="w-full h-full flex items-center justify-center origin-center"
      >
        <svg viewBox="0 0 100 100" className="w-[100%] h-[100%] pointer-events-auto filter drop-shadow-2xl" style={{ overflow: 'visible' }}>
          <defs>
            <radialGradient id="battlePulse" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" /><stop offset="100%" stopColor="#ef4444" stopOpacity="0" /></radialGradient>
            <radialGradient id="tokenGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#d4af37" stopOpacity="0.3" /><stop offset="100%" stopColor="#d4af37" stopOpacity="0" /></radialGradient>
            <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="0.4" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /></filter>
            <pattern id="mountains" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 2,8 L 5,2 L 8,8" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            </pattern>
          </defs>

          <rect x="-1000" y="-1000" width="3000" height="3000" fill="#010204" />

          <motion.path d={westerosPath} fill="#1a1c2c" stroke="#3d4458" strokeWidth="0.3" animate={{ fill: state.undeadMode ? '#080a18' : '#1a1c2c' }} />
          <path d={westerosPath} fill="url(#mountains)" opacity="0.4" pointerEvents="none" />
          
          <motion.path d={essosPath} fill="#22273a" stroke="#3d4458" strokeWidth="0.3" animate={{ fill: state.undeadMode ? '#0e1224' : '#22273a' }} />

          <path d="M 30,55 Q 35,55 45,66" fill="none" stroke="#2a4365" strokeWidth="0.4" opacity="0.3" pointerEvents="none" />
          <path d="M 34,44 Q 30,50 30,55" fill="none" stroke="#2a4365" strokeWidth="0.4" opacity="0.3" pointerEvents="none" />

          {state.undeadMode && (
            <motion.rect 
              x="-50" y="-50" width="200" 
              initial={{ height: 0 }}
              animate={{ height: 25 + (state.currentEpisodeIndex / EPISODES.length) * 130 }} 
              fill="rgba(96, 165, 250, 0.12)"
              style={{ filter: 'blur(20px)' }}
              pointerEvents="none"
            />
          )}

          {state.showPaths && !state.simulationMode && (
            <g>
              {CHARACTERS.map(char => {
                const isSelected = state.selectedCharacterId === char.id;
                if (state.selectedCharacterId && !isSelected) return null;
                const charMovements = movements.filter(m => m.characterId === char.id);
                if (charMovements.length < 1) return null;
                
                let historicalPathStr = '';
                const historyLimit = movements.length - currentEpisodeMovements.filter(cm => cm.characterId === char.id).length;
                const historicalMovements = charMovements.filter((_, idx) => movements.indexOf(charMovements[idx]) < historyLimit);

                historicalMovements.forEach((m, idx) => {
                  const loc = LOCATIONS[m.toLocationId];
                  const fromLoc = LOCATIONS[m.fromLocationId];
                  if (idx === 0 && fromLoc) historicalPathStr += `M ${fromLoc.x} ${fromLoc.y}`;
                  if (loc) historicalPathStr += ` L ${loc.x} ${loc.y}`;
                });

                const currentMove = currentEpisodeMovements.find(cm => cm.characterId === char.id);
                let activeRouteStr = '';
                if (currentMove) {
                  const from = LOCATIONS[currentMove.fromLocationId];
                  const to = LOCATIONS[currentMove.toLocationId];
                  if (from && to) activeRouteStr = getBezierPath(from, to);
                }

                return (
                  <g key={`journey-${char.id}`}>
                    {historicalPathStr && (
                      <motion.path d={historicalPathStr} fill="none" stroke={char.color} strokeWidth={(isSelected ? 0.35 : 0.15) / Math.sqrt(scale)} opacity={isSelected ? 0.5 : 0.1} />
                    )}
                    {activeRouteStr && (
                      <motion.path 
                        d={activeRouteStr} 
                        fill="none" 
                        stroke={char.color} 
                        strokeWidth={(isSelected ? 1.2 : 0.8) / Math.sqrt(scale)} 
                        initial={{ pathLength: 0 }} 
                        animate={{ pathLength: 1 }} 
                        transition={{ duration: 2.5, ease: "easeInOut" }} 
                        filter="url(#routeGlow)" 
                        strokeDasharray={currentMove?.isFastTravel && state.realismMode ? "2 2" : "none"}
                      />
                    )}
                  </g>
                );
              })}
            </g>
          )}

          {Object.values(LOCATIONS).map((loc) => {
            const isMajor = loc.importance && loc.importance >= 4;
            const isSelected = state.selectedLocationId === loc.id;
            const markerRadius = (isMajor ? 0.7 : 0.4) / Math.sqrt(scale);
            return (
              <g key={loc.id} onClick={(e) => { e.stopPropagation(); onLocationClick(loc.id); }} onMouseEnter={() => setHoveredLocId(loc.id)} onMouseLeave={() => setHoveredLocId(null)} className="cursor-pointer">
                {isSelected && <motion.circle initial={{ r: 0 }} animate={{ r: markerRadius * 8, opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 2.5, repeat: Infinity }} cx={loc.x} cy={loc.y} fill="url(#tokenGlow)" />}
                <motion.circle cx={loc.x} cy={loc.y} animate={{ r: hoveredLocId === loc.id || isSelected ? markerRadius * 1.8 : markerRadius, fill: hoveredLocId === loc.id || isSelected ? '#fff' : (state.undeadMode && loc.y < (25 + (state.currentEpisodeIndex / EPISODES.length) * 130) ? '#4299e1' : '#b79257') }} stroke="#000" strokeWidth={0.05 / Math.sqrt(scale)} />
                {(hoveredLocId === loc.id || isMajor || isSelected) && (
                  <text x={loc.x} y={loc.y + (isMajor ? 4.5 : 3.5) / Math.sqrt(scale)} style={{ fontSize: `${(isMajor ? 1.6 : 1.2) / Math.sqrt(scale)}px`, textShadow: '0 0 5px #000' }} className="fill-white font-serif uppercase tracking-widest text-center select-none pointer-events-none" textAnchor="middle">{loc.name}</text>
                )}
              </g>
            );
          })}

          <AnimatePresence>
            {activeEvents.map(event => {
              const loc = LOCATIONS[event.locationId];
              if (!loc) return null;
              return (
                <motion.g key={event.id} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                  <circle cx={loc.x} cy={loc.y} r={10 / Math.sqrt(scale)} fill="url(#battlePulse)" className="animate-battle" />
                  <text x={loc.x} y={loc.y - 8 / Math.sqrt(scale)} style={{ fontSize: `${2.4 / Math.sqrt(scale)}px`, textShadow: '0 0 8px #000' }} className="fill-red-600 font-bold uppercase tracking-[0.2em] text-center" textAnchor="middle">{event.icon || '⚔️'} {event.title}</text>
                </motion.g>
              );
            })}
          </AnimatePresence>

          {Object.entries(characterPositions).map(([id, pos]) => {
            if (state.selectedHouse !== 'ALL' && pos.char.house !== state.selectedHouse) return null;
            const isSelected = state.selectedCharacterId === id;
            const isFollowing = state.followingCharacterId === id;
            const isHovered = hoveredCharId === id;
            const tokenRadius = (isSelected ? 3 : 2.2) / Math.sqrt(scale);
            
            let displayIcon = pos.char.icon;
            if (pos.char.eras) {
              const currentEra = [...pos.char.eras].reverse().find(e => e.atEpisode <= state.currentEpisodeIndex);
              if (currentEra) displayIcon = currentEra.icon;
            }

            return (
              <motion.g key={id} transition={{ type: 'spring', stiffness: 50, damping: 25 }} animate={{ x: pos.x, y: pos.y }} onClick={(e) => { e.stopPropagation(); onCharacterClick?.(id); }} onMouseEnter={() => setHoveredCharId(id)} onMouseLeave={() => setHoveredCharId(null)} className="cursor-pointer">
                {(isSelected || isFollowing) && <circle r={tokenRadius * 1.6} fill={pos.char.color} opacity="0.3" className="animate-pulse" />}
                <circle r={tokenRadius} fill={pos.isDead ? '#1a1b1f' : pos.char.color} stroke={(isSelected || isFollowing) ? '#fff' : 'rgba(255,255,255,0.4)'} strokeWidth={tokenRadius * 0.1} />
                <text dy={tokenRadius * 0.35} style={{ fontSize: `${(2 / Math.sqrt(scale))}px`, opacity: pos.isDead ? 0.3 : 1 }} className="pointer-events-none select-none text-center" textAnchor="middle">{displayIcon}</text>
                {(isHovered || isSelected || scale > 4) && (
                  <motion.text initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} y={-tokenRadius * 1.8} style={{ fontSize: `${1.4 / Math.sqrt(scale)}px`, textShadow: '0 0 6px #000' }} className="fill-white font-bold uppercase tracking-widest text-center select-none" textAnchor="middle">{pos.char.name}</motion.text>
                )}
              </motion.g>
            );
          })}
        </svg>
      </motion.div>

      <div className="absolute left-8 bottom-8 flex flex-col gap-3 z-50">
        <button onClick={() => setScale(s => Math.min(s * 1.5, 15))} className="w-12 h-12 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center text-amber-500 hover:text-white transition-all"><Plus size={20} /></button>
        <button onClick={() => setScale(s => Math.max(s / 1.5, 0.4))} className="w-12 h-12 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center text-amber-500 hover:text-white transition-all"><Minus size={20} /></button>
        <button onClick={() => { setScale(1); x.set(0); y.set(0); }} className="w-12 h-12 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center text-amber-500 hover:text-white transition-all mt-3"><Maximize size={20} /></button>
      </div>
    </div>
  );
};

export default WesterosMap;
