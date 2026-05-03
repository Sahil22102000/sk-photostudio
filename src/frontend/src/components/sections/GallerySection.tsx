import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCallback, useRef, useState } from "react";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  filter: "Portraits" | "Printing" | "Framing" | "Events";
  imageUrl: string;
  alt: string;
}

const GALLERY: GalleryItem[] = [
  {
    id: "g1",
    title: "Studio Portrait Session",
    category: "Portraits",
    filter: "Portraits",
    imageUrl:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=400&fit=crop",
    alt: "Studio portrait of a person with professional lighting",
  },
  {
    id: "g2",
    title: "Family Photo Print",
    category: "Portraits",
    filter: "Portraits",
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
    alt: "Warm family portrait with natural smiles",
  },
  {
    id: "g3",
    title: "Passport & Visa Photos",
    category: "Visa & Passport",
    filter: "Printing",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    alt: "Formal headshot suitable for passport and visa applications",
  },
  {
    id: "g4",
    title: "Premium Photo Album",
    category: "Photo Albums",
    filter: "Printing",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    alt: "Luxury hardcover photo album open to a spread",
  },
  {
    id: "g5",
    title: "Wooden Frame Showcase",
    category: "Photo Framing",
    filter: "Framing",
    imageUrl:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop",
    alt: "Premium wooden photo frame displayed on a shelf",
  },
  {
    id: "g6",
    title: "Wedding Memories",
    category: "Events",
    filter: "Events",
    imageUrl:
      "https://images.unsplash.com/photo-1537633512757-b4571f94e9ea?w=600&h=400&fit=crop",
    alt: "Bride and groom in a romantic wedding ceremony setting",
  },
  {
    id: "g7",
    title: "Baby & Newborn Album",
    category: "Photo Albums",
    filter: "Printing",
    imageUrl:
      "https://images.unsplash.com/photo-1476703829526-4d9cd5b97f74?w=600&h=400&fit=crop",
    alt: "Newborn baby milestone photos for a keepsake album",
  },
  {
    id: "g8",
    title: "Corporate Headshots",
    category: "Portraits",
    filter: "Portraits",
    imageUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=400&fit=crop",
    alt: "Professional corporate headshot with clean background",
  },
  {
    id: "g9",
    title: "Certificate Framing",
    category: "Photo Framing",
    filter: "Framing",
    imageUrl:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
    alt: "Elegantly framed certificate or diploma on a wall",
  },
];

const FILTERS = ["All", "Portraits", "Printing", "Framing", "Events"] as const;
type FilterType = (typeof FILTERS)[number];

