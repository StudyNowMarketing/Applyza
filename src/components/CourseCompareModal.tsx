import { X, Check, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface CompareCourse {
  id: string;
  title: string;
  slug: string;
  university_name: string;
  country: string;
  city: string;
  study_level: string;
  duration: string | null;
  tuition_fee: number | null;
  entry_requirements: string | null;
  english_requirements: string | null;
  intake_dates: string | null;
  scholarship_available: boolean | null;
}

interface CourseCompareModalProps {
  courses: CompareCourse[];
  onClose: () => void;
}

const rows: { label: string; key: keyof CompareCourse | "location" | "scholarship" }[] = [
  { label: "University", key: "university_name" },
  { label: "Course Title", key: "title" },
  { label: "Study Level", key: "study_level" },
  { label: "Duration", key: "duration" },
  { label: "Tuition Fee", key: "tuition_fee" },
  { label: "Entry Requirements", key: "entry_requirements" },
  { label: "English Requirements", key: "english_requirements" },
  { label: "Intake Dates", key: "intake_dates" },
  { label: "Scholarship Available", key: "scholarship" },
  { label: "Location", key: "location" },
];

const CourseCompareModal = ({ courses, onClose }: CourseCompareModalProps) => {
  const lowestFee = Math.min(...courses.map((c) => c.tuition_fee ?? Infinity));

  const getCellValue = (course: CompareCourse, row: typeof rows[0]) => {
    if (row.key === "location") return `${course.city}, ${course.country}`;
    if (row.key === "scholarship") return course.scholarship_available;
    if (row.key === "tuition_fee") return course.tuition_fee;
    return (course as any)[row.key];
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
      style={{ background: "rgba(10,13,36,0.7)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="bg-white rounded-2xl shadow-2xl m-4 mt-20 mb-10 w-full max-w-5xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold" style={{ color: "#1B2150" }}>Compare Courses</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-3 w-40">
                  Feature
                </th>
                {courses.map((c) => (
                  <th key={c.id} className="text-left px-4 py-3">
                    <p className="text-[11px] text-gray-400 font-medium">{c.university_name}</p>
                    <p className="text-sm font-bold" style={{ color: "#1B2150" }}>{c.title}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-gray-50">
                  <td className="text-xs font-semibold text-gray-500 px-6 py-3.5">{row.label}</td>
                  {courses.map((course) => {
                    const val = getCellValue(course, row);

                    if (row.key === "scholarship") {
                      return (
                        <td key={course.id} className="px-4 py-3.5">
                          {val ? (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: "#2EC4B6" }}>
                              <Check size={12} /> Yes
                            </span>
                          ) : (
                            <span className="text-gray-400"><Minus size={14} /></span>
                          )}
                        </td>
                      );
                    }

                    if (row.key === "tuition_fee") {
                      const fee = val as number | null;
                      const isLowest = fee !== null && fee === lowestFee && courses.length > 1;
                      return (
                        <td key={course.id} className="px-4 py-3.5">
                          <span className={`text-sm font-semibold ${isLowest ? "" : ""}`}
                            style={isLowest ? { color: "#2EC4B6" } : { color: "#1B2150" }}>
                            {fee !== null ? `£${fee.toLocaleString()}/yr` : "—"}
                          </span>
                          {isLowest && <span className="ml-1.5 text-[10px] font-medium" style={{ color: "#2EC4B6" }}>Best value</span>}
                        </td>
                      );
                    }

                    return (
                      <td key={course.id} className="px-4 py-3.5 text-sm text-gray-700">
                        {val || "—"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Apply buttons */}
        <div className="flex gap-4 px-6 py-5 border-t border-gray-100">
          {courses.map((c) => (
            <div key={c.id} className="flex-1 flex flex-col gap-2">
              <Button asChild size="sm" className="w-full rounded-lg text-xs" style={{ background: "#2EC4B6", color: "#0a0d24" }}>
                <Link to="/book-a-consultation">Apply with Applyza</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="w-full rounded-lg text-xs" style={{ borderColor: "#1B2150", color: "#1B2150" }}>
                <Link to={`/find-a-course/${c.slug}`}>View Details</Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="px-6 pb-5">
          <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
            ← Back to Search
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CourseCompareModal;
