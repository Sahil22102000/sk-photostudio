import { ChevronDown, Phone, Star } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { RippleEvent } from "../../types/index";
import HeroScene from "../3d/HeroScene";

const WA_URL =
  "https://wa.me/918005469120?text=Hi%20SK%20PHOTOSTUDIO%2C%20I%20would%20like%20to%20book%20an%20appointment";

const SERVICES = [
  "Photo Albums",
  "Photo Framing",
  "Photo Printing",
  "Passport Photos",
];

function RippleButton({
  children,
  onClick,
  className,
  "data-ocid": dataOcid,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  "data-ocid"?: string;
}) {
  const [ripples, setRipples] = useState<RippleEvent[]>([]);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = btnRef.current?.getBoundingClientRect();
      if (rect) {
        setRipples((prev) => [
          ...prev,
          { x: e.clientX - rect.left, y: e.clientY - rect.top, id: Date.now() },
        ]);
      }
      onClick?.();
    },
    [onClick],
  );

  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => setRipples((r) => r.slice(1)), 700);
    return () => clearTimeout(timer);
  }, [ripples]);

  return (
    <button
      type="button"
      ref={btnRef}
      data-ocid={dataOcid}
      onClick={handleClick}
      className={`ripple-container relative overflow-hidden ${className ?? ""}`}
    >
      {children}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="ripple-effect"
          style={{ left: r.x - 50, top: r.y - 50 }}
        />
      ))}
    </button>
  );
}

function ServiceTypewriter() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % SERVICES.length);
        setVisible(true);
      }, 350);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-10 md:h-12 flex items-center justify-center lg:justify-start overflow-hidden">
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="text-2xl md:text-3xl font-display font-bold text-primary tracking-wide"
      >
        {SERVICES[index]}
      </motion.span>
    </div>
  );
}

function RatingBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.4 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/20 shadow-sm"
    >
      <div className="flex items-center gap-0.5">
        {(["s1", "s2", "s3", "s4", "s5"] as const).map((k) => (
          <Star key={k} className="w-3.5 h-3.5 fill-primary text-primary" />
        ))}
      </div>
      <span className="text-sm font-semibold text-foreground">5.0</span>
      <span className="text-xs text-muted-foreground font-medium">
        · 29 Google Reviews
      </span>
    </motion.div>
  );
}

export default function HeroSection() {
  const scrollToGallery = useCallback(() => {
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollDown = useCallback(() => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  }, []);

  return (
    <section
      id="home"
      data-ocid="hero.section"
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* Studio photo background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('/assets/generated/studio-hero.dim_1400x900.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      />
      {/* Light warm overlay so text stays readable */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.99 0.02 75 / 0.88) 0%, oklch(0.97 0.03 80 / 0.80) 40%, oklch(0.99 0.02 75 / 0.70) 100%)",
        }}
      />

      {/* Radial amber glow blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.65 0.18 75 / 0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-20 right-1/4 w-[480px] h-[480px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.70 0.15 80 / 0.10) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 hero-bg-grid opacity-40"
      />

      {/* Main content grid */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">
            {/* Left — text content */}
            <div className="flex flex-col gap-5 text-center lg:text-left">
              {/* Overline badge */}
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center gap-2 justify-center lg:justify-start"
              >
                <div className="h-px w-8 bg-primary" />
                <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary">
                  SK PHOTOSTUDIO · Khapri, Maharashtra
                </span>
                <div className="h-px w-8 bg-primary" />
              </motion.div>

              {/* Main headline */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="font-display font-black leading-tight text-foreground"
              >
                <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                  Capture Your
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-gradient">
                  Precious Moments
                </span>
              </motion.h1>

              {/* Service typewriter */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="flex items-center gap-3 justify-center lg:justify-start"
              >
                <span className="text-muted-foreground font-medium text-lg">
                  Specialising in
                </span>
                <ServiceTypewriter />
              </motion.div>

              {/* Rating */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="flex justify-center lg:justify-start"
              >
                <RatingBadge />
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="text-muted-foreground leading-relaxed text-base max-w-lg mx-auto lg:mx-0"
              >
                Professional photo albums, framing, printing & passport photos
                in Khapri, Maharashtra. Open daily till 9 PM — walk-ins welcome,
                same-day service available.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              >
                <motion.a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="hero.book_now.primary_button"
                  whileHover={{
                    y: -2,
                    boxShadow: "0 12px 36px oklch(0.65 0.18 75 / 0.30)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl
                    font-display font-bold text-sm tracking-wider uppercase
                    bg-primary text-primary-foreground shadow-md
                    border border-primary/20 transition-glow"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.852L.062 23.938l6.26-1.452A11.948 11.948 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.003-1.37l-.36-.213-3.716.861.881-3.61-.234-.371A9.818 9.818 0 1 1 12 21.818z" />
                  </svg>
                  Book Now on WhatsApp
                </motion.a>
                <RippleButton
                  data-ocid="hero.view_work.secondary_button"
                  onClick={scrollToGallery}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl
                    font-display font-bold text-sm tracking-wider uppercase
                    border-2 border-foreground/20 text-foreground bg-card/60
                    hover:bg-card hover:border-primary/40 transition-smooth backdrop-blur-sm"
                >
                  📷 View Our Work
                </RippleButton>
              </motion.div>

              {/* Phone + booking form link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="flex flex-col sm:flex-row gap-3 items-center justify-center lg:justify-start pt-1"
              >
                <a
                  href="tel:08005469120"
                  data-ocid="hero.phone.link"
                  className="flex items-center gap-2 text-foreground font-bold text-lg hover:text-primary transition-colors duration-200"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 border border-primary/20">
                    <Phone className="w-4 h-4 text-primary" />
                  </span>
                  080554 69120
                </a>
                <span className="hidden sm:block text-border font-light">
                  |
                </span>
                <button
                  type="button"
                  onClick={scrollToContact}
                  data-ocid="hero.contact.secondary_button"
                  className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors duration-200"
                >
                  Or fill our booking form →
                </button>
              </motion.div>
            </div>

            {/* Right — 3D canvas */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1.0,
                delay: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              data-ocid="hero.3d_canvas"
              className="relative w-full h-[380px] md:h-[480px] lg:h-[560px]"
            >
              {/* Warm glow behind 3D */}
              <div
                aria-hidden="true"
                className="absolute inset-12 rounded-full"
                style={{
                  background:
                    "radial-gradient(ellipse, oklch(0.65 0.18 75 / 0.18), transparent 70%)",
                  filter: "blur(36px)",
                }}
              />
              <HeroScene className="absolute inset-0" />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 0.8 }}
                className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[11px] text-muted-foreground/50 tracking-widest pointer-events-none whitespace-nowrap uppercase font-semibold"
              >
                Click to interact
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <motion.button
        type="button"
        data-ocid="hero.scroll_down.button"
        onClick={scrollDown}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 2.8, duration: 0.6 },
          y: {
            delay: 2.8,
            duration: 1.8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2
          text-muted-foreground hover:text-primary transition-colors duration-300 group"
        aria-label="Scroll down"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">
          Scroll
        </span>
        <div className="w-7 h-7 rounded-full border border-border/60 flex items-center justify-center group-hover:border-primary/60 transition-colors duration-300 bg-card/60 backdrop-blur-sm">
          <ChevronDown className="w-4 h-4" />
        </div>
      </motion.button>
    </section>
  );
}
