import type { QuizState } from "./types";

const mapStudyLevelToDb = (level: string): string[] => {
  switch (level) {
    case "Foundation Year": return ["Foundation"];
    case "Undergraduate (Bachelor's)": return ["Undergraduate"];
    case "Postgraduate (Master's)": return ["Postgraduate"];
    case "PhD / Research": return ["Postgraduate"];
    case "Top-Up Degree": return ["Top-Up"];
    default: return [];
  }
};

const mapEducationToStudyLevels = (edu: string): string[] => {
  switch (edu) {
    case "High School / Secondary School": return ["Foundation", "Undergraduate"];
    case "Foundation / Diploma": return ["Undergraduate", "Top-Up"];
    case "Bachelor's Degree": return ["Postgraduate", "Top-Up"];
    case "Master's Degree": return ["Postgraduate"];
    case "PhD": return ["Postgraduate"];
    default: return [];
  }
};

export const getDbStudyLevels = (quiz: QuizState): string[] => {
  if (quiz.studyLevel) return mapStudyLevelToDb(quiz.studyLevel);
  return mapEducationToStudyLevels(quiz.education);
};

export const mapBudgetToMax = (budget: string): number | null => {
  switch (budget) {
    case "Under £10,000": return 10000;
    case "£10,000 - £15,000": return 15000;
    case "£15,000 - £20,000": return 20000;
    default: return null;
  }
};

export const calculateScore = (course: any, quiz: QuizState): number => {
  let score = 0;

  // Education level match (+30)
  const dbLevels = getDbStudyLevels(quiz);
  if (dbLevels.includes(course.study_level)) score += 30;

  // Grade classification (+20)
  const gradeMap: Record<string, number> = {
    "Distinction / First Class": 20,
    "Merit / Upper Second (2:1)": 18,
    "Pass / Lower Second (2:2)": 12,
    "Third Class / Pass": 8,
    "I don't know my equivalent": 10,
    "Not yet completed": 10,
  };
  score += gradeMap[quiz.grade] ?? 10;

  // English score (+15)
  if (quiz.englishTest === "English is my first language") {
    score += 15;
  } else if (quiz.englishTest === "IELTS") {
    const ieltsMap: Record<string, number> = {
      "7.5+": 15, "7.0": 15, "6.5": 14, "6.0": 12, "5.5": 8, "5.0": 5, "Below 5.0": 2,
    };
    score += ieltsMap[quiz.englishScore] ?? 5;
  } else if (quiz.englishTest === "I don't have one yet") {
    score += 3;
  } else {
    score += quiz.englishScore ? 10 : 5;
  }

  // Study gaps (+10)
  const gapMap: Record<string, number> = {
    "No gaps": 10,
    "1-2 years gap": 7,
    "3-5 years gap": 4,
    "More than 5 years gap": 1,
  };
  score += gapMap[quiz.studyGap] ?? 5;

  // Visa refusals (+10)
  const visaMap: Record<string, number> = {
    "No never": 10,
    "Yes once": 5,
    "Yes more than once": 0,
  };
  score += visaMap[quiz.visaRefused] ?? 5;

  // Age appropriate (+5)
  const ageAppropriate = () => {
    const level = course.study_level;
    const age = quiz.ageRange;
    if (level === "Foundation" || level === "Undergraduate") {
      return ["18-21", "22-25", "26-30"].includes(age);
    }
    if (level === "Postgraduate") {
      return ["22-25", "26-30", "31-35", "36-40"].includes(age);
    }
    return true;
  };
  if (ageAppropriate()) score += 5;

  // Budget covers tuition (+10)
  const maxBudget = mapBudgetToMax(quiz.budget);
  if (maxBudget === null || !course.tuition_fee || course.tuition_fee <= maxBudget) {
    score += 10;
  }

  return Math.min(score, 100);
};

export const getMatchLabel = (score: number): { label: string; color: string } => {
  if (score >= 80) return { label: "Strong Match", color: "bg-emerald-50 text-emerald-700 border-emerald-200" };
  if (score >= 60) return { label: "Good Match", color: "bg-teal-50 text-teal-700 border-teal-200" };
  if (score >= 40) return { label: "Possible Match", color: "bg-amber-50 text-amber-700 border-amber-200" };
  return { label: "Unlikely Match", color: "bg-gray-50 text-gray-500 border-gray-200" };
};
