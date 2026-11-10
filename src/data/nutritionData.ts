import { FoodItem, DayDietPlan } from '../types/index.ts';

export const FOOD_DATABASE: FoodItem[] = [
  { id: 'chicken_breast', name: 'Tandoori / Steamed Chicken Breast', category: 'Protein', dietTypes: ['nonveg'], defaultGrams: 180, kcalPer100g: 165, proteinPer100g: 31, carbsPer100g: 0, fatPer100g: 3.6, isIndianCuisine: true, micronutrientHighlight: 'Niacin, Selenium & B6' },
  { id: 'seer_fish', name: 'Seer Fish / Rohu Fillet (Grilled)', category: 'Protein', dietTypes: ['nonveg'], defaultGrams: 160, kcalPer100g: 130, proteinPer100g: 22, carbsPer100g: 0, fatPer100g: 4.2, isIndianCuisine: true, micronutrientHighlight: 'Omega-3 EPA/DHA' },
  { id: 'whole_egg', name: 'Boiled Farm Eggs', category: 'Protein', dietTypes: ['nonveg', 'egg'], defaultGrams: 100, kcalPer100g: 143, proteinPer100g: 12.6, carbsPer100g: 0.7, fatPer100g: 9.5, isIndianCuisine: true, micronutrientHighlight: 'Choline & Vitamin D3' },
  { id: 'egg_white', name: 'Egg Whites (Omlette / Scramble)', category: 'Protein', dietTypes: ['nonveg', 'egg'], defaultGrams: 150, kcalPer100g: 52, proteinPer100g: 11, carbsPer100g: 0.7, fatPer100g: 0.2, isIndianCuisine: true, micronutrientHighlight: 'Pure bioavailable albumin' },
  { id: 'paneer_raw', name: 'Fresh Malai Paneer', category: 'Dairy', dietTypes: ['nonveg', 'egg', 'veg'], defaultGrams: 120, kcalPer100g: 265, proteinPer100g: 18, carbsPer100g: 1.5, fatPer100g: 20.8, isIndianCuisine: true, micronutrientHighlight: 'High Calcium & Casein' },
  { id: 'curd_dahi', name: 'Set Curd (Dahi) / Greek Yogurt', category: 'Dairy', dietTypes: ['nonveg', 'egg', 'veg'], defaultGrams: 200, kcalPer100g: 65, proteinPer100g: 4.5, carbsPer100g: 5.2, fatPer100g: 3.2, isIndianCuisine: true, micronutrientHighlight: 'Live Probiotics & Gut flora' },
  { id: 'soya_chunks', name: 'Soya Chunks (Nutrela, boiled)', category: 'Protein', dietTypes: ['nonveg', 'egg', 'veg', 'vegan'], defaultGrams: 50, kcalPer100g: 345, proteinPer100g: 52, carbsPer100g: 33, fatPer100g: 0.5, isIndianCuisine: true, micronutrientHighlight: 'Highest plant protein density' },
  { id: 'tofu_firm', name: 'Organic Firm Tofu', category: 'Protein', dietTypes: ['nonveg', 'egg', 'veg', 'vegan'], defaultGrams: 150, kcalPer100g: 78, proteinPer100g: 8.5, carbsPer100g: 2, fatPer100g: 4.8, isIndianCuisine: false, micronutrientHighlight: 'Iron, Isoflavones & Zinc' },
  { id: 'moong_dal', name: 'Yellow Moong Dal (Tadka)', category: 'Carb', dietTypes: ['nonveg', 'egg', 'veg', 'vegan'], defaultGrams: 180, kcalPer100g: 105, proteinPer100g: 7.2, carbsPer100g: 19.1, fatPer100g: 0.5, isIndianCuisine: true, micronutrientHighlight: 'Folate & Easy digestion' },
  { id: 'toor_dal', name: 'Arhar / Toor Dal (Sambhar)', category: 'Carb', dietTypes: ['nonveg', 'egg', 'veg', 'vegan'], defaultGrams: 180, kcalPer100g: 118, proteinPer100g: 7.4, carbsPer100g: 20.5, fatPer100g: 0.6, isIndianCuisine: true, micronutrientHighlight: 'Potassium & Fiber' },
  { id: 'chana_boiled', name: 'Spiced Kala Chana / Chickpeas', category: 'Carb', dietTypes: ['nonveg', 'egg', 'veg', 'vegan'], defaultGrams: 150, kcalPer100g: 164, proteinPer100g: 8.9, carbsPer100g: 27.4, fatPer100g: 2.6, isIndianCuisine: true, micronutrientHighlight: 'Slow low-GI carbs' },
  { id: 'rajma_curry', name: 'Punjabi Rajma (Red Kidney Beans)', category: 'Carb', dietTypes: ['nonveg', 'egg', 'veg', 'vegan'], defaultGrams: 180, kcalPer100g: 127, proteinPer100g: 8.7, carbsPer100g: 22.8, fatPer100g: 0.8, isIndianCuisine: true, micronutrientHighlight: 'Soluble resistant starch' },
  { id: 'brown_rice', name: 'Steamed Basmati / Brown Rice', category: 'Carb', dietTypes: ['nonveg', 'egg', 'veg', 'vegan'], defaultGrams: 160, kcalPer100g: 130, proteinPer100g: 2.7, carbsPer100g: 28.2, fatPer100g: 0.4, isIndianCuisine: true, micronutrientHighlight: 'Clean glycogen replenishment' },
  { id: 'wheat_roti', name: 'Whole Wheat Phulka / Roti', category: 'Carb', dietTypes: ['nonveg', 'egg', 'veg', 'vegan'], defaultGrams: 80, kcalPer100g: 297, proteinPer100g: 9.2, carbsPer100g: 46.1, fatPer100g: 7.2, isIndianCuisine: true, micronutrientHighlight: 'Dietary fiber & B-vitamins' },
  { id: 'rolled_oats', name: 'Rolled Oats Porridge', category: 'Carb', dietTypes: ['nonveg', 'egg', 'veg', 'vegan'], defaultGrams: 60, kcalPer100g: 389, proteinPer100g: 16.9, carbsPer100g: 66.3, fatPer100g: 6.9, isIndianCuisine: false, micronutrientHighlight: 'Beta-glucan for heart health' },
  { id: 'idli_steamed', name: 'Steamed South Indian Idli', category: 'Carb', dietTypes: ['nonveg', 'egg', 'veg', 'vegan'], defaultGrams: 120, kcalPer100g: 140, proteinPer100g: 4.2, carbsPer100g: 28.4, fatPer100g: 0.4, isIndianCuisine: true, micronutrientHighlight: 'Fermented bio-enhanced nutrients' },
  { id: 'ghee_pure', name: 'Desi Cow A2 Ghee', category: 'Fat', dietTypes: ['nonveg', 'egg', 'veg'], defaultGrams: 15, kcalPer100g: 900, proteinPer100g: 0, carbsPer100g: 0, fatPer100g: 100, isIndianCuisine: true, micronutrientHighlight: 'Butyric acid & Vitamin K2' },
  { id: 'almonds_soaked', name: 'Soaked Mamra Almonds', category: 'Fat', dietTypes: ['nonveg', 'egg', 'veg', 'vegan'], defaultGrams: 25, kcalPer100g: 579, proteinPer100g: 21.2, carbsPer100g: 21.6, fatPer100g: 49.9, isIndianCuisine: true, micronutrientHighlight: 'Vitamin E & Magnesium' },
  { id: 'peanut_butter', name: 'Roasted Peanut Butter (100% pure)', category: 'Fat', dietTypes: ['nonveg', 'egg', 'veg', 'vegan'], defaultGrams: 30, kcalPer100g: 588, proteinPer100g: 25, carbsPer100g: 20, fatPer100g: 50, isIndianCuisine: false, micronutrientHighlight: 'Monounsaturated healthy fats' },
  { id: 'whey_isolate', name: 'Whey Protein Isolate (Chocolate)', category: 'Supplement', dietTypes: ['nonveg', 'egg', 'veg'], defaultGrams: 33, kcalPer100g: 380, proteinPer100g: 88, carbsPer100g: 2.5, fatPer100g: 1.2, isIndianCuisine: false, micronutrientHighlight: '5.5g BCAAs & rapid absorption' },
  { id: 'banana_fresh', name: 'Fresh Robusta Banana', category: 'Carb', dietTypes: ['nonveg', 'egg', 'veg', 'vegan'], defaultGrams: 120, kcalPer100g: 89, proteinPer100g: 1.1, carbsPer100g: 22.8, fatPer100g: 0.3, isIndianCuisine: true, micronutrientHighlight: 'Potassium electrolyte booster' },
  { id: 'spinach_palak', name: 'Sauteed Palak / Spinach', category: 'Vegetable', dietTypes: ['nonveg', 'egg', 'veg', 'vegan'], defaultGrams: 150, kcalPer100g: 23, proteinPer100g: 2.9, carbsPer100g: 3.6, fatPer100g: 0.4, isIndianCuisine: true, micronutrientHighlight: 'Dietary nitrates for vascular pump' },
];

