/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Leaf, 
  Truck, 
  ShieldCheck, 
  Star,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  ArrowRight,
  MoveRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const PRODUCTS = [
  { id: 1, name: "Smoked Paprika", type: "Earth & Fire", category: "spice", price: "8.50", img: "images/spices/Red_paprika_powder_202604261749.jpeg" },
  { id: 2, name: "Wild Turmeric", type: "Roots & Herbs", category: "spice", price: "12.00", img: "images/spices/Turmeric_powder_in_202604261749.jpeg" },
  { id: 3, name: "Royal Saffron", type: "Exotic Blends", category: "spice", price: "24.50", img: "images/spices/Saffron_threads_in_202604261749.jpeg" },
  { id: 4, name: "Ancient Cumin", type: "Daily Essentials", category: "spice", price: "9.00", img: "images/spices/Cumin_seeds_in_202604261749.jpeg" },
  { id: 5, name: "Ceylon Cinnamon", type: "Sweet & Warm", category: "spice", price: "11.00", img: "images/spices/Cinnamon_sticks_in_202604261749.jpeg" },
  { id: 6, name: "Signature Collection", type: "The Classics", category: "pack", price: "45.00", img: "images/packs/Kraft_pouch_labeled_202604261750.jpeg" },
  { id: 7, name: "Marrakech Explorer Set", type: "Traveler's Choice", category: "pack", price: "55.00", img: "images/packs/Zafra_Marrakech_Cinnamon_202604261749.jpeg" },
  { id: 8, name: "Chef's Essentials Pack", type: "Professional Grade", category: "pack", price: "85.00", img: "images/packs/Kraft_paper_pouch_202604261749 (1).jpeg" },
  { id: 9, name: "Baker's Joy Set", type: "Sweet Blends", category: "pack", price: "38.00", img: "images/packs/Kraft_paper_pouch_202604261750.jpeg" },
];

