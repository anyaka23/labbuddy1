import { motion } from "framer-motion";
import { Clock, Users, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface Experiment {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  icon: string;
}

interface ExperimentCardProps {
  experiment: Experiment;
  index: number;
}

const difficultyColors = {
  Beginner: "bg-success/20 text-success",
  Intermediate: "bg-warning/20 text-warning",
  Advanced: "bg-destructive/20 text-destructive",
};

export function ExperimentCard({ experiment, index }: ExperimentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link to={`/experiments/${experiment.id}`}>
        <div className={cn(
          "group relative rounded-xl bg-card border border-border p-5",
          "hover:border-primary/50 transition-all duration-300",
          "hover:shadow-glow-primary cursor-pointer"
        )}>
          {/* Category Tag */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">{experiment.icon}</span>
            <span className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              difficultyColors[experiment.difficulty]
            )}>
              {experiment.difficulty}
            </span>
          </div>

          {/* Title & Description */}
          <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {experiment.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {experiment.description}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {experiment.duration}
              </span>
              <span className="px-2 py-0.5 bg-muted rounded-full">
                {experiment.category}
              </span>
            </div>
            <ChevronRight 
              size={18} 
              className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" 
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
