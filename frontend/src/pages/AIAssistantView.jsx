import React, { useState } from "react";
import {
  Sparkles,
  Send,
  Copy,
  Check,
  Wand2,
  BookOpen,
  HelpCircle,
  Tag,
  FileText,
  Plus,
  RefreshCw,
  Terminal
} from "lucide-react";
import { useNotes } from "../context/NotesContext";

export default function AIAssistantView() {
  const { notes, activeNote, updateNote, addFlashcards } = useNotes();
  const [prompt, setPrompt] = useState("");
  const [selectedMacro, setSelectedMacro] = useState("summarize");
  const [isProcessing, setIsProcessing] = useState(false);
  const [output, setOutput] = useState(
    `### Welcome to Aether AI Studio\n\nSelect a macro from above or type a custom prompt. All generations adhere to the monochrome, high-density Aether design specification.\n\n- **Current Active Context**: ${activeNote ? activeNote.title : "Workspace Root"}\n- **Response Speed**: < 10ms local stream`
  );
  const [copied, setCopied] = useState(false);

  const macros = [
    { id: "summarize", label: "Executive Summary", icon: FileText },
    { id: "rewrite", label: "Professional Rewrite", icon: Wand2 },
    { id: "flashcards", label: "Flashcards Deck", icon: BookOpen },
    { id: "quiz", label: "Practice Quiz", icon: HelpCircle },
    { id: "tags", label: "Generate Tags", icon: Tag }
  ];

  const handleGenerate = (e) => {
    e?.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      let resp = "";
      if (selectedMacro === "summarize") {
        resp = `### Executive Summary: ${activeNote ? activeNote.title : "Workspace Notes"}\n\n1. **Architecture Rules**: Pure black canvas (#000000), 16px corner radii, high-contrast typography.\n2. **Performance Metrics**: Sub-15ms local note index caching.\n3. **Recommendation**: Continue modularizing frontend React hooks and state context.`;
      } else if (selectedMacro === "flashcards") {
        resp = `### Flashcards Generated\n\n- **Q**: What is the core accent color of Aether?\n  **A**: Pure White (#FFFFFF).\n- **Q**: What font is used for headers?\n  **A**: Space Grotesk.`;
        addFlashcards([
          {
            id: "fc-studio-" + Date.now(),
            deckId: "ai-studio",
            deckName: "AI Studio Synthesis",
            question: "What is the primary background color token?",
            answer: "#000000 (Pure Black)",
            difficulty: "Easy",
            lastReviewed: "Just created",
            mastery: 100
          }
        ]);
      } else {
        resp = `### AI Synthesis Result for: "${prompt || selectedMacro}"\n\nProcessed context using Gemini 2.5 Flash engine. Outputs structured with markdown headers and clean list formatting.`;
      }

      setOutput(resp);
      setIsProcessing(false);
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAppend = () => {
    if (activeNote) {
      updateNote(activeNote.id, {
        content: activeNote.content + "\n\n" + output
      });
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-[#222222] pb-6 space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#111111] border border-[#222222] text-xs font-mono text-white">
          <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
          <span>AETHER AI COPILOT WORKSPACE</span>
        </div>
        <h1 className="text-3xl font-display font-bold text-white tracking-tight">
          AI Studio & Synthesis
        </h1>
        <p className="text-xs text-[#9E9E9E]">
          Analyze, transform, and auto-generate documents from your knowledge base.
        </p>
      </div>

      {/* Macro Picker Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {macros.map((m) => {
          const Icon = m.icon;
          const isSel = selectedMacro === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setSelectedMacro(m.id)}
              className={`p-4 rounded-2xl border text-left flex flex-col justify-between space-y-3 transition-all ${
                isSel
                  ? "bg-white text-black border-white shadow-xl"
                  : "bg-[#111111] text-white border-[#222222] hover:border-white"
              }`}
            >
              <Icon className={`w-5 h-5 ${isSel ? "text-black" : "text-white"}`} />
              <div>
                <span className="text-xs font-semibold block">{m.label}</span>
                <span className={`text-[10px] font-mono ${isSel ? "text-black/70" : "text-[#9E9E9E]"}`}>
                  Macro
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Prompt Form */}
      <form onSubmit={handleGenerate} className="p-6 rounded-3xl bg-[#111111] border border-[#222222] space-y-4">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#9E9E9E]">
          <Terminal className="w-4 h-4 text-white" />
          <span>PROMPT COMMAND INPUT</span>
        </div>

        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type custom AI command or leave empty to trigger macro on active note..."
            className="w-full h-28 bg-[#000000] border border-[#222222] rounded-2xl p-4 text-white placeholder-[#9E9E9E] text-sm focus:outline-none focus:border-white transition-colors resize-none font-sans"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs font-mono text-[#9E9E9E]">
            Context: {activeNote ? activeNote.title : "Entire Vault"}
          </span>

          <button
            type="submit"
            disabled={isProcessing}
            className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-[#E5E5E5] transition-all disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Synthesizing...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Run AI Synthesis</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Output Console Box */}
      <div className="p-6 rounded-3xl bg-[#111111] border border-[#222222] space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-[#222222]">
          <span className="text-xs font-mono text-[#9E9E9E]">AI GENERATED OUTPUT</span>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#000000] border border-[#222222] text-xs font-mono text-[#9E9E9E] hover:text-white"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>

            {activeNote && (
              <button
                onClick={handleAppend}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-[#E5E5E5]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Append to Active Note</span>
              </button>
            )}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#000000] border border-[#222222] min-h-[220px] font-sans text-sm leading-relaxed whitespace-pre-wrap text-white">
          {output}
        </div>
      </div>
    </div>
  );
}
