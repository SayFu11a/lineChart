<div align="center" id="LightTheme">
    <a href="ttps://sayfu11a.github.io/lineChart/" target="_blank"><img src="/image-light.png" alt="Light Theme" /></a>
</div>

## Dark Theme

<div align="center" id="DarkTheme">
    <a href="ttps://sayfu11a.github.io/lineChart/" target="_blank"><img src="/image-dark.png" alt="Dark Theme" /></a>
</div>

```markdown
# 📊 A/B Test Interactive Line Chart

An interactive line chart for visualizing A/B test statistics built with React, TypeScript, and Recharts.

## 🚀 Live Demo

👉 [View Live Demo](https://sayfu11a.github.io/lineChart/)

## 📸 Screenshots

## Light Theme

<div align="center" id="LightTheme">
    <a href="ttps://sayfu11a.github.io/lineChart/" target="_blank"><img src="/image-light.png" alt="Light Theme" /></a>
</div>

## Dark Theme

<div align="center" id="DarkTheme">
    <a href="ttps://sayfu11a.github.io/lineChart/" target="_blank"><img src="/image-dark.png" alt="Dark Theme" /></a>
</div>
![Dark Theme](https://raw.githubusercontent.com/SayFu11a/lineChart/main/image-dark.png)

## 🛠 Tech Stack

| Technology        | Purpose           |
| ----------------- | ----------------- |
| **React 19**      | UI Framework      |
| **TypeScript**    | Type Safety       |
| **Recharts**      | Charting Library  |
| **Vite**          | Build Tool        |
| **CSS Modules**   | Component Styling |
| **html-to-image** | Export to PNG     |
| **gh-pages**      | Deployment        |

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
| Export chart to PNG                      | ✅     |

---

## 📁 Project Structure
```

src/
├── assets/
│ └── data/
│ └── ab-test-data.json # Raw A/B test data
├── components/
│ ├── ABTestChart/ # Main chart component
│ │ ├── ABTestChart.tsx
│ │ ├── ChartControls.tsx # Control buttons
│ │ ├── ChartRenderer.tsx # Chart rendering logic
│ │ └── index.ts
│ ├── ChartTooltip/ # Custom hover tooltip
│ ├── VariationsSelector/ # Variation toggle buttons
│ ├── TimeRangeSelector/ # Day/Week toggle
│ └── LineStyleSelector/ # Line/Smooth/Area toggle
├── constants/
│ └── chart.ts # Theme colors, variation IDs
├── data/
│ └── chartData.ts # Processed daily/weekly data
├── hooks/
│ ├── useChartZoom.ts # Zoom logic hook
│ └── useExportChart.ts # Export to PNG hook
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
git clone https://github.com/sayfu11a/lineChart.git

# Navigate to project folder
cd lineChart

# Install dependencies
npm install

# Start development server
npm run dev
````

The app will be available at `http://localhost:5173`

### Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |
| `npm run deploy`  | Deploy to GitHub Pages   |

---

## 📊 Data Format

The chart uses data from `ab-test-data.json`:

```json
{
  "variations": [
    { "id": 0, "name": "Original" },
    { "id": 10001, "name": "Variation A" },
    { "id": 10002, "name": "Variation B" },
    { "id": 10003, "name": "Variation C" }
  ],
  "data": [
    {
      "date": "2025-01-01",
      "visits": { "0": 100, "10001": 120, "10002": 95, "10003": 110 },
      "conversions": { "0": 5, "10001": 8, "10002": 4, "10003": 7 }
    }
  ]
}
```

**Conversion rate formula:**

```
conversionRate = (conversions / visits) * 100
```

---

## 🎨 Features Overview

### 📈 Variations Selector

Toggle visibility of each variation (Original, A, B, C). At least one variation must always remain selected.

### 📅 Day / Week Toggle

- **Day**: Shows daily conversion rates
- **Week**: Shows weekly averages (aggregated data)

### 📉 Line Style Selector

- **Line**: Straight lines connecting data points
- **Smooth**: Curved monotone interpolation
- **Area**: Filled area chart with transparency

### 🔍 Zoom Controls

- **+** Zoom in (narrow date range)
- **–** Zoom out (expand date range)
- **⟳** Reset to full date range

### 🌓 Theme Toggle

Switch between light and dark color schemes. All chart elements adapt to the selected theme.

### 📷 Export to PNG

Download the current chart view as a PNG image file.

---

## 🔧 Key Implementation Details

### Custom Hooks

**useChartZoom** - Manages zoom state with min/max boundaries

```typescript
const { xDomain, handleZoomIn, handleZoomOut, resetZoom } = useChartZoom({
  fullDomain,
});
```

**useExportChart** - Handles PNG export using html-to-image

```typescript
const { chartRef, exportToPng } = useExportChart();
```

### Data Processing

- Daily data is calculated from raw visits/conversions
- Weekly data is pre-aggregated using averaging
- Null values are handled gracefully (gaps in chart)

---

## 📝 License

MIT

---

## 👤 Author

**sayfu11a**

- GitHub: [@sayfu11a](https://github.com/sayfu11a)

```


```
