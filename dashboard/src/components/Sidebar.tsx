import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Globe, ShieldCheck, Activity, Settings, BarChart3, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/' },
  { icon: Globe, label: 'Deployments', path: '/deployments' },
  { icon: Database, label: 'Resources', path: '/resources' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Activity, label: 'Monitoring', path: '/monitoring' },
  { icon: ShieldCheck, label: 'Security', path: '/security' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const providers = [
  { name: 'AWS', status: 'online' },
  { name: 'GCP', status: 'online' },
  { name: 'Azure', status: 'maintenance' },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen glass border-r border-border sticky top-0 flex flex-col p-6">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-lg shadow-accent/20">
          <Activity className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">TerraDeploy</h1>
      </div>

      <nav className="flex-1 space-y-1">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-4 mb-4">Main Menu</p>
        {menuItems.map((item, idx) => {
          const isActive = pathname === item.path;
          return (
            <Link key={idx} href={item.path}>
              <motion.div
                whileHover={{ x: 5 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all mb-1 ${
                  isActive ? 'bg-accent/10 text-accent shadow-sm' : 'text-muted-foreground hover:bg-muted/50'
                }`}
              >
                <item.icon size={20} />
                <span className="font-semibold text-sm">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}

        <div className="pt-10 space-y-4">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-4 mb-2">Cloud Status</p>
          {providers.map((p) => (
            <div key={p.name} className="flex items-center justify-between px-4">
              <span className="text-sm font-medium text-muted-foreground">{p.name}</span>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${p.status === 'online' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-yellow-500'}`} />
                <span className="text-[10px] uppercase font-bold opacity-50">{p.status}</span>
              </div>
            </div>
          ))}
        </div>
      </nav>

      <div className="mt-auto pt-6 border-t border-border">
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-full border-2 border-accent/20 p-0.5">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Pranav" 
              alt="Avatar" 
              className="w-full h-full rounded-full bg-muted"
            />
          </div>
          <div>
            <p className="text-sm font-bold">Pranav Saraswat</p>
            <p className="text-[10px] font-bold text-accent uppercase tracking-wider">Enterprise Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
