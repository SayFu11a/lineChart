```markdown
# 📊 A/B Test Interactive Line Chart

An interactive line chart for visualizing A/B test statistics built with React, TypeScript, and Recharts.

## 🚀 Live Demo

👉 [View Live Demo](https://sayfu11a.github.io/lineChart/)

## 📸 Screenshots

## Light Theme

<a href="https://sayfu11a.github.io/lineChart/" title="Light">
  <img src="https://raw.githubusercontent.com/SayFu11a/lineChart/main/image-light.png" alt="Light Theme" width="80%">
</a>

![Light Theme](https://raw.githubusercontent.com/SayFu11a/lineChart/main/image-light.png)

## Dark Theme

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

---

```

<div align="center" id="trendradar">

<a href="https://github.com/sansan0/TrendRadar" title="TrendRadar">
  <img src="/_image/banner.webp" alt="TrendRadar Banner" width="80%">
</a>

🚀 最快<strong>30 秒</strong>部署的热点助手 —— 告别无效刷屏，只看真正关心的新闻资讯

<a href="https://trendshift.io/repositories/14726" target="_blank"><img src="https://raw.githubusercontent.com/SayFu11a/lineChart/main/image-light.png" alt="sansan0%2FTrendRadar | Trendshift" /></a>

<a href="https://share.302.ai/mEOUzG" target="_blank" title="一站式 AI 模型和 API 平台"><img src="_image/302ai.png" alt="302.AI logo" height="50"/></a>
<a href="https://shandianshuo.cn" target="_blank" title="AI 语音输入，比打字快 4 倍 ⚡"><img src="_image/shandianshuo.png" alt="闪电说 logo" height="51"/></a>

[![GitHub Stars](https://img.shields.io/github/stars/sansan0/TrendRadar?style=flat-square&logo=github&color=yellow)](https://github.com/sansan0/TrendRadar/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/sansan0/TrendRadar?style=flat-square&logo=github&color=blue)](https://github.com/sansan0/TrendRadar/network/members)
[![License](https://img.shields.io/badge/license-GPL--3.0-blue.svg?style=flat-square)](LICENSE)
[![Version](https://img.shields.io/badge/version-v3.4.0-blue.svg)](https://github.com/sansan0/TrendRadar)
[![MCP](https://img.shields.io/badge/MCP-v1.0.3-green.svg)](https://github.com/sansan0/TrendRadar)

[![企业微信通知](https://img.shields.io/badge/企业微信-通知-00D4AA?style=flat-square)](https://work.weixin.qq.com/)
[![个人微信通知](https://img.shields.io/badge/个人微信-通知-00D4AA?style=flat-square)](https://weixin.qq.com/)
[![Telegram通知](https://img.shields.io/badge/Telegram-通知-00D4AA?style=flat-square)](https://telegram.org/)
[![dingtalk通知](https://img.shields.io/badge/钉钉-通知-00D4AA?style=flat-square)](#)
[![飞书通知](https://img.shields.io/badge/飞书-通知-00D4AA?style=flat-square)](https://www.feishu.cn/)
[![邮件通知](https://img.shields.io/badge/Email-通知-00D4AA?style=flat-square)](#)
[![ntfy通知](https://img.shields.io/badge/ntfy-通知-00D4AA?style=flat-square)](https://github.com/binwiederhier/ntfy)
[![Bark通知](https://img.shields.io/badge/Bark-通知-00D4AA?style=flat-square)](https://github.com/Finb/Bark)
[![Slack通知](https://img.shields.io/badge/Slack-通知-00D4AA?style=flat-square)](https://slack.com/)

[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-自动化-2088FF?style=flat-square&logo=github-actions&logoColor=white)](https://github.com/sansan0/TrendRadar)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-部署-4285F4?style=flat-square&logo=github&logoColor=white)](https://sansan0.github.io/TrendRadar)
[![Docker](https://img.shields.io/badge/Docker-部署-2496ED?style=flat-square&logo=docker&logoColor=white)](https://hub.docker.com/r/wantcat/trendradar)
[![MCP Support](https://img.shields.io/badge/MCP-AI分析支持-FF6B6B?style=flat-square&logo=ai&logoColor=white)](https://modelcontextprotocol.io/)

</div>
