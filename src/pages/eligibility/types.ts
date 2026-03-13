export interface QuizState {
  // Step 1
  ageRange: string;
  country: string;
  countryOther: string;
  // Step 2
  education: string;
  grade: string;
  studyGap: string;
  studyGapReason: string;
  // Step 3
  englishTest: string;
  englishScore: string;
  // Step 4
  subjects: string[];
  studyLevel: string;
  destinations: string[];
  // Step 5
  budget: string;
  needsScholarship: string;
  visaRefused: string;
  visaRefusedCountry: string;
  currentVisa: string;
}

export interface LeadForm {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  preferredStart: string;
  consent: boolean;
}

export interface ScoredCourse {
  id: string;
  title: string;
  slug: string;
  university_name: string;
  country: string;
  city: string;
  subject_area: string;
  study_level: string;
  duration: string | null;
  tuition_fee: number | null;
  intake_dates: string | null;
  description: string | null;
  scholarship_available: boolean | null;
  featured: boolean | null;
  entry_requirements: string | null;
  english_requirements: string | null;
  score: number;
  matchLabel: string;
  matchColor: string;
}
