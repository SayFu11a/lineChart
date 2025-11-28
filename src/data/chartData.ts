// src/data/chartData.ts

import rawData from "../assets/data/ab-test-data.json";
import type { ChartPoint, VisitsMap, ConversionsMap } from "../types/chart";
import { ORIGINAL_ID, VAR_A_ID, VAR_B_ID, VAR_C_ID } from "../constants/chart";
import { calcRate, aggregateByWeek } from "../utils/chart";

// Дневные данные
export const dailyData: ChartPoint[] = rawData.data.map((day) => {
  const visits = day.visits as VisitsMap;
  const conv = day.conversions as ConversionsMap;

  return {
    date: new Date(day.date).getTime(),
    original: calcRate(visits[ORIGINAL_ID], conv[ORIGINAL_ID]),
    variationA: calcRate(visits[VAR_A_ID], conv[VAR_A_ID]),
    variationB: calcRate(visits[VAR_B_ID], conv[VAR_B_ID]),
    variationC: calcRate(visits[VAR_C_ID], conv[VAR_C_ID]),
  };
});

// Недельные данные (предвычисленные)
export const weeklyData: ChartPoint[] = aggregateByWeek(dailyData);
