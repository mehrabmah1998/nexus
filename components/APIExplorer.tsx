import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, Search, Key, Shield, Zap, Copy, Check, 
  Play, ChevronDown, ChevronLeft, Code, Box, FileText, 
  Bot, Webhook, Lock, Server, Activity, ArrowLeft, Settings, Loader2
} from 'lucide-react';

const toPersianNum = (num: number | string) => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, (x) => persianDigits[parseInt(x)]);
};

const API_GROUPS = [
  {
    id: 'auth',
    title: 'احراز هویت',
    icon: Lock,
    endpoints: [
      { id: 'auth-token', method: 'POST', path: '/v1/auth/token', name: 'دریافت توکن دسترسی' },
      { id: 'auth-verify', method: 'GET', path: '/v1/auth/verify', name: 'بررسی اعتبار توکن' }
    ]
  },
  {
    id: 'workspaces',
    title: 'فضاهای کاری',
    icon: Box,
    endpoints: [
      { id: 'ws-list', method: 'GET', path: '/v1/workspaces', name: 'لیست فضاهای کاری' },
      { id: 'ws-create', method: 'POST', path: '/v1/workspaces', name: 'ایجاد فضای کاری جدید' },
      { id: 'ws-get', method: 'GET', path: '/v1/workspaces/:id', name: 'دریافت اطلاعات فضای کاری' }
    ]
  },
  {
    id: 'pages',
    title: 'صفحات',
    icon: FileText,
    endpoints: [
      { id: 'page-list', method: 'GET', path: '/v1/pages', name: 'لیست صفحات' },
      { id: 'page-create', method: 'POST', path: '/v1/pages', name: 'ایجاد صفحه جدید' },
      { id: 'page-update', method: 'PATCH', path: '/v1/pages/:id', name: 'بروزرسانی صفحه' }
    ]
  },
  {
    id: 'blocks',
    title: 'بلوک‌ها',
    icon: Code,
    endpoints: [
      { id: 'block-list', method: 'GET', path: '/v1/blocks', name: 'دریافت بلوک‌های صفحه' },
      { id: 'block-append', method: 'POST', path: '/v1/blocks', name: 'افزودن بلوک جدید' }
    ]
  },
  {
    id: 'agents',
    title: 'عامل‌های هوش مصنوعی',
    icon: Bot,
    endpoints: [
      { id: 'agent-run', method: 'POST', path: '/v1/agents/:id/run', name: 'اجرای عامل هوشمند' },
      { id: 'agent-status', method: 'GET', path: '/v1/agents/:id/status', name: 'وضعیت اجرای عامل' }
    ]
  },
  {
    id: 'webhooks',
    title: 'وب‌هوک‌ها',
    icon: Webhook,
    endpoints: [
      { id: 'webhook-register', method: 'POST', path: '/v1/webhooks', name: 'ثبت وب‌هوک جدید' }
    ]
  }
];

const METHOD_COLORS = {
  GET: 'text-[#3b82f6] bg-[#3b82f6]/10 border-[#3b82f6]/30',
  POST: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
  PATCH: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
  DELETE: 'text-red-500 bg-red-500/10 border-red-500/30',
};

const MOCK_RESPONSE = {
  id: "ws_123456789",
  object: "workspace",
  name: "تیم مارکتینگ",
  created_at: 1715846400,
  pages: [
    {
      id: "pg_987654321",
      title: "استراتژی",
      url: "https://api.nexus.com/v1/pages/pg_987654321"
    },
    {
      id: "pg_987654322",
      title: "تقویم محتوا",
      url: "https://api.nexus.com/v1/pages/pg_987654322"
    },
    {
      id: "pg_987654323",
      title: "گزارش KPI",
      url: "https://api.nexus.com/v1/pages/pg_987654323"
    }
  ]
};

const SyntaxHighlightedJson = ({ data }: { data: any }) => {
  const jsonString = JSON.stringify(data, null, 2);
  
  // Simple regex-based syntax highlighting for JSON
  const highlighted = jsonString.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      let cls = 'text-blue-400'; // number
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'text-gray-300'; // key
        } else {
          cls = 'text-emerald-400'; // string (acid green)
        }
      } else if (/true|false/.test(match)) {
        cls = 'text-purple-400'; // boolean
      } else if (/null/.test(match)) {
        cls = 'text-gray-500'; // null
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );

  return (
    <pre 
      className="font-mono text-[13px] leading-relaxed"
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  );
};

