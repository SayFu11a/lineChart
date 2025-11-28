// src/constants/chart.ts

import rawData from "../assets/data/ab-test-data.json";

export const ORIGINAL_ID = "0";
export const VAR_A_ID = String(rawData.variations[1].id ?? "10001");
export const VAR_B_ID = String(rawData.variations[2].id ?? "10002");
export const VAR_C_ID = String(rawData.variations[3].id ?? "10003");

export const ZOOM_FACTOR = 0.25;
export const MIN_ZOOM_RANGE_DAYS = 3;
export const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export const VARIATION_NAMES = {
  original: "Original",
  variationA: "Variation A",
  variationB: "Variation B",
  variationC: "Variation C",
} as const;

export const THEMES = {
  light: {
    bg: "#ffffff",
    cardBg: "#ffffff",
    text: "#111827",
    textSecondary: "#6b7280",
    border: "#e5e7eb",
    grid: "#e5e7eb",
    axis: "#6b7280",
    tooltipBg: "#ffffff",
    tooltipBorder: "#e5e7eb",
    original: "#555555",
    variationA: "#22C55E",
    variationB: "#3B82F6",
    variationC: "#8E44AD",
  },
  dark: {
    bg: "#020617",
    cardBg: "#0f172a",
    text: "#f1f5f9",
    textSecondary: "#94a3b8",
    border: "#334155",
    grid: "#1e293b",
    axis: "#94a3b8",
    tooltipBg: "#1e293b",
    tooltipBorder: "#334155",
    original: "#9ca3af",
    variationA: "#4ade80",
    variationB: "#60a5fa",
    variationC: "#c4b5fd",
  },
} as const;
