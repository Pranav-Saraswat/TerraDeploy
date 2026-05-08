'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, RefreshCw, X, ArrowRight } from 'lucide-react';

interface DriftAlertProps {
  isVisible: boolean;
  onDismiss: () => void;
  onReconcile: () => void;
}

export const DriftAlert = ({ isVisible, onDismiss, onReconcile }: DriftAlertProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] w-full max-w-xl"
        >
          <div className="mx-4 p-1 rounded-2xl bg-gradient-to-r from-yellow-500/20 via-yellow-500/40 to-yellow-500/20 border border-yellow-500/50 backdrop-blur-xl shadow-[0_0_40px_rgba(234,179,8,0.2)]">
            <div className="bg-[#0f172a]/80 rounded-[14px] p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center shrink-0">
                <AlertTriangle className="text-yellow-500" size={24} />
              </div>
              
              <div className="flex-1">
                <h4 className="text-sm font-bold text-yellow-500">Infrastructure Drift Detected</h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Production environment has 3 resources out of sync with state.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={onReconcile}
                  className="px-4 py-2 bg-yellow-500 text-black text-xs font-bold rounded-lg hover:bg-yellow-400 transition-colors flex items-center gap-2"
                >
                  <RefreshCw size={14} /> Reconcile
                </button>
                <button 
                  onClick={onDismiss}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors text-muted-foreground"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
