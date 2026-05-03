import { Camera, MessageSquare, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface ChatMessage {
  id: number;
  role: "bot" | "user";
  text: string;
}

interface QuickReply {
  label: string;
  response: string;
}

const WA_URL =
  "https://wa.me/918005469120?text=Hi%20SK%20PHOTOSTUDIO%20I%20would%20like%20to%20book%20an%20appointment";

const QUICK_REPLIES: QuickReply[] = [
  {
    label: "Our Services",
    response:
      "We offer 4 core services: 📷 Photo Albums (custom design & printing), 🖼️ Photo Framing (premium frames & mounting), 🖨️ Photo Printing (all sizes, same-day available), and 🪪 Visa & Passport Photos (standard govt-compliant sizes). Visit us or call 080554 69120!",
  },
  {
    label: "Book Appointment",
    response: `You can book an appointment directly on WhatsApp! Click here → ${WA_URL}  or call us at 080554 69120. We're open till 9 PM daily.`,
  },
  {
    label: "Opening Hours",
    response:
      "🕘 SK PHOTOSTUDIO is open daily and closes at 9 PM. We welcome walk-ins throughout the day. For guaranteed slot, book in advance via WhatsApp.",
  },
  {
    label: "Location",
    response:
      "📍 We're located at: 3335+8VC, New Khapri, Khapri, Maharashtra 441108. Easily accessible from the main road. Search 'SK PHOTOSTUDIO' on Google Maps to get directions!",
  },
  {
    label: "Contact",
    response:
      "📞 Call us: 080554 69120 | 💬 WhatsApp: +91 80054 69120 | 📍 New Khapri, Khapri, Maharashtra 441108. Our team is happy to help!",
  },
];

const GREETING: ChatMessage = {
  id: 0,
  role: "bot",
  text: "Hello! 📸 Welcome to SK PHOTOSTUDIO. How can I help you today? Choose a quick reply or ask anything!",
};

function useRipple(ref: React.RefObject<HTMLElement | null>) {
  function addRipple(e: React.MouseEvent | React.TouchEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const ripple = document.createElement("span");
    ripple.className = "ripple-effect";
    ripple.style.left = `${x - 50}px`;
    ripple.style.top = `${y - 50}px`;
    el.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  }
  return addRipple;
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [nextId, setNextId] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLButtonElement>(null);
  const addRippleToBubble = useRipple(bubbleRef);

  const lastMessage = messages[messages.length - 1];
  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on new message
  useEffect(scrollToBottom, [lastMessage]);

  function handleQuickReply(reply: QuickReply) {
    const userMsg: ChatMessage = {
      id: nextId,
      role: "user",
      text: reply.label,
    };
    const botMsg: ChatMessage = {
      id: nextId + 1,
      role: "bot",
      text: reply.response,
    };
    setMessages((prev) => [...prev, userMsg]);
    setNextId((n) => n + 2);
    setTimeout(() => {
      setMessages((prev) => [...prev, botMsg]);
    }, 500);
  }

  function handleBubbleClick(e: React.MouseEvent<HTMLButtonElement>) {
    addRippleToBubble(e);
    setOpen((o) => !o);
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.92 }}
            transition={{
              duration: 0.28,
              type: "spring",
              stiffness: 260,
              damping: 22,
            }}
            className="w-[340px] h-[460px] glass-card rounded-2xl flex flex-col overflow-hidden"
            style={{
              boxShadow:
                "0 0 40px oklch(0.65 0.18 75 / 0.15), 0 8px 32px rgba(0,0,0,0.12)",
              border: "1px solid oklch(0.88 0.02 75 / 0.7)",
            }}
            data-ocid="chatbot.dialog"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b"
              style={{
                borderColor: "oklch(0.88 0.02 75 / 0.5)",
                background: "oklch(0.98 0.02 75 / 0.98)",
              }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.65 0.18 75), oklch(0.55 0.15 65))",
                    boxShadow: "0 0 12px oklch(0.65 0.18 75 / 0.4)",
                  }}
                >
                  <Camera className="w-4 h-4 text-white" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground leading-none">
                    SK PHOTOSTUDIO
                  </p>
                  <p className="text-[10px] text-primary mt-0.5">
                    ● Available Now
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                data-ocid="chatbot.close_button"
                className="ripple-container w-7 h-7 rounded-full flex items-center justify-center hover:bg-muted/50 transition-colors duration-200 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
                    style={
                      msg.role === "user"
                        ? {
                            background:
                              "linear-gradient(135deg, oklch(0.65 0.18 75 / 0.9), oklch(0.58 0.15 65 / 0.85))",
                            color: "oklch(0.15 0.01 0)",
                            borderBottomRightRadius: "4px",
                          }
                        : {
                            background: "oklch(0.97 0.01 75 / 0.95)",
                            color: "oklch(0.25 0.02 0)",
                            borderBottomLeftRadius: "4px",
                            border: "1px solid oklch(0.88 0.02 75 / 0.6)",
                          }
                    }
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div
              className="p-3 border-t flex flex-col gap-2"
              style={{ borderColor: "oklch(0.88 0.02 75 / 0.5)" }}
            >
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest px-1">
                Quick Replies
              </p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_REPLIES.map((reply) => (
                  <button
                    key={reply.label}
                    type="button"
                    onClick={() => handleQuickReply(reply)}
                    data-ocid={`chatbot.quickreply.${reply.label.toLowerCase().replace(/\s+/g, "_")}`}
                    className="ripple-container px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{
                      borderColor: "oklch(0.65 0.18 75 / 0.45)",
                      color: "oklch(0.50 0.14 75)",
                      background: "oklch(0.65 0.18 75 / 0.08)",
                    }}
                  >
                    {reply.label}
                  </button>
                ))}
              </div>
              {/* Input row */}
              <div
                className="flex items-center gap-2 mt-1 px-3 py-2 rounded-xl"
                style={{
                  background: "oklch(0.97 0.01 75 / 0.9)",
                  border: "1px solid oklch(0.88 0.02 75 / 0.6)",
                }}
              >
                <input
                  type="text"
                  placeholder="Type a message…"
                  data-ocid="chatbot.input"
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                  readOnly
                  onClick={() => {}}
                />
                <button
                  type="button"
                  aria-label="Send message"
                  data-ocid="chatbot.send_button"
                  className="w-6 h-6 flex items-center justify-center text-primary hover:text-primary/70 transition-colors duration-200"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bubble Button */}
      <div className="relative">
        {!open && (
          <>
            <span
              className="absolute inset-0 rounded-full animate-ping"
              style={{ background: "oklch(0.65 0.18 75 / 0.3)" }}
            />
            <span
              className="absolute inset-0 rounded-full animate-ping"
              style={{
                background: "oklch(0.65 0.18 75 / 0.18)",
                animationDelay: "0.4s",
              }}
            />
          </>
        )}
        <motion.button
          ref={bubbleRef}
          type="button"
          aria-label={open ? "Close chat" : "Open chat"}
          data-ocid="chatbot.open_modal_button"
          onClick={handleBubbleClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.93 }}
          className="ripple-container relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.68 0.20 75), oklch(0.58 0.17 65))",
            boxShadow:
              "0 0 24px oklch(0.65 0.18 75 / 0.5), 0 4px 16px rgba(0,0,0,0.2)",
          }}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <X className="w-5 h-5 text-white" strokeWidth={2} />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <MessageSquare
                  className="w-5 h-5 text-white"
                  strokeWidth={1.8}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
