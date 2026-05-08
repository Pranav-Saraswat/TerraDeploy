'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cloud, Server, Shield, Rocket, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface DeploymentWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeploymentWizard = ({ isOpen, onClose }: DeploymentWizardProps) => {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState({
    provider: '',
    environment: 'dev',
    region: 'us-east-1',
    planOnly: true
  });

  const steps = [
    { id: 1, title: 'Provider', icon: Cloud },
    { id: 2, title: 'Config', icon: Server },
    { id: 3, title: 'Review', icon: Shield },
    { id: 4, title: 'Deploy', icon: Rocket },
  ];

  const handleNext = () => setStep((s) => Math.min(s + 1, 4));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-2xl glass border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
          <div>
            <h2 className="text-xl font-bold">New Deployment</h2>
            <p className="text-sm text-muted-foreground">Configure your multi-cloud infrastructure</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex justify-between px-10 py-6 bg-white/2">
          {steps.map((s) => (
            <div key={s.id} className="flex flex-col items-center gap-2 relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                step >= s.id ? 'bg-accent border-accent text-white shadow-lg shadow-accent/40' : 'border-white/10 text-muted-foreground'
              }`}>
                <s.icon size={18} />
              </div>
              <span className={`text-xs font-semibold ${step >= s.id ? 'text-white' : 'text-muted-foreground'}`}>{s.title}</span>
              {s.id < 4 && (
                <div className={`absolute top-5 left-14 w-20 h-[2px] ${step > s.id ? 'bg-accent' : 'bg-white/10'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="p-10 min-h-[300px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { id: 'aws', name: 'AWS', icon: 'cloud-lightning', desc: 'Amazon Web Services' },
                  { id: 'gcp', name: 'GCP', icon: 'globe', desc: 'Google Cloud Platform' },
                  { id: 'azure', name: 'Azure', icon: 'database', desc: 'Microsoft Azure' },
                  { id: 'multi', name: 'Multi-Cloud', icon: 'zap', desc: 'Hybrid Infrastructure' },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setConfig({ ...config, provider: p.id })}
                    className={`p-6 rounded-2xl border-2 text-left transition-all hover:scale-[1.02] ${
                      config.provider === p.id ? 'border-accent bg-accent/10 shadow-lg shadow-accent/5' : 'border-white/5 bg-white/2 hover:border-white/20'
                    }`}
                  >
                    <h4 className="font-bold text-lg">{p.name}</h4>
                    <p className="text-sm text-muted-foreground">{p.desc}</p>
                  </button>
                ))}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-muted-foreground">Environment</label>
                  <div className="flex gap-3">
                    {['dev', 'staging', 'prod'].map((env) => (
                      <button
                        key={env}
                        onClick={() => setConfig({ ...config, environment: env })}
                        className={`flex-1 py-3 rounded-xl border text-sm font-bold capitalize transition-all ${
                          config.environment === env ? 'bg-accent border-accent text-white' : 'border-white/10 hover:border-white/30'
                        }`}
                      >
                        {env}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-muted-foreground">Region</label>
                  <select 
                    value={config.region}
                    onChange={(e) => setConfig({ ...config, region: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-accent"
                  >
                    <option value="us-east-1">US East (N. Virginia)</option>
                    <option value="us-west-2">US West (Oregon)</option>
                    <option value="eu-central-1">Europe (Frankfurt)</option>
                    <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
                  </select>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-4"
              >
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Provider</span>
                    <span className="font-bold uppercase text-accent">{config.provider}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Environment</span>
                    <span className="font-bold capitalize">{config.environment}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Region</span>
                    <span className="font-bold">{config.region}</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex gap-3">
                  <AlertCircle className="text-blue-500 shrink-0" size={20} />
                  <p className="text-xs text-blue-200/80 leading-relaxed">
                    This action will run a `terraform plan` first. You will be able to review the changes before they are applied to your live infrastructure.
                  </p>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="text-green-500 w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Ready to Deploy</h3>
                  <p className="text-muted-foreground mt-2">All configurations are validated and the Terraform state is locked.</p>
                </div>
                <button className="mt-6 px-10 py-4 bg-accent text-white rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-accent/20">
                  Launch Stack
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex justify-between bg-white/2">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="px-6 py-2 rounded-xl text-sm font-semibold hover:bg-white/5 disabled:opacity-30 transition-colors"
          >
            Back
          </button>
          {step < 4 && (
            <button
              onClick={handleNext}
              disabled={!config.provider && step === 1}
              className="px-6 py-2 bg-white text-black rounded-xl text-sm font-bold hover:bg-white/90 disabled:opacity-30 transition-all flex items-center gap-2"
            >
              Next <ChevronRight size={16} />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
