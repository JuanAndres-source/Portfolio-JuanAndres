import { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Activity, Trophy, Target } from "lucide-react";

// ─── Real data from Strava export ────────────────────────────────────────────
const MONTHLY_DATA = [
  { month: "Feb 23", km: 15.1, runs: 2, best_pace: 5.619 },
  { month: "Jul 23", km: 9.5, runs: 1, best_pace: 6.058 },
  { month: "Oct 23", km: 19.2, runs: 8, best_pace: 3.808 },
  { month: "Nov 23", km: 67.4, runs: 14, best_pace: 3.514 },
  { month: "Feb 24", km: 119.6, runs: 24, best_pace: 3.633 },
  { month: "Mar 24", km: 138.4, runs: 23, best_pace: 3.468 },
  { month: "May 24", km: 110.9, runs: 15, best_pace: 3.679 },
  { month: "Jun 24", km: 70.4, runs: 8, best_pace: 5.132 },
  { month: "Jul 24", km: 67.4, runs: 6, best_pace: 5.773 },
  { month: "Oct 24", km: 103.9, runs: 17, best_pace: 3.492 },
  { month: "Nov 24", km: 111.7, runs: 16, best_pace: 3.86 },
  { month: "Feb 25", km: 108.6, runs: 11, best_pace: 4.399 },
  { month: "Mar 25", km: 48.5, runs: 7, best_pace: 4.437 },
  { month: "May 25", km: 87.5, runs: 9, best_pace: 5.238 },
  { month: "Jun 25", km: 60.2, runs: 8, best_pace: 4.783 },
  { month: "Jul 25", km: 77.9, runs: 8, best_pace: 5.473 },
  { month: "Oct 25", km: 91.5, runs: 15, best_pace: 3.343 },
  { month: "Nov 25", km: 82.6, runs: 11, best_pace: 4.935 },
  { month: "Feb 26", km: 104.9, runs: 10, best_pace: 4.705 },
  { month: "Mar 26", km: 138.3, runs: 12, best_pace: 4.055 },
];

// Future projections (6 months)
const PROJECTIONS = [
  { month: "Abr 26", km: 120, runs: 10, best_pace: 4.1, projected: true },
  { month: "May 26", km: 130, runs: 12, best_pace: 4.0, projected: true },
  { month: "Jun 26", km: 110, runs: 10, best_pace: 3.95, projected: true },
  { month: "Jul 26", km: 90, runs: 8, best_pace: 4.0, projected: true },
  { month: "Oct 26", km: 115, runs: 12, best_pace: 3.85, projected: true },
  { month: "Nov 26", km: 125, runs: 13, best_pace: 3.75, projected: true },
];

const KEY_RACES = [
  { date: "Feb 24", name: "Carrera de Berja 2024", dist: 9.29, time: "45:50", pace: 4.93 },
  { date: "Mar 24", name: "Carrera Hortalizas El Ejido", dist: 11.07, time: "50:39", pace: 4.58 },
  { date: "May 24", name: "Carrera de la UAL", dist: 9.86, time: "45:30", pace: 4.61 },
  { date: "Oct 24", name: "Carrera Solidaria del Cerebro", dist: 5.84, time: "25:21", pace: 4.34 },
  { date: "Nov 24", name: "Media Maratón", dist: 21.75, time: "2:05:24", pace: 5.77 },
  { date: "Feb 25", name: "Carrera de Berja 2025", dist: 9.66, time: "43:44", pace: 4.53 },
  { date: "Jun 25", name: "11km de Vera", dist: 10.81, time: "51:42", pace: 4.78 },
  { date: "Oct 25", name: "Carrera del Cerebro", dist: 5.71, time: "23:38", pace: 4.14 },
  { date: "Mar 26", name: "Simulacro Media Maratón", dist: 16.76, time: "1:21:53", pace: 4.89 },
  { date: "Mar 26", name: "V Carrera del Autismo", dist: 4.78, time: "19:24", pace: 4.05 },
  { date: "Abr 26", name: "Media Maratón Almería 2026 🏅", dist: 21.28, time: "1:30:29", pace: 4.25 },
];

type ViewType = "volume" | "pace" | "races";

