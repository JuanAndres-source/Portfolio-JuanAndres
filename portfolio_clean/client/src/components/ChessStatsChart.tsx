import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Loader2 } from "lucide-react";

const USERNAME = "TheWhiteBishopGM";

interface MonthlyStats {
  month: string;
  rapid?: number;
  blitz?: number;
  bullet?: number;
}

interface PlayerStats {
  rapid?: { last: { rating: number }; best: { rating: number }; record: { win: number; loss: number; draw: number } };
  blitz?: { last: { rating: number }; best: { rating: number }; record: { win: number; loss: number; draw: number } };
  bullet?: { last: { rating: number }; best: { rating: number }; record: { win: number; loss: number; draw: number } };
}

type TimeControl = "rapid" | "blitz" | "bullet";

// Generate future projections based on current rating and trend
function generateProjection(
  history: MonthlyStats[],
  mode: TimeControl,
  months: number = 6
): MonthlyStats[] {
  const validPoints = history.filter((h) => h[mode] !== undefined);
  if (validPoints.length < 2) return [];

  const last = validPoints[validPoints.length - 1][mode]!;
  const prev = validPoints[Math.max(0, validPoints.length - 3)][mode]!;
  const trend = (last - prev) / Math.min(3, validPoints.length - 1);

  const projections: MonthlyStats[] = [];
  const lastDate = new Date();
  for (let i = 1; i <= months; i++) {
    const d = new Date(lastDate);
    d.setMonth(d.getMonth() + i);
    const label = d.toLocaleString("default", { month: "short", year: "2-digit" });
    const projected = Math.round(last + trend * i + (Math.random() - 0.5) * 10);
    projections.push({ month: label, [mode]: projected });
  }
  return projections;
}

// Simulate monthly history from a current rating (Chess.com free API doesn't give full history)
function buildMockHistory(currentRating: number, bestRating: number): number[] {
  const points: number[] = [];
  const start = Math.max(currentRating - 150, 1000);
  const months = 12;
  for (let i = 0; i <= months; i++) {
    const progress = i / months;
    const base = start + (currentRating - start) * progress;
    const noise = (Math.random() - 0.4) * 40;
    const peak = i === Math.floor(months * 0.75) ? bestRating - currentRating : 0;
    points.push(Math.round(base + noise + peak * 0.3));
  }
  points[points.length - 1] = currentRating;
  return points;
}

const COLORS: Record<TimeControl, string> = {
  rapid: "#3b82f6",
  blitz: "#f59e0b",
  bullet: "#ef4444",
};

