import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GripVertical, Plus, Image as ImageIcon, Code, List, 
  ListOrdered, ChevronDown, Sparkles, Type, AlignRight, 
  AlignCenter, AlignLeft, Bold, Italic, Link, MessageSquare,
  LayoutGrid, Bot, Check, MousePointer2, Clock, User, Search
} from 'lucide-react';

const BLOCKS = [
  { id: 'b1', type: 'h2', content: 'اهداف کلیدی (OKRs)' },
  { id: 'b2', type: 'p', content: 'در این سه‌ماهه، تمرکز اصلی ما بر روی افزایش تعامل کاربران و بهبود تجربه کاربری در بخش آنبوردینگ است. ما انتظار داریم با پیاده‌سازی طراحی جدید، نرخ ریزش را تا ۱۵٪ کاهش دهیم.' },
  { id: 'b3', type: 'bullet', content: 'بازطراحی کامل جریان ثبت‌نام' },
  { id: 'b4', type: 'bullet', content: 'اضافه کردن راهنمای تعاملی برای کاربران جدید' },
  { id: 'b5', type: 'bullet', content: 'بهبود سرعت بارگذاری صفحات اصلی' },
  { id: 'b6', type: 'ai', content: 'بر اساس داده‌های ماه گذشته، بیشترین ریزش در مرحله تایید ایمیل رخ می‌دهد. پیشنهاد می‌شود ورود با گوگل و اپل به عنوان گزینه‌های اصلی قرار گیرند و تایید ایمیل به بعد از اولین ورود موکول شود.' },
  { id: 'b7', type: 'h3', content: 'نمونه کد پیاده‌سازی' },
  { id: 'b8', type: 'code', content: 'function authenticateUser(provider) {\n  return auth.signInWithPopup(provider)\n    .then(result => handleSuccess(result))\n    .catch(error => handleError(error));\n}' },
  { id: 'b9', type: 'divider' },
  { id: 'b10', type: 'toggle', content: 'یادداشت‌های جلسه استندآپ' },
];

