export interface Episode {
  id: number;
  season: number;
  episode: number;
  title: string;
  airDate?: string;
  description?: string;
  keyEvents: string[];
}

export const episodes: Episode[] = [];
