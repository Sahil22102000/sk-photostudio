import { createActor } from "@/backend";
import type { Testimonial as BackendTestimonial } from "@/backend.d";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { RippleEvent } from "@/types/index";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface TestimonialData {
  id: string;
  name: string;
  location: string;
  stars: number;
  quote: string;
  color: string;
}

const STATIC_TESTIMONIALS: TestimonialData[] = [
  {
    id: "1",
    name: "Priya Sharma",
    location: "Khapri",
    stars: 5,
    quote:
      "Got my passport photos done here — quick, professional, and perfect quality. The staff is very helpful!",
    color: "bg-primary",
  },
  {
    id: "2",
    name: "Rahul Patil",
    location: "Nagpur",
    stars: 5,
    quote:
      "Beautiful custom photo album for our wedding anniversary. The quality and binding are excellent. Highly recommended!",
    color: "bg-secondary",
  },
  {
    id: "3",
    name: "Sunita Deshmukh",
    location: "Maharashtra",
    stars: 5,
    quote:
      "The framing work is outstanding. Got multiple family portraits framed here and they all look stunning on my wall.",
    color: "bg-accent",
  },
  {
    id: "4",
    name: "Amit Wankhede",
    location: "New Khapri",
    stars: 5,
    quote:
      "Very fast service for passport size photos. Got it within minutes and the background was perfect as required.",
    color: "bg-primary",
  },
  {
    id: "5",
    name: "Kavita Meshram",
    location: "Nagpur",
    stars: 5,
    quote:
      "Wonderful experience! Got large format prints of my travel photos. The colors and clarity are amazing!",
    color: "bg-secondary",
  },
  {
    id: "6",
    name: "Sanjay Bhagat",
    location: "Khapri",
    stars: 5,
    quote:
      "Been coming here for years. Always reliable, quality work, and fair pricing. Best photo studio in Khapri!",
    color: "bg-accent",
  },
];

const STAR_KEYS = ["s1", "s2", "s3", "s4", "s5"] as const;

function initials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function mergeBackendTestimonials(
  base: TestimonialData[],
  backend: BackendTestimonial[],
): TestimonialData[] {
  const colors = ["bg-primary", "bg-secondary", "bg-accent"];
  const extras: TestimonialData[] = backend.map((t, i) => ({
    id: `backend-${t.id.toString()}`,
    name: t.name,
    location: t.role,
    stars: Number(t.rating),
    quote: t.quote,
    color: colors[i % colors.length] as string,
  }));
  return [...base, ...extras];
}

