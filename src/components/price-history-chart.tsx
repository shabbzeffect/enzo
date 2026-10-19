import { Price } from "@/components/ui/price";
import { Badge } from "@/components/ui/badge";
import { formatKes, getPriceChange, type PriceHistory } from "@/lib/data/demo";

export function PriceHistoryChart({ history }: { history: PriceHistory | undefined }) {
  if (!history || history.points.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-cream-50 p-4 text-sm text-muted">
        No price history recorded for this demo product yet.
      </div>
    );
  }

  const change = getPriceChange(history);
  const prices = history.points.map((p) => p.priceKes).filter((p): p is number => p !== null);
  const min = prices.length > 0 ? Math.min(...prices) : 0;
  const max = prices.length > 0 ? Math.max(...prices) : 0;
  const range = max - min;

  const height = 80;
  const width = 100;

  const points = history.points.map((p, i) => {
    const x = history.points.length === 1 ? width / 2 : (i / (history.points.length - 1)) * width;
    const y =
      range === 0
        ? height / 2
        : height - ((p.priceKes ?? min) - min) / range * (height - 8) - 4;
    return { x, y, point: p };
  });

  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="rounded-xl border border-border bg-white p-4 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">Price history</h4>
        {change.direction !== "none" && change.changeKes !== null && (
          <Badge variant={change.direction === "down" ? "success" : change.direction === "up" ? "warning" : "subtle"}>
            {change.direction === "down"
              ? `↓ ${formatKes(Math.abs(change.changeKes))} since first check`
              : change.direction === "up"
              ? `↑ ${formatKes(change.changeKes)} since first check`
              : "No change since first check"}
          </Badge>
        )}
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-20"
        preserveAspectRatio="none"
        role="img"
        aria-label={`Price history chart: ${history.points.length} data points from ${formatKes(history.points[0].priceKes)} to ${formatKes(history.points[history.points.length - 1].priceKes)}`}
      >
        <polyline
          points={polyline}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-primary"
          vectorEffect="non-scaling-stroke"
        />
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="2"
            className="fill-primary"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      <ul className="space-y-1.5">
        {history.points.map((p, i) => {
          const isFirst = i === 0;
          const prev = i > 0 ? history.points[i - 1].priceKes : null;
          const delta = prev !== null && p.priceKes !== null && prev !== null ? p.priceKes - prev : null;
          return (
            <li key={i} className="flex items-center justify-between text-xs">
              <span className="text-muted">{new Date(p.date).toLocaleDateString("en-KE")}</span>
              <span className="flex items-center gap-2">
                <Price amount={p.priceKes} onRequest={p.priceKes === null} size="sm" />
                {delta !== null && delta !== 0 && (
                  <span className={delta < 0 ? "text-success" : "text-warning"}>
                    {delta < 0 ? "▼" : "▲"} {Math.abs(delta).toLocaleString("en-KE")}
                  </span>
                )}
                {isFirst && <Badge variant="subtle">First check</Badge>}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
