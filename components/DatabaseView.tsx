import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Table2, LayoutGrid, Calendar as CalendarIcon, Image as ImageIcon, 
  Filter, ArrowUpDown, Plus, Search, MoreHorizontal, 
  Type, CircleDashed, User, CalendarDays, Flag,
  CheckCircle2, Circle, Clock, AlertCircle, X, SlidersHorizontal
} from 'lucide-react';

const toPersianNum = (num: number | string) => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, (x) => persianDigits[parseInt(x)]);
};

const MOCK_DATA = [
  { id: 1, title: 'طراحی صفحه اصلی', status: 'در حال انجام', assignee: 'مهراب', date: '۱۴۰۳/۰۲/۱۵', priority: 'بالا', cover: 'from-blue-500/20 to-blue-900/20' },
  { id: 2, title: 'پیاده‌سازی API لاگین', status: 'تکمیل شده', assignee: 'علی', date: '۱۴۰۳/۰۲/۱۰', priority: 'بالا', cover: 'from-green-500/20 to-green-900/20' },
  { id: 3, title: 'نوشتن مستندات', status: 'در صف', assignee: 'سارا', date: '۱۴۰۳/۰۲/۲۰', priority: 'متوسط', cover: 'from-purple-500/20 to-purple-900/20' },
  { id: 4, title: 'تست‌های E2E', status: 'بازبینی', assignee: 'مهراب', date: '۱۴۰۳/۰۲/۱۸', priority: 'پایین', cover: 'from-orange-500/20 to-orange-900/20' },
  { id: 5, title: 'بهینه‌سازی دیتابیس', status: 'در صف', assignee: 'علی', date: '۱۴۰۳/۰۲/۲۵', priority: 'بالا', cover: 'from-red-500/20 to-red-900/20' },
  { id: 6, title: 'طراحی سیستم دیزاین', status: 'در حال انجام', assignee: 'سارا', date: '۱۴۰۳/۰۲/۲۸', priority: 'متوسط', cover: 'from-pink-500/20 to-pink-900/20' },
];

