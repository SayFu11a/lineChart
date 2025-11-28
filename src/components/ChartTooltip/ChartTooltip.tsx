// import type { TooltipProps } from "recharts";

import type { Payload } from "recharts/types/component/DefaultTooltipContent";

// type ValueType = number | null;
// type NameType = string;
type Theme = "light" | "dark";

const THEME_STYLES = {
  light: {
    bg: "#ffffff",
    border: "#e5e7eb",
    text: "#111827",
    textSecondary: "#6b7280",
  },
  dark: {
    bg: "#1e293b",
    border: "#334155",
    text: "#f1f5f9",
    textSecondary: "#94a3b8",
  },
};

type ChartTooltipProps = {
  active?: boolean;
  label?: string | number | Date;
  payload?: Payload<number, string>[];
  theme?: Theme;
};

export const ChartTooltip = ({
  active,
  label,
  payload,
  theme = "light",
}: ChartTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const styles = THEME_STYLES[theme];

  let formattedLabel: string;
  if (label instanceof Date) {
    formattedLabel = label.toISOString().slice(0, 10);
  } else if (typeof label === "number") {
    formattedLabel = new Date(label).toISOString().slice(0, 10);
  } else {
    formattedLabel = String(label ?? "");
  }

  const items = [...payload]
    .filter((p) => typeof p.value === "number")
    .sort((a, b) => (b.value as number) - (a.value as number));

  const winnerKey = items[0]?.dataKey;

  return (
    <div
      style={{
        background: styles.bg,
        border: `1px solid ${styles.border}`,
        borderRadius: "8px",
        padding: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        minWidth: "180px",
      }}
    >
      <div
        style={{
          color: styles.textSecondary,
          fontSize: "12px",
          marginBottom: "8px",
          borderBottom: `1px solid ${styles.border}`,
          paddingBottom: "8px",
        }}
      >
        {formattedLabel}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {items.map((item) => {
          const value = item.value as number;
          const isWinner = item.dataKey === winnerKey;

          return (
            <div
              key={item.dataKey as string}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: item.color || "#4b5563",
                  }}
                />
                <span style={{ color: styles.text, fontSize: "13px" }}>
                  {item.name}
                  {isWinner && <span style={{ marginLeft: "4px" }}>🏆</span>}
                </span>
              </div>
              <span
                style={{
                  color: styles.text,
                  fontWeight: 600,
                  fontSize: "13px",
                }}
              >
                {value.toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