const APIExplorer: React.FC = () => {
  const [activeEndpoint, setActiveEndpoint] = useState('ws-create');
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['workspaces', 'auth']);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  const toggleGroup = (id: string) => {
    setExpandedGroups(prev => 
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleExecute = () => {
    setIsExecuting(true);
    setShowResponse(false);
    setTimeout(() => {
      setIsExecuting(false);
      setShowResponse(true);
    }, 1500);
  };

  const currentEndpoint = API_GROUPS.flatMap(g => g.endpoints).find(e => e.id === activeEndpoint);

  return (
    <div className="flex h-full w-full bg-[#050508] text-gray-300 font-sans overflow-hidden selection:bg-[#3b82f6]/30 selection:text-[#3b82f6]" dir="rtl">
      
      {/* Right Panel: API Navigation Sidebar */}
      <aside className="w-72 bg-[#0a0a0f] border-l border-white/5 flex flex-col flex-shrink-0 z-20">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-display font-black text-white flex items-center gap-2 mb-4">
            <Terminal className="w-5 h-5 text-[#3b82f6]" />
            مستندات API
          </h2>
          
          <div className="relative w-full">
            <Search className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="جستجوی اندپوینت‌ها..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 pr-10 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#3b82f6]/50 transition-colors"
            />
          </div>
        </div>

        <div className="p-4 border-b border-white/5 bg-white/[0.02] space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-500" />
              وضعیت احراز هویت
            </span>
            <span className="text-emerald-500 font-bold">متصل</span>
          </div>
          
          <div className="space-y-1.5">
            <div className="text-xs text-gray-500">کلید API (محیط تست)</div>
            <div className="flex items-center gap-2 bg-black/20 border border-white/5 rounded p-1.5" dir="ltr">
              <Key className="w-3 h-3 text-gray-500" />
              <span className="text-xs text-gray-300 font-mono truncate">sk_test_51Nx...8mK9</span>
              <button className="ml-auto p-1 hover:text-white text-gray-500 transition-colors">
                <Copy className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 pt-1 border-t border-white/5">
            <span>محدودیت درخواست:</span>
            <span>{toPersianNum(1000)} / دقیقه</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {API_GROUPS.map(group => (
            <div key={group.id} className="space-y-1">
              <button 
                onClick={() => toggleGroup(group.id)}
                className="w-full flex items-center justify-between px-2 py-2 text-sm font-bold text-gray-400 hover:text-gray-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <group.icon className="w-4 h-4" />
                  {group.title}
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedGroups.includes(group.id) ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {expandedGroups.includes(group.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-1 pr-6 border-r border-white/10 mr-4 py-1">
                      {group.endpoints.map(endpoint => (
                        <button
                          key={endpoint.id}
                          onClick={() => {
                            setActiveEndpoint(endpoint.id);
                            setShowResponse(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all text-right ${activeEndpoint === endpoint.id ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
                        >
                          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${METHOD_COLORS[endpoint.method as keyof typeof METHOD_COLORS]}`} dir="ltr">
                            {endpoint.method}
                          </span>
                          <span className="truncate">{endpoint.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </aside>

      {/* Left Panel: Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#050508] relative z-10 overflow-y-auto custom-scrollbar">
        
        {/* Loading Bar */}
        <AnimatePresence>
          {isExecuting && (
            <motion.div 
              initial={{ width: 0, opacity: 1 }}
              animate={{ width: '100%' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "linear" }}
              className="absolute top-0 left-0 right-0 h-1 bg-[#3b82f6] z-50 shadow-[0_0_10px_#3b82f6]"
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {currentEndpoint && (
            <motion.div
              key={currentEndpoint.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="p-8 max-w-5xl mx-auto w-full space-y-12"
            >
              
              {/* Endpoint Header */}
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className={`text-sm font-mono font-bold px-2.5 py-1 rounded-md border ${METHOD_COLORS[currentEndpoint.method as keyof typeof METHOD_COLORS]}`} dir="ltr">
                    {currentEndpoint.method}
                  </span>
                  <h1 className="text-3xl font-bold text-white">{currentEndpoint.name}</h1>
                </div>
                
                <div className="flex items-center gap-3 bg-white/[0.02] border border-white/10 rounded-xl p-4 font-mono text-sm text-gray-300" dir="ltr">
                  <span className="text-gray-500">https://api.nexus.com</span>
                  <span className="text-white">{currentEndpoint.path}</span>
                  <button onClick={handleCopy} className="ml-auto p-1.5 rounded-md hover:bg-white/10 text-gray-500 hover:text-white transition-colors relative group">
                    {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    
                    {/* Tooltip */}
                    <AnimatePresence>
                      {isCopied && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-emerald-500 text-black text-[10px] font-bold rounded whitespace-nowrap font-sans"
                        >
                          کپی شد!
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </div>

              {/* AI Agent Integration Example (Highlighted) */}
              {currentEndpoint.id === 'ws-create' && (
                <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-[#3b82f6]/50 via-purple-500/50 to-emerald-500/50 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/20 via-purple-500/20 to-emerald-500/20 blur-xl group-hover:blur-2xl transition-all duration-500" />
                  <div className="relative bg-[#0a0a0f] rounded-2xl p-6 z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-white">یکپارچه‌سازی با هوش مصنوعی (Claude)</h3>
                    </div>
                    
                    <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                      شما می‌توانید از طریق API ما، به عامل‌های هوش مصنوعی خارجی اجازه دهید تا ساختارهای پیچیده را با زبان طبیعی ایجاد کنند.
                    </p>

                    <div className="bg-[#050508] border border-white/10 rounded-xl p-4 mb-4">
                      <div className="text-xs text-gray-500 mb-2">پرامپت کاربر (زبان طبیعی):</div>
                      <div className="text-emerald-400 font-medium">
                        "یک فضای کاری برای تیم مارکتینگ بساز با صفحات استراتژی، تقویم محتوا، و گزارش KPI"
                      </div>
                    </div>

                    <div className="bg-[#050508] border border-white/10 rounded-xl overflow-hidden" dir="ltr">
                      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5 text-xs text-gray-400 font-mono">
                        <span>POST /v1/workspaces</span>
                        <span>application/json</span>
                      </div>
                      <div className="p-4">
                        <SyntaxHighlightedJson data={{
                          name: "تیم مارکتینگ",
                          description: "فضای کاری ایجاد شده توسط هوش مصنوعی",
                          auto_scaffold: [
                            { type: "page", title: "استراتژی" },
                            { type: "page", title: "تقویم محتوا" },
                            { type: "page", title: "گزارش KPI" }
                          ]
                        }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Request Builder */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Parameters */}
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Settings className="w-5 h-5 text-gray-400" />
                    پارامترهای درخواست
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-300">نام فضای کاری</label>
                        <span className="text-[10px] text-red-400 font-mono bg-red-400/10 px-1.5 py-0.5 rounded">required</span>
                      </div>
                      <div className="relative" dir="ltr">
                        <input 
                          type="text" 
                          defaultValue="تیم مارکتینگ"
                          className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg py-2 px-3 text-sm text-white font-mono focus:outline-none focus:border-[#3b82f6]/50 transition-colors"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 font-mono">name</div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-300">توضیحات</label>
                        <span className="text-[10px] text-gray-500 font-mono bg-white/5 px-1.5 py-0.5 rounded">optional</span>
                      </div>
                      <div className="relative" dir="ltr">
                        <input 
                          type="text" 
                          defaultValue="فضای کاری ایجاد شده توسط هوش مصنوعی"
                          className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg py-2 px-3 text-sm text-white font-mono focus:outline-none focus:border-[#3b82f6]/50 transition-colors"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 font-mono">description</div>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleExecute}
                    disabled={isExecuting}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#3b82f6] text-white font-bold text-sm hover:bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isExecuting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current ml-1" />
                        اجرا کن
                      </>
                    )}
                  </button>
                </div>

                {/* Response Viewer */}
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Server className="w-5 h-5 text-gray-400" />
                    پاسخ سرور
                  </h3>
                  
                  <div className="bg-[#0a0a0f] border border-white/10 rounded-xl overflow-hidden h-[400px] flex flex-col" dir="ltr">
                    <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                        </div>
                        <span className="text-xs text-gray-500 font-mono">Response</span>
                      </div>
                      <AnimatePresence>
                        {showResponse && (
                          <motion.span 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-mono"
                          >
                            200 OK
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    <div className="flex-1 p-4 overflow-y-auto custom-scrollbar relative">
                      {isExecuting ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Loader2 className="w-8 h-8 text-[#3b82f6] animate-spin" />
                        </div>
                      ) : showResponse ? (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <SyntaxHighlightedJson data={MOCK_RESPONSE} />
                        </motion.div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-600 font-mono">
                          // Click "اجرا کن" to send request
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

    </div>
  );
};

export default APIExplorer;
