import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  Save,
  Clock,
  Eye,
  Edit,
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  Code,
  Quote,
  Share2,
  Trash2,
  Pin,
  Star,
  Folder,
  Tag,
  ArrowLeft
} from "lucide-react";
import { useNotes } from "../context/NotesContext";

export default function Editor() {
  const {
    activeNote,
    updateNote,
    deleteNote,
    togglePinNote,
    toggleFavoriteNote,
    openAIDrawerWithMacro,
    folders,
    tags,
    setActivePage
  } = useNotes();

  const [title, setTitle] = useState(activeNote ? activeNote.title : "");
  const [content, setContent] = useState(activeNote ? activeNote.content : "");
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (activeNote) {
      setTitle(activeNote.title);
      setContent(activeNote.content);
    }
  }, [activeNote?.id]);

  if (!activeNote) {
    return (
      <div className="p-16 text-center text-[#9E9E9E] space-y-4">
        <p>No note selected.</p>
        <button
          onClick={() => setActivePage("notes")}
          className="px-4 py-2 bg-white text-black rounded-xl text-xs font-medium"
        >
          Back to Notes
        </button>
      </div>
    );
  }

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    triggerAutosave(val, content);
  };

  const handleContentChange = (e) => {
    const val = e.target.value;
    setContent(val);
    triggerAutosave(title, val);
  };

  const triggerAutosave = (t, c) => {
    setIsSaving(true);
    updateNote(activeNote.id, { title: t, content: c });
    setTimeout(() => setIsSaving(false), 500);
  };

  const insertFormatting = (prefix, suffix = "") => {
    const textarea = document.getElementById("aether-editor-textarea");
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);

    const replacement = `${prefix}${selected || "text"}${suffix}`;
    const newContent = content.substring(0, start) + replacement + content.substring(end);

    setContent(newContent);
    triggerAutosave(title, newContent);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col justify-between">
      {/* Top Header Controls Bar */}
      <div className="p-6 max-w-5xl mx-auto w-full space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#222222]">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActivePage("notes")}
              className="p-2 rounded-xl bg-[#111111] border border-[#222222] text-[#9E9E9E] hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Folder Dropdown */}
            <div className="flex items-center space-x-2 bg-[#111111] border border-[#222222] px-3 py-1.5 rounded-xl text-xs font-mono text-[#9E9E9E]">
              <Folder className="w-3.5 h-3.5 text-white" />
              <select
                value={activeNote.folder}
                onChange={(e) => updateNote(activeNote.id, { folder: e.target.value })}
                className="bg-transparent text-white focus:outline-none cursor-pointer"
              >
                {folders.map((f) => (
                  <option key={f} value={f} className="bg-[#111111] text-white">
                    {f}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleFavoriteNote(activeNote.id)}
              className="p-2 rounded-xl bg-[#111111] border border-[#222222] text-[#9E9E9E] hover:text-white"
            >
              <Star className={`w-4 h-4 ${activeNote.isFavorite ? "fill-white text-white" : ""}`} />
            </button>

            <button
              onClick={() => togglePinNote(activeNote.id)}
              className="p-2 rounded-xl bg-[#111111] border border-[#222222] text-[#9E9E9E] hover:text-white"
            >
              <Pin className={`w-4 h-4 ${activeNote.isPinned ? "fill-white text-white" : ""}`} />
            </button>

            <button
              onClick={() => openAIDrawerWithMacro("summarize")}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white text-black font-medium text-xs hover:bg-[#E5E5E5]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Copilot</span>
            </button>

            <button
              onClick={() => setIsPreview(!isPreview)}
              className="p-2 rounded-xl bg-[#111111] border border-[#222222] text-[#9E9E9E] hover:text-white"
              title={isPreview ? "Edit Mode" : "Preview Mode"}
            >
              {isPreview ? <Edit className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                deleteNote(activeNote.id);
                setActivePage("notes");
              }}
              className="p-2 rounded-xl bg-[#111111] border border-[#222222] text-[#9E9E9E] hover:text-white"
              title="Move to Trash"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Floating Formatting Toolbar */}
        {!isPreview && (
          <div className="flex items-center space-x-1 bg-[#111111] border border-[#222222] p-1.5 rounded-2xl w-fit shadow-xl">
            <button
              onClick={() => insertFormatting("**", "**")}
              className="p-2 rounded-xl text-[#9E9E9E] hover:text-white hover:bg-[#222222]"
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertFormatting("*", "*")}
              className="p-2 rounded-xl text-[#9E9E9E] hover:text-white hover:bg-[#222222]"
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertFormatting("# ")}
              className="p-2 rounded-xl text-[#9E9E9E] hover:text-white hover:bg-[#222222]"
              title="Heading 1"
            >
              <Heading1 className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertFormatting("## ")}
              className="p-2 rounded-xl text-[#9E9E9E] hover:text-white hover:bg-[#222222]"
              title="Heading 2"
            >
              <Heading2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertFormatting("- ")}
              className="p-2 rounded-xl text-[#9E9E9E] hover:text-white hover:bg-[#222222]"
              title="List"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertFormatting("> ")}
              className="p-2 rounded-xl text-[#9E9E9E] hover:text-white hover:bg-[#222222]"
              title="Quote"
            >
              <Quote className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertFormatting("```\n", "\n```")}
              className="p-2 rounded-xl text-[#9E9E9E] hover:text-white hover:bg-[#222222]"
              title="Code Block"
            >
              <Code className="w-4 h-4" />
            </button>

            <div className="h-4 w-[1px] bg-[#222222] mx-1" />

            <button
              onClick={() => openAIDrawerWithMacro("rewrite")}
              className="px-2.5 py-1.5 rounded-xl text-xs font-mono text-white bg-[#000000] border border-[#222222] hover:border-white flex items-center space-x-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>AI Rewrite</span>
            </button>
          </div>
        )}

        {/* Title & Body Inputs */}
        <div className="space-y-4 pt-2">
          {/* Note Title Input */}
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Untitled Note..."
            className="w-full bg-transparent font-display font-bold text-3xl md:text-4xl text-white placeholder-[#9E9E9E] focus:outline-none tracking-tight"
          />

          {/* Metadata Bar */}
          <div className="flex items-center space-x-4 text-xs font-mono text-[#9E9E9E] pb-4 border-b border-[#222222]">
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-white" />
              <span>{activeNote.readingTime} read</span>
            </span>
            <span>•</span>
            <span>{activeNote.wordCount} words</span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Save className="w-3.5 h-3.5 text-white" />
              <span>{isSaving ? "Saving..." : "Saved"}</span>
            </span>
          </div>

          {/* Main Content Area */}
          {!isPreview ? (
            <textarea
              id="aether-editor-textarea"
              value={content}
              onChange={handleContentChange}
              placeholder="Start writing or paste your thoughts... Supports Markdown"
              className="w-full h-[60vh] bg-transparent text-white placeholder-[#9E9E9E] text-base leading-relaxed focus:outline-none resize-none font-sans"
            />
          ) : (
            <div className="w-full min-h-[60vh] p-6 rounded-2xl bg-[#111111] border border-[#222222] text-white space-y-4 leading-relaxed font-sans whitespace-pre-wrap">
              {content}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
