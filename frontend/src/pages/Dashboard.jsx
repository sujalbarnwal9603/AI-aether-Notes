import React from "react";
import { motion } from "motion/react";
import {
  Plus,
  Sparkles,
  BookOpen,
  Pin,
  Clock,
  ArrowUpRight,
  Brain,
  FileText,
  Folder,
  TrendingUp,
  Activity,
  Keyboard
} from "lucide-react";
import { useNotes } from "../context/NotesContext";

export default function Dashboard() {
  const {
    notes,
    setActiveNoteId,
    setActivePage,
    createNewNote,
    togglePinNote,
    openAIDrawerWithMacro,
    activities,
    flashcards,
    folders,
    setIsShortcutsModalOpen
  } = useNotes();

  const activeNotes = notes.filter((n) => !n.isTrash);
  const pinnedNotes = activeNotes.filter((n) => n.isPinned);
  const recentNotes = [...activeNotes].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  ).slice(0, 4);

  const totalWords = activeNotes.reduce((acc, curr) => acc + (curr.wordCount || 0), 0);
  const masteredCards = flashcards.filter((f) => f.mastery >= 80).length;

  const handleOpenNote = (id) => {
    setActiveNoteId(id);
    setActivePage("editor");
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      {/* Premium Welcome Header */}
      <div className="p-8 rounded-3xl bg-[#111111] border border-[#222222] relative overflow-hidden bg-dot-grid">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#000000] border border-[#222222] text-xs font-mono text-white">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>AETHER AI ENGINE • ONLINE</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
            Welcome back to Aether.
          </h1>

          <p className="text-base text-[#9E9E9E] max-w-2xl leading-relaxed">
            Your monochrome knowledge vault. <span className="text-white font-medium">{activeNotes.length} active notes</span> indexing <span className="text-white font-medium">{totalWords.toLocaleString()} words</span> across {folders.length} workspace modules.
          </p>

          {/* Quick Action Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={() => createNewNote()}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white text-black font-medium text-xs hover:bg-[#E5E5E5] transition-all shadow-xl active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Create Note (⌘N)</span>
            </button>

            <button
              onClick={() => openAIDrawerWithMacro("summarize")}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#000000] border border-[#222222] text-white hover:border-white transition-all text-xs font-medium"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>AI Summarize (⌘J)</span>
            </button>

            <button
              onClick={() => setActivePage("flashcards")}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#000000] border border-[#222222] text-white hover:border-white transition-all text-xs font-medium"
            >
              <BookOpen className="w-4 h-4 text-[#9E9E9E]" />
              <span>Study Flashcards</span>
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#111111] border border-[#222222] space-y-2">
          <div className="flex items-center justify-between text-[#9E9E9E] text-xs font-mono">
            <span>TOTAL NOTES</span>
            <FileText className="w-4 h-4 text-white" />
          </div>
          <div className="text-2xl font-display font-bold text-white">{activeNotes.length}</div>
          <p className="text-[11px] text-[#9E9E9E] font-mono">Indexed in local storage</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#111111] border border-[#222222] space-y-2">
          <div className="flex items-center justify-between text-[#9E9E9E] text-xs font-mono">
            <span>ACTIVE FOLDERS</span>
            <Folder className="w-4 h-4 text-white" />
          </div>
          <div className="text-2xl font-display font-bold text-white">{folders.length}</div>
          <p className="text-[11px] text-[#9E9E9E] font-mono">Engineering, Research & Strategy</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#111111] border border-[#222222] space-y-2">
          <div className="flex items-center justify-between text-[#9E9E9E] text-xs font-mono">
            <span>FLASHCARDS MASTERED</span>
            <Brain className="w-4 h-4 text-white" />
          </div>
          <div className="text-2xl font-display font-bold text-white">
            {masteredCards} <span className="text-xs text-[#9E9E9E] font-normal">/ {flashcards.length}</span>
          </div>
          <p className="text-[11px] text-[#9E9E9E] font-mono">&gt; 80% Retention score</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#111111] border border-[#222222] space-y-2">
          <div className="flex items-center justify-between text-[#9E9E9E] text-xs font-mono">
            <span>TOTAL WORDS</span>
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div className="text-2xl font-display font-bold text-white">{totalWords.toLocaleString()}</div>
          <p className="text-[11px] text-[#9E9E9E] font-mono">Average 120 words / note</p>
        </div>
      </div>

      {/* Pinned Notes Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Pin className="w-4 h-4 text-white" />
            <h2 className="text-lg font-display font-semibold text-white">Pinned Notes</h2>
          </div>
          <button
            onClick={() => setActivePage("notes")}
            className="text-xs font-mono text-[#9E9E9E] hover:text-white transition-colors flex items-center space-x-1"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {pinnedNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pinnedNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => handleOpenNote(note.id)}
                className="p-5 rounded-2xl bg-[#111111] border border-[#222222] hover:border-white transition-all cursor-pointer group flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#9E9E9E] px-2 py-0.5 rounded bg-[#000000] border border-[#222222]">
                      {note.folder}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePinNote(note.id);
                      }}
                      className="text-white hover:opacity-80"
                      title="Unpin"
                    >
                      <Pin className="w-3.5 h-3.5 fill-white" />
                    </button>
                  </div>

                  <h3 className="font-display font-semibold text-white text-base group-hover:underline line-clamp-1">
                    {note.title}
                  </h3>

                  <p className="text-xs text-[#9E9E9E] line-clamp-3 leading-relaxed">
                    {note.content.replace(/[#*`]/g, "")}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#222222] text-[11px] font-mono text-[#9E9E9E]">
                  <span>{note.readingTime}</span>
                  <div className="flex items-center space-x-1">
                    {note.tags.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="text-[10px] text-white font-mono">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-[#090909] border border-[#222222] border-dashed text-center space-y-2">
            <Pin className="w-6 h-6 text-[#9E9E9E] mx-auto" />
            <p className="text-sm text-white font-medium">No pinned notes yet</p>
            <p className="text-xs text-[#9E9E9E]">Right click or click the pin icon on any note card to pin it here.</p>
          </div>
        )}
      </div>

      {/* Two Column Layout: Recent Notes & Activity Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Notes (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-white" />
              <h2 className="text-lg font-display font-semibold text-white">Recent Notes</h2>
            </div>
          </div>

          <div className="space-y-3">
            {recentNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => handleOpenNote(note.id)}
                className="p-4 rounded-2xl bg-[#111111] border border-[#222222] hover:border-white transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center space-x-4 min-w-0 pr-4">
                  <div className="w-10 h-10 rounded-xl bg-[#000000] border border-[#222222] flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-display font-medium text-sm text-white group-hover:underline truncate">
                      {note.title}
                    </h4>
                    <p className="text-xs text-[#9E9E9E] font-mono truncate">
                      {note.folder} • {note.wordCount} words
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <span className="text-xs font-mono text-[#9E9E9E]">
                    {new Date(note.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#9E9E9E] group-hover:text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Timeline (1 col) */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-white" />
            <h2 className="text-lg font-display font-semibold text-white">Activity Timeline</h2>
          </div>

          <div className="p-5 rounded-2xl bg-[#111111] border border-[#222222] space-y-4">
            {activities.slice(0, 5).map((act) => (
              <div key={act.id} className="flex items-start space-x-3 text-xs">
                <div className="w-2 h-2 rounded-full bg-white mt-1.5 shrink-0" />
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white truncate">{act.title}</span>
                    <span className="text-[10px] font-mono text-[#9E9E9E]">{act.time}</span>
                  </div>
                  <p className="text-[#9E9E9E] line-clamp-2">{act.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Teaser */}
      <div className="p-6 rounded-2xl bg-[#090909] border border-[#222222] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-[#111111] border border-[#222222] flex items-center justify-center text-white shrink-0">
            <Keyboard className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-display font-medium text-sm text-white">Power User Hotkeys</h4>
            <p className="text-xs text-[#9E9E9E]">Navigate seamlessly with Linear & Nothing OS command bindings.</p>
          </div>
        </div>

        <button
          onClick={() => setIsShortcutsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-[#111111] border border-[#222222] text-xs font-mono text-white hover:border-white transition-colors"
        >
          View Cheatsheet (⌘K)
        </button>
      </div>
    </div>
  );
}