function GalleryCard({
  item,
  index,
  isVisible,
}: {
  item: GalleryItem;
  index: number;
  isVisible: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLSpanElement | null>(null);

  const triggerRipple = useCallback((clientX: number, clientY: number) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const span = document.createElement("span");
    span.className = "ripple-effect";
    span.style.left = `${clientX - rect.left - 50}px`;
    span.style.top = `${clientY - rect.top - 50}px`;
    el.appendChild(span);
    rippleRef.current = span;
    setTimeout(() => span.remove(), 650);
  }, []);

  return (
    <article
      ref={cardRef}
      data-ocid={`gallery.item.${index + 1}`}
      aria-label={`${item.title} — ${item.category}`}
      className={[
        "ripple-container rounded-2xl overflow-hidden cursor-pointer group relative",
        "transition-all duration-400 border",
        isHovered
          ? "scale-[1.03] shadow-[0_8px_32px_oklch(0.65_0.18_75_/_0.22)] border-[oklch(0.65_0.18_75_/_0.5)]"
          : "shadow-md border-border/60 scale-100",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        transitionDelay: isVisible ? `${(index % 3) * 90}ms` : "0ms",
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
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
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-muted">
        {!imgError ? (
          <img
            src={item.imageUrl}
            alt={item.alt}
            className={[
              "w-full h-full object-cover transition-transform duration-500",
              isHovered ? "scale-110" : "scale-100",
            ].join(" ")}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          /* Fallback gradient if image fails */
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-secondary">
            <span className="text-5xl" role="img" aria-label={item.category}>
              📷
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div
          className={[
            "absolute inset-0 bg-gradient-to-t from-[oklch(0.20_0.04_75_/_0.70)] via-transparent to-transparent",
            "transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0",
          ].join(" ")}
          aria-hidden="true"
        />

        {/* Category badge (always visible) */}
        <span
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[oklch(0.65_0.18_75_/_0.88)] text-white shadow-sm"
          data-ocid={`gallery.badge.${index + 1}`}
        >
          {item.category}
        </span>

        {/* Title overlay on hover */}
        <div
          className={[
            "absolute bottom-0 left-0 right-0 px-4 pb-4 pt-8",
            "transition-all duration-300",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          ].join(" ")}
          aria-hidden={!isHovered}
        >
          <p className="text-white font-display font-bold text-base leading-tight drop-shadow">
            {item.title}
          </p>
        </div>
      </div>

      {/* Card footer */}
      <div className="px-4 py-3 bg-card flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
          {item.title}
        </span>
        <span className="text-xs text-muted-foreground border border-border/70 rounded-full px-2.5 py-0.5">
          {item.category}
        </span>
      </div>
    </article>
  );
}

export default function GallerySection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({
    threshold: 0.06,
  });
  const { ref: headingRef, isVisible: headingVisible } = useScrollAnimation({
    threshold: 0.2,
  });
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  const filtered =
    activeFilter === "All"
      ? GALLERY
      : GALLERY.filter((g) => g.filter === activeFilter);

  return (
    <section
      id="gallery"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-24 px-4 overflow-hidden"
      aria-labelledby="gallery-heading"
      data-ocid="gallery.section"
      style={{ background: "oklch(0.97 0.01 75)" }}
    >
      {/* Background grid */}
      <div className="hero-bg-grid absolute inset-0 opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div
          ref={headingRef as React.RefObject<HTMLDivElement>}
          className={[
            "text-center mb-12 transition-all duration-700",
            headingVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6",
          ].join(" ")}
        >
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-4"
            data-ocid="gallery.section_label"
          >
            <span className="w-6 h-px bg-primary" aria-hidden="true" />
            Our Work Portfolio
            <span className="w-6 h-px bg-primary" aria-hidden="true" />
          </span>
          <h2
            id="gallery-heading"
            className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-4"
            data-ocid="gallery.heading"
          >
            Showcasing SK <span className="text-gradient">PHOTOSTUDIO's</span>{" "}
            Best Work
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            From passport photos to premium wedding albums — every image handled
            with professional care and exceptional quality.
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          className={[
            "flex flex-wrap items-center justify-center gap-2 mb-10 transition-all duration-700 delay-100",
            headingVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4",
          ].join(" ")}
          role="tablist"
          aria-label="Filter gallery by category"
          data-ocid="gallery.filter_tabs"
        >
          {FILTERS.map((filter) => (
            <button
              type="button"
              key={filter}
              role="tab"
              aria-selected={activeFilter === filter}
              data-ocid={`gallery.filter.tab.${filter.toLowerCase()}`}
              onClick={() => setActiveFilter(filter)}
              className={[
                "px-5 py-2 rounded-full text-sm font-semibold transition-all duration-250 border",
                activeFilter === filter
                  ? "bg-primary text-white border-primary shadow-[0_2px_12px_oklch(0.65_0.18_75_/_0.3)]"
                  : "bg-card text-muted-foreground border-border/70 hover:border-primary/40 hover:text-primary hover:bg-primary/5",
              ].join(" ")}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="section-divider mb-10" aria-hidden="true" />

        {/* Gallery Grid */}
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0 m-0"
          data-ocid="gallery.list"
          aria-label="Photo gallery"
        >
          {filtered.map((item, index) => (
            <li key={item.id}>
              <GalleryCard item={item} index={index} isVisible={isVisible} />
            </li>
          ))}
        </ul>

        {/* Empty state for filter */}
        {filtered.length === 0 && (
          <div
            className="text-center py-16 text-muted-foreground"
            data-ocid="gallery.empty_state"
          >
            <p className="text-4xl mb-3">📷</p>
            <p className="font-semibold text-foreground">
              No items in this category yet
            </p>
            <p className="text-sm mt-1">Check back soon for new work!</p>
          </div>
        )}

        {/* CTA */}
        <div
          className={[
            "text-center mt-14 transition-all duration-700 delay-500",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          <a
            href="https://wa.me/918005469120?text=Hi%20SK%20PHOTOSTUDIO%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20enquire%20about%20an%20order."
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="gallery.enquire.primary_button"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-[oklch(0.58_0.18_75)] shadow-[0_4px_16px_oklch(0.65_0.18_75_/_0.30)] hover:shadow-[0_6px_24px_oklch(0.65_0.18_75_/_0.40)] transition-smooth"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Enquire About Your Order
          </a>
        </div>
      </div>
    </section>
  );
}