function StarRating({ count }: { count: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${count} out of 5 stars`}
    >
      {STAR_KEYS.map((key, i) => (
        <Star
          key={key}
          className={[
            "w-4 h-4",
            i < count
              ? "fill-primary text-primary"
              : "fill-transparent text-muted-foreground/40",
          ].join(" ")}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

interface CardProps {
  testimonial: TestimonialData;
  index: number;
  isActive: boolean;
}

function TestimonialCard({ testimonial, index, isActive }: CardProps) {
  const [ripples, setRipples] = useState<RippleEvent[]>([]);
  const [isBouncing, setIsBouncing] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const rippleCounter = useRef(0);

  const triggerRipple = useCallback((clientX: number, clientY: number) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const id = ++rippleCounter.current;
    setRipples((prev) => [
      ...prev,
      { x: clientX - rect.left - 50, y: clientY - rect.top - 50, id },
    ]);
    setTimeout(
      () => setRipples((prev) => prev.filter((r) => r.id !== id)),
      650,
    );
  }, []);

  const triggerBounce = useCallback(() => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 400);
  }, []);

  const handleInteract = useCallback(
    (clientX: number, clientY: number) => {
      triggerRipple(clientX, clientY);
      triggerBounce();
    },
    [triggerRipple, triggerBounce],
  );

  return (
    <div
      ref={cardRef}
      data-ocid={`testimonials.item.${index + 1}`}
      aria-hidden={!isActive}
      tabIndex={isActive ? 0 : -1}
      onClick={(e) => handleInteract(e.clientX, e.clientY)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const rect = cardRef.current?.getBoundingClientRect();
          if (rect)
            handleInteract(
              rect.left + rect.width / 2,
              rect.top + rect.height / 2,
            );
        }
      }}
      onTouchStart={(e) => {
        const t = e.touches[0];
        if (t) handleInteract(t.clientX, t.clientY);
      }}
      className={[
        "ripple-container glass-card rounded-2xl p-8 flex flex-col gap-5",
        "transition-all duration-500 ease-out select-none border border-border/60 outline-none",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        isBouncing ? "scale-[1.03]" : "scale-100",
        isActive
          ? "opacity-100 translate-y-0 glow-primary pointer-events-auto cursor-default"
          : "opacity-0 translate-y-4 pointer-events-none",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          className="ripple-effect"
          style={{ left: r.x, top: r.y }}
          aria-hidden="true"
        />
      ))}

      {/* Opening quote mark */}
      <div
        className="text-primary/30 text-6xl font-serif leading-none select-none -mb-2"
        aria-hidden="true"
      >
        "
      </div>

      <p className="text-foreground/90 text-base md:text-lg leading-relaxed italic flex-1">
        {testimonial.quote}
      </p>

      {/* Gold star rating */}
      <StarRating count={testimonial.stars} />

      <div className="flex items-center gap-4 pt-1 border-t border-border/40">
        <div
          className={[
            "w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-sm text-primary-foreground flex-shrink-0",
            testimonial.color,
          ].join(" ")}
          aria-label={`Avatar for ${testimonial.name}`}
        >
          {initials(testimonial.name)}
        </div>
        <div className="min-w-0">
          <p className="font-display font-semibold text-foreground text-sm truncate">
            {testimonial.name}
          </p>
          <p className="text-primary text-xs font-medium truncate">
            {testimonial.location}
          </p>
        </div>
        {/* Verified badge */}
        <div className="ml-auto flex-shrink-0">
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-primary/80 bg-primary/10 border border-primary/20 rounded-full px-2 py-0.5">
            <svg
              className="w-2.5 h-2.5"
              viewBox="0 0 12 12"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M10.8 5.4L9.6 4l.4-1.8L8.2 1.6 7.2 0 6 .6 4.8 0 3.8 1.6 2 2.2l.4 1.8L1.2 5.4l.4 1.8-1.2 1.4 1 1.4-.4 1.8 1.8.6 1 1.6 1.2-.6 1.2.6 1-1.6 1.8-.6-.4-1.8 1-1.4-1.2-1.4.4-1.8zM5.2 8.4L3 6.2l.8-.8 1.4 1.4 2.8-2.8.8.8-3.6 3.6z" />
            </svg>
            Google
          </span>
        </div>
      </div>
    </div>
  );
}

interface NavButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}

function NavButton({ direction, onClick, disabled }: NavButtonProps) {
  const [ripples, setRipples] = useState<RippleEvent[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const rippleCounter = useRef(0);

  const triggerRipple = useCallback((e: React.MouseEvent) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const id = ++rippleCounter.current;
    setRipples((prev) => [
      ...prev,
      { x: e.clientX - rect.left - 20, y: e.clientY - rect.top - 20, id },
    ]);
    setTimeout(
      () => setRipples((prev) => prev.filter((r) => r.id !== id)),
      650,
    );
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      triggerRipple(e);
      onClick();
    }
  };

  return (
    <button
      ref={btnRef}
      type="button"
      data-ocid={
        direction === "prev"
          ? "testimonials.prev_button"
          : "testimonials.next_button"
      }
      aria-label={
        direction === "prev" ? "Previous testimonial" : "Next testimonial"
      }
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
      className={[
        "ripple-container relative w-11 h-11 rounded-full flex items-center justify-center glass-card border transition-all duration-300",
        disabled
          ? "opacity-30 cursor-not-allowed"
          : isHovered
            ? "border-primary/60 glow-primary scale-110 cursor-pointer"
            : "border-border/50 cursor-pointer hover:scale-110",
      ].join(" ")}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          className="ripple-effect"
          style={{ left: r.x, top: r.y }}
          aria-hidden="true"
        />
      ))}
      {direction === "prev" ? (
        <ChevronLeft className="w-5 h-5 text-foreground" aria-hidden="true" />
      ) : (
        <ChevronRight className="w-5 h-5 text-foreground" aria-hidden="true" />
      )}
    </button>
  );
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);
  const [testimonials, setTestimonials] =
    useState<TestimonialData[]>(STATIC_TESTIMONIALS);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: headingRef, isVisible: headingVisible } = useScrollAnimation({
    threshold: 0.2,
  });

  const { actor, isFetching } = useActor(createActor);
  const { data: backendData } = useQuery<BackendTestimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTestimonials();
    },
    enabled: !!actor && !isFetching,
  });

  useEffect(() => {
    if (backendData && backendData.length > 0) {
      setTestimonials(
        mergeBackendTestimonials(STATIC_TESTIMONIALS, backendData),
      );
    }
  }, [backendData]);

  const total = testimonials.length;
  const goNext = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const goPrev = useCallback(
    () => setCurrent((c) => (c - 1 + total) % total),
    [total],
  );

  // Auto-advance every 4 seconds
  useEffect(() => {
    if (isHoveringCarousel) return;
    const timer = setInterval(goNext, 4000);
    return () => clearInterval(timer);
  }, [goNext, isHoveringCarousel]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
    touchEndX.current = null;
  }, []);
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0]?.clientX ?? null;
  }, []);
  const handleTouchEnd = useCallback(() => {
    const startX = touchStartX.current;
    const endX = touchEndX.current;
    if (startX === null || endX === null) return;
    const delta = startX - endX;
    if (Math.abs(delta) > 40) {
      if (delta > 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  }, [goNext, goPrev]);

  const pointerStartX = useRef<number | null>(null);
  const isDragging = useRef(false);
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerStartX.current = e.clientX;
    isDragging.current = false;
  }, []);
  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (
      pointerStartX.current !== null &&
      Math.abs(e.clientX - pointerStartX.current) > 5
    )
      isDragging.current = true;
  }, []);
  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current || pointerStartX.current === null) {
        pointerStartX.current = null;
        return;
      }
      const delta = pointerStartX.current - e.clientX;
      if (Math.abs(delta) > 40) {
        if (delta > 0) goNext();
        else goPrev();
      }
      pointerStartX.current = null;
      isDragging.current = false;
    },
    [goNext, goPrev],
  );

  return (
    <section
      id="testimonials"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-24 px-4 overflow-hidden bg-muted/30"
      aria-labelledby="testimonials-heading"
    >
      {/* Warm ambient glow blobs */}
      <div
        className="absolute top-1/4 left-0 w-96 h-96 rounded-full opacity-[0.06] blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.65 0.18 75 / 0.5), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-10 w-80 h-80 rounded-full opacity-[0.06] blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.7 0.12 80 / 0.4), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section heading */}
        <div
          ref={headingRef as React.RefObject<HTMLDivElement>}
          className={[
            "text-center mb-14 transition-all duration-700",
            headingVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6",
          ].join(" ")}
        >
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-4"
            data-ocid="testimonials.section_label"
          >
            <span className="w-6 h-px bg-primary" aria-hidden="true" />
            Customer Reviews
            <span className="w-6 h-px bg-primary" aria-hidden="true" />
          </span>

          <h2
            id="testimonials-heading"
            className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-4"
            data-ocid="testimonials.heading"
          >
            What Our <span className="text-gradient">Customers Say</span>
          </h2>

          {/* Rating summary */}
          <div
            className="flex items-center justify-center gap-3 mb-3"
            data-ocid="testimonials.rating_summary"
          >
            <div
              className="flex items-center gap-0.5"
              aria-label="5 out of 5 stars"
            >
              {STAR_KEYS.map((key) => (
                <Star
                  key={key}
                  className="w-5 h-5 fill-primary text-primary"
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="font-display font-bold text-foreground text-lg">
              5.0
            </span>
            <span className="text-muted-foreground text-sm">
              from 29 Google reviews
            </span>
          </div>

          <p
            className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed"
            data-ocid="testimonials.subheading"
          >
            Trusted by families across Khapri and Nagpur — hear directly from
            our happy customers.
          </p>
        </div>

        <div className="section-divider mb-14" aria-hidden="true" />

        {/* Carousel */}
        <div
          data-ocid="testimonials.carousel"
          className={[
            "transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          ].join(" ")}
          onMouseEnter={() => setIsHoveringCarousel(true)}
          onMouseLeave={() => setIsHoveringCarousel(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <section
            className="relative min-h-[380px] md:min-h-[320px]"
            aria-label="Testimonials carousel"
            aria-live="polite"
          >
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className={[
                  "absolute inset-0 transition-all duration-500",
                  i === current ? "z-10" : "z-0",
                ].join(" ")}
              >
                <TestimonialCard
                  testimonial={t}
                  index={i}
                  isActive={i === current}
                />
              </div>
            ))}
          </section>

          {/* Controls row */}
          <div className="flex items-center justify-between mt-8">
            <NavButton direction="prev" onClick={goPrev} disabled={false} />

            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label="Testimonial slide indicators"
              data-ocid="testimonials.dot_indicators"
            >
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Go to testimonial ${i + 1}`}
                  data-ocid={`testimonials.dot.${i + 1}`}
                  onClick={() => setCurrent(i)}
                  className={[
                    "rounded-full transition-all duration-300",
                    i === current
                      ? "w-6 h-2.5 bg-primary glow-primary"
                      : "w-2.5 h-2.5 bg-border/60 hover:bg-muted-foreground/50",
                  ].join(" ")}
                />
              ))}
            </div>

            <NavButton direction="next" onClick={goNext} disabled={false} />
          </div>
        </div>
      </div>
    </section>
  );
}
