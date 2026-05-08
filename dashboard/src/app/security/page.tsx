'use client';

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { TerminalConsole } from '@/components/TerminalConsole';
import { ShieldCheck, Lock, Eye, AlertTriangle, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SecurityPage() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-y-auto pb-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Security & Governance</h2>
            <p className="text-muted-foreground mt-2">Enforce policies and monitor vulnerabilities across your multi-cloud estate.</p>
          </div>
          <button className="px-6 py-2 bg-red-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-red-500/20">
             Run Security Scan
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
           {[
             { label: 'Security Score', value: '94/100', icon: ShieldCheck, color: 'text-green-500' },
             { label: 'Open Alerts', value: '3', icon: AlertTriangle, color: 'text-yellow-500' },
             { label: 'Encrypted Assets', value: '100%', icon: Lock, color: 'text-blue-500' },
             { label: 'Policy Violations', value: '0', icon: ShieldAlert, color: 'text-muted-foreground' },
           ].map((stat) => (
             <div key={stat.label} className="glass p-6 rounded-2xl border border-border">
                <div className="flex items-center gap-3 mb-2">
                   <stat.icon className={stat.color} size={18} />
                   <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</span>
                </div>
                <h4 className="text-2xl font-bold">{stat.value}</h4>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="glass rounded-2xl border border-border p-6">
              <h3 className="font-bold mb-6">Recent Findings</h3>
              <div className="space-y-4">
                 {[
                   { id: 'SEC-001', title: 'Public S3 Bucket Detected', severity: 'Critical', time: '2h ago', status: 'Fixed' },
                   { id: 'SEC-002', title: 'Over-privileged IAM User', severity: 'High', time: '1d ago', status: 'Pending' },
                   { id: 'SEC-003', title: 'Unencrypted EBS Volume', severity: 'Medium', time: '2d ago', status: 'In Review' },
                 ].map((finding) => (
                   <div key={finding.id} className="p-4 rounded-xl bg-white/5 border border-border hover:border-accent/50 transition-colors cursor-pointer group">
                      <div className="flex justify-between items-start mb-2">
                         <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${finding.severity === 'Critical' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                            <h4 className="text-sm font-bold">{finding.title}</h4>
                         </div>
                         <span className="text-[10px] font-mono text-muted-foreground">{finding.id}</span>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                         <span className="text-[10px] font-bold text-muted-foreground uppercase">{finding.time}</span>
                         <span className="text-xs font-bold text-accent group-hover:underline flex items-center gap-1">
                            Details <Eye size={12} />
                         </span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="glass rounded-2xl border border-border p-6">
              <h3 className="font-bold mb-6">OPA Policy Results</h3>
              <div className="space-y-4">
                 {[
                   { name: 'Enforce Tagging', status: 'Passing', count: 42 },
                   { name: 'Restrict Regions', status: 'Passing', count: 12 },
                   { name: 'No Public Access', status: 'Failing', count: 1 },
                 ].map((policy) => (
                   <div key={policy.name} className="flex justify-between items-center p-3 rounded-xl bg-white/2 border border-border">
                      <div className="flex items-center gap-3">
                         {policy.status === 'Passing' ? <CheckCircle2 size={18} className="text-green-500" /> : <ShieldAlert size={18} className="text-red-500" />}
                         <span className="text-sm font-medium">{policy.name}</span>
                      </div>
                      <span className="text-xs font-bold text-muted-foreground">{policy.count} checks</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        <TerminalConsole />
      </main>
    </div>
  );
}
