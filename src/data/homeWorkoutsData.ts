export interface HomeRoutine {
  id: string;
  title: string;
  subtitle: string;
  durationMinutes: number;
  suitableFor: string;
  intensity: 'Gentle & Restorative' | 'Low Impact Active' | 'Moderate Tone';
  exercises: {
    name: string;
    targetArea: string;
    durationOrReps: string;
    instructions: string;
    reliefBenefit: string;
    householdEquipment: string;
  }[];
}

export const HOME_ROUTINES_DATA: HomeRoutine[] = [
  {
    id: 'household_posture_reset',
    title: 'Household Posture & Lower Back Decompression',
    subtitle: 'Relieves lower back stiffness, neck strain, and rounded shoulders from bending and sweeping',
    durationMinutes: 12,
    suitableFor: 'Homemakers, mothers, remote workers sitting or standing long hours',
    intensity: 'Gentle & Restorative',
    exercises: [
      {
        name: 'Cat-Cow Spinal Wave with Breathing',
        targetArea: 'Thoracic & Lumbar Spine',
        durationOrReps: '10 slow breath cycles',
        instructions: 'Hands and knees on soft mat or rug; inhale arching belly down, exhale curling tailbone and chin to chest.',
        reliefBenefit: 'Mobilizes locked spinal facet joints and rehydrates vertebral discs after household bending.',
        householdEquipment: 'Floor rug or yoga mat',
      },
      {
        name: 'Kitchen Counter Chest & Lat Opener',
        targetArea: 'Upper Back, Chest & Pectorals',
        durationOrReps: '3 holds × 30 seconds',
        instructions: 'Place palms flat on kitchen counter or sturdy dining table; step feet back and hinge hips until chest sinks toward floor.',
        reliefBenefit: 'Reverses forward hunched posture and opens tight diaphragm for deeper lung expansion.',
        householdEquipment: 'Kitchen counter or dining chair',
      },
      {
        name: 'Supine Glute Bridge with Pillow Squeeze',
        targetArea: 'Pelvic Floor & Gluteus Medius',
        durationOrReps: '3 sets × 12 reps (2s hold)',
        instructions: 'Lie on back, knees bent, place couch cushion between knees; squeeze cushion gently while lifting hips to ceiling.',
        reliefBenefit: 'Strengthens weak pelvic floor and turns on glutes, removing ache from tired lower back.',
        householdEquipment: 'Bed pillow or couch cushion',
      },
      {
        name: 'Doorframe Pec Stretch (90-Degree Elbows)',
        targetArea: 'Anterior Shoulders & Clavicle',
        durationOrReps: '30 seconds per side',
        instructions: 'Forearm resting vertically against doorway; step opposite foot forward gently until mild chest stretch.',
        reliefBenefit: 'Cures text-neck and front shoulder pinch from cooking and laptop usage.',
        householdEquipment: 'Any standard doorway',
      },
    ],
  },
  {
    id: '15min_gentle_home_tone',
    title: '15-Minute Zero-Impact Full Body Metabolism Boost',
    subtitle: 'Joint-friendly calorie burn and muscle toning with zero jumping or knee stress',
    durationMinutes: 15,
    suitableFor: 'Busy household women wanting tone without gym memberships',
    intensity: 'Moderate Tone',
    exercises: [
      {
        name: 'Dining Chair Sit-to-Stand Squat',
        targetArea: 'Quads, Glutes & Hamstrings',
        durationOrReps: '3 sets × 12 reps',
        instructions: 'Stand in front of sturdy dining chair; sit back until glutes lightly touch cushion, then drive through heels to stand.',
        reliefBenefit: 'Safe knee tracking that builds strong thighs for stairs and carrying groceries without injury.',
        householdEquipment: 'Sturdy dining chair',
      },
      {
        name: 'Wall Push-Ups with Scapular Pinch',
        targetArea: 'Chest, Triceps & Core',
        durationOrReps: '3 sets × 12-15 reps',
        instructions: 'Stand 2 feet from a blank wall; place hands flat at shoulder height, lower nose smoothly to wall, push back.',
        reliefBenefit: 'Builds arm and upper body strength without putting pressure on weak wrists.',
        householdEquipment: 'Blank wall surface',
      },
      {
        name: 'Water Bottle Bicep Curl to Overhead Press',
        targetArea: 'Biceps, Shoulders & Upper Back',
        durationOrReps: '3 sets × 12 reps',
        instructions: 'Hold two 1-litre water bottles (approx 1kg each); curl toward shoulders, then press smoothly overhead.',
        reliefBenefit: 'Firms upper arms and strengthens shoulders for overhead cabinet reaching.',
        householdEquipment: 'Two 1-litre or 2-litre water bottles',
      },
      {
        name: 'Standing Side Leg Lifts (Glute Medius)',
        targetArea: 'Outer Hips & Waistline',
        durationOrReps: '15 reps per leg',
        instructions: 'Lightly hold kitchen counter for balance; lift outer leg out to side at 30° angle without leaning torso.',
        reliefBenefit: 'Tightens hip contour and stabilizes pelvis, eliminating uneven hip fatigue.',
        householdEquipment: 'Kitchen counter or wall for support',
      },
    ],
  },
  {
    id: 'evening_legs_and_plantar_relief',
    title: 'Evening Tired Feet, Swelling & Varicose Relief',
    subtitle: 'Soothes throbbing legs, swollen ankles, and plantar fasciitis after all-day standing',
    durationMinutes: 10,
    suitableFor: 'Anyone experiencing heavy legs or foot ache at end of day',
    intensity: 'Gentle & Restorative',
    exercises: [
      {
        name: 'Legs-Up-The-Wall Inversion (Viparita Karani)',
        targetArea: 'Venous Drainage & Lymphatic Flow',
        durationOrReps: '5 continuous minutes',
        instructions: 'Lie flat on floor or bed with glutes against wall and legs resting straight up the wall; arms relaxed by sides.',
        reliefBenefit: 'Uses gravity to drain pooled blood and lymph fluid from lower calves, reducing ankle edema instantly.',
        householdEquipment: 'Wall and comfortable bed or rug',
      },
      {
        name: 'Tennis Ball / Frozen Bottle Foot Sole Roll',
        targetArea: 'Plantar Fascia & Arch of Foot',
        durationOrReps: '2 minutes per foot',
        instructions: 'While seated comfortably, place tennis ball or small water bottle under foot arch; roll forward and back with gentle pressure.',
        reliefBenefit: 'Breaks up painful fascial adhesions and releases chronic heel spurs and arch stiffness.',
        householdEquipment: 'Tennis ball or water bottle',
      },
      {
        name: 'Seated Ankle Alphabet Rotations',
        targetArea: 'Ankle Mortise & Calves',
        durationOrReps: 'Trace A through Z with big toe',
        instructions: 'Sit on sofa; lift one leg and draw all 26 letters of the alphabet in the air with your foot.',
        reliefBenefit: 'Restores 360° synovial fluid lubricity to stiff ankles.',
        householdEquipment: 'Sofa or chair',
      },
    ],
  },
];
