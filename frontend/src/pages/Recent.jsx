import React from "react";
import { Clock, FileText, ArrowUpRight, Calendar } from "lucide-react";
import { useNotes } from "../context/NotesContext";

export default function Recent() {
  const { notes, setActiveNoteId, setActivePage } = useNotes();

  const activeNotes = notes
    .filter((n) => !n.isTrash)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  const handleNoteClick = (id) => {
    setActiveNoteId(id);
    setActivePage("editor");
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-[#222222] pb-6 space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#111111] border border-[#222222] text-xs font-mono text-white">
          <Clock className="w-3.5 h-3.5 text-white" />
          <span>CHRONOLOGICAL ACTIVITY TIMELINE</span>
        </div>
        <h1 className="text-3xl font-display font-bold text-white tracking-tight">
          Recently Modified Notes
        </h1>
        <p className="text-xs text-[#9E9E9E]">
          Sorted strictly by last modified timestamp across all workspace folders.
        </p>
      </div>

      {/* List Timeline */}
      <div className="space-y-3">
        {activeNotes.map((note) => (
          <div
            key={note.id}
            onClick={() => handleNoteClick(note.id)}
            className="p-5 rounded-2xl bg-[#111111] border border-[#222222] hover:border-white transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
          >
            <div className="flex items-center space-x-4 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#000000] border border-[#222222] flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="font-display font-semibold text-white text-base group-hover:underline truncate">
                  {note.title}
                </h3>
                <p className="text-xs text-[#9E9E9E] font-mono truncate mt-0.5">
                  {note.folder} • {note.wordCount} words • {note.readingTime}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 shrink-0 text-xs font-mono text-[#9E9E9E]">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-white" />
                <span>{new Date(note.updatedAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#9E9E9E] group-hover:text-white" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
