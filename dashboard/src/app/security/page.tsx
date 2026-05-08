import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { TerminalConsole } from '@/components/TerminalConsole';
import { ShieldCheck, Lock, Eye, AlertTriangle, ShieldAlert, CheckCircle2, X, Terminal, Server } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SecurityPage() {
  const [selectedFinding, setSelectedFinding] = useState<any>(null);

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
                   { id: 'SEC-001', title: 'Public S3 Bucket Detected', severity: 'Critical', time: '2h ago', status: 'Fixed', desc: 'Resource s3://logs-prod-01 is publicly accessible.' },
                   { id: 'SEC-002', title: 'Over-privileged IAM User', severity: 'High', time: '1d ago', status: 'Pending', desc: 'User "deployer-01" has AdministratorAccess policy attached.' },
                   { id: 'SEC-003', title: 'Unencrypted EBS Volume', severity: 'Medium', time: '2d ago', status: 'In Review', desc: 'Volume vol-0a2b3c in us-east-1a is not encrypted.' },
                 ].map((finding) => (
                   <div 
                    key={finding.id} 
                    onClick={() => setSelectedFinding(finding)}
                    className="p-4 rounded-xl bg-white/5 border border-border hover:border-accent/50 transition-colors cursor-pointer group"
                   >
                      <div className="flex justify-between items-start mb-2">
                         <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${finding.severity === 'Critical' ? 'bg-red-500 animate-pulse' : 'bg-yellow-500'}`} />
                            <h4 className="text-sm font-bold group-hover:text-accent transition-colors">{finding.title}</h4>
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

        <AnimatePresence>
          {selectedFinding && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-lg glass border border-border rounded-3xl overflow-hidden"
              >
                <div className="p-6 border-b border-border flex justify-between items-center bg-white/2">
                   <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${selectedFinding.severity === 'Critical' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                      <h3 className="font-bold text-lg">{selectedFinding.id}</h3>
                   </div>
                   <button onClick={() => setSelectedFinding(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                      <X size={20} />
                   </button>
                </div>
                <div className="p-8 space-y-6">
                   <div>
                      <h4 className="text-xl font-bold mb-2">{selectedFinding.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{selectedFinding.desc}</p>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-white/5 border border-border">
                         <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Severity</p>
                         <p className={`font-bold ${selectedFinding.severity === 'Critical' ? 'text-red-500' : 'text-yellow-500'}`}>{selectedFinding.severity}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-border">
                         <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Status</p>
                         <p className="font-bold">{selectedFinding.status}</p>
                      </div>
                   </div>
                   <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
                      <div className="flex items-center gap-2 mb-2">
                         <ShieldCheck className="text-accent" size={16} />
                         <span className="text-xs font-bold text-accent">Remediation Guide</span>
                      </div>
                      <p className="text-[10px] text-blue-100/70 leading-relaxed">
                         Run `terraform plan` to see the proposed fix. This security finding can be resolved by updating the resource policy to restrict public access.
                      </p>
                   </div>
                   <div className="pt-6 border-t border-border flex justify-end gap-3">
                      <button className="px-6 py-2 bg-accent text-white rounded-xl text-sm font-bold shadow-lg shadow-accent/20 hover:scale-105 transition-all">
                         Auto-Remediate
                      </button>
                   </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <TerminalConsole />
      </main>
    </div>
  );
}