const REVIEWS = [
  {
    id: 1,
    name: "Elena Thompson",
    role: "Professional Chef",
    text: "The depth of flavor in the smoked paprika is unlike anything I've found in high-street stores. It has transformed my signature dishes.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Home Cook",
    text: "Beautiful packaging and even more beautiful spice blends. The 'Wild Turmeric' is now a staple in my daily wellness routine.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  }
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [view, setView] = useState("home");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["Home", "Shop", "About", "Contact"];

  const handleViewChange = (newView: string) => {
    setView(newView.toLowerCase());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* 1. NAVIGATION BAR */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled || view !== "home" ? "bg-zafra-cream/90 backdrop-blur-md shadow-sm py-2 md:py-4" : "bg-transparent py-4 md:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <button onClick={() => handleViewChange("home")} className="flex items-center gap-2 cursor-pointer outline-none">
            <img 
              src="dark logo.png" 
              alt="Zafra Logo" 
              className="h-10 sm:h-16 w-auto transition-all"
              referrerPolicy="no-referrer"
            />
          </button>

          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <button 
                key={item} 
                onClick={() => handleViewChange(item)}
                className={`text-xs font-bold tracking-[0.2em] uppercase hover:text-zafra-gold transition-colors cursor-pointer outline-none ${
                  isScrolled || view !== "home" ? "text-zafra-dark/70" : "text-zafra-cream/90"
                } ${view === item.toLowerCase() ? "text-zafra-gold underline underline-offset-8" : ""}`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-3">
              {[Instagram, Facebook, X].map((Icon, idx) => (
                <a key={idx} href="#" className={`${isScrolled || view !== "home" ? "text-zafra-dark/40 hover:text-zafra-gold" : "text-white/60 hover:text-white"}`}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <button className={`relative p-2 rounded-full ${isScrolled || view !== "home" ? "bg-zafra-dark/5 text-zafra-dark" : "bg-white/10 text-white"}`}>
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-zafra-gold text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">
                3
              </span>
            </button>
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={24} className={isScrolled || view !== "home" ? "text-zafra-dark" : "text-white"} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[60] bg-forest text-white p-10 flex flex-col items-center justify-center gap-8"
          >
            <button 
              className="absolute top-6 right-6"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={32} />
            </button>
            {navItems.map((item) => (
              <button key={item} className="text-3xl font-serif outline-none" onClick={() => { handleViewChange(item.toLowerCase()); setIsMenuOpen(false); }}>{item}</button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {view === "home" ? (
        <>
          {/* 2. HERO SECTION - STORY DRIVEN */}
          <section className="relative h-[95vh] flex items-center justify-center text-center overflow-hidden">
            <div className="absolute inset-0 bg-zafra-dark">
              <img 
                src="images/backgrounds/Marrakech_spice_souk_202604261753.jpeg" 
                alt="Marrakech Souk" 
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 spice-gradient opacity-30" />
            </div>
            <div className="relative z-10 max-w-5xl px-6 pt-20 md:pt-0">
              <motion.h1 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                className="text-4xl sm:text-6xl md:text-9xl text-zafra-cream font-serif leading-[0.9] mb-8 tracking-tighter"
              >
                From the Earth <br />
                <span className="italic font-normal">To Your Hearth</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1.2 }}
                className="max-w-2xl mx-auto"
              >
                <p className="text-zafra-cream/70 text-lg md:text-xl font-light italic mb-12 leading-relaxed">
                  "We traverse the ancient spice routes, seeking the rare harvests that industrial scales cannot reach. Every grain of Zafra tells a story of sun-drenched sunrises and generations of heritage milling."
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <button 
                  onClick={() => handleViewChange("shop")}
                  className="group relative bg-zafra-gold hover:bg-zafra-cream text-zafra-dark border border-zafra-gold px-14 py-5 rounded-none shadow-2xl font-bold tracking-[0.3em] uppercase text-[10px] transition-all duration-500 overflow-hidden"
                >
                  <span className="relative z-10">Begin Your Journey</span>
                  <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-full bg-zafra-cream transition-all duration-500 z-0" />
                </button>
              </motion.div>
            </div>
            
            {/* Scroll Indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            >
              <div className="w-[1px] h-12 bg-zafra-gold/30 relative overflow-hidden">
                <motion.div 
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute top-0 w-full h-1/2 bg-zafra-gold"
                />
              </div>
            </motion.div>
          </section>

          {/* 3. VALUE PROPS */}
          <section className="py-20 bg-white border-b border-orange-100">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 text-center md:text-left">
              {[
                { icon: Truck, title: "Fast Shipping", desc: "Free delivery for orders above $40." },
                { icon: Leaf, title: "Ethically Sourced", desc: "Direct from small organic farms." },
                { icon: ShieldCheck, title: "Premium Quality", desc: "100% pure, no fillers or additives." },
                { icon: Star, title: "Chef Approved", desc: "Trusted by world-class restaurants." }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center md:items-start gap-4">
                  <div className="w-12 h-12 bg-orange-50 text-cinnamon rounded-lg flex items-center justify-center">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold uppercase tracking-tight">{item.title}</h3>
                    <p className="text-slate-500 text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. TRENDING PRODUCTS */}
          <section className="py-24 bg-orange-50/30">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex justify-between items-end mb-16">
                <div>
                  <h2 className="text-4xl md:text-5xl font-serif mb-4 tracking-tighter">Trending Spices</h2>
                  <p className="text-slate-500 max-w-lg">Our community's favorite picks for this season. Freshly milled and ready to ignite your kitchen.</p>
                </div>
                <button 
                  onClick={() => handleViewChange("shop")}
                  className="hidden sm:flex items-center gap-2 text-cinnamon font-bold tracking-widest uppercase text-xs border-b-2 border-cinnamon pb-1 hover:text-zafra-gold hover:border-zafra-gold transition-colors"
                >
                  View All <MoveRight size={16} />
                </button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12">
                {PRODUCTS.slice(0, 3).map((prod) => (
                  <ProductCard key={prod.id} prod={prod} />
                ))}
              </div>
            </div>
          </section>

          {/* 5. FLASH SALE BANNER */}
          <section className="relative py-40 flex items-center justify-center my-10 min-h-[500px]">
            <div className="absolute inset-0 parallax-banner" style={{backgroundImage: "url('images/backgrounds/Moroccan_spice_market_202604261757.jpeg')"}}>
              <div className="absolute inset-0 bg-zafra-dark/60" />
            </div>
            <div className="relative z-10 text-center text-zafra-cream px-6">
              <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-tight tracking-tighter">
                Sensory Sale: Up to 40% Off <br />
                <span className="italic font-normal">Exotic Starter Kits</span>
              </h2>
              <p className="text-white/80 mb-10 max-w-xl mx-auto text-lg font-light">
                Limited time only. Elevate your culinary game with our curated sets of rare international blends.
              </p>
              <button className="border-2 border-white px-10 py-4 hover:bg-white hover:text-zafra-dark font-bold tracking-widest uppercase text-xs transition-all">
                Unlock the Offer
              </button>
            </div>
          </section>

          {/* 6. CATEGORIES */}
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <h2 className="text-4xl md:text-5xl font-serif mb-16 tracking-tighter">Curate Your Pantry</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                {[
                  { name: "Heat & Chilis", img: "images/spices/Red_paprika_powder_202604261749.jpeg" },
                  { name: "Sweet & Baking", img: "images/spices/Cinnamon_sticks_in_202604261749.jpeg" },
                  { name: "Aromatic Herbs", img: "images/spices/Cumin_seeds_in_202604261749.jpeg" },
                  { name: "Global Blends", img: "images/spices/Turmeric_powder_in_202604261749.jpeg" }
                ].map((cat, idx) => (
                  <div key={idx} className="group cursor-pointer">
                    <div className="aspect-square rounded-full overflow-hidden mb-6 border-8 border-orange-50 group-hover:border-zafra-gold/20 transition-all p-2">
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                    </div>
                    <h4 className="text-sm font-bold uppercase tracking-widest group-hover:text-zafra-gold transition-colors">{cat.name}</h4>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : view === "shop" ? (
        <section className="pt-32 md:pt-40 pb-24 bg-white min-h-screen">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 text-center md:text-left border-b border-slate-100 pb-12">
              <div>
                <h1 className="text-5xl md:text-7xl font-serif tracking-tighter mb-4 italic">The Spice Shop</h1>
                <p className="text-slate-500 max-w-lg">Browse our full collection of ethically sourced, freshly milled spice treasures.</p>
              </div>
              <div className="flex gap-4">
                <button className="px-6 py-2 border border-slate-200 text-xs font-bold uppercase tracking-widest hover:border-zafra-gold">Filter</button>
                <button className="px-6 py-2 border border-slate-200 text-xs font-bold uppercase tracking-widest hover:border-zafra-gold text-zafra-dark">Sort By: Newest</button>
              </div>
            </div>
            
            <div className="space-y-24">
              {/* Spices Category */}
              <div>
                <h2 className="text-3xl font-serif mb-12 flex items-center gap-4">
                  <span className="w-12 h-[1px] bg-zafra-gold"></span>
                  Single Origin Spices
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-x-8 sm:gap-y-16">
                  {PRODUCTS.filter(p => p.category === "spice").map((prod) => (
                    <ProductCard key={prod.id} prod={prod} />
                  ))}
                </div>
              </div>

              {/* Packs Category */}
              <div>
                <h2 className="text-3xl font-serif mb-12 flex items-center gap-4">
                  <span className="w-12 h-[1px] bg-zafra-gold"></span>
                  Signature Packs & Bundles
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-x-8 sm:gap-y-16">
                  {PRODUCTS.filter(p => p.category === "pack").map((prod) => (
                    <ProductCard key={prod.id} prod={prod} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : view === "about" ? (
        <section className="pt-32 md:pt-40 pb-24 bg-white min-h-screen">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-24">
              <h1 className="text-5xl md:text-8xl font-serif tracking-tighter mb-8 italic">Our Heritage</h1>
              <p className="text-xl text-slate-600 leading-relaxed font-light">
                Zafra was born from a simple observation: the soul of a kitchen is determined by its spices, yet true quality is increasingly hard to find. We bridge the gap between ancient spice routes and the modern pantry.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32">
              <img src="images/backgrounds/Spice_bowls_on_202604261755.jpeg" alt="Tradition" className="rounded-none shadow-2xl" />
              <div>
                <h2 className="text-3xl font-serif mb-6 italic underline decoration-zafra-gold underline-offset-8">The Zafra Standard</h2>
                <div className="space-y-8 mt-12">
                  {[
                    { t: "Purity First", d: "We never use fillers, colorants or anti-caking agents. What you get is 100% spice, zero compromise." },
                    { t: "Small Batch Milling", d: "Our spices are milled in small rotations to ensure you receive the highest concentration of essential oils." },
                    { t: "Direct Relationships", d: "We skip the industrial middlemen and pay above fair-trade prices directly to our family farmers." }
                  ].map((item, i) => (
                    <div key={i}>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-zafra-dark mb-2">{item.t}</h4>
                      <p className="text-slate-500 font-light text-sm">{item.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : view === "contact" ? (
        <section className="pt-32 md:pt-40 pb-24 bg-orange-50/20 min-h-screen">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
              <div>
                <h1 className="text-5xl md:text-8xl font-serif tracking-tighter mb-8 italic">Contact</h1>
                <p className="text-xl text-slate-600 leading-relaxed font-light mb-12">
                  Whether you're a professional chef or a curious home cook, we'd love to hear from you. Experience the sensory journey of Zafra.
                </p>
                <div className="space-y-8">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zafra-gold mb-2">Showroom</p>
                    <p className="text-zafra-dark font-serif text-xl italic">24 Artisan Row, <br />London, W1 4BJ</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zafra-gold mb-2">General Inquiry</p>
                    <p className="text-zafra-dark font-serif text-xl italic">hello@zafra-spices.com</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 sm:p-12 shadow-2xl">
                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-3">Name</label>
                      <input type="text" className="w-full border-b border-slate-200 pb-2 outline-none focus:border-zafra-gold transition-colors font-serif bg-transparent" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-3">Email</label>
                      <input type="email" className="w-full border-b border-slate-200 pb-2 outline-none focus:border-zafra-gold transition-colors font-serif bg-transparent" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-3">Subject</label>
                    <input type="text" className="w-full border-b border-slate-200 pb-2 outline-none focus:border-zafra-gold transition-colors font-serif bg-transparent" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-3">Message</label>
                    <textarea rows={4} className="w-full border-b border-slate-200 pb-2 outline-none focus:border-zafra-gold transition-colors font-serif bg-transparent resize-none" />
                  </div>
                  <button className="bg-zafra-dark text-zafra-cream px-12 py-5 uppercase font-bold tracking-widest text-[10px] hover:bg-zafra-gold transition-all w-full sm:w-auto">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="pt-40 pb-24 flex items-center justify-center min-h-[60vh]">
          <h2 className="text-4xl font-serif opacity-20 italic underline decoration-zafra-gold underline-offset-8 uppercase">{view} page</h2>
        </div>
      )}

      {/* 7. ABOUT / PROCESS SPLIT (Only Home) */}
      {view === "home" && (
        <section className="py-24 overflow-hidden border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img src="images/backgrounds/Spices_scattered_on_202604261753.jpeg" className="rounded-lg shadow-2xl mt-12" alt="Spices" />
                <img src="images/backgrounds/Moroccan_spice_background_202604261806.jpeg" className="rounded-lg shadow-2xl" alt="Sacks" />
              </div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-zafra-gold/10 rounded-full blur-3xl z-0" />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight tracking-tighter">
                Honest Batches, <br />
                <span className="italic font-normal">Small Producers</span>
              </h2>
              <p className="text-slate-600 mb-8 text-lg leading-relaxed font-light">
                At Zafra, we believe the path to great food starts with the earth. We don't bulk-buy. We work directly with small-hold farmers in Kerala, Madagascar, and Morocco to bring you spices that were literally in the ground just weeks ago.
              </p>
              <div className="grid grid-cols-2 gap-10 mb-10">
                <div>
                  <p className="text-4xl font-serif text-zafra-dark mb-1">98%</p>
                  <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Purity Rating</p>
                </div>
                <div>
                  <p className="text-4xl font-serif text-zafra-dark mb-1">24h</p>
                  <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Post-Mill Ship</p>
                </div>
              </div>
              <button className="flex items-center gap-3 font-bold uppercase tracking-widest text-[10px] text-zafra-dark border-2 border-zafra-dark px-10 py-5 hover:bg-zafra-dark hover:text-zafra-cream transition-all">
                Our Farming Ethics <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 8. TESTIMONIALS (Only Home) */}
      {view === "home" && (
        <section className="py-24 bg-clay text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-4 tracking-tighter italic">What Chefs are Saying</h2>
              <p className="text-white/60">Voices from professional kitchens and home sanctuaries alike.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {REVIEWS.map((rev) => (
                <div key={rev.id} className="bg-white/5 p-10 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <img src={rev.img} alt={rev.name} className="w-16 h-16 rounded-full object-cover border-2 border-zafra-gold" />
                    <div>
                      <h5 className="text-xl font-serif tracking-tight">{rev.name}</h5>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-zafra-gold font-bold">{rev.role}</p>
                    </div>
                  </div>
                  <p className="text-lg italic text-zafra-cream/80 leading-relaxed font-light">"{rev.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10. FOOTER */}
      <footer className="bg-zafra-dark text-zafra-cream pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <img 
                  src="dark logo.png" 
                  alt="Zafra Logo" 
                  className="h-20 w-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-zafra-cream/40 text-sm leading-relaxed max-w-xs">
                Elevating kitchens through the power of heritage seeds and sustainable small-batch milling.
              </p>
              <div className="flex gap-4 mt-8">
                {[Instagram, Facebook, X, Youtube].map((Icon, idx) => (
                  <a key={idx} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-zafra-gold transition-colors">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h5 className="font-bold uppercase tracking-widest text-[10px] mb-8 text-zafra-gold">Pantry</h5>
              <ul className="space-y-4 text-zafra-cream/60 text-sm">
                <li><button onClick={() => handleViewChange("shop")} className="hover:text-white transition-colors outline-none cursor-pointer">All Spices</button></li>
                <li><button onClick={() => handleViewChange("shop")} className="hover:text-white transition-colors outline-none cursor-pointer">Cooking Herbs</button></li>
                <li><button onClick={() => handleViewChange("shop")} className="hover:text-white transition-colors outline-none cursor-pointer">Gift Bundles</button></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold uppercase tracking-widest text-[10px] mb-8 text-zafra-gold">Journal</h5>
              <ul className="space-y-4 text-zafra-cream/60 text-sm">
                <li><button onClick={() => handleViewChange("about")} className="hover:text-white transition-colors outline-none cursor-pointer">Origins</button></li>
                <li><button onClick={() => handleViewChange("about")} className="hover:text-white transition-colors outline-none cursor-pointer">Spice Care Guide</button></li>
                <li><button onClick={() => handleViewChange("about")} className="hover:text-white transition-colors outline-none cursor-pointer">Wellness</button></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold uppercase tracking-widest text-[10px] mb-8 text-zafra-gold">Care</h5>
              <ul className="space-y-4 text-zafra-cream/60 text-sm">
                <li><button onClick={() => handleViewChange("contact")} className="hover:text-white transition-colors outline-none cursor-pointer">Shipping & Returns</button></li>
                <li><button onClick={() => handleViewChange("contact")} className="hover:text-white transition-colors outline-none cursor-pointer">FAQ</button></li>
                <li><button onClick={() => handleViewChange("contact")} className="hover:text-white transition-colors outline-none cursor-pointer">Wholesale</button></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-zafra-cream/20 text-xs">© 2026 ZAFRA Artisan Spices. All Rights Reserved.</p>
            <div className="flex gap-10 text-xs text-zafra-cream/40 font-bold uppercase tracking-widest">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProductCard({ prod }: { prod: any }) {
  return (
    <motion.div 
      whileHover={{ y: -15 }}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-none mb-4 sm:mb-8 bg-zafra-dark transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.1)] group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.2)]">
        <img 
          src={prod.img} 
          alt={prod.name} 
          className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-90 group-hover:opacity-100" 
        />
        <div className="absolute inset-0 bg-zafra-dark/10 group-hover:bg-transparent transition-all" />
        <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <button className="w-full py-4 bg-zafra-cream text-zafra-dark text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            <ShoppingBag size={14} /> Quick Add
          </button>
        </div>
      </div>
      <div className="text-center px-1 sm:px-4">
        <p className="text-[8px] sm:text-[10px] font-bold text-zafra-gold uppercase tracking-[0.2em] mb-2 sm:mb-3">{prod.type}</p>
        <h4 className="text-lg sm:text-2xl font-serif tracking-tight group-hover:text-zafra-gold transition-colors mb-1 sm:mb-2 italic">{prod.name}</h4>
        <p className="text-slate-400 text-xs sm:text-base font-medium tracking-wide">From ${prod.price}</p>
      </div>
    </motion.div>
  );
}
