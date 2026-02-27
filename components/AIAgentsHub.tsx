import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, Activity, Search, Plus, Play, Square, Settings, 
  Clock, CheckCircle2, AlertCircle, ChevronLeft, ChevronDown,
  FileText, Database, Microscope, Zap, Sparkles, X, Loader2,
  Terminal
} from 'lucide-react';

const toPersianNum = (num: number | string) => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, (x) => persianDigits[parseInt(x)]);
};

const AGENTS = [
  { id: 1, name: 'عامل خلاصه‌سازی جلسات', category: 'نوشتن', status: 'active', lastRun: '۲ دقیقه پیش', desc: 'متن پیاده‌سازی شده جلسات را دریافت کرده و مصوبات، وظایف و نکات کلیدی را استخراج می‌کند.', runs: 142, successRate: 98, sparkline: [20, 35, 25, 45, 30, 50, 40, 60, 55, 70] },
  { id: 2, name: 'عامل استخراج داده', category: 'داده', status: 'idle', lastRun: '۱ ساعت پیش', desc: 'داده‌های ساختارنیافته را از ایمیل‌ها و فایل‌های PDF استخراج کرده و در دیتابیس ذخیره می‌کند.', runs: 856, successRate: 94, sparkline: [60, 50, 70, 40, 55, 45, 65, 50, 60, 55] },
  { id: 3, name: 'عامل همگام‌سازی API', category: 'اتوماسیون', status: 'failed', lastRun: '۵ ساعت پیش', desc: 'اطلاعات کاربران را بین سیستم CRM و پلتفرم مارکتینگ همگام‌سازی می‌کند.', runs: 1205, successRate: 89, sparkline: [80, 75, 85, 70, 60, 40, 20, 10, 5, 0] },
  { id: 4, name: 'عامل پیش‌نویس مستندات', category: 'نوشتن', status: 'active', lastRun: 'هم‌اکنون', desc: 'بر اساس کامیت‌های گیت‌هاب، پیش‌نویس مستندات فنی و ریلیز نوت‌ها را آماده می‌کند.', runs: 45, successRate: 100, sparkline: [10, 15, 20, 25, 30, 40, 50, 65, 80, 95] },
  { id: 5, name: 'عامل تحقیق و پژوهش', category: 'پژوهش', status: 'pending', lastRun: 'دیروز', desc: 'اخبار و مقالات مرتبط با صنعت را رصد کرده و گزارش‌های تحلیلی هفتگی تولید می‌کند.', runs: 12, successRate: 100, sparkline: [5, 10, 5, 15, 10, 20, 15, 25, 20, 30] },
  { id: 6, name: 'عامل ساخت پروژه', category: 'اتوماسیون', status: 'idle', lastRun: '۳ روز پیش', desc: 'ساختار اولیه پروژه‌های جدید را بر اساس قالب‌های استاندارد شرکت ایجاد می‌کند.', runs: 8, successRate: 100, sparkline: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30] },
];

const CATEGORIES = [
  { id: 'all', label: 'همه عوامل', icon: Bot },
  { id: 'نوشتن', label: 'نوشتن و محتوا', icon: FileText },
  { id: 'داده', label: 'پردازش داده', icon: Database },
  { id: 'پژوهش', label: 'تحقیق و پژوهش', icon: Microscope },
  { id: 'اتوماسیون', label: 'اتوماسیون', icon: Zap },
];

const RUN_HISTORY = [
  { id: 1, status: 'success', time: '۱۴:۳۲', duration: '۱۲ ثانیه', log: 'پردازش فایل transcript_q2.txt با موفقیت انجام شد. ۳ مصوبه و ۵ وظیفه استخراج شد.' },
  { id: 2, status: 'success', time: '۱۲:۱۵', duration: '۸ ثانیه', log: 'پردازش فایل sync_meeting.txt با موفقیت انجام شد. ۲ مصوبه استخراج شد.' },
  { id: 3, status: 'failed', time: '۰۹:۴۵', duration: '۴۵ ثانیه', log: 'خطا در ارتباط با API. تایم‌اوت در دریافت پاسخ از سرور.' },
  { id: 4, status: 'success', time: 'دیروز', duration: '۱۵ ثانیه', log: 'پردازش فایل planning.txt با موفقیت انجام شد. ۸ وظیفه استخراج شد.' },
];

