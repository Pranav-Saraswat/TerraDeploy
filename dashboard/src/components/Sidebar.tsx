import React from 'react';
import { LayoutDashboard, Globe, ShieldCheck, Activity, Settings, BarChart3, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', active: true },
  { icon: Globe, label: 'Deployments' },
  { icon: Database, label: 'Resources' },
  { icon: BarChart3, label: 'Cost Analytics' },
  { icon: Activity, label: 'Monitoring' },
  { icon: ShieldCheck, label: 'Security' },
  { icon: Settings, label: 'Settings' },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 h-screen glass border-r border-border sticky top-0 flex flex-col p-6">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
          <Activity className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold gradient-text">TerraDeploy</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ x: 5 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
              item.active ? 'bg-accent/10 text-accent' : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </motion.div>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-border">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Pranav" alt="Avatar" />
          </div>
          <div>
            <p className="text-sm font-semibold">Pranav Saraswat</p>
            <p className="text-xs text-muted-foreground">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
