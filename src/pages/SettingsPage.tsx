import { motion } from "framer-motion";
import { Settings, User, Bell, Palette, Volume2, Shield } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { GlowCard } from "@/components/ui/glow-card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="space-y-6 max-w-3xl">
        {/* Header */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-2"
          >
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              <Settings size={22} className="text-foreground" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Settings
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            Customize your LAB-BUDDY experience
          </motion.p>
        </div>

        <div className="space-y-4">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlowCard glowColor="primary" hover={false}>
              <div className="flex items-center gap-2 mb-4">
                <User size={18} className="text-primary" />
                <h3 className="font-display font-semibold text-foreground">Profile</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
                  S
                </div>
                <div>
                  <p className="font-medium text-foreground">Student User</p>
                  <p className="text-sm text-muted-foreground">student@university.edu</p>
                </div>
              </div>
            </GlowCard>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlowCard glowColor="secondary" hover={false}>
              <div className="flex items-center gap-2 mb-4">
                <Bell size={18} className="text-secondary" />
                <h3 className="font-display font-semibold text-foreground">Notifications</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="experiment-reminders" className="flex flex-col gap-1">
                    <span className="text-foreground">Experiment Reminders</span>
                    <span className="text-xs text-muted-foreground font-normal">Get notified before lab sessions</span>
                  </Label>
                  <Switch id="experiment-reminders" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="error-alerts" className="flex flex-col gap-1">
                    <span className="text-foreground">Error Alerts</span>
                    <span className="text-xs text-muted-foreground font-normal">Real-time diagnosis notifications</span>
                  </Label>
                  <Switch id="error-alerts" defaultChecked />
                </div>
              </div>
            </GlowCard>
          </motion.div>

          {/* Voice Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <GlowCard glowColor="accent" hover={false}>
              <div className="flex items-center gap-2 mb-4">
                <Volume2 size={18} className="text-accent" />
                <h3 className="font-display font-semibold text-foreground">Voice & Audio</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="voice-guidance" className="flex flex-col gap-1">
                    <span className="text-foreground">Voice Guidance</span>
                    <span className="text-xs text-muted-foreground font-normal">Enable spoken instructions</span>
                  </Label>
                  <Switch id="voice-guidance" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sound-effects" className="flex flex-col gap-1">
                    <span className="text-foreground">Sound Effects</span>
                    <span className="text-xs text-muted-foreground font-normal">Play sounds for alerts and actions</span>
                  </Label>
                  <Switch id="sound-effects" defaultChecked />
                </div>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}
