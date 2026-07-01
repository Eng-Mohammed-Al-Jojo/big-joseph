import { useMemo } from "react";
import ItemRow from "./ItemRow";
import type { Category, Item, Subcategory } from "./Menu";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } }
};

interface Props {
  category: Category;
  subcategories: Subcategory[];
  items: Item[];
  orderSystem: boolean;
  onItemClick?: (item: Item) => void;
  onDetailsClick?: (item: Item) => void;
}

export default function CategorySection({ category, subcategories, items, orderSystem, onItemClick, onDetailsClick }: Props) {

  const groupedItems = useMemo(() => {
    const groups: Record<string, Item[]> = {};
    const noSubItems: Item[] = [];

    // Defensive: only process items that are visible (visible !== false)
    const visibleOnly = items.filter(item => item.visible !== false);

    visibleOnly.forEach(item => {
      const sub = subcategories.find(s => s.id === item.subcategoryId);
      if (item.subcategoryId && sub && sub.visible !== false) {
        if (!groups[item.subcategoryId]) groups[item.subcategoryId] = [];
        groups[item.subcategoryId].push(item);
      } else {
        noSubItems.push(item);
      }
    });

    return { groups, noSubItems };
  }, [items, subcategories]);

  const activeSubcategories = useMemo(() => {
    return subcategories
      .filter(sub => sub.categoryId === category.id && sub.visible !== false && groupedItems.groups[sub.id])
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [category.id, subcategories, groupedItems.groups]);

  const catName = category.nameAr || category.name || "";

  return (
    <div className="w-full space-y-4">

      {/* Big Joseph Category Header */}
      <div className="flex flex-col items-center gap-2 py-6 relative">
        <div className="flex flex-col items-center">
          <h3
            className="text-2xl md:text-3xl font-black tracking-widest text-center"
            style={{ color: "#2C1F0E" }}
          >
            {catName}
          </h3>
          {/* Elegant Luxury Divider — Burgundy dot and Gold wings */}
          <div className="mt-3 flex items-center gap-3">
            <div className="w-10 h-[1.5px]" style={{ background: "linear-gradient(to right, transparent, #8B6726)" }} />
            <div className="w-1.5 h-1.5 rounded-full rotate-45" style={{ background: "#7A1C24" }} />
            <div className="w-10 h-[1.5px]" style={{ background: "linear-gradient(to left, transparent, #8B6726)" }} />
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Main Items Block */}
        {groupedItems.noSubItems.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            layout
            className="flex flex-col w-full overflow-hidden shadow-soft rounded-2xl"
            style={{ border: "1px solid var(--border-light)" }}
          >
            {groupedItems.noSubItems.map((item, index) => (
              <div
                key={item.id}
                className={`${
                  index % 2 === 0 ? "bg-row-odd" : "bg-row-even"
                } border-b border-burgundy/20 last:border-none`}
              >
                <ItemRow
                  item={item}
                  orderSystem={orderSystem}
                  onClick={onItemClick}
                  onDetailsClick={onDetailsClick}
                />
              </div>
            ))}
          </motion.div>
        )}

        {/* Subcategories Section */}
        {activeSubcategories.map((sub) => (
          <div key={sub.id} className="space-y-8 ">
            {/* Big Joseph Subcategory Heading — Premium Burgundy pill */}
            <div className="flex items-center gap-4 w-full">
              <div className="h-px flex-1" style={{ background: "rgba(122, 28, 36, 0.15)" }} />
              <span
                className="px-8 py-2.5 rounded-full text-sm sm:text-base font-bold tracking-wide whitespace-nowrap"
                style={{
                  background: "rgba(122, 28, 36, 0.05)",
                  color: "#7A1C24",
                  border: "1px solid rgba(122, 28, 36, 0.15)"
                }}
              >
                {sub.nameAr}
              </span>
              <div className="h-px flex-1" style={{ background: "rgba(122, 28, 36, 0.15)" }} />
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              layout
              className="flex flex-col w-full overflow-hidden shadow-soft rounded-2xl"
              style={{ border: "1px solid var(--border-light)" }}
            >
              {groupedItems.groups[sub.id].map((item, index) => (
                <div
                  key={item.id}
                  className={`${
                    index % 2 === 0 ? "bg-row-odd" : "bg-row-even"
                  } border-b border-burgundy/20 last:border-none`}
                >
                  <ItemRow
                    item={item}
                    orderSystem={orderSystem}
                    onClick={onItemClick}
                    onDetailsClick={onDetailsClick}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );

}
