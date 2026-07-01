import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

import { FiX, FiStar } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import ItemRow from "./ItemRow";
import type { Item } from "./Menu";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  items: Item[];
  orderSystem: boolean;
  onItemClick?: (item: Item) => void;
  onDetailsClick?: (item: Item) => void;
}

export default function FeaturedModal({ isOpen, onClose, items, orderSystem, onItemClick, onDetailsClick }: Props) {
  const { t } = useTranslation();

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-200 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-sm max-h-[85vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col"
            style={{
              background: "#FFFDF8",
              border: "1px solid rgba(139,103,38,0.10)",
              boxShadow: "0 24px 60px -12px rgba(44,31,14,0.25), 0 8px 24px -8px rgba(139,103,38,0.15)"
            }}
          >
            {/* Header */}
            <div
              className="p-6 sm:p-8 flex items-center justify-between"
              style={{
                borderBottom: "1px solid rgba(139,103,38,0.08)",
                background: "linear-gradient(to bottom, rgba(139,103,38,0.04), transparent)"
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #A8832F 0%, #8B6726 60%, #6B4D17 100%)",
                    boxShadow: "0 6px 20px -4px rgba(139,103,38,0.40)"
                  }}
                >
                  <FiStar size={24} className="fill-current text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight" style={{ color: "#2C1F0E" }}>
                    {t("menu.featured_items") || "الأصناف المميزة"}
                  </h2>
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(139,103,38,0.45)" }}>
                    {items.length} {t("common.items") || "صنف"}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                style={{
                  background: "rgba(255,253,248,0.70)",
                  border: "1px solid rgba(139,103,38,0.12)",
                  color: "#8B6726"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#ef4444";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,253,248,0.70)";
                  e.currentTarget.style.color = "#8B6726";
                }}
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Scrollable Grid Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
              <div className="flex flex-col items-center gap-2 sm:gap-1">
                {items.map((item) => (
                  <ItemRow
                    key={`modal-feat-${item.id}`}
                    item={item}
                    orderSystem={orderSystem}
                    onClick={() => {
                      onItemClick?.(item);
                      onClose();
                    }}
                    onDetailsClick={(item) => {
                      onDetailsClick?.(item);
                      onClose();
                    }}
                  />
                ))}
              </div>

            {/* Empty state */}
              {items.length === 0 && (
                <div className="py-20 text-center space-y-4">
                  <div className="text-6xl" style={{ opacity: 0.18, color: "#8B6726" }}>⭐</div>
                  <p className="font-bold" style={{ color: "rgba(139,103,38,0.55)" }}>{t("menu.no_featured") || "لا توجد أصناف مميزة حالياً"}</p>
                </div>
              )}
            </div>

            {/* Footer shadow fade */}
            <div
              className="h-8 shrink-0 pointer-events-none"
              style={{ background: "linear-gradient(to top, #FFFDF8, transparent)" }}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );

}