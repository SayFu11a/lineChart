import type {
  SelectedMap,
  TimeRange,
  Theme,
  LineStyle,
} from "../../types/chart";
import { THEMES } from "../../constants/chart";

import { VariationsSelector } from "../VariationsSelector";
import { TimeRangeSelector } from "../TimeRangeSelector";
import { LineStyleSelector } from "../LineStyleSelector";

import styles from "./ABTestChart.module.css";

type Props = {
  // Селекторы
  selected: SelectedMap;
  onSelectedChange: (next: SelectedMap) => void;
  timeRange: TimeRange;
  onTimeRangeChange: (next: TimeRange) => void;
  lineStyle: LineStyle;
  onLineStyleChange: (next: LineStyle) => void;

  // Тема
  theme: Theme;
  onToggleTheme: () => void;

  // Зум
  isZoomedIn: boolean;
  isMaxZoom: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;

  // Экспорт
  onExport: () => void;
};

export const ChartControls = ({
  selected,
  onSelectedChange,
  timeRange,
  onTimeRangeChange,
  lineStyle,
  onLineStyleChange,
  theme,
  onToggleTheme,
  isZoomedIn,
  isMaxZoom,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onExport,
}: Props) => {
  const colors = THEMES[theme];

  const buttonStyle = (disabled: boolean) => ({
    padding: "4px 8px",
    borderRadius: 4,
    border: `1px solid ${colors.border}`,
    background: disabled ? colors.grid : colors.cardBg,
    color: colors.text,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
  });

  const exportButtonStyle = {
    padding: "4px 8px",
    borderRadius: 4,
    border: `1px solid ${colors.border}`,
    background: colors.cardBg,
    color: colors.text,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  };

  return (
    <div className={styles.controls}>
      <VariationsSelector
        selected={selected}
        onChange={onSelectedChange}
        theme={theme}
      />
      <TimeRangeSelector
        value={timeRange}
        onChange={onTimeRangeChange}
        theme={theme}
      />

      <div className={styles.rightControls}>
        <button
          className={styles.themeButton}
          type="button"
          onClick={onToggleTheme}
          style={{
            border: `1px solid ${colors.border}`,
            background: colors.cardBg,
          }}
          title={
            theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
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
          onChange={onLineStyleChange}
          theme={theme}
        />

        <button
          type="button"
          onClick={onZoomOut}
          disabled={!isZoomedIn}
          style={buttonStyle(!isZoomedIn)}
          title="Zoom out"
        >
          –
        </button>
        <button
          type="button"
          onClick={onZoomIn}
          disabled={isMaxZoom}
          style={buttonStyle(isMaxZoom)}
          title="Zoom in"
        >
          +
        </button>
        <button
          type="button"
          onClick={onResetZoom}
          disabled={!isZoomedIn}
          style={buttonStyle(!isZoomedIn)}
          title="Reset zoom"
        >
          ⟳
        </button>

        <button
          type="button"
          onClick={onExport}
          style={exportButtonStyle}
          title="Export to PNG"
        >
          📷 Export
        </button>
      </div>
    </div>
  );
};
