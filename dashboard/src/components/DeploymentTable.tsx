import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Clock, Globe, Terminal, Server } from 'lucide-react';

const deployments = [
  { id: 'DEP-001', env: 'Production', provider: 'AWS', status: 'Healthy', version: 'v2.4.0', time: '2h ago', region: 'us-east-1', resources: 42 },
  { id: 'DEP-002', env: 'Staging', provider: 'GCP', status: 'In Progress', version: 'v2.5.0-rc1', time: '15m ago', region: 'us-central1', resources: 12 },
  { id: 'DEP-003', env: 'Development', provider: 'Azure', status: 'Healthy', version: 'v2.5.0-beta', time: '5h ago', region: 'eastus', resources: 8 },
  { id: 'DEP-004', env: 'Production', provider: 'AWS', status: 'Drift Detected', version: 'v2.3.9', time: '1d ago', region: 'us-west-2', resources: 38 },
];

export const DeploymentTable = () => {
  const [selectedDep, setSelectedDep] = useState<any>(null);

  return (
    <>
      <div className="w-full rounded-2xl glass border border-border overflow-hidden">
        <div className="p-6 border-b border-border bg-white/2">
          <h3 className="text-lg font-bold">Recent Deployments</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-muted/50 text-muted-foreground text-[10px] uppercase font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Environment</th>
                <th className="px-6 py-4">Provider</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Version</th>
                <th className="px-6 py-4">Last Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {deployments.map((dep) => (
                <tr 
                  key={dep.id} 
                  onClick={() => setSelectedDep(dep)}
                  className="hover:bg-accent/5 transition-all cursor-pointer group"
                >
                  <td className="px-6 py-4 font-mono text-sm text-accent group-hover:underline">{dep.id}</td>
                  <td className="px-6 py-4 text-sm font-medium">{dep.env}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{dep.provider}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                      dep.status === 'Healthy' ? 'bg-green-500/10 text-green-500' :
                      dep.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500' :
                      'bg-red-500/10 text-red-500'
                    }`}>
                      {dep.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{dep.version}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{dep.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedDep && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDep(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md h-full glass border-l border-border shadow-2xl p-8 overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-10">
                <div>
                   <h2 className="text-2xl font-bold text-accent font-mono">{selectedDep.id}</h2>
                   <p className="text-sm text-muted-foreground mt-1">Deployment Details</p>
                </div>
                <button onClick={() => setSelectedDep(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                   <X size={20} />
                </button>
              </div>

              <div className="space-y-8">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-border">
                       <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <Globe size={14} />
                          <span className="text-[10px] font-bold uppercase">Provider</span>
                       </div>
                       <p className="font-bold">{selectedDep.provider}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-border">
                       <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <Server size={14} />
                          <span className="text-[10px] font-bold uppercase">Region</span>
                       </div>
                       <p className="font-bold">{selectedDep.region}</p>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2">Status Timeline</h4>
                    <div className="space-y-6 relative pl-6">
                       <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-border" />
                       {[
                         { title: 'Validation Success', time: '10s', status: 'done' },
                         { title: 'Terraform Plan', time: '45s', status: 'done' },
                         { title: 'Applying Changes', time: '2m 12s', status: selectedDep.status === 'In Progress' ? 'running' : 'done' },
                         { title: 'Health Check', time: '--', status: selectedDep.status === 'In Progress' ? 'pending' : 'done' },
                       ].map((item, i) => (
                         <div key={i} className="relative flex items-center justify-between">
                            <div className={`absolute -left-[23px] w-3 h-3 rounded-full border-2 border-background ${
                              item.status === 'done' ? 'bg-green-500' : item.status === 'running' ? 'bg-accent animate-pulse' : 'bg-muted'
                            }`} />
                            <span className="text-sm font-medium">{item.title}</span>
                            <span className="text-[10px] text-muted-foreground">{item.time}</span>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="p-6 rounded-2xl bg-accent/10 border border-accent/20">
                    <div className="flex items-center gap-3 mb-4">
                       <Terminal className="text-accent" size={18} />
                       <h4 className="font-bold text-sm">Deployment Summary</h4>
                    </div>
                    <p className="text-xs text-blue-100/70 leading-relaxed mb-4">
                       Infrastructure was successfully deployed to {selectedDep.region} with {selectedDep.resources} managed resources. No conflicts detected during sync.
                    </p>
                    <button className="w-full py-2 bg-accent text-white rounded-xl text-xs font-bold hover:bg-accent/80 transition-colors">
                       Download tfstate
                    </button>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
