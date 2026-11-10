/**
 * Pure calculation functions for fitness math, 1RM, calories, rest timers, and biofeedback diagnosis.
 */

export interface MacroResult {
  bmr: number;
  tdee: number;
  targetKcal: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  waterLitres: number;
}

/**
 * Calculates BMR using Mifflin-St Jeor Equation
 */
export function calculateBMR(weightKg: number, heightCm: number, ageYears: number, gender: 'male' | 'female'): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * ageYears;
  return gender === 'male' ? Math.round(base + 5) : Math.round(base - 161);
}

/**
 * Calculates TDEE & macro targets based on goal
 */
export function calculateMacros(
  weightKg: number,
  heightCm: number,
  ageYears: number,
  gender: 'male' | 'female',
  activityMultiplier: number,
  goal: 'cut' | 'bulk' | 'maintain'
): MacroResult {
  const bmr = calculateBMR(weightKg, heightCm, ageYears, gender);
  const tdee = Math.round(bmr * activityMultiplier);

  let targetKcal = tdee;
  let proteinPerKg = 1.8;

  if (goal === 'cut') {
    targetKcal = Math.max(gender === 'male' ? 1500 : 1200, Math.round(tdee - 450));
    proteinPerKg = 2.2;
  } else if (goal === 'bulk') {
    targetKcal = Math.round(tdee + 350);
    proteinPerKg = 1.9;
  }

  const proteinGrams = Math.round(weightKg * proteinPerKg);
  const fatGrams = Math.round(Math.max(weightKg * 0.8, (targetKcal * 0.25) / 9));
  const remainingKcal = Math.max(0, targetKcal - proteinGrams * 4 - fatGrams * 9);
  const carbsGrams = Math.round(remainingKcal / 4);

  const waterLitres = Number((weightKg * 0.035 + (activityMultiplier > 1.5 ? 0.6 : 0.2)).toFixed(1));

  return {
    bmr,
    tdee,
    targetKcal,
    proteinGrams,
    carbsGrams,
    fatGrams,
    waterLitres,
  };
}

/**
 * Estimates 1RM using Epley and Brzycki formulas
 */
export function estimate1RM(weightKg: number, reps: number): { epley: number; brzycki: number; average: number } {
  if (reps <= 0 || weightKg <= 0) return { epley: 0, brzycki: 0, average: 0 };
  if (reps === 1) return { epley: weightKg, brzycki: weightKg, average: weightKg };

  const epley = weightKg * (1 + reps / 30);
  const brzycki = weightKg * (36 / (37 - reps));
  const average = (epley + brzycki) / 2;

  return {
    epley: Math.round(epley * 10) / 10,
    brzycki: Math.round(brzycki * 10) / 10,
    average: Math.round(average * 10) / 10,
  };
}

/**
 * Recommends optimal inter-set rest duration based on workout category
 */
export function getRecommendedRestSeconds(category: 'compound_strength' | 'hypertrophy' | 'isolation' | 'crossfit_hiit' | 'endurance'): number {
  switch (category) {
    case 'compound_strength':
      return 180; // 3 minutes for heavy neurological recovery
    case 'hypertrophy':
      return 90;  // 90 seconds for metabolic stress and mechanical tension
    case 'isolation':
      return 60;  // 60 seconds for smaller muscle groups
    case 'crossfit_hiit':
      return 35;  // 35 seconds interval recovery
    case 'endurance':
      return 20;
    default:
      return 90;
  }
}

/**
 * Calculates required Olympic plates per side for standard 20kg barbell
 */
export function calculateBarbellPlates(targetTotalWeightKg: number, barWeightKg = 20): { [plate: string]: number } {
  if (targetTotalWeightKg <= barWeightKg) return {};
  let weightPerSide = (targetTotalWeightKg - barWeightKg) / 2;
  const availablePlates = [25, 20, 15, 10, 5, 2.5, 1.25];
  const result: { [plate: string]: number } = {};

  for (const plate of availablePlates) {
    const count = Math.floor(weightPerSide / plate);
    if (count > 0) {
      result[`${plate}kg`] = count;
      weightPerSide = Math.round((weightPerSide - count * plate) * 100) / 100;
    }
  }

  return result;
}

