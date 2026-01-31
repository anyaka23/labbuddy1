import { motion } from "framer-motion";
import { ScanLine, Lightbulb, History } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { InstrumentRecognizer } from "@/components/instrument/InstrumentRecognizer";
import { GlowCard } from "@/components/ui/glow-card";

const recentRecognitions = [
  { instrument: "Digital Oscilloscope", time: "2 hours ago", confidence: 96 },
  { instrument: "Function Generator", time: "Yesterday", confidence: 92 },
  { instrument: "DC Power Supply", time: "2 days ago", confidence: 98 },
];

export default function RecognizePage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-2"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center shadow-glow-accent">
              <ScanLine size={22} className="text-accent-foreground" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Instrument Recognition
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            Upload an image of your lab equipment and get instant identification with usage tips
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Recognizer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <GlowCard glowColor="accent" hover={false}>
              <InstrumentRecognizer />
            </GlowCard>
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <GlowCard glowColor="primary">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb size={18} className="text-warning" />
                  <h3 className="font-display font-semibold text-foreground">Tips for Best Results</h3>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs flex-shrink-0">1</span>
                    Ensure good lighting without glare
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs flex-shrink-0">2</span>
                    Capture the entire instrument in frame
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs flex-shrink-0">3</span>
                    Include brand name/model if visible
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs flex-shrink-0">4</span>
                    Avoid blurry or cropped images
                  </li>
                </ul>
              </GlowCard>
            </motion.div>

            {/* Recent Recognitions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <GlowCard glowColor="secondary">
                <div className="flex items-center gap-2 mb-4">
                  <History size={18} className="text-secondary" />
                  <h3 className="font-display font-semibold text-foreground">Recent Scans</h3>
                </div>
                <div className="space-y-3">
                  {recentRecognitions.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.instrument}</p>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                      </div>
                      <span className="text-xs font-medium text-primary">{item.confidence}%</span>
                    </motion.div>
                  ))}
                </div>
              </GlowCard>
            </motion.div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
