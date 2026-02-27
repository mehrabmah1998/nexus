import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, ChevronLeft, FileText, Folder, Star, Plus, 
  Search, Settings, MoreHorizontal, Bell, Sparkles, User, 
  PlusCircle, MessageSquare, Database, Bot, CheckCircle2, Clock, Activity,
  LayoutGrid, List, Zap, Command, Terminal
} from 'lucide-react';
import DocumentEditor from './DocumentEditor';
import DatabaseView from './DatabaseView';
import AIAgentsHub from './AIAgentsHub';
import APIExplorer from './APIExplorer';

interface DashboardProps {
  onLogout: () => void;
}

const SIDEBAR_ITEMS = [
  { id: 'fav', label: 'علاقه‌مندی‌ها', icon: Star, items: [
    { id: 'f1', label: 'استراتژی محصول Q2', icon: FileText },
    { id: 'f2', label: 'داشبورد فروش', icon: LayoutGrid },
  ]},
  { id: 'pages', label: 'صفحات خصوصی', icon: Folder, items: [
    { id: 'p1', label: 'جلسات تیم', icon: FileText },
    { id: 'p2', label: 'یادداشت‌های شخصی', icon: FileText },
    { id: 'p3', label: 'پایگاه دانش', icon: Database },
  ]},
];

const RECENT_PAGES = [
  { id: 1, title: 'طراحی رابط کاربری نسخه ۳', time: '۲ ساعت پیش', preview: 'بررسی تغییرات جدید در سیستم دیزاین و...' },
  { id: 2, title: 'گزارش عملکرد ماهانه', time: '۵ ساعت پیش', preview: 'رشد ۱۵ درصدی در جذب کاربر جدید...' },
  { id: 3, title: 'برنامه‌ریزی کمپین نوروز', time: '۱ روز پیش', preview: 'لیست تسک‌های مربوط به تیم مارکتینگ...' },
  { id: 4, title: 'مستندات API', time: '۲ روز پیش', preview: 'اندپوینت‌های جدید برای سرویس پرداخت...' },
];

