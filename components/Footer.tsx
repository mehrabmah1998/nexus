
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent border-t border-white/10 pt-24 pb-12 relative z-10 overflow-hidden">
      {/* Subtle background glow for footer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#3b82f6] to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 2V8H20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-display font-black tracking-tight text-white">Momentum</div>
            </div>
            
            <p className="text-gray-400 max-w-md leading-relaxed text-lg font-light mb-8">
              Momentum فراتر از یک ابزار است. ما در حال بازتعریف نحوه تعامل انسان با داده‌ها و هوش مصنوعی هستیم. آینده فضای کاری اینجاست.
            </p>

            <div className="flex items-center gap-2 max-w-md bg-white/5 border border-white/10 rounded-2xl p-1.5 focus-within:border-[#3b82f6]/50 focus-within:bg-white/10 transition-all">
              <input 
                type="email" 
                placeholder="آدرس ایمیل شما..." 
                className="bg-transparent border-none outline-none text-white px-4 py-2 w-full placeholder:text-gray-600 text-sm"
              />
              <button className="bg-[#3b82f6] hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors whitespace-nowrap">
                عضویت
              </button>
            </div>
          </div>
          
          {/* Links */}
          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="font-bold text-white mb-6 text-lg">محصول</h4>
            <ul className="space-y-4 text-gray-400 font-normal">
              <li><a href="#" className="hover:text-[#3b82f6] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-transparent transition-colors group-hover:bg-[#3b82f6]"></span>ویژگی‌ها</a></li>
              <li><a href="#" className="hover:text-[#3b82f6] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-transparent transition-colors group-hover:bg-[#3b82f6]"></span>نقشه راه</a></li>
              <li><a href="#" className="hover:text-[#3b82f6] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-transparent transition-colors group-hover:bg-[#3b82f6]"></span>تغییرات</a></li>
              <li><a href="#" className="hover:text-[#3b82f6] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-transparent transition-colors group-hover:bg-[#3b82f6]"></span>امنیت</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold text-white mb-6 text-lg">شرکت</h4>
            <ul className="space-y-4 text-gray-400 font-normal">
              <li><a href="#" className="hover:text-[#3b82f6] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-transparent transition-colors group-hover:bg-[#3b82f6]"></span>درباره ما</a></li>
              <li><a href="#" className="hover:text-[#3b82f6] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-transparent transition-colors group-hover:bg-[#3b82f6]"></span>فرصت‌های شغلی</a></li>
              <li><a href="#" className="hover:text-[#3b82f6] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-transparent transition-colors group-hover:bg-[#3b82f6]"></span>وبلاگ</a></li>
              <li><a href="#" className="hover:text-[#3b82f6] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-transparent transition-colors group-hover:bg-[#3b82f6]"></span>تماس با ما</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold text-white mb-6 text-lg">جامعه</h4>
            <ul className="space-y-4 text-gray-400 font-normal">
              <li><a href="#" className="hover:text-[#3b82f6] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-transparent transition-colors group-hover:bg-[#3b82f6]"></span>توییتر (X)</a></li>
              <li><a href="#" className="hover:text-[#3b82f6] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-transparent transition-colors group-hover:bg-[#3b82f6]"></span>دیسکورد</a></li>
              <li><a href="#" className="hover:text-[#3b82f6] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-transparent transition-colors group-hover:bg-[#3b82f6]"></span>گیت‌هاب</a></li>
              <li><a href="#" className="hover:text-[#3b82f6] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-transparent transition-colors group-hover:bg-[#3b82f6]"></span>لینکدین</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-gray-500 text-sm gap-4">
          <div className="flex items-center gap-2">
            <span>© ۱۴۰۳ Momentum. تمامی حقوق محفوظ است.</span>
            <span className="hidden md:inline-block w-1 h-1 rounded-full bg-gray-700"></span>
            <span className="hidden md:inline-block">طراحی شده با ❤️ در ایران</span>
          </div>
          <div className="flex gap-6 font-normal">
            <a href="#" className="hover:text-white transition-colors">حریم خصوصی</a>
            <a href="#" className="hover:text-white transition-colors">شرایط استفاده</a>
            <a href="#" className="hover:text-white transition-colors">کوکی‌ها</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
