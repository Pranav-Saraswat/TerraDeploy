'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { StatCard } from '@/components/StatCard';
import { DeploymentTable } from '@/components/DeploymentTable';
import { Activity, Cloud, DollarSign, ShieldAlert, RefreshCw } from 'lucide-react';
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
            <h2 className="text-3xl font-bold flex items-center gap-3">
              Infrastructure Overview
              {refreshing && <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><RefreshCw size={20} className="text-accent" /></motion.div>}
            </h2>
            <p className="text-muted-foreground mt-1">
              {loading ? 'Initializing platform connection...' : `System status: ${status?.status} | Last synced: ${new Date(status?.last_sync).toLocaleTimeString()}`}
            </p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={fetchStatus}
              className="px-4 py-2 glass rounded-xl text-sm font-semibold hover:bg-muted transition-colors flex items-center gap-2"
            >
              <RefreshCw size={16} /> Force Sync
            </button>
            <button className="px-4 py-2 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-accent/80 transition-shadow shadow-lg shadow-accent/20">
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
              />
              <StatCard 
                title="Monthly Burn Rate" 
                value="$12,450" 
                change="-4.2%" 
                icon={DollarSign} 
                trend="down" 
              />
              <StatCard 
                title="Avg. Health Score" 
                value={`${(status?.environments?.prod?.health * 100).toFixed(1)}%`} 
                change="+0.5%" 
                icon={Activity} 
                trend="up" 
              />
              <StatCard 
                title="Active Security Alerts" 
                value="3" 
                change="+2" 
                icon={ShieldAlert} 
                trend="up" 
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

          <div className="glass rounded-2xl p-6 border border-border">
            <h3 className="text-lg font-bold mb-6">Security Posture</h3>
            <div className="space-y-4">
              {[
                { title: 'Public S3 Bucket', status: 'Critical', color: 'text-red-500' },
                { title: 'Unencrypted EBS', status: 'Warning', color: 'text-yellow-500' },
                { title: 'IAM Over-privileged', status: 'Review', color: 'text-blue-500' },
                { title: 'VPC Flow Logs Disabled', status: 'Policy', color: 'text-muted-foreground' },
              ].map((alert, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/30 transition-colors">
                  <span className="text-sm">{alert.title}</span>
                  <span className={`text-[10px] font-bold uppercase ${alert.color}`}>{alert.status}</span>
                </div>
              ))}
              <div className="pt-4 border-t border-border mt-4">
                <button className="w-full py-2 bg-muted rounded-xl text-xs font-bold hover:bg-muted/80 transition-colors">
                  View Security Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>

        <DeploymentTable />
      </main>
    </div>
  );
}
