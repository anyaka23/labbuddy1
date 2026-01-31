import { motion } from "framer-motion";
import { 
  Beaker, 
  MessageSquare, 
  ScanLine, 
  BookOpen, 
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { GlowCard, StatCard } from "@/components/ui/glow-card";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: <BookOpen size={24} />, label: "Available Experiments", value: 48, trend: { value: 12, positive: true }, glowColor: "primary" as const },
  { icon: <ScanLine size={24} />, label: "Instruments Recognized", value: 156, trend: { value: 8, positive: true }, glowColor: "accent" as const },
  { icon: <MessageSquare size={24} />, label: "Questions Answered", value: "1.2K", trend: { value: 24, positive: true }, glowColor: "secondary" as const },
  { icon: <AlertTriangle size={24} />, label: "Errors Diagnosed", value: 89, trend: { value: 5, positive: true }, glowColor: "primary" as const },
];

const quickActions = [
  { 
    to: "/chat", 
    icon: <MessageSquare size={24} />, 
    title: "Ask AI Assistant",
    description: "Get real-time guidance for your experiments",
    color: "from-primary to-secondary"
  },
  { 
    to: "/recognize", 
    icon: <ScanLine size={24} />, 
    title: "Recognize Instrument",
    description: "Identify lab equipment instantly",
    color: "from-accent to-primary"
  },
  { 
    to: "/experiments", 
    icon: <BookOpen size={24} />, 
    title: "Browse Experiments",
    description: "Step-by-step guides for your lab sessions",
    color: "from-secondary to-accent"
  },
];

function Index() {
  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-display font-bold text-foreground"
            >
              Welcome to <span className="text-gradient">LAB-BUDDY</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground mt-2"
            >
              Your intelligent lab assistant. Get real-time guidance, diagnose equipment, and master your experiments.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/chat">
              <Button className="bg-gradient-primary hover:opacity-90 text-primary-foreground gap-2 shadow-glow-primary">
                <Sparkles size={18} />
                Start Experiment
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-display font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + 0.1 * index }}
              >
                <Link to={action.to}>
                  <GlowCard className="h-full group" glowColor={index === 0 ? "primary" : index === 1 ? "accent" : "secondary"}>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-primary-foreground mb-4`}>
                      {action.icon}
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">{action.description}</p>
                    <div className="flex items-center text-primary text-sm font-medium gap-1">
                      Get Started
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </GlowCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Featured Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <GlowCard className="relative overflow-hidden" glowColor="accent">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 flex items-center justify-between">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Zap size={20} className="text-accent" />
                  <span className="text-sm font-medium text-accent">AI-Powered</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                  Real-Time Error Diagnosis
                </h3>
                <p className="text-muted-foreground mb-4">
                  LAB-BUDDY uses advanced AI to detect faulty equipment and incorrect setups, 
                  helping you distinguish between instrument faults and user errors.
                </p>
                <Link to="/diagnosis">
                  <Button variant="outline" className="gap-2 border-accent/50 hover:bg-accent/10 hover:border-accent">
                    <AlertTriangle size={18} />
                    Run Diagnosis
                  </Button>
                </Link>
              </div>
              <div className="hidden lg:block">
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-40 h-40 bg-gradient-to-br from-accent/30 to-primary/30 rounded-2xl flex items-center justify-center"
                >
                  <Beaker size={64} className="text-accent" />
                </motion.div>
              </div>
            </div>
          </GlowCard>
        </motion.div>
      </div>
    </AppLayout>
  );
}

export default Index;
