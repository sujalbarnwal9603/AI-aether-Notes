import React from "react";
import { Trash2, RotateCcw, X, AlertTriangle, FileText } from "lucide-react";
import { useNotes } from "../context/NotesContext";

export default function Trash() {
  const { notes, restoreNote, permanentDeleteNote, emptyTrash } = useNotes();

  const trashedNotes = notes.filter((n) => n.isTrash);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#222222] pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#111111] border border-[#222222] text-xs font-mono text-white">
            <Trash2 className="w-3.5 h-3.5 text-white" />
            <span>SOFT DELETED ITEMS</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">
            Trash Bin ({trashedNotes.length})
          </h1>
          <p className="text-xs text-[#9E9E9E]">
            Items in trash can be restored anytime or deleted permanently.
          </p>
        </div>

        {trashedNotes.length > 0 && (
          <button
            onClick={emptyTrash}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-[#E5E5E5] transition-all"
          >
            <Trash2 className="w-4 h-4" />
            <span>Empty Trash Permanently</span>
          </button>
        )}
      </div>

      {trashedNotes.length > 0 ? (
        <div className="space-y-3">
          {trashedNotes.map((note) => (
            <div
              key={note.id}
              className="p-4 rounded-2xl bg-[#111111] border border-[#222222] flex items-center justify-between gap-4"
            >
              <div className="flex items-center space-x-4 min-w-0">
                <FileText className="w-5 h-5 text-[#9E9E9E] shrink-0" />
                <div className="min-w-0">
                  <h3 className="font-display font-semibold text-white text-sm truncate">
                    {note.title}
                  </h3>
                  <p className="text-xs text-[#9E9E9E] font-mono truncate">
                    Folder: {note.folder} • {note.wordCount} words
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => restoreNote(note.id)}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-[#000000] border border-[#222222] text-xs font-mono text-white hover:border-white transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore</span>
                </button>

                <button
                  onClick={() => permanentDeleteNote(note.id)}
                  className="p-1.5 rounded-xl bg-[#000000] border border-[#222222] text-[#9E9E9E] hover:text-white transition-colors"
                  title="Delete Permanently"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-16 rounded-3xl bg-[#090909] border border-[#222222] border-dashed text-center space-y-3">
          <Trash2 className="w-8 h-8 text-[#9E9E9E] mx-auto" />
          <h3 className="text-base font-medium text-white">Trash bin is empty</h3>
          <p className="text-xs text-[#9E9E9E]">Deleted documents will appear here before being permanently cleared.</p>
        </div>
      )}
    </div>
  );
}
