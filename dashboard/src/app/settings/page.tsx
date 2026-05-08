'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { TerminalConsole } from '@/components/TerminalConsole';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, User, Bell, Shield, Code, CreditCard, ChevronRight, X, Save } from 'lucide-react';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<any>(null);

  const sections = [
    { id: 'profile', title: 'Profile Settings', desc: 'Manage your account details and preferences.', icon: User },
    { id: 'notifications', title: 'Notifications', desc: 'Configure how you receive alerts and updates.', icon: Bell },
    { id: 'security', title: 'Security & Auth', desc: 'Setup 2FA and manage active sessions.', icon: Shield },
    { id: 'api', title: 'API & Integrations', desc: 'Connect AWS, GCP, Azure and GitHub.', icon: Code },
    { id: 'billing', title: 'Billing', desc: 'Manage your subscription and payment methods.', icon: CreditCard },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-y-auto pb-20">
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight">Platform Settings</h2>
          <p className="text-muted-foreground mt-2">Configure your environment, integrations, and personal preferences.</p>
        </div>

        <div className="max-w-4xl space-y-4">
           {sections.map((section) => (
             <motion.div 
               key={section.id} 
               onClick={() => setActiveSection(section)}
               whileHover={{ x: 5 }}
               className="glass p-6 rounded-2xl border border-border flex items-center justify-between hover:bg-white/5 transition-all cursor-pointer group"
             >
                <div className="flex items-center gap-6">
                   <div className="p-3 rounded-xl bg-accent/10 text-accent group-hover:scale-110 transition-transform">
                      <section.icon size={24} />
                   </div>
                   <div>
                      <h4 className="font-bold text-lg">{section.title}</h4>
                      <p className="text-sm text-muted-foreground">{section.desc}</p>
                   </div>
                </div>
                <ChevronRight className="text-muted-foreground group-hover:text-accent transition-colors" size={20} />
             </motion.div>
           ))}
        </div>

        <div className="mt-12 p-8 glass rounded-3xl border border-border border-dashed text-center max-w-4xl">
           <h3 className="text-xl font-bold mb-2 text-accent">Need Enterprise Support?</h3>
           <p className="text-muted-foreground mb-6">Connect with our engineering team for custom integrations or dedicated infrastructure.</p>
           <button className="px-8 py-3 bg-white text-black rounded-xl font-bold hover:scale-105 transition-all">
              Contact Engineering
           </button>
        </div>

        <AnimatePresence>
          {activeSection && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-lg glass border border-border rounded-3xl overflow-hidden"
              >
                <div className="p-6 border-b border-border flex justify-between items-center bg-white/2">
                   <div className="flex items-center gap-3">
                      <activeSection.icon size={20} className="text-accent" />
                      <h3 className="font-bold text-lg">{activeSection.title}</h3>
                   </div>
                   <button onClick={() => setActiveSection(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                      <X size={20} />
                   </button>
                </div>
                <div className="p-8 space-y-6">
                   <div className="space-y-4">
                      <div className="space-y-2">
                         <label className="text-xs font-bold text-muted-foreground uppercase">Configuration</label>
                         <div className="p-4 rounded-xl bg-white/5 border border-border">
                            <p className="text-sm">Manage your {activeSection.title.toLowerCase()} preferences here.</p>
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-bold text-muted-foreground uppercase">Status</label>
                         <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-sm">Verified & Active</span>
                         </div>
                      </div>
                   </div>
                   <div className="pt-6 border-t border-border flex justify-end gap-3">
                      <button onClick={() => setActiveSection(null)} className="px-6 py-2 rounded-xl text-sm font-bold hover:bg-white/5 transition-colors">
                         Cancel
                      </button>
                      <button className="px-6 py-2 bg-accent text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:scale-105 transition-all">
                         <Save size={16} /> Save Changes
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
