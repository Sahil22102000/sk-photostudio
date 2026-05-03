import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { RippleEvent } from "@/types/index";
import { useCallback, useEffect, useRef, useState } from "react";

interface StatTile {
  numericValue: number;
  displaySuffix: string;
  label: string;
  sublabel: string;
  icon: string;
  accentColor: string;
  isRating?: boolean;
}

const STATS: StatTile[] = [
  {
    numericValue: 1200,
    displaySuffix: "+",
    label: "Happy Customers",
    sublabel: "Families, professionals & businesses served with care",
    icon: "😊",
    accentColor: "oklch(0.65 0.18 75)",
  },
  {
    numericValue: 5000,
    displaySuffix: "+",
    label: "Photos Delivered",
    sublabel: "From passport prints to large-format poster prints",
    icon: "📸",
    accentColor: "oklch(0.58 0.15 70)",
  },
  {
    numericValue: 8,
    displaySuffix: "+",
    label: "Years Experience",
    sublabel: "Serving Khapri & New Khapri for 8+ years, since 2018",
    icon: "🏅",
    accentColor: "oklch(0.62 0.17 72)",
  },
  {
    numericValue: 50,
    displaySuffix: "",
    label: "5.0 Star Rating",
    sublabel: "29 verified Google reviews — consistently top-rated",
    icon: "⭐",
    accentColor: "oklch(0.65 0.18 75)",
    isRating: true,
  },
];

function FloatingShape({
  style,
  className,
}: { style: React.CSSProperties; className: string }) {
  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={style}
    />
  );
}

function useCounterAnim(target: number, isVisible: boolean, duration?: number) {
  const dur = duration ?? 2000;
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!isVisible || started.current) return;
    started.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / dur, 1);
      const t = 1 - progress;
      const eased = 1 - t * t * t;
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isVisible, target, dur]);

  return count;
}

function StatCard({
  stat,
  index,
  isVisible,
}: { stat: StatTile; index: number; isVisible: boolean }) {
  const [ripples, setRipples] = useState<RippleEvent[]>([]);
  const cardRef = useRef<HTMLButtonElement>(null);
  const [is3D, setIs3D] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const count = useCounterAnim(
    stat.isRating ? 50 : stat.numericValue,
    isVisible,
  );

  const displayValue = stat.isRating
    ? "5.0 ⭐"
    : `${count.toLocaleString()}${stat.displaySuffix}`;

  const handleInteraction = useCallback((clientX: number, clientY: number) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    setRipples((prev) => [
      ...prev,
      {
        x: clientX - rect.left - 50,
        y: clientY - rect.top - 50,
        id: Date.now(),
      },
    ]);
    setTimeout(() => setRipples((prev) => prev.slice(1)), 700);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      setRotateX(
        (-(e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 8,
      );
      setRotateY(
        ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 8,
      );
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
    setIs3D(false);
  }, []);

  return (
    <button
      type="button"
      ref={cardRef}
      data-ocid={`stats.tile.${index + 1}`}
      className={[
        "relative glass-card rounded-2xl p-8 cursor-pointer overflow-hidden text-left w-full",
        "border border-border/60 transition-all duration-500 ripple-container",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
      ].join(" ")}
      style={{
        transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${isVisible ? "translateY(0)" : "translateY(40px)"}`,
        transition: is3D
          ? "transform 0.1s ease, box-shadow 0.3s ease, border-color 0.3s ease"
          : `transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 150}ms, box-shadow 0.3s ease, border-color 0.3s ease, opacity 0.6s ease ${index * 150}ms`,
      }}
      aria-label={`${displayValue} ${stat.label}`}
      onMouseEnter={() => setIs3D(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => handleInteraction(e.clientX, e.clientY)}
      onTouchStart={(e) => {
        const t = e.touches[0];
        if (t) handleInteraction(t.clientX, t.clientY);
      }}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          className="ripple-effect"
          style={{ left: r.x, top: r.y }}
        />
      ))}

      <div
        className="inline-flex items-center justify-center w-16 h-16 rounded-xl text-3xl mb-6"
        style={{
          background: `${stat.accentColor.replace(")", " / 0.12)")}`,
          border: `1px solid ${stat.accentColor.replace(")", " / 0.25)")}`,
        }}
      >
        {stat.icon}
      </div>

      <div
        className="font-display font-black text-5xl md:text-6xl leading-none stat-number mb-3"
        style={{ color: stat.accentColor }}
      >
        {displayValue}
      </div>
      <div
        className="font-display font-semibold text-xl text-foreground mb-2 break-words leading-tight"
        style={{ overflowWrap: "break-word" }}
      >
        {stat.label}
      </div>
      <div
        className="text-muted-foreground text-sm leading-relaxed break-words"
        style={{ overflowWrap: "break-word" }}
      >
        {stat.sublabel}
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${stat.accentColor}, transparent)`,
          opacity: is3D ? 0.8 : 0,
        }}
      />
    </button>
  );
}

