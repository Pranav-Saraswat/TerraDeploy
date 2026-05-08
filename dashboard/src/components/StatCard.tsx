'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: 'up' | 'down';
  href?: string;
}

export const StatCard = ({ title, value, change, icon: Icon, trend, href }: StatCardProps) => {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={href ? { scale: 1.02, y: -5 } : { scale: 1.02 }}
      className={`p-6 rounded-2xl glass border border-border h-full ${href ? 'cursor-pointer hover:border-accent/30' : ''}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 rounded-xl bg-accent/10">
          <Icon className="text-accent" size={24} />
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
          trend === 'up' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
        }`}>
          {change}
        </span>
      </div>
      <p className="text-sm text-muted-foreground font-medium">{title}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
};
