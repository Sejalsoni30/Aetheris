import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import { Box, ShieldCheck, Terminal, Copy, Check, Sparkles, Layers, Cpu } from 'lucide-react';
import { sound } from '../utils/sound';

export default function HorizonOsPage() {
  const [copied, setCopied] = useState(false);

  const unityCode = `using UnityEngine;
using Aetheris.HorizonOS;

public class HorizonSpatialManager : MonoBehaviour
{
    [SerializeField] private AetherisHorizonConfig config;

    private async void Start()
    {
        // Initialize OpenXR Passthrough Intent Pipeline
        var session = await AetherisEngine.InitializeOpenXRSessionAsync(new SessionOptions
        {
            EnableColorPassthrough = true,
            TrackOpticalHands = true,
            SpatialAnchorPersistence = true
        });

        // Spawn dynamic volumetric spatial ad anchor
        session.OnSpatialIntentTriggered += (intent) =>
        {
            Debug.Log($"[Aetheris Horizon] Conversion Forecast: {intent.Probability:P1}");
        };
    }
}`;

  const copyCode = () => {
    sound.playClick();
    navigator.clipboard.writeText(unityCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-cyan-500/30">
      <PageHeader section="Platforms" title="Meta Horizon OS" />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-blue-950/40 backdrop-blur-2xl p-8 sm:p-12 lg:p-16 shadow-2xl">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 text-xs font-mono font-bold">
              <Box className="w-3.5 h-3.5 text-blue-400" />
              <span>HORIZON OS RUNTIME & OPENXR</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white leading-tight">
              Aetheris for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
                Meta Horizon OS & Quest
              </span>
            </h1>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
              Designed for Meta Quest 3, Quest Pro, and next-generation Horizon OS hardware. Integrate high-fidelity color passthrough, optical hand tracking, and spatial monetization into your Unity and Unreal Engine titles.
            </p>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-blue-500/50 transition-all space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-300">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">Full Color Passthrough</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Occlude and blend virtual touchpoints seamlessly into real-world physical surroundings using Meta's high-definition room mesh APIs.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-cyan-500/50 transition-all space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">Hand Gesture Analytics</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Analyze micro-gestures, pinch gestures, and palm hover dwell to calculate user interaction intent without requiring physical controllers.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-indigo-500/50 transition-all space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
              <Box className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">Unity & Unreal Plugins</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Turnkey C# Unity packages and Unreal Engine C++ blueprints. Get up and running in minutes with plug-and-play spatial monetization prefabs.
            </p>
          </div>
        </div>

        {/* Unity Code Block */}
        <div className="rounded-3xl border border-white/15 bg-[#080d1a] shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-mono text-white font-semibold">
                HorizonSpatialManager.cs
              </span>
            </div>
            <button
              onClick={copyCode}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-white transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy C#'}</span>
            </button>
          </div>
          <div className="p-6 font-mono text-xs sm:text-sm text-blue-300/90 overflow-x-auto leading-relaxed">
            <pre className="text-slate-200">{unityCode}</pre>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
