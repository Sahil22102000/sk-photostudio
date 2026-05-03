import { motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { useCounterOnView } from "../../hooks/useCounter";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

interface StatCard {
  id: string;
  value: number;
  suffix: string;
  label: string;
  icon: string;
  accentColor: string;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const STATS: StatCard[] = [
  {
    id: "customers",
    value: 1200,
    suffix: "+",
    label: "Happy Clients",
    icon: "😊",
    accentColor: "oklch(0.65 0.18 75)",
  },
  {
    id: "photos",
    value: 5000,
    suffix: "+",
    label: "Photos Delivered",
    icon: "📸",
    accentColor: "oklch(0.55 0.14 70)",
  },
  {
    id: "experience",
    value: 8,
    suffix: "+",
    label: "Years Experience",
    icon: "🏅",
    accentColor: "oklch(0.60 0.16 72)",
  },
  {
    id: "rating",
    value: 5,
    suffix: ".0",
    label: "Star Rating",
    icon: "⭐",
    accentColor: "oklch(0.65 0.18 75)",
  },
];

const HIGHLIGHTS = [
  { label: "5.0 Star Rated", icon: "⭐" },
  { label: "Same-Day Service", icon: "⚡" },
  { label: "Walk-Ins Welcome", icon: "🚶" },
  { label: "Official Photos", icon: "🪪" },
  { label: "Online Appointments", icon: "📅" },
];

function MiniStatCounter({ stat, index }: { stat: StatCard; index: number }) {
  const { ref, count } = useCounterOnView(stat.value, 2000);

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      data-ocid={`about.stat.item.${index + 1}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 0.5,
        delay: 0.2 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex flex-col items-center text-center px-3 py-3 rounded-2xl min-w-0"
      style={{
        background: `${stat.accentColor.replace(")", " / 0.06)")}`,
        border: `1px solid ${stat.accentColor.replace(")", " / 0.2)")}`,
      }}
    >
      <span className="text-xl mb-0.5">{stat.icon}</span>
      <span
        className="font-display font-black text-2xl leading-none"
        style={{ color: stat.accentColor }}
      >
        {count.toLocaleString()}
        {stat.suffix}
      </span>
      <span
        className="text-muted-foreground text-xs font-medium mt-1 leading-tight break-words text-center w-full"
        style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
      >
        {stat.label}
      </span>
    </motion.div>
  );
}

function AboutImagePanel() {
  const imgRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = imgRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    el.style.transform = `scale(1.015) translate(${dx * 6}px, ${dy * 4}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (imgRef.current)
      imgRef.current.style.transform = "scale(1) translate(0,0)";
  }, []);

  return (
    <motion.div
      data-ocid="about.image.panel"
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative lg:sticky lg:top-24 self-start"
    >
      {/* Main image container */}
      <div
        className="relative rounded-3xl overflow-hidden shadow-2xl cursor-default"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ willChange: "transform" }}
      >
        <div ref={imgRef} style={{ transition: "transform 0.25s ease" }}>
          <img
            src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=900&h=680&fit=crop"
            alt="Professional photographer at work in warm studio lighting"
            className="w-full h-[360px] sm:h-[440px] lg:h-[560px] object-cover"
            loading="lazy"
          />
        </div>

        {/* Warm amber gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(170deg, oklch(0.65 0.18 75 / 0.04) 0%, transparent 40%, oklch(0.20 0.02 0 / 0.55) 100%)",
          }}
        />

        {/* TRUSTED SINCE 2018 badge — top left */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -10 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-5 left-5"
        >
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md text-xs font-bold tracking-widest uppercase"
            style={{
              background: "oklch(0.65 0.18 75 / 0.92)",
              color: "oklch(0.99 0 0)",
              boxShadow: "0 4px 20px oklch(0.65 0.18 75 / 0.35)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "oklch(0.99 0 0 / 0.7)" }}
            />
            Trusted Since 2018
          </div>
        </motion.div>

        {/* Bottom info strip */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-2xl backdrop-blur-md"
            style={{
              background: "oklch(0.98 0.01 75 / 0.93)",
              border: "1px solid oklch(0.65 0.18 75 / 0.25)",
              boxShadow: "0 4px 24px oklch(0.20 0.02 0 / 0.12)",
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
              style={{ background: "oklch(0.65 0.18 75 / 0.15)" }}
            >
              📸
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display font-bold text-sm text-foreground truncate">
                SK PHOTOSTUDIO
              </p>
              <p className="text-xs text-muted-foreground truncate">
                New Khapri, Maharashtra · Open till 9 PM
              </p>
            </div>
            <div className="flex-shrink-0 flex flex-col items-end">
              <div className="flex items-center gap-1">
                <span
                  className="font-black text-base leading-none"
                  style={{ color: "oklch(0.65 0.18 75)" }}
                >
                  5.0
                </span>
                <span style={{ color: "oklch(0.65 0.18 75)" }}>★</span>
              </div>
              <span className="text-[10px] text-muted-foreground">
                29 reviews
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div
        className="absolute -top-5 -right-5 w-28 h-28 rounded-full pointer-events-none -z-10"
        style={{
          border: "2px dashed oklch(0.65 0.18 75 / 0.3)",
          animation: "float-geo 9s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute -bottom-5 -left-5 w-20 h-20 rounded-2xl pointer-events-none -z-10"
        style={{
          background: "oklch(0.65 0.18 75 / 0.07)",
          border: "1px solid oklch(0.65 0.18 75 / 0.2)",
          transform: "rotate(12deg)",
          animation: "float-geo 7s ease-in-out 2s infinite alternate",
        }}
      />
    </motion.div>
  );
}

function AboutDescription() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const addRipple = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((prev) => [
      ...prev,
      { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
    ]);
    setTimeout(
      () => setRipples((prev) => prev.filter((r) => r.id !== id)),
      700,
    );
  }, []);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      data-ocid="about.description.panel"
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      {/* Section eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-5"
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.18em] uppercase"
          style={{
            background: "oklch(0.65 0.18 75 / 0.1)",
            border: "1px solid oklch(0.65 0.18 75 / 0.28)",
            color: "oklch(0.45 0.14 75)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "oklch(0.65 0.18 75)" }}
          />
          Our Story
        </div>
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.08 }}
        className="font-display font-black text-3xl sm:text-4xl lg:text-5xl leading-[1.1] mb-6"
      >
        About{" "}
        <span className="text-gradient block sm:inline">SK PHOTOSTUDIO</span>
      </motion.h2>

      {/* Body copy */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.16 }}
        className="space-y-3 mb-6"
      >
        <p className="text-muted-foreground text-base lg:text-[1.05rem] leading-relaxed">
          SK PHOTOSTUDIO has been Khapri's most trusted photography destination
          for{" "}
          <strong className="text-foreground font-semibold">8+ years</strong>.
          Nestled in New Khapri, Maharashtra, we have served over{" "}
          <strong className="text-foreground font-semibold">
            1,200 happy customers
          </strong>{" "}
          — from families preserving precious milestones to professionals
          needing crisp official photographs.
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          We offer a full range of services: beautifully crafted{" "}
          <strong className="text-foreground font-medium">photo albums</strong>,
          precision{" "}
          <strong className="text-foreground font-medium">photo framing</strong>
          , vibrant{" "}
          <strong className="text-foreground font-medium">
            photo printing
          </strong>{" "}
          in all sizes, and government-compliant{" "}
          <strong className="text-foreground font-medium">
            visa & passport photos
          </strong>{" "}
          ready in minutes — each backed by a perfect{" "}
          <strong className="text-foreground font-medium">
            5.0 ★ Google rating
          </strong>
          .
        </p>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.24 }}
        className="grid grid-cols-4 gap-2 mb-8"
      >
        {STATS.map((stat, i) => (
          <MiniStatCounter key={stat.id} stat={stat} index={i} />
        ))}
      </motion.div>

      {/* Contact info pills */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.32 }}
        className="flex flex-wrap gap-2 mb-6"
      >
        {[
          { icon: "📍", text: "3335+8VC, New Khapri, Khapri, MH 441108" },
          { icon: "⏰", text: "Open daily · Closes 9 PM" },
          { icon: "📞", text: "080554 69120" },
        ].map(({ icon, text }) => (
          <span
            key={text}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-muted-foreground"
            style={{
              background: "oklch(0.96 0.01 75)",
              border: "1px solid oklch(0.88 0.02 75)",
            }}
          >
            <span>{icon}</span>
            <span className="truncate max-w-[200px]">{text}</span>
          </span>
        ))}
      </motion.div>

      {/* Feature badges */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.38 }}
        className="flex flex-wrap gap-2 mb-8"
      >
        {HIGHLIGHTS.map((h, idx) => (
          <span
            key={h.label}
            data-ocid={`about.highlight.${idx + 1}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "oklch(0.97 0.025 75)",
              border: "1px solid oklch(0.65 0.18 75 / 0.28)",
              color: "oklch(0.45 0.14 75)",
            }}
          >
            <span>{h.icon}</span>
            {h.label}
          </span>
        ))}
      </motion.div>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.44 }}
        className="flex items-center gap-3 flex-wrap"
      >
        <div
          className="relative overflow-hidden rounded-xl"
          onClick={addRipple}
          onKeyDown={() => {}}
        >
          {ripples.map((r) => (
            <span
              key={r.id}
              className="ripple-effect"
              style={{ left: r.x - 50, top: r.y - 50 }}
            />
          ))}
          <a
            href="https://wa.me/918005469120?text=Hi%20SK%20PHOTOSTUDIO%20I%20would%20like%20to%20book%20an%20appointment"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="about.cta.primary_button"
            className="relative flex items-center gap-2 px-7 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            style={{ boxShadow: "0 4px 20px oklch(0.65 0.18 75 / 0.35)" }}
          >
            📅 Book an Appointment
          </a>
        </div>

        <a
          href="tel:08005469120"
          data-ocid="about.cta.call_button"
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border transition-all duration-200 hover:-translate-y-0.5"
          style={{
            borderColor: "oklch(0.65 0.18 75 / 0.35)",
            color: "oklch(0.45 0.14 75)",
            background: "oklch(0.97 0.02 75 / 0.6)",
          }}
        >
          📞 Call Now
        </a>
      </motion.div>
    </div>
  );
}

function BackgroundFx() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Large ambient orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] opacity-[0.055]"
        style={{ background: "oklch(0.65 0.18 75)", top: "-5%", left: "-15%" }}
        animate={{ x: [0, 28, 0], y: [0, -18, 0] }}
        transition={{
          duration: 16,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.04]"
        style={{
          background: "oklch(0.58 0.15 70)",
          bottom: "0%",
          right: "-5%",
        }}
        animate={{ x: [0, -22, 0], y: [0, 16, 0] }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 4,
        }}
      />
      {/* Subtle grid */}
      <div className="absolute inset-0 hero-bg-grid opacity-[0.45]" />
    </div>
  );
}

function AboutSection() {
  return (
    <section
      id="about"
      data-ocid="about.section"
      className="relative py-24 lg:py-32 overflow-hidden bg-background"
    >
      <BackgroundFx />
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Premium two-column layout: text left, image right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-12 xl:gap-20 items-start">
          <AboutDescription />
          <AboutImagePanel />
        </div>
      </div>

      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}

export default AboutSection;
