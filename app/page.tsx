'use client';

import React from 'react';
import Dashboard from '@/components/Dashboard';
import AIChat from '@/components/AIChat';
import { mockFinancialProfile } from '@/lib/mockData';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Dashboard financialProfile={mockFinancialProfile} />
      <AIChat financialProfile={mockFinancialProfile} />
    </main>
  );
}