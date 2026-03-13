import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import OptionButton from "./OptionButton";
import type { QuizState } from "./types";
import {
  AGE_RANGES, COUNTRIES, EDUCATION_LEVELS, GRADE_CLASSIFICATIONS,
  STUDY_GAPS, ENGLISH_TESTS, IELTS_SCORES, SUBJECTS, STUDY_LEVELS,
  DESTINATIONS, BUDGETS, SCHOLARSHIP_NEEDS, VISA_REFUSED_OPTIONS, CURRENT_VISA_OPTIONS,
} from "./constants";

interface StepProps {
  quiz: QuizState;
  update: (patch: Partial<QuizState>) => void;
}

const toggleMulti = (arr: string[], val: string, max: number): string[] => {
  if (arr.includes(val)) return arr.filter((x) => x !== val);
  if (arr.length < max) return [...arr, val];
  return arr;
};

export const Step1 = ({ quiz, update }: StepProps) => (
  <div className="space-y-8">
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-1 text-primary">How old are you?</h2>
      <p className="text-sm text-muted-foreground mb-4">Select your age range</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {AGE_RANGES.map((a) => (
          <OptionButton key={a} selected={quiz.ageRange === a} onClick={() => update({ ageRange: a })}>
            {a}
          </OptionButton>
        ))}
      </div>
    </div>
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-1 text-primary">Where are you currently based?</h2>
      <p className="text-sm text-muted-foreground mb-4">Select your current country of residence</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {COUNTRIES.map((c) => (
          <OptionButton key={c.name} selected={quiz.country === c.name} onClick={() => update({ country: c.name })}>
            <span className="text-lg">{c.emoji}</span> {c.name}
          </OptionButton>
        ))}
      </div>
      {quiz.country === "Other" && (
        <div className="mt-3">
          <Input placeholder="Enter your country" value={quiz.countryOther} onChange={(e) => update({ countryOther: e.target.value })} maxLength={60} />
        </div>
      )}
    </div>
  </div>
);

export const Step2 = ({ quiz, update }: StepProps) => (
  <div className="space-y-8">
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-1 text-primary">What's your highest qualification?</h2>
      <p className="text-sm text-muted-foreground mb-4">This helps us match the right study level</p>
      <div className="grid grid-cols-1 gap-2.5">
        {EDUCATION_LEVELS.map((l) => (
          <OptionButton key={l} selected={quiz.education === l} onClick={() => update({ education: l })}>
            {l}
          </OptionButton>
        ))}
      </div>
    </div>
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-1 text-primary">What grade/classification did you achieve?</h2>
      <p className="text-sm text-muted-foreground mb-4">Your academic performance</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {GRADE_CLASSIFICATIONS.map((g) => (
          <OptionButton key={g} selected={quiz.grade === g} onClick={() => update({ grade: g })}>
            {g}
          </OptionButton>
        ))}
      </div>
    </div>
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-1 text-primary">Do you have any study gaps?</h2>
      <p className="text-sm text-muted-foreground mb-4">Gaps between your qualifications</p>
      <div className="grid grid-cols-2 gap-2.5">
        {STUDY_GAPS.map((g) => (
          <OptionButton key={g} selected={quiz.studyGap === g} onClick={() => update({ studyGap: g })}>
            {g}
          </OptionButton>
        ))}
      </div>
      {quiz.studyGap && quiz.studyGap !== "No gaps" && (
        <div className="mt-3">
          <Label className="text-sm font-medium text-muted-foreground">Can you explain your study gap?</Label>
          <Input className="mt-1" placeholder="e.g. Working full-time, Family reasons" value={quiz.studyGapReason} onChange={(e) => update({ studyGapReason: e.target.value })} maxLength={200} />
        </div>
      )}
    </div>
  </div>
);

