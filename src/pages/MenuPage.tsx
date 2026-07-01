import { useState, useEffect, useCallback } from "react";
import CartButton from "../components/cart/CartButton";
import Footer from "../components/menu/footer";
import Menu, { type Item } from "../components/menu/Menu";
import ItemModal from "../components/menu/ItemModal";
import ItemDetailsDrawer from "../components/menu/ItemDetailsDrawer";
import { HiSparkles } from "react-icons/hi";
import FeaturedModal from "../components/menu/FeaturedModal";
import LoadingScreen from "../components/common/LoadingScreen";
import { motion } from "framer-motion";
import { FirebaseService } from "../services/firebaseService";
import OrderStatusButton from "../components/cart/OrderStatusButton";
import GlassButton from "../components/common/GlassButton";

export default function MenuPage() {
  const [showFeaturedModal, setShowFeaturedModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDataReady, setIsDataReady] = useState(false);
  const [hasFeatured, setHasFeatured] = useState(false);
  const [featuredItems, setFeaturedItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedDetailsItem, setSelectedDetailsItem] = useState<Item | null>(null);
  const [orderSystem, setOrderSystem] = useState(true);

  useEffect(() => {
    const unsubscribe = FirebaseService.listen("settings/orderSystem", (value) => {
      setOrderSystem(value ?? true);
    });
    return () => unsubscribe();
  }, []);

  const handleLoadingChange = useCallback((loading: boolean) => {
    setIsLoading(loading);
    if (!loading) setIsDataReady(true);
  }, []);

  return (
    /* ─── Single Canvas Wrapper ─────────────────────────────────── */
    <div
      className="min-h-screen flex flex-col overflow-x-hidden relative"
      style={{ backgroundColor: "var(--bg-main)" }}
    >
      {/* ─── Full-Page Texture — fixed behind all content ─────── */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url('/footerbg.png')`,
          backgroundSize: '200px',
          backgroundRepeat: 'repeat',
          opacity: 0.1
        }}
      />
      {/* Loading */}
      <LoadingScreen visible={isLoading} />

      {/* 🌟 Featured Button — Top Left (floating, not absolute on arch) */}
      {isDataReady && hasFeatured && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="fixed top-6 left-6 z-30"
        >
          <GlassButton
            variant="featured"
            icon={<HiSparkles size={18} />}
            onClick={() => setShowFeaturedModal(true)}
            className="!bg-primary !text-white border-none shadow-2xl hover:scale-110 transition-transform"
          />
        </motion.div>
      )}

      {/* ─── Main Content ─────────────────────────────────────────── */}
      <main className="flex flex-col flex-1 relative z-10">
        {/* ── Hero: Logo only, editorial minimal ─────────────────── */}
        <section className="flex flex-col items-center justify-center pt-14 pb-6 px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center"
          >
            {/* Ambient gold halo — very faint, purely atmospheric */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: "220px",
                height: "220px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(139,103,38,0.09) 0%, transparent 68%)",
                filter: "blur(28px)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />

            {/* Logo */}
            <div className="w-48 h-48 flex items-center justify-center relative">
              <img
                src="/logo.png"
                alt="Big Joseph"
                width="176"
                height="176"
                className="w-full h-full object-contain"
                style={{
                  filter:
                    "drop-shadow(0 6px 20px rgba(139,103,38,0.18)) drop-shadow(0 2px 8px rgba(0,0,0,0.10))",
                }}
              />
            </div>
          </motion.div>

          {/* Subtle diamond divider below logo */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 flex items-center gap-3"
          >
            <div
              style={{
                width: "48px",
                height: "1px",
                background: "linear-gradient(to right, transparent, rgba(139,103,38,0.28))",
              }}
            />
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "1px",
                transform: "rotate(45deg)",
                background: "rgba(122, 28, 36, 0.35)",
              }}
            />
            <div
              style={{
                width: "48px",
                height: "1px",
                background: "linear-gradient(to left, transparent, rgba(139,103,38,0.28))",
              }}
            />
          </motion.div>
        </section>

        {/* ── Menu Content — no container box, same canvas ───────── */}
        <div className="flex-1 w-full max-w-4xl mx-auto px-3 md:px-8 pt-4 pb-10">
          <Menu
            onLoadingChange={handleLoadingChange}
            onFeaturedCheck={setHasFeatured}
            onFeaturedItemsChange={setFeaturedItems}
            onItemClick={setSelectedItem}
            onDetailsClick={setSelectedDetailsItem}
          />
        </div>

      </main>

      {/* Cart Button */}
      {isDataReady && (
        <div className="fixed bottom-8 right-8 z-50">
          <CartButton />
        </div>
      )}

      {/* Modals */}
      <FeaturedModal
        isOpen={showFeaturedModal}
        onClose={() => setShowFeaturedModal(false)}
        orderSystem={orderSystem}
        items={featuredItems}
        onItemClick={setSelectedItem}
        onDetailsClick={setSelectedDetailsItem}
      />

      <ItemModal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        item={selectedItem}
      />

      <ItemDetailsDrawer
        isOpen={!!selectedDetailsItem}
        onClose={() => setSelectedDetailsItem(null)}
        item={selectedDetailsItem}
      />

      <OrderStatusButton />
      <Footer />
    </div>
  );
}
