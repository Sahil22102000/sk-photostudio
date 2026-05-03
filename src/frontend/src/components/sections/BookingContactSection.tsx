import { useActor } from "@caffeineai/core-infrastructure";
import {
  Calendar,
  CheckCircle,
  Clock,
  ExternalLink,
  Loader2,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { createActor } from "../../backend";

const WHATSAPP_URL =
  "https://wa.me/918005469120?text=Hi%20SK%20PHOTOSTUDIO%2C%20I%20would%20like%20to%20book%20an%20appointment";
const MAPS_URL =
  "https://maps.google.com/?q=SK+PHOTOSTUDIO+New+Khapri+Maharashtra+441108";

const SERVICES = [
  "Photo Albums",
  "Photo Framing",
  "Photo Printing",
  "Visa & Passport Photos",
  "Other / General Enquiry",
];

const HOURS = [
  { day: "Monday – Saturday", time: "Open till 9:00 PM" },
  { day: "Sunday", time: "By appointment only" },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

function addRipple(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const span = document.createElement("span");
  span.className = "ripple-effect";
  span.style.left = `${e.clientX - rect.left - 50}px`;
  span.style.top = `${e.clientY - rect.top - 50}px`;
  el.appendChild(span);
  setTimeout(() => span.remove(), 700);
}

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  service: "",
  date: "",
  message: "",
};

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2"
    >
      {children}
    </label>
  );
}

