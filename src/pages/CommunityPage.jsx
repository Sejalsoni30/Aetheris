import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import SpatialModuleExplorer from '../components/SpatialModuleExplorer';
import { 
  MessageSquare, 
  Share2, 
  Globe, 
  ArrowUpRight, 
  Terminal, 
  Heart, 
  Users, 
  Sparkles, 
  ExternalLink,
  Send,
  Coins,
  CheckCircle2,
  Code,
  Zap,
  Gift
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function CommunityPage({ initialChannel = 'discord' }) {
  const [activeTab, setActiveTab] = useState(initialChannel);
  const [claimedBounty, setClaimedBounty] = useState(null);
  const [cliInput, setCliInput] = useState('');
  const [cliHistory, setCliHistory] = useState([
    'Aetheris Developer Protocol CLI [Version 4.2.0]',
    'Type "help" for available commands or "bounties" to inspect open grants.',
  ]);

  // Live Community Chat Box State
  const [chatMessages, setChatMessages] = useState([
    { user: 'Satoshi_Spatial', role: 'Shader Architect', text: 'Just pushed a 90Hz foveated blur shader to #spatial-shaders!' },
    { user: 'Elena_VisionOS', role: 'Core Contributor', text: 'The new RealityKit 2.0 anchor binding has zero jitter on Vision Pro.' },
    { user: 'Kaelen_WebXR', role: 'Guild Lead', text: 'Bounty #204 just opened for OpenXR hand mesh decompression.' }
  ]);
  const [newChatText, setNewChatText] = useState('');

  useEffect(() => {
    setActiveTab(initialChannel);
  }, [initialChannel]);

  const channelTitles = {
    discord: 'Developer Discord Guild',
    github: 'GitHub Repositories',
    network: 'Spatial X Network'
  };

  const handleCliSubmit = (e) => {
    e.preventDefault();
    if (!cliInput.trim()) return;

    sound.playClick();
    const cmd = cliInput.trim().toLowerCase();
    const newLogs = [...cliHistory, `> ${cliInput}`];

    if (cmd === 'help') {
      newLogs.push('Available commands: help, bounties, claim, linkedin, github, x, status, star, clear');
    } else if (cmd === 'linkedin') {
      newLogs.push('🌐 Sejal Soni on LinkedIn: https://www.linkedin.com/in/sejal-soni-361897303/');
      window.open('https://www.linkedin.com/in/sejal-soni-361897303/', '_blank');
      sound.playLaunchChord();
    } else if (cmd === 'github') {
      newLogs.push('🐙 Sejal Soni on GitHub: https://github.com/Sejalsoni30');
      window.open('https://github.com/Sejalsoni30', '_blank');
      sound.playLaunchChord();
    } else if (cmd === 'x' || cmd === 'twitter') {
      newLogs.push('🐦 Sejal Soni on X: https://x.com/Sejalsoni02');
      window.open('https://x.com/Sejalsoni02', '_blank');
      sound.playLaunchChord();
    } else if (cmd === 'bounties') {
      newLogs.push('OPEN BOUNTIES:');
      newLogs.push('  [#B-101] $5,000  - Metal MSL Raymarched Water Shader');
      newLogs.push('  [#B-102] $7,500  - VisionOS RealityKit Hand-Tracking Bridge');
      newLogs.push('  [#B-103] $10,000 - Zero-Knowledge Snark Gaze Verifier');
      newLogs.push('Type "claim b-101" to reserve allocation.');
    } else if (cmd.startsWith('claim')) {
      newLogs.push('✓ GRANT ALLOCATION RESERVED: Verification token dispatched to your session.');
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
      sound.playLaunchChord();
    } else if (cmd === 'status') {
      newLogs.push('All 4,892 spatial nodes operational. Guild latency: 0.42ms.');
    } else if (cmd === 'star') {
      newLogs.push('★ Thank you for starring github.com/Sejalsoni30/Aetheris!');
      confetti({ particleCount: 50, spread: 50 });
    } else if (cmd === 'clear') {
      setCliHistory([]);
      setCliInput('');
      return;
    } else {
      newLogs.push(`Unknown command: "${cliInput}". Type "help" for options.`);
    }

    setCliHistory(newLogs);
    setCliInput('');
  };

  const handleClaimGrant = (title, amount) => {
    sound.playLaunchChord();
    setClaimedBounty({ title, amount });
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => setClaimedBounty(null), 4000);
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!newChatText.trim()) return;
    sound.playClick();
    setChatMessages(prev => [
      ...prev,
      { user: 'You (Architect)', role: 'Community Member', text: newChatText.trim() }
    ]);
    setNewChatText('');
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-cyan-500/30">
      <PageHeader section="Connect" title={channelTitles[activeTab] || 'Developer Ecosystem'} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 relative">
        
        {/* Ambient Hero Glow Halos */}
        <div className="absolute top-8 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-[140px] pointer-events-none" />

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-purple-950/40 backdrop-blur-2xl p-8 sm:p-12 lg:p-16 shadow-2xl">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold">
              <Users className="w-3.5 h-3.5 text-purple-400" />
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
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.3)] font-bold'
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

        {/* Technical HUD Metrics Ticker */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { label: 'Active Architects', val: '1,420', badge: 'Online Now', icon: Users, color: 'text-purple-400' },
            { label: 'Open Research Grants', val: '$45,000', badge: 'Active Pool', icon: Gift, color: 'text-amber-400' },
            { label: 'Spatial SDK License', val: '100% Free', badge: 'Apache 2.0', icon: Code, color: 'text-cyan-400' },
            { label: 'Guild P2P Latency', val: '0.42 ms', badge: 'Decentralized', icon: Zap, color: 'text-emerald-400' },
          ].map((item, idx) => (
            <div key={idx} className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-white/15 shadow-xl hover:border-purple-500/40 transition-all">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-2">
                <span>{item.label}</span>
                <item.icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <div className="text-2xl sm:text-3xl font-black font-display text-white">{item.val}</div>
              <span className="inline-block mt-2 text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300 border border-white/15">
                {item.badge}
              </span>
            </div>
          ))}
        </div>

        {/* ================= CREATOR & LEAD ARCHITECT CONNECT CARD ================= */}
        <div className="rounded-3xl border border-white/15 bg-gradient-to-r from-slate-900/95 via-purple-950/30 to-slate-900/95 backdrop-blur-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>LEAD ARCHITECT & FOUNDER</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-display text-white">
              Connect with Sejal Soni
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm font-light max-w-xl leading-relaxed">
              Creator of Aetheris. Building sub-12ms spatial intent engines, 4D raycasting pipelines, and zero-knowledge telemetry. Reach out directly on:
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 relative z-10">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/sejal-soni-361897303/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="px-4 py-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 text-xs font-mono font-bold flex items-center space-x-2 transition-all hover:scale-105 shadow-lg"
              title="Connect on LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span>LinkedIn</span>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/Sejalsoni30"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-mono font-bold flex items-center space-x-2 transition-all hover:scale-105 shadow-lg"
              title="View GitHub Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </a>

            {/* X / Twitter */}
            <a
              href="https://x.com/Sejalsoni02"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold flex items-center space-x-2 transition-all hover:scale-105 shadow-lg"
              title="Follow on X"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>X (Twitter)</span>
            </a>
          </div>
        </div>

        {/* ================= INTERACTIVE SECTION: Interactive Developer Console ================= */}
        <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-slate-900/90 to-[#080d1a] backdrop-blur-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center space-x-2.5">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Aetheris Interactive Guild Terminal
              </span>
            </div>
            <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-400">
              <span>Try typing:</span>
              <span className="text-blue-300 bg-white/5 px-1.5 py-0.5 rounded cursor-pointer" onClick={() => setCliInput('linkedin')}>linkedin</span>
              <span className="text-slate-300 bg-white/5 px-1.5 py-0.5 rounded cursor-pointer" onClick={() => setCliInput('github')}>github</span>
              <span className="text-cyan-300 bg-white/5 px-1.5 py-0.5 rounded cursor-pointer" onClick={() => setCliInput('x')}>x</span>
              <span className="text-purple-300 bg-white/5 px-1.5 py-0.5 rounded cursor-pointer" onClick={() => setCliInput('bounties')}>bounties</span>
            </div>
          </div>

          <div className="h-44 sm:h-52 bg-black/80 rounded-2xl border border-white/10 p-4 font-mono text-xs overflow-y-auto space-y-1.5 text-slate-300">
            {cliHistory.map((line, i) => (
              <div key={i} className={line.startsWith('>') ? 'text-cyan-400 font-bold' : line.includes('★') || line.includes('✓') ? 'text-emerald-400 font-bold' : 'text-slate-300'}>
                {line}
              </div>
            ))}
          </div>

          <form onSubmit={handleCliSubmit} className="flex items-center space-x-2">
            <span className="text-cyan-400 font-mono text-xs pl-1">❯</span>
            <input
              type="text"
              value={cliInput}
              onChange={(e) => setCliInput(e.target.value)}
              placeholder="Enter command (e.g. bounties, help, star)..."
              className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold cursor-pointer transition-all"
            >
              Execute
            </button>
          </form>
        </div>

        {/* ================= INTERACTIVE SECTION: Open Developer Grants & Bounties ================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Gift className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl font-bold font-display text-white">
                Active Spatial Research Grants & Bounties
              </h2>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold">$45,000 Available Pool</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: 'b-101', title: 'Metal MSL Raymarched Water Shader', reward: '$5,000', tags: ['VisionOS', 'Metal'], desc: 'Develop real-time volumetric caustics on Apple Vision Pro' },
              { id: 'b-102', title: 'OpenXR Hand Mesh Compression', reward: '$7,500', tags: ['HorizonOS', 'C++'], desc: 'Reduce 26-joint skeletal packet sizes by 40% with zero loss' },
              { id: 'b-103', title: 'ZK-SNARK Gaze Cryptography Verifier', reward: '$10,000', tags: ['Privacy', 'Rust'], desc: 'Build client-side zero-knowledge proofs for biometric blinding' },
            ].map(bounty => (
              <div key={bounty.id} className="p-6 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-amber-400/50 transition-all space-y-4 shadow-xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                      {bounty.reward} REWARD
                    </span>
                    <div className="flex space-x-1">
                      {bounty.tags.map((t, idx) => (
                        <span key={idx} className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-slate-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-base font-bold font-display text-white">{bounty.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">{bounty.desc}</p>
                </div>

                <button
                  onClick={() => handleClaimGrant(bounty.title, bounty.reward)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-400/40 text-amber-300 font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Claim Dev Grant</span>
                </button>
              </div>
            ))}
          </div>

          {claimedBounty && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-xs font-mono space-y-1 animate-in fade-in duration-200">
              <div className="text-amber-300 font-bold flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>ALLOCATION CLAIMED: {claimedBounty.title} ({claimedBounty.amount})</span>
              </div>
              <div className="text-slate-300 text-[11px]">
                Your wallet token allocation has been registered. Check your GitHub / Discord DM for repo access.
              </div>
            </div>
          )}
        </div>

        {/* ================= INTERACTIVE SECTION: Simulated Live Guild Chat ================= */}
        <div className="rounded-3xl border border-white/15 bg-slate-900/90 p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-bold font-display text-white">
                Live Developer Guild Dispatch
              </span>
            </div>
            <span className="text-xs font-mono text-emerald-400 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>1,420 Online Now</span>
            </span>
          </div>

          <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
            {chatMessages.map((msg, i) => (
              <div key={i} className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                <div className="flex items-center space-x-2 text-xs">
                  <span className="font-bold text-cyan-300 font-mono">{msg.user}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-500/15 text-purple-300">
                    {msg.role}
                  </span>
                </div>
                <div className="text-xs text-slate-200 pl-1">{msg.text}</div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendChat} className="flex items-center space-x-2">
            <input
              type="text"
              value={newChatText}
              onChange={(e) => setNewChatText(e.target.value)}
              placeholder="Send message to global volumetric engineers..."
              className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400/50 font-sans"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/40 text-purple-300 text-xs font-mono font-bold cursor-pointer transition-all flex items-center space-x-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>

        {/* Cross-Protocol Matrix Navigation Deck */}
        <SpatialModuleExplorer currentPath={`/community/${activeTab}`} />

      </main>

      <Footer />
    </div>
  );
}
