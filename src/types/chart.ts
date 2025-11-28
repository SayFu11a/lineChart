// src/types/chart.ts

export type ChartPoint = {
  date: number;
  original: number | null;
  variationA: number | null;
  variationB: number | null;
  variationC: number | null;
};

export type SelectedMap = {
  original: boolean;
  variationA: boolean;
  variationB: boolean;
  variationC: boolean;
};

export type TimeRange = "day" | "week";

export type VariationKey =
  | "original"
  | "variationA"
  | "variationB"
  | "variationC";

export type Theme = "light" | "dark";

export type VisitsMap = Record<string, number | undefined>;

export type ConversionsMap = Record<string, number | undefined>;
