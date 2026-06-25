/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Heart, Settings, Activity, BookOpen, Layers } from 'lucide-react';
import DocumentView from './components/DocumentView';
import PrototypePlayground from './components/PrototypePlayground';

export default function App() {
  const [activeTab, setActiveTab] = useState<'document' | 'playground'>('document');

  return (
    <div className="min-h-screen bg-[#F4F1EE] flex flex-col font-sans selection:bg-[#D32F2F] selection:text-white pb-12">
      
      {/* Top Bold Header Bar */}
      <header className="border-b-4 border-[#1A1A1A] bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Branding logo and title */}
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 border-2 border-[#1A1A1A] bg-[#D32F2F] flex items-center justify-center text-white shadow-[3px_3px_0px_0px_#1A1A1A]">
                <Heart className="h-6 w-6 fill-white" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#D32F2F] uppercase block">
                  SYSTEM ARCHITECTURE & BUSINESS ANALYSIS
                </span>
                <h1 className="text-xl font-black text-[#1A1A1A] uppercase tracking-tight leading-none">
                  BDMS CENTRAL REGISTER
                </h1>
              </div>
            </div>

            {/* Quick Status / Regulatory disclaimer */}
            <div className="flex items-center justify-between sm:justify-end gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] font-bold shadow-[2px_2px_0px_0px_#1A1A1A]">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse border border-[#1A1A1A]" />
                <span>LIVE REPL: 2026</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[#D32F2F] text-white border-2 border-[#1A1A1A] font-bold shadow-[2px_2px_0px_0px_#1A1A1A]">
                <Activity className="h-3.5 w-3.5" />
                <span>SECURE AES-256</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Welcome Banner - Swiss design with massive typography */}
      <div className="border-b-2 border-[#1A1A1A] bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-block bg-[#1A1A1A] text-white text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1">
                SYSTEM DESIGN SPECIFICATION & WORKING PROTOTYPE
              </div>
              <h2 className="title-massive text-[#1A1A1A]">
                BLOOD DONOR<br />
                <span className="text-[#D32F2F]">MANAGEMENT</span>
              </h2>
              <p className="text-sm font-medium text-[#1A1A1A]/80 max-w-3xl leading-relaxed">
                Detailing centralized digital infrastructure built for medical safety, automatic 56-day replenishment tracking, and secure logical deletion workflows. Select a mode below to read the core documentation or verify eligibility parameters in the interactive prototype.
              </p>
            </div>

            {/* Workspace tabs - brutalist tab design */}
            <div className="flex gap-2 p-1.5 bg-[#F4F1EE] border-2 border-[#1A1A1A] self-start shadow-[3px_3px_0px_0px_#1A1A1A]">
              <button
                id="tab-btn-doc"
                onClick={() => setActiveTab('document')}
                className={`flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-all border-2 ${
                  activeTab === 'document'
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                    : 'bg-white text-[#1A1A1A] border-transparent hover:border-[#1A1A1A]'
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                1. System Design Doc
              </button>
              <button
                id="tab-btn-play"
                onClick={() => setActiveTab('playground')}
                className={`flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-all border-2 ${
                  activeTab === 'playground'
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                    : 'bg-white text-[#1A1A1A] border-transparent hover:border-[#1A1A1A]'
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                2. Live Prototype
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'document' ? (
          <DocumentView onGoToPrototype={() => setActiveTab('playground')} />
        ) : (
          <PrototypePlayground />
        )}
      </main>

      {/* Footer block */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="border-t-2 border-[#1A1A1A] pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono font-bold uppercase tracking-wider text-[#1A1A1A]/75">
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4 text-[#D32F2F]" />
            <span>SPEC: BDMS-SWISS-2026 V1.4</span>
          </div>
          <div>
            <span>REGULATED UNDER HEALTH SAFETY TRUST PROTOCOLS</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

