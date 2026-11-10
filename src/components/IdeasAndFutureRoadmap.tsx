import React from 'react';
import {
  Lightbulb,
  CheckCircle2,
  Sparkles,
  Cpu,
  Watch,
  Eye,
  Zap,
  Shield,
  Layers,
} from 'lucide-react';

export const IdeasAndFutureRoadmap: React.FC = () => {
  const mistakesFixed = [
    {
      title: 'Crude Blocky Flowchart Body Map Fixed',
      before: 'Basic square and oval SVG flowchart with only generic whole-body parts.',
      after: 'Cinematic cybernetic holographic scan with detailed anatomical subdivisions: Upper (Clavicular), Middle (Sternal), and Lower (Costal) Chest, Teardrop (VMO) vs Outer Quad Sweep, and Long vs Short Biceps heads.',
    },
    {
      title: 'Generic AI Lab Upgraded to 60 FPS AI Motion Tracker',
      before: 'Static squat loop with minimal feedback.',
      after: 'Real-time multi-exercise computer vision tracker (Squats, Deadlifts, Bench Press) measuring exact joint angles (knee, hip, torso lean), automated depth counting, and optional live camera integration.',
    },
    {
      title: 'Rigid Diet Plans Upgraded to 7-Day Fully Customizable Menu Matrix',
      before: 'Hardcoded single-day calorie calculator without food swapping.',
      after: 'Full 7-day interactive meal customization (Mon–Sun) with 20+ Indian & global foods, gram portion sliders, and real-time macronutrient recalculations.',
    },
    {
      title: 'Gender-Aware Biometric Attendance Operations Added',
      before: 'Check-in list did not record gender or locker allocation.',
      after: 'Comprehensive ERP tracking member name, gender classification for facility/locker optimization, check-in method (Smart Band, Face ID, RFID), and automated WhatsApp retention alerts.',
    },
    {
      title: 'Post-Workout Pain & Cramp Diagnosis Doctor Implemented',
      before: 'No biofeedback or way to tell if a workout was performed with proper form.',
      after: 'Biofeedback doctor that evaluates pain location (lower back, knees, shoulders) and symptom type (sharp joint pain vs benign DOMS vs acute cramp) with immediate guided stretching relief protocols.',
    },
    {
      title: 'Circadian Sleep & Recovery Readiness Engine Built',
      before: 'No sleep tracking or CNS recovery insights.',
      after: 'Sleep stage hypnogram (Deep, REM, Light, Awake) detailing growth hormone production and prescribing exact daily lifting capacity based on sleep score.',
    },
    {
      title: 'Zero-Equipment Home & Homemaker Routines Added',
      before: 'Only heavy gym equipment was accounted for.',
      after: 'Gentle joint-friendly circuits using chairs, walls, and cushions to decompress the spine from sweeping/cooking, eliminate swollen evening feet, and build tone.',
    },
    {
      title: 'Cardio vs Gym Workout Order Flowchart Created',
      before: 'Users had no clarity on whether to do cardio before or after weights.',
      after: 'Interactive visual decision tree showing how lifting first protects glycogen and stabilizing spinal muscles, with targeted cardio placed afterwards.',
    },
    {
      title: 'Adaptive Workout-Specific Rest Timers Integrated',
      before: 'No rest tracking or one-size-fits-all timer.',
      after: 'Scientific rest timer that auto-adjusts based on lift category: 180s for heavy compound strength, 90s for hypertrophy, 60s for isolation, and 35s for CrossFit intervals.',
    },
    {
      title: 'Multi-Sport Athletics & CrossFit Hub Built',
      before: 'Standard bodybuilder splits only.',
      after: 'Elite sport-specific conditioning programs for Hyrox, CrossFit WODs, Ironman Triathlons, Marathons, Boxing/Kickboxing, Cricket bowlers/batsmen, and Football agility.',
    },
  ];

  const futureInnovations = [
    {
      icon: <Eye className="w-6 h-6 text-[#4df0d0]" />,
      title: 'Rack-Mounted 3D Time-of-Flight (ToF) Depth Cameras',
      description: 'Permanent ceiling-mounted LiDAR and ToF depth sensors above every squat rack and bench press. The camera recognizes the athlete by smart band proximity, tracks bar velocity (VBT) in millimeters per second, and automatically spots them with motorized safety pins if concentric velocity drops to zero.',
    },
    {
      icon: <Cpu className="w-6 h-6 text-amber-400" />,
      title: 'Motorized Electronic Magnet Cable Stacks',
      description: 'Replace physical iron weight plates with electromagnetic resistance motors. The machine can dynamically alter resistance along your natural strength curve (e.g., loading heavier in the strong midrange and reducing tension in compromised end-ranges to protect joints).',
    },
    {
      icon: <Watch className="w-6 h-6 text-rose-400" />,
      title: 'Non-Invasive Sweat Electrolyte & Lactate Patch Integration',
      description: 'Microfluidic skin sensors that measure interstitial lactate threshold and sodium loss in real-time. When lactate accumulation spikes, GymOS alerts the athlete to extend rest or sip sodium-magnesium intra-workout hydration.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-indigo-400" />,
      title: 'Circadian Gym HVAC & Dynamic Spectrogram Lighting',
      description: 'Automated IoT climate hub that monitors CO2 and crowd density to pump 100% fresh negative-pressure air into heavy deadlift zones while shifting lighting color temperature: energizing 5200K daylight-white in the power racks to relaxing 2700K amber in the yoga/stretch bay.',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1d2835] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-amber-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            Module 11 · Engineering Audit & Next-Gen Innovations
          </div>
          <h2 className="text-4xl sm:text-5xl font-['Big_Shoulders_Display'] font-black uppercase tracking-tight text-white">
            Mistakes Upgraded & Future Tech Ideas
          </h2>
          <p className="text-[#8593a5] text-sm max-w-2xl mt-1">
            Complete review of every flaw rectified from the initial concept prototype, along with groundbreaking hardware and software ideas for luxury gym operators.
          </p>
        </div>
      </div>

      {/* Grid of Mistakes Fixed */}
      <div className="space-y-4">
        <h3 className="text-2xl font-['Big_Shoulders_Display'] font-black uppercase tracking-wide text-white flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-[#4df0d0]" />
          10 Major Architecture Mistakes Upgraded & Refined
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mistakesFixed.map((m, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#0b1016] border border-[#1d2835] shadow-lg space-y-3"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#4df0d0]/20 text-[#4df0d0] border border-[#4df0d0]/40 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  {idx + 1}
                </span>
                <h4 className="text-base font-bold text-white font-mono">{m.title}</h4>
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                <div className="text-rose-400/90 bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
                  <strong>Previous Limitation:</strong> {m.before}
                </div>
                <div className="text-[#4df0d0] bg-[#4df0d0]/10 p-2 rounded-lg border border-[#4df0d0]/20">
                  <strong>GymOS Pro Upgrade:</strong> {m.after}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Future Ideas & Innovations */}
      <div className="p-6 rounded-2xl bg-gradient-to-b from-[#101722] via-[#0d1218] to-[#080c10] border border-[#1d2835] shadow-2xl space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-[#182330]">
          <Lightbulb className="w-6 h-6 text-amber-400" />
          <div>
            <h3 className="text-2xl font-['Big_Shoulders_Display'] font-black uppercase text-white tracking-wide">
              Cutting-Edge Gym Ecosystem Ideas
            </h3>
            <p className="text-xs font-mono text-[#8593a5]">
              Future tech specifications ready for commercial patenting & high-end deployment
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {futureInnovations.map((idea, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#070a0e] border border-[#16202c] hover:border-[#4df0d0]/40 transition-all space-y-2.5"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#121c26] border border-[#1d2835]">
                  {idea.icon}
                </div>
                <h4 className="text-base font-bold text-white font-mono">{idea.title}</h4>
              </div>
              <p className="text-xs text-[#8593a5] leading-relaxed pt-1">{idea.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
