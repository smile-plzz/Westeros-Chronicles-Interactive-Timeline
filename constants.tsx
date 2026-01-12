
import { House, Location, Character, Episode } from './types';

export const LOCATIONS: Record<string, Location> = {
  // BEYOND THE WALL
  LAND_OF_WINTER: { id: 'LAND_OF_WINTER', name: 'Land of Always Winter', x: 35, y: -8, region: 'Beyond the Wall', importance: 5 },
  FIST_FIRST_MEN: { id: 'FIST_FIRST_MEN', name: 'Fist of the First Men', x: 38, y: 3, region: 'Beyond the Wall', importance: 3 },
  HARDHOME: { id: 'HARDHOME', name: 'Hardhome', x: 52, y: 4, region: 'Beyond the Wall', importance: 4 },
  THREE_EYED_CAVE: { id: 'THREE_EYED_CAVE', name: 'Cave of the 3-Eyed Raven', x: 42, y: 2, region: 'Beyond the Wall', importance: 3 },
  CRAS_KEEP: { id: 'CRAS_KEEP', name: 'Craster\'s Keep', x: 39, y: 5, region: 'Beyond the Wall', importance: 2 },
  
  // THE NORTH
  EASTWATCH: { id: 'EASTWATCH', name: 'Eastwatch', x: 48, y: 8, region: 'The North', importance: 3 },
  CASTLE_BLACK: { id: 'CASTLE_BLACK', name: 'Castle Black', x: 40, y: 8, region: 'The North', importance: 5 },
  WINTERFELL: { id: 'WINTERFELL', name: 'Winterfell', x: 34, y: 22, region: 'The North', importance: 5 },
  THE_DREADFORT: { id: 'THE_DREADFORT', name: 'The Dreadfort', x: 44, y: 20, region: 'The North', importance: 4 },
  WHITE_HARBOR: { id: 'WHITE_HARBOR', name: 'White Harbor', x: 40, y: 32, region: 'The North', importance: 4 },
  MOAT_CAILIN: { id: 'MOAT_CAILIN', name: 'Moat Cailin', x: 34, y: 38, region: 'The North', importance: 4 },
  BEAR_ISLAND: { id: 'BEAR_ISLAND', name: 'Bear Island', x: 20, y: 15, region: 'The North', importance: 3 },

  // THE IRON ISLANDS
  PYKE: { id: 'PYKE', name: 'Pyke', x: 18, y: 50, region: 'Iron Islands', importance: 4 },

  // THE RIVERLANDS
  THE_TWINS: { id: 'THE_TWINS', name: 'The Twins', x: 34, y: 44, region: 'The Riverlands', importance: 4 },
  RIVERRUN: { id: 'RIVERRUN', name: 'Riverrun', x: 30, y: 55, region: 'The Riverlands', importance: 4 },
  HARRENHAL: { id: 'HARRENHAL', name: 'Harrenhal', x: 40, y: 56, region: 'The Riverlands', importance: 4 },

  // THE VALE
  THE_EYRIE: { id: 'THE_EYRIE', name: 'The Eyrie', x: 55, y: 46, region: 'The Vale', importance: 4 },

  // THE WESTERLANDS
  CASTERLY_ROCK: { id: 'CASTERLY_ROCK', name: 'Casterly Rock', x: 15, y: 64, region: 'The Westerlands', importance: 5 },

  // THE REACH
  HIGHGARDEN: { id: 'HIGHGARDEN', name: 'Highgarden', x: 26, y: 76, region: 'The Reach', importance: 4 },
  OLDTOWN: { id: 'OLDTOWN', name: 'Oldtown', x: 18, y: 86, region: 'The Reach', importance: 5 },

  // CROWNLANDS & STORMLANDS
  KINGS_LANDING: { id: 'KINGS_LANDING', name: 'King\'s Landing', x: 45, y: 66, region: 'The Crownlands', importance: 5 },
  DRAGONSTONE: { id: 'DRAGONSTONE', name: 'Dragonstone', x: 56, y: 62, region: 'The Crownlands', importance: 5 },
  STORM_END: { id: 'STORM_END', name: 'Storm\'s End', x: 50, y: 76, region: 'The Stormlands', importance: 4 },

  // DORNE
  SUNSPEAR: { id: 'SUNSPEAR', name: 'Sunspear', x: 52, y: 92, region: 'Dorne', importance: 4 },

  // ESSOS
  PENTOS: { id: 'PENTOS', name: 'Pentos', x: 72, y: 66, region: 'Essos', importance: 4 },
  BRAAVOS: { id: 'BRAAVOS', name: 'Braavos', x: 75, y: 34, region: 'Essos', importance: 5 },
  MEEREEN: { id: 'MEEREEN', name: 'Meereen', x: 94, y: 72, region: 'Essos', importance: 5 },
  VAES_DOTHRAK: { id: 'VAES_DOTHRAK', name: 'Vaes Dothrak', x: 92, y: 45, region: 'Essos', importance: 3 },
  ASTAPOR: { id: 'ASTAPOR', name: 'Astapor', x: 90, y: 82, region: 'Essos', importance: 3 },
  QARTH: { id: 'QARTH', name: 'Qarth', x: 98, y: 92, region: 'Essos', importance: 4 },
};

