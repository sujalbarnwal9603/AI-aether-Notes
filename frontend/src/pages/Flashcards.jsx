import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Brain,
  Sparkles,
  RotateCcw,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Plus,
  BookOpen,
  Award,
  Layers
} from "lucide-react";
import { useNotes } from "../context/NotesContext";

export default function Flashcards() {
  const { flashcards, openAIDrawerWithMacro } = useNotes();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);

  const activeCard = flashcards[currentIndex] || flashcards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const handleRating = (difficulty) => {
    setReviewedCount((prev) => prev + 1);
    handleNext();
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#111111] border border-[#222222] text-xs font-mono text-white mb-2">
            <Brain className="w-3.5 h-3.5 text-white" />
            <span>AI FLASHCARD RECALL SYSTEM</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">
            Flashcards Study Hub
          </h1>
          <p className="text-xs text-[#9E9E9E] font-mono mt-1">
            Active Deck: <span className="text-white font-medium">{activeCard?.deckName}</span>
          </p>
        </div>

        <button
          onClick={() => openAIDrawerWithMacro("flashcards")}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white text-black font-medium text-xs hover:bg-[#E5E5E5] transition-all shadow-lg active:scale-95"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate New Deck with AI</span>
        </button>
      </div>

      {/* Progress Metrics Bar */}
      <div className="p-6 rounded-2xl bg-[#111111] border border-[#222222] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-[#000000] border border-[#222222] flex items-center justify-center text-white">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-mono text-[#9E9E9E]">SESSION PROGRESS</p>
            <p className="text-lg font-display font-bold text-white">
              Card {currentIndex + 1} <span className="text-xs text-[#9E9E9E]">/ {flashcards.length}</span>
            </p>
          </div>
        </div>

        <div className="w-full sm:w-64 bg-[#000000] h-2 rounded-full border border-[#222222] overflow-hidden">
          <div
            className="bg-white h-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
          />
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-[#9E9E9E]">
          <Award className="w-4 h-4 text-white" />
          <span>Reviewed: {reviewedCount} cards</span>
        </div>
      </div>

      {/* 3D Flip Flashcard Display Area */}
      {flashcards.length > 0 ? (
        <div className="space-y-6">
          <div className="perspective-1000 min-h-[320px]">
            <motion.div
              onClick={() => setIsFlipped(!isFlipped)}
              className="w-full min-h-[320px] rounded-3xl bg-[#111111] border border-[#222222] hover:border-white transition-all cursor-pointer p-8 flex flex-col justify-between relative bg-dot-grid shadow-2xl"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {!isFlipped ? (
                /* Question Side */
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#9E9E9E] px-2.5 py-1 rounded-full bg-[#000000] border border-[#222222]">
                      QUESTION
                    </span>
                    <span className="text-xs font-mono text-white font-medium">
                      Difficulty: {activeCard.difficulty}
                    </span>
                  </div>

                  <h2 className="text-2xl font-display font-semibold text-white leading-snug">
                    {activeCard.question}
                  </h2>

                  <p className="text-xs font-mono text-[#9E9E9E] text-center pt-8">
                    [ Click card to reveal answer ]
                  </p>
                </div>
              ) : (
                /* Answer Side */
                <div className="space-y-6 transform rotate-y-180">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-white font-bold px-2.5 py-1 rounded-full bg-white text-black">
                      ANSWER
                    </span>
                    <span className="text-xs font-mono text-[#9E9E9E]">
                      Mastery: {activeCard.mastery}%
                    </span>
                  </div>

                  <p className="text-lg text-white leading-relaxed font-sans">
                    {activeCard.answer}
                  </p>

                  <p className="text-xs font-mono text-[#9E9E9E] text-center pt-8">
                    [ Rate your recall difficulty below ]
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Controls & Difficulty Rating Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrev}
                className="p-3 rounded-2xl bg-[#111111] border border-[#222222] text-white hover:bg-white hover:text-black transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-2xl bg-[#111111] border border-[#222222] text-white hover:bg-white hover:text-black transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleRating("Hard")}
                className="px-4 py-2.5 rounded-xl bg-[#111111] border border-[#222222] text-white hover:border-white text-xs font-mono transition-all"
              >
                Hard (Review Soon)
              </button>

              <button
                onClick={() => handleRating("Good")}
                className="px-4 py-2.5 rounded-xl bg-[#111111] border border-[#222222] text-white hover:border-white text-xs font-mono transition-all"
              >
                Good (Standard)
              </button>

              <button
                onClick={() => handleRating("Easy")}
                className="px-4 py-2.5 rounded-xl bg-white text-black font-semibold text-xs transition-all hover:bg-[#E5E5E5]"
              >
                Easy (Mastered)
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-16 text-center text-[#9E9E9E]">
          No flashcards available in deck.
        </div>
      )}
    </div>
  );
}
