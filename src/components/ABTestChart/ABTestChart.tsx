import { useState, useMemo } from "react";
import { ResponsiveContainer } from "recharts";

import type {
  SelectedMap,
  TimeRange,
  Theme,
  LineStyle,
} from "../../types/chart";

import { THEMES } from "../../constants/chart";

import {
  filterDataBySelection,
  formatDate,
  formatWeek,
} from "../../utils/chart";

import { useChartZoom } from "../../hooks/useChartZoom";
import { useExportChart } from "../../hooks/useExportChart";

import { dailyData, weeklyData } from "../../data/chartData";

import { ChartRenderer } from "./ChartRenderer";
import { ChartControls } from "./ChartControls";

import styles from "./ABTestChart.module.css";

const ABTestChart = ({
  isAnimationActive = true,
}: {
  isAnimationActive?: boolean;
}) => {
  const [selected, setSelected] = useState<SelectedMap>({
    original: true,
    variationA: true,
    variationB: true,
    variationC: true,
  });

  const [timeRange, setTimeRange] = useState<TimeRange>("day");
  const [lineStyle, setLineStyle] = useState<LineStyle>("line");
  const [theme, setTheme] = useState<Theme>("light");

  // Хук для экспорта
  const { chartRef, exportToPng } = useExportChart();

  // Получаем текущую палитру
  const colors = THEMES[theme];

  const baseData = timeRange === "day" ? dailyData : weeklyData;

  // Мемоизируем domain чтобы не пересчитывать на каждый рендер
  const filteredData = useMemo(
    () => filterDataBySelection(baseData, selected),
    [baseData, selected]
  );

  // Базовый domain (полный диапазон данных)
  const fullDomain = useMemo((): [number, number] => {
    if (filteredData.length === 0) {
      return [baseData[0].date, baseData[baseData.length - 1].date];
    }
    return [filteredData[0].date, filteredData[filteredData.length - 1].date];
  }, [filteredData, baseData]);

  const {
    xDomain,
    isZoomedIn,
    isMaxZoom,
    handleZoomIn,
    handleZoomOut,
    handleResetZoom,
    resetZoom,
  } = useChartZoom({ fullDomain });

  const handleSelectedChange = (next: SelectedMap) => {
    setSelected(next);
    resetZoom(); // сброс зума при смене вариаций
  };

  const handleTimeRangeChange = (next: TimeRange) => {
    setTimeRange(next);
    resetZoom(); // сброс зума при смене Day/Week
  };

  // ==================== THEME TOGGLE ====================
  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const tickFormatter = timeRange === "day" ? formatDate : formatWeek;

  return (
    <div
      className={styles.container}
      style={{
        background: colors.bg,
      }}
    >
      <ChartControls
        selected={selected}
        onSelectedChange={handleSelectedChange}
        timeRange={timeRange}
        onTimeRangeChange={handleTimeRangeChange}
        lineStyle={lineStyle}
        onLineStyleChange={setLineStyle}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        isZoomedIn={isZoomedIn}
        isMaxZoom={isMaxZoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetZoom={handleResetZoom}
        onExport={exportToPng}
      />
      <div ref={chartRef}>
        <ResponsiveContainer width="100%" height={400} minWidth={300}>
          <ChartRenderer
            data={filteredData}
            selected={selected}
            lineStyle={lineStyle}
            theme={theme}
            xDomain={xDomain}
            tickFormatter={tickFormatter}
            isAnimationActive={isAnimationActive}
          />
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ABTestChart;