export const CHARACTERS: Character[] = [
  { 
    id: 'JON_SNOW', name: 'Jon Snow', house: House.STARK, color: '#9CA3AF', icon: '🐺', 
    eras: [
      { atEpisode: 0, icon: '🐺' },
      { atEpisode: 2, icon: '⚔️' },
      { atEpisode: 50, icon: '👑' },
      { atEpisode: 70, icon: '🏹' }
    ]
  },
  { 
    id: 'ARYA_STARK', name: 'Arya Stark', house: House.STARK, color: '#4B5563', icon: '👧',
    eras: [
      { atEpisode: 0, icon: '👧' },
      { atEpisode: 10, icon: '👦' },
      { atEpisode: 40, icon: '🎭' },
      { atEpisode: 60, icon: '🗡️' }
    ]
  },
  { 
    id: 'DAENERYS', name: 'Daenerys Targaryen', house: House.TARGARYEN, color: '#DC2626', icon: '👰',
    eras: [
      { atEpisode: 0, icon: '👰' },
      { atEpisode: 10, icon: '🐉' },
      { atEpisode: 60, icon: '👑' },
      { atEpisode: 70, icon: '🔥' }
    ]
  },
  { id: 'TYRION', name: 'Tyrion Lannister', house: House.LANNISTER, color: '#FBBF24', icon: '🍷' },
  { id: 'CERSEI', name: 'Cersei Lannister', house: House.LANNISTER, color: '#F59E0B', icon: '👑' },
  { id: 'JAIME', name: 'Jaime Lannister', house: House.LANNISTER, color: '#D97706', icon: '⚔️', eras: [{ atEpisode: 30, icon: '✋' }] },
  { id: 'SANSA_STARK', name: 'Sansa Stark', house: House.STARK, color: '#A78BFA', icon: '🧵' },
  { id: 'BRAN_STARK', name: 'Bran Stark', house: House.STARK, color: '#10B981', icon: '🦅' },
  { id: 'NIGHT_KING', name: 'Night King', house: House.WHITE_WALKER, color: '#60A5FA', icon: '❄️' },
  { id: 'STANNIS', name: 'Stannis Baratheon', house: House.BARATHEON, color: '#FACC15', icon: '🔥' },
];

