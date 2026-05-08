'use client';

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { TerminalConsole } from '@/components/TerminalConsole';
import { Search, Database, Cpu, HardDrive, Network, Layers, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const resources = [
  { id: 'i-0a2b3c4d', name: 'api-server-prod', type: 'EC2 Instance', provider: 'AWS', region: 'us-east-1', status: 'Running' },
  { id: 'db-master', name: 'postgres-main', type: 'RDS Instance', provider: 'AWS', region: 'us-east-1', status: 'Available' },
  { id: 'gke-cluster', name: 'k8s-cluster', type: 'GKE Cluster', provider: 'GCP', region: 'us-central1', status: 'Healthy' },
  { id: 'st-01', name: 'assets-bucket', type: 'S3 Bucket', provider: 'AWS', region: 'global', status: 'Encrypted' },
  { id: 'vm-01', name: 'worker-node', type: 'Compute VM', provider: 'Azure', region: 'eastus', status: 'Running' },
];

export default function ResourcesPage() {
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
                <tr key={res.id} className="hover:bg-muted/20 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">{res.name}</span>
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
                    <button className="p-2 hover:bg-accent/10 hover:text-accent rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      <ExternalLink size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <TerminalConsole />
      </main>
    </div>
  );
}
