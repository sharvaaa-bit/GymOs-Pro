import React, { useState } from 'react';
import { SLEEP_HISTORY_DATA, SleepNightRecord } from '../data/sleepData.ts';
import { Moon, Bed, BatteryCharging, Zap, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export const SleepTracker: React.FC = () => {
  const [selectedRecordIndex, setSelectedRecordIndex] = useState<number>(0);
  const currentRecord: SleepNightRecord = SLEEP_HISTORY_DATA[selectedRecordIndex];

  const hours = Math.floor(currentRecord.totalDurationMinutes / 60);
  const minutes = currentRecord.totalDurationMinutes % 60;

  const deepHrs = Math.floor(currentRecord.deepSleepMinutes / 60);
  const deepMins = currentRecord.deepSleepMinutes % 60;

  const remHrs = Math.floor(currentRecord.remSleepMinutes / 60);
  const remMins = currentRecord.remSleepMinutes % 60;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1d2835] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-indigo-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
            Module 06 · Circadian Sleep Architecture & CNS Readiness
          </div>
          <h2 className="text-4xl sm:text-5xl font-['Big_Shoulders_Display'] font-black uppercase tracking-tight text-white">
            Sleep & Cellular Recovery Engine
          </h2>
          <p className="text-[#8593a5] text-sm max-w-2xl mt-1">
            Tracks total sleep duration, slow-wave deep sleep (growth hormone synthesis), REM sleep (neuromuscular motor patterning), and resting heart rate to dictate daily lifting capacity.
          </p>
        </div>

        {/* Date Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0d1218] border border-[#1d2835]">
          {SLEEP_HISTORY_DATA.map((rec, idx) => (
            <button
              key={rec.date}
              onClick={() => setSelectedRecordIndex(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                selectedRecordIndex === idx
                  ? 'bg-indigo-500 text-white font-bold shadow-md'
                  : 'text-[#8593a5] hover:text-white'
              }`}
            >
              {rec.date.split(',')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0d1218] border border-[#1d2835] shadow-xl">
          <div className="flex items-center justify-between text-xs font-mono uppercase text-[#8593a5]">
            <span>Sleep Performance</span>
            <Moon className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-5xl font-['Big_Shoulders_Display'] font-black text-white">
              {currentRecord.sleepScore}
            </span>
            <span className="text-xs font-mono text-[#8593a5]">/ 100</span>
          </div>
          <div className="text-xs font-mono text-indigo-400 mt-1">
            {currentRecord.sleepScore > 85 ? 'Optimal Restorative State' : 'Moderate Rest'}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0d1218] border border-[#1d2835] shadow-xl">
          <div className="flex items-center justify-between text-xs font-mono uppercase text-[#8593a5]">
            <span>Total Time Asleep</span>
            <Clock className="w-4 h-4 text-[#4df0d0]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-5xl font-['Big_Shoulders_Display'] font-black text-[#4df0d0]">
              {hours}h {minutes}m
            </span>
          </div>
          <div className="text-xs font-mono text-[#8593a5] mt-1">
            {currentRecord.circadianBedtime} → {currentRecord.circadianWakeup}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0d1218] border border-[#1d2835] shadow-xl">
          <div className="flex items-center justify-between text-xs font-mono uppercase text-[#8593a5]">
            <span>Deep Slow-Wave Sleep</span>
            <BatteryCharging className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-5xl font-['Big_Shoulders_Display'] font-black text-emerald-400">
              {deepHrs}h {deepMins}m
            </span>
          </div>
          <div className="text-xs font-mono text-[#8593a5] mt-1">
            {Math.round((currentRecord.deepSleepMinutes / currentRecord.totalDurationMinutes) * 100)}% of total (GH release peak)
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0d1218] border border-[#1d2835] shadow-xl">
          <div className="flex items-center justify-between text-xs font-mono uppercase text-[#8593a5]">
            <span>Resting Heart Rate</span>
            <Zap className="w-4 h-4 text-rose-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-5xl font-['Big_Shoulders_Display'] font-black text-rose-400">
              {currentRecord.restingHrDuringSleep}
            </span>
            <span className="text-xs font-mono text-[#8593a5]">BPM</span>
          </div>
          <div className="text-xs font-mono text-[#8593a5] mt-1">
            Vagal tone baseline dipped at 03:45 AM
          </div>
        </div>
      </div>

      {/* Sleep Stages Visualizer & Daily Training Prescription */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Stages Breakdown (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0d1218] border border-[#1d2835] rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#1d2835]">
            <h3 className="text-xl font-bold font-['Big_Shoulders_Display'] uppercase text-white tracking-wide">
              Sleep Hypnogram & Stage Distribution
            </h3>
            <span className="text-xs font-mono text-[#8593a5]">{currentRecord.date}</span>
          </div>

          {/* Stacked Stage Bar */}
          <div className="space-y-2">
            <div className="h-6 rounded-xl overflow-hidden flex gap-1 bg-[#06080c] p-1 border border-[#1a2533]">
              <div
                className="h-full bg-emerald-500 rounded"
                style={{ width: `${(currentRecord.deepSleepMinutes / currentRecord.totalDurationMinutes) * 100}%` }}
                title="Deep Sleep"
              />
              <div
                className="h-full bg-indigo-500 rounded"
                style={{ width: `${(currentRecord.remSleepMinutes / currentRecord.totalDurationMinutes) * 100}%` }}
                title="REM Sleep"
              />
              <div
                className="h-full bg-sky-500/70 rounded"
                style={{ width: `${(currentRecord.lightSleepMinutes / currentRecord.totalDurationMinutes) * 100}%` }}
                title="Light Sleep"
              />
              <div
                className="h-full bg-amber-500/50 rounded"
                style={{ width: `${(currentRecord.awakeMinutes / currentRecord.totalDurationMinutes) * 100}%` }}
                title="Awake"
              />
            </div>

            {/* Stage Legend */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-[#070a0e] border border-[#16202c]">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  Deep: {deepHrs}h {deepMins}m
                </div>
                <div className="text-[10px] text-[#8593a5] mt-1">Muscle tissue repair</div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#070a0e] border border-[#16202c]">
                <div className="flex items-center gap-1.5 text-indigo-400 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  REM: {remHrs}h {remMins}m
                </div>
                <div className="text-[10px] text-[#8593a5] mt-1">Cognitive & motor wiring</div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#070a0e] border border-[#16202c]">
                <div className="flex items-center gap-1.5 text-sky-400 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                  Light: {Math.floor(currentRecord.lightSleepMinutes / 60)}h {currentRecord.lightSleepMinutes % 60}m
                </div>
                <div className="text-[10px] text-[#8593a5] mt-1">Basal rest cycles</div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#070a0e] border border-[#16202c]">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  Awake: {currentRecord.awakeMinutes}m
                </div>
                <div className="text-[10px] text-[#8593a5] mt-1">Micro-arousals</div>
              </div>
            </div>
          </div>
        </div>

        {/* CNS Readiness & Daily Lifting Prescription (5 Cols) */}
        <div className="lg:col-span-5 bg-[#0d1218] border border-[#1d2835] rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#4df0d0] font-bold">
            <ShieldCheck className="w-4 h-4" />
            Sleep-Prescribed Training Focus
          </div>

          <div className="p-4 rounded-xl bg-[#090d12] border border-[#1a2533] space-y-2">
            <div className="text-xs font-mono uppercase text-[#8593a5]">CNS Readiness State:</div>
            <div className="text-lg font-bold font-mono text-white">
              {currentRecord.readinessVerdict}
            </div>
            <p className="text-xs text-[#8593a5] leading-relaxed">
              {currentRecord.recommendedTrainingFocus}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#070a0e] border border-[#16202c] space-y-2 text-xs font-mono text-[#8593a5]">
            <div className="text-white font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Tonight&apos;s Optimal Sleep Window:
            </div>
            <div>• Target Sleep: 10:45 PM – 06:30 AM (5 Complete 90-min Sleep Cycles).</div>
            <div>• Stop Caffeine Intake past 02:00 PM to protect adenosine receptors.</div>
            <div>• Magnesium glycinate (200-400mg) 45 minutes before bed aids neuromuscular release.</div>
          </div>
        </div>
      </div>
    </div>
  );
};
