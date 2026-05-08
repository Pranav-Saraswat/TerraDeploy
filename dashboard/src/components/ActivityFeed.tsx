'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, Terminal, CheckCircle2, AlertTriangle, User } from 'lucide-react';

const activities = [
  { id: 1, type: 'deploy', user: 'Pranav', action: 'applied v2.4.0', target: 'AWS Prod', time: '10m ago', icon: GitCommit, color: 'text-blue-500' },
  { id: 2, type: 'alert', user: 'System', action: 'detected drift', target: 'GCP Staging', time: '25m ago', icon: AlertTriangle, color: 'text-yellow-500' },
  { id: 3, type: 'plan', user: 'Alice', action: 'generated plan', target: 'Azure Dev', time: '45m ago', icon: Terminal, color: 'text-muted-foreground' },
  { id: 4, type: 'success', user: 'Pranav', action: 'synced state', target: 'Multi-Cloud', time: '1h ago', icon: CheckCircle2, color: 'text-green-500' },
];

export const ActivityFeed = () => {
  return (
    <div className="glass rounded-2xl p-6 border border-border h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">Activity Feed</h3>
        <span className="text-[10px] font-bold bg-accent/20 text-accent px-2 py-0.5 rounded-full uppercase tracking-wider">Live</span>
      </div>
      <div className="space-y-6">
        {activities.map((item, idx) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex gap-4 relative"
          >
            {idx !== activities.length - 1 && (
              <div className="absolute left-[18px] top-10 bottom-[-24px] w-[1px] bg-border" />
            )}
            <div className={`w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-sm ${item.color}`}>
              <item.icon size={16} />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold">{item.user}</span>
                <span className="text-[10px] text-muted-foreground">{item.time}</span>
              </div>
              <p className="text-sm">
                <span className="text-muted-foreground">{item.action} on </span>
                <span className="font-semibold">{item.target}</span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      <button className="w-full mt-8 py-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors border border-dashed border-border rounded-xl">
        View Full History
      </button>
    </div>
  );
};