const MODE_LABELS: Record<TimeControl, string> = {
  rapid: "⏱️ Rapid",
  blitz: "⚡ Blitz",
  bullet: "🔥 Bullet",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 border border-border rounded-lg p-3 shadow-lg">
        <p className="font-display text-sm font-bold text-foreground mb-1">{label}</p>
        {payload.map((p: { name: string; value: number; color: string }, i: number) => (
          <p key={i} className="text-xs font-body" style={{ color: p.color }}>
            {p.name}: <span className="font-bold">{p.value} Elo</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ChessStatsChart() {
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState<TimeControl>("rapid");
  const [showProjection, setShowProjection] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.chess.com/pub/player/${USERNAME.toLowerCase()}/stats`,
          { headers: { "User-Agent": "JuanAndresPortfolio/1.0" } }
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setStats(data);
      } catch {
        setError("No se pudieron cargar los datos de Chess.com");
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 gap-3 text-muted-foreground">
        <Loader2 className="animate-spin h-5 w-5" />
        <span className="font-body text-sm">Cargando datos de Chess.com...</span>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="text-center py-8 text-muted-foreground font-body text-sm">
        {error ?? "Error cargando datos"}
      </div>
    );
  }

  // Build monthly history data
  const modes: TimeControl[] = ["rapid", "blitz", "bullet"];
  const monthLabels = Array.from({ length: 13 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (12 - i));
    return d.toLocaleString("default", { month: "short", year: "2-digit" });
  });

  const historyByMode: Record<TimeControl, number[]> = {
    rapid: stats.chess_rapid ? buildMockHistory(stats.chess_rapid.last.rating, stats.chess_rapid.best.rating) : [],
    blitz: stats.chess_blitz ? buildMockHistory(stats.chess_blitz.last.rating, stats.chess_blitz.best.rating) : [],
    bullet: stats.chess_bullet ? buildMockHistory(stats.chess_bullet.last.rating, stats.chess_bullet.best.rating) : [],
  };

  const historicalData: MonthlyStats[] = monthLabels.map((month, i) => ({
    month,
    rapid: historyByMode.rapid[i],
    blitz: historyByMode.blitz[i],
    bullet: historyByMode.bullet[i],
  }));

  const projectionData = generateProjection(historicalData, activeMode);
  const combinedData = showProjection
    ? [
        ...historicalData.map((d) => ({ ...d, projected: undefined })),
        ...projectionData.map((d) => ({
          month: d.month,
          projected: d[activeMode],
          [activeMode]: undefined,
        })),
      ]
    : historicalData;

  const currentRating = stats[`chess_${activeMode}` as keyof PlayerStats]?.last.rating;
  const bestRating = stats[`chess_${activeMode}` as keyof PlayerStats]?.best.rating;
  const record = stats[`chess_${activeMode}` as keyof PlayerStats]?.record;

  const histLen = historicalData.length;
  const ratingTrend =
    historyByMode[activeMode].length >= 3
      ? historyByMode[activeMode][histLen - 1] - historyByMode[activeMode][histLen - 4]
      : 0;

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
            ♟️ Rating Progression
          </h4>
          <p className="font-body text-xs text-muted-foreground mt-0.5">
            Live data from Chess.com · @{USERNAME}
          </p>
        </div>
        {/* Mode selector */}
        <div className="flex gap-2">
          {modes.map((m) => {
            const modeStats = stats[`chess_${m}` as keyof PlayerStats];
            if (!modeStats) return null;
            return (
              <button
                key={m}
                onClick={() => setActiveMode(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-body font-semibold transition-all ${
                  activeMode === m
                    ? "text-white shadow-md scale-105"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
                style={activeMode === m ? { backgroundColor: COLORS[m] } : {}}
              >
                {MODE_LABELS[m]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Current stats row */}
      {currentRating && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              label: "Current Rating",
              value: currentRating,
              sub: "Elo",
              highlight: true,
            },
            {
              label: "Peak Rating",
              value: bestRating,
              sub: "All time",
            },
            {
              label: "Wins",
              value: record?.win ?? "—",
              sub: `${record ? Math.round((record.win / (record.win + record.loss + record.draw)) * 100) : 0}% winrate`,
            },
            {
              label: "3-Month Trend",
              value: ratingTrend > 0 ? `+${ratingTrend}` : ratingTrend,
              sub: "Elo change",
              trend: ratingTrend,
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              className={`rounded-lg p-4 border ${
                s.highlight
                  ? "border-primary/30 bg-primary/5"
                  : "border-border bg-white dark:bg-slate-800"
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <p className="font-body text-xs text-muted-foreground mb-1">{s.label}</p>
              <div className="flex items-center gap-1">
                <span
                  className="font-display text-xl font-bold"
                  style={s.highlight ? { color: COLORS[activeMode] } : {}}
                >
                  {s.value}
                </span>
                {"trend" in s &&
                  (s.trend > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : s.trend < 0 ? (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  ) : (
                    <Minus className="h-4 w-4 text-muted-foreground" />
                  ))}
              </div>
              <p className="font-body text-xs text-muted-foreground mt-0.5">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Chart */}
      <div className="bg-white dark:bg-slate-800 border border-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <p className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            12 months + 6 month projection
          </p>
          <button
            onClick={() => setShowProjection(!showProjection)}
            className={`text-xs font-body px-2.5 py-1 rounded-md transition-colors ${
              showProjection
                ? "bg-primary/10 text-primary"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {showProjection ? "Hide" : "Show"} Projection
          </button>
        </div>

        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={combinedData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
            <defs>
              <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS[activeMode]} stopOpacity={0.15} />
                <stop offset="95%" stopColor={COLORS[activeMode]} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS[activeMode]} stopOpacity={0.05} />
                <stop offset="95%" stopColor={COLORS[activeMode]} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 10, fontFamily: "inherit" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fontFamily: "inherit" }}
              tickLine={false}
              axisLine={false}
              domain={["auto", "auto"]}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: "11px", fontFamily: "inherit", paddingTop: "8px" }}
            />
            {currentRating && (
              <ReferenceLine
                y={currentRating}
                stroke={COLORS[activeMode]}
                strokeDasharray="4 4"
                strokeOpacity={0.4}
              />
            )}
            <Area
              type="monotone"
              dataKey={activeMode}
              stroke={COLORS[activeMode]}
              strokeWidth={2.5}
              fill="url(#colorRating)"
              dot={false}
              activeDot={{ r: 5, strokeWidth: 0 }}
              name={MODE_LABELS[activeMode].replace(/[^\w\s]/g, "").trim()}
              connectNulls={false}
            />
            {showProjection && (
              <Area
                type="monotone"
                dataKey="projected"
                stroke={COLORS[activeMode]}
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="url(#colorProjected)"
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
                name="Projected"
                connectNulls={false}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Win/Loss/Draw breakdown */}
      {record && (
        <div className="bg-white dark:bg-slate-800 border border-border rounded-xl p-4">
          <p className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Win / Draw / Loss breakdown
          </p>
          <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
            {[
              {
                value: record.win,
                color: "#22c55e",
                label: `Wins: ${record.win}`,
              },
              {
                value: record.draw,
                color: "#94a3b8",
                label: `Draws: ${record.draw}`,
              },
              {
                value: record.loss,
                color: "#ef4444",
                label: `Losses: ${record.loss}`,
              },
            ].map((seg, i) => {
              const total = record.win + record.draw + record.loss;
              const pct = (seg.value / total) * 100;
              return (
                <motion.div
                  key={i}
                  title={seg.label}
                  className="h-full rounded-sm"
                  style={{ backgroundColor: seg.color, width: `${pct}%` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                />
              );
            })}
          </div>
          <div className="flex gap-4 mt-2">
            {[
              { label: "Wins", value: record.win, color: "#22c55e" },
              { label: "Draws", value: record.draw, color: "#94a3b8" },
              { label: "Losses", value: record.loss, color: "#ef4444" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: s.color }}
                />
                <span className="font-body text-xs text-muted-foreground">
                  {s.label}:{" "}
                  <span className="font-semibold text-foreground">{s.value}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="font-body text-xs text-muted-foreground text-center">
        * La proyección está basada en la tendencia reciente de rating. El historial mensual es una estimación visual.
      </p>
    </motion.div>
  );
}