export const EPISODES: Episode[] = [
  // SEASON 1
  {
    season: 1, episode: 1, title: "Winter Is Coming",
    movements: [
      { characterId: 'JON_SNOW', fromLocationId: 'WINTERFELL', toLocationId: 'WINTERFELL' },
      { characterId: 'ARYA_STARK', fromLocationId: 'WINTERFELL', toLocationId: 'WINTERFELL' },
      { characterId: 'DAENERYS', fromLocationId: 'PENTOS', toLocationId: 'PENTOS' },
      { characterId: 'TYRION', fromLocationId: 'KINGS_LANDING', toLocationId: 'WINTERFELL' },
      { characterId: 'JAIME', fromLocationId: 'KINGS_LANDING', toLocationId: 'WINTERFELL' },
      { characterId: 'CERSEI', fromLocationId: 'KINGS_LANDING', toLocationId: 'WINTERFELL' },
    ],
    events: [{ id: 's1e1', title: 'Royal Visit', description: 'The Baratheon/Lannister party arrives at Winterfell.', locationId: 'WINTERFELL', type: 'POLITICAL' }]
  },
  {
    season: 1, episode: 2, title: "The Kingsroad",
    movements: [
      { characterId: 'JON_SNOW', fromLocationId: 'WINTERFELL', toLocationId: 'CASTLE_BLACK' },
      { characterId: 'TYRION', fromLocationId: 'WINTERFELL', toLocationId: 'CASTLE_BLACK' },
      { characterId: 'ARYA_STARK', fromLocationId: 'WINTERFELL', toLocationId: 'MOAT_CAILIN' },
      { characterId: 'CERSEI', fromLocationId: 'WINTERFELL', toLocationId: 'MOAT_CAILIN' },
      { characterId: 'JAIME', fromLocationId: 'WINTERFELL', toLocationId: 'MOAT_CAILIN' },
    ],
    events: [{ id: 's1e2', title: 'Departure', description: 'Jon heads North; the Starks head South.', locationId: 'MOAT_CAILIN', type: 'POLITICAL' }]
  },
  {
    season: 1, episode: 9, title: "Baelor",
    movements: [
      { characterId: 'ARYA_STARK', fromLocationId: 'MOAT_CAILIN', toLocationId: 'KINGS_LANDING' },
      { characterId: 'CERSEI', fromLocationId: 'MOAT_CAILIN', toLocationId: 'KINGS_LANDING' },
    ],
    events: [{ id: 's1e9', title: 'The Execution', description: 'Eddard Stark is executed at the Great Sept of Baelor.', locationId: 'KINGS_LANDING', type: 'DEATH', icon: '⚔️' }]
  },
  {
    season: 1, episode: 10, title: "Fire and Blood",
    movements: [
      { characterId: 'DAENERYS', fromLocationId: 'PENTOS', toLocationId: 'VAES_DOTHRAK' },
      { characterId: 'TYRION', fromLocationId: 'CASTLE_BLACK', toLocationId: 'KINGS_LANDING' },
      { characterId: 'ARYA_STARK', fromLocationId: 'KINGS_LANDING', toLocationId: 'THE_TWINS' },
    ],
    events: [{ id: 's1e10', title: 'Birth of Dragons', description: 'Daenerys survives the pyre.', locationId: 'VAES_DOTHRAK', type: 'MAGIC', icon: '🐉' }]
  },

  // SEASON 2
  {
    season: 2, episode: 9, title: "Blackwater",
    movements: [
      { characterId: 'STANNIS', fromLocationId: 'DRAGONSTONE', toLocationId: 'KINGS_LANDING' },
      { characterId: 'TYRION', fromLocationId: 'KINGS_LANDING', toLocationId: 'KINGS_LANDING' },
    ],
    events: [{ id: 's2e9', title: 'Wildfire Battle', description: 'Tyrion defends the city against Stannis.', locationId: 'KINGS_LANDING', type: 'BATTLE', icon: '🔥' }]
  },

  // SEASON 3
  {
    season: 3, episode: 4, title: "And Now His Watch Is Ended",
    movements: [
      { characterId: 'DAENERYS', fromLocationId: 'VAES_DOTHRAK', toLocationId: 'ASTAPOR' },
    ],
    events: [{ id: 's3e4', title: 'Army of the Unsullied', description: 'Daenerys burns Astapor.', locationId: 'ASTAPOR', type: 'BATTLE' }]
  },
  {
    season: 3, episode: 9, title: "The Rains of Castamere",
    movements: [
      { characterId: 'ARYA_STARK', fromLocationId: 'THE_TWINS', toLocationId: 'THE_TWINS' },
    ],
    events: [{ id: 's3e9', title: 'The Red Wedding', description: 'Robb and Catelyn are betrayed.', locationId: 'THE_TWINS', type: 'WEDDING', icon: '🩸' }]
  },

  // SEASON 4
  {
    season: 4, episode: 2, title: "The Lion and the Rose",
    movements: [
      { characterId: 'SANSA_STARK', fromLocationId: 'WINTERFELL', toLocationId: 'KINGS_LANDING' },
    ],
    events: [{ id: 's4e2', title: 'Purple Wedding', description: 'Joffrey is poisoned.', locationId: 'KINGS_LANDING', type: 'DEATH', icon: '🍷' }]
  },
  {
    season: 4, episode: 10, title: "The Children",
    movements: [
      { characterId: 'TYRION', fromLocationId: 'KINGS_LANDING', toLocationId: 'BRAAVOS', isFastTravel: true },
      { characterId: 'ARYA_STARK', fromLocationId: 'THE_TWINS', toLocationId: 'BRAAVOS' },
      { characterId: 'BRAN_STARK', fromLocationId: 'WINTERFELL', toLocationId: 'THREE_EYED_CAVE', isFastTravel: true },
    ],
    events: [{ id: 's4e10', title: 'End of Tywin', description: 'Tyrion kills his father.', locationId: 'KINGS_LANDING', type: 'DEATH' }]
  },

  // SEASON 5
  {
    season: 5, episode: 8, title: "Hardhome",
    movements: [
      { characterId: 'JON_SNOW', fromLocationId: 'CASTLE_BLACK', toLocationId: 'HARDHOME' },
      { characterId: 'NIGHT_KING', fromLocationId: 'LAND_OF_WINTER', toLocationId: 'HARDHOME' },
    ],
    events: [{ id: 's5e8', title: 'Hardhome Massacre', description: 'The Night King arrives.', locationId: 'HARDHOME', type: 'BATTLE', icon: '❄️' }]
  },

  // SEASON 6
  {
    season: 6, episode: 9, title: "Battle of the Bastards",
    movements: [
      { characterId: 'JON_SNOW', fromLocationId: 'HARDHOME', toLocationId: 'WINTERFELL' },
      { characterId: 'SANSA_STARK', fromLocationId: 'KINGS_LANDING', toLocationId: 'WINTERFELL', isFastTravel: true },
    ],
    events: [{ id: 's6e9', title: 'North Reclaimed', description: 'Jon retakes Winterfell.', locationId: 'WINTERFELL', type: 'BATTLE' }]
  },
  {
    season: 6, episode: 10, title: "The Winds of Winter",
    movements: [
      { characterId: 'DAENERYS', fromLocationId: 'ASTAPOR', toLocationId: 'DRAGONSTONE', isFastTravel: true },
      { characterId: 'ARYA_STARK', fromLocationId: 'BRAAVOS', toLocationId: 'WINTERFELL' },
    ],
    events: [{ id: 's6e10', title: 'Sept Destruction', description: 'Cersei destroys the Sept.', locationId: 'KINGS_LANDING', type: 'BATTLE' }]
  },

  // SEASON 7
  {
    season: 7, episode: 4, title: "The Spoils of War",
    movements: [
      { characterId: 'DAENERYS', fromLocationId: 'DRAGONSTONE', toLocationId: 'HIGHGARDEN' },
      { characterId: 'JAIME', fromLocationId: 'KINGS_LANDING', toLocationId: 'HIGHGARDEN' },
    ],
    events: [{ id: 's7e4', title: 'Field of Fire', description: 'Drogon burns the baggage train.', locationId: 'HIGHGARDEN', type: 'BATTLE', icon: '🔥' }]
  },
  {
    season: 7, episode: 7, title: "The Dragon and the Wolf",
    movements: [
      { characterId: 'NIGHT_KING', fromLocationId: 'HARDHOME', toLocationId: 'EASTWATCH' },
    ],
    events: [{ id: 's7e7', title: 'Wall Falls', description: 'Viserion destroys the wall.', locationId: 'EASTWATCH', type: 'MAGIC', icon: '❄️' }]
  },

  // SEASON 8
  {
    season: 8, episode: 3, title: "The Long Night",
    movements: [
      { characterId: 'NIGHT_KING', fromLocationId: 'EASTWATCH', toLocationId: 'WINTERFELL', isDead: true },
      { characterId: 'JON_SNOW', fromLocationId: 'WINTERFELL', toLocationId: 'WINTERFELL' },
      { characterId: 'ARYA_STARK', fromLocationId: 'WINTERFELL', toLocationId: 'WINTERFELL' },
      { characterId: 'DAENERYS', fromLocationId: 'WINTERFELL', toLocationId: 'WINTERFELL' },
    ],
    events: [{ id: 's8e3', title: 'The Great War', description: 'Winterfell stands.', locationId: 'WINTERFELL', type: 'BATTLE', icon: '💀' }]
  },
  {
    season: 8, episode: 5, title: "The Bells",
    movements: [
      { characterId: 'DAENERYS', fromLocationId: 'WINTERFELL', toLocationId: 'KINGS_LANDING' },
      { characterId: 'JAIME', fromLocationId: 'HIGHGARDEN', toLocationId: 'KINGS_LANDING', isDead: true },
      { characterId: 'CERSEI', fromLocationId: 'KINGS_LANDING', toLocationId: 'KINGS_LANDING', isDead: true },
    ],
    events: [{ id: 's8e5', title: 'Desolation', description: 'Daenerys burns the city.', locationId: 'KINGS_LANDING', type: 'BATTLE', icon: '🔥' }]
  },
  {
    season: 8, episode: 6, title: "The Iron Throne",
    movements: [
      { characterId: 'DAENERYS', fromLocationId: 'KINGS_LANDING', toLocationId: 'KINGS_LANDING', isDead: true },
      { characterId: 'JON_SNOW', fromLocationId: 'KINGS_LANDING', toLocationId: 'CASTLE_BLACK' },
      { characterId: 'SANSA_STARK', fromLocationId: 'WINTERFELL', toLocationId: 'WINTERFELL' },
      { characterId: 'ARYA_STARK', fromLocationId: 'KINGS_LANDING', toLocationId: 'BRAAVOS' },
    ],
    events: [{ id: 's8e6', title: 'A New World', description: 'Bran is elected King.', locationId: 'KINGS_LANDING', type: 'POLITICAL' }]
  }
];

export const HOUSE_COLORS: Record<House, string> = {
  [House.STARK]: '#4B5563',
  [House.LANNISTER]: '#FBBF24',
  [House.TARGARYEN]: '#DC2626',
  [House.BARATHEON]: '#1F2937',
  [House.GREYJOY]: '#4338CA',
  [House.MARTELL]: '#F97316',
  [House.TYRELL]: '#10B981',
  [House.NIGHT_WATCH]: '#000000',
  [House.WHITE_WALKER]: '#60A5FA',
  [House.BOLTON]: '#991B1B',
  [House.TULLY]: '#3B82F6',
  [House.ARRYN]: '#60A5FA',
  [House.OTHER]: '#9CA3AF',
};
