'use client';

import { useState, useEffect } from 'react';
import { Calendar, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StickyCta() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky CTA when the hero action card is not visible
        setIsVisible(!entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '-100px 0px 0px 0px'
      }
    );

    const heroCard = document.getElementById('hero-appointment');
    if (heroCard) {
      observer.observe(heroCard);
    }

    return () => {
      if (heroCard) {
        observer.unobserve(heroCard);
      }
    };
  }, []);

  const scrollToHero = () => {
    const heroElement = document.getElementById('hero-appointment');
    if (heroElement) {
      heroElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Focus on appointment tab
      const appointmentTab = document.querySelector('[data-tab="appointment"]') as HTMLButtonElement;
      if (appointmentTab) {
        appointmentTab.click();
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-sm border-t border-border"
        >
          <div className="max-w-sm mx-auto">
            <button
              onClick={scrollToHero}
              className="w-full bg-primary text-primary-foreground h-12 px-4 rounded-lg font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
            >
              <Calendar className="w-4 h-4" />
              Đặt lịch nhanh
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}