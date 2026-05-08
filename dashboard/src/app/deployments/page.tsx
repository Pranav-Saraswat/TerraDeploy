'use client';

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DeploymentTable } from '@/components/DeploymentTable';
import { TerminalConsole } from '@/components/TerminalConsole';
import { Search, Filter, Download, Plus, Play, History, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DeploymentsPage() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-y-auto pb-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Deployment History</h2>
            <p className="text-muted-foreground mt-2">Manage and monitor all infrastructure operations across clouds.</p>
          </div>
          <div className="flex gap-3">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <input 
                  type="text" 
                  placeholder="Search deployments..." 
                  className="pl-10 pr-4 py-2 bg-white/5 border border-border rounded-xl text-sm focus:outline-none focus:border-accent w-64"
                />
             </div>
             <button className="p-2 glass border border-border rounded-xl hover:bg-muted transition-colors">
               <Filter size={18} />
             </button>
             <button className="px-6 py-2 bg-accent text-white rounded-xl text-sm font-bold shadow-lg shadow-accent/20 hover:scale-105 transition-all flex items-center gap-2">
               <Plus size={18} /> New Batch
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
           <div className="glass p-6 rounded-2xl border border-border flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                <History size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Successful</p>
                <h4 className="text-2xl font-bold">142</h4>
              </div>
           </div>
           <div className="glass p-6 rounded-2xl border border-border flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Play size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <h4 className="text-2xl font-bold">3</h4>
              </div>
           </div>
           <div className="glass p-6 rounded-2xl border border-border flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Run Time</p>
                <h4 className="text-2xl font-bold">4m 12s</h4>
              </div>
           </div>
        </div>

        <DeploymentTable />

        <div className="mt-8 flex justify-center">
           <button className="px-6 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
             Load More History
           </button>
        </div>

        <TerminalConsole />
      </main>
    </div>
  );
}
