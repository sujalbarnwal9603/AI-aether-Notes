import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Plus, Sparkles, FileText, Folder, Star, Settings, Trash2, BookOpen, Clock, Command } from "lucide-react";
import { useNotes } from "../../context/NotesContext";

export default function CommandPalette() {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    notes,
    setActiveNoteId,
    setActivePage,
    createNewNote,
    openAIDrawerWithMacro
  } = useNotes();

  const [query, setQuery] = useState("");

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery("");
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const filteredNotes = notes
    .filter((n) => !n.isTrash)
    .filter(
      (n) =>
        n.title.toLowerCase().includes(query.toLowerCase()) ||
        n.content.toLowerCase().includes(query.toLowerCase()) ||
        n.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
    )
    .slice(0, 5);

  const navigationActions = [
    { label: "Go to Dashboard", page: "dashboard", icon: Command },
    { label: "Go to All Notes", page: "notes", icon: FileText },
    { label: "Go to Editor", page: "editor", icon: FileText },
    { label: "Go to Flashcards", page: "flashcards", icon: BookOpen },
    { label: "Go to AI Assistant", page: "ai-assistant", icon: Sparkles },
    { label: "Go to Recent Notes", page: "recent", icon: Clock },
    { label: "Go to Favorites", page: "favorites", icon: Star },
    { label: "Go to Trash", page: "trash", icon: Trash2 },
    { label: "Go to Settings", page: "settings", icon: Settings }
  ].filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));

  const aiActions = [
    { label: "AI: Summarize Current Note", action: "summarize" },
    { label: "AI: Rewrite with Professional Tone", action: "rewrite" },
    { label: "AI: Generate Flashcards Deck", action: "flashcards" },
    { label: "AI: Generate Practice Quiz", action: "quiz" },
    { label: "AI: Fix Grammar & Enhance", action: "grammar" }
  ].filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));

  const handleSelectNote = (id) => {
    setActiveNoteId(id);
    setActivePage("editor");
    setIsCommandPaletteOpen(false);
  };

  const handleSelectPage = (page) => {
    setActivePage(page);
    setIsCommandPaletteOpen(false);
  };

  const handleCreateNew = () => {
    createNewNote();
    setIsCommandPaletteOpen(false);
  };

  const handleAI = (macro) => {
    openAIDrawerWithMacro(macro);
    setIsCommandPaletteOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="w-full max-w-2xl bg-[#111111] border border-[#222222] rounded-2xl shadow-2xl overflow-hidden text-white"
        >
          {/* Header Input */}
          <div className="flex items-center px-4 py-3 border-b border-[#222222] bg-[#090909]">
            <Search className="w-5 h-5 text-[#9E9E9E] mr-3" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command, search notes, or ask AI..."
              className="w-full bg-transparent text-white placeholder-[#9E9E9E] text-base focus:outline-none font-sans"
            />
            <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-mono text-[#9E9E9E] bg-[#111111] border border-[#222222] rounded-md">
              ESC
            </kbd>
          </div>

          {/* Body List */}
          <div className="max-h-[380px] overflow-y-auto p-2 space-y-4">
            {/* Action: Create Note */}
            <div>
              <div
                onClick={handleCreateNew}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#222222] cursor-pointer group transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-white">Create New Note</span>
                    <p className="text-xs text-[#9E9E9E]">Start a new document instantly</p>
                  </div>
                </div>
                <kbd className="text-xs font-mono text-[#9E9E9E] bg-[#090909] px-2 py-1 rounded border border-[#222222]">
                  ⌘N
                </kbd>
              </div>
            </div>

            {/* Notes Section */}
            {filteredNotes.length > 0 && (
              <div>
                <p className="px-3 py-1 text-[11px] font-mono tracking-wider text-[#9E9E9E] uppercase">
                  Notes ({filteredNotes.length})
                </p>
                <div className="space-y-1 mt-1">
                  {filteredNotes.map((note) => (
                    <div
                      key={note.id}
                      onClick={() => handleSelectNote(note.id)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#222222] cursor-pointer group transition-colors"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <FileText className="w-4 h-4 text-[#9E9E9E] shrink-0 group-hover:text-white" />
                        <span className="text-sm font-medium text-white truncate">
                          {note.title}
                        </span>
                      </div>
                      <span className="text-xs text-[#9E9E9E] font-mono shrink-0 ml-2">
                        {note.folder}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Actions */}
            {aiActions.length > 0 && (
              <div>
                <p className="px-3 py-1 text-[11px] font-mono tracking-wider text-[#9E9E9E] uppercase">
                  AI Actions
                </p>
                <div className="space-y-1 mt-1">
                  {aiActions.map((ai, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleAI(ai.action)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#222222] cursor-pointer group transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <Sparkles className="w-4 h-4 text-white shrink-0" />
                        <span className="text-sm text-white">{ai.label}</span>
                      </div>
                      <span className="text-xs text-[#9E9E9E] font-mono">⌘J</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            {navigationActions.length > 0 && (
              <div>
                <p className="px-3 py-1 text-[11px] font-mono tracking-wider text-[#9E9E9E] uppercase">
                  Navigation
                </p>
                <div className="space-y-1 mt-1">
                  {navigationActions.map((nav, idx) => {
                    const Icon = nav.icon;
                    return (
                      <div
                        key={idx}
                        onClick={() => handleSelectPage(nav.page)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#222222] cursor-pointer group transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="w-4 h-4 text-[#9E9E9E] group-hover:text-white" />
                          <span className="text-sm text-white">{nav.label}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-[#222222] bg-[#090909] text-xs font-mono text-[#9E9E9E]">
            <div className="flex items-center space-x-2">
              <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>Aether Command Engine</span>
            </div>
            <span>Use ↑↓ to navigate, ↵ to select</span>
          </div>
        </motion.div>

        {/* Click Outside Backdrop */}
        <div
          className="absolute inset-0 -z-10"
          onClick={() => setIsCommandPaletteOpen(false)}
        />
      </div>
    </AnimatePresence>
  );
}
