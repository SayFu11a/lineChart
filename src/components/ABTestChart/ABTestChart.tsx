import { useState, useMemo } from "react";
import {
  LineChart,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  Area,
  ResponsiveContainer,
} from "recharts";

import type {
  SelectedMap,
  TimeRange,
  VariationKey,
  Theme,
} from "../../types/chart";

import { VARIATION_NAMES, THEMES } from "../../constants/chart";

import {
  filterDataBySelection,
  formatDate,
  formatWeek,
} from "../../utils/chart";

import { useChartZoom } from "../../hooks/useChartZoom";

import { dailyData, weeklyData } from "../../data/chartData";

import { VariationsSelector } from "../VariationsSelector";
import { TimeRangeSelector } from "../TimeRangeSelector";
import { LineStyleSelector } from "../LineStyleSelector/";
import type { LineStyle } from "../LineStyleSelector/LineStyleSelector";

import { ChartTooltip } from "../ChartTooltip";

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

  const curveType = lineStyle === "smooth" ? "monotone" : "linear";

  const tickFormatter = timeRange === "day" ? formatDate : formatWeek;

  // Общие пропсы для осей и сетки
  const commonChartProps = {
    data: filteredData,
    margin: { top: 5, right: 30, left: 20, bottom: 5 },
  };

  const xAxisProps = {
    dataKey: "date",
    type: "number" as const,
    domain: xDomain,
    scale: "time" as const,
    tickFormatter,
    allowDataOverflow: true,
    stroke: colors.axis,
    tick: { fill: colors.axis },
  };

  const yAxisProps = {
    tickFormatter: (v: number) => `${v.toFixed(0)}%`,
    domain: ["auto" as const, "auto" as const],
    stroke: colors.axis,
    tick: { fill: colors.axis },
  };

  const tooltipProps = {
    content: <ChartTooltip theme={theme} />,
    cursor: {
      stroke: colors.grid,
      strokeWidth: 1,
      strokeDasharray: "3 3",
    },
  };

  // Варианты для рендера
  const variations: VariationKey[] = [
    "original",
    "variationA",
    "variationB",
    "variationC",
  ];

  // ==================== RENDER CHART ====================

  const renderChart = () => {
    if (lineStyle === "area") {
      return (
        <AreaChart {...commonChartProps}>
          <XAxis {...xAxisProps} />
          <YAxis {...yAxisProps} />
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
          <Tooltip {...tooltipProps} />

          {variations.map(
            (key) =>
              selected[key] && (
                <Area
                  key={key}
                  name={VARIATION_NAMES[key]}
                  type={curveType}
                  dataKey={key}
                  stroke={colors[key]}
                  fill={colors[key]}
                  fillOpacity={0.2}
                  isAnimationActive={isAnimationActive}
                  dot={false}
                  connectNulls={false}
                />
              )
          )}
        </AreaChart>
      );
    }

    // Line или Smooth
    return (
      <LineChart {...commonChartProps}>
        <XAxis {...xAxisProps} />
        <YAxis {...yAxisProps} />
        <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
        <Tooltip {...tooltipProps} />

        {variations.map(
          (key) =>
            selected[key] && (
              <Line
                key={key}
                name={VARIATION_NAMES[key]}
                type={curveType}
                dataKey={key}
                stroke={colors[key]}
                isAnimationActive={isAnimationActive}
                dot={false}
                connectNulls={false}
              />
            )
        )}
      </LineChart>
    );
  };

  // ==================== BUTTON STYLES ====================
  const buttonStyle = (disabled: boolean) => ({
    padding: "4px 8px",
    borderRadius: 4,
    border: `1px solid ${colors.border}`,
    background: disabled ? colors.grid : colors.cardBg,
    color: colors.text,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
  });

  return (
    <div
      className={styles.container}
      style={{
        background: colors.bg,
      }}
    >
      <div className={styles.controls}>
        <VariationsSelector
          selected={selected}
          onChange={handleSelectedChange}
          theme={theme}
        />
        <TimeRangeSelector
          value={timeRange}
          onChange={handleTimeRangeChange}
          theme={theme}
        />

        <div className={styles.rightControls}>
          <button
            className={styles.themeButton}
            type="button"
            onClick={handleToggleTheme}
            style={{
              border: `1px solid ${colors.border}`,
              background: colors.cardBg,
            }}
            title={
              theme === "dark"
                ? "Switch to light theme"
                : "Switch to dark theme"
            }
          >
            {theme === "dark" ? (
              <span className={styles.sunIcon}>☀️</span>
            ) : (
              <span
                className={styles.moonIcon}
                style={{
                  boxShadow: `4px -2px 0 0 ${colors.text}`,
                }}
              />
            )}
          </button>

          <LineStyleSelector
            style={{ marginRight: "10px" }}
            value={lineStyle}
            onChange={setLineStyle}
            theme={theme}
          />
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={!isZoomedIn}
            style={buttonStyle(!isZoomedIn)}
            title="Zoom out"
          >
            –
          </button>
          <button
            type="button"
            onClick={handleZoomIn}
            disabled={isMaxZoom}
            style={buttonStyle(isMaxZoom)}
            title="Zoom in"
          >
            +
          </button>
          <button
            type="button"
            onClick={handleResetZoom}
            disabled={!isZoomedIn}
            style={buttonStyle(!isZoomedIn)}
            title="Reset zoom"
          >
            ⟳
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400} minWidth={300}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default ABTestChart;
