import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  User,
  Sliders,
  Download,
  Upload,
  Keyboard,
  Info,
  Check,
  Shield,
  HardDrive
} from "lucide-react";
import { useNotes } from "../context/NotesContext";

export default function Settings() {
  const { settings, setSettings, notes, KEYBOARD_SHORTCUTS } = useNotes();
  const [exportedMsg, setExportedMsg] = useState(false);

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(notes, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `aether_notes_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setExportedMsg(true);
    setTimeout(() => setExportedMsg(false), 3000);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <div className="border-b border-[#222222] pb-6 space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#111111] border border-[#222222] text-xs font-mono text-white">
          <SettingsIcon className="w-3.5 h-3.5 text-white" />
          <span>SYSTEM PREFERENCES & ENGINE CONFIG</span>
        </div>
        <h1 className="text-3xl font-display font-bold text-white tracking-tight">
          Settings & Diagnostics
        </h1>
        <p className="text-xs text-[#9E9E9E]">
          Configure Nothing OS dot matrix aesthetics, font scales, local backup exports, and system parameters.
        </p>
      </div>

      {/* User Profile Card */}
      <div className="p-6 rounded-3xl bg-[#111111] border border-[#222222] flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-[#000000] border border-[#222222] flex items-center justify-center font-display font-bold text-xl text-white">
            AE
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-white">Aether Operator</h3>
            <p className="text-xs font-mono text-[#9E9E9E]">operator@aether.os • Pro Tier</p>
          </div>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-[#000000] border border-[#222222] text-xs font-mono text-white flex items-center space-x-2">
          <Shield className="w-3.5 h-3.5" />
          <span>Encrypted Local Vault</span>
        </div>
      </div>

      {/* Appearance Section */}
      <div className="p-6 rounded-3xl bg-[#111111] border border-[#222222] space-y-6">
        <div className="flex items-center space-x-3 pb-4 border-b border-[#222222]">
          <Sliders className="w-5 h-5 text-white" />
          <h2 className="font-display font-semibold text-lg text-white">Appearance & Matrix Density</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-sm text-white">Nothing OS Dot Matrix Overlay</h4>
              <p className="text-xs text-[#9E9E9E]">Adjust background radial dot intensity across workspace views.</p>
            </div>

            <div className="flex items-center space-x-2 bg-[#000000] p-1 rounded-xl border border-[#222222]">
              {["off", "normal", "dense"].map((density) => (
                <button
                  key={density}
                  onClick={() => setSettings((prev) => ({ ...(prev || {}), dotMatrixDensity: density }))}
                  className={`px-3 py-1 rounded-lg text-xs font-mono capitalize transition-all ${
                    (settings?.dotMatrixDensity || "normal") === density
                      ? "bg-white text-black font-bold"
                      : "text-[#9E9E9E] hover:text-white"
                  }`}
                >
                  {density}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#222222]">
            <div>
              <h4 className="font-medium text-sm text-white">Autosave Frequency</h4>
              <p className="text-xs text-[#9E9E9E]">Interval for background editor state persistence.</p>
            </div>

            <span className="text-xs font-mono text-white bg-[#000000] px-3 py-1.5 rounded-xl border border-[#222222]">
              Real-time (Immediate)
            </span>
          </div>
        </div>
      </div>

      {/* Import & Export Data Section */}
      <div className="p-6 rounded-3xl bg-[#111111] border border-[#222222] space-y-6">
        <div className="flex items-center space-x-3 pb-4 border-b border-[#222222]">
          <Download className="w-5 h-5 text-white" />
          <h2 className="font-display font-semibold text-lg text-white">Import & Export Vault</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-[#000000] border border-[#222222] space-y-3">
            <Download className="w-6 h-6 text-white" />
            <h4 className="font-medium text-sm text-white">Export Full Vault (JSON)</h4>
            <p className="text-xs text-[#9E9E9E]">
              Download complete backup containing all {notes?.length || 0} notes, tags, folders, and flashcards.
            </p>
            <button
              onClick={handleExportJSON}
              className="w-full py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-[#E5E5E5] transition-all flex items-center justify-center space-x-2"
            >
              {exportedMsg ? (
                <>
                  <Check className="w-4 h-4 text-black" />
                  <span>Vault Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Backup File</span>
                </>
              )}
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-[#000000] border border-[#222222] space-y-3">
            <Upload className="w-6 h-6 text-white" />
            <h4 className="font-medium text-sm text-white">Import Markdown / JSON</h4>
            <p className="text-xs text-[#9E9E9E]">
              Upload previous notes archive into current Aether local vault.
            </p>
            <button
              onClick={() => alert("Ready to import. Select your Markdown or JSON archive.")}
              className="w-full py-2.5 rounded-xl bg-[#111111] border border-[#222222] text-white font-medium text-xs hover:border-white transition-all flex items-center justify-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Select File to Import</span>
            </button>
          </div>
        </div>
      </div>

      {/* About & Specs */}
      <div className="p-6 rounded-3xl bg-[#111111] border border-[#222222] space-y-4 text-xs font-mono text-[#9E9E9E]">
        <div className="flex items-center space-x-2 text-white">
          <Info className="w-4 h-4" />
          <span className="font-semibold text-sm">Aether System Information</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          <div>
            <span className="block text-[10px] text-[#9E9E9E]">VERSION</span>
            <span className="text-white">Aether OS v2.5.0</span>
          </div>
          <div>
            <span className="block text-[10px] text-[#9E9E9E]">FRAMEWORK</span>
            <span className="text-white">React 19 + Vite</span>
          </div>
          <div>
            <span className="block text-[10px] text-[#9E9E9E]">COLOR MODEL</span>
            <span className="text-white">Monochrome Pure Black</span>
          </div>
          <div>
            <span className="block text-[10px] text-[#9E9E9E]">STATUS</span>
            <span className="text-white">Production Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}