// Format pace: 4.25 → "4:15/km"
function formatPace(pace: number): string {
  const mins = Math.floor(pace);
  const secs = Math.round((pace - mins) * 60);
  return `${mins}:${secs.toString().padStart(2, "0")}/km`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VolumeTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0]?.payload;
    return (
      <div className="bg-white dark:bg-slate-800 border border-border rounded-lg p-3 shadow-lg">
        <p className="font-display text-sm font-bold text-foreground mb-1">{label}</p>
        <p className="text-xs font-body text-orange-500">
          Km: <span className="font-bold">{payload[0]?.value} km</span>
        </p>
        {d && (
          <p className="text-xs font-body text-muted-foreground">
            {d.runs} salidas · mejor {formatPace(d.best_pace)}
          </p>
        )}
        {d?.projected && (
          <p className="text-xs font-body text-orange-300 italic">Proyección estimada</p>
        )}
      </div>
    );
  }
  return null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PaceTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0]?.payload;
    return (
      <div className="bg-white dark:bg-slate-800 border border-border rounded-lg p-3 shadow-lg">
        <p className="font-display text-sm font-bold text-foreground mb-1">{label}</p>
        <p className="text-xs font-body text-orange-500">
          Mejor pace: <span className="font-bold">{formatPace(payload[0]?.value)}</span>
        </p>
        <p className="text-xs font-body text-muted-foreground">{d?.km} km ese mes</p>
        {d?.projected && (
          <p className="text-xs font-body text-orange-300 italic">Proyección estimada</p>
        )}
      </div>
    );
  }
  return null;
};

