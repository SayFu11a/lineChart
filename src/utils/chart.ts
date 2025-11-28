// src/utils/chart.ts

import type { ChartPoint, SelectedMap, VariationKey } from "../types/chart";

// Расчёт конверсии
export const calcRate = (
  visits: number | undefined,
  conv: number | undefined
): number | null => {
  if (!visits || visits === 0 || conv == null) return null;
  return (conv / visits) * 100;
};

// Получаем активные ключи вариаций
export const getActiveKeys = (selected: SelectedMap): VariationKey[] => {
  const keys: VariationKey[] = [];
  if (selected.original) keys.push("original");
  if (selected.variationA) keys.push("variationA");
  if (selected.variationB) keys.push("variationB");
  if (selected.variationC) keys.push("variationC");
  return keys;
};

// Фильтруем данные — оставляем только точки где есть хотя бы одно значение
export const filterDataBySelection = (
  data: ChartPoint[],
  selected: SelectedMap
): ChartPoint[] => {
  const activeKeys = getActiveKeys(selected);

  if (activeKeys.length === 0) return data;

  let startIndex = -1;
  let endIndex = -1;

  for (let i = 0; i < data.length; i++) {
    const point = data[i];
    const hasValue = activeKeys.some((key) => point[key] !== null);

    if (hasValue) {
      if (startIndex === -1) startIndex = i;
      endIndex = i;
    }
  }

  if (startIndex === -1) return data;

  return data.slice(startIndex, endIndex + 1);
};

// Форматирование даты для оси X
export const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleDateString("en-CA");
};

// Получаем номер недели в году
export const getWeekNumber = (date: Date): number => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor(
    (date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)
  );
  return Math.ceil((days + startOfYear.getDay() + 1) / 7);
};

// Получаем ключ недели (год-неделя)
export const getWeekKey = (timestamp: number): string => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const week = getWeekNumber(date);
  return `${year}-W${week.toString().padStart(2, "0")}`;
};

// Форматирование недели для оси X
export const formatWeek = (timestamp: number): string => {
  const date = new Date(timestamp);
  const weekNum = getWeekNumber(date);
  return `W${weekNum}`;
};

// Агрегируем данные по неделям
export const aggregateByWeek = (data: ChartPoint[]): ChartPoint[] => {
  const weekMap = new Map<
    string,
    {
      dates: number[];
      original: number[];
      variationA: number[];
      variationB: number[];
      variationC: number[];
    }
  >();

  for (const point of data) {
    const weekKey = getWeekKey(point.date);

    if (!weekMap.has(weekKey)) {
      weekMap.set(weekKey, {
        dates: [],
        original: [],
        variationA: [],
        variationB: [],
        variationC: [],
      });
    }

    const week = weekMap.get(weekKey)!;
    week.dates.push(point.date);

    if (point.original !== null) week.original.push(point.original);
    if (point.variationA !== null) week.variationA.push(point.variationA);
    if (point.variationB !== null) week.variationB.push(point.variationB);
    if (point.variationC !== null) week.variationC.push(point.variationC);
  }

  const calcAverage = (arr: number[]): number | null => {
    if (arr.length === 0) return null;
    return arr.reduce((sum, v) => sum + v, 0) / arr.length;
  };

  const result: ChartPoint[] = [];

  for (const [, week] of weekMap) {
    const firstDate = Math.min(...week.dates);

    result.push({
      date: firstDate,
      original: calcAverage(week.original),
      variationA: calcAverage(week.variationA),
      variationB: calcAverage(week.variationB),
      variationC: calcAverage(week.variationC),
    });
  }

  return result.sort((a, b) => a.date - b.date);
};
