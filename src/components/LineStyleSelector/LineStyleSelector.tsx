import { useState, useRef, useEffect } from "react";
import styles from "./LineStyleSelector.module.css";

export type LineStyle = "line" | "smooth" | "area";
type Theme = "light" | "dark";

type Props = {
  value: LineStyle;
  onChange: (value: LineStyle) => void;
  style?: React.CSSProperties;
  theme?: Theme;
};

const labels: Record<LineStyle, string> = {
  line: "Line",
  smooth: "Smooth",
  area: "Area",
};

export const LineStyleSelector = ({
  value,
  onChange,
  style,
  theme = "light",
}: Props) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Закрытие при клике вне компонента
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

  const options: LineStyle[] = ["line", "smooth", "area"];

  const handleSelect = (option: LineStyle) => {
    onChange(option);
    setOpen(false);
  };

  const themeClass = theme === "dark" ? styles.dark : "";

  return (
    <div
      className={`${styles.wrapper} ${themeClass}`}
      ref={wrapperRef}
      style={style}
    >
      <button
        type="button"
        className={styles.button}
        onClick={() => setOpen((v) => !v)}
      >
        <span>Line style: {labels[value]}</span>
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
                name="lineStyle"
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
