// src/hooks/useChartZoom.ts

import { useState, useCallback } from "react";
import {
  ZOOM_FACTOR,
  MIN_ZOOM_RANGE_DAYS,
  ONE_DAY_MS,
} from "../constants/chart";

type UseChartZoomProps = {
  fullDomain: [number, number];
};

type UseChartZoomReturn = {
  zoomDomain: [number, number] | null;
  xDomain: [number, number];
  isZoomedIn: boolean;
  isMaxZoom: boolean;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleResetZoom: () => void;
  resetZoom: () => void;
};

export const useChartZoom = ({
  fullDomain,
}: UseChartZoomProps): UseChartZoomReturn => {
  const [zoomDomain, setZoomDomain] = useState<[number, number] | null>(null);

  // Текущий domain (с учётом зума)
  const xDomain = zoomDomain ?? fullDomain;

  // Проверки для disable кнопок
  const isZoomedIn = zoomDomain !== null;

  const isMaxZoom = (() => {
    const [start, end] = xDomain;
    const range = end - start;
    return range <= MIN_ZOOM_RANGE_DAYS * ONE_DAY_MS;
  })();

  const handleZoomIn = useCallback(() => {
    const [start, end] = zoomDomain ?? fullDomain;
    const range = end - start;
    const minRange = MIN_ZOOM_RANGE_DAYS * ONE_DAY_MS;

    // Нельзя зумить меньше минимума
    if (range <= minRange) return;

    const shrink = range * ZOOM_FACTOR * 0.5;
    const newStart = start + shrink;
    const newEnd = end - shrink;

    // Проверяем что не вышли за минимум
    if (newEnd - newStart < minRange) {
      const center = (start + end) / 2;
      setZoomDomain([center - minRange / 2, center + minRange / 2]);
    } else {
      setZoomDomain([newStart, newEnd]);
    }
  }, [zoomDomain, fullDomain]);

  const handleZoomOut = useCallback(() => {
    const [start, end] = zoomDomain ?? fullDomain;
    const [fullStart, fullEnd] = fullDomain;
    const range = end - start;

    const expand = range * ZOOM_FACTOR * 0.5;
    const newStart = Math.max(fullStart, start - expand);
    const newEnd = Math.min(fullEnd, end + expand);

    // Если достигли полного диапазона — сбрасываем зум
    if (newStart <= fullStart && newEnd >= fullEnd) {
      setZoomDomain(null);
    } else {
      setZoomDomain([newStart, newEnd]);
    }
  }, [zoomDomain, fullDomain]);

  const handleResetZoom = useCallback(() => {
    setZoomDomain(null);
  }, []);

  const resetZoom = useCallback(() => {
    setZoomDomain(null);
  }, []);

  return {
    zoomDomain,
    xDomain,
    isZoomedIn,
    isMaxZoom,
    handleZoomIn,
    handleZoomOut,
    handleResetZoom,
    resetZoom,
  };
};
