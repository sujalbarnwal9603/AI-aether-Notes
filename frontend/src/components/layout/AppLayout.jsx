import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import CommandPalette from "../common/CommandPalette";
import AIAssistantDrawer from "../common/AIAssistantDrawer";
import KeyboardShortcutsModal from "../common/KeyboardShortcutsModal";
import Dashboard from "../../pages/Dashboard";
import Notes from "../../pages/Notes";
import Editor from "../../pages/Editor";
import Flashcards from "../../pages/Flashcards";
import AIAssistantView from "../../pages/AIAssistantView";
import Recent from "../../pages/Recent";
import Favorites from "../../pages/Favorites";
import Trash from "../../pages/Trash";
import Settings from "../../pages/Settings";
import { useNotes } from "../../context/NotesContext";

export default function AppLayout() {
  const { activePage, setActivePage } = useNotes();
  const location = useLocation();
  const navigate = useNavigate();

  // Sync route path to activePage state
  useEffect(() => {
    const path = location.pathname.toLowerCase().replace(/\/$/, "") || "/";
    let targetPage = "dashboard";
    if (path === "/notes") targetPage = "notes";
    else if (path === "/editor") targetPage = "editor";
    else if (path === "/flashcards") targetPage = "flashcards";
    else if (path === "/assistant" || path === "/ai-assistant") targetPage = "ai-assistant";
    else if (path === "/recent") targetPage = "recent";
    else if (path === "/favorites") targetPage = "favorites";
    else if (path === "/trash") targetPage = "trash";
    else if (path === "/settings") targetPage = "settings";

    if (activePage !== targetPage) {
      setActivePage(targetPage);
    }
  }, [location.pathname]);

  // Sync activePage state back to route path
  useEffect(() => {
    let targetPath = "/";
    if (activePage === "notes") targetPath = "/notes";
    else if (activePage === "editor") targetPath = "/editor";
    else if (activePage === "flashcards") targetPath = "/flashcards";
    else if (activePage === "ai-assistant") targetPath = "/assistant";
    else if (activePage === "recent") targetPath = "/recent";
    else if (activePage === "favorites") targetPath = "/favorites";
    else if (activePage === "trash") targetPath = "/trash";
    else if (activePage === "settings") targetPath = "/settings";

    if (location.pathname !== targetPath) {
      navigate(targetPath);
    }
  }, [activePage]);

  const renderCurrentPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "notes":
        return <Notes />;
      case "editor":
        return <Editor />;
      case "flashcards":
        return <Flashcards />;
      case "ai-assistant":
        return <AIAssistantView />;
      case "recent":
        return <Recent />;
      case "favorites":
        return <Favorites />;
      case "trash":
        return <Trash />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#000000] text-white overflow-hidden font-sans select-none">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto bg-[#000000] relative">
          {renderCurrentPage()}
        </main>
      </div>

      {/* Modals & Drawers */}
      <CommandPalette />
      <AIAssistantDrawer />
      <KeyboardShortcutsModal />
    </div>
  );
}
