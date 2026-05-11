import React, { useState } from 'react';
import { Character } from '../types';

export const CharacterFilter: React.FC<{ characters: Character[]; selected: string[]; onChange: (ids: string[]) => void; }> = ({ characters, selected, onChange }) => {
  const [search, setSearch] = useState('');
  const filtered = characters.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
      <input type="text" placeholder="Search characters..." className="w-full bg-gray-800 text-white p-2 rounded mb-4" value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="max-h-64 overflow-y-auto space-y-2">
        {filtered.map(char => (
          <label key={char.id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-800 p-1 rounded">
            <input type="checkbox" checked={selected.includes(char.id)} onChange={() => selected.includes(char.id) ? onChange(selected.filter(id => id !== char.id)) : onChange([...selected, char.id])} />
            <span className="text-sm">{char.name} ({char.house})</span>
          </label>
        ))}
      </div>
    </div>
  );
};