const Sparkline = ({ data, colorClass }: { data: number[], colorClass: string }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const height = 24;
  const width = 60;
  
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={colorClass}
      />
    </svg>
  );
};

const AIAgentsHub: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [expandedLog, setExpandedLog] = useState<number | null>(null);

  const filteredAgents = AGENTS.filter(agent => 
    (activeCategory === 'all' || agent.category === activeCategory) &&
    (agent.name.includes(searchQuery) || agent.desc.includes(searchQuery))
  );

  const selectedAgent = AGENTS.find(a => a.id === selectedAgentId);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'text-[#3b82f6] bg-[#3b82f6]/20 border-[#3b82f6]/50 shadow-[0_0_10px_rgba(59,130,246,0.5)]';
      case 'failed': return 'text-red-500 bg-red-500/20 border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.5)]';
      case 'pending': return 'text-amber-500 bg-amber-500/20 border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.5)]';
      default: return 'text-gray-400 bg-white/10 border-white/20';
    }
  };

  const getStatusDot = (status: string) => {
    switch(status) {
      case 'active': return <div className="w-2.5 h-2.5 rounded-full bg-[#3b82f6] shadow-[0_0_8px_#3b82f6] animate-pulse" />;
      case 'failed': return <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />;
      case 'pending': return <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b] animate-pulse" />;
      default: return <div className="w-2.5 h-2.5 rounded-full bg-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'active': return 'در حال اجرا';
      case 'failed': return 'خطا';
      case 'pending': return 'در انتظار';
      default: return 'آماده';
    }
  };

  return (
    <div className="flex h-full w-full bg-[#050508] text-gray-300 font-sans overflow-hidden selection:bg-[#3b82f6]/30 selection:text-[#3b82f6]" dir="rtl">
      
      {/* Right Column: Filter Sidebar */}
      <aside className="w-64 bg-[#0a0a0f] border-l border-white/5 flex flex-col flex-shrink-0 z-20">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-display font-black text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#3b82f6]" />
            مرکز عوامل هوشمند
          </h2>
        </div>

        <div className="p-4">
          <button 
            onClick={() => setIsCreatorOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#3b82f6]/10 text-[#3b82f6] font-bold text-sm border border-[#3b82f6]/30 hover:bg-[#3b82f6]/20 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all"
          >
            <Plus className="w-4 h-4" />
            عامل جدید
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
          <div className="space-y-1">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">دسته‌بندی‌ها</div>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeCategory === cat.id ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}
              >
                <cat.icon className={`w-4 h-4 ${activeCategory === cat.id ? 'text-[#3b82f6]' : 'text-gray-500'}`} />
                {cat.label}
                {cat.id !== 'all' && (
                  <span className="mr-auto text-[10px] bg-white/5 px-1.5 py-0.5 rounded">
                    {toPersianNum(AGENTS.filter(a => a.category === cat.id).length)}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="space-y-1">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">وضعیت سیستم</div>
            <div className="px-3 py-2 flex items-center justify-between text-sm">
              <span className="text-gray-400 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#3b82f6] animate-pulse"/> فعال</span>
              <span className="text-white">{toPersianNum(2)}</span>
            </div>
            <div className="px-3 py-2 flex items-center justify-between text-sm">
              <span className="text-gray-400 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"/> خطا</span>
              <span className="text-white">{toPersianNum(1)}</span>
            </div>
            <div className="px-3 py-2 flex items-center justify-between text-sm">
              <span className="text-gray-400 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-gray-500"/> آماده</span>
              <span className="text-white">{toPersianNum(3)}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Center Column: Agent List */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#050508] relative z-10 border-l border-white/5">
        <div className="h-16 flex items-center px-8 border-b border-white/5 bg-[#050508]/80 backdrop-blur-md sticky top-0 z-20">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="جستجوی عامل‌ها..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 pr-10 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#3b82f6]/50 transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="grid grid-cols-1 gap-4">
            {filteredAgents.map((agent, idx) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedAgentId(agent.id)}
                className={`group relative p-5 rounded-2xl border transition-all cursor-pointer overflow-hidden ${selectedAgentId === agent.id ? 'bg-white/[0.04] border-white/20' : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10'}`}
              >
                {/* Background Glow for active/failed */}
                {agent.status === 'active' && <div className="absolute top-0 right-0 w-32 h-32 bg-[#3b82f6]/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />}
                {agent.status === 'failed' && <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />}

                <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 flex-shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center ${getStatusColor(agent.status)}`}>
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-base font-bold text-white group-hover:text-[#3b82f6] transition-colors">{agent.name}</h3>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-gray-400 border border-white/10">{agent.category}</span>
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-1 mb-3">{agent.desc}</p>
                      
                      <div className="flex items-center gap-6 text-xs text-gray-400">
                        <div className="flex items-center gap-1.5">
                          {getStatusDot(agent.status)}
                          <span className="font-sans">{getStatusText(agent.status)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{agent.lastRun}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5" />
                          <span>{toPersianNum(agent.runs)} اجرا</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                      <Play className="w-4 h-4 ml-0.5" />
                    </button>
                    <div className="opacity-50 group-hover:opacity-100 transition-opacity">
                      <Sparkline 
                        data={agent.sparkline} 
                        colorClass={agent.status === 'active' ? 'text-[#3b82f6]' : agent.status === 'failed' ? 'text-red-500' : 'text-gray-500'} 
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Left Column: Agent Detail Panel */}
      <AnimatePresence>
        {selectedAgentId && selectedAgent && (
          <motion.aside
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-[400px] bg-[#0a0a0f] flex flex-col flex-shrink-0 z-30 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] relative"
          >
            {/* Elevated Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#3b82f6]/5 to-transparent pointer-events-none" />

            <div className="h-16 flex items-center justify-between px-6 border-b border-white/5 relative z-10">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Settings className="w-4 h-4 text-gray-400" />
                جزئیات عامل
              </h3>
              <button onClick={() => setSelectedAgentId(null)} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar relative z-10 space-y-8">
              
              {/* Header Info */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${getStatusColor(selectedAgent.status)}`}>
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">{selectedAgent.name}</h2>
                    <div className="flex items-center gap-2 text-xs">
                      {getStatusDot(selectedAgent.status)}
                      <span className="text-gray-400">{getStatusText(selectedAgent.status)}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                  {selectedAgent.desc}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {selectedAgent.status === 'active' ? (
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500/10 text-red-500 font-bold text-sm border border-red-500/30 hover:bg-red-500/20 transition-all">
                    <Square className="w-4 h-4 fill-current" />
                    توقف عامل
                  </button>
                ) : (
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#3b82f6]/10 text-[#3b82f6] font-bold text-sm border border-[#3b82f6]/30 hover:bg-[#3b82f6]/20 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                    شروع اجرای دستی
                  </button>
                )}
                <button className="px-4 rounded-xl bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center">
                  <Settings className="w-4 h-4" />
                </button>
              </div>

              {/* Active State Animation */}
              {selectedAgent.status === 'active' && (
                <div className="bg-[#050508] border border-[#3b82f6]/20 rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#3b82f6]/10 to-transparent animate-[shimmer_2s_linear_infinite] bg-[length:200%_auto]" />
                  <div className="flex items-center gap-3 relative z-10">
                    <Loader2 className="w-5 h-5 text-[#3b82f6] animate-spin" />
                    <div className="text-sm text-[#3b82f6]">در حال پردازش داده‌های ورودی...</div>
                  </div>
                  {/* Animated Wave */}
                  <div className="flex items-end gap-1 h-8 mt-4 relative z-10 opacity-50">
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: ['20%', '100%', '20%'] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.05, ease: "easeInOut" }}
                        className="flex-1 bg-[#3b82f6] rounded-t-sm"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                  <div className="text-xs text-gray-500 mb-1">تعداد اجراها</div>
                  <div className="text-xl text-white">{toPersianNum(selectedAgent.runs)}</div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                  <div className="text-xs text-gray-500 mb-1">نرخ موفقیت</div>
                  <div className="text-xl text-white">{toPersianNum(selectedAgent.successRate)}٪</div>
                </div>
              </div>

              {/* Run History Log */}
              <div>
                <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-gray-400" />
                  لاگ اجراهای اخیر
                </h4>
                <div className="space-y-3 relative before:absolute before:inset-y-0 before:right-[11px] before:w-px before:bg-white/10">
                  {RUN_HISTORY.map((run, idx) => (
                    <motion.div 
                      key={run.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="relative pr-8"
                    >
                      <div className={`absolute right-0 top-1.5 w-6 h-6 rounded-full border-4 border-[#0a0a0f] flex items-center justify-center z-10 ${run.status === 'success' ? 'bg-[#3b82f6]' : 'bg-red-500'}`}>
                        {run.status === 'success' ? <CheckCircle2 className="w-3 h-3 text-[#0a0a0f]" /> : <X className="w-3 h-3 text-[#0a0a0f]" />}
                      </div>
                      
                      <div 
                        className="bg-white/[0.02] border border-white/5 rounded-xl p-3 cursor-pointer hover:bg-white/[0.04] transition-colors"
                        onClick={() => setExpandedLog(expandedLog === run.id ? null : run.id)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs font-bold ${run.status === 'success' ? 'text-[#3b82f6]' : 'text-red-500'}`}>
                            {run.status === 'success' ? 'موفق' : 'خطا'}
                          </span>
                          <span className="text-[10px] text-gray-500">{run.time} • {run.duration}</span>
                        </div>
                        
                        <AnimatePresence>
                          {expandedLog === run.id ? (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="text-xs text-gray-400 mt-2 leading-relaxed border-t border-white/5 pt-2">
                                {run.log}
                              </p>
                            </motion.div>
                          ) : (
                            <p className="text-xs text-gray-400 line-clamp-1">
                              {run.log}
                            </p>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* New Agent Creator Modal */}
      <AnimatePresence>
        {isCreatorOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsCreatorOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-[#111118] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#3b82f6]/10 border border-[#3b82f6]/30 flex items-center justify-center text-[#3b82f6]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">ایجاد عامل جدید</h2>
                    <p className="text-xs text-gray-400">توضیح دهید که عامل چه کاری باید انجام دهد.</p>
                  </div>
                </div>
                <button onClick={() => setIsCreatorOpen(false)} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6">
                <textarea 
                  placeholder="مثال: عاملی بساز که هر روز صبح ایمیل‌های پشتیبانی را بررسی کند، آن‌ها را دسته‌بندی کرده و برای تیکت‌های مهم در اسلک نوتیفیکیشن بفرستد..."
                  className="w-full h-32 bg-black/20 border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#3b82f6]/50 transition-colors resize-none mb-4"
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Bot className="w-4 h-4" />
                    هوش مصنوعی تنظیمات را به صورت خودکار انجام می‌دهد.
                  </div>
                  <button className="px-6 py-2.5 rounded-xl bg-[#3b82f6] text-white font-bold text-sm hover:bg-[#60a5fa] shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    تولید عامل
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}} />
    </div>
  );
};

export default AIAgentsHub;