const STATUSES = [
  { id: 'در صف', label: 'در صف', icon: Circle, color: 'text-gray-400', bg: 'bg-gray-500/10' },
  { id: 'در حال انجام', label: 'در حال انجام', icon: Clock, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { id: 'بازبینی', label: 'بازبینی', icon: AlertCircle, color: 'text-orange-400', bg: 'bg-orange-500/10' },
  { id: 'تکمیل شده', label: 'تکمیل شده', icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-500/10' },
];

const PRIORITIES = {
  'بالا': { color: 'text-red-400', bg: 'bg-red-500/10' },
  'متوسط': { color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  'پایین': { color: 'text-gray-400', bg: 'bg-gray-500/10' },
};

type ViewType = 'table' | 'board' | 'gallery' | 'calendar';

const DatabaseView: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('table');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const renderTableView = () => (
    <div className="w-full border border-white/5 rounded-xl overflow-hidden bg-[#0a0a0f]">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 p-3 border-b border-white/5 bg-white/[0.02] text-xs font-bold text-gray-400">
        <div className="col-span-4 flex items-center gap-2"><Type className="w-3.5 h-3.5"/> عنوان</div>
        <div className="col-span-2 flex items-center gap-2"><CircleDashed className="w-3.5 h-3.5"/> وضعیت</div>
        <div className="col-span-2 flex items-center gap-2"><User className="w-3.5 h-3.5"/> مسئول</div>
        <div className="col-span-2 flex items-center gap-2"><CalendarDays className="w-3.5 h-3.5"/> تاریخ تحویل</div>
        <div className="col-span-2 flex items-center gap-2"><Flag className="w-3.5 h-3.5"/> اولویت</div>
      </div>
      
      {/* Table Rows */}
      <div className="divide-y divide-white/5">
        {MOCK_DATA.map((row, idx) => (
          <motion.div 
            key={row.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="grid grid-cols-12 gap-4 p-3 text-sm text-gray-300 hover:bg-white/[0.02] transition-colors group cursor-pointer items-center"
          >
            <div className="col-span-4 font-medium text-gray-200 group-hover:text-[#3b82f6] transition-colors">{row.title}</div>
            <div className="col-span-2">
              <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs ${STATUSES.find(s => s.id === row.status)?.bg} ${STATUSES.find(s => s.id === row.status)?.color}`}>
                {React.createElement(STATUSES.find(s => s.id === row.status)?.icon || Circle, { className: "w-3 h-3" })}
                {row.status}
              </span>
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-[10px] text-white">
                {row.assignee.charAt(0)}
              </div>
              <span className="text-gray-400 text-xs">{row.assignee}</span>
            </div>
            <div className="col-span-2 text-gray-400 text-xs">{toPersianNum(row.date)}</div>
            <div className="col-span-2">
              <span className={`inline-flex px-2 py-1 rounded-md text-xs ${PRIORITIES[row.priority as keyof typeof PRIORITIES].bg} ${PRIORITIES[row.priority as keyof typeof PRIORITIES].color}`}>
                {row.priority}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderBoardView = () => (
    <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar items-start">
      {STATUSES.map((status, sIdx) => {
        const columnTasks = MOCK_DATA.filter(t => t.status === status.id);
        return (
          <div key={status.id} className="min-w-[280px] flex-1 flex flex-col gap-3">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-bold ${status.bg} ${status.color}`}>
                  <status.icon className="w-3.5 h-3.5" />
                  {status.label}
                </span>
                <span className="text-xs text-gray-500">{toPersianNum(columnTasks.length)}</span>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1 text-gray-500 hover:text-gray-300 hover:bg-white/5 rounded transition-colors"><Plus className="w-4 h-4" /></button>
                <button className="p-1 text-gray-500 hover:text-gray-300 hover:bg-white/5 rounded transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              {columnTasks.map((task, tIdx) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (sIdx * 0.1) + (tIdx * 0.05) }}
                  className="bg-[#111118] border border-white/5 rounded-xl p-4 hover:border-white/10 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <h4 className="text-sm font-bold text-gray-200 mb-3 group-hover:text-[#3b82f6] transition-colors">{task.title}</h4>
                  <div className="flex items-center justify-between mt-auto">
                    <span className={`text-[10px] px-2 py-1 rounded-md ${PRIORITIES[task.priority as keyof typeof PRIORITIES].bg} ${PRIORITIES[task.priority as keyof typeof PRIORITIES].color}`}>
                      {task.priority}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-[10px] text-white border border-[#111118]">
                      {task.assignee.charAt(0)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderGalleryView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {MOCK_DATA.map((item, idx) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.05 }}
          className="bg-[#111118] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 hover:shadow-xl transition-all cursor-pointer group flex flex-col"
        >
          <div className={`h-32 w-full bg-gradient-to-br ${item.cover} relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
          </div>
          <div className="p-4 flex flex-col gap-3 flex-1">
            <h4 className="text-base font-bold text-gray-200 group-hover:text-[#3b82f6] transition-colors">{item.title}</h4>
            <div className="flex flex-wrap gap-2 mt-auto">
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] ${STATUSES.find(s => s.id === item.status)?.bg} ${STATUSES.find(s => s.id === item.status)?.color}`}>
                {item.status}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] bg-white/5 text-gray-400">
                <CalendarDays className="w-3 h-3" />
                {toPersianNum(item.date)}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderCalendarView = () => {
    const daysOfWeek = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
    const daysInMonth = 31;
    const startDayOffset = 2; // Starts on Monday (دوشنبه)

    return (
      <div className="w-full border border-white/5 rounded-xl overflow-hidden bg-[#0a0a0f]">
        <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/[0.02]">
          <h3 className="text-lg font-bold text-white">اردیبهشت ۱۴۰۳</h3>
          <div className="flex gap-2">
            <button className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 transition-colors"><ChevronDown className="w-5 h-5 rotate-90" /></button>
            <button className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 transition-colors"><ChevronDown className="w-5 h-5 -rotate-90" /></button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 border-b border-white/5 bg-white/[0.01]">
          {daysOfWeek.map(day => (
            <div key={day} className="py-2 text-center text-xs font-bold text-gray-500 border-l border-white/5 last:border-l-0">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 auto-rows-[100px]">
          {Array.from({ length: 35 }).map((_, i) => {
            const dayNum = i - startDayOffset + 1;
            const isCurrentMonth = dayNum > 0 && dayNum <= daysInMonth;
            
            // Mock tasks for specific days
            const dayTasks = isCurrentMonth && (dayNum === 10 || dayNum === 15 || dayNum === 18 || dayNum === 20 || dayNum === 25 || dayNum === 28) 
              ? MOCK_DATA.filter(t => t.date.endsWith(toPersianNum(dayNum).toString().padStart(2, '۰')))
              : [];

            return (
              <div key={i} className="border-b border-l border-white/5 last:border-l-0 p-2 relative group hover:bg-white/[0.02] transition-colors">
                {isCurrentMonth && (
                  <>
                    <span className={`text-sm ${dayNum === 15 ? 'w-6 h-6 rounded-full bg-[#3b82f6] text-white flex items-center justify-center' : 'text-gray-400'}`}>
                      {toPersianNum(dayNum)}
                    </span>
                    <div className="mt-1 flex flex-col gap-1">
                      {dayTasks.map((task, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`text-[10px] px-1.5 py-0.5 rounded truncate ${STATUSES.find(s => s.id === task.status)?.bg} ${STATUSES.find(s => s.id === task.status)?.color}`}
                        >
                          {task.title}
                        </motion.div>
                      ))}
                    </div>
                    <button className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-white/10 text-gray-500 transition-all">
                      <Plus className="w-3 h-3" />
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#07070a] relative overflow-hidden" dir="rtl">
      
      {/* Database Header & Toolbar */}
      <div className="flex-shrink-0 px-8 pt-8 pb-4 border-b border-white/5 bg-[#07070a] z-10">
        <h1 className="text-3xl font-display font-black text-white mb-6">پایگاه داده پروژه‌ها</h1>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* View Switcher */}
          <div className="flex items-center gap-1 bg-white/[0.02] border border-white/5 p-1 rounded-xl w-max">
            {[
              { id: 'table', label: 'جدول', icon: Table2 },
              { id: 'board', label: 'برد', icon: LayoutGrid },
              { id: 'gallery', label: 'گالری', icon: ImageIcon },
              { id: 'calendar', label: 'تقویم', icon: CalendarIcon },
            ].map((view) => (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id as ViewType)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-all relative ${activeView === view.id ? 'text-white' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
              >
                {activeView === view.id && (
                  <motion.div 
                    layoutId="activeViewBg" 
                    className="absolute inset-0 bg-white/10 rounded-lg shadow-sm border border-white/5" 
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <view.icon className="w-4 h-4 relative z-10" />
                <span className="relative z-10">{view.label}</span>
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
            >
              <Filter className="w-4 h-4" />
              فیلتر
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
              <ArrowUpDown className="w-4 h-4" />
              مرتب‌سازی
            </button>
            <div className="w-px h-4 bg-white/10 mx-1" />
            <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold bg-[#3b82f6] text-white hover:bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all">
              <Plus className="w-4 h-4" />
              ورودی جدید
            </button>
          </div>
        </div>
      </div>

      {/* Main View Area */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {activeView === 'table' && renderTableView()}
            {activeView === 'board' && renderBoardView()}
            {activeView === 'gallery' && renderGalleryView()}
            {activeView === 'calendar' && renderCalendarView()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Filter Sidebar */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setIsFilterOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 left-0 bottom-0 w-80 bg-[#111118] border-r border-white/10 z-50 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/5">
                <div className="flex items-center gap-2 text-white font-bold">
                  <SlidersHorizontal className="w-5 h-5" />
                  فیلترهای پیشرفته
                </div>
                <button onClick={() => setIsFilterOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                {/* Filter Groups */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">وضعیت</label>
                  <div className="space-y-2">
                    {STATUSES.map(s => (
                      <label key={s.id} className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-4 h-4 rounded border border-white/20 flex items-center justify-center group-hover:border-[#3b82f6] transition-colors">
                          {/* Checked state mock */}
                        </div>
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{s.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">اولویت</label>
                  <div className="space-y-2">
                    {Object.keys(PRIORITIES).map(p => (
                      <label key={p} className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-4 h-4 rounded border border-white/20 flex items-center justify-center group-hover:border-[#3b82f6] transition-colors" />
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{p}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-white/5 gap-3 flex">
                <button className="flex-1 py-2 rounded-lg bg-white/5 text-white text-sm font-bold hover:bg-white/10 transition-colors">
                  پاک کردن
                </button>
                <button className="flex-1 py-2 rounded-lg bg-[#3b82f6] text-white text-sm font-bold hover:bg-blue-500 transition-colors">
                  اعمال فیلتر
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};

export default DatabaseView;
