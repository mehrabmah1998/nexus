import React from 'react';
import { SectionBackground } from './UIElements';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  return (
    <div className="relative min-h-screen bg-transparent overflow-hidden selection:bg-[#3b82f6] selection:text-white" dir="rtl">
      <SectionBackground fadeTop={false} fadeBottom={false} />
      
      {/* Simple Dashboard Navbar */}
      <nav className="relative z-20 border-b border-white/10 bg-white/[0.02] backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#3b82f6]/20 border border-[#3b82f6]/40 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" />
                <path d="M14 2V8H20" />
              </svg>
            </div>
            <span className="font-display font-bold text-white">Momentum</span>
          </div>
          
          <button 
            onClick={onLogout}
            className="text-sm font-bold text-gray-400 hover:text-white transition-colors"
          >
            خروج
          </button>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-display font-black text-white mb-8">فضای کاری شما</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2 bg-white/[0.02] border border-white/10 rounded-2xl p-8 backdrop-blur-sm min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">هنوز پروژه‌ای ندارید</h3>
              <p className="text-gray-400 text-sm mb-6">اولین پروژه خود را بسازید و کار را شروع کنید.</p>
              <button className="px-6 py-3 rounded-xl bg-[#3b82f6] text-white font-bold text-sm hover:bg-blue-500 transition-colors">
                ایجاد پروژه جدید
              </button>
            </div>
          </div>
          
          <div className="col-span-1 space-y-6">
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="font-bold text-white mb-4">فعالیت‌های اخیر</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <p className="text-sm text-gray-400">فضای کاری با موفقیت ایجاد شد.</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#3b82f6]" />
                  <p className="text-sm text-gray-400">به Momentum خوش آمدید!</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#3b82f6]/20 to-purple-500/20 border border-white/10 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#3b82f6]/30 blur-3xl rounded-full" />
              <h3 className="font-bold text-white mb-2 relative z-10">ارتقا به نسخه پرو</h3>
              <p className="text-sm text-gray-300 mb-4 relative z-10">از تمام امکانات هوش مصنوعی Momentum استفاده کنید.</p>
              <button className="w-full py-2.5 rounded-lg bg-white text-black font-bold text-sm hover:bg-gray-100 transition-colors relative z-10">
                مشاهده پلن‌ها
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
