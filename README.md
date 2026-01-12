# Westeros Chronicles: Interactive Timeline Atlas

An ultra-high-fidelity, interactive map of the Known World that chronicles the epic journey of major and minor characters throughout the entire Game of Thrones series.

## 🐺 Core Features

- **Granular Timeline (S01-S08)**: Navigate through all key milestones of the series. Every episode update triggers smooth character transitions across the map.
- **Dynamic Character Tracking**: 20+ characters tracked with precision. Tokens update visually to reflect their status (alive, dead, or "ghosted").
- **Intelligent Atlas**: Clicking any location reveals the "Presence" list—who is currently there during the selected episode.
- **Cinematic Map Engine**:
  - **Dynamic Routes**: Watch active travel paths glow and animate as characters move within an episode.
  - **Historical Trails**: Toggle "Path History" to see the cumulative journey of any character across the seasons.
  - **HCI Auto-Focus**: Lock the camera on a specific character to follow their story automatically as you advance the timeline.
- **Theories & Simulation**: Activate "Citadel Simulation" mode to manually reposition characters and explore non-canonical "What-If" scenarios.
- **Winter Horizon Mode**: Toggle "Undead Mode" to watch the realm succumb to the cold, changing the map's aesthetic and highlighting the slow advance of the Night King.

## ⌨️ Keyboard Shortcuts

- **Space**: Play/Pause Timeline
- **Arrow Right**: Next Episode
- **Arrow Left**: Previous Episode
- **Esc**: Reset View / Deselect

## 🛠️ Technical Details

- **Framework**: React 19 + TypeScript
- **Animations**: Framer Motion (for physics-based SVG transitions and smooth zooming)
- **Styling**: Tailwind CSS + Custom SVG Filters
- **Icons**: Lucide React
- **Data Model**: Normalized record structures for Locations, Characters, and Episodes.

---
*The North Remembers. The Map Records.*
