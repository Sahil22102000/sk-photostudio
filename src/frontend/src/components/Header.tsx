import { Camera, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useActiveSection, useHeaderScroll } from "../hooks/useScrollAnimation";
import type { NavLink, RippleEvent } from "../types";

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const SECTION_IDS = [
  "home",
  "about",
  "services",
  "gallery",
  "testimonials",
  "contact",
];

const WA_URL =
  "https://wa.me/918005469120?text=Hi%20SK%20PHOTOSTUDIO%20I%20would%20like%20to%20book%20an%20appointment";

function useRipple() {
  const [ripples, setRipples] = useState<RippleEvent[]>([]);

  const createRipple = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((prev) => [
      ...prev,
      { x: e.clientX - rect.left, y: e.clientY - rect.top, id },
    ]);
    setTimeout(
      () => setRipples((prev) => prev.filter((r) => r.id !== id)),
      700,
    );
  }, []);

  return { ripples, createRipple };
}

interface RippleLinkProps {
  link: NavLink;
  isActive: boolean;
  onClick: (href: string) => void;
  mobile?: boolean;
}

function RippleLink({
  link,
  isActive,
  onClick,
  mobile = false,
}: RippleLinkProps) {
  const { ripples, createRipple } = useRipple();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(e);
    onClick(link.href);
  };

  if (mobile) {
    return (
      <button
        type="button"
        data-ocid={`nav.${link.label.toLowerCase()}.link`}
        onClick={handleClick}
        className={`ripple-container relative w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-smooth
          ${
            isActive
              ? "text-primary bg-primary/10 border border-primary/20"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
          }`}
      >
        {link.label}
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

  return (
    <button
      type="button"
      data-ocid={`nav.${link.label.toLowerCase()}.link`}
      onClick={handleClick}
      className={`ripple-container nav-link-glow relative px-1 py-2 text-sm font-medium transition-smooth
        ${isActive ? "text-foreground active" : "text-muted-foreground hover:text-foreground"}`}
    >
      {link.label}
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

export default function Header() {
  const { isScrolled } = useHeaderScroll(50);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);
  const menuRef = useRef<HTMLDivElement>(null);

  const scrollToSection = useCallback((href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <header
      data-ocid="header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${isScrolled ? "glass-header shadow-elevated" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.button
            data-ocid="header.logo.link"
            onClick={() => scrollToSection("#home")}
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-smooth glow-primary" />
              <div className="absolute inset-1 rounded-md bg-primary/90 flex items-center justify-center">
                <Camera
                  className="w-4 h-4 text-primary-foreground"
                  strokeWidth={1.8}
                />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-base tracking-wide text-foreground">
                SK PHOTOSTUDIO
              </span>
              <span className="text-[10px] font-medium text-primary tracking-[0.12em] uppercase">
                Premium Photography
              </span>
            </div>
          </motion.button>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <RippleLink
                key={link.href}
                link={link}
                isActive={activeSection === link.href.replace("#", "")}
                onClick={scrollToSection}
              />
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <motion.a
              data-ocid="header.cta.primary_button"
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold transition-glow hover:glow-primary hover:scale-105 active:scale-100"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              📅 Book Now
            </motion.a>

            <button
              type="button"
              data-ocid="header.mobile_menu.toggle"
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-smooth"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={22} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={menuRef}
            data-ocid="header.mobile_menu.sheet"
            initial={{ opacity: 0, y: -12, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -12, scaleY: 0.95 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden glass-header border-t border-border/30 px-4 py-4"
            style={{ transformOrigin: "top" }}
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                >
                  <RippleLink
                    link={link}
                    isActive={activeSection === link.href.replace("#", "")}
                    onClick={scrollToSection}
                    mobile
                  />
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mt-3 pt-3 border-t border-border/20"
            >
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="header.mobile_cta.primary_button"
                className="w-full flex justify-center py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold transition-smooth hover:glow-primary"
              >
                📅 Book Now on WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
