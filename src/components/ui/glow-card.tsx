import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "primary" | "accent" | "secondary";
  hover?: boolean;
}

export function GlowCard({ children, className, glowColor = "primary", hover = true }: GlowCardProps) {
  const glowClasses = {
    primary: "before:bg-gradient-primary",
    accent: "before:bg-gradient-accent",
    secondary: "before:from-secondary before:to-primary",
  };

  return (
    <motion.div
      className={cn(
        "relative rounded-xl bg-card p-6",
        "before:absolute before:inset-[-1px] before:rounded-xl before:z-[-1]",
        "before:opacity-30 before:transition-opacity before:duration-300",
        glowClasses[glowColor],
        hover && "hover:before:opacity-60",
        className
      )}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
    >
      {children}
    </motion.div>
  );
}

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  trend?: { value: number; positive: boolean };
  glowColor?: "primary" | "accent" | "secondary";
}

export function StatCard({ icon, label, value, trend, glowColor = "primary" }: StatCardProps) {
  return (
    <GlowCard glowColor={glowColor} className="p-5">
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-primary">
          {icon}
        </div>
        {trend && (
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            trend.positive ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
          )}>
            {trend.positive ? "+" : ""}{trend.value}%
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-muted-foreground text-sm">{label}</p>
        <p className="text-2xl font-display font-bold text-foreground mt-1">{value}</p>
      </div>
    </GlowCard>
  );
}
