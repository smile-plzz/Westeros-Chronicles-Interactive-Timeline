
export enum House {
  STARK = 'Stark',
  LANNISTER = 'Lannister',
  TARGARYEN = 'Targaryen',
  BARATHEON = 'Baratheon',
  GREYJOY = 'Greyjoy',
  MARTELL = 'Martell',
  TYRELL = 'Tyrell',
  NIGHT_WATCH = 'Night\'s Watch',
  WHITE_WALKER = 'White Walkers',
  BOLTON = 'Bolton',
  TULLY = 'Tully',
  ARRYN = 'Arryn',
  OTHER = 'Other'
}

export interface Location {
  id: string;
  name: string;
  x: number;
  y: number;
  region: string;
  importance?: number;
  description?: string;
}

export interface CharacterEra {
  atEpisode: number;
  icon: string;
  nameSuffix?: string;
}

export interface Character {
  id: string;
  name: string;
  house: House;
  color: string;
  icon: string;
  eras?: CharacterEra[];
  bio?: string;
}

export interface Movement {
  characterId: string;
  fromLocationId: string;
  toLocationId: string;
  isDead?: boolean;
  isFastTravel?: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  locationId: string;
  type: 'BATTLE' | 'DEATH' | 'POLITICAL' | 'WEDDING' | 'MAGIC';
  icon?: string;
}

export interface Episode {
  season: number;
  episode: number;
  title: string;
  movements: Movement[];
  events: Event[];
}

export interface AppState {
  currentEpisodeIndex: number;
  seasonFilter: number | 'ALL';
  selectedCharacterId: string | null;
  followingCharacterId: string | null;
  selectedLocationId: string | null;
  selectedHouse: House | 'ALL';
  showPaths: boolean;
  isPlaying: boolean;
  undeadMode: boolean;
  simulationMode: boolean; 
  simulatedPositions: Record<string, string>; 
  activeTab: 'INFO' | 'CHARACTERS' | 'THEORIES' | 'LOCATION' | 'STATS';
  spoilerFreeMode: boolean;
  maxWatchedEpisode: number;
  showHeatmap: boolean;
  realismMode: boolean;
}
