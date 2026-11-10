import React, { useState } from 'react';
import { HOME_ROUTINES_DATA, HomeRoutine } from '../data/homeWorkoutsData.ts';
import { Home, Heart, Clock, CheckCircle2, Sparkles, Sofa, ShieldAlert } from 'lucide-react';

export const HomeWorkoutsModule: React.FC = () => {
  const [selectedRoutineIndex, setSelectedRoutineIndex] = useState<number>(0);
  const currentRoutine: HomeRoutine = HOME_ROUTINES_DATA[selectedRoutineIndex];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1d2835] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-amber-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            Module 07 · Zero-Equipment Home & Homemaker Vitality
          </div>
          <h2 className="text-4xl sm:text-5xl font-['Big_Shoulders_Display'] font-black uppercase tracking-tight text-white">
            Home Workouts & Ergonomic Stretches
          </h2>
          <p className="text-[#8593a5] text-sm max-w-2xl mt-1">
            Gentle joint-friendly circuits designed specifically for homemakers, household women, and remote workers. Decompresses the lumbar spine from sweeping/cooking, tones muscles with common household items, and relieves evening leg swelling.
          </p>
        </div>

        {/* Routine Selector Tabs */}
        <div className="flex flex-wrap gap-2">
          {HOME_ROUTINES_DATA.map((rt, idx) => (
            <button
              key={rt.id}
              onClick={() => setSelectedRoutineIndex(idx)}
              className={`px-3 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                selectedRoutineIndex === idx
                  ? 'bg-amber-400 text-[#04120f] font-bold shadow-md'
                  : 'bg-[#0d1218] text-[#8593a5] hover:text-white border border-[#1d2835]'
              }`}
            >
              {rt.title.split(' ')[0]} {rt.title.split(' ')[1]}
            </button>
          ))}
        </div>
      </div>

      {/* Routine Detail Hero */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#141b24] via-[#0d1218] to-[#090d12] border border-[#1d2835] shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
            {currentRoutine.intensity}
          </span>
          <div className="flex items-center gap-2 text-xs font-mono text-[#8593a5]">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{currentRoutine.durationMinutes} Minutes Total</span>
          </div>
        </div>

        <h3 className="text-3xl font-['Big_Shoulders_Display'] font-black uppercase text-white tracking-wide">
          {currentRoutine.title}
        </h3>
        <p className="text-sm text-[#8593a5] mt-1 max-w-3xl">
          {currentRoutine.subtitle}
        </p>

        <div className="mt-4 pt-3 border-t border-[#1a2533] flex items-center gap-2 text-xs font-mono text-[#8593a5]">
          <span className="text-white font-bold">Best Suited For:</span>
          <span>{currentRoutine.suitableFor}</span>
        </div>
      </div>

      {/* Exercise Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentRoutine.exercises.map((ex, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-[#0b1016] border border-[#1d2835] hover:border-amber-400/40 transition-all shadow-lg space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-amber-400/20 text-amber-400 border border-amber-400/40 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  {idx + 1}
                </span>
                <h4 className="text-base font-bold text-white">{ex.name}</h4>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#162330] text-amber-300 border border-[#23354a] whitespace-nowrap">
                {ex.durationOrReps}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[#8593a5]">
              <span className="text-white font-semibold">Target Area:</span>
              <span className="text-[#4df0d0]">{ex.targetArea}</span>
            </div>

            <p className="text-xs text-[#8593a5] leading-relaxed bg-[#070a0e] p-3 rounded-xl border border-[#141d27]">
              <strong className="text-white font-mono">How to do it:</strong> {ex.instructions}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-[#141d27] text-[11px] font-mono">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="truncate">{ex.reliefBenefit}</span>
              </div>
              <div className="flex items-center gap-1 text-[#8593a5] shrink-0 pl-2">
                <Sofa className="w-3 h-3 text-amber-400" />
                <span>{ex.householdEquipment}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
