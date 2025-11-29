import { useRef, useCallback } from "react";
import { toPng } from "html-to-image";

type Options = {
  backgroundColor?: string;
};

export const useExportChart = (options?: Options) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const backgroundColor = options?.backgroundColor ?? "#ffffff";

  const exportToPng = useCallback(async () => {
    if (!chartRef.current) return;

    try {
      const dataUrl = await toPng(chartRef.current, {
        backgroundColor,
        pixelRatio: 2,
        cacheBust: true,
      });

      const link = document.createElement("a");
      link.download = `ab-test-chart-${new Date()
        .toISOString()
        .slice(0, 10)}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to export chart:", error);
    }
  }, [backgroundColor]);

  return { chartRef, exportToPng };
};
