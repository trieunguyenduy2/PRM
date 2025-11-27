'use client';

import { motion } from 'framer-motion';
import LeftProfile from './LeftProfile';
import RightActionCard from './RightActionCard';

export default function HeroSection() {
  return (
    <section className="h-[100dvh] flex items-center py-12 lg:py-20 relative bg-[url('https://images.unsplash.com/photo-1618418721668-0d1f72aa4bab?q=80&w=1920')] bg-cover bg-center bg-no-repeat before:content-[''] before:absolute before:inset-0 before:bg-black/40 before:z-[-1]">
      <div className="max-w-7xl mx-auto pt-8 px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center h-full">
          {/* Mobile: Form first, Desktop: Profile first */}
          <div className="col-span-12 lg:col-span-5 order-2 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.6 }}
            >
              <RightActionCard />
            </motion.div>
          </div>
          
          <div className="col-span-12 lg:col-span-7 order-1 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <LeftProfile />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}