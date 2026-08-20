import React, { createContext, useContext, useState, useEffect } from "react";
import { INITIAL_NOTES, INITIAL_FOLDERS, INITIAL_TAGS, INITIAL_FLASHCARDS, ACTIVITY_TIMELINE, KEYBOARD_SHORTCUTS } from "../data/initialData";

const NotesContext = createContext(null);

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("aether_notes");
    return saved ? JSON.parse(saved) : INITIAL_NOTES;
  });

  const [folders, setFolders] = useState(() => {
    const saved = localStorage.getItem("aether_folders");
    return saved ? JSON.parse(saved) : INITIAL_FOLDERS;
  });

  const [tags, setTags] = useState(() => {
    const saved = localStorage.getItem("aether_tags");
    return saved ? JSON.parse(saved) : INITIAL_TAGS;
  });

  const [flashcards, setFlashcards] = useState(() => {
    const saved = localStorage.getItem("aether_flashcards");
    return saved ? JSON.parse(saved) : INITIAL_FLASHCARDS;
  });

  const [activities, setActivities] = useState(ACTIVITY_TIMELINE);

  const [activeNoteId, setActiveNoteId] = useState("note-1");
  const [activeFolder, setActiveFolder] = useState("All Notes");
  const [selectedTag, setSelectedTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const [sortBy, setSortBy] = useState("updatedAt"); // 'updatedAt' | 'title' | 'wordCount'
  const [activePage, setActivePage] = useState("dashboard"); // 'dashboard' | 'notes' | 'editor' | 'flashcards' | 'ai-assistant' | 'recent' | 'favorites' | 'trash' | 'settings'
  
  // Modals & Drawers
  const [isAIDrawerOpen, setIsAIDrawerOpen] = useState(false);
  const [aiDrawerPrompt, setAIDrawerPrompt] = useState("");
  const [aiPresetAction, setAIPresetAction] = useState(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Settings
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("aether_settings");
    return saved ? JSON.parse(saved) : {
      dotMatrixDensity: "normal", // 'off' | 'normal' | 'dense'
      fontSize: "medium", // 'compact' | 'medium' | 'large'
      autosaveInterval: 3, // seconds
      soundEffects: false,
      aiAutoSummary: true
    };
  });

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem("aether_notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("aether_flashcards", JSON.stringify(flashcards));
  }, [flashcards]);

  useEffect(() => {
    localStorage.setItem("aether_settings", JSON.stringify(settings));
  }, [settings]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // ⌘K or Ctrl+K -> Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      // ⌘N or Ctrl+N -> New Note
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "n") {
        e.preventDefault();
        createNewNote();
      }
      // ⌘J or Ctrl+J -> AI Assistant Drawer
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j") {
        e.preventDefault();
        setIsAIDrawerOpen((prev) => !prev);
      }
      // ⌘/ -> Toggle Sidebar
      if ((e.metaKey || e.ctrlKey) && e.key === "/") {
        e.preventDefault();
        setIsSidebarCollapsed((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [notes]);

  // Actions
  const logActivity = (title, desc, icon = "FileText") => {
    const newAct = {
      id: "act-" + Date.now(),
      time: "Just now",
      title,
      desc,
      icon
    };
    setActivities((prev) => [newAct, ...prev.slice(0, 15)]);
  };

  const createNewNote = (folder = "Engineering") => {
    const newId = "note-" + Date.now();
    const newNote = {
      id: newId,
      title: "Untitled Note",
      content: "# Untitled Note\n\nStart writing here...",
      folder: folder === "All Notes" ? "Engineering" : folder,
      tags: ["draft"],
      isPinned: false,
      isFavorite: false,
      isTrash: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      wordCount: 5,
      readingTime: "1 min"
    };

    setNotes((prev) => [newNote, ...prev]);
    setActiveNoteId(newId);
    setActivePage("editor");
    logActivity("New Note Created", "Started 'Untitled Note'", "Plus");
    return newNote;
  };

  const updateNote = (id, fields) => {
    setNotes((prev) =>
      prev.map((n) => {
        if (n.id === id) {
          const content = fields.content !== undefined ? fields.content : n.content;
          const words = content.trim().split(/\s+/).filter(Boolean).length;
          const readingTime = Math.max(1, Math.ceil(words / 200)) + " min";

          return {
            ...n,
            ...fields,
            updatedAt: new Date().toISOString(),
            wordCount: words,
            readingTime
          };
        }
        return n;
      })
    );
  };

  const togglePinNote = (id) => {
    setNotes((prev) =>
      prev.map((n) => {
        if (n.id === id) {
          const nextState = !n.isPinned;
          logActivity(
            nextState ? "Note Pinned" : "Note Unpinned",
            `Updated '${n.title}'`,
            "Pin"
          );
          return { ...n, isPinned: nextState };
        }
        return n;
      })
    );
  };

  const toggleFavoriteNote = (id) => {
    setNotes((prev) =>
      prev.map((n) => {
        if (n.id === id) {
          const nextState = !n.isFavorite;
          logActivity(
            nextState ? "Added to Favorites" : "Removed from Favorites",
            `Updated '${n.title}'`,
            "Star"
          );
          return { ...n, isFavorite: nextState };
        }
        return n;
      })
    );
  };

  const deleteNote = (id) => {
    setNotes((prev) =>
      prev.map((n) => {
        if (n.id === id) {
          logActivity("Moved to Trash", `Moved '${n.title}' to trash`, "Trash");
          return { ...n, isTrash: true };
        }
        return n;
      })
    );
  };

  const restoreNote = (id) => {
    setNotes((prev) =>
      prev.map((n) => {
        if (n.id === id) {
          logActivity("Note Restored", `Restored '${n.title}'`, "RotateCcw");
          return { ...n, isTrash: false };
        }
        return n;
      })
    );
  };

  const permanentDeleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    logActivity("Permanently Deleted", "Removed note forever", "X");
  };

  const emptyTrash = () => {
    setNotes((prev) => prev.filter((n) => !n.isTrash));
    logActivity("Trash Emptied", "Permanently removed all trashed notes", "Trash2");
  };

  const duplicateNote = (id) => {
    const noteToDup = notes.find((n) => n.id === id);
    if (!noteToDup) return;

    const newId = "note-" + Date.now();
    const dupNote = {
      ...noteToDup,
      id: newId,
      title: `${noteToDup.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setNotes((prev) => [dupNote, ...prev]);
    logActivity("Note Duplicated", `Created copy of '${noteToDup.title}'`, "Copy");
  };

  const openAIDrawerWithMacro = (macroAction, customPrompt = "") => {
    setAIPresetAction(macroAction);
    setAIDrawerPrompt(customPrompt);
    setIsAIDrawerOpen(true);
  };

  const addFlashcards = (newCards) => {
    setFlashcards((prev) => [...newCards, ...prev]);
    logActivity("Flashcards Generated", `Added ${newCards.length} cards to deck`, "Brain");
  };

  const activeNote = notes.find((n) => n.id === activeNoteId) || notes[0];

  return (
    <NotesContext.Provider
      value={{
        notes,
        folders,
        tags,
        flashcards,
        activities,
        activeNoteId,
        setActiveNoteId,
        activeNote,
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
        activePage,
        setActivePage,
        isAIDrawerOpen,
        setIsAIDrawerOpen,
        aiDrawerPrompt,
        setAIDrawerPrompt,
        aiPresetAction,
        setAIPresetAction,
        openAIDrawerWithMacro,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isShortcutsModalOpen,
        setIsShortcutsModalOpen,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        settings,
        setSettings,
        KEYBOARD_SHORTCUTS,
        createNewNote,
        updateNote,
        togglePinNote,
        toggleFavoriteNote,
        deleteNote,
        restoreNote,
        permanentDeleteNote,
        emptyTrash,
        duplicateNote,
        addFlashcards
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
}
