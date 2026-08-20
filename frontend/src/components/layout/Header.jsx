import React from "react";
import {
  Search,
  Sparkles,
  Grid,
  List,
  Plus,
  Command,
  Save,
  Clock,
  BookOpen
} from "lucide-react";
import { useNotes } from "../../context/NotesContext";

export default function Header() {
  const {
    activePage,
    activeFolder,
    activeNote,
    viewMode,
    setViewMode,
    setIsCommandPaletteOpen,
    openAIDrawerWithMacro,
    createNewNote
  } = useNotes();

  const getPageTitle = () => {
    switch (activePage) {
      case "dashboard":
        return "Dashboard Overview";
      case "notes":
        return `Notes / ${activeFolder}`;
      case "editor":
        return activeNote ? activeNote.title : "Editor";
      case "flashcards":
        return "Flashcards Study Hub";
      case "ai-assistant":
        return "Aether AI Copilot";
      case "recent":
        return "Recently Modified";
      case "favorites":
        return "Favorite Collection";
      case "trash":
        return "Trash Bin";
      case "settings":
        return "System Settings";
      default:
        return "Workspace";
    }
  };

  return (
    <header className="h-16 border-b border-[#222222] bg-[#000000]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20 select-none">
      {/* Left Breadcrumb & Page Title */}
      <div className="flex items-center space-x-3 min-w-0">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#9E9E9E] truncate">
          <span>Aether</span>
          <span>/</span>
          <span className="text-white font-medium capitalize truncate">
            {getPageTitle()}
          </span>
        </div>

        {/* Autosave Status on Editor */}
        {activePage === "editor" && (
          <div className="hidden md:flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#111111] border border-[#222222] text-[10px] font-mono text-[#9E9E9E]">
            <Save className="w-3 h-3 text-white" />
            <span>Autosaved</span>
          </div>
        )}
      </div>

      {/* Right Action Controls */}
      <div className="flex items-center space-x-3 shrink-0">
        {/* Editor Specific Meta (Word Count & Reading Time) */}
        {activePage === "editor" && activeNote && (
          <div className="hidden lg:flex items-center space-x-3 text-xs font-mono text-[#9E9E9E] border-r border-[#222222] pr-3">
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-white" />
              <span>{activeNote.readingTime} read</span>
            </span>
            <span>•</span>
            <span>{activeNote.wordCount} words</span>
          </div>
        )}

        {/* Notes View Mode Toggle */}
        {activePage === "notes" && (
          <div className="flex items-center p-1 bg-[#111111] border border-[#222222] rounded-xl">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === "grid"
                  ? "bg-white text-black font-bold"
                  : "text-[#9E9E9E] hover:text-white"
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === "list"
                  ? "bg-white text-black font-bold"
                  : "text-[#9E9E9E] hover:text-white"
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Search Command Trigger */}
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#111111] border border-[#222222] text-[#9E9E9E] hover:text-white hover:border-white transition-all text-xs font-mono"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Search notes...</span>
          <kbd className="px-1.5 py-0.5 text-[10px] bg-[#000000] border border-[#222222] rounded text-white font-mono">
            ⌘K
          </kbd>
        </button>

        {/* AI Assistant Drawer Trigger */}
        <button
          onClick={() => openAIDrawerWithMacro("summarize")}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white text-black font-medium text-xs hover:bg-[#E5E5E5] transition-all shadow-md active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">AI Copilot</span>
          <kbd className="px-1.5 py-0.5 text-[10px] bg-black text-white rounded font-mono">
            ⌘J
          </kbd>
        </button>

        {/* New Note Button */}
        <button
          onClick={() => createNewNote()}
          className="p-2 rounded-xl bg-[#111111] border border-[#222222] text-white hover:bg-white hover:text-black transition-all"
          title="Create New Note (⌘N)"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
