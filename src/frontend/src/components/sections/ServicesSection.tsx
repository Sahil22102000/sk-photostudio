import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  ArrowRight,
  BookOpen,
  Camera,
  Frame,
  Printer,
  ShieldCheck,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import type { RippleEvent } from "../../types/index";

interface ServiceCard {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconComponent: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  details: string[];
  imageUrl: string;
  imageAlt: string;
  featured?: boolean;
  accentColor: string;
  glowClass: "glow-primary" | "glow-accent" | "glow-secondary";
}

const SERVICES: ServiceCard[] = [
  {
    id: "photo-albums",
    title: "Photo Albums",
    tagline: "Preserve Your Memories Forever",
    description:
      "Our custom-designed photo albums transform your cherished moments into timeless keepsakes. Each album is professionally crafted with premium binding and archival-quality paper, so your memories stay vivid for generations. Choose from lay-flat, hardcover, or softcover styles in a wide range of sizes.",
    details: [
      "Hardcover, softcover & lay-flat album styles",
      "Sizes from 5×7 up to 14×11 inches",
      "Professional digital layout design included",
      "Same-day express album service available",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1502700807168-484a3e7889d0?w=600&q=80&fit=crop",
    imageAlt: "Beautiful wedding photo album with warm amber light",
    iconComponent: BookOpen,
    accentColor: "oklch(0.65 0.18 75)",
    glowClass: "glow-primary",
    featured: true,
  },
  {
    id: "photo-framing",
    title: "Photo Framing",
    tagline: "Frame What Matters Most",
    description:
      "Elevate your photographs and artwork with our high-quality custom framing service. We offer an extensive selection of wood, metal, and acrylic frames paired with mat options in every colour. Whether it's a family portrait, a certificate, or a landscape — our expert framers ensure every piece looks gallery-perfect.",
    details: [
      "100+ frame styles in wood, metal & acrylic",
      "UV-protective glass to prevent fading",
      "Custom mat cutting in any colour or size",
      "Perfect for portraits, certificates & artwork",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80&fit=crop",
    imageAlt: "Elegant framed photographs displayed on a wall",
    iconComponent: Frame,
    accentColor: "oklch(0.60 0.15 65)",
    glowClass: "glow-accent",
    featured: false,
  },
  {
    id: "photo-printing",
    title: "Photo Printing",
    tagline: "Stunning Prints, Fast Delivery",
    description:
      "Experience true colour accuracy with our professional-grade photo printing. We use premium inkjet and dye-sublimation technology on a variety of paper finishes — matte, glossy, satin, and canvas. From wallet-size prints to large 24×36 posters, every print is produced with vibrant, long-lasting colours.",
    details: [
      "Matte, glossy, satin & canvas finishes",
      "Wallet prints to 24×36 large-format posters",
      "Same-day 1-hour express printing",
      "Bulk order discounts available",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80&fit=crop",
    imageAlt: "High-quality photo prints spread on a table",
    iconComponent: Printer,
    accentColor: "oklch(0.55 0.14 70)",
    glowClass: "glow-secondary",
    featured: false,
  },
  {
    id: "visa-passport",
    title: "Visa & Passport Photos",
    tagline: "Compliant Photos in 10 Minutes",
    description:
      "Get your official Visa and Passport photographs taken accurately against a pure white background, meeting all Indian and international government specifications. We provide instant digital delivery alongside printed copies — accepted by all embassies, consulates, and government offices without hassle.",
    details: [
      "100% compliant with government standards",
      "Covers Schengen, US, UK, Indian passport & more",
      "Digital copies sent instantly to your phone",
      "Walk-in service — ready in just 10 minutes",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=600&q=80&fit=crop",
    imageAlt: "Professional passport photo setup with white background",
    iconComponent: ShieldCheck,
    accentColor: "oklch(0.65 0.18 75)",
    glowClass: "glow-primary",
    featured: true,
  },
];

interface CardProps {
  service: ServiceCard;
  index: number;
  isVisible: boolean;
}

function ServiceCardItem({ service, index, isVisible }: CardProps) {
  const [ripples, setRipples] = useState<RippleEvent[]>([]);
  const [isHovered, setIsHovered] = useState(false);
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

  const Icon = service.iconComponent;
  const delay = index * 120;
  const overlayGradient = isHovered
    ? `linear-gradient(to top, ${service.accentColor.replace(")", " / 0.65)")}, transparent 60%)`
    : "linear-gradient(to top, oklch(0.15 0.02 0 / 0.55), transparent 60%)";

  return (
    <article
      ref={cardRef}
      data-ocid={`services.item.${index + 1}`}
      className={[
        "ripple-container rounded-2xl overflow-hidden cursor-default select-none",
        "border transition-all duration-350 ease-out flex flex-col",
        isHovered
          ? "translate-y-[-8px] shadow-2xl"
          : "shadow-md border-border/50",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
        background: "oklch(0.99 0.015 75)",
        borderColor: isHovered
          ? `${service.accentColor.replace(")", " / 0.55)")}`
          : "oklch(0.88 0.02 75 / 0.6)",
        boxShadow: isHovered
          ? `0 16px 48px ${service.accentColor.replace(")", " / 0.18)")}, 0 4px 16px oklch(0 0 0 / 0.06)`
          : "0 2px 12px oklch(0 0 0 / 0.06)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => triggerRipple(e.clientX, e.clientY)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          triggerRipple(0, 0);
        }
      }}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          className="ripple-effect"
          style={{ left: r.x, top: r.y }}
          aria-hidden="true"
        />
      ))}

      {/* Service image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <img
          src={service.imageUrl}
          alt={service.imageAlt}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: isHovered ? "scale(1.08)" : "scale(1.0)" }}
          loading="lazy"
        />
        {/* Amber gradient overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{ background: overlayGradient }}
        />

        {/* Featured badge */}
        {service.featured && (
          <span
            className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
            style={{
              background: service.accentColor.replace(")", " / 0.92)"),
              color: "oklch(0.10 0.02 0)",
            }}
          >
            <Camera className="w-2.5 h-2.5" /> Popular
          </span>
        )}

        {/* Icon badge on image */}
        <div
          className="absolute bottom-3 left-4 w-11 h-11 rounded-xl flex items-center justify-center shadow-lg"
          style={{
            background: "oklch(0.99 0.01 75 / 0.95)",
            color: service.accentColor,
          }}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Card content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Tagline */}
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-1 transition-colors duration-300"
          style={{ color: service.accentColor }}
        >
          {service.tagline}
        </p>

        <h3
          className={[
            "font-display font-bold text-xl mb-3 transition-colors duration-300",
            isHovered ? "text-gradient" : "text-foreground",
          ].join(" ")}
        >
          {service.title}
        </h3>

        <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
          {service.description}
        </p>

        {/* Divider */}
        <div
          className="h-px mb-4 rounded-full transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, ${service.accentColor.replace(")", " / 0.3)")}, transparent)`,
            opacity: isHovered ? 1 : 0.5,
          }}
        />

        {/* Key features */}
        <ul className="space-y-2 mb-5">
          {service.details.map((d) => (
            <li
              key={d}
              className="flex items-start gap-2.5 text-xs text-muted-foreground"
            >
              <span
                className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                style={{ background: service.accentColor }}
              />
              <span>{d}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={`https://wa.me/918005469120?text=Hi%20SK%20PHOTOSTUDIO%2C%20I%27m%20interested%20in%20your%20${encodeURIComponent(service.title)}%20service`}
          target="_blank"
          rel="noopener noreferrer"
          data-ocid={`services.booknow.${index + 1}`}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 group/cta"
          style={{ color: service.accentColor }}
        >
          <span>Book Now</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/cta:translate-x-1" />
        </a>
      </div>
    </article>
  );
}

export default function ServicesSection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({
    threshold: 0.08,
  });
  const { ref: headingRef, isVisible: headingVisible } = useScrollAnimation({
    threshold: 0.2,
  });

  return (
    <section
      id="services"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-24 px-4 overflow-hidden"
      aria-labelledby="services-heading"
      data-ocid="services.section"
      style={{ background: "oklch(0.975 0.015 75)" }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.65 0.18 75 / 0.08), transparent 65%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.60 0.15 65 / 0.07), transparent 65%)",
        }}
        aria-hidden="true"
      />
      {/* Subtle dot grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.65 0.18 75 / 0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
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
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-4"
            data-ocid="services.section_label"
          >
            <span className="w-8 h-px bg-primary" />
            What We Offer
            <span className="w-8 h-px bg-primary" />
          </span>

          <h2
            id="services-heading"
            className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-4"
            data-ocid="services.heading"
          >
            Our <span className="text-gradient">Professional Services</span>
          </h2>

          <p
            className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"
            data-ocid="services.subheading"
          >
            SK PHOTOSTUDIO brings years of expertise in photography services to
            Khapri. Every print, frame, and album is handled with precision and
            care — because your memories deserve nothing less.
          </p>
        </div>

        <div className="section-divider mb-16" aria-hidden="true" />

        {/* Cards grid */}
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 list-none p-0 m-0"
          data-ocid="services.list"
        >
          {SERVICES.map((service, index) => (
            <li key={service.id} className="flex">
              <ServiceCardItem
                service={service}
                index={index}
                isVisible={isVisible}
              />
            </li>
          ))}
        </ul>

        {/* Bottom CTA */}
        <div
          className={[
            "text-center mt-14 transition-all duration-700 delay-500",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          <p className="text-muted-foreground text-sm mb-5">
            Not sure which service you need? We're happy to help — just reach
            out.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/918005469120?text=Hi%20SK%20PHOTOSTUDIO%2C%20I%27d%20like%20to%20book%20an%20appointment"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="services.book_appointment.primary_button"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:glow-primary-strong transition-glow hover:opacity-90"
            >
              📅 Book an Appointment
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="tel:+918005469120"
              data-ocid="services.call.secondary_button"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border font-semibold text-sm transition-all duration-200 hover:bg-primary/5"
              style={{
                borderColor: "oklch(0.65 0.18 75 / 0.4)",
                color: "oklch(0.45 0.10 75)",
              }}
            >
              📞 080554 69120
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
