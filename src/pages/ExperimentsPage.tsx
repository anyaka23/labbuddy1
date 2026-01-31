import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Search, Filter } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ExperimentCard, Experiment } from "@/components/experiments/ExperimentCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const experiments: Experiment[] = [
  {
    id: "1",
    title: "Ohm's Law Verification",
    description: "Verify the relationship between voltage, current, and resistance using a resistor circuit.",
    category: "Electronics",
    duration: "45 min",
    difficulty: "Beginner",
    icon: "⚡"
  },
  {
    id: "2",
    title: "Oscilloscope Waveform Analysis",
    description: "Learn to measure and analyze AC waveforms including amplitude, frequency, and phase.",
    category: "Electronics",
    duration: "60 min",
    difficulty: "Intermediate",
    icon: "📊"
  },
  {
    id: "3",
    title: "RC Time Constant",
    description: "Study the charging and discharging behavior of capacitors in RC circuits.",
    category: "Electronics",
    duration: "50 min",
    difficulty: "Intermediate",
    icon: "🔋"
  },
  {
    id: "4",
    title: "Transistor Characteristics",
    description: "Plot and analyze input/output characteristics of BJT transistors.",
    category: "Electronics",
    duration: "75 min",
    difficulty: "Advanced",
    icon: "🔌"
  },
  {
    id: "5",
    title: "pH Measurement & Buffers",
    description: "Measure pH of solutions and prepare buffer systems for biological applications.",
    category: "Chemistry",
    duration: "40 min",
    difficulty: "Beginner",
    icon: "🧪"
  },
  {
    id: "6",
    title: "Microscopy Fundamentals",
    description: "Learn proper microscope operation, focusing techniques, and sample preparation.",
    category: "Biology",
    duration: "55 min",
    difficulty: "Beginner",
    icon: "🔬"
  },
  {
    id: "7",
    title: "Spectrophotometry Analysis",
    description: "Use spectrophotometer to determine concentration of colored solutions.",
    category: "Chemistry",
    duration: "60 min",
    difficulty: "Intermediate",
    icon: "🌈"
  },
  {
    id: "8",
    title: "Op-Amp Configurations",
    description: "Build and test inverting, non-inverting, and differential amplifier circuits.",
    category: "Electronics",
    duration: "90 min",
    difficulty: "Advanced",
    icon: "📈"
  },
];

const categories = ["All", "Electronics", "Chemistry", "Biology", "Physics"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

export default function ExperimentsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const filteredExperiments = experiments.filter(exp => {
    const matchesSearch = exp.title.toLowerCase().includes(search.toLowerCase()) ||
                         exp.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || exp.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || exp.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-2"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow-primary">
                <BookOpen size={22} className="text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-display font-bold text-foreground">
                Experiment Library
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground"
            >
              Step-by-step guides for your laboratory sessions
            </motion.p>
          </div>
        </div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search experiments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11 bg-card border-border h-12"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-muted-foreground" />
              <div className="flex gap-1">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "text-xs",
                      selectedCategory === cat 
                        ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                        : "hover:bg-muted"
                    )}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="flex gap-1 ml-auto">
              {difficulties.map((diff) => (
                <Button
                  key={diff}
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedDifficulty(diff)}
                  className={cn(
                    "text-xs",
                    selectedDifficulty === diff 
                      ? "bg-secondary text-secondary-foreground hover:bg-secondary/90" 
                      : "hover:bg-muted"
                  )}
                >
                  {diff}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Experiments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredExperiments.map((experiment, index) => (
            <ExperimentCard key={experiment.id} experiment={experiment} index={index} />
          ))}
        </div>

        {filteredExperiments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-lg font-medium text-foreground">No experiments found</p>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
}
