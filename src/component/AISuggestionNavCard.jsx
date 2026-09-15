import React from 'react';
import { Sparkles, ArrowRight, Recycle, Scissors, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function AISuggestionNavCard({ onClick }) {

    const navigate=useNavigate()
  return (
    <div
      onClick={()=>navigate('/ai-suggest')}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      className=" w-full max-w-md mx-auto rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white p-5 shadow-xl border border-emerald-500/20 hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-900/40 transition-all duration-300 cursor-pointer overflow-hidden active:scale-[0.98]"
    >
      {/* Background Accent Glows */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl group-hover:bg-emerald-400/30 transition-colors pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-teal-500/20 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header Badge */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/20 border border-emerald-400/30 rounded-xl text-emerald-300 group-hover:scale-110 transition-transform duration-300">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <span className="text-[11px] font-semibold tracking-wide uppercase text-emerald-300 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            AI Craft Assistant
          </span>
        </div>
        <div className="p-1.5 rounded-full bg-white/5 text-slate-400 group-hover:text-white group-hover:bg-emerald-500 group-hover:translate-x-1 transition-all">
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* Main Content Title */}
      <h3 className="font-bold text-xl text-white mb-1 group-hover:text-emerald-200 transition-colors">
        Upload Scrap & Get Craft Ideas
      </h3>
      <p className="text-xs text-emerald-100/70 mb-4 leading-relaxed">
        Snap a picture of cardboard, bottles, or fabric to instantly discover upcycling & DIY projects.
      </p>

      {/* Visual Feature Tags */}
      <div className="flex items-center justify-between pt-3 border-t border-white/10">
        <div className="flex gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-300/80 bg-white/5 px-2.5 py-1 rounded-lg">
            <Recycle className="w-3 h-3 text-emerald-400" /> Recycle
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-teal-300/80 bg-white/5 px-2.5 py-1 rounded-lg">
            <Scissors className="w-3 h-3 text-teal-400" /> Handicrafts
          </span>
        </div>

        <span className="text-xs font-semibold text-emerald-400 group-hover:underline flex items-center gap-1">
          Scan Now <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </div>
  );
}