/**
 * Diagnoses post-workout discomfort (good DOMS vs bad form breakdown/injury)
 */
export interface PainDiagnosticResult {
  severity: 'benign_doms' | 'moderate_strain' | 'acute_form_error';
  isProperFormLikely: boolean;
  diagnosis: string;
  formRootCause: string;
  recommendedStretch: string;
  reliefProtocol: string[];
}

export function diagnoseWorkoutPain(muscleZone: string, symptomType: 'cramp' | 'sharp_joint' | 'dull_ache' | 'burning'): PainDiagnosticResult {
  if (symptomType === 'cramp') {
    return {
      severity: 'moderate_strain',
      isProperFormLikely: true,
      diagnosis: `Acute localized muscle spasm in ${muscleZone}.`,
      formRootCause: 'Rapid intracellular electrolyte/sodium depletion, inadequate intra-workout hydration or sudden high-frequency eccentric shortening.',
      recommendedStretch: `Passive elongation stretch held for 45-60 seconds without bouncing.`,
      reliefProtocol: [
        'Immediately cease contraction and gently extend the cramped muscle fibers.',
        'Drink 350ml water enriched with pinch of pink Himalayan salt & magnesium.',
        'Apply slow rhythmic thumb compression (ischemic pressure) to trigger points.'
      ]
    };
  }

  if (symptomType === 'sharp_joint') {
    return {
      severity: 'acute_form_error',
      isProperFormLikely: false,
      diagnosis: `Joint impingement or shear stress near ${muscleZone} connective tissue.`,
      formRootCause: muscleZone.toLowerCase().includes('chest') || muscleZone.toLowerCase().includes('shoulder')
        ? 'Shoulder elbows excessively flared (>75°) during press causing subacromial impingement.'
        : muscleZone.toLowerCase().includes('knee') || muscleZone.toLowerCase().includes('back')
        ? 'Valgus knee collapse or excessive spinal flexion (butt wink/lumbar rounding) under load.'
        : 'Poor alignment, premature heavy loading or lack of joint centration.',
      recommendedStretch: 'Do NOT aggressively stretch sharp joint pain. Perform gentle mobility and nerve glides.',
      reliefProtocol: [
        'Apply cold compress for 15 minutes to reduce acute bursal/capsular inflammation.',
        'Reduce working load by 25% and correct joint alignment on the next session.',
        'Perform rotator cuff / glute medius activation warm-ups prior to lifting.'
      ]
    };
  }

  if (symptomType === 'burning') {
    return {
      severity: 'benign_doms',
      isProperFormLikely: true,
      diagnosis: `Healthy metabolic lactic acid & hydrogen ion accumulation in ${muscleZone}.`,
      formRootCause: 'High time-under-tension (TUT) with sustained muscle contraction. Proper form maintained.',
      recommendedStretch: 'Light dynamic range-of-motion swings and deep diaphragmatic breathing.',
      reliefProtocol: [
        'Walk for 3-5 minutes to facilitate venous blood flow and lactate clearance.',
        'Stay upright with open posture to restore oxygen saturation.',
        'Consume fast-digesting carbs and BCAAs/whey within 45 minutes.'
      ]
    };
  }

  // Dull ache
  return {
    severity: 'benign_doms',
    isProperFormLikely: true,
    diagnosis: `Delayed Onset Muscle Soreness (DOMS) from micro-tears in ${muscleZone}.`,
    formRootCause: 'Effective mechanical overload in the stretched muscle position. Sign of healthy hypertrophy stimulus.',
    recommendedStretch: `Deep static stretch for ${muscleZone} followed by gentle foam rolling.`,
    reliefProtocol: [
      'Take a warm shower or contrast bath to stimulate localized hyperaemia.',
      'Target 7-9 hours of restorative sleep for growth hormone release.',
      'Maintain protein intake at 1.8-2.2g per kg bodyweight for tissue remodeling.'
    ]
  };
}
