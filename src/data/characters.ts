// TODO: Define character data structures
export interface Character {
  id: string;
  name: string;
  house: string;
  actor?: string;
  color: string;
  startEpisode: number;
  locations: Array<{episode: number; x: number; y: number;}>;
}

export const characters: Character[] = [];
