import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, Send, Copy, Check, RefreshCw, ArrowRight, Wand2, BookOpen, Tag, HelpCircle, FileText, Plus } from "lucide-react";
import { useNotes } from "../../context/NotesContext";

export default function AIAssistantDrawer() {
  const {
    isAIDrawerOpen,
    setIsAIDrawerOpen,
    activeNote,
    updateNote,
    aiPresetAction,
    aiDrawerPrompt,
    addFlashcards
  } = useNotes();

  const [inputPrompt, setInputPrompt] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello. I am Aether AI. Select an action above or type a command to analyze, summarize, or synthesize your active note."
    }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Trigger preset when drawer opens with macro
  useEffect(() => {
    if (isAIDrawerOpen && aiPresetAction) {
      handleMacroExecute(aiPresetAction, aiDrawerPrompt);
    }
  }, [isAIDrawerOpen, aiPresetAction, aiDrawerPrompt]);

  if (!isAIDrawerOpen) return null;

  const macros = [
    { id: "summarize", label: "Summarize", icon: FileText, desc: "Key executive takeaways" },
    { id: "rewrite", label: "Rewrite", icon: Wand2, desc: "Refine tone & clarity" },
    { id: "continue", label: "Continue Writing", icon: ArrowRight, desc: "Autocompletes next paragraphs" },
    { id: "grammar", label: "Fix Grammar", icon: Check, desc: "Correct syntax & spelling" },
    { id: "translate", label: "Translate", icon: RefreshCw, desc: "Multi-language conversion" },
    { id: "flashcards", label: "Generate Flashcards", icon: BookOpen, desc: "Creates study cards" },
    { id: "quiz", label: "Generate Quiz", icon: HelpCircle, desc: "Builds multiple-choice test" },
    { id: "tags", label: "Generate Tags", icon: Tag, desc: "Smart categorization" },
    { id: "title", label: "Generate Title", icon: Sparkles, desc: "Crisp headline suggestions" }
  ];

  const handleMacroExecute = (macroId, customPrompt = "") => {
    setIsGenerating(true);
    const noteText = activeNote ? activeNote.content : "No active note selected.";
    const noteTitle = activeNote ? activeNote.title : "Untitled";

    let aiResponse = "";

    switch (macroId) {
      case "summarize":
        aiResponse = `### Executive Summary: "${noteTitle}"\n\n- **Primary Focus**: Architectural and operational standards for modern minimalist software.\n- **Core Insight**: Strict adherence to monochrome black aesthetics (#000000) paired with low-latency interaction yields high cognitive focus.\n- **Key Outcome**: Streamlined SaaS workflow with zero visual noise.`;
        break;

      case "rewrite":
        aiResponse = `### Professional Refinement\n\n${noteText.slice(0, 300)}\n\n*(Enhanced for clarity, concise terminology, and crisp sentence structure)*`;
        break;

      case "continue":
        aiResponse = `\n\n### Continued Context & Expansion\nBuilding upon these principles, the Aether system utilizes deterministic local storage caching. By minimizing standard browser overhead and eliminating heavy third-party UI framework bloat, response times remain under 15ms. Next steps include implementing real-time websocket synchronization sockets.`;
        break;

      case "grammar":
        aiResponse = `### Grammar & Syntax Report\n\n✅ All spelling verified.\n✅ Paragraph structure aligned to 65-75 character line widths.\n✅ No passive voice or redundant word usage detected.`;
        break;

      case "translate":
        aiResponse = `### Japanese Translation (日本語)\n\n# Aether OS 概要\nAetherは、Nothing OS、Linear、Arc Browserのコンセプトを組み合わせた純粋な黒のミニマリストAIノートアプリです。`;
        break;

      case "flashcards":
        aiResponse = `### Generated Flashcard Deck\n\n1. **Q**: What is the core background color of Aether?\n   **A**: Pure black (#000000) for zero eye strain.\n\n2. **Q**: What font handles code and metadata?\n   **A**: JetBrains Mono.`;
        
        // Automatically add to flashcard state
        addFlashcards([
          {
            id: "fc-ai-" + Date.now() + "-1",
            deckId: activeNote ? activeNote.id : "ai-gen",
            deckName: noteTitle,
            question: `What is the primary objective of "${noteTitle}"?`,
            answer: "To establish a minimalist, distraction-free SaaS environment.",
            difficulty: "Medium",
            lastReviewed: "Just created",
            mastery: 50
          },
          {
            id: "fc-ai-" + Date.now() + "-2",
            deckId: activeNote ? activeNote.id : "ai-gen",
            deckName: noteTitle,
            question: "How does Aether optimize latency?",
            answer: "Through local state management and deterministic UI components.",
            difficulty: "Easy",
            lastReviewed: "Just created",
            mastery: 60
          }
        ]);
        break;

      case "quiz":
        aiResponse = `### AI Practice Quiz\n\n**Question 1**: Which design standard is enforced across cards?\n- [ ] A) 8px rounded glassmorphism\n- [x] B) 16px corner radius with #222222 border\n- [ ] C) Soft pastel gradient shadows\n\n**Question 2**: What keybinding triggers AI Commands?\n- [x] A) ⌘J\n- [ ] B) ⌘P\n- [ ] C) ⌘E`;
        break;

      case "tags":
        const newTags = ["ai-synthesized", "executive", "q3-milestone"];
        if (activeNote) {
          updateNote(activeNote.id, { tags: Array.from(newSet([...activeNote.tags, ...newTags])) });
        }
        aiResponse = `### Smart Tags Generated & Applied\n\nApplied tags: \`#ai-synthesized\`, \`#executive\`, \`#q3-milestone\``;
        break;

      case "title":
        aiResponse = `### AI Title Suggestions\n\n1. **Aether OS: Monochrome AI SaaS Specifications**\n2. **Zero-Distraction Note Engineering (2026)**\n3. **High-Performance Architecture Roadmap**`;
        break;

      default:
        aiResponse = `Analysis for "${customPrompt || macroId}" complete. Recommendations processed according to Nothing OS and Linear design constraints.`;
        break;
    }

    // Helper for set deduplication
    function newSet(arr) {
      return Array.from(new Set(arr));
    }

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: `Execute Macro: ${macroId.toUpperCase()} ${customPrompt ? `(${customPrompt})` : ""}` },
        { role: "assistant", content: aiResponse }
      ]);
      setIsGenerating(false);
    }, 600);
  };

  const handleSendPrompt = (e) => {
    e.preventDefault();
    if (!inputPrompt.trim() || isGenerating) return;

    const userText = inputPrompt;
    setInputPrompt("");
    setIsGenerating(true);

    setMessages((prev) => [...prev, { role: "user", content: userText }]);

    setTimeout(() => {
      const resp = `### AI Response for: "${userText}"\n\nBased on the active note context ("${activeNote ? activeNote.title : "Workspace"}"):\n\n1. **Core Concept**: Refined monochrome execution.\n2. **Action Item**: Implement structural changes or append directly to editor.\n3. **Status**: Verified compliant with Aether Design Standards.`;
      
      setMessages((prev) => [...prev, { role: "assistant", content: resp }]);
      setIsGenerating(false);
    }, 700);
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleAppendToNote = (text) => {
    if (!activeNote) return;
    updateNote(activeNote.id, {
      content: activeNote.content + "\n\n" + text
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="w-full max-w-lg bg-[#090909] border-l border-[#222222] h-full flex flex-col shadow-2xl text-white relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#222222] bg-[#000000]">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white border border-[#222222]">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-white text-base">Aether AI Copilot</h3>
                <p className="text-xs font-mono text-[#9E9E9E]">
                  Context: <span className="text-white font-medium truncate max-w-[160px] inline-block align-bottom">{activeNote ? activeNote.title : "None"}</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsAIDrawerOpen(false)}
              className="p-2 rounded-xl text-[#9E9E9E] hover:text-white hover:bg-[#111111] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick AI Macro Grid */}
          <div className="p-4 border-b border-[#222222] bg-[#000000]/50 overflow-x-auto">
            <p className="text-[11px] font-mono tracking-wider text-[#9E9E9E] uppercase mb-2">
              Instant AI Macros (⌘J)
            </p>
            <div className="grid grid-cols-3 gap-2">
              {macros.map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    onClick={() => handleMacroExecute(m.id)}
                    disabled={isGenerating}
                    className="flex flex-col items-start p-2.5 rounded-xl bg-[#111111] border border-[#222222] hover:bg-white hover:text-black transition-all text-left group disabled:opacity-50"
                  >
                    <Icon className="w-4 h-4 text-white group-hover:text-black mb-1" />
                    <span className="text-xs font-medium text-white group-hover:text-black">{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chat / Output Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 font-sans text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                <div className="flex items-center space-x-2 mb-1 text-xs font-mono text-[#9E9E9E]">
                  <span>{msg.role === "user" ? "YOU" : "AETHER AI"}</span>
                </div>
                <div
                  className={`p-4 rounded-2xl max-w-[90%] border text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-white text-black font-medium border-white"
                      : "bg-[#111111] text-white border-[#222222]"
                  }`}
                >
                  {msg.content}

                  {/* Actions for Assistant Msg */}
                  {msg.role === "assistant" && idx > 0 && (
                    <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-[#222222]">
                      <button
                        onClick={() => handleCopy(msg.content, idx)}
                        className="flex items-center space-x-1 text-xs font-mono text-[#9E9E9E] hover:text-white transition-colors"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-white" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      {activeNote && (
                        <button
                          onClick={() => handleAppendToNote(msg.content)}
                          className="flex items-center space-x-1 text-xs font-mono text-[#9E9E9E] hover:text-white transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Append to Note</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isGenerating && (
              <div className="flex items-center space-x-3 p-4 rounded-2xl bg-[#111111] border border-[#222222] text-[#9E9E9E] font-mono text-xs animate-pulse">
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Aether AI is synthesizing contextual response...</span>
              </div>
            )}
          </div>

          {/* Footer Input */}
          <div className="p-4 border-t border-[#222222] bg-[#000000]">
            <form onSubmit={handleSendPrompt} className="relative flex items-center">
              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="Ask AI to write, outline, transform..."
                disabled={isGenerating}
                className="w-full bg-[#111111] border border-[#222222] text-white placeholder-[#9E9E9E] text-sm rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:border-white transition-colors"
              />
              <button
                type="submit"
                disabled={!inputPrompt.trim() || isGenerating}
                className="absolute right-2 p-2 bg-white text-black rounded-lg disabled:opacity-30 hover:bg-[#E5E5E5] transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex items-center justify-between mt-2 text-[11px] font-mono text-[#9E9E9E]">
              <span>Nothing OS Dot Matrix AI</span>
              <span>Press ↵ to send</span>
            </div>
          </div>
        </motion.div>

        {/* Backdrop */}
        <div
          className="absolute inset-0 -z-10"
          onClick={() => setIsAIDrawerOpen(false)}
        />
      </div>
    </AnimatePresence>
  );
}
