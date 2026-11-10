import React, { useState } from 'react';
import { diagnoseWorkoutPain, PainDiagnosticResult } from '../utils/fitnessMath.ts';
import {
  Stethoscope,
  AlertTriangle,
  CheckCircle2,
  Activity,
  HeartPulse,
  Timer,
  Droplets,
  HelpCircle,
} from 'lucide-react';

export const PostWorkoutPainDoctor: React.FC = () => {
  const [muscleZone, setMuscleZone] = useState<string>('Lower Back (Lumbar)');
  const [symptomType, setSymptomType] = useState<'cramp' | 'sharp_joint' | 'dull_ache' | 'burning'>('sharp_joint');
  const [recentWorkout, setRecentWorkout] = useState<string>('Heavy Barbell Deadlifts / Squats');
  const [stretchTimerSeconds, setStretchTimerSeconds] = useState<number>(45);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Diagnosis calculation
  const diagnosis: PainDiagnosticResult = diagnoseWorkoutPain(muscleZone, symptomType);

  // Stretch countdown timer
  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && stretchTimerSeconds > 0) {
      interval = setInterval(() => {
        setStretchTimerSeconds((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 45;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, stretchTimerSeconds]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1d2835] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-rose-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            Module 05 · Post-Workout Biofeedback & Pain Diagnostics
          </div>
          <h2 className="text-4xl sm:text-5xl font-['Big_Shoulders_Display'] font-black uppercase tracking-tight text-white">
            Pain, Cramp & Form Breakdown Doctor
          </h2>
          <p className="text-[#8593a5] text-sm max-w-2xl mt-1">
            Analyze post-session discomfort to determine whether you performed your lifts correctly. Differentiates healthy hypertrophy micro-tears (DOMS) from form breakdown, acute cramps, and joint impingements, paired with immediate guided stretching relief protocols.
          </p>
        </div>
      </div>

      {/* Main Grid: Interactive Symptom Input (5 Cols) + Biomechanical Diagnosis & Stretches (7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Symptom & Workout Input (5 Cols) */}
        <div className="lg:col-span-5 bg-[#0d1218] border border-[#1d2835] rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-center gap-2 border-b border-[#1d2835] pb-3">
            <Stethoscope className="w-5 h-5 text-rose-400" />
            <h3 className="text-xl font-bold font-['Big_Shoulders_Display'] uppercase text-white tracking-wide">
              Where & What Are You Feeling?
            </h3>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#8593a5] mb-2">
              1. Anatomical Zone of Discomfort:
            </label>
            <select
              value={muscleZone}
              onChange={(e) => setMuscleZone(e.target.value)}
              className="w-full bg-[#06080c] text-xs font-mono border border-[#1d2835] rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-rose-400"
            >
              <option value="Lower Back (Lumbar)">Lower Back (Lumbar Spine)</option>
              <option value="Anterior Shoulder (Front Deltoid)">Front Shoulder & Rotator Cuff</option>
              <option value="Patellar Tendon / Knee Joint">Patellar Knee Joint</option>
              <option value="Hamstrings (Posterior Thigh)">Hamstrings & Glute-Ham Tie-in</option>
              <option value="Neck & Upper Trapezius">Cervical Spine / Neck & Traps</option>
              <option value="Forearm / Wrist Extensors">Wrist Flexors & Forearm Pump</option>
              <option value="Gastrocnemius (Calf)">Calf Muscles & Achilles Tendon</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#8593a5] mb-2">
              2. Sensation / Symptom Type:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSymptomType('sharp_joint')}
                className={`p-3 rounded-xl text-left border transition-all ${
                  symptomType === 'sharp_joint'
                    ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 font-bold'
                    : 'bg-[#06080c] border-[#1d2835] text-[#8593a5] hover:text-white'
                }`}
              >
                <div className="text-xs font-mono uppercase">Sharp Joint Pain</div>
                <div className="text-[10px] text-[#8593a5] mt-0.5">Pinches during lifting or lockout</div>
              </button>

              <button
                onClick={() => setSymptomType('cramp')}
                className={`p-3 rounded-xl text-left border transition-all ${
                  symptomType === 'cramp'
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 font-bold'
                    : 'bg-[#06080c] border-[#1d2835] text-[#8593a5] hover:text-white'
                }`}
              >
                <div className="text-xs font-mono uppercase">Sudden Cramp / Spasm</div>
                <div className="text-[10px] text-[#8593a5] mt-0.5">Involuntary violent locking</div>
              </button>

              <button
                onClick={() => setSymptomType('dull_ache')}
                className={`p-3 rounded-xl text-left border transition-all ${
                  symptomType === 'dull_ache'
                    ? 'bg-[#4df0d0]/20 border-[#4df0d0]/50 text-[#4df0d0] font-bold'
                    : 'bg-[#06080c] border-[#1d2835] text-[#8593a5] hover:text-white'
                }`}
              >
                <div className="text-xs font-mono uppercase">Dull Deep Ache (DOMS)</div>
                <div className="text-[10px] text-[#8593a5] mt-0.5">Soreness hours after workout</div>
              </button>

              <button
                onClick={() => setSymptomType('burning')}
                className={`p-3 rounded-xl text-left border transition-all ${
                  symptomType === 'burning'
                    ? 'bg-sky-500/20 border-sky-500/50 text-sky-300 font-bold'
                    : 'bg-[#06080c] border-[#1d2835] text-[#8593a5] hover:text-white'
                }`}
              >
                <div className="text-xs font-mono uppercase">Lactic Acid Burn</div>
                <div className="text-[10px] text-[#8593a5] mt-0.5">Metabolic pump accumulation</div>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#8593a5] mb-2">
              3. Recent Session Executed:
            </label>
            <input
              type="text"
              value={recentWorkout}
              onChange={(e) => setRecentWorkout(e.target.value)}
              className="w-full bg-[#06080c] text-xs font-mono border border-[#1d2835] rounded-xl px-3 py-2.5 text-white"
            />
          </div>
        </div>

        {/* Diagnosis & Guided Relief Protocol (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0d1218] border border-[#1d2835] rounded-2xl p-6 shadow-xl space-y-6">
          {/* Verdict Banner */}
          <div
            className={`p-4 rounded-xl border flex items-start gap-3.5 ${
              diagnosis.severity === 'acute_form_error'
                ? 'bg-rose-500/10 border-rose-500/40 text-rose-200'
                : diagnosis.severity === 'moderate_strain'
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                : 'bg-[#4df0d0]/10 border-[#4df0d0]/40 text-[#4df0d0]'
            }`}
          >
            {diagnosis.severity === 'acute_form_error' ? (
              <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
            ) : diagnosis.severity === 'moderate_strain' ? (
              <Activity className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-6 h-6 text-[#4df0d0] shrink-0 mt-0.5" />
            )}

            <div>
              <div className="text-xs font-mono uppercase tracking-wider font-bold">
                {diagnosis.isProperFormLikely
                  ? 'Healthy Lifting Execution Verified'
                  : 'Form Breakdown / Biomechanical Error Detected'}
              </div>
              <div className="text-base font-bold mt-0.5 text-white">{diagnosis.diagnosis}</div>
              <div className="text-xs text-[#8593a5] mt-1">{diagnosis.formRootCause}</div>
            </div>
          </div>

          {/* Targeted Stretch & Timer */}
          <div className="p-5 rounded-xl bg-[#090d12] border border-[#1a2533] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#4df0d0] font-bold flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4" />
                Prescribed Pain-Relief Stretching Protocol
              </span>
              <span className="text-[10px] font-mono text-[#8593a5]">Active Decompression</span>
            </div>

            <p className="text-sm font-semibold text-white">
              {diagnosis.recommendedStretch}
            </p>

            {/* Interactive Stretch Timer */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#06080c] border border-[#141d27]">
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-[#4df0d0]" />
                <span className="text-xs font-mono text-[#8593a5]">Hold Stretch Duration:</span>
                <span className="text-lg font-mono font-bold text-white">
                  {stretchTimerSeconds}s
                </span>
              </div>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider bg-[#4df0d0] text-[#04120f] transition-all hover:brightness-110"
              >
                {isTimerRunning ? 'Pause Hold' : 'Start Stretch Timer'}
              </button>
            </div>
          </div>

          {/* Actionable Relief Steps */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8593a5] block">
              Immediate 3-Step Relief Protocol:
            </span>
            <div className="space-y-2">
              {diagnosis.reliefProtocol.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#070a0e] border border-[#141d27] text-xs font-mono flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-md bg-[#162330] text-[#4df0d0] flex items-center justify-center font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-[#e9eef5] leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
