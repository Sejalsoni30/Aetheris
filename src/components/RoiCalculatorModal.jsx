import React, { useState } from 'react';
import { 
  X, 
  TrendingUp, 
  DollarSign, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  PieChart 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/sound';

export default function RoiCalculatorModal() {
  const { theme, isRoiModalOpen, setIsRoiModalOpen } = useTheme();

  const [monthlySpend, setMonthlySpend] = useState(25000);
  const [spatialTraffic, setSpatialTraffic] = useState(250000);
  const [aov, setAov] = useState(180);

  if (!isRoiModalOpen) return null;

  // Real-time calculation logic
  const standardConvRate = 0.012; // 1.2%
  const aetherisConvRate = 0.048; // 4.8% (4x lift)

  const standardConversions = Math.round(spatialTraffic * standardConvRate);
  const standardRevenue = Math.round(standardConversions * aov);

  const aetherisConversions = Math.round(spatialTraffic * aetherisConvRate);
  const aetherisRevenue = Math.round(aetherisConversions * aov);

  const incrementalRevenue = aetherisRevenue - standardRevenue;
  const roiMultiplier = ((aetherisRevenue - monthlySpend) / monthlySpend).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-2xl animate-fade-in">
      <div 
        className="relative w-full max-w-4xl rounded-3xl glass-panel-elevated border border-white/20 p-5 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto"
        style={{ boxShadow: `0 0 80px ${theme.glow}` }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div 
              className="p-3 rounded-2xl bg-white/5 border border-white/10"
              style={{ color: theme.primary }}
            >
              <TrendingUp className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                  Spatial Growth & ROI Predictor
                </h3>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${theme.badge}`}>
                  FINANCIAL MODEL
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">
                Simulate spatial conversion velocity against conventional 2D media
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              setIsRoiModalOpen(false);
            }}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Slider 1: Monthly Budget */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">MONTHLY SPEND:</span>
              <span className="text-cyan-300 font-bold">${monthlySpend.toLocaleString()}</span>
            </div>
            <input 
              type="range"
              min="5000"
              max="150000"
              step="5000"
              value={monthlySpend}
              onChange={(e) => {
                sound.playHover();
                setMonthlySpend(Number(e.target.value));
              }}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Slider 2: Spatial Traffic */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">XR SESSIONS:</span>
              <span className="text-purple-300 font-bold">{spatialTraffic.toLocaleString()}</span>
            </div>
            <input 
              type="range"
              min="20000"
              max="1000000"
              step="10000"
              value={spatialTraffic}
              onChange={(e) => {
                sound.playHover();
                setSpatialTraffic(Number(e.target.value));
              }}
              className="w-full accent-purple-400 cursor-pointer"
            />
          </div>

          {/* Slider 3: Average Order Value */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">AVG ORDER VALUE:</span>
              <span className="text-emerald-300 font-bold">${aov}</span>
            </div>
            <input 
              type="range"
              min="30"
              max="600"
              step="10"
              value={aov}
              onChange={(e) => {
                sound.playHover();
                setAov(Number(e.target.value));
              }}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>

        </div>

        {/* Dynamic Comparison Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Legacy 2D Model */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-white/5 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500">
              <span>CONVENTIONAL 2D DISPLAY</span>
              <span>1.2% CONVERSION</span>
            </div>

            <div className="text-3xl font-display font-bold text-slate-400">
              ${standardRevenue.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500">
              Generated from {standardConversions.toLocaleString()} standard checkouts
            </div>

            <div className="pt-2 border-t border-white/5 text-[11px] font-mono text-slate-500 flex items-center justify-between">
              <span>Attribution Delay:</span>
              <span>24 - 48 hours</span>
            </div>
          </div>

          {/* Aetheris Spatial Engine Model */}
          <div 
            className="p-5 rounded-2xl glass-panel-elevated border space-y-3 relative overflow-hidden"
            style={{ borderColor: `${theme.primary}50` }}
          >
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold uppercase" style={{ color: theme.primary }}>
                AETHERIS SPATIAL INTENT
              </span>
              <span className="text-emerald-400 font-bold">4.8% CONVERSION</span>
            </div>

            <div className="text-3xl font-display font-black text-white">
              ${aetherisRevenue.toLocaleString()}
            </div>
            <div className="text-xs text-slate-300 font-light">
              Generated from {aetherisConversions.toLocaleString()} autonomous conversions
            </div>

            <div className="pt-2 border-t border-white/10 text-[11px] font-mono text-emerald-400 flex items-center justify-between">
              <span>Incremental Lift:</span>
              <span className="font-bold">+${incrementalRevenue.toLocaleString()} (+300%)</span>
            </div>
          </div>

        </div>

        {/* Summary Highlights */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/10 text-center">
            <div className="text-[10px] font-mono text-slate-400">NET ROI MULTIPLIER</div>
            <div className="text-2xl font-bold font-display text-emerald-400 mt-1">{roiMultiplier}x</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/10 text-center">
            <div className="text-[10px] font-mono text-slate-400">EST. PAYBACK PERIOD</div>
            <div className="text-2xl font-bold font-display text-cyan-300 mt-1">11 Days</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/10 text-center">
            <div className="text-[10px] font-mono text-slate-400">INTENT ACCURACY</div>
            <div className="text-2xl font-bold font-display text-purple-300 mt-1">99.4%</div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={() => {
              sound.playClick();
              setIsRoiModalOpen(false);
            }}
            className="w-full py-3.5 rounded-2xl font-bold text-sm text-slate-950 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-2xl flex items-center justify-center space-x-2 cursor-pointer"
            style={{
              background: `linear-gradient(135deg, #ffffff 0%, ${theme.primary} 70%, ${theme.secondary} 100%)`
            }}
          >
            <CheckCircle2 className="w-4 h-4 text-slate-950" />
            <span>Apply Forecast Model to Active Spatial Mesh</span>
          </button>
        </div>

      </div>
    </div>
  );
}