export default function StatsShowcase() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });
  const [shapes] = useState(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: 40 + ((i * 17 + 23) % 80),
      x: (i * 13 + 5) % 100,
      y: (i * 19 + 7) % 100,
      duration: 6 + ((i * 11 + 3) % 8),
      delay: (i * 7) % 4,
      shape: i % 3 === 0 ? "circle" : i % 3 === 1 ? "square" : "triangle",
      colorIdx: i % 2,
    })),
  );

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="stats"
      data-ocid="stats.section"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.97 0.01 75) 0%, oklch(0.95 0.02 75) 50%, oklch(0.97 0.01 75) 100%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.65 0.18 75 / 0.04) 0%, transparent 70%)",
        }}
      />

      {shapes.map((s) => {
        const colors = [
          "oklch(0.65 0.18 75 / 0.08)",
          "oklch(0.58 0.15 70 / 0.08)",
        ];
        const borderColors = [
          "oklch(0.65 0.18 75 / 0.18)",
          "oklch(0.58 0.15 70 / 0.18)",
        ];
        const baseStyle: React.CSSProperties = {
          width: s.size,
          height: s.size,
          left: `${s.x}%`,
          top: `${s.y}%`,
          background: colors[s.colorIdx],
          border: `1px solid ${borderColors[s.colorIdx]}`,
          animation: `float-geo ${s.duration}s ease-in-out ${s.delay}s infinite alternate`,
        };
        if (s.shape === "circle")
          return (
            <FloatingShape
              key={s.id}
              style={{ ...baseStyle, borderRadius: "50%" }}
              className=""
            />
          );
        if (s.shape === "square")
          return (
            <FloatingShape
              key={s.id}
              style={{
                ...baseStyle,
                borderRadius: "4px",
                transform: "rotate(45deg)",
              }}
              className=""
            />
          );
        return (
          <FloatingShape
            key={s.id}
            style={{
              ...baseStyle,
              background: "transparent",
              border: "none",
              width: 0,
              height: 0,
              borderLeft: `${s.size / 2}px solid transparent`,
              borderRight: `${s.size / 2}px solid transparent`,
              borderBottom: `${s.size}px solid ${colors[s.colorIdx]}`,
            }}
            className=""
          />
        );
      })}

      <style>{`
        @keyframes float-geo {
          from { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          to   { transform: translateY(-24px) rotate(15deg); opacity: 1; }
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border text-xs font-semibold tracking-widest uppercase mb-6"
            style={{
              borderColor: "oklch(0.65 0.18 75 / 0.3)",
              color: "oklch(0.50 0.14 75)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "oklch(0.65 0.18 75)" }}
            />
            Our Impact
          </div>
          <h2 className="font-display font-black text-4xl md:text-6xl lg:text-7xl text-gradient leading-tight mb-4">
            Trusted By
            <br />
            Khapri's Families
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Numbers that reflect our 8-year commitment to quality and customer
            happiness — every photo, every frame, every album crafted with pride
            since 2018.
          </p>
        </div>

        <div
          data-ocid="stats.list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {STATS.map((stat, i) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={i}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>

      <div className="section-divider mt-20" />
    </section>
  );
}
