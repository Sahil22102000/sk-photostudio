import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { RippleEvent } from "@/types/index";
import {
  ArrowRight,
  BarChart2,
  Briefcase,
  FlaskConical,
  Microscope,
  Palette,
  Settings2,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";

interface ProgramCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  glowClass: "glow-primary" | "glow-accent" | "glow-secondary";
  iconColorClass: string;
  href: string;
}

const PROGRAMS: ProgramCard[] = [
  {
    id: "engineering",
    title: "Engineering",
    description:
      "Master cutting-edge engineering disciplines — from software and electrical to civil. Tackle real-world challenges through hands-on labs and industry-backed projects that prepare you for tomorrow's infrastructure.",
    icon: Settings2,
    glowClass: "glow-primary",
    iconColorClass: "text-primary",
    href: "#programs",
  },
  {
    id: "science",
    title: "Science",
    description:
      "Explore the frontiers of physics, chemistry, and biology in state-of-the-art research facilities. Our curriculum bridges theoretical foundations with applied discovery to fuel breakthrough innovation.",
    icon: FlaskConical,
    glowClass: "glow-accent",
    iconColorClass: "text-accent",
    href: "#programs",
  },
  {
    id: "arts-humanities",
    title: "Arts & Humanities",
    description:
      "Cultivate critical thinking, creativity, and cultural understanding through literature, philosophy, and the fine arts. Shape ideas that move society and leave a lasting mark on the world.",
    icon: Palette,
    glowClass: "glow-secondary",
    iconColorClass: "text-secondary",
    href: "#programs",
  },
  {
    id: "commerce",
    title: "Commerce",
    description:
      "Build expertise in finance, accounting, and global markets. Our industry-aligned curriculum equips you with the analytical and strategic skills demanded by leading enterprises worldwide.",
    icon: BarChart2,
    glowClass: "glow-primary",
    iconColorClass: "text-primary",
    href: "#programs",
  },
  {
    id: "research",
    title: "Research",
    description:
      "Drive discovery across interdisciplinary domains alongside world-class faculty. Access cutting-edge labs, publish in top journals, and turn bold questions into pioneering scientific contributions.",
    icon: Microscope,
    glowClass: "glow-accent",
    iconColorClass: "text-accent",
    href: "#programs",
  },
  {
    id: "mba",
    title: "MBA",
    description:
      "Accelerate your leadership trajectory with our rigorous MBA program. Combine business strategy, entrepreneurship, and executive coaching to transform you into a high-impact decision-maker.",
    icon: Briefcase,
    glowClass: "glow-secondary",
    iconColorClass: "text-secondary",
    href: "#programs",
  },
];

interface CardProps {
  program: ProgramCard;
  index: number;
  isVisible: boolean;
}

function ProgramCard({ program, index, isVisible }: CardProps) {
  const [ripples, setRipples] = useState<RippleEvent[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const rippleCounter = useRef(0);

  const triggerRipple = useCallback((clientX: number, clientY: number) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = clientX - rect.left - 50;
    const y = clientY - rect.top - 50;
    const id = ++rippleCounter.current;
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 650);
  }, []);

  const triggerBounce = useCallback(() => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 400);
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      triggerRipple(e.clientX, e.clientY);
      triggerBounce();
    },
    [triggerRipple, triggerBounce],
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const touch = e.touches[0];
      if (touch) triggerRipple(touch.clientX, touch.clientY);
      setIsHovered(true);
      triggerBounce();
    },
    [triggerRipple, triggerBounce],
  );

  const handleTouchEnd = useCallback(() => {
    setTimeout(() => setIsHovered(false), 600);
  }, []);

  const Icon = program.icon;
  const delay = index * 100;

  return (
    <article
      ref={cardRef}
      data-ocid={`programs.item.${index + 1}`}
      className={[
        "ripple-container rounded-2xl p-6 cursor-pointer select-none",
        "glass-card",
        "transition-all duration-300 ease-out",
        isHovered
          ? `translate-y-[-8px] ${program.glowClass} border-accent/50`
          : "hover:translate-y-[-8px]",
        isBouncing ? "scale-[1.05]" : "scale-100",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        "group",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          triggerBounce();
        }
      }}
    >
      {/* Ripple layer */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="ripple-effect"
          style={{ left: r.x, top: r.y }}
          aria-hidden="true"
        />
      ))}

      {/* Icon */}
      <div
        className={[
          "w-12 h-12 rounded-xl flex items-center justify-center mb-5",
          "bg-muted border border-border transition-all duration-300",
          isHovered ? "border-primary/50 bg-primary/10" : "",
        ].join(" ")}
      >
        <Icon
          className={[
            "w-6 h-6 transition-colors duration-300",
            isHovered ? "text-primary" : program.iconColorClass,
          ].join(" ")}
        />
      </div>

      {/* Title */}
      <h3
        className={[
          "font-display font-bold text-xl mb-3 transition-colors duration-300",
          isHovered ? "text-gradient" : "text-foreground",
        ].join(" ")}
      >
        {program.title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-3">
        {program.description}
      </p>

      {/* CTA */}
      <a
        href={program.href}
        data-ocid={`programs.learn_more.${index + 1}`}
        onClick={(e) => e.stopPropagation()}
        className={[
          "inline-flex items-center gap-1.5 text-sm font-semibold",
          "transition-all duration-300",
          isHovered ? "text-primary gap-2.5" : "text-accent",
        ].join(" ")}
        aria-label={`Learn more about ${program.title}`}
      >
        Learn More
        <ArrowRight className="w-4 h-4" />
      </a>
    </article>
  );
}

export default function ProgramsSection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: headingRef, isVisible: headingVisible } = useScrollAnimation({
    threshold: 0.2,
  });

  return (
    <section
      id="programs"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-24 px-4 overflow-hidden"
      aria-labelledby="programs-heading"
    >
      {/* Background accent blobs */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-[0.06] blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.65 0.22 188 / 0.4), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-[0.06] blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.62 0.25 33 / 0.4), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section heading */}
        <div
          ref={headingRef as React.RefObject<HTMLDivElement>}
          className={[
            "text-center mb-16 transition-all duration-700",
            headingVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6",
          ].join(" ")}
        >
          {/* Eyebrow label */}
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent mb-4"
            data-ocid="programs.section_label"
          >
            <span className="w-6 h-px bg-accent" />
            Academic Excellence
            <span className="w-6 h-px bg-accent" />
          </span>

          <h2
            id="programs-heading"
            className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-4"
            data-ocid="programs.heading"
          >
            Our <span className="text-gradient">Programs</span>
          </h2>

          <p
            className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"
            data-ocid="programs.subheading"
          >
            LUMINA INSTITUTE offers world-class academic programs designed to
            ignite curiosity, build expertise, and empower graduates to shape a
            better future.
          </p>
        </div>

        {/* Divider */}
        <div className="section-divider mb-16" aria-hidden="true" />

        {/* Grid */}
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0 m-0"
          data-ocid="programs.list"
        >
          {PROGRAMS.map((program, index) => (
            <li key={program.id}>
              <ProgramCard
                program={program}
                index={index}
                isVisible={isVisible}
              />
            </li>
          ))}
        </ul>

        {/* Bottom CTA */}
        <div
          className={[
            "text-center mt-14 transition-all duration-700 delay-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          <button
            type="button"
            data-ocid="programs.explore_all_button"
            onClick={() =>
              document
                .getElementById("programs")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:glow-primary-strong transition-glow"
          >
            Explore All Programs
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
