import {
  FaLaptopCode,
  FaMapMarkerAlt,
  FaInstagram,
  FaWhatsapp,
  FaFacebookF,
  FaPhoneAlt,
  FaTelegramPlane,
  FaTiktok,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase";
import { useTranslation } from "react-i18next";
import { PaymentService } from "../../services/paymentService";
import type { PaymentMethod } from "../../types/payment";
import PaymentModal from "./PaymentModal";
// import { FiCreditCard } from "react-icons/fi";
import { motion } from "framer-motion";

const LOCAL_STORAGE_KEY = "footerInfo";

export default function Footer() {
  const { t, i18n } = useTranslation();

  const [footer, setFooter] = useState({
    address: "",
    phone: "",
    whatsapp: "",
    facebook: "",
    instagram: "",
    tiktok: "",
    telegram: "",
  });

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isPaymentLoading, setIsPaymentLoading] = useState(true);

  useEffect(() => {
    const unsubPayments = PaymentService.subscribeToPaymentMethods((methods) => {
      setPaymentMethods(methods);
      setIsPaymentLoading(false);
    });
    return () => unsubPayments();
  }, []);

  useEffect(() => {
    const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localData) setFooter(JSON.parse(localData));

    const footerRef = ref(db, "settings/footerInfo");
    const unsubFooter = onValue(footerRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setFooter(data);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
      }
    });

    return () => unsubFooter();
  }, []);

  const socialIcons = [
    {
      Icon: FaWhatsapp,
      url: footer.whatsapp ? `https://wa.me/${footer.whatsapp}` : undefined,
      label: "WhatsApp",
    },
    { Icon: FaInstagram, url: footer.instagram || undefined, label: "Instagram" },
    { Icon: FaFacebookF, url: footer.facebook || undefined, label: "Facebook" },
    { Icon: FaTiktok, url: footer.tiktok || undefined, label: "TikTok" },
    { Icon: FaTelegramPlane, url: footer.telegram || undefined, label: "Telegram" },
  ].filter((social) => social.url);

  return (
    <footer
      className="relative w-full overflow-visible"
      style={{ color: "#FBF8F3" }}
    >
      {/* Curved Top Transition */}
      <div
        className="absolute top-0 left-0 w-full h-24 -translate-y-full pointer-events-none"
        style={{ background: "linear-gradient(160deg, #2C1F0E, #6B4D17)" }}
      >
        <div
          className="absolute bottom-0 w-full h-24"
          style={{
            background: "linear-gradient(160deg, #2C1F0E, #6B4D17)",
            boxShadow: "0 -20px 40px -15px rgba(44,31,14,0.25)"
          }}
        />
      </div>

      {/* Main Footer Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(160deg, #2C1F0E 0%, #4A3215 40%, #6B4D17 80%, #8B6726 100%)"
        }}
      />

      {/* Background Ornament Pattern */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          backgroundImage: `url('/footerbg.png')`,
          backgroundSize: '200px',
          backgroundRepeat: 'repeat',
          opacity: 0.3
        }}
      />

      {/* Gold top border accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #D4AF72, #C4963A, #D4AF72, transparent)" }}
      />

      <div className="max-w-4xl mx-auto px-6 pt-10 pb-12 relative z-10">
        <div className="flex flex-col items-center text-center gap-8">

          {/* 1. Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-accent/10 blur-3xl rounded-full group-hover:bg-accent/20 transition-all duration-700" />
            <img
              src="/logo.png"
              alt="Big Joseph Logo"
              className="w-32 md:w-36 relative z-10 drop-shadow-2xl mx-auto"
            />
          </motion.div>

          {/* 2. Restaurant Name */}
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black tracking-wide" style={{ color: "#FFFDF8" }}>
              بيج جوزيف — Big Joseph
            </h2>
          </div>

          {/* 3. Short description */}
          <p className="text-xs sm:text-sm leading-relaxed max-w-md opacity-75" style={{ color: "#D4AF72" }}>
            {t('common.slogan') || "أشهى الوجبات والمأكولات الفاخرة المحضرة بكل حب وعناية لتناسب أذواقكم الرفيعة."}
          </p>

          {/* 4. Social links */}
          <div className="flex flex-wrap justify-center gap-3">
            {socialIcons.map(({ Icon, url, label }, i) => (
              <motion.a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer"
                style={{
                  background: "rgba(212,175,114,0.12)",
                  border: "1px solid rgba(212,175,114,0.25)",
                  color: "#D4AF72",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#7A1C24"; // Burgundy accent
                  e.currentTarget.style.borderColor = "#7A1C24";
                  e.currentTarget.style.color = "#FFFDF8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(212,175,114,0.12)";
                  e.currentTarget.style.borderColor = "rgba(212,175,114,0.25)";
                  e.currentTarget.style.color = "#D4AF72";
                }}
                aria-label={label}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>

          {/* 5. Working Hours */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "#D4AF72", opacity: 0.65 }}>
              {i18n.language === 'ar' ? 'ساعات العمل' : 'Working Hours'}
            </span>
            <span className="text-sm font-semibold" style={{ color: "#FFFDF8" }}>
              {i18n.language === 'ar'
                ? 'مفتوح يومياً: 10:00 صباحاً - 12:00 منتصف الليل'
                : 'Open Daily: 10:00 AM - 12:00 AM'
              }
            </span>
          </div>

          {/* 6. Address */}
          {(footer.address || footer.phone) && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm font-medium">
              {footer.address && (
                <div className="flex items-center gap-2 justify-center">
                  <FaMapMarkerAlt size={14} className="text-accent" />
                  <span>{footer.address}</span>
                </div>
              )}
              {footer.phone && (
                <a
                  href={`tel:${footer.phone}`}
                  className="flex items-center gap-2 justify-center hover:text-accent transition-colors"
                >
                  <FaPhoneAlt size={14} className="text-accent" />
                  <span>{footer.phone}</span>
                </a>
              )}
            </div>
          )}

        </div>

        {/* Bottom Bar */}
        <div
          className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ borderTop: "1px solid rgba(190, 146, 73, 0.94)" }}
        >
          <div
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"
            style={{ color: "rgba(226, 184, 112, 0.76)" }}
          >
            <span>© {new Date().getFullYear()}</span>
            <span className="w-1 h-1 rounded-full" style={{ background: "rgba(212,175,114,0.20)" }} />
            <span>{t('footer.rights_reserved')}</span>
          </div>

          <a
            href="https://engmohammedaljojo.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group px-4 py-2 rounded-full transition-all duration-300 "
            style={{}}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(224, 185, 122, 0.06)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            <div className="flex flex-col items-end">
              <span
                className="text-[9px] uppercase tracking-[0.2em] font-black transition-colors"
                style={{ color: "rgba(226, 184, 112, 0.76)" }}
              >Developed By</span>
              <span
                className="text-[10px] font-black uppercase tracking-widest transition-colors"
                style={{ color: "rgba(226, 184, 112, 0.76)" }}
              >Eng. Mohammed El joujo</span>
            </div>
            <div
              className="p-2 rounded-lg transition-all"
              style={{ background: "rgba(212, 174, 114, 0.2)", color: "rgba(226, 184, 112, 0.76)" }}
            >
              <FaLaptopCode size={14} />
            </div>
          </a>
        </div>
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        methods={paymentMethods}
        isLoading={isPaymentLoading}
      />
    </footer>
  );
}

