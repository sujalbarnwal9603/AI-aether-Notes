import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Pin, Star, Copy, Trash2, Sparkles, FileText } from "lucide-react";
import { useNotes } from "../../context/NotesContext";

export default function ContextMenu({ x, y, note, onClose }) {
  const {
    togglePinNote,
    toggleFavoriteNote,
    duplicateNote,
    deleteNote,
    openAIDrawerWithMacro
  } = useNotes();

  useEffect(() => {
    const handleClickOutside = () => onClose();
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [onClose]);

  if (!note) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        style={{ top: y, left: x }}
        className="fixed z-50 w-52 bg-[#111111] border border-[#222222] rounded-xl p-1.5 shadow-2xl text-white font-sans text-xs space-y-1"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-2 py-1.5 font-mono text-[10px] text-[#9E9E9E] truncate border-b border-[#222222]">
          {note.title}
        </div>

        <button
          onClick={() => {
            togglePinNote(note.id);
            onClose();
          }}
          className="w-full flex items-center space-x-2.5 px-2.5 py-1.5 rounded-lg hover:bg-[#222222] transition-colors"
        >
          <Pin className="w-3.5 h-3.5 text-[#9E9E9E]" />
          <span>{note.isPinned ? "Unpin Note" : "Pin Note"}</span>
        </button>

        <button
          onClick={() => {
            toggleFavoriteNote(note.id);
            onClose();
          }}
          className="w-full flex items-center space-x-2.5 px-2.5 py-1.5 rounded-lg hover:bg-[#222222] transition-colors"
        >
          <Star className="w-3.5 h-3.5 text-[#9E9E9E]" />
          <span>{note.isFavorite ? "Unfavorite" : "Favorite"}</span>
        </button>

        <button
          onClick={() => {
            duplicateNote(note.id);
            onClose();
          }}
          className="w-full flex items-center space-x-2.5 px-2.5 py-1.5 rounded-lg hover:bg-[#222222] transition-colors"
        >
          <Copy className="w-3.5 h-3.5 text-[#9E9E9E]" />
          <span>Duplicate</span>
        </button>

        <button
          onClick={() => {
            openAIDrawerWithMacro("summarize", note.title);
            onClose();
          }}
          className="w-full flex items-center space-x-2.5 px-2.5 py-1.5 rounded-lg hover:bg-[#222222] transition-colors text-white"
        >
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>AI Summarize</span>
        </button>

        <div className="my-1 border-t border-[#222222]" />

        <button
          onClick={() => {
            deleteNote(note.id);
            onClose();
          }}
          className="w-full flex items-center space-x-2.5 px-2.5 py-1.5 rounded-lg hover:bg-white hover:text-black transition-colors text-white"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Move to Trash</span>
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
