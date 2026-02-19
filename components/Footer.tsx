
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0a0f] border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2">
            <div className="text-3xl font-display font-bold text-[#3b82f6] mb-6">NEXUS</div>
            <p className="text-gray-500 max-w-sm leading-relaxed text-lg font-light">
              نکسوس فراتر از یک ابزار است. ما در حال بازتعریف نحوه تعامل انسان با داده‌ها و هوش مصنوعی هستیم. آینده فضای کاری اینجاست.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6">محصول</h4>
            <ul className="space-y-4 text-gray-500 font-normal">
              <li><a href="#" className="hover:text-[#3b82f6] transition-colors">ویژگی‌ها</a></li>
              <li><a href="#" className="hover:text-[#3b82f6] transition-colors">نقشه راه</a></li>
              <li><a href="#" className="hover:text-[#3b82f6] transition-colors">تغییرات</a></li>
              <li><a href="#" className="hover:text-[#3b82f6] transition-colors">امنیت</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">جامعه</h4>
            <ul className="space-y-4 text-gray-500 font-normal">
              <li><a href="#" className="hover:text-[#3b82f6] transition-colors">توییتر (X)</a></li>
              <li><a href="#" className="hover:text-[#3b82f6] transition-colors">دیسکورد</a></li>
              <li><a href="#" className="hover:text-[#3b82f6] transition-colors">گیت‌هاب</a></li>
              <li><a href="#" className="hover:text-[#3b82f6] transition-colors">لینکدین</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 text-gray-600 text-sm gap-4">
          <div>© ۱۴۰۳ نکسوس. تمامی حقوق محفوظ است.</div>
          <div className="flex gap-8 font-normal">
            <a href="#" className="hover:text-white transition-colors">حریم خصوصی</a>
            <a href="#" className="hover:text-white transition-colors">شرایط استفاده</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
