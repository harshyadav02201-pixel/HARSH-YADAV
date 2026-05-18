import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0A0B0E] border-t border-slate-800 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center font-bold text-white text-lg">
                HY
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white leading-tight">Harsh Yadav</h2>
                <p className="text-[10px] text-blue-400 uppercase tracking-widest font-bold">ICICI Prudential Advisory</p>
              </div>
            </div>
            <p className="text-slate-500 max-w-sm mb-8 text-sm leading-relaxed">
              Authorized ICICI Prudential Life Insurance advisor providing expert financial guidance and bespoke protection plans for families across Uttar Pradesh.
            </p>
            <div className="flex gap-4">
               {['LinkedIn', 'Twitter', 'Facebook'].map(s => (
                 <a key={s} href="#" className="w-8 h-8 rounded bg-dark-card border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all text-xs">
                   {s[0]}
                 </a>
               ))}
            </div>
          </div>
          
          <div>
            <h5 className="text-[10px] uppercase tracking-widest font-bold text-white mb-8">Navigation</h5>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="#home" className="hover:text-blue-400 transition-colors">Digital Dashboard</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Our Expertise</a></li>
              <li><a href="#quote" className="hover:text-blue-400 transition-colors">Quote Engine</a></li>
              <li><a href="#blog" className="hover:text-blue-400 transition-colors">Strategic Insights</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition-colors">Consultation</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-[10px] uppercase tracking-widest font-bold text-white mb-8">Governance</h5>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Service Terms</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">IRDAI Compliance</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Advisor Disclaimer</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-600 text-[10px] uppercase tracking-widest font-bold">
            © 2026 Harsh Yadav Advisory • IRDAI Registered (UP-BR-0912) • Primary Service: Bhadohi
          </p>
          <div className="flex gap-4 text-slate-600 text-[10px] font-bold uppercase tracking-widest grayscale opacity-50">
            <span>Mirzapur</span>
            <span>Varanasi</span>
            <span>Jaunpur</span>
            <span>Prayagraj</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
