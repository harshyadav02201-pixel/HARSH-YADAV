import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, Award, History, Building2 } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden bg-dark-bg">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] -mr-96 -mt-96" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px] -ml-48 -mb-48" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7"
        >
          <div className="mb-6 flex flex-wrap gap-3">
            <span className="bg-blue-600/20 text-blue-400 text-[10px] px-3 py-1 rounded uppercase font-bold tracking-widest border border-blue-600/30">
              Uttar Pradesh Region
            </span>
            <span className="bg-slate-800/50 text-slate-400 text-[10px] px-3 py-1 rounded uppercase font-bold tracking-widest border border-slate-700/30">
              Bhadohi • Varanasi • Mirzapur • Jaunpur • Prayagraj
            </span>
          </div>
          
          <h2 className="text-4xl md:text-7xl font-light text-white leading-tight mb-6">
            Securing Your <span className="text-blue-500 italic">Future</span> <br /> 
            with Precision.
          </h2>
          
          <p className="text-lg text-slate-400 mb-10 max-w-xl leading-relaxed">
            With over a decade of partnership with ICICI Prudential, Harsh Yadav provides bespoke insurance solutions across Bhadohi and neighboring districts. Dedicated to transparent, security-first advisory.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <a 
              href="#quote" 
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
            >
              Consult Harsh Yadav
              <ArrowRight size={20} />
            </a>
            <a 
              href="#services" 
              className="px-8 py-4 border border-slate-700 text-slate-300 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
            >
              Explore Plans
            </a>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="p-4 bg-dark-card rounded-xl border border-slate-800">
              <div className="text-3xl font-bold text-white mb-1">12+</div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Years Exp.</div>
            </div>
            <div className="p-4 bg-dark-card rounded-xl border border-slate-800">
              <div className="text-3xl font-bold text-white mb-1">1.5k+</div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Policies</div>
            </div>
            <div className="p-4 bg-dark-card rounded-xl border border-slate-800">
              <div className="text-3xl font-bold text-white mb-1">99%</div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Claims Settled</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-5 relative hidden lg:block"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-dark-bg rounded-2xl overflow-hidden border border-slate-800 shadow-2xl aspect-[4/5]">
              <img 
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1000" 
                alt="Insurance Protection" 
                className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-dark-card/80 backdrop-blur-md rounded-xl border border-slate-700 shadow-lg">
                <p className="text-white font-bold text-xl mb-1">Harsh Yadav</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-blue-400 text-xs font-bold uppercase tracking-widest">Active Consultant</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
