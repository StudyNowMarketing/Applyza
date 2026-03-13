import { X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export interface ComparedCourse {
  id: string;
  title: string;
  university_name: string;
}

interface CourseCompareBarProps {
  courses: ComparedCourse[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onCompare: () => void;
}

const CourseCompareBar = ({ courses, onRemove, onClear, onCompare }: CourseCompareBarProps) => (
  <AnimatePresence>
    {courses.length > 0 && (
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed bottom-24 left-4 right-4 z-40 md:left-auto md:right-6 md:max-w-lg"
      >
        <div className="bg-white rounded-xl shadow-2xl p-4" style={{ border: "1px solid hsl(230 25% 93%)" }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Compare ({courses.length}/3)
            </span>
            <button onClick={onClear} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              Clear
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {courses.map((c) => (
              <span
                key={c.id}
                className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-full"
                style={{ background: "rgba(46,196,182,0.1)", color: "#2EC4B6", border: "1px solid rgba(46,196,182,0.2)" }}
              >
                {c.title.length > 30 ? c.title.slice(0, 30) + "…" : c.title}
                <button onClick={() => onRemove(c.id)} className="hover:bg-secondary/20 rounded-full p-0.5">
                  <X size={10} />
                </button>
              </span>
            ))}
          </div>
          <Button
            onClick={onCompare}
            disabled={courses.length < 2}
            className="w-full rounded-lg text-sm"
            style={{ background: courses.length >= 2 ? "#2EC4B6" : undefined, color: courses.length >= 2 ? "#0a0d24" : undefined }}
          >
            Compare {courses.length} Course{courses.length !== 1 ? "s" : ""} <ArrowRight size={14} className="ml-1" />
          </Button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default CourseCompareBar;
