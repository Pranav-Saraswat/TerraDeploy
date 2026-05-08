'use client';

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { TerminalConsole } from '@/components/TerminalConsole';
import { BarChart3, TrendingDown, DollarSign, PieChart, Calendar, ChevronDown } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, AreaChart, Area } from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
];

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-y-auto pb-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Cloud Analytics</h2>
            <p className="text-muted-foreground mt-2">Optimize your cloud spend and track utilization trends across all regions.</p>
          </div>
          <div className="flex gap-3">
             <button className="px-4 py-2 glass border border-border rounded-xl text-sm font-bold flex items-center gap-2">
               <Calendar size={16} /> Last 30 Days <ChevronDown size={14} />
             </button>
             <button className="px-6 py-2 bg-accent text-white rounded-xl text-sm font-bold shadow-lg shadow-accent/20">
               Generate Report
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
           <div className="lg:col-span-2 glass rounded-2xl border border-border p-8">
              <h3 className="text-lg font-bold mb-8">Cost Breakdown by Provider</h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#64748b" fontSize={12} />
                      <YAxis axisLine={false} tickLine={false} stroke="#64748b" fontSize={12} tickFormatter={(v) => `$${v}`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                      />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#3b82f6' : '#8b5cf6'} />
                        ))}
                      </Bar>
                   </BarChart>
                </ResponsiveContainer>
              </div>
           </div>
           <div className="space-y-6">
              <div className="glass p-6 rounded-2xl border border-border">
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Total Efficiency</p>
                <div className="flex justify-between items-end">
                   <h4 className="text-4xl font-bold">84%</h4>
                   <span className="text-green-500 font-bold text-sm flex items-center gap-1">
                     <TrendingDown size={14} /> -12% Waste
                   </span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full mt-4 overflow-hidden">
                   <div className="w-[84%] h-full bg-accent shadow-[0_0_12px_rgba(59,130,246,0.5)]" />
                </div>
              </div>
              <div className="glass p-6 rounded-2xl border border-border">
                 <h4 className="font-bold mb-4">Savings Recommendations</h4>
                 <div className="space-y-4">
                    {[
                      { title: 'Reserved Instances', save: '$420/mo', desc: 'Optimize AWS EC2 sizing' },
                      { title: 'Unused Disks', save: '$85/mo', desc: 'Delete orphaned EBS volumes' },
                      { title: 'Idle Load Balancers', save: '$32/mo', desc: 'Cleanup inactive ALBs' },
                    ].map((s) => (
                      <motion.div 
                        key={s.title} 
                        whileHover={{ x: 5 }}
                        className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-accent/50 cursor-pointer transition-all group"
                      >
                        <div className="flex justify-between font-bold text-sm">
                           <span className="group-hover:text-accent transition-colors">{s.title}</span>
                           <span className="text-green-500">{s.save}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1">{s.desc}</p>
                      </motion.div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        <TerminalConsole />
      </main>
    </div>
  );
}
