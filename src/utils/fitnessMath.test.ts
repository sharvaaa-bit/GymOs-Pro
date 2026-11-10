import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateBMR,
  calculateMacros,
  estimate1RM,
  getRecommendedRestSeconds,
  calculateBarbellPlates,
  diagnoseWorkoutPain
} from './fitnessMath.ts';

test('calculateBMR returns accurate Mifflin-St Jeor values for male and female', () => {
  // 78kg, 172cm, 24yo male: 10*78 + 6.25*172 - 5*24 + 5 = 780 + 1075 - 120 + 5 = 1740
  const maleBmr = calculateBMR(78, 172, 24, 'male');
  assert.equal(maleBmr, 1740);

  // 60kg, 165cm, 28yo female: 10*60 + 6.25*165 - 5*28 - 161 = 600 + 1031.25 - 140 - 161 = 1330.25 -> 1330
  const femaleBmr = calculateBMR(60, 165, 28, 'female');
  assert.equal(femaleBmr, 1330);
});

test('calculateMacros calculates proper calorie deficits and protein targets', () => {
  const macros = calculateMacros(78, 172, 24, 'male', 1.55, 'cut');
  assert.ok(macros.tdee > macros.targetKcal, 'Target calories should be below TDEE during a cut');
  assert.ok(macros.proteinGrams >= 78 * 2.0, 'Protein should be elevated in a cut');
  assert.ok(macros.waterLitres >= 2.5, 'Water intake should be adequate');
});

test('estimate1RM calculates Epley and Brzycki estimates correctly', () => {
  const est = estimate1RM(100, 5);
  // Epley: 100 * (1 + 5/30) = 116.67
  assert.ok(est.epley >= 116 && est.epley <= 117);
  assert.ok(est.average > 100);

  // 1 rep should equal exact weight
  const single = estimate1RM(140, 1);
  assert.equal(single.epley, 140);
  assert.equal(single.brzycki, 140);
});

test('getRecommendedRestSeconds differentiates compound lifts from isolation and HIIT', () => {
  assert.equal(getRecommendedRestSeconds('compound_strength'), 180);
  assert.equal(getRecommendedRestSeconds('hypertrophy'), 90);
  assert.equal(getRecommendedRestSeconds('isolation'), 60);
  assert.equal(getRecommendedRestSeconds('crossfit_hiit'), 35);
});

test('calculateBarbellPlates breaks down plate distribution for standard 20kg barbell', () => {
  // 100kg total = 20kg bar + 40kg each side -> 25kg + 15kg
  const plates = calculateBarbellPlates(100, 20);
  assert.equal(plates['25kg'], 1);
  assert.equal(plates['15kg'], 1);

  // 60kg total = 20kg bar + 20kg each side -> 1 x 20kg plate
  const plates60 = calculateBarbellPlates(60, 20);
  assert.equal(plates60['20kg'], 1);
});

test('diagnoseWorkoutPain flags form breakdown on sharp joint pain vs normal DOMS', () => {
  const jointIssue = diagnoseWorkoutPain('Knee Joint', 'sharp_joint');
  assert.equal(jointIssue.isProperFormLikely, false);
  assert.equal(jointIssue.severity, 'acute_form_error');

  const crampIssue = diagnoseWorkoutPain('Hamstring', 'cramp');
  assert.equal(crampIssue.severity, 'moderate_strain');
  assert.ok(crampIssue.reliefProtocol.length > 0);

  const domsIssue = diagnoseWorkoutPain('Chest', 'dull_ache');
  assert.equal(domsIssue.isProperFormLikely, true);
  assert.equal(domsIssue.severity, 'benign_doms');
});