export default function BookingContactSection() {
  const { actor, isFetching } = useActor(createActor);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = useCallback((): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      e.email = "Invalid email address";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.service) e.service = "Please select a service";
    if (!form.message.trim()) e.message = "Please describe your requirements";
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [form]);

  const handleChange = useCallback(
    (
      ev: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const { name, value } = ev.target;
      setForm((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (ev: React.FormEvent) => {
      ev.preventDefault();
      if (!validate() || !actor || isFetching) return;
      setIsSubmitting(true);
      try {
        const messageWithDate = form.date
          ? `${form.message}\nPreferred Date: ${form.date}`
          : form.message;
        const success = await actor.submitContactForm(
          form.name,
          form.email,
          form.phone,
          form.service,
          messageWithDate,
        );
        if (success) {
          setSubmitted(true);
          toast.success(
            "Appointment request sent! We'll call you to confirm.",
            {
              duration: 5000,
            },
          );
          setForm(EMPTY_FORM);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } catch {
        toast.error("Failed to send. Please call us directly at 080554 69120.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, validate, actor, isFetching],
  );

  const inputCls = (field: keyof FormErrors) =>
    [
      "w-full px-4 py-3 rounded-lg text-sm text-foreground placeholder:text-muted-foreground",
      "bg-background border focus:outline-none focus:ring-2 transition-smooth",
      errors[field]
        ? "border-destructive/60 focus:ring-destructive/40"
        : "border-border focus:ring-primary/40 focus:border-primary/50",
    ].join(" ");

  return (
    <section
      id="contact"
      className="relative py-24 overflow-hidden"
      style={{ background: "oklch(0.97 0.015 75)" }}
      data-ocid="contact.section"
    >
      {/* Decorative background shapes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.65 0.18 75 / 0.07) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.75 0.05 75 / 0.08) 0%, transparent 65%)",
        }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            Book an Appointment
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-gradient mt-4 mb-4">
            Let's Capture Your Story
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
            We'd love to capture your special moments. Fill the form or reach us
            directly — we'll confirm your slot within the hour.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* ── LEFT: Contact Info ── */}
          <motion.div
            className="lg:col-span-2 space-y-5"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Heading */}
            <div>
              <h3 className="font-display font-bold text-2xl text-foreground mb-1">
                Book An Appointment
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We'd love to capture your special moments — reach out and let's
                plan something beautiful together.
              </p>
            </div>

            {/* Phone — large, prominent */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-5"
            >
              <div className="flex items-center gap-3 mb-1">
                <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Call Us
                </span>
              </div>
              <a
                href="tel:08005469120"
                className="text-3xl font-display font-bold text-foreground hover:text-primary transition-smooth block leading-tight mt-1"
                data-ocid="contact.phone.link"
              >
                080554 69120
              </a>
              <p className="text-xs text-muted-foreground mt-1">
                Tap to call us directly
              </p>
            </motion.div>

            {/* Book Now on WhatsApp — green CTA */}
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              data-ocid="contact.whatsapp.primary_button"
              className="ripple-container flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-base transition-smooth hover:scale-[1.02] active:scale-[0.98] bg-green-500 hover:bg-green-600 text-white shadow-[0_4px_20px_theme(colors.green.500/25%)]"
              onClick={addRipple}
            >
              <MessageCircle className="w-5 h-5" />📅 Book Now on WhatsApp
            </motion.a>

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="glass-card rounded-2xl p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Business Hours
                </span>
              </div>
              {HOURS.map((h) => (
                <div
                  key={h.day}
                  className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                >
                  <span className="text-sm text-foreground font-medium">
                    {h.day}
                  </span>
                  <span className="text-sm text-primary font-semibold">
                    {h.time}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Address + Directions */}
            <motion.a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              data-ocid="contact.directions.link"
              className="glass-card-hover rounded-2xl p-5 flex items-start gap-4 block group"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Our Location
                </span>
                <p className="text-sm text-foreground font-medium leading-relaxed mt-1 break-words">
                  3335+8VC, New Khapri, Khapri,
                  <br />
                  Maharashtra 441108
                </p>
                <span className="inline-flex items-center gap-1 text-xs text-primary font-semibold mt-2 group-hover:underline">
                  Get Directions <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </motion.a>

            {/* Appointment icon strip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="glass-card rounded-2xl p-4 flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Online Appointments Available
                </p>
                <p className="text-xs text-muted-foreground">
                  Book via form or WhatsApp
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Booking Form ── */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card rounded-3xl shadow-sm border border-border/60 p-8">
              {submitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-14 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  data-ocid="contact.form.success_state"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                    style={{ background: "oklch(0.65 0.18 75 / 0.12)" }}
                  >
                    <CheckCircle className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-foreground mb-3">
                    Appointment Booked! 🎉
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-sm leading-relaxed mb-1">
                    Your appointment has been booked! We will call you to
                    confirm.
                  </p>
                  <p className="text-xs text-muted-foreground mb-6">
                    Or reach us directly on{" "}
                    <a
                      href="tel:08005469120"
                      className="text-primary font-semibold hover:underline"
                    >
                      080554 69120
                    </a>
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="flex-1 px-6 py-2.5 rounded-xl text-sm font-semibold border border-primary/40 text-primary hover:bg-primary/10 transition-smooth"
                      data-ocid="contact.form.send_another_button"
                    >
                      Book Another
                    </button>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-green-500 hover:bg-green-600 transition-smooth"
                    >
                      <MessageCircle className="w-4 h-4" /> WhatsApp
                    </a>
                  </div>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  data-ocid="contact.form"
                >
                  <div className="mb-7">
                    <h3 className="font-display font-bold text-xl text-foreground mb-1">
                      Schedule Your Visit
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      All fields marked * are required.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    {/* Full Name */}
                    <div>
                      <FieldLabel htmlFor="contact-name">
                        Full Name *
                      </FieldLabel>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Ramesh Kumar"
                        className={inputCls("name")}
                        data-ocid="contact.name.input"
                        autoComplete="name"
                      />
                      {errors.name && (
                        <p
                          className="mt-1 text-xs text-destructive"
                          data-ocid="contact.name.field_error"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <FieldLabel htmlFor="contact-email">
                        Email Address *
                      </FieldLabel>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="ramesh@example.com"
                        className={inputCls("email")}
                        data-ocid="contact.email.input"
                        autoComplete="email"
                      />
                      {errors.email && (
                        <p
                          className="mt-1 text-xs text-destructive"
                          data-ocid="contact.email.field_error"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <FieldLabel htmlFor="contact-phone">
                        Phone Number *
                      </FieldLabel>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="9876543210"
                        className={inputCls("phone")}
                        data-ocid="contact.phone.input"
                        autoComplete="tel"
                      />
                      {errors.phone && (
                        <p
                          className="mt-1 text-xs text-destructive"
                          data-ocid="contact.phone.field_error"
                        >
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Service */}
                    <div>
                      <FieldLabel htmlFor="contact-service">
                        Service *
                      </FieldLabel>
                      <div className="relative">
                        <select
                          id="contact-service"
                          name="service"
                          value={form.service}
                          onChange={handleChange}
                          className={`${inputCls("service")} appearance-none cursor-pointer pr-10`}
                          data-ocid="contact.service.select"
                        >
                          <option value="" disabled>
                            Select a service…
                          </option>
                          {SERVICES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M3 5l4 4 4-4"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                      {errors.service && (
                        <p
                          className="mt-1 text-xs text-destructive"
                          data-ocid="contact.service.field_error"
                        >
                          {errors.service}
                        </p>
                      )}
                    </div>

                    {/* Preferred Date */}
                    <div className="sm:col-span-2">
                      <FieldLabel htmlFor="contact-date">
                        Preferred Date
                      </FieldLabel>
                      <input
                        id="contact-date"
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg text-sm text-foreground bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-smooth"
                        data-ocid="contact.date.input"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-6">
                    <FieldLabel htmlFor="contact-message">
                      Message / Special Requirements *
                    </FieldLabel>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Describe what you need — e.g. 'Wedding album for 200 photos, hardcover' or 'Passport photos for UK visa (2 copies)'"
                      className={`${inputCls("message")} resize-none`}
                      data-ocid="contact.message.textarea"
                    />
                    {errors.message && (
                      <p
                        className="mt-1 text-xs text-destructive"
                        data-ocid="contact.message.field_error"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting || isFetching}
                    onClick={addRipple}
                    className="ripple-container w-full py-4 rounded-xl font-bold text-sm relative overflow-hidden transition-glow hover:glow-primary disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99] transition-smooth"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.65 0.18 75) 0%, oklch(0.6 0.15 60) 100%)",
                      color: "oklch(0.15 0.01 0)",
                    }}
                    data-ocid="contact.form.submit_button"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2
                          className="w-4 h-4 animate-spin"
                          data-ocid="contact.form.loading_state"
                        />
                        Sending Request…
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="w-4 h-4" />
                        Send Booking Request
                      </span>
                    )}
                  </button>

                  <p className="text-center text-xs text-muted-foreground mt-4">
                    Or call us directly at{" "}
                    <a
                      href="tel:08005469120"
                      className="text-primary font-semibold hover:underline"
                      data-ocid="contact.phone_cta.link"
                    >
                      080554 69120
                    </a>
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
