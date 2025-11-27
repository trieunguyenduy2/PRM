'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Giới thiệu', href: '#about' },
    { label: 'Dịch vụ', href: '#services' },
    { label: 'Bài viết', href: '#blog' },
    { label: 'Liên hệ', href: '#contact' },
  ];

  const scrollToHero = () => {
    if (typeof document === 'undefined') return;

    const heroElement = document.getElementById('hero-appointment');
    if (heroElement) {
      heroElement.scrollIntoView({ behavior: 'smooth' });
      const appointmentTab = document.querySelector('[data-tab="appointment"]') as HTMLButtonElement;
      if (appointmentTab) {
        appointmentTab.click();
      }
    }
  };

  return (
    <nav>
      {/* Container mới theo plan */}
      <div className="fixed top-2 left-1/2 -translate-x-1/2 z-50 bg-background/80 backdrop-blur-md border border-border rounded-[2rem] w-[calc(100%-3rem)] max-w-screen-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="text-xl font-bold text-foreground">
                TinNguyen | Premier
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors duration-200 hover:underline underline-offset-4"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <button
                onClick={scrollToHero}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors duration-200"
              >
                Đặt lịch
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-muted-foreground hover:text-foreground p-2"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div id="mobile-menu" className="md:hidden">
              <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-3 space-y-1 bg-background">
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground block px-3 py-2 text-base font-medium transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <button
                  onClick={() => {
                    scrollToHero();
                    setIsOpen(false);
                  }}
                  className="w-full text-left bg-primary text-primary-foreground px-3 py-2 rounded-md text-base font-medium hover:bg-primary/90 transition-colors duration-200 mt-4"
                >
                  Đặt lịch
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
