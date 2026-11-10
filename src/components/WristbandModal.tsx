import React from 'react';
import { BiometricTelemetry } from '../types/index.ts';
import { Watch, Heart, Activity, Wind, Thermometer, BatteryCharging, X, CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  telemetry: BiometricTelemetry;
  onToggleBand: () => void;
}

export const WristbandModal: React.FC<Props> = ({ isOpen, onClose, telemetry, onToggleBand }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-[#121a24] to-[#0a0e14] border border-[#1e2c3d] rounded-2xl p-6 shadow-2xl text-[#e9eef5]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1d2835]">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${telemetry.isBandWorn ? 'bg-[#4df0d0]/20 text-[#4df0d0]' : 'bg-red-500/20 text-red-400'}`}>
              <Watch className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-['Big_Shoulders_Display'] text-2xl font-bold tracking-wide uppercase">
                GymOS Pro Band Sync
              </h3>
              <p className="text-xs font-mono text-[#8593a5]">
                {telemetry.isBandWorn ? 'BLE 5.3 Active Optical Photoplethysmography (PPG)' : 'Sensor Disconnected'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-[#8593a5] hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* State Banner */}
        <div className="mt-5 p-4 rounded-xl border border-[#1e2c3d] bg-[#070b10] flex items-center justify-between">
          <div className="flex items-center gap-3">
            {telemetry.isBandWorn ? (
              <CheckCircle2 className="w-5 h-5 text-[#4df0d0]" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-400" />
            )}
            <div>
              <div className="text-sm font-semibold">
                {telemetry.isBandWorn ? 'Band is Worn on Left Wrist' : 'Band is Off Wrist / Charging Dock'}
              </div>
              <div className="text-xs text-[#8593a5] font-mono">
                {telemetry.isBandWorn
                  ? 'Real-time telemetry broadcasting at 50Hz sample rate'
                  : 'Wear band snugly above wrist bone to stream live heart rate & recovery telemetry'}
              </div>
            </div>
          </div>
          <button
            onClick={onToggleBand}
            className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition-all ${
              telemetry.isBandWorn
                ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30'
                : 'bg-[#4df0d0] hover:bg-[#4df0d0]/90 text-[#04120f]'
            }`}
          >
            {telemetry.isBandWorn ? 'Take Off Band' : 'Wear Smart Band'}
          </button>
        </div>

        {/* Telemetry Grid */}
        {telemetry.isBandWorn ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            <div className="p-3 rounded-xl bg-[#0d131a] border border-[#1a2533]">
              <div className="flex items-center justify-between text-xs text-[#8593a5] font-mono uppercase">
                <span>Heart Rate</span>
                <Heart className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
              </div>
              <div className="mt-1 text-2xl font-['Big_Shoulders_Display'] font-black text-rose-400">
                {telemetry.heartRate} <span className="text-xs font-mono font-normal text-[#8593a5]">BPM</span>
              </div>
              <div className="text-[10px] font-mono text-[#4df0d0] mt-0.5 truncate">{telemetry.hrZone}</div>
            </div>

            <div className="p-3 rounded-xl bg-[#0d131a] border border-[#1a2533]">
              <div className="flex items-center justify-between text-xs text-[#8593a5] font-mono uppercase">
                <span>HRV (rMSSD)</span>
                <Activity className="w-3.5 h-3.5 text-[#4df0d0]" />
              </div>
              <div className="mt-1 text-2xl font-['Big_Shoulders_Display'] font-black text-[#4df0d0]">
                {telemetry.hrv} <span className="text-xs font-mono font-normal text-[#8593a5]">ms</span>
              </div>
              <div className="text-[10px] font-mono text-[#8593a5] mt-0.5">High Parasympathetic</div>
            </div>

            <div className="p-3 rounded-xl bg-[#0d131a] border border-[#1a2533]">
              <div className="flex items-center justify-between text-xs text-[#8593a5] font-mono uppercase">
                <span>SpO2 Blood O2</span>
                <Wind className="w-3.5 h-3.5 text-sky-400" />
              </div>
              <div className="mt-1 text-2xl font-['Big_Shoulders_Display'] font-black text-sky-400">
                {telemetry.spo2}<span className="text-xs font-mono font-normal text-[#8593a5]">%</span>
              </div>
              <div className="text-[10px] font-mono text-[#8593a5] mt-0.5">Optimal Oxygenation</div>
            </div>

            <div className="p-3 rounded-xl bg-[#0d131a] border border-[#1a2533]">
              <div className="flex items-center justify-between text-xs text-[#8593a5] font-mono uppercase">
                <span>Skin Temp</span>
                <Thermometer className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="mt-1 text-2xl font-['Big_Shoulders_Display'] font-black text-amber-400">
                {telemetry.skinTemp}<span className="text-xs font-mono font-normal text-[#8593a5]">°C</span>
              </div>
              <div className="text-[10px] font-mono text-[#8593a5] mt-0.5">Normothermic Baseline</div>
            </div>
          </div>
        ) : (
          <div className="mt-4 p-6 rounded-xl border border-dashed border-[#233244] text-center bg-[#070b10]">
            <Watch className="w-10 h-10 text-[#475b73] mx-auto mb-2 opacity-50" />
            <div className="text-sm font-semibold text-[#8593a5]">No Live Biometrics Available</div>
            <div className="text-xs text-[#52647a] max-w-sm mx-auto mt-1">
              Click &quot;Wear Smart Band&quot; above to simulate pairing your wearable. When worn, real-time BPM, HRV strain, and aerobic zones will animate.
            </div>
          </div>
        )}

        {/* Live PPG waveform when worn */}
        {telemetry.isBandWorn && (
          <div className="mt-4 p-4 rounded-xl bg-[#070b10] border border-[#1a2533]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#8593a5]">Real-Time PPG Optical Waveform</span>
              <span className="flex items-center gap-1.5 text-[11px] font-mono text-[#4df0d0]">
                <span className="w-2 h-2 rounded-full bg-[#4df0d0] animate-ping" />
                Live 50Hz Feed
              </span>
            </div>
            <div className="h-14 w-full flex items-end gap-1 overflow-hidden pt-2">
              {telemetry.hrHistory.map((val, idx) => {
                const heightPct = Math.min(100, Math.max(15, ((val - 60) / 100) * 100));
                return (
                  <div
                    key={idx}
                    className="flex-1 rounded-t transition-all duration-300"
                    style={{
                      height: `${heightPct}%`,
                      backgroundColor: val > 140 ? '#ff5d6c' : val > 120 ? '#ff7a45' : '#4df0d0',
                      opacity: 0.3 + (idx / telemetry.hrHistory.length) * 0.7,
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-5 flex items-center justify-between text-xs font-mono text-[#8593a5] pt-3 border-t border-[#1d2835]">
          <div className="flex items-center gap-2">
            <BatteryCharging className="w-4 h-4 text-[#4df0d0]" />
            <span>Band Battery: {telemetry.batteryPercent}% (Fast Wireless Coil)</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
