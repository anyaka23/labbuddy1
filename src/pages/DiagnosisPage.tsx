import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, XCircle, Loader2, Zap, Wrench, User } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { GlowCard } from "@/components/ui/glow-card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface DiagnosisResult {
  status: "success" | "warning" | "error";
  title: string;
  description: string;
  cause: "instrument" | "user" | "both";
  suggestions: string[];
}

export default function DiagnosisPage() {
  const [symptoms, setSymptoms] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const handleDiagnose = async () => {
    if (!symptoms.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI diagnosis
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const mockResults: DiagnosisResult[] = [
      {
        status: "warning",
        title: "Incorrect Probe Compensation",
        description: "The oscilloscope probe appears to be under-compensated or over-compensated, causing inaccurate waveform readings.",
        cause: "user",
        suggestions: [
          "Connect probe to the PROBE COMP output on the oscilloscope",
          "Adjust the compensation screw on the probe while observing the square wave",
          "The top of the square wave should be flat - not rounded or have overshoot",
          "Re-measure your signal after proper compensation"
        ]
      },
      {
        status: "error",
        title: "Faulty Instrument Detected",
        description: "The readings suggest a potential hardware malfunction in the measurement device.",
        cause: "instrument",
        suggestions: [
          "Try using a different channel on the instrument",
          "Test with a known good signal source",
          "Report the issue to lab staff for inspection",
          "Use an alternative instrument if available"
        ]
      },
      {
        status: "success",
        title: "Setup Verified",
        description: "Your equipment setup appears to be correct. The readings are within expected parameters.",
        cause: "user",
        suggestions: [
          "Proceed with your experiment",
          "Document your current settings for reference",
          "Take multiple readings for statistical accuracy"
        ]
      }
    ];
    
    // Pick random result for demo
    const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
    setResult(randomResult);
    setIsAnalyzing(false);
  };

  const statusConfig = {
    success: { icon: CheckCircle2, color: "text-success", bg: "bg-success/20" },
    warning: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/20" },
    error: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/20" },
  };

  const causeConfig = {
    instrument: { icon: Wrench, label: "Instrument Issue", color: "text-destructive" },
    user: { icon: User, label: "Setup/Usage Issue", color: "text-warning" },
    both: { icon: AlertTriangle, label: "Multiple Factors", color: "text-primary" },
  };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-2"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-destructive to-warning flex items-center justify-center shadow-glow-primary">
              <AlertTriangle size={22} className="text-destructive-foreground" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Error Diagnosis
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            Describe your problem and let AI determine if it's a faulty instrument or incorrect usage
          </motion.p>
        </div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlowCard glowColor="primary" hover={false}>
            <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Zap size={18} className="text-primary" />
              Describe the Problem
            </h3>
            <Textarea
              placeholder="Example: My oscilloscope shows a noisy signal even when there's no input connected. The waveform keeps flickering and the readings are unstable..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="min-h-[120px] bg-muted/50 border-border mb-4"
            />
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Include: instrument type, observed behavior, expected vs actual readings
              </p>
              <Button
                onClick={handleDiagnose}
                disabled={!symptoms.trim() || isAnalyzing}
                className="bg-gradient-primary hover:opacity-90 text-primary-foreground gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <AlertTriangle size={18} />
                    Run Diagnosis
                  </>
                )}
              </Button>
            </div>
          </GlowCard>
        </motion.div>

        {/* Result Section */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GlowCard 
              glowColor={result.status === "error" ? "primary" : result.status === "warning" ? "accent" : "secondary"} 
              hover={false}
            >
              {/* Status Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    statusConfig[result.status].bg
                  )}>
                    {(() => {
                      const Icon = statusConfig[result.status].icon;
                      return <Icon size={24} className={statusConfig[result.status].color} />;
                    })()}
                  </div>
                  <div>
                    <p className={cn("text-sm font-medium", statusConfig[result.status].color)}>
                      Diagnosis Complete
                    </p>
                    <h3 className="text-xl font-display font-bold text-foreground">
                      {result.title}
                    </h3>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full">
                  {(() => {
                    const Icon = causeConfig[result.cause].icon;
                    return (
                      <>
                        <Icon size={14} className={causeConfig[result.cause].color} />
                        <span className={cn("text-xs font-medium", causeConfig[result.cause].color)}>
                          {causeConfig[result.cause].label}
                        </span>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6">
                {result.description}
              </p>

              {/* Suggestions */}
              <div className="border-t border-border pt-6">
                <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
                  <Wrench size={16} className="text-primary" />
                  Recommended Actions
                </h4>
                <div className="space-y-3">
                  {result.suggestions.map((suggestion, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                    >
                      <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary flex-shrink-0">
                        {index + 1}
                      </span>
                      <p className="text-sm text-foreground">{suggestion}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </GlowCard>
          </motion.div>
        )}

        {/* Quick Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { icon: "🔌", title: "Check Connections", desc: "Loose cables are the #1 cause of issues" },
            { icon: "⚙️", title: "Verify Settings", desc: "Wrong range settings give incorrect readings" },
            { icon: "🔋", title: "Power Cycle", desc: "Restart the instrument if behavior is erratic" },
          ].map((tip, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <span className="text-2xl mb-2 block">{tip.icon}</span>
              <h4 className="font-medium text-foreground text-sm">{tip.title}</h4>
              <p className="text-xs text-muted-foreground">{tip.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </AppLayout>
  );
}