export const Step3 = ({ quiz, update }: StepProps) => (
  <div className="space-y-8">
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-1 text-primary">Do you have an English language qualification?</h2>
      <p className="text-sm text-muted-foreground mb-4">Select your English test</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {ENGLISH_TESTS.map((t) => (
          <OptionButton key={t} selected={quiz.englishTest === t} onClick={() => update({ englishTest: t, englishScore: "" })}>
            {t}
          </OptionButton>
        ))}
      </div>
    </div>
    {quiz.englishTest === "IELTS" && (
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-1 text-primary">What's your overall IELTS score?</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
          {IELTS_SCORES.map((s) => (
            <OptionButton key={s} selected={quiz.englishScore === s} onClick={() => update({ englishScore: s })}>
              {s}
            </OptionButton>
          ))}
        </div>
      </div>
    )}
    {quiz.englishTest && !["IELTS", "I don't have one yet", "English is my first language"].includes(quiz.englishTest) && (
      <div>
        <Label className="text-sm font-medium text-muted-foreground">What was your score?</Label>
        <Input className="mt-1" placeholder="Enter your score" value={quiz.englishScore} onChange={(e) => update({ englishScore: e.target.value })} maxLength={20} />
      </div>
    )}
  </div>
);

export const Step4 = ({ quiz, update }: StepProps) => (
  <div className="space-y-8">
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-1 text-primary">What subject area interests you?</h2>
      <p className="text-sm text-muted-foreground mb-4">Select up to 3 subjects</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {SUBJECTS.map((s) => (
          <OptionButton key={s} selected={quiz.subjects.includes(s)} onClick={() => update({ subjects: toggleMulti(quiz.subjects, s, 3) })}>
            {s}
          </OptionButton>
        ))}
      </div>
    </div>
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-1 text-primary">What study level are you looking for?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {STUDY_LEVELS.map((l) => (
          <OptionButton key={l} selected={quiz.studyLevel === l} onClick={() => update({ studyLevel: l })}>
            {l}
          </OptionButton>
        ))}
      </div>
    </div>
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-1 text-primary">Which countries interest you?</h2>
      <p className="text-sm text-muted-foreground mb-4">Select up to 3 destinations</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {DESTINATIONS.map((d) => (
          <OptionButton key={d.name} selected={quiz.destinations.includes(d.name)} onClick={() => update({ destinations: toggleMulti(quiz.destinations, d.name, 3) })}>
            <span className="text-lg">{d.emoji}</span> {d.name}
          </OptionButton>
        ))}
      </div>
    </div>
  </div>
);

export const Step5 = ({ quiz, update }: StepProps) => (
  <div className="space-y-8">
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-1 text-primary">What's your annual tuition budget?</h2>
      <p className="text-sm text-muted-foreground mb-4">This helps us filter courses within your range</p>
      <div className="grid grid-cols-1 gap-2.5">
        {BUDGETS.map((b) => (
          <OptionButton key={b} selected={quiz.budget === b} onClick={() => update({ budget: b })}>
            {b}
          </OptionButton>
        ))}
      </div>
    </div>
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-1 text-primary">Do you need a scholarship?</h2>
      <div className="grid grid-cols-1 gap-2.5">
        {SCHOLARSHIP_NEEDS.map((s) => (
          <OptionButton key={s} selected={quiz.needsScholarship === s} onClick={() => update({ needsScholarship: s })}>
            {s}
          </OptionButton>
        ))}
      </div>
    </div>
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-1 text-primary">Have you previously been refused a visa?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {VISA_REFUSED_OPTIONS.map((v) => (
          <OptionButton key={v} selected={quiz.visaRefused === v} onClick={() => update({ visaRefused: v, visaRefusedCountry: "" })}>
            {v}
          </OptionButton>
        ))}
      </div>
      {quiz.visaRefused && quiz.visaRefused !== "No never" && (
        <div className="mt-3">
          <Label className="text-sm font-medium text-muted-foreground">Which country refused your visa?</Label>
          <Input className="mt-1" placeholder="e.g. United Kingdom" value={quiz.visaRefusedCountry} onChange={(e) => update({ visaRefusedCountry: e.target.value })} maxLength={60} />
        </div>
      )}
    </div>
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-1 text-primary">Do you currently hold a valid visa?</h2>
      <div className="grid grid-cols-2 gap-2.5">
        {CURRENT_VISA_OPTIONS.map((v) => (
          <OptionButton key={v} selected={quiz.currentVisa === v} onClick={() => update({ currentVisa: v })}>
            {v}
          </OptionButton>
        ))}
      </div>
    </div>
  </div>
);