export const INITIAL_7_DAY_DIET_PLAN: DayDietPlan[] = [
  {
    dayName: 'Monday',
    slots: [
      { slotName: 'Breakfast', items: [{ foodId: 'whole_egg', grams: 100 }, { foodId: 'rolled_oats', grams: 50 }, { foodId: 'banana_fresh', grams: 100 }] },
      { slotName: 'Lunch', items: [{ foodId: 'chicken_breast', grams: 180 }, { foodId: 'brown_rice', grams: 180 }, { foodId: 'spinach_palak', grams: 120 }, { foodId: 'ghee_pure', grams: 10 }] },
      { slotName: 'Evening Pre-Workout', items: [{ foodId: 'whey_isolate', grams: 33 }, { foodId: 'almonds_soaked', grams: 20 }] },
      { slotName: 'Dinner', items: [{ foodId: 'seer_fish', grams: 160 }, { foodId: 'wheat_roti', grams: 80 }, { foodId: 'curd_dahi', grams: 150 }] },
    ],
  },
  {
    dayName: 'Tuesday',
    slots: [
      { slotName: 'Breakfast', items: [{ foodId: 'idli_steamed', grams: 150 }, { foodId: 'toor_dal', grams: 150 }, { foodId: 'egg_white', grams: 120 }] },
      { slotName: 'Lunch', items: [{ foodId: 'chicken_breast', grams: 180 }, { foodId: 'wheat_roti', grams: 100 }, { foodId: 'moong_dal', grams: 150 }] },
      { slotName: 'Evening Pre-Workout', items: [{ foodId: 'peanut_butter', grams: 25 }, { foodId: 'banana_fresh', grams: 120 }] },
      { slotName: 'Dinner', items: [{ foodId: 'paneer_raw', grams: 100 }, { foodId: 'brown_rice', grams: 150 }, { foodId: 'spinach_palak', grams: 150 }] },
    ],
  },
  {
    dayName: 'Wednesday',
    slots: [
      { slotName: 'Breakfast', items: [{ foodId: 'rolled_oats', grams: 60 }, { foodId: 'whey_isolate', grams: 33 }, { foodId: 'almonds_soaked', grams: 20 }] },
      { slotName: 'Lunch', items: [{ foodId: 'rajma_curry', grams: 200 }, { foodId: 'brown_rice', grams: 160 }, { foodId: 'curd_dahi', grams: 150 }] },
      { slotName: 'Evening Pre-Workout', items: [{ foodId: 'chana_boiled', grams: 120 }] },
      { slotName: 'Dinner', items: [{ foodId: 'chicken_breast', grams: 180 }, { foodId: 'wheat_roti', grams: 80 }, { foodId: 'spinach_palak', grams: 120 }] },
    ],
  },
  {
    dayName: 'Thursday',
    slots: [
      { slotName: 'Breakfast', items: [{ foodId: 'egg_white', grams: 160 }, { foodId: 'wheat_roti', grams: 60 }, { foodId: 'curd_dahi', grams: 100 }] },
      { slotName: 'Lunch', items: [{ foodId: 'seer_fish', grams: 180 }, { foodId: 'brown_rice', grams: 160 }, { foodId: 'toor_dal', grams: 120 }] },
      { slotName: 'Evening Pre-Workout', items: [{ foodId: 'whey_isolate', grams: 33 }, { foodId: 'banana_fresh', grams: 100 }] },
      { slotName: 'Dinner', items: [{ foodId: 'soya_chunks', grams: 45 }, { foodId: 'wheat_roti', grams: 80 }, { foodId: 'spinach_palak', grams: 100 }] },
    ],
  },
  {
    dayName: 'Friday',
    slots: [
      { slotName: 'Breakfast', items: [{ foodId: 'whole_egg', grams: 100 }, { foodId: 'rolled_oats', grams: 50 }, { foodId: 'almonds_soaked', grams: 20 }] },
      { slotName: 'Lunch', items: [{ foodId: 'chicken_breast', grams: 180 }, { foodId: 'brown_rice', grams: 180 }, { foodId: 'curd_dahi', grams: 150 }] },
      { slotName: 'Evening Pre-Workout', items: [{ foodId: 'peanut_butter', grams: 25 }, { foodId: 'banana_fresh', grams: 120 }] },
      { slotName: 'Dinner', items: [{ foodId: 'paneer_raw', grams: 120 }, { foodId: 'moong_dal', grams: 150 }, { foodId: 'wheat_roti', grams: 60 }] },
    ],
  },
  {
    dayName: 'Saturday',
    slots: [
      { slotName: 'Breakfast', items: [{ foodId: 'idli_steamed', grams: 160 }, { foodId: 'toor_dal', grams: 150 }, { foodId: 'whey_isolate', grams: 33 }] },
      { slotName: 'Lunch', items: [{ foodId: 'chicken_breast', grams: 200 }, { foodId: 'brown_rice', grams: 180 }, { foodId: 'spinach_palak', grams: 150 }] },
      { slotName: 'Evening Pre-Workout', items: [{ foodId: 'chana_boiled', grams: 100 }, { foodId: 'almonds_soaked', grams: 15 }] },
      { slotName: 'Dinner', items: [{ foodId: 'seer_fish', grams: 160 }, { foodId: 'wheat_roti', grams: 80 }, { foodId: 'curd_dahi', grams: 120 }] },
    ],
  },
  {
    dayName: 'Sunday',
    slots: [
      { slotName: 'Breakfast', items: [{ foodId: 'whole_egg', grams: 150 }, { foodId: 'wheat_roti', grams: 60 }, { foodId: 'curd_dahi', grams: 120 }] },
      { slotName: 'Lunch', items: [{ foodId: 'rajma_curry', grams: 220 }, { foodId: 'brown_rice', grams: 160 }, { foodId: 'ghee_pure', grams: 10 }] },
      { slotName: 'Evening Pre-Workout', items: [{ foodId: 'whey_isolate', grams: 33 }, { foodId: 'banana_fresh', grams: 100 }] },
      { slotName: 'Dinner', items: [{ foodId: 'chicken_breast', grams: 180 }, { foodId: 'wheat_roti', grams: 80 }, { foodId: 'spinach_palak', grams: 120 }] },
    ],
  },
];
