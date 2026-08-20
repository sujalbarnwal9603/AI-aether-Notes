import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Keyboard } from "lucide-react";
import { KEYBOARD_SHORTCUTS } from "../../data/initialData";
import { useNotes } from "../../context/NotesContext";

export default function KeyboardShortcutsModal() {
  const { isShortcutsModalOpen, setIsShortcutsModalOpen } = useNotes();

  if (!isShortcutsModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-lg bg-[#111111] border border-[#222222] rounded-2xl p-6 shadow-2xl text-white relative"
        >
          <div className="flex items-center justify-between pb-4 border-b border-[#222222] mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
                <Keyboard className="w-4 h-4" />
              </div>
              <h3 className="font-display font-semibold text-lg">Keyboard Shortcuts</h3>
            </div>
            <button
              onClick={() => setIsShortcutsModalOpen(false)}
              className="p-1 rounded-lg text-[#9E9E9E] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
            {KEYBOARD_SHORTCUTS.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#090909] border border-[#222222]"
              >
                <span className="text-sm font-medium text-white">{item.action}</span>
                <kbd className="px-2.5 py-1 text-xs font-mono text-white bg-[#111111] border border-[#222222] rounded-md shadow-inner">
                  {item.key}
                </kbd>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-[#222222] text-center text-xs font-mono text-[#9E9E9E]">
            Aether OS — Nothing OS & Linear Design Mechanics
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
