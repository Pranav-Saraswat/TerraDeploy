'use client';

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { TerminalConsole } from '@/components/TerminalConsole';
import { Activity, Zap, Cpu, MemoryStick as Memory, Globe, RefreshCw } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts';

const data = Array.from({ length: 20 }, (_, i) => ({
  time: `${i}:00`,
  cpu: 40 + Math.random() * 30,
  mem: 60 + Math.random() * 20,
}));

export default function MonitoringPage() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-y-auto pb-20">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              Infrastructure Monitoring
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </h2>
            <p className="text-muted-foreground mt-2">Real-time performance metrics and health checks for your multi-cloud nodes.</p>
          </div>
          <button className="px-4 py-2 glass border border-border rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-muted transition-colors">
             <RefreshCw size={16} /> Live Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
           {[
             { label: 'Avg. CPU Usage', value: '42.5%', icon: Cpu, color: 'text-blue-500' },
             { label: 'Memory Pressure', value: '68%', icon: Memory, color: 'text-purple-500' },
             { label: 'Req/sec', value: '1,240', icon: Zap, color: 'text-yellow-500' },
           ].map((m) => (
             <div key={m.label} className="glass p-6 rounded-2xl border border-border">
                <div className="flex items-center gap-3 mb-4">
                   <m.icon className={m.color} size={20} />
                   <span className="text-xs font-bold text-muted-foreground uppercase">{m.label}</span>
                </div>
                <h4 className="text-3xl font-bold">{m.value}</h4>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
           <div className="glass rounded-2xl border border-border p-8">
              <h3 className="font-bold mb-8">CPU Utilization (Last 24h)</h3>
              <div className="h-[300px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                       <defs>
                          <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                       <XAxis dataKey="time" axisLine={false} tickLine={false} stroke="#64748b" fontSize={10} />
                       <YAxis axisLine={false} tickLine={false} stroke="#64748b" fontSize={10} />
                       <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }} />
                       <Area type="monotone" dataKey="cpu" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCpu)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>
           <div className="glass rounded-2xl border border-border p-8">
              <h3 className="font-bold mb-8">Memory Consumption</h3>
              <div className="h-[300px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                       <XAxis dataKey="time" axisLine={false} tickLine={false} stroke="#64748b" fontSize={10} />
                       <YAxis axisLine={false} tickLine={false} stroke="#64748b" fontSize={10} />
                       <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }} />
                       <Line type="monotone" dataKey="mem" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                    </LineChart>
                 </ResponsiveContainer>
              </div>
           </div>
        </div>

        <TerminalConsole />
      </main>
    </div>
  );
}
