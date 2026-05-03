import { useActor } from "@caffeineai/core-infrastructure";
import { CheckCircle, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { createActor } from "../../backend";

const PROGRAMS = [
  "Engineering",
  "Science",
  "Arts & Humanities",
  "Commerce",
  "Research",
  "MBA",
  "Other",
];

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Address",
    value: "42 Knowledge Park, Lumina Nagar, Maharashtra 440001",
    colorClass: "text-primary",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 712 234 5678",
    colorClass: "text-secondary",
  },
  {
    icon: Mail,
    label: "Email",
    value: "admissions@lumina.edu",
    colorClass: "text-accent",
  },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  programInterest: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  programInterest?: string;
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
  programInterest: "",
  message: "",
};

export default function ContactSection() {
  const { actor, isFetching } = useActor(createActor);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = useCallback((): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) {
      e.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Enter a valid email address";
    }
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.programInterest) e.programInterest = "Please select a program";
    if (!form.message.trim()) e.message = "Message is required";
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
        const success = await actor.submitContactForm(
          form.name,
          form.email,
          form.phone,
          form.programInterest,
          form.message,
        );
        if (success) {
          setSubmitted(true);
          toast.success("Message sent! We'll get back to you shortly.", {
            duration: 5000,
          });
          setForm(EMPTY_FORM);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } catch {
        toast.error("Failed to send message. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, validate, actor, isFetching],
  );

  const inputCls = (field: keyof FormErrors) =>
    [
      "w-full px-4 py-3 rounded-lg text-sm text-foreground placeholder:text-muted-foreground",
      "glass-card focus:outline-none focus:ring-2 transition-smooth",
      errors[field]
        ? "focus:ring-destructive/60 border-destructive/40"
        : "focus:ring-accent/60 focus:border-accent/40",
    ].join(" ");

  return (
    <section
      id="contact"
      className="relative py-24 bg-background overflow-hidden"
      data-ocid="contact.section"
    >
      {/* Decorative glows */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, oklch(0.65 0.22 188 / 0.4) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, oklch(0.62 0.25 33 / 0.4) 0%, transparent 70%)",
        }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            Connect With Us
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-gradient mb-4">
            Get In Touch
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Have questions about admissions, programs, or research
            opportunities? Our team is here to guide you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Left — Contact Info */}
          <motion.div
            className="lg:col-span-2 space-y-5"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {CONTACT_INFO.map((item, i) => (
              <motion.div
                key={item.label}
                className="glass-card-hover rounded-xl p-5 flex items-start gap-4 ripple-container cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.1 }}
                onClick={addRipple}
                data-ocid={`contact.info.item.${i + 1}`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${item.colorClass} bg-card/80`}
                >
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                    {item.label}
                  </div>
                  <div className="text-sm text-foreground break-words leading-relaxed">
                    {item.value}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Grid map decoration */}
            <motion.div
              className="glass-card rounded-xl overflow-hidden h-44 flex items-center justify-center relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="hero-bg-grid absolute inset-0 opacity-50" />
              <div className="relative text-center">
                <MapPin className="w-8 h-8 text-accent mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">
                  Lumina Nagar, Maharashtra
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card rounded-2xl p-8">
              {submitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-12 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  data-ocid="contact.form.success_state"
                >
                  <CheckCircle className="w-16 h-16 text-accent mb-4" />
                  <h3 className="font-display font-bold text-2xl text-foreground mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-sm">
                    Thank you for reaching out. Our admissions team will contact
                    you within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2 rounded-lg text-sm font-semibold text-accent border border-accent/40 hover:bg-accent/10 transition-smooth"
                    data-ocid="contact.form.send_another_button"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  data-ocid="contact.form"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Arjun Sharma"
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
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="arjun@example.com"
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
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2"
                      >
                        Phone Number *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
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

                    {/* Program Interest */}
                    <div>
                      <label
                        htmlFor="contact-program"
                        className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2"
                      >
                        Program Interest *
                      </label>
                      <select
                        id="contact-program"
                        name="programInterest"
                        value={form.programInterest}
                        onChange={handleChange}
                        className={`${inputCls("programInterest")} appearance-none cursor-pointer`}
                        data-ocid="contact.program.select"
                      >
                        <option value="" disabled>
                          Select a program
                        </option>
                        {PROGRAMS.map((p) => (
                          <option key={p} value={p} className="bg-card">
                            {p}
                          </option>
                        ))}
                      </select>
                      {errors.programInterest && (
                        <p
                          className="mt-1 text-xs text-destructive"
                          data-ocid="contact.program.field_error"
                        >
                          {errors.programInterest}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-6">
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us about your academic goals and any questions you have about our programs..."
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
                    className="ripple-container w-full py-3.5 rounded-xl font-semibold text-sm text-primary-foreground relative overflow-hidden transition-glow disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.62 0.25 33) 0%, oklch(0.7 0.22 45) 100%)",
                    }}
                    data-ocid="contact.form.submit_button"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2
                          className="w-4 h-4 animate-spin"
                          data-ocid="contact.form.loading_state"
                        />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="w-4 h-4" />
                        Send Message
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
