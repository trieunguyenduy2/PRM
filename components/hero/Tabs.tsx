'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTabId: string;
  descriptions?: Record<string, string>;
  onChange?: (id: string) => void;
}

export default function Tabs({ tabs, defaultTabId, descriptions, onChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTabId);

  useEffect(() => {
    // Check URL params for tab (only in browser)
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam && tabs.find(tab => tab.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabs]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);

    // Update URL without page reload (only in browser)
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', tabId);
      window.history.replaceState({}, '', url.toString());
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, tabId: string) => {
    const currentIndex = tabs.findIndex(tab => tab.id === tabId);
    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        break;
      case 'ArrowRight':
        event.preventDefault();
        newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    const newTabId = tabs[newIndex].id;
    handleTabChange(newTabId);
    
    // Focus the new tab
    const newTabButton = document.querySelector(`[data-tab="${newTabId}"]`) as HTMLButtonElement;
    if (newTabButton) {
      newTabButton.focus();
    }
  };

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;
  const activeTabLabel = tabs.find(tab => tab.id === activeTab)?.label;
  const activeTabDescription = descriptions?.[activeTab];

  return (
    <div className="w-full flex flex-col h-full">
      {/* Header */}
      {activeTabLabel && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {activeTabLabel}
          </h3>
          {activeTabDescription && (
            <p className="text-sm text-muted-foreground">
              {activeTabDescription}
            </p>
          )}
        </div>
      )}

      {/* Tab List */}
      <div 
        role="tablist" 
        className="inline-flex rounded-full p-1 bg-muted/50 mb-6 w-full"
        aria-label="Form selection tabs"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            data-tab={tab.id}
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => handleTabChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-1 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/20'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.icon}
            <span className="inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="focus:outline-none flex-grow overflow-y-auto"
        tabIndex={0}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            {activeTabContent}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}