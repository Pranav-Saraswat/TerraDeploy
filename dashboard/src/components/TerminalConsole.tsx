'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, ChevronUp, ChevronDown, Trash2, Play, Square } from 'lucide-react';

const INITIAL_LOGS = [
  { type: 'info', text: 'Initializing TerraDeploy Core v2.4.0...' },
  { type: 'info', text: 'Backend: Multi-Cloud Engine connected.' },
  { type: 'success', text: 'Terraform State: Locked (Production).' },
  { type: 'info', text: 'Scanning AWS us-east-1 for changes...' },
];

export const TerminalConsole = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        const newLog = {
          type: Math.random() > 0.8 ? 'warning' : 'info',
          text: `[${new Date().toLocaleTimeString()}] Observed resource check: ${Math.random().toString(36).substring(7)}`,
        };
        setLogs(prev => [...prev.slice(-49), newLog]);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className={`fixed bottom-0 left-64 right-0 z-40 transition-all duration-500 ease-in-out ${isOpen ? 'h-80' : 'h-12'}`}>
      <div className="mx-8 h-full glass border-t border-x border-border rounded-t-2xl overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.4)]">
        {/* Toolbar */}
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="h-12 bg-white/5 border-b border-border flex items-center justify-between px-6 cursor-pointer hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center gap-3">
            <TerminalIcon size={16} className="text-accent" />
            <span className="text-xs font-bold uppercase tracking-widest opacity-80">System Console</span>
            <span className="text-[10px] bg-accent/20 text-accent px-2 py-0.5 rounded-md font-mono">STDOUT</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 pr-4 border-r border-border">
               <button className="p-1 hover:bg-white/10 rounded-md text-muted-foreground"><Play size={14} /></button>
               <button className="p-1 hover:bg-white/10 rounded-md text-muted-foreground"><Trash2 size={14} onClick={(e) => { e.stopPropagation(); setLogs([]); }} /></button>
            </div>
            {isOpen ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </div>
        </div>

        {/* Console Output */}
        <div 
          ref={scrollRef}
          className="p-6 font-mono text-[13px] overflow-y-auto h-[calc(100%-48px)] bg-black/40 backdrop-blur-md"
        >
          {logs.map((log, i) => (
            <div key={i} className="mb-1 flex gap-3">
              <span className="opacity-30 select-none w-4">{i + 1}</span>
              <span className={
                log.type === 'success' ? 'text-green-500' : 
                log.type === 'warning' ? 'text-yellow-500' : 
                'text-blue-400'
              }>
                {log.type === 'success' ? '✔' : log.type === 'warning' ? '!' : 'ℹ'}
              </span>
              <span className="text-slate-300">{log.text}</span>
            </div>
          ))}
          <div className="flex gap-3 animate-pulse">
            <span className="opacity-30 select-none w-4">{logs.length + 1}</span>
            <span className="text-accent">_</span>
          </div>
        </div>
      </div>
    </div>
  );
};
