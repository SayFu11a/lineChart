import { useState, useRef, useEffect } from "react";
import styles from "./TimeRangeSelector.module.css";

type TimeRange = "day" | "week";
type Theme = "light" | "dark";

type Props = {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
  theme?: Theme;
};

const labels: Record<TimeRange, string> = {
  day: "Day",
  week: "Week",
};

export const TimeRangeSelector = ({
  value,
  onChange,
  theme = "light",
}: Props) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const options: TimeRange[] = ["day", "week"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleSelect = (option: TimeRange) => {
    onChange(option);
    setOpen(false); // закрываем после выбора
  };

  const themeClass = theme === "dark" ? styles.dark : "";

  return (
    <div className={`${styles.wrapper} ${themeClass}`} ref={wrapperRef}>
      <button
        type="button"
        className={styles.button}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{labels[value]}</span>
        <span className={styles.caret}>▾</span>
      </button>

      {open && (
        <div className={styles.dropdown}>
          {options.map((option) => (
            <label
              key={option}
              className={`${styles.option} ${
                value === option ? styles.selected : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              <input
                type="radio"
                name="timeRange"
                checked={value === option}
                onChange={() => handleSelect(option)}
              />
              <span>{labels[option]}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