const AI_ACTIVITIES = [
  { id: 1, text: 'عامل خلاصه‌ساز جلسه را تکمیل کرد', time: '۳ دقیقه پیش', status: 'success' },
  { id: 2, text: 'در حال تحلیل داده‌های فروش ماهانه...', time: 'هم‌اکنون', status: 'processing' },
  { id: 3, text: 'پیش‌نویس ایمیل مارکتینگ آماده شد', time: '۱ ساعت پیش', status: 'success' },
  { id: 4, text: 'بروزرسانی پایگاه دانش با مستندات جدید', time: 'دیروز', status: 'success' },
];

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({ fav: true, pages: true });
  const [activePageId, setActivePageId] = useState<string | number | null>(null);

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderMainContent = () => {
    if (activePageId === 'ai') {
      return <AIAgentsHub />;
    }
    if (activePageId === 'api') {
      return <APIExplorer />;
    }
    if (activePageId === 'p3' || activePageId === 'new-db') {
      return <DatabaseView />;
    }
    if (activePageId) {
      return <DocumentEditor />;
    }

    return (
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">عصر بخیر، مهراب</h1>
            <p className="text-gray-500 text-sm">امروز سه‌شنبه، ۱۲ اردیبهشت. ۳ تسک جدید دارید.</p>
          </div>

          {/* Quick Actions Panel */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                onClick={() => setActivePageId('new')}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-200">صفحه جدید</div>
                  <div className="text-xs text-gray-500 mt-0.5">ایجاد سند خالی</div>
                </div>
              </button>
              <button className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/10 text-[#3b82f6] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-200">از هوش مصنوعی بپرس</div>
                  <div className="text-xs text-gray-500 mt-0.5">تولید محتوا یا ایده</div>
                </div>
              </button>
              <button 
                onClick={() => setActivePageId('new-db')}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Database className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-200">پایگاه داده جدید</div>
                  <div className="text-xs text-gray-500 mt-0.5">مدیریت اطلاعات ساختاریافته</div>
                </div>
              </button>
            </div>
          </section>

          {/* Recent Pages Grid */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-gray-300 flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                بازدیدهای اخیر
              </h2>
              <button className="text-xs text-gray-500 hover:text-gray-300 transition-colors">مشاهده همه</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {RECENT_PAGES.map((page) => (
                <div 
                  key={page.id} 
                  onClick={() => setActivePageId(page.id)}
                  className="group p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all cursor-pointer flex flex-col h-32"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <FileText className="w-4 h-4 text-gray-500 mt-0.5" />
                    <h3 className="text-sm font-medium text-gray-200 line-clamp-1 group-hover:text-[#3b82f6] transition-colors">{page.title}</h3>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-auto mb-2 leading-relaxed">{page.preview}</p>
                  <div className="text-[10px] text-gray-600 font-mono">{page.time}</div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen w-full bg-[#07070a] text-gray-300 font-sans overflow-hidden selection:bg-[#3b82f6]/30 selection:text-[#3b82f6]" dir="rtl">
      
      {/* Right Sidebar */}
      <aside className="w-64 bg-[#111118] border-l border-white/5 flex flex-col flex-shrink-0 z-20">
        {/* Workspace Switcher */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-white/5 hover:bg-white/[0.02] cursor-pointer transition-colors">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-xs font-bold text-white shadow-inner">
              ن
            </div>
            <span className="font-bold text-sm text-gray-200 truncate">شرکت نوآوران دیجیتال</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>

        {/* Sidebar Actions */}
        <div className="p-3 space-y-1">
          <button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-gray-400 hover:text-gray-200 hover:bg-white/5 rounded-md transition-colors group">
            <Search className="w-4 h-4" />
            <span>جستجو</span>
            <div className="mr-auto flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <kbd className="text-[10px] bg-white/10 px-1.5 rounded text-gray-400 font-mono">⌘</kbd>
              <kbd className="text-[10px] bg-white/10 px-1.5 rounded text-gray-400 font-mono">K</kbd>
            </div>
          </button>
          <button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-gray-400 hover:text-gray-200 hover:bg-white/5 rounded-md transition-colors">
            <Settings className="w-4 h-4" />
            <span>تنظیمات</span>
          </button>
          <button 
            onClick={() => setActivePageId('new')}
            className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-gray-400 hover:text-gray-200 hover:bg-white/5 rounded-md transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>صفحه جدید</span>
          </button>
        </div>

        {/* Page Tree */}
        <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
          {SIDEBAR_ITEMS.map((section, sIdx) => (
            <div key={section.id} className="mb-4">
              <button 
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center gap-1 px-2 py-1 text-xs font-bold text-gray-500 hover:text-gray-300 transition-colors group"
              >
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedSections[section.id] ? '' : 'rotate-90'}`} />
                <span>{section.label}</span>
                <Plus className="w-3.5 h-3.5 mr-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              
              <AnimatePresence initial={false}>
                {expandedSections[section.id] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    {section.items.map((item, iIdx) => (
                      <motion.button
                        key={item.id}
                        onClick={() => setActivePageId(item.id)}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: iIdx * 0.05 }}
                        className={`w-full flex items-center gap-2 px-6 py-1.5 text-sm transition-colors group ${activePageId === item.id ? 'text-[#3b82f6] bg-[#3b82f6]/10' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}
                      >
                        <item.icon className={`w-4 h-4 ${activePageId === item.id ? 'text-[#3b82f6]' : 'text-gray-500 group-hover:text-gray-400'}`} />
                        <span className="truncate">{item.label}</span>
                        <MoreHorizontal className="w-4 h-4 mr-auto opacity-0 group-hover:opacity-100 text-gray-500 hover:text-white transition-all" />
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        
        {/* User Profile Bottom */}
        <div className="p-3 border-t border-white/5">
          <button onClick={onLogout} className="w-full flex items-center gap-2 px-2 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-colors">
            <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center">
              <User className="w-3.5 h-3.5" />
            </div>
            <span>خروج از حساب</span>
          </button>
        </div>
      </aside>

      {/* Center Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#07070a] relative z-10">
        {/* Top Bar */}
        <header className="h-14 flex items-center justify-between px-6 border-b border-white/5 bg-[#07070a]/80 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="hover:text-gray-200 cursor-pointer transition-colors">شرکت نوآوران دیجیتال</span>
            <span className="text-gray-600">/</span>
            <span className="text-gray-200 font-medium">داشبورد اصلی</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActivePageId('api')}
              className={`text-gray-400 hover:text-[#3b82f6] transition-colors flex items-center gap-2 text-sm bg-white/5 px-3 py-1.5 rounded-md border border-white/5 hover:border-[#3b82f6]/30 ${activePageId === 'api' ? 'text-[#3b82f6] border-[#3b82f6]/30 bg-[#3b82f6]/10' : ''}`}
            >
              <Terminal className="w-4 h-4" />
              <span>مستندات API</span>
            </button>
            <button 
              onClick={() => setActivePageId('ai')}
              className={`text-gray-400 hover:text-[#3b82f6] transition-colors flex items-center gap-2 text-sm bg-white/5 px-3 py-1.5 rounded-md border border-white/5 hover:border-[#3b82f6]/30 ${activePageId === 'ai' ? 'text-[#3b82f6] border-[#3b82f6]/30 bg-[#3b82f6]/10' : ''}`}
            >
              <Sparkles className="w-4 h-4" />
              <span>هوش مصنوعی</span>
            </button>
            <button className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/5">
              <Bell className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        {renderMainContent()}
      </main>

      {/* Left AI Activity Panel */}
      <aside className="w-80 bg-[#0a0a0f] border-r border-white/5 flex flex-col flex-shrink-0 z-20 relative">
        {/* Subtle glow on the border */}
        <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-[#3b82f6]/20 to-transparent" />
        
        <div className="h-14 flex items-center px-5 border-b border-white/5">
          <div className="flex items-center gap-2 text-[#3b82f6]">
            <Activity className="w-4 h-4" />
            <span className="font-bold text-sm tracking-wide">فعالیت‌های هوش مصنوعی</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar space-y-6">
          {AI_ACTIVITIES.map((activity, idx) => (
            <motion.div 
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 + 0.5 }}
              className="relative pl-4"
            >
              {/* Timeline line */}
              {idx !== AI_ACTIVITIES.length - 1 && (
                <div className="absolute right-[9px] top-6 bottom-[-24px] w-[1px] bg-white/5" />
              )}
              
              <div className="flex gap-3">
                <div className="relative z-10 mt-0.5">
                  {activity.status === 'processing' ? (
                    <div className="w-5 h-5 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/30 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-ping" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-gray-400" />
                    </div>
                  )}
                </div>
                <div>
                  <p className={`text-sm leading-relaxed ${activity.status === 'processing' ? 'text-gray-200' : 'text-gray-400'}`}>
                    {activity.text}
                  </p>
                  <span className="text-[10px] text-gray-600 font-mono mt-1 block">{activity.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom Input Area */}
        <div className="p-4 border-t border-white/5 bg-[#0a0a0f]">
          <div className="relative">
            <input 
              type="text" 
              placeholder="دستور به هوش مصنوعی..." 
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 pr-9 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#3b82f6]/50 transition-colors"
            />
            <Command className="w-4 h-4 text-gray-500 absolute right-3 top-2.5" />
          </div>
        </div>
      </aside>

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
      `}} />
    </div>
  );
};

export default Dashboard;
