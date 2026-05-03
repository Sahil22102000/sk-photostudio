import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { RippleEvent } from "@/types/index";
import { useCallback, useState } from "react";

interface Specialization {
  name: string;
  icon: string;
  accentVariant: "orange" | "cyan" | "teal";
}

const SPECIALIZATIONS: Specialization[] = [
  { name: "Computer Science", icon: "💻", accentVariant: "cyan" },
  { name: "Data Science", icon: "📊", accentVariant: "orange" },
  { name: "Artificial Intelligence", icon: "🤖", accentVariant: "teal" },
  { name: "Machine Learning", icon: "🧠", accentVariant: "cyan" },
  { name: "Biotechnology", icon: "🧬", accentVariant: "orange" },
  { name: "Physics", icon: "⚛️", accentVariant: "teal" },
  { name: "Chemistry", icon: "🧪", accentVariant: "cyan" },
  { name: "Mathematics", icon: "∑", accentVariant: "orange" },
  { name: "Economics", icon: "📈", accentVariant: "teal" },
  { name: "Finance", icon: "💹", accentVariant: "cyan" },
  { name: "Literature", icon: "📖", accentVariant: "orange" },
  { name: "History", icon: "🏺", accentVariant: "teal" },
  { name: "Psychology", icon: "🧩", accentVariant: "cyan" },
  { name: "Engineering", icon: "⚙️", accentVariant: "orange" },
  { name: "Architecture", icon: "🏛️", accentVariant: "teal" },
  { name: "Law", icon: "⚖️", accentVariant: "cyan" },
  { name: "Medicine", icon: "🩺", accentVariant: "orange" },
  { name: "Environmental Science", icon: "🌿", accentVariant: "teal" },
  { name: "Business Analytics", icon: "📉", accentVariant: "cyan" },
  { name: "Digital Marketing", icon: "📣", accentVariant: "orange" },
];

const ACCENT_STYLES = {
  orange: {
    idle: "border-[oklch(0.62_0.25_33/0.25)] bg-[oklch(0.62_0.25_33/0.08)]",
    hover:
      "hover:border-[oklch(0.62_0.25_33/0.7)] hover:bg-[oklch(0.62_0.25_33/0.15)] hover:shadow-[0_0_20px_oklch(0.62_0.25_33/0.4)] hover:text-[oklch(0.8_0.22_33)]",
    bounce:
      "border-[oklch(0.62_0.25_33/0.9)] bg-[oklch(0.62_0.25_33/0.25)] shadow-[0_0_30px_oklch(0.62_0.25_33/0.6)] text-[oklch(0.9_0.2_33)]",
    iconColor: "text-[oklch(0.75_0.22_33)]",
    rippleColor: "oklch(0.62 0.25 33 / 0.4)",
  },
  cyan: {
    idle: "border-[oklch(0.7_0.24_200/0.25)] bg-[oklch(0.7_0.24_200/0.08)]",
    hover:
      "hover:border-[oklch(0.7_0.24_200/0.7)] hover:bg-[oklch(0.7_0.24_200/0.15)] hover:shadow-[0_0_20px_oklch(0.7_0.24_200/0.4)] hover:text-[oklch(0.85_0.2_200)]",
    bounce:
      "border-[oklch(0.7_0.24_200/0.9)] bg-[oklch(0.7_0.24_200/0.25)] shadow-[0_0_30px_oklch(0.7_0.24_200/0.6)] text-[oklch(0.9_0.2_200)]",
    iconColor: "text-[oklch(0.75_0.24_200)]",
    rippleColor: "oklch(0.7 0.24 200 / 0.4)",
  },
  teal: {
    idle: "border-[oklch(0.65_0.22_188/0.25)] bg-[oklch(0.65_0.22_188/0.08)]",
    hover:
      "hover:border-[oklch(0.65_0.22_188/0.7)] hover:bg-[oklch(0.65_0.22_188/0.15)] hover:shadow-[0_0_20px_oklch(0.65_0.22_188/0.4)] hover:text-[oklch(0.85_0.2_188)]",
    bounce:
      "border-[oklch(0.65_0.22_188/0.9)] bg-[oklch(0.65_0.22_188/0.25)] shadow-[0_0_30px_oklch(0.65_0.22_188/0.6)] text-[oklch(0.9_0.2_188)]",
    iconColor: "text-[oklch(0.75_0.22_188)]",
    rippleColor: "oklch(0.65 0.22 188 / 0.4)",
  },
};

