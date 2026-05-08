'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { StatCard } from '@/components/StatCard';
import { DeploymentTable } from '@/components/DeploymentTable';
import { DeploymentWizard } from '@/components/DeploymentWizard';
import { ActivityFeed } from '@/components/ActivityFeed';
import { DriftAlert } from '@/components/DriftAlert';
import { TerminalConsole } from '@/components/TerminalConsole';
import { Activity, Cloud, DollarSign, ShieldAlert, RefreshCw, Zap, Server, Globe, ShieldCheck, Lock, TrendingUp, Cpu } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const costData = [
  { name: 'Mon', cost: 400 },
  { name: 'Tue', cost: 300 },
  { name: 'Wed', cost: 600 },
  { name: 'Thu', cost: 800 },
  { name: 'Fri', cost: 500 },
  { name: 'Sat', cost: 900 },
  { name: 'Sun', cost: 700 },
];

export default function Home() {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isDriftVisible, setIsDriftVisible] = useState(true);

  const fetchStatus = async () => {
    setRefreshing(true);
    try {
      const res = await fetch('/api/status');
      const data = await res.json();
      setStatus(data);
    } catch (err) {
      console.error("Failed to fetch status", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // Auto refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              Infrastructure Overview
              {refreshing && <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><RefreshCw size={20} className="text-accent" /></motion.div>}
            </h2>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-wider border border-green-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Live Sync Active
              </div>
              <p className="text-muted-foreground text-sm">
                {loading ? 'Initializing platform connection...' : `Last updated: ${new Date(status?.last_sync).toLocaleTimeString()}`}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="hidden lg:flex items-center gap-6 px-6 py-2 glass rounded-2xl border border-border mr-2">
               <div className="flex items-center gap-2">
                 <Cloud size={14} className="text-blue-400" />
                 <span className="text-xs font-bold">AWS</span>
               </div>
               <div className="flex items-center gap-2">
                 <Globe size={14} className="text-red-400" />
                 <span className="text-xs font-bold">GCP</span>
               </div>
               <div className="flex items-center gap-2">
                 <Zap size={14} className="text-yellow-400" />
                 <span className="text-xs font-bold">Azure</span>
               </div>
            </div>
            <button 
              onClick={fetchStatus}
              className="px-4 py-2 glass rounded-xl text-sm font-semibold hover:bg-muted transition-colors flex items-center gap-2"
            >
              <RefreshCw size={16} />
            </button>
            <button 
              onClick={() => setIsWizardOpen(true)}
              className="px-6 py-2 bg-accent text-white rounded-xl text-sm font-bold hover:bg-accent/80 transition-all shadow-lg shadow-accent/20 hover:scale-105 active:scale-95"
            >
              New Deployment
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
            >
              <StatCard 
                title="Total Resources" 
                value={(status?.environments?.prod?.deployments + status?.environments?.dev?.deployments).toString() || "0"} 
                change="+12%" 
                icon={Cloud} 
                trend="up" 
                href="/resources"
              />
              <div className="relative group">
                <div className="absolute -top-2 -right-2 z-10 bg-accent text-[8px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-1 animate-bounce">
                  <Cpu size={8} /> AI PREDICTION
                </div>
                <StatCard 
                  title="Predicted Burn" 
                  value="$14,205" 
                  change="+8.4%" 
                  icon={TrendingUp} 
                  trend="up" 
                  href="/analytics"
                />
              </div>
              <StatCard 
                title="Avg. Health Score" 
                value={`${(status?.environments?.prod?.health * 100).toFixed(1)}%`} 
                change="+0.5%" 
                icon={Activity} 
                trend="up" 
                href="/monitoring"
              />
              <StatCard 
                title="Security Posture" 
                value="94/100" 
                change="+2" 
                icon={ShieldCheck} 
                trend="up" 
                href="/security"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2 glass rounded-2xl p-6 border border-border">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Cloud Spending (Last 7 Days)</h3>
              <select className="bg-transparent border-none text-sm text-muted-foreground focus:ring-0 cursor-pointer">
                <option>All Providers</option>
                <option>AWS</option>
                <option>GCP</option>
                <option>Azure</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={costData}>
                  <defs>
                    <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                    itemStyle={{ color: '#f8fafc' }}
                  />
                  <Area type="monotone" dataKey="cost" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorCost)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-1">
            <ActivityFeed />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-10">
          <div className="lg:col-span-1 glass rounded-2xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="text-accent" size={20} />
              <h3 className="text-lg font-bold">Security Compliance</h3>
            </div>
            <div className="space-y-4">
               {[
                { label: 'IAM Policies', value: '92%', status: 'success' },
                { label: 'Network Security', value: '85%', status: 'warning' },
                { label: 'Data Encryption', value: '100%', status: 'success' },
               ].map((item) => (
                 <div key={item.label} className="space-y-1.5">
                   <div className="flex justify-between text-xs font-bold">
                     <span className="text-muted-foreground">{item.label}</span>
                     <span>{item.value}</span>
                   </div>
                   <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                     <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: item.value }}
                       className={`h-full ${item.status === 'success' ? 'bg-green-500' : 'bg-yellow-500'}`}
                     />
                   </div>
                 </div>
               ))}
            </div>
          </div>
          <div className="lg:col-span-3">
            <DeploymentTable />
          </div>
        </div>
        
        <DeploymentWizard 
          isOpen={isWizardOpen} 
          onClose={() => setIsWizardOpen(false)} 
        />

        <DriftAlert 
          isVisible={isDriftVisible} 
          onDismiss={() => setIsDriftVisible(false)}
          onReconcile={() => {
            setIsDriftVisible(false);
            setIsWizardOpen(true);
          }}
        />

        <TerminalConsole />
      </main>
    </div>
  );
}
