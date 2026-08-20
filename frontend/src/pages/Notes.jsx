import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Grid,
  List,
  Plus,
  Pin,
  Star,
  Folder,
  Tag,
  ArrowUpDown,
  MoreVertical,
  Trash2,
  FileText,
  Clock,
  Sparkles
} from "lucide-react";
import { useNotes } from "../context/NotesContext";
import ContextMenu from "../components/common/ContextMenu";

export default function Notes() {
  const {
    notes,
    folders,
    tags,
    activeFolder,
    setActiveFolder,
    selectedTag,
    setSelectedTag,
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    sortBy,
    setSortBy,
    setActiveNoteId,
    setActivePage,
    createNewNote,
    togglePinNote,
    toggleFavoriteNote,
    deleteNote,
    openAIDrawerWithMacro
  } = useNotes();

  const [contextMenuState, setContextMenuState] = useState({
    isOpen: false,
    x: 0,
    y: 0,
    note: null
  });

  // Filter notes
  const activeNotes = notes.filter((n) => !n.isTrash);

  const filteredNotes = activeNotes
    .filter((n) => {
      if (activeFolder !== "All Notes" && n.folder !== activeFolder) return false;
      if (selectedTag && !n.tags.includes(selectedTag)) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q) ||
          n.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "updatedAt") {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === "wordCount") {
        return (b.wordCount || 0) - (a.wordCount || 0);
      }
      return 0;
    });

  const handleNoteClick = (id) => {
    setActiveNoteId(id);
    setActivePage("editor");
  };

  const handleContextMenu = (e, note) => {
    e.preventDefault();
    setContextMenuState({
      isOpen: true,
      x: e.clientX,
      y: e.clientY,
      note
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Filter & Toolbar Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#9E9E9E] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, content or #tags..."
              className="w-full bg-[#111111] border border-[#222222] text-white placeholder-[#9E9E9E] text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-white transition-colors font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#9E9E9E] hover:text-white"
              >
                CLEAR
              </button>
            )}
          </div>

          {/* Right Controls: Sort & Layout */}
          <div className="flex items-center space-x-3 shrink-0">
            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 bg-[#111111] border border-[#222222] px-3 py-2 rounded-xl text-xs font-mono text-[#9E9E9E]">
              <ArrowUpDown className="w-3.5 h-3.5 text-white" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-white focus:outline-none cursor-pointer"
              >
                <option value="updatedAt" className="bg-[#111111] text-white">Date Modified</option>
                <option value="title" className="bg-[#111111] text-white">Title A-Z</option>
                <option value="wordCount" className="bg-[#111111] text-white">Word Count</option>
              </select>
            </div>

            {/* Grid / List Switcher */}
            <div className="flex items-center p-1 bg-[#111111] border border-[#222222] rounded-xl">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === "grid"
                    ? "bg-white text-black font-bold"
                    : "text-[#9E9E9E] hover:text-white"
                }`}
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
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Folder Pills Filter */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {folders.map((folder) => {
            const isSelected = activeFolder === folder;
            return (
              <button
                key={folder}
                onClick={() => setActiveFolder(folder)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium shrink-0 transition-all ${
                  isSelected
                    ? "bg-white text-black font-semibold"
                    : "bg-[#111111] text-[#9E9E9E] border border-[#222222] hover:text-white"
                }`}
              >
                {folder}
              </button>
            );
          })}
        </div>

        {/* Tag Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
          <span className="text-[10px] font-mono text-[#9E9E9E] uppercase shrink-0">TAGS:</span>
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono shrink-0 transition-colors ${
              selectedTag === null
                ? "bg-[#222222] text-white border border-white/20"
                : "text-[#9E9E9E] hover:text-white"
            }`}
          >
            All
          </button>
          {tags.map((tag) => {
            const isSel = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(isSel ? null : tag)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono shrink-0 transition-colors ${
                  isSel
                    ? "bg-white text-black font-bold"
                    : "bg-[#111111] text-[#9E9E9E] border border-[#222222] hover:text-white"
                }`}
              >
                #{tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Notes Grid / List View */}
      {filteredNotes.length > 0 ? (
        viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map((note) => (
              <motion.div
                key={note.id}
                layout
                onClick={() => handleNoteClick(note.id)}
                onContextMenu={(e) => handleContextMenu(e, note)}
                className="p-5 rounded-2xl bg-[#111111] border border-[#222222] hover:border-white transition-all cursor-pointer group flex flex-col justify-between space-y-4 relative"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#9E9E9E] px-2 py-0.5 rounded bg-[#000000] border border-[#222222]">
                      {note.folder}
                    </span>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavoriteNote(note.id);
                        }}
                        className="text-[#9E9E9E] hover:text-white"
                      >
                        <Star
                          className={`w-3.5 h-3.5 ${
                            note.isFavorite ? "fill-white text-white" : ""
                          }`}
                        />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePinNote(note.id);
                        }}
                        className="text-[#9E9E9E] hover:text-white"
                      >
                        <Pin
                          className={`w-3.5 h-3.5 ${
                            note.isPinned ? "fill-white text-white" : ""
                          }`}
                        />
                      </button>
                    </div>
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
                  <div className="flex items-center space-x-1.5">
                    {note.tags.map((t, idx) => (
                      <span key={idx} className="text-[10px] text-white">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => handleNoteClick(note.id)}
                onContextMenu={(e) => handleContextMenu(e, note)}
                className="p-4 rounded-xl bg-[#111111] border border-[#222222] hover:border-white transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center space-x-4 min-w-0 pr-4">
                  <FileText className="w-5 h-5 text-[#9E9E9E] group-hover:text-white shrink-0" />
                  <div className="min-w-0">
                    <h4 className="font-display font-medium text-sm text-white group-hover:underline truncate">
                      {note.title}
                    </h4>
                    <p className="text-xs text-[#9E9E9E] font-mono truncate">
                      {note.folder} • {note.wordCount} words • #{note.tags.join(" #")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 shrink-0 text-xs font-mono text-[#9E9E9E]">
                  <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePinNote(note.id);
                    }}
                  >
                    <Pin className={`w-4 h-4 ${note.isPinned ? "fill-white text-white" : ""}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* Empty State */
        <div className="p-16 rounded-3xl bg-[#090909] border border-[#222222] border-dashed text-center space-y-4 max-w-md mx-auto my-12">
          <div className="w-12 h-12 rounded-2xl bg-[#111111] border border-[#222222] flex items-center justify-center mx-auto text-white">
            <FileText className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-display font-semibold text-white text-lg">No notes found</h3>
            <p className="text-xs text-[#9E9E9E]">
              No documents matched your folder or search query.
            </p>
          </div>
          <button
            onClick={() => createNewNote()}
            className="px-4 py-2.5 rounded-xl bg-white text-black font-medium text-xs hover:bg-[#E5E5E5] transition-all"
          >
            Create New Note
          </button>
        </div>
      )}

      {/* Floating New Note Button */}
      <button
        onClick={() => createNewNote()}
        className="fixed bottom-8 right-8 z-30 p-4 rounded-full bg-white text-black shadow-2xl hover:scale-105 active:scale-95 transition-all"
        title="Create Note (⌘N)"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Context Menu Component */}
      {contextMenuState.isOpen && (
        <ContextMenu
          x={contextMenuState.x}
          y={contextMenuState.y}
          note={contextMenuState.note}
          onClose={() => setContextMenuState((prev) => ({ ...prev, isOpen: false }))}
        />
      )}
    </div>
  );
}
