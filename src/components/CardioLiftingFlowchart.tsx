import React, { useState } from 'react';
import { GitBranch, ArrowRight, CheckCircle2, Dumbbell, Activity, Heart, Flame, ShieldAlert } from 'lucide-react';

export const CardioLiftingFlowchart: React.FC = () => {
  const [selectedGoal, setSelectedGoal] = useState<'hypertrophy' | 'fat_loss' | 'hybrid_endurance' | 'heart_health'>('hypertrophy');

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1d2835] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-sky-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            Module 08 · Biomechanical Order & Sequencing Flowchart
          </div>
          <h2 className="text-4xl sm:text-5xl font-['Big_Shoulders_Display'] font-black uppercase tracking-tight text-white">
            Cardio vs. Gym Workout Flowchart
          </h2>
          <p className="text-[#8593a5] text-sm max-w-2xl mt-1">
            Should you do cardio before or after weights? Select your goal to reveal the scientifically verified sequence that prevents muscle catabolism and optimizes glycogen utilization.
          </p>
        </div>

        {/* Goal Selector Buttons */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              { id: 'hypertrophy', label: 'Build Muscle & Strength' },
              { id: 'fat_loss', label: 'Maximum Fat Loss' },
              { id: 'hybrid_endurance', label: 'Hybrid / Hyrox Athleticism' },
              { id: 'heart_health', label: 'Cardio & Heart Health' },
            ] as const
          ).map((g) => (
            <button
              key={g.id}
              onClick={() => setSelectedGoal(g.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                selectedGoal === g.id
                  ? 'bg-sky-400 text-[#04120f] font-bold shadow-md'
                  : 'bg-[#0d1218] text-[#8593a5] hover:text-white border border-[#1d2835]'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Visual Flowchart Pipeline */}
      <div className="p-6 rounded-2xl bg-[#0b1016] border border-[#1d2835] shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#1a2533]">
          <span className="text-xs font-mono uppercase text-[#8593a5] flex items-center gap-1.5">
            <GitBranch className="w-4 h-4 text-sky-400" />
            Active Protocol Pipeline for: <strong className="text-white uppercase">{selectedGoal.replace('_', ' ')}</strong>
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-400/10 text-sky-300">
            Optimal Glycogen Preservation
          </span>
        </div>

        {/* Sequence Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-[#070a0e] border border-[#162330] space-y-2 relative">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-lg bg-sky-400/20 text-sky-400 border border-sky-400/40 flex items-center justify-center font-mono text-xs font-bold">
                01
              </span>
              <span className="text-[10px] font-mono text-[#8593a5]">5-8 Minutes</span>
            </div>
            <h4 className="text-base font-bold text-white font-mono uppercase">Dynamic Warm-Up</h4>
            <p className="text-xs text-[#8593a5] leading-relaxed">
              Joint mobility, foam rolling, band pull-aparts & core bracing. <strong>NEVER</strong> do exhausting 30-min treadmill running before heavy lifting!
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-[#070a0e] border border-[#162330] space-y-2 relative">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-lg bg-[#4df0d0]/20 text-[#4df0d0] border border-[#4df0d0]/40 flex items-center justify-center font-mono text-xs font-bold">
                02
              </span>
              <span className="text-[10px] font-mono text-[#8593a5]">35-45 Minutes</span>
            </div>
            <h4 className="text-base font-bold text-white font-mono uppercase">Heavy Compound Lifting</h4>
            <p className="text-xs text-[#8593a5] leading-relaxed">
              Squats, Bench, Deadlifts, Rows, or Overhead Presses. Uses 100% fresh intramuscular glycogen without pre-exhaustion of spinal stabilizers.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl bg-[#070a0e] border border-[#162330] space-y-2 relative">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-lg bg-amber-400/20 text-amber-400 border border-amber-400/40 flex items-center justify-center font-mono text-xs font-bold">
                03
              </span>
              <span className="text-[10px] font-mono text-[#8593a5]">15-20 Minutes</span>
            </div>
            <h4 className="text-base font-bold text-white font-mono uppercase">Targeted Cardio Phase</h4>
            <p className="text-xs text-[#8593a5] leading-relaxed">
              {selectedGoal === 'hypertrophy'
                ? 'Low-Intensity Steady State (LISS) incline walk at Zone 2. Preserves muscle-building mTOR signaling.'
                : selectedGoal === 'fat_loss'
                ? 'Post-weights HIIT or stairmaster. With glycogen already depleted from lifting, body mobilizes fatty acids directly.'
                : selectedGoal === 'hybrid_endurance'
                ? 'Compromised running or SkiErg intervals to simulate race fatigue.'
                : 'Steady-state rowing or cycling at 65-75% max HR.'}
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-xl bg-[#070a0e] border border-[#162330] space-y-2 relative">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-lg bg-emerald-400/20 text-emerald-400 border border-emerald-400/40 flex items-center justify-center font-mono text-xs font-bold">
                04
              </span>
              <span className="text-[10px] font-mono text-[#8593a5]">5 Minutes</span>
            </div>
            <h4 className="text-base font-bold text-white font-mono uppercase">Downregulation & Nutrition</h4>
            <p className="text-xs text-[#8593a5] leading-relaxed">
              Box breathing to transition nervous system from sympathetic (fight/flight) to parasympathetic (rest/digest), followed by protein & electrolytes.
            </p>
          </div>
        </div>

        {/* Science Rationale Card */}
        <div className="p-4 rounded-xl bg-[#070a0e] border border-[#141d27] flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-[#8593a5] leading-relaxed space-y-1">
            <div className="text-white font-bold font-mono uppercase">
              Biomechanical Warning: Why Cardio Before Heavy Weights Causes Injuries
            </div>
            <div>
              Doing prolonged cardio before squats or deadlifts depletes stabilizing core muscles (transverse abdominis & erector spinae). When stabilizing muscles are fatigued, heavy loads buckle the lumbar spine and knees, dramatically spiking herniated disc and meniscus tear risks.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
