'use client';

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { TerminalConsole } from '@/components/TerminalConsole';
import { Settings, User, Bell, Shield, Code, CreditCard, ChevronRight } from 'lucide-react';

export default function SettingsPage() {
  const sections = [
    { title: 'Profile Settings', desc: 'Manage your account details and preferences.', icon: User },
    { title: 'Notifications', desc: 'Configure how you receive alerts and updates.', icon: Bell },
    { title: 'Security & Auth', desc: 'Setup 2FA and manage active sessions.', icon: Shield },
    { title: 'API & Integrations', desc: 'Connect AWS, GCP, Azure and GitHub.', icon: Code },
    { title: 'Billing', desc: 'Manage your subscription and payment methods.', icon: CreditCard },
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
             <div key={section.title} className="glass p-6 rounded-2xl border border-border flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="flex items-center gap-6">
                   <div className="p-3 rounded-xl bg-accent/10 text-accent">
                      <section.icon size={24} />
                   </div>
                   <div>
                      <h4 className="font-bold text-lg">{section.title}</h4>
                      <p className="text-sm text-muted-foreground">{section.desc}</p>
                   </div>
                </div>
                <ChevronRight className="text-muted-foreground group-hover:text-accent transition-colors" size={20} />
             </div>
           ))}
        </div>

        <div className="mt-12 p-8 glass rounded-3xl border border-border border-dashed text-center max-w-4xl">
           <h3 className="text-xl font-bold mb-2 text-accent">Need Enterprise Support?</h3>
           <p className="text-muted-foreground mb-6">Connect with our engineering team for custom integrations or dedicated infrastructure.</p>
           <button className="px-8 py-3 bg-white text-black rounded-xl font-bold hover:scale-105 transition-all">
              Contact Engineering
           </button>
        </div>

        <TerminalConsole />
      </main>
    </div>
  );
}
