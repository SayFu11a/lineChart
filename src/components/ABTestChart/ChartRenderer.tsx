import {
  LineChart,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  Area,
} from "recharts";

import type {
  ChartPoint,
  VariationKey,
  Theme,
  LineStyle,
} from "../../types/chart";
import { VARIATION_NAMES, THEMES } from "../../constants/chart";
import { ChartTooltip } from "../ChartTooltip";

type Props = {
  data: ChartPoint[];
  selected: Record<VariationKey, boolean>;
  lineStyle: LineStyle;
  theme: Theme;
  xDomain: [number, number];
  tickFormatter: (timestamp: number) => string;
  isAnimationActive: boolean;
};

const VARIATIONS: VariationKey[] = [
  "original",
  "variationA",
  "variationB",
  "variationC",
];

export const ChartRenderer = ({
  data,
  selected,
  lineStyle,
  theme,
  xDomain,
  tickFormatter,
  isAnimationActive,
}: Props) => {
  const colors = THEMES[theme];
  const curveType = lineStyle === "smooth" ? "monotone" : "linear";

  const commonChartProps = {
    data,
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

  if (lineStyle === "area") {
    return (
      <AreaChart {...commonChartProps}>
        <XAxis {...xAxisProps} />
        <YAxis {...yAxisProps} />
        <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
        <Tooltip {...tooltipProps} />

        {VARIATIONS.map(
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

  return (
    <LineChart {...commonChartProps}>
      <XAxis {...xAxisProps} />
      <YAxis {...yAxisProps} />
      <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
      <Tooltip {...tooltipProps} />

      {VARIATIONS.map(
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
