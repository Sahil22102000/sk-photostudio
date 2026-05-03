import {
  Facebook,
  Instagram,
  type LucideIcon,
  MessageCircle,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface SocialLink {
  id: string;
  icon: LucideIcon;
  label: string;
  href: string;
  hoverColor: string;
  glowColor: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "whatsapp",
    icon: MessageCircle,
    label: "WhatsApp",
    href: "https://wa.me/918005469120?text=Hi%20SK%20PHOTOSTUDIO%20I%20would%20like%20to%20book%20an%20appointment",
    hoverColor: "#25D366",
    glowColor: "rgba(37,211,102,0.55)",
  },
  {
    id: "instagram",
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com",
    hoverColor: "#E1306C",
    glowColor: "rgba(225,48,108,0.55)",
  },
  {
    id: "facebook",
    icon: Facebook,
    label: "Facebook",
    href: "https://facebook.com",
    hoverColor: "#1877F2",
    glowColor: "rgba(24,119,242,0.55)",
  },
  {
    id: "phone",
    icon: Phone,
    label: "Call Us",
    href: "tel:08005469120",
    hoverColor: "#d97706",
    glowColor: "rgba(217,119,6,0.55)",
  },
];

interface SocialIconProps {
  link: SocialLink;
  index: number;
}

function SocialIcon({ link, index }: SocialIconProps) {
  const [hovered, setHovered] = useState(false);
  const Icon = link.icon;

  return (
    <motion.div
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        delay: 0.3 + index * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      className="relative flex items-center"
    >
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
        transition={{ duration: 0.18 }}
        className="absolute left-14 pointer-events-none z-50 whitespace-nowrap"
        aria-hidden="true"
      >
        <div
          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-foreground glass-card shadow-lg"
          style={{ boxShadow: `0 0 14px ${link.glowColor}` }}
        >
          {link.label}
          <span
            className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-0 h-0"
            style={{
              borderRight: "6px solid oklch(0.98 0.02 75 / 0.95)",
              borderTop: "5px solid transparent",
              borderBottom: "5px solid transparent",
            }}
          />
        </div>
      </motion.div>

      {/* Icon Button */}
      <a
        href={link.href}
        target={link.id === "phone" ? "_self" : "_blank"}
        rel="noopener noreferrer"
        data-ocid={`social.${link.id}.link`}
        aria-label={link.label}
        className="group relative flex items-center justify-center w-10 h-10 rounded-full glass-card transition-all duration-300 cursor-pointer"
        style={{
          boxShadow: hovered
            ? `0 0 18px ${link.glowColor}, 0 0 36px ${link.glowColor.replace("0.55", "0.2")}`
            : "none",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        <motion.div
          animate={{ scale: hovered ? 1.22 : 1 }}
          transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
        >
          <Icon
            className="w-4 h-4 transition-colors duration-300"
            style={{ color: hovered ? link.hoverColor : "oklch(0.45 0.06 75)" }}
            strokeWidth={1.8}
          />
        </motion.div>

        {hovered && (
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              border: `1.5px solid ${link.hoverColor}`,
              boxShadow: `0 0 8px ${link.glowColor}`,
              opacity: 0.7,
            }}
          />
        )}
      </a>
    </motion.div>
  );
}

export default function SocialSidebar() {
  return (
    <>
      {/* Desktop: fixed left sidebar */}
      <div
        className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-50 flex-col gap-2.5"
        aria-label="Social media links"
        data-ocid="social.sidebar"
      >
        {SOCIAL_LINKS.map((link, index) => (
          <SocialIcon key={link.id} link={link} index={index} />
        ))}
      </div>

      {/* Mobile: inline in footer area */}
      <div
        className="flex md:hidden justify-center gap-3 py-4"
        aria-label="Social media links"
        data-ocid="social.mobile"
      >
        {SOCIAL_LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.id}
              href={link.href}
              target={link.id === "phone" ? "_self" : "_blank"}
              rel="noopener noreferrer"
              aria-label={link.label}
              data-ocid={`social.mobile.${link.id}.link`}
              className="flex items-center justify-center w-9 h-9 rounded-full glass-card hover:scale-110 transition-smooth"
              style={{ color: link.hoverColor }}
            >
              <Icon className="w-4 h-4" strokeWidth={1.8} />
            </a>
          );
        })}
      </div>
    </>
  );
}
