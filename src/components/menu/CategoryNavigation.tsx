import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import type { Category } from "./Menu";
import { FaThLarge } from "react-icons/fa";

interface Props {
  categories: Category[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

export default function CategoryNavigation({
  categories,
  activeId,
  onSelect,
}: Props) {
  const { t } = useTranslation();
  const activeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (activeRef.current) {
      const container = activeRef.current.closest(".overflow-x-auto");
      if (container) {
        const activeEl = activeRef.current;
        const containerRect = container.getBoundingClientRect();
        const activeRect = activeEl.getBoundingClientRect();
        
        const scrollLeft =
          container.scrollLeft +
          (activeRect.left - containerRect.left) -
          (containerRect.width / 2 - activeRect.width / 2);
          
        container.scrollTo({ left: scrollLeft, behavior: "smooth" });
      }
    }
  }, [activeId]);

  return (
    <div className="relative mb-8 sm:mb-10 max-w-2xl mx-auto w-full">
      {/* Hairline top accent — barely visible gold line */}
      <div
        className="absolute -top-px left-10 right-10 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(139,103,38,0.18), transparent)",
        }}
      />

      <div
        className="overflow-x-auto no-scrollbar py-2 px-1 w-full"
        style={{
          /* Single canvas — no background box, no border radius box */
        }}
      >
        <div className="flex items-center gap-2 min-w-max px-2">
          <TabButton
            id="all"
            label={t("common.all") || "الكل"}
            isActive={activeId === "all"}
            onClick={() => onSelect("all")}
            isAll
            refProp={activeId === "all" ? activeRef : null}
          />

          {categories.map((cat) => (
            <TabButton
              key={cat.id}
              id={cat.id}
              label={cat.nameAr || cat.name}
              isActive={activeId === cat.id}
              onClick={() => onSelect(cat.id)}
              refProp={activeId === cat.id ? activeRef : null}
            />
          ))}
        </div>
      </div>

      {/* Hairline bottom accent */}
      <div
        className="absolute -bottom-px left-10 right-10 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(139,103,38,0.18), transparent)",
        }}
      />
    </div>
  );
}

interface TabButtonProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
  isAll?: boolean;
  refProp?: React.Ref<HTMLButtonElement> | null;
}

function TabButton({ label, isActive, onClick, isAll, refProp }: TabButtonProps) {
  return (
    <button
      ref={refProp || null}
      onClick={onClick}
      className={`
        relative h-10 px-5 rounded-full text-xs sm:text-sm font-bold
        whitespace-nowrap transition-all duration-300 flex items-center gap-1.5
        cursor-pointer select-none
        ${isActive
          ? "text-white"
          : [
            "text-primary",
            "bg-white/80",
            "border border-primary/20",
            "hover:border-burgundy/40",
            "hover:text-burgundy",
            "hover:bg-white",
            "shadow-sm",
          ].join(" ")
        }
      `}
    >
      {/* Icon */}
      <span className="relative z-10 flex items-center gap-1.5">
        {isAll ? <FaThLarge size={11} className="opacity-80" /> : null}
        {label}
      </span>

      {/* Active pill — Burgundy animated background */}
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(135deg, #8C2030 0%, #7A1C24 55%, #601019 100%)",
            boxShadow: "0 4px 16px -4px rgba(122, 28, 36, 0.45)",
          }}
          transition={{ type: "spring", bounce: 0.18, duration: 0.45 }}
        />
      )}
    </button>
  );
}
