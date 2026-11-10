export type ViewMode =
  | 'dashboard'
  | 'atlas'
  | 'three_d_scanner'
  | 'motion_tracker'
  | 'ai_coach'
  | 'meal_scanner'
  | 'custom_diet'
  | 'workout_logger'
  | 'sonic_pacer'
  | 'sports_crossfit'
  | 'pain_doctor'
  | 'sleep_tracker'
  | 'home_workouts'
  | 'cardio_flowchart'
  | 'gym_ops'
  | 'ideas_roadmap';

export interface BiometricTelemetry {
  isBandWorn: boolean;
  batteryPercent: number;
  heartRate: number;
  restingHr: number;
  hrv: number; // ms
  spo2: number; // %
  skinTemp: number; // °C
  hrZone: 'Zone 1 (Active Recovery)' | 'Zone 2 (Aerobic Base)' | 'Zone 3 (Tempo)' | 'Zone 4 (Threshold)' | 'Zone 5 (Peak Anaerobic)';
  hrHistory: number[];
}

export interface SubMusclePart {
  id: string;
  name: string;
  scientificName: string;
  action: string;
  bestExercises: {
    name: string;
    equipment: 'barbell' | 'dumbbell' | 'cable' | 'machine' | 'bodyweight';
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    reps: string;
    biomechanicalCue: string;
    mechanic: 'Compound' | 'Isolation';
    hypertrophyFocus: 'Stretch Mediated' | 'Peak Contraction';
  }[];
}

export interface MajorMuscleGroup {
  id: string;
  displayName: string;
  region: string;
  view: 'front' | 'back';
  weeklyOptimalSets: string;
  recoveryWindow: string;
  subParts: SubMusclePart[];
}

export interface FoodItem {
  id: string;
  name: string;
  category: 'Protein' | 'Carb' | 'Fat' | 'Vegetable' | 'Dairy' | 'Supplement';
  dietTypes: ('veg' | 'vegan' | 'egg' | 'nonveg')[];
  defaultGrams: number;
  kcalPer100g: number;
  proteinPer100g: number;
  carbsPer100g: number;
  fatPer100g: number;
  isIndianCuisine: boolean;
  micronutrientHighlight?: string;
}

export interface CustomMealSlot {
  slotName: 'Breakfast' | 'Morning Snack' | 'Lunch' | 'Evening Pre-Workout' | 'Dinner' | 'Night Recovery';
  items: {
    foodId: string;
    grams: number;
  }[];
}

export interface DayDietPlan {
  dayName: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  slots: CustomMealSlot[];
}

export interface AttendanceRecord {
  id: string;
  memberName: string;
  gender: 'Male' | 'Female' | 'Non-Binary';
  photoUrl?: string;
  time: string;
  method: 'Smart Band NFC' | 'Face Biometric' | 'RFID Card' | 'QR Mobile';
  streakDays: number;
  assignedLocker: number;
  status: 'In Gym' | 'Departed';
}

export interface SportsProgram {
  id: string;
  sport: 'Ironman Triathlon' | 'Hyrox' | 'Marathon' | 'CrossFit' | 'Boxing / Kickboxing' | 'Cricket' | 'Football (Soccer)';
  category: 'Endurance' | 'Functional Fitness' | 'Combat Sports' | 'Field Athletics';
  weeklyCadence: string;
  keyPhases: {
    phase: string;
    goal: string;
    sampleSession: {
      title: string;
      exercises: string[];
      energySystem: string;
      recommendedRest: string;
    };
  }[];
}

export interface PainCase {
  id: string;
  area: string;
  symptomType: 'cramp' | 'sharp_joint' | 'dull_ache' | 'burning';
  workoutDone: string;
  triggerContext: string;
}
