import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  MessageSquare, 
  ScanLine, 
  BookOpen, 
  AlertTriangle,
  Settings,
  Beaker,
  LogOut,
  LogIn
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";

interface NavItemProps {
  to: string;
  icon: ReactNode;
  label: string;
  isActive: boolean;
}

function NavItem({ to, icon, label, isActive }: NavItemProps) {
  return (
    <Link to={to}>
      <motion.div
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300",
          "hover:bg-muted group relative",
          isActive && "bg-gradient-primary text-primary-foreground"
        )}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
      >
        {isActive && (
          <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent rounded-r-full"
            layoutId="activeIndicator"
          />
        )}
        <span className={cn(
          "transition-colors",
          isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
        )}>
          {icon}
        </span>
        <span className={cn(
          "font-medium text-sm",
          isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
        )}>
          {label}
        </span>
      </motion.div>
    </Link>
  );
}

interface AppLayoutProps {
  children: ReactNode;
  user?: User | null;
}

export function AppLayout({ children, user }: AppLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out successfully");
      navigate("/");
    }
  };

  const navItems = [
    { to: "/", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { to: "/chat", icon: <MessageSquare size={20} />, label: "AI Assistant" },
    { to: "/recognize", icon: <ScanLine size={20} />, label: "Recognize" },
    { to: "/experiments", icon: <BookOpen size={20} />, label: "Experiments" },
    { to: "/diagnosis", icon: <AlertTriangle size={20} />, label: "Diagnosis" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col fixed h-full z-50"
      >
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow-primary">
              <Beaker className="text-primary-foreground" size={22} />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-foreground">LAB-BUDDY</h1>
              <p className="text-xs text-muted-foreground">Intelligent Lab Assistant</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              {...item}
              isActive={location.pathname === item.to}
            />
          ))}
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-sidebar-border">
          <NavItem
            to="/settings"
            icon={<Settings size={20} />}
            label="Settings"
            isActive={location.pathname === "/settings"}
          />
          
          {user ? (
            <motion.button
              onClick={handleLogout}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 w-full mt-1",
                "hover:bg-muted group relative text-muted-foreground hover:text-foreground"
              )}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut size={20} />
              <span className="font-medium text-sm">Logout</span>
            </motion.button>
          ) : (
            <NavItem
              to="/auth"
              icon={<LogIn size={20} />}
              label="Login"
              isActive={location.pathname === "/auth"}
            />
          )}
          
          <div className="mt-4 p-4 rounded-lg glass">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full status-online" />
              <span className="text-xs text-muted-foreground">AI Status</span>
            </div>
            <p className="text-sm font-medium text-foreground">Online & Ready</p>
            {user && (
              <p className="text-xs text-muted-foreground mt-1 truncate">
                {user.email}
              </p>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-8"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
