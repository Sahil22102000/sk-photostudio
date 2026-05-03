import {
  Camera,
  Clock,
  Facebook,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  Star,
} from "lucide-react";
import { motion } from "motion/react";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  "Photo Albums",
  "Photo Framing",
  "Photo Printing",
  "Visa & Passport Photos",
];

const SOCIAL_LINKS = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: "https://wa.me/918005469120?text=Hi%20SK%20PHOTOSTUDIO%20I%20would%20like%20to%20book%20an%20appointment",
    hoverClass: "hover:text-green-500",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com",
    hoverClass: "hover:text-pink-500",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://facebook.com",
    hoverClass: "hover:text-blue-600",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer
      className="relative border-t border-border/30 overflow-hidden"
      style={{ background: "oklch(0.96 0.015 75)" }}
      data-ocid="footer.section"
    >
      {/* Subtle grid overlay */}
      <div className="hero-bg-grid absolute inset-0 opacity-20 pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1 — About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary/90 flex items-center justify-center flex-shrink-0">
                <Camera
                  className="w-4 h-4 text-primary-foreground"
                  strokeWidth={1.8}
                />
              </div>
              <div>
                <div className="font-display font-bold text-sm tracking-wide text-foreground">
                  SK PHOTOSTUDIO
                </div>
                <div className="text-xs text-primary font-medium">
                  Premium Photography
                </div>
              </div>
            </div>

            {/* Rating badge */}
            <div className="flex items-center gap-1.5 mb-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className="w-3.5 h-3.5 fill-primary text-primary"
                />
              ))}
              <span className="text-xs font-semibold text-foreground ml-1">
                5.0
              </span>
              <span className="text-xs text-muted-foreground">
                (29 reviews)
              </span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Your trusted photography studio in Khapri, Maharashtra. Capturing
              memories with care — albums, framing, printing, and official photo
              services.
            </p>

            {/* Social icons */}
            <div
              className="flex items-center gap-3"
              data-ocid="footer.social.row"
            >
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`w-9 h-9 rounded-lg glass-card flex items-center justify-center text-muted-foreground transition-smooth ${s.hoverClass} hover:scale-110`}
                  data-ocid={`footer.social.${s.label.toLowerCase()}_link`}
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2 — Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3" data-ocid="footer.quick_links.list">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-2 group"
                    data-ocid={`footer.quick_links.${link.label.toLowerCase()}_link`}
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3 — Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">
              Our Services
            </h4>
            <ul className="space-y-3" data-ocid="footer.services.list">
              {SERVICES.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-2 group"
                    data-ocid={`footer.services.${service.toLowerCase().replace(/\s+/g, "_").replace(/&/g, "and")}_link`}
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors duration-200" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4 — Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">
              Contact Info
            </h4>
            <ul className="space-y-4" data-ocid="footer.contact_info.list">
              <li
                className="flex items-start gap-3"
                data-ocid="footer.contact_info.item.1"
              >
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground leading-relaxed">
                  3335+8VC, New Khapri, Khapri, Maharashtra 441108
                </span>
              </li>
              <li
                className="flex items-start gap-3"
                data-ocid="footer.contact_info.item.2"
              >
                <Phone className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <a
                  href="tel:08005469120"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
                  data-ocid="footer.phone.link"
                >
                  080554 69120
                </a>
              </li>
              <li
                className="flex items-start gap-3"
                data-ocid="footer.contact_info.item.3"
              >
                <Clock className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground leading-relaxed">
                  Open · Closes 9 PM daily
                </span>
              </li>
            </ul>

            <a
              href="https://wa.me/918005469120?text=Hi%20SK%20PHOTOSTUDIO%20I%20would%20like%20to%20book%20an%20appointment"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-primary border border-primary/30 hover:bg-primary/10 hover:border-primary/60 transition-smooth"
              data-ocid="footer.booknow.cta_link"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Book Now on WhatsApp
            </a>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="section-divider mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <span data-ocid="footer.copyright">
            © {year} SK PHOTOSTUDIO. All rights reserved.
          </span>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors duration-200"
            data-ocid="footer.caffeine_link"
          >
            Built with love using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
