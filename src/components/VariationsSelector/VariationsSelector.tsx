// VariationsSelector.tsx
import { useState, useRef, useEffect } from "react";
import styles from "./VariationsSelector.module.css";

type SelectedMap = {
  original: boolean;
  variationA: boolean;
  variationB: boolean;
  variationC: boolean;
};

type Theme = "light" | "dark";

type Props = {
  selected: SelectedMap;
  onChange: (next: SelectedMap) => void;
  theme?: Theme;
};

export const VariationsSelector = ({
  selected,
  onChange,
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

    // Добавляем listener только когда dropdown открыт
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const keys: (keyof SelectedMap)[] = [
    "original",
    "variationA",
    "variationB",
    "variationC",
  ];

  const labels: Record<keyof SelectedMap, string> = {
    original: "Original",
    variationA: "Variation A",
    variationB: "Variation B",
    variationC: "Variation C",
  };

  const handleToggle = (key: keyof SelectedMap) => {
    const enabledCount = keys.filter((k) => selected[k]).length;
    // нельзя выключить последний true
    if (enabledCount === 1 && selected[key]) return;

    const next = { ...selected, [key]: !selected[key] };
    onChange(next);
  };

  const allSelected = keys.every((k) => selected[k]);
  const buttonLabel = allSelected
    ? "All variations selected"
    : "Custom selection";

  const themeClass = theme === "dark" ? styles.dark : "";

  return (
    <div className={`${styles.wrapper} ${themeClass}`} ref={wrapperRef}>
      <button
        type="button"
        className={styles.button}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{buttonLabel}</span>
        <span className={styles.caret}>▾</span>
      </button>

      {open && (
        <div className={styles.dropdown}>
          {keys.map((key) => (
            <label key={key} className={styles.option}>
              <input
                type="checkbox"
                checked={selected[key]}
                onChange={() => handleToggle(key)}
              />
              <span>{labels[key]}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