function SpecBadge({
  spec,
  index,
  isVisible,
}: {
  spec: Specialization;
  index: number;
  isVisible: boolean;
}) {
  const [isBouncing, setIsBouncing] = useState(false);
  const [ripples, setRipples] = useState<RippleEvent[]>([]);
  const accent = ACCENT_STYLES[spec.accentVariant];

  const triggerBounce = useCallback(
    (clientX: number, clientY: number, rect: DOMRect) => {
      setIsBouncing(true);
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      setRipples((prev) => [...prev, { x: x - 30, y: y - 30, id: Date.now() }]);
      setTimeout(() => {
        setRipples((prev) => prev.slice(1));
      }, 700);
      setTimeout(() => setIsBouncing(false), 450);
    },
    [],
  );

  const delay = `${(index % 8) * 60}ms`;

  return (
    <button
      type="button"
      data-ocid={`specializations.badge.${index + 1}`}
      className={[
        "relative flex items-center gap-2.5 px-4 py-2.5 rounded-full",
        "border backdrop-blur-sm text-sm font-medium",
        "text-foreground/80 transition-all duration-300",
        "cursor-pointer select-none overflow-hidden",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        accent.idle,
        accent.hover,
        isBouncing ? accent.bounce : "",
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        transitionDelay: isVisible ? delay : "0ms",
        transform: isBouncing
          ? "scale(1.12)"
          : isVisible
            ? "scale(1)"
            : "scale(0.9)",
        animation: isBouncing
          ? "badge-bounce 0.45s cubic-bezier(0.36,0.07,0.19,0.97)"
          : undefined,
      }}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        triggerBounce(e.clientX, e.clientY, rect);
      }}
      onTouchStart={(e) => {
        const t = e.touches[0];
        const rect = e.currentTarget.getBoundingClientRect();
        if (t) triggerBounce(t.clientX, t.clientY, rect);
      }}
    >
      {/* Ripples */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: r.x,
            top: r.y,
            width: 60,
            height: 60,
            background: accent.rippleColor,
            transform: "scale(0)",
            animation: "ripple-expand 0.6s ease-out forwards",
          }}
        />
      ))}

      <span
        className={`text-base leading-none ${accent.iconColor} transition-transform duration-300 group-hover:scale-110`}
        aria-hidden="true"
      >
        {spec.icon}
      </span>
      <span className="whitespace-nowrap">{spec.name}</span>
    </button>
  );
}

export default function SpecializationsSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="specializations"
      data-ocid="specializations.section"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.95 0 0) 0%, oklch(0.93 0.002 255) 50%, oklch(0.95 0 0) 100%)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, oklch(0.62 0.25 33 / 0.05) 0%, transparent 70%)",
        }}
      />

      {/* Animated grid bg */}
      <div className="absolute inset-0 hero-bg-grid opacity-40 pointer-events-none" />

      <style>{`
        @keyframes badge-bounce {
          0%   { transform: scale(1); }
          20%  { transform: scale(1.15) rotate(-2deg); }
          40%  { transform: scale(0.95) rotate(2deg); }
          60%  { transform: scale(1.08) rotate(-1deg); }
          80%  { transform: scale(0.98) rotate(1deg); }
          100% { transform: scale(1); }
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-[oklch(0.62_0.25_33/0.3)] text-xs font-semibold tracking-widest uppercase text-[oklch(0.55_0.22_33)] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.62_0.25_33)] animate-pulse" />
            Disciplines
          </div>
          <h2 className="font-display font-black text-4xl md:text-6xl lg:text-7xl leading-tight mb-4">
            <span className="text-foreground">Areas of </span>
            <span className="text-gradient">Specialization</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore a diverse range of disciplines crafted to prepare you for
            the challenges of tomorrow — from STEM to the humanities.
          </p>
        </div>

        {/* Badge grid */}
        <div
          data-ocid="specializations.list"
          className="flex flex-wrap justify-center gap-3 md:gap-4"
        >
          {SPECIALIZATIONS.map((spec, i) => (
            <SpecBadge
              key={spec.name}
              spec={spec}
              index={i}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center mt-14 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-muted-foreground text-sm mb-4">
            Can't find your field? We offer 200+ programs across 40+
            disciplines.
          </p>
          <button
            type="button"
            data-ocid="specializations.explore_button"
            onClick={() =>
              document
                .getElementById("programs")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-card border border-[oklch(0.65_0.22_188/0.4)] text-[oklch(0.75_0.22_188)] font-semibold text-sm hover:border-[oklch(0.65_0.22_188/0.8)] hover:shadow-[0_0_24px_oklch(0.65_0.22_188/0.35)] transition-all duration-300 hover:scale-105"
          >
            <span>Explore All Programs</span>
            <span className="text-base">→</span>
          </button>
        </div>
      </div>

      <div className="section-divider mt-20" />
    </section>
  );
}