export default function RunningStatsChart() {
  const [view, setView] = useState<ViewType>("volume");
  const [showProjection, setShowProjection] = useState(true);

  const allVolumeData = showProjection
    ? [...MONTHLY_DATA, ...PROJECTIONS]
    : MONTHLY_DATA;

  const allPaceData = showProjection
    ? [...MONTHLY_DATA, ...PROJECTIONS]
    : MONTHLY_DATA;

  const totalKm = MONTHLY_DATA.reduce((s, m) => s + m.km, 0);
  const totalRuns = MONTHLY_DATA.reduce((s, m) => s + m.runs, 0);
  const bestPace = Math.min(...MONTHLY_DATA.map((m) => m.best_pace));
  const recentTrend =
    MONTHLY_DATA[MONTHLY_DATA.length - 1].best_pace -
    MONTHLY_DATA[MONTHLY_DATA.length - 4].best_pace;

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
            🏃 Running Progression
          </h4>
          <p className="font-body text-xs text-muted-foreground mt-0.5">
            225 actividades reales · Datos de Strava · {Math.round(totalKm)} km totales
          </p>
        </div>
        {/* View selector */}
        <div className="flex gap-2">
          {(["volume", "pace", "races"] as ViewType[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-body font-semibold transition-all ${
                view === v
                  ? "bg-orange-500 text-white shadow-md scale-105"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              }`}
            >
              {v === "volume" ? "📊 Volumen" : v === "pace" ? "⚡ Pace" : "🏅 Carreras"}
            </button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: Activity, label: "Total km", value: `${Math.round(totalKm)}`, sub: "km corridos", color: "text-orange-500" },
          { icon: Trophy, label: "PB Half", value: "1:29:38", sub: "Almería 2026", color: "text-yellow-500" },
          { icon: Trophy, label: "PB 5K", value: "19:18", sub: "V Carrera Autismo", color: "text-green-500" },
          {
            icon: TrendingUp,
            label: "Tendencia pace",
            value: recentTrend < 0 ? `${recentTrend.toFixed(2)}` : `+${recentTrend.toFixed(2)}`,
            sub: "últimos 3 meses",
            color: recentTrend < 0 ? "text-green-500" : "text-red-500",
            trend: recentTrend,
          },
        ].map((s, i) => (
          <motion.div
            key={i}
            className="rounded-lg p-4 border border-border bg-white dark:bg-slate-800"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <p className="font-body text-xs text-muted-foreground mb-1">{s.label}</p>
            <div className="flex items-center gap-1">
              <span className={`font-display text-xl font-bold ${s.color}`}>{s.value}</span>
              {"trend" in s &&
                (s.trend < 0 ? (
                  <TrendingDown className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingUp className="h-4 w-4 text-red-500" />
                ))}
            </div>
            <p className="font-body text-xs text-muted-foreground mt-0.5">{s.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Chart area */}
      <div className="bg-white dark:bg-slate-800 border border-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <p className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {view === "volume"
              ? "Km mensuales · historial + proyección"
              : view === "pace"
              ? "Mejor pace mensual (min/km) — menor es mejor"
              : "Carreras oficiales"}
          </p>
          {view !== "races" && (
            <button
              onClick={() => setShowProjection(!showProjection)}
              className={`text-xs font-body px-2.5 py-1 rounded-md transition-colors ${
                showProjection
                  ? "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {showProjection ? "Ocultar" : "Ver"} proyección
            </button>
          )}
        </div>

        {/* Volume chart */}
        {view === "volume" && (
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={allVolumeData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#fb923c" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient id="barGradProj" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#fb923c" stopOpacity={0.15} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} width={35} unit="km" />
              <Tooltip content={<VolumeTooltip />} />
              <ReferenceLine y={138.4} stroke="#f97316" strokeDasharray="4 4" strokeOpacity={0.4} label={{ value: "Pico", position: "right", fontSize: 10, fill: "#f97316" }} />
              <Bar dataKey="km" radius={[4, 4, 0, 0]}>
                {allVolumeData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.projected ? "url(#barGradProj)" : "url(#barGrad)"}
                    stroke={entry.projected ? "#f97316" : "none"}
                    strokeWidth={entry.projected ? 1 : 0}
                    strokeDasharray={entry.projected ? "3 3" : "0"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}

        {/* Pace chart */}
        {view === "pace" && (
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={allPaceData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
              <defs>
                <linearGradient id="paceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                width={42}
                domain={[3.0, 7.0]}
                reversed
                tickFormatter={(v) => formatPace(v)}
              />
              <Tooltip content={<PaceTooltip />} />
              <ReferenceLine y={4.25} stroke="#22c55e" strokeDasharray="4 4" strokeOpacity={0.6}
                label={{ value: "PB HM pace", position: "right", fontSize: 9, fill: "#22c55e" }} />
              <Area
                type="monotone"
                dataKey="best_pace"
                stroke="#f97316"
                strokeWidth={2.5}
                fill="url(#paceGrad)"
                dot={(props) => {
                  const { cx, cy, payload } = props;
                  if (payload.projected) {
                    return <circle key={props.key} cx={cx} cy={cy} r={3} fill="none" stroke="#f97316" strokeWidth={1.5} strokeDasharray="2 2" />;
                  }
                  return <circle key={props.key} cx={cx} cy={cy} r={3} fill="#f97316" stroke="white" strokeWidth={1.5} />;
                }}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}

        {/* Races list */}
        {view === "races" && (
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {KEY_RACES.map((race, i) => (
              <motion.div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 dark:bg-slate-700/50 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-display text-xs font-bold text-orange-500 w-12 shrink-0">{race.date}</span>
                  <div className="min-w-0">
                    <p className="font-body text-sm font-medium text-foreground truncate">{race.name}</p>
                    <p className="font-body text-xs text-muted-foreground">{race.dist} km</p>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <p className="font-display text-sm font-bold text-foreground">{race.time}</p>
                  <p className="font-body text-xs text-orange-500">{formatPace(race.pace)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* PB targets */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4">
        <p className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Target className="h-3.5 w-3.5" /> Objetivos futuros estimados
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: "5K", current: "19:18", target: "18:30", when: "Oct 2026", color: "text-green-600" },
            { label: "10K", current: "~40:00", target: "38:30", when: "Nov 2026", color: "text-blue-600" },
            { label: "½ Maratón", current: "1:29:38", target: "1:25:00", when: "Abr 2027", color: "text-orange-600" },
          ].map((t, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-white/60 dark:bg-slate-800/60 rounded-lg">
              <div>
                <p className="font-body text-xs text-muted-foreground">{t.label}</p>
                <p className="font-display text-sm font-bold text-foreground">{t.current}</p>
                <p className="font-body text-xs text-muted-foreground">{t.when}</p>
              </div>
              <div className="text-right">
                <p className="font-body text-xs text-muted-foreground">Objetivo</p>
                <p className={`font-display text-sm font-bold ${t.color}`}>{t.target}</p>
                <TrendingUp className={`h-3.5 w-3.5 ${t.color} ml-auto`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="font-body text-xs text-muted-foreground text-center">
        * 225 actividades analizadas desde Feb 2023 · Proyección basada en tendencia de entrenamiento real
      </p>
    </motion.div>
  );
}
