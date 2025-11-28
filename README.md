# README.md

```markdown
# 📊 A/B Test Interactive Line Chart

An interactive line chart for visualizing A/B test statistics built with React, TypeScript, and Recharts.

## 🚀 Live Demo

https://sayfu11a.github.io/lineChart/

---

## 🛠 Tech Stack

| Technology      | Purpose           |
| --------------- | ----------------- |
| **React 19**    | UI Framework      |
| **TypeScript**  | Type Safety       |
| **Recharts**    | Charting Library  |
| **Vite**        | Build Tool        |
| **CSS Modules** | Component Styling |

### Why Recharts?

- Simple declarative API
- Built-in responsive container
- Easy customization
- Good TypeScript support
- Active community

---

## ✅ Implemented Features

### Core Requirements

| Feature                                         | Status |
| ----------------------------------------------- | ------ |
| Conversion rate line chart for all variations   | ✅     |
| Hover tooltip with vertical line and daily data | ✅     |
| At least one variation always selected          | ✅     |
| X/Y axes auto-adapt to visible data range       | ✅     |
| All values displayed as percentages             | ✅     |
| Responsive layout (671px - 1300px)              | ✅     |
| Variations selector                             | ✅     |
| Day / Week toggle                               | ✅     |

### Bonus Features

| Feature                                  | Status |
| ---------------------------------------- | ------ |
| Zoom In / Zoom Out / Reset Zoom          | ✅     |
| Line style selector (Line, Smooth, Area) | ✅     |
| Light / Dark theme toggle                | ✅     |
| Export chart to PNG                      | ❌     |

---

## 📁 Project Structure
```

src/
├── assets/
│ └── data/
│ └── ab-test-data.json # Raw A/B test data
├── components/
│ ├── ABTestChart/ # Main chart component
│ ├── ChartTooltip/ # Custom tooltip
│ ├── VariationsSelector/ # Variation toggle buttons
│ ├── TimeRangeSelector/ # Day/Week toggle
│ └── LineStyleSelector/ # Line/Smooth/Area toggle
├── constants/
│ └── chart.ts # Theme colors, variation IDs
├── data/
│ └── chartData.ts # Processed daily/weekly data
├── hooks/
│ └── useChartZoom.ts # Zoom logic hook
├── types/
│ └── chart.ts # TypeScript types
├── utils/
│ └── chart.ts # Helper functions
├── App.tsx
└── main.tsx

````

---

## 🚀 Local Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Navigate to project folder
cd YOUR_REPO_NAME

# Install dependencies
npm install

# Start development server
npm run dev
````

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 📊 Data Format

The chart uses data from `ab-test-data.json`:

```json
{
  "variations": [
    { "id": 0, "name": "Original" },
    { "id": 10001, "name": "Variation A" },
    ...
  ],
  "data": [
    {
      "date": "2025-01-01",
      "visits": { "0": 100, "10001": 120, ... },
      "conversions": { "0": 5, "10001": 8, ... }
    },
    ...
  ]
}
```

Conversion rate is calculated as:

```
conversionRate = (conversions / visits) * 100
```

---

## 🎨 Features Overview

### Variations Selector

Toggle visibility of each variation (Original, A, B, C). At least one must remain selected.

### Day / Week Toggle

- **Day**: Shows daily conversion rates
- **Week**: Shows weekly averages

### Line Style Selector

- **Line**: Straight lines connecting data points
- **Smooth**: Curved monotone interpolation
- **Area**: Filled area chart

### Zoom Controls

- **+** Zoom in (narrow date range)
- **–** Zoom out (expand date range)
- **⟳** Reset to full range

### Theme Toggle

Switch between light and dark color schemes.

---

## 📝 License

MIT

---