const SLASH_COMMANDS = [
  { id: 'ai-write', icon: Sparkles, label: 'بنویس با هوش مصنوعی', desc: 'تولید متن، ایده یا ساختار', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { id: 'ai-summarize', icon: AlignRight, label: 'خلاصه کن', desc: 'خلاصه‌سازی متن‌های طولانی', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { id: 'ai-continue', icon: Type, label: 'ادامه بده', desc: 'نوشتن ادامه متن بر اساس لحن شما', color: 'text-green-400', bg: 'bg-green-500/10' },
  { id: 'table', icon: LayoutGrid, label: 'جدول اضافه کن', desc: 'ایجاد جدول ساختاریافته', color: 'text-gray-400', bg: 'bg-white/5' },
  { id: 'agent', icon: Bot, label: 'وظیفه عاملی اضافه کن', desc: 'اجرای یک تسک خودکار توسط هوش مصنوعی', color: 'text-orange-400', bg: 'bg-orange-500/10' },
];

const COLLABORATORS = [
  { id: 1, name: 'سارا', color: 'bg-pink-500', x: 60, y: 45 },
  { id: 2, name: 'علی', color: 'bg-blue-500', x: 20, y: 70 },
];

const DocumentEditor: React.FC = () => {
  const [showSlash, setShowSlash] = useState(false);
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null);
  const [aiTyping, setAiTyping] = useState(true);
  const [cursors, setCursors] = useState(COLLABORATORS);

  // Simulate AI typing effect
  useEffect(() => {
    const timer = setTimeout(() => setAiTyping(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Simulate cursor movement
  useEffect(() => {
    const interval = setInterval(() => {
      setCursors(prev => prev.map(c => ({
        ...c,
        x: Math.max(10, Math.min(90, c.x + (Math.random() * 10 - 5))),
        y: Math.max(10, Math.min(90, c.y + (Math.random() * 10 - 5)))
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full bg-[#07070a] overflow-y-auto custom-scrollbar" dir="rtl">
      
      {/* Collaboration Presence Bar */}
      <div className="sticky top-0 z-40 w-full flex justify-end px-8 py-4 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto bg-[#111118]/80 backdrop-blur-md border border-white/5 rounded-full px-3 py-1.5 shadow-lg">
          <div className="text-xs text-gray-500 ml-2">۲ نفر در حال مشاهده</div>
          <div className="flex -space-x-2 space-x-reverse">
            <div className="w-7 h-7 rounded-full bg-pink-500 border-2 border-[#111118] flex items-center justify-center text-[10px] font-bold text-white z-20">س</div>
            <div className="w-7 h-7 rounded-full bg-blue-500 border-2 border-[#111118] flex items-center justify-center text-[10px] font-bold text-white z-10">ع</div>
          </div>
          <button className="w-7 h-7 rounded-full bg-white/5 border-2 border-[#111118] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors z-0 mr-1">
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Floating Cursors */}
      {cursors.map(cursor => (
        <motion.div
          key={cursor.id}
          animate={{ left: `${cursor.x}%`, top: `${cursor.y}%` }}
          transition={{ duration: 2, ease: "linear" }}
          className="absolute z-30 pointer-events-none flex flex-col items-center"
        >
          <MousePointer2 className={`w-4 h-4 ${cursor.color.replace('bg-', 'text-')} fill-current`} />
          <div className={`mt-1 px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-lg ${cursor.color}`}>
            {cursor.name}
          </div>
        </motion.div>
      ))}

      {/* Main Content Column */}
      <div className="max-w-[720px] mx-auto px-8 pb-48 pt-12 relative z-10">
        
        {/* Page Header */}
        <div className="mb-16 group">
          {/* Cover Slot */}
          <div className="w-full h-48 rounded-2xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/5 mb-8 relative overflow-hidden flex items-center justify-center group-hover:border-white/10 transition-colors cursor-pointer">
            <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/workspace/800/400')] bg-cover bg-center opacity-40 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] to-transparent" />
            <button className="relative z-10 px-4 py-2 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              تغییر کاور
            </button>
          </div>

          {/* Emoji Icon */}
          <div className="text-6xl mb-6 -mt-16 relative z-10 ml-4 inline-block cursor-pointer hover:scale-110 transition-transform">
            🚀
          </div>

          {/* Title */}
          <h1 className="text-5xl font-display font-black text-white mb-4 leading-tight tracking-tight outline-none" contentEditable suppressContentEditableWarning>
            استراتژی رشد محصول — نیمه دوم ۱۴۰۴
          </h1>

          {/* Metadata Row */}
          <div className="flex items-center gap-6 text-sm text-gray-500 font-sans border-b border-white/5 pb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              وضعیت: در حال انجام
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              آخرین ویرایش: ۲ ساعت پیش
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              مالک: مهراب
            </div>
          </div>
        </div>

        {/* Block Renderer */}
        <div className="space-y-1">
          {BLOCKS.map((block, idx) => (
            <motion.div 
              key={block.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="relative group flex items-start -ml-12 pl-12 py-1"
              onMouseEnter={() => setHoveredBlock(block.id)}
              onMouseLeave={() => setHoveredBlock(null)}
            >
              {/* Block Handles (Left side in RTL) */}
              <div className={`absolute left-2 top-1.5 flex items-center gap-1 opacity-0 transition-opacity ${hoveredBlock === block.id ? 'opacity-100' : ''}`}>
                <button className="p-1 rounded hover:bg-white/10 text-gray-500 transition-colors cursor-pointer">
                  <Plus className="w-4 h-4" />
                </button>
                <button className="p-1 rounded hover:bg-white/10 text-gray-500 transition-colors cursor-grab active:cursor-grabbing">
                  <GripVertical className="w-4 h-4" />
                </button>
              </div>

              {/* Block Content */}
              <div className="flex-1 w-full outline-none" contentEditable suppressContentEditableWarning>
                {block.type === 'h2' && (
                  <h2 className="text-2xl font-display font-bold text-white mt-6 mb-2">{block.content}</h2>
                )}
                
                {block.type === 'h3' && (
                  <h3 className="text-xl font-display font-bold text-gray-200 mt-4 mb-2">{block.content}</h3>
                )}
                
                {block.type === 'p' && (
                  <p className="text-base text-gray-300 leading-relaxed font-sans">{block.content}</p>
                )}
                
                {block.type === 'bullet' && (
                  <div className="flex items-start gap-3 my-1">
                    <span className="text-gray-500 mt-1.5 text-lg leading-none">•</span>
                    <p className="text-base text-gray-300 leading-relaxed font-sans">{block.content}</p>
                  </div>
                )}
                
                {block.type === 'code' && (
                  <div className="my-4 rounded-xl bg-[#0f1117] border border-white/5 overflow-hidden" dir="ltr">
                    <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border-b border-white/5">
                      <span className="text-xs text-gray-500 font-mono">javascript</span>
                      <button className="text-xs text-gray-500 hover:text-white transition-colors">Copy</button>
                    </div>
                    <pre className="p-4 text-sm text-blue-300 font-mono overflow-x-auto">
                      <code>{block.content}</code>
                    </pre>
                  </div>
                )}
                
                {block.type === 'divider' && (
                  <div className="py-4">
                    <div className="h-px w-full bg-white/10" />
                  </div>
                )}
                
                {block.type === 'toggle' && (
                  <div className="flex items-center gap-2 my-2 cursor-pointer group/toggle">
                    <ChevronDown className="w-4 h-4 text-gray-500 group-hover/toggle:text-white transition-colors -rotate-90" />
                    <span className="text-base font-medium text-gray-300">{block.content}</span>
                  </div>
                )}

                {block.type === 'ai' && (
                  <div className="my-4 relative rounded-xl overflow-hidden p-[1px]">
                    {/* Shimmer Border */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-[shimmer_2s_linear_infinite] bg-[length:200%_auto]" />
                    
                    <div className="relative bg-[#0a0a0f] rounded-[11px] p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-xs font-bold text-purple-400">پیشنهاد هوش مصنوعی</span>
                      </div>
                      <p className="text-base text-gray-200 leading-relaxed font-sans">
                        {block.content}
                        {aiTyping && <span className="inline-block w-2 h-4 ml-1 bg-purple-400 animate-pulse align-middle" />}
                      </p>
                      
                      {!aiTyping && (
                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                          <button className="px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-400 text-xs font-bold hover:bg-purple-500/20 transition-colors flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" />
                            جایگذاری
                          </button>
                          <button className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 text-xs font-bold hover:bg-white/10 transition-colors">
                            تلاش مجدد
                          </button>
                          <button className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 text-xs font-bold hover:bg-white/10 transition-colors">
                            حذف
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          
          {/* Empty block to trigger slash command */}
          <div className="relative group flex items-start -ml-12 pl-12 py-2 mt-4">
            <div className="flex-1 w-full">
              <input 
                type="text" 
                placeholder="برای دستورات / را تایپ کنید..." 
                className="w-full bg-transparent border-none outline-none text-base text-gray-500 placeholder:text-gray-600 font-sans"
                onChange={(e) => setShowSlash(e.target.value.includes('/'))}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Slash Command Palette */}
      <AnimatePresence>
        {showSlash && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setShowSlash(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 h-[40vh] bg-[#111118] border-t border-white/10 z-50 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] rounded-t-3xl overflow-hidden flex flex-col"
            >
              <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mt-3 mb-4" />
              
              <div className="px-6 pb-4 border-b border-white/5">
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="جستجوی دستورات..." 
                    autoFocus
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 pr-10 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-2">
                  {SLASH_COMMANDS.map((cmd) => (
                    <button key={cmd.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors text-right group">
                      <div className={`w-10 h-10 rounded-lg ${cmd.bg} ${cmd.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <cmd.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-200 mb-1">{cmd.label}</div>
                        <div className="text-xs text-gray-500">{cmd.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}} />
    </div>
  );
};

export default DocumentEditor;
