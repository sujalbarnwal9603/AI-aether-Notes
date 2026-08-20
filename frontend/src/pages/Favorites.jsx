import React from "react";
import { Star, FileText, Pin, ArrowUpRight } from "lucide-react";
import { useNotes } from "../context/NotesContext";

export default function Favorites() {
  const { notes, setActiveNoteId, setActivePage, toggleFavoriteNote } = useNotes();

  const favoriteNotes = notes.filter((n) => n.isFavorite && !n.isTrash);

  const handleNoteClick = (id) => {
    setActiveNoteId(id);
    setActivePage("editor");
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-[#222222] pb-6 space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#111111] border border-[#222222] text-xs font-mono text-white">
          <Star className="w-3.5 h-3.5 fill-white text-white" />
          <span>STARRED & FAVORITED COLLECTION</span>
        </div>
        <h1 className="text-3xl font-display font-bold text-white tracking-tight">
          Favorites ({favoriteNotes.length})
        </h1>
        <p className="text-xs text-[#9E9E9E]">
          High priority notes pinned for rapid reference.
        </p>
      </div>

      {favoriteNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => handleNoteClick(note.id)}
              className="p-5 rounded-2xl bg-[#111111] border border-[#222222] hover:border-white transition-all cursor-pointer group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#9E9E9E] px-2 py-0.5 rounded bg-[#000000] border border-[#222222]">
                    {note.folder}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavoriteNote(note.id);
                    }}
                  >
                    <Star className="w-4 h-4 fill-white text-white" />
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
                <ArrowUpRight className="w-4 h-4 text-[#9E9E9E] group-hover:text-white" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-16 rounded-3xl bg-[#090909] border border-[#222222] border-dashed text-center space-y-3">
          <Star className="w-8 h-8 text-[#9E9E9E] mx-auto" />
          <h3 className="text-base font-medium text-white">No favorite notes yet</h3>
          <p className="text-xs text-[#9E9E9E]">Click the star icon on any note card to add it to your favorites list.</p>
        </div>
      )}
    </div>
  );
}
