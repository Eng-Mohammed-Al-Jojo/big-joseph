import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  /** When true, screen is visible. When false, triggers fade-out. */
  visible: boolean;
  /** Called after fade-out animation completes */
  onExited?: () => void;
}

export default function LoadingScreen({ visible, onExited }: Props) {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) return;
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + (95 - prev) * 0.1;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [visible]);

  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence onExitComplete={onExited}>
      {visible && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: "blur(6px)" }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{
            backgroundColor: "var(--bg-main)", /* Matches MenuPage background exactly for seamless fadeout */
          }}
          dir={isRtl ? "rtl" : "ltr"}
        >
          {/* Background Ornament Pattern — matching MenuPage exactly */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundImage: `url('/footerbg.png')`,
              backgroundSize: "300px",
              backgroundRepeat: "repeat",
              opacity: 0.045,
            }}
          />

          {/* ── Soft luxury ambient gold glow ── */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(212,175,114,0.18) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
          </div>

          {/* ── Top/Bottom gold accent borders ── */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] z-10"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(139,103,38,0.2), transparent)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px] z-10"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(139,103,38,0.2), transparent)",
            }}
          />

          {/* ── Main content ── */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            {/* Centerpiece logo with loader */}
            <div className="relative w-60 h-90 flex items-center justify-center">
              {/* Rotating outer dotted ring */}
              <svg
                className="absolute inset-0 w-full h-full"
                style={{ animation: "spin 16s linear infinite" }}
                viewBox="0 0 256 256"
              >
                <circle
                  cx="128"
                  cy="222"
                  r="115"
                  stroke="rgba(139,103,38,0.15)"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="4 8"
                />
              </svg>

              {/* Progress ring */}
              <svg
                className="absolute inset-0 w-full h-full -rotate-90"
                viewBox="0 0 256 256"
              >
                {/* Track */}
                <circle
                  cx="128"
                  cy="128"
                  r={radius}
                  stroke="rgba(139,103,38,0.08)"
                  strokeWidth="3"
                  fill="none"
                />
                {/* Progress arc */}
                <motion.circle
                  cx="128"
                  cy="128"
                  r={radius}
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{
                    strokeDasharray: circumference,
                    stroke: "url(#burgundyGoldGrad)",
                  }}
                />
                <defs>
                  <linearGradient id="burgundyGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7A1C24" />
                    <stop offset="50%" stopColor="#8B6726" />
                    <stop offset="100%" stopColor="#7A1C24" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Circular paper-white shield behind logo */}
              <div
                className="absolute w-34 h-34 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 35% 35%, #FFFDF9 0%, #FAF7F2 100%)",
                  boxShadow:
                    "0 10px 30px -5px rgba(139,103,38,0.15), inset 0 1px 0 rgba(255,255,255,0.9)",
                  border: "1px solid rgba(139,103,38,0.1)",
                }}
              />

              {/* Logo centerpiece */}
              <motion.div
                animate={{ scale: [0.97, 1.03, 0.97] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-24 h-24"
              >
                <img
                  src="logo.png"
                  className="w-full h-full object-contain"
                  style={{ filter: "drop-shadow(0 4px 12px rgba(139,103,38,0.2))" }}
                  alt="Big Joseph"
                />
              </motion.div>
            </div>

            {/* Subtitle / Loading label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="flex flex-col items-center gap-2"
            >
              {/* Elegant header divider line */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-px"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, rgba(122,28,36,0.3))",
                  }}
                />
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "#7A1C24" }}
                />
                <div
                  className="w-10 h-px"
                  style={{
                    background:
                      "linear-gradient(to left, transparent, rgba(122,28,36,0.3))",
                  }}
                />
              </div>

              <span
                className="text-[11px] font-bold uppercase tracking-[0.25em]"
                style={{ color: "#7A1C24" }}
              >
                جاري تحميل المنيو
              </span>
            </motion.div>

            {/* Percentage counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xs font-bold"
              style={{ color: "#8B6726", letterSpacing: "0.05em" }}
            >
              {Math.round(progress)}%
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
