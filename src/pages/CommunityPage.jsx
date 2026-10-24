import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
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
      newLogs.push('Available commands: help, bounties, claim, status, star, clear');
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
              <span className="text-cyan-300 bg-white/5 px-1.5 py-0.5 rounded">help</span>
              <span className="text-purple-300 bg-white/5 px-1.5 py-0.5 rounded">bounties</span>
              <span className="text-emerald-300 bg-white/5 px-1.5 py-0.5 rounded">star</span>
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

      </main>

      <Footer />
    </div>
  );
}
