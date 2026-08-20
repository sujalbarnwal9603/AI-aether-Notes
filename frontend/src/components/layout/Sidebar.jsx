import React from "react";
import { motion } from "motion/react";
import {
  LayoutDashboard,
  FileText,
  Edit3,
  BookOpen,
  Sparkles,
  Clock,
  Star,
  Trash2,
  Settings,
  Folder,
  Plus,
  ChevronLeft,
  ChevronRight,
  Keyboard,
  HardDrive
} from "lucide-react";
import { useNotes } from "../../context/NotesContext";

export default function Sidebar() {
  const {
    activePage,
    setActivePage,
    folders,
    activeFolder,
    setActiveFolder,
    notes,
    createNewNote,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    setIsShortcutsModalOpen,
    settings
  } = useNotes();

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "notes", label: "All Notes", icon: FileText, badge: notes.filter((n) => !n.isTrash).length },
    { id: "editor", label: "Editor", icon: Edit3 },
    { id: "flashcards", label: "Flashcards", icon: BookOpen },
    { id: "ai-assistant", label: "AI Assistant", icon: Sparkles },
    { id: "recent", label: "Recent", icon: Clock },
    { id: "favorites", label: "Favorites", icon: Star, badge: notes.filter((n) => n.isFavorite && !n.isTrash).length },
    { id: "trash", label: "Trash", icon: Trash2, badge: notes.filter((n) => n.isTrash).length },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
  };

  const handleFolderClick = (folder) => {
    setActiveFolder(folder);
    if (activePage !== "notes") {
      setActivePage("notes");
    }
  };

  return (
    <motion.aside
      animate={{ width: isSidebarCollapsed ? 80 : 256 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={`h-screen bg-[#000000] border-r border-[#222222] flex flex-col justify-between select-none relative z-30 shrink-0 ${
        settings.dotMatrixDensity === "dense" ? "bg-dot-grid-dense" : "bg-dot-grid"
      }`}
    >
      {/* Top Header & Logo */}
      <div className="p-4 border-b border-[#222222]">
        <div className="flex items-center justify-between">
          <div
            onClick={() => setActivePage("dashboard")}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            {/* Dot Matrix Logo Symbol */}
            <div className="w-8 h-8 rounded-xl bg-[#111111] border border-[#222222] flex items-center justify-center font-mono text-sm font-bold text-white group-hover:border-white transition-colors relative overflow-hidden">
              <span className="relative z-10">æ</span>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {!isSidebarCollapsed && (
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm tracking-wider text-white uppercase">
                  Aether OS
                </span>
                <span className="font-mono text-[10px] text-[#9E9E9E] tracking-tight">
                  v2.5 Monochrome
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1.5 rounded-lg text-[#9E9E9E] hover:text-white hover:bg-[#111111] transition-colors"
            title="Toggle Sidebar (⌘/)"
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Quick New Note Button */}
        <button
          onClick={() => createNewNote()}
          className={`w-full mt-4 flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-white text-black font-medium text-xs hover:bg-[#E5E5E5] transition-all shadow-lg active:scale-95 ${
            isSidebarCollapsed ? "px-0" : ""
          }`}
        >
          <Plus className="w-4 h-4" />
          {!isSidebarCollapsed && <span>New Note</span>}
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {/* Main Navigation */}
        <div className="space-y-1">
          {!isSidebarCollapsed && (
            <p className="px-3 py-1 text-[10px] font-mono tracking-widest text-[#9E9E9E] uppercase">
              Main Surface
            </p>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? "bg-[#111111] text-white border border-[#222222]"
                    : "text-[#9E9E9E] hover:text-white hover:bg-[#090909]"
                }`}
                title={isSidebarCollapsed ? item.label : undefined}
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? "text-white" : "text-[#9E9E9E] group-hover:text-white"
                    }`}
                  />
                  {!isSidebarCollapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                </div>

                {!isSidebarCollapsed && item.badge !== undefined && (
                  <span
                    className={`px-2 py-0.5 text-[10px] font-mono rounded-full ${
                      isActive
                        ? "bg-white text-black font-bold"
                        : "bg-[#111111] text-[#9E9E9E] border border-[#222222]"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Folders Section */}
        {!isSidebarCollapsed && (
          <div className="space-y-1 pt-2 border-t border-[#222222]">
            <p className="px-3 py-1 text-[10px] font-mono tracking-widest text-[#9E9E9E] uppercase">
              Folders
            </p>
            {folders.map((folder) => {
              const isFolderActive = activeFolder === folder && activePage === "notes";
              const count =
                folder === "All Notes"
                  ? notes.filter((n) => !n.isTrash).length
                  : notes.filter((n) => n.folder === folder && !n.isTrash).length;

              return (
                <button
                  key={folder}
                  onClick={() => handleFolderClick(folder)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-colors ${
                    isFolderActive
                      ? "text-white bg-[#111111] border border-[#222222]"
                      : "text-[#9E9E9E] hover:text-white hover:bg-[#090909]"
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <Folder className="w-3.5 h-3.5 shrink-0 text-[#9E9E9E]" />
                    <span className="truncate">{folder}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#9E9E9E]">{count}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer System Status */}
      <div className="p-4 border-t border-[#222222] bg-[#000000] space-y-3">
        {!isSidebarCollapsed ? (
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono text-[#9E9E9E] mb-1">
              <span className="flex items-center space-x-1">
                <HardDrive className="w-3 h-3 text-white" />
                <span>Local Engine</span>
              </span>
              <span className="text-white font-medium">98% Free</span>
            </div>
            <div className="w-full bg-[#111111] h-1.5 rounded-full overflow-hidden border border-[#222222]">
              <div className="bg-white h-full w-[12%]" />
            </div>

            <button
              onClick={() => setIsShortcutsModalOpen(true)}
              className="mt-3 w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[#090909] border border-[#222222] text-[#9E9E9E] hover:text-white transition-colors text-xs font-mono"
            >
              <div className="flex items-center space-x-2">
                <Keyboard className="w-3.5 h-3.5" />
                <span>Shortcuts</span>
              </div>
              <span>⌘K</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsShortcutsModalOpen(true)}
            className="w-full flex justify-center py-2 text-[#9E9E9E] hover:text-white"
            title="Shortcuts (⌘K)"
          >
            <Keyboard className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.aside>
  );
}
