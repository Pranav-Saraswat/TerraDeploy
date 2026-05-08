'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { TerminalConsole } from '@/components/TerminalConsole';
import { Search, Database, Cpu, HardDrive, Network, Layers, ExternalLink, X, Settings, Shield, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const resources = [
  { id: 'i-0a2b3c4d', name: 'api-server-prod', type: 'EC2 Instance', provider: 'AWS', region: 'us-east-1', status: 'Running', ip: '54.12.33.1', cost: '$12/mo' },
  { id: 'db-master', name: 'postgres-main', type: 'RDS Instance', provider: 'AWS', region: 'us-east-1', status: 'Available', ip: '10.0.1.4', cost: '$85/mo' },
  { id: 'gke-cluster', name: 'k8s-cluster', type: 'GKE Cluster', provider: 'GCP', region: 'us-central1', status: 'Healthy', ip: '34.2.11.9', cost: '$120/mo' },
  { id: 'st-01', name: 'assets-bucket', type: 'S3 Bucket', provider: 'AWS', region: 'global', status: 'Encrypted', ip: 'n/a', cost: '$4/mo' },
  { id: 'vm-01', name: 'worker-node', type: 'Compute VM', provider: 'Azure', region: 'eastus', status: 'Running', ip: '13.1.55.2', cost: '$18/mo' },
];

export default function ResourcesPage() {
  const [selectedResource, setSelectedResource] = useState<any>(null);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-y-auto pb-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Resource Inventory</h2>
            <p className="text-muted-foreground mt-2">Explore and manage all active cloud assets in one unified view.</p>
          </div>
          <div className="flex gap-3">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <input 
                  type="text" 
                  placeholder="Filter resources..." 
                  className="pl-10 pr-4 py-2 bg-white/5 border border-border rounded-xl text-sm focus:outline-none focus:border-accent w-80"
                />
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Compute', count: 24, icon: Cpu, color: 'text-blue-500' },
            { label: 'Databases', count: 8, icon: Database, color: 'text-purple-500' },
            { label: 'Storage', count: 12, icon: HardDrive, color: 'text-green-500' },
            { label: 'Networking', count: 32, icon: Network, color: 'text-yellow-500' },
          ].map((item) => (
            <div key={item.label} className="glass p-6 rounded-2xl border border-border">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${item.color}`}>
                  <item.icon size={20} />
                </div>
                <span className="text-2xl font-bold">{item.count}</span>
              </div>
              <h4 className="font-semibold text-sm">{item.label}</h4>
            </div>
          ))}
        </div>

        <div className="glass rounded-2xl border border-border overflow-hidden">
          <div className="p-6 border-b border-border bg-white/2 flex justify-between items-center">
            <h3 className="font-bold">Active Resources</h3>
            <span className="text-xs text-muted-foreground">{resources.length} total objects</span>
          </div>
          <table className="w-full text-left">
            <thead className="bg-muted/30 text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Provider</th>
                <th className="px-6 py-4">Region</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {resources.map((res) => (
                <tr 
                  key={res.id} 
                  onClick={() => setSelectedResource(res)}
                  className="hover:bg-accent/5 transition-all cursor-pointer group"
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold group-hover:text-accent transition-colors">{res.name}</span>
                      <span className="text-[10px] font-mono text-muted-foreground">{res.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-muted-foreground">{res.type}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-md bg-white/5 border border-border text-[10px] font-bold">
                      {res.provider}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{res.region}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-2 text-xs font-bold text-green-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      {res.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-accent/10 hover:text-accent rounded-lg transition-colors">
                      <ExternalLink size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AnimatePresence>
          {selectedResource && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="w-full max-w-2xl glass border border-border rounded-3xl overflow-hidden shadow-2xl"
              >
                <div className="p-6 border-b border-border flex justify-between items-center bg-white/2">
                   <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-accent/10 text-accent">
                         <Database size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{selectedResource.name}</h3>
                        <p className="text-[10px] font-mono text-muted-foreground">{selectedResource.id}</p>
                      </div>
                   </div>
                   <button onClick={() => setSelectedResource(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                      <X size={20} />
                   </button>
                </div>
                <div className="p-8 grid grid-cols-2 gap-8">
                   <div className="space-y-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Metadata</label>
                         <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                               <span className="text-muted-foreground">Type</span>
                               <span className="font-bold">{selectedResource.type}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                               <span className="text-muted-foreground">Provider</span>
                               <span className="font-bold">{selectedResource.provider}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                               <span className="text-muted-foreground">Region</span>
                               <span className="font-bold">{selectedResource.region}</span>
                            </div>
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Network</label>
                         <div className="p-3 rounded-xl bg-white/5 border border-border flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">IP Address</span>
                            <span className="text-xs font-mono font-bold">{selectedResource.ip}</span>
                         </div>
                      </div>
                   </div>
                   <div className="space-y-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Security & Compliance</label>
                         <div className="flex items-center gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                            <Shield className="text-green-500" size={18} />
                            <span className="text-xs font-bold text-green-500">Security Groups Validated</span>
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Cost Impact</label>
                         <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
                            <p className="text-sm font-bold text-accent">Current Run Rate: {selectedResource.cost}</p>
                            <p className="text-[10px] text-muted-foreground mt-1">Estimating based on US-East average pricing.</p>
                         </div>
                      </div>
                   </div>
                </div>
                <div className="p-6 border-t border-border bg-white/2 flex justify-end gap-3">
                   <button className="px-6 py-2 rounded-xl text-sm font-bold border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-colors">
                      Terminate
                   </button>
                   <button className="px-6 py-2 bg-accent text-white rounded-xl text-sm font-bold shadow-lg shadow-accent/20 hover:scale-105 transition-all">
                      Configure
                   </button>
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
