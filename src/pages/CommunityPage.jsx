import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import { MessageSquare, Share2, Globe, ArrowUpRight, Terminal, Heart, Users, Sparkles, ExternalLink } from 'lucide-react';
import { sound } from '../utils/sound';

export default function CommunityPage({ initialChannel = 'discord' }) {
  const [activeTab, setActiveTab] = useState(initialChannel);

  useEffect(() => {
    setActiveTab(initialChannel);
  }, [initialChannel]);

  const channelTitles = {
    discord: 'Discord Guild',
    github: 'GitHub Repositories',
    network: 'Spatial X Network'
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-cyan-500/30">
      <PageHeader section="Connect" title={channelTitles[activeTab] || 'Developer Ecosystem'} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-cyan-950/40 backdrop-blur-2xl p-8 sm:p-12 lg:p-16 shadow-2xl">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>GLOBAL DEVELOPER & RESEARCH GUILD</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white leading-tight">
              Aetheris Developer <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">
                Community & Protocol Hub
              </span>
            </h1>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
              Join thousands of volumetric engineers, Three.js shadersmiths, and VisionOS architects building the future of 4D spatial intent computing.
            </p>

            {/* Channel Tabs */}
            <div className="flex flex-wrap gap-3 pt-2">
              {[
                { id: 'discord', label: 'Discord Guild', icon: MessageSquare },
                { id: 'github', label: 'GitHub Repositories', icon: Terminal },
                { id: 'network', label: 'Spatial X Network', icon: Share2 }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { sound.playClick(); setActiveTab(tab.id); }}
                  className={`px-5 py-2.5 rounded-xl text-xs font-mono flex items-center space-x-2 transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.3)] font-bold'
                      : 'bg-slate-900/90 text-slate-300 border border-white/15 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content: Discord */}
        {activeTab === 'discord' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/15 space-y-4 shadow-xl">
              <div className="text-xs font-mono text-cyan-400 font-bold">#SPATIAL-SHADERS</div>
              <h3 className="text-xl font-bold font-display text-white">GLSL & Metal Lab</h3>
              <p className="text-slate-300 text-sm leading-relaxed font-normal">
                Collaborate on procedurally generated 3D meshes, instanced buffers, and ray-marched holographic shaders with leading graphics programmers.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/15 space-y-4 shadow-xl">
              <div className="text-xs font-mono text-purple-400 font-bold">#INTENT-TELEMETRY</div>
              <h3 className="text-xl font-bold font-display text-white">Neural Core Research</h3>
              <p className="text-slate-300 text-sm leading-relaxed font-normal">
                Discuss micro-saccade intent forecasting models, zero-knowledge spatial hashing, and privacy-preserving machine learning.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/15 space-y-4 shadow-xl">
              <div className="text-xs font-mono text-emerald-400 font-bold">#DEV-GRANTS</div>
              <h3 className="text-xl font-bold font-display text-white">$2.5M Developer Fund</h3>
              <p className="text-slate-300 text-sm leading-relaxed font-normal">
                Apply for non-dilutive spatial engineering grants, hardware access stipends, and early Vision Pro seed testing cohorts.
              </p>
            </div>
          </div>
        )}

        {/* Tab Content: GitHub */}
        {activeTab === 'github' && (
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-white/15 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold font-display text-white">Open Source SDKs & Specifications</h3>
              <a
                href="https://github.com/Sejalsoni30/Aetheris"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 text-xs font-mono text-cyan-300 hover:text-white font-bold"
              >
                <span>View on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { repo: '@aetheris/core', desc: '4D volumetric tensor inference engine in C++ and WebAssembly.', stars: '4.8k' },
                { repo: '@aetheris/three-runtime', desc: 'Plug-and-play Three.js shader and procedural mesh components.', stars: '3.2k' },
                { repo: '@aetheris/visionos-sdk', desc: 'Native Swift and RealityKit bindings for Apple Vision Pro.', stars: '2.9k' },
                { repo: '@aetheris/webxr-adapter', desc: 'Universal W3C WebXR immersive ad anchor manager.', stars: '1.7k' }
              ].map((r, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="font-mono text-sm font-bold text-white">{r.repo}</div>
                    <div className="text-xs text-slate-300 font-normal mt-1">{r.desc}</div>
                  </div>
                  <div className="text-xs font-mono px-2 py-1 rounded bg-white/10 text-cyan-300 border border-white/15 font-bold">
                    ★ {r.stars}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content: Network */}
        {activeTab === 'network' && (
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-white/15 space-y-6 shadow-2xl">
            <h3 className="text-xl font-bold font-display text-white">Spatial Growth Network Updates</h3>
            <p className="text-slate-200 text-sm leading-relaxed font-normal">
              Follow real-time announcements, benchmark breakdowns, and keynote presentations on X / Twitter.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white/[0.05] border border-white/10 space-y-2">
                <div className="text-xs font-mono text-cyan-400 font-bold">@AetherisLabs • 2h ago</div>
                <div className="text-sm text-slate-200">
                  "Announcing v4.2 of our Volumetric Tensor Engine: 120Hz ray-casting with zero-knowledge gaze anonymization is now live in production."
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.05] border border-white/10 space-y-2">
                <div className="text-xs font-mono text-cyan-400 font-bold">@AetherisLabs • 1d ago</div>
                <div className="text-sm text-slate-200">
                  "Benchmark report: Aetheris achieves 9.4x conversion lift across 180,000 VisionOS and Quest 3 interactive sessions."
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
