import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, CheckCircle2, Loader2, IndianRupee, ChevronRight } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import { cn } from '../lib/utils';

export default function QuoteGenerator() {
  const [step, setStep] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    district: 'Bhadohi',
    age: 25,
    insuranceType: 'term',
    coverage: 5000000,
    occupation: 'Salaried',
    smoker: 'no',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await addDoc(collection(db, 'quotes'), {
        ...formData,
        coverageAmount: formData.coverage,
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Submission Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateEstimate = () => {
    let baseRate = formData.insuranceType === 'term' ? 0.0001 : 0.005;
    if (formData.smoker === 'yes') baseRate *= 1.5;
    const ageMultiplier = (formData.age / 20);
    const monthly = (formData.coverage * baseRate * ageMultiplier) / 12;
    return Math.round(monthly);
  };

  return (
    <section id="quote" className="py-24 bg-dark-bg relative overflow-hidden border-t border-slate-900">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -mr-64 -mt-64 opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <h2 className="text-sm font-bold text-blue-500 uppercase tracking-[0.4em] mb-4">Strategic Planning</h2>
            <h3 className="text-4xl md:text-6xl font-light text-white mb-8 leading-tight">Bespoke <span className="text-blue-500 italic">Insurance</span> Analysis</h3>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              Serving Bhadohi, Varanasi, Mirzapur, Jaunpur, and Prayagraj districts with security-first financial advisory.
            </p>
            
            <div className="space-y-4">
              {[
                { title: 'Transparent Advisory', desc: 'No hidden costs, just honest financial guidance across UP.' },
                { title: 'Regional Expertise', desc: 'Deep understanding of local needs in Bhadohi and neighbors.' },
                { title: 'Secure Vault', desc: 'Your preferences are encrypted and saved for expert review.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-5 bg-dark-card rounded-2xl border border-slate-800/50 shadow-lg">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-blue-600/10 border border-blue-600/20">
                    <CheckCircle2 className="text-blue-400" size={16} />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-sm">{item.title}</h5>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 bg-dark-card rounded-3xl border border-slate-800 shadow-2xl p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
            
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit} 
                  className="space-y-8"
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Legal Name"
                        className="w-full bg-dark-input px-4 py-4 rounded-xl border border-slate-800 text-white text-sm focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-800"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Primary District</label>
                       <select 
                        className="w-full bg-dark-input px-4 py-4 rounded-xl border border-slate-800 text-white text-sm focus:ring-1 focus:ring-blue-600 outline-none transition-all appearance-none cursor-pointer"
                        value={formData.district}
                        onChange={(e) => setFormData({...formData, district: e.target.value})}
                      >
                        <option value="Bhadohi">Bhadohi</option>
                        <option value="Varanasi">Varanasi</option>
                        <option value="Mirzapur">Mirzapur</option>
                        <option value="Jaunpur">Jaunpur</option>
                        <option value="Prayagraj">Prayagraj</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="space-y-2 md:col-span-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Age</label>
                      <input 
                        required
                        type="number" 
                        className="w-full bg-dark-input px-4 py-4 rounded-xl border border-slate-800 text-white text-sm focus:ring-1 focus:ring-blue-600 outline-none transition-all"
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-3">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Occupation Status</label>
                       <select 
                        className="w-full bg-dark-input px-4 py-4 rounded-xl border border-slate-800 text-white text-sm focus:ring-1 focus:ring-blue-600 outline-none transition-all appearance-none cursor-pointer"
                        value={formData.occupation}
                        onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                      >
                        <option value="Salaried">Salaried Professional</option>
                        <option value="Self-Employed">Business / Self-Employed</option>
                        <option value="Government">Government Service</option>
                        <option value="Farmer">Agricultural Specialist</option>
                      </select>
                    </div>
                  </div>

                   <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Policy Category</label>
                      <select 
                        className="w-full bg-dark-input px-4 py-4 rounded-xl border border-slate-800 text-white text-sm focus:ring-1 focus:ring-blue-600 outline-none transition-all appearance-none cursor-pointer"
                        value={formData.insuranceType}
                        onChange={(e) => setFormData({...formData, insuranceType: e.target.value as any})}
                      >
                        <option value="term">Life Shield (Term Insurance)</option>
                        <option value="endowment">Savings Plus (Endowment)</option>
                        <option value="ulip">Wealth Engine (ULIP)</option>
                        <option value="retirement">Retirement Legacy</option>
                        <option value="child">Child Education Fund</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Smoker Status</label>
                       <div className="flex gap-4">
                          {['no', 'yes'].map(opt => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setFormData({...formData, smoker: opt})}
                              className={cn(
                                "flex-1 py-4 rounded-xl border font-bold text-xs uppercase tracking-widest transition-all",
                                formData.smoker === opt 
                                  ? "bg-blue-600 text-white border-blue-600" 
                                  : "bg-dark-input text-slate-500 border-slate-800 hover:border-slate-700"
                              )}
                            >
                              {opt}
                            </button>
                          ))}
                       </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Target Protection</label>
                      <span className="text-blue-400 font-bold text-xl">₹{(formData.coverage / 100000).toLocaleString()} <span className="text-xs uppercase ml-1">Lakhs</span></span>
                    </div>
                    <input 
                      type="range" 
                      min="500000" 
                      max="20000000" 
                      step="500000"
                      className="w-full h-2 bg-dark-input rounded-full appearance-none cursor-pointer accent-blue-600 border border-slate-800"
                      value={formData.coverage}
                      onChange={(e) => setFormData({...formData, coverage: parseInt(e.target.value)})}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Contact Email</label>
                        <input 
                          required
                          type="email" 
                          placeholder="client@vault.com"
                          className="w-full bg-dark-input px-4 py-4 rounded-xl border border-slate-800 text-white text-sm focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-800"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Contact Mobile</label>
                        <input 
                          required
                          type="tel" 
                          placeholder="+91 00000 00000"
                          className="w-full bg-dark-input px-4 py-4 rounded-xl border border-slate-800 text-white text-sm focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-800"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                  </div>

                  <div className="p-8 bg-[#0A0B0E]/80 rounded-2xl border border-slate-800 shadow-inner flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-2">Calculated Indicator</p>
                      <p className="text-4xl font-bold text-white flex items-center gap-2">
                        <span className="text-blue-500">₹</span>
                        {calculateEstimate().toLocaleString()}
                        <span className="text-xs font-medium text-slate-600 uppercase tracking-tighter">/ month Avg.*</span>
                      </p>
                    </div>
                    <div className="bg-blue-600/10 p-5 rounded-2xl text-blue-400 border border-blue-600/20 shadow-xl shadow-blue-600/5">
                      <IndianRupee size={28} />
                    </div>
                  </div>

                  <button 
                    disabled={loading}
                    type="submit"
                    className="w-full py-5 bg-blue-600 text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/30 disabled:opacity-50 group uppercase tracking-widest text-sm"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : <>Initiate Full Analysis <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-24 h-24 bg-green-900/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-900/40">
                    <CheckCircle2 size={48} />
                  </div>
                  <h4 className="text-3xl font-bold text-white mb-6">Profile Transmitted</h4>
                  <p className="text-slate-400 mb-12 leading-relaxed max-w-sm mx-auto text-lg font-light">
                    Your financial profile for {formData.district} region has been securely logged. <br />
                    <span className="text-blue-400 font-bold italic">Harsh Yadav sir</span> will initiate contact via {formData.phone} shortly.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="px-10 py-4 bg-dark-input text-white border border-slate-800 rounded-2xl font-bold hover:bg-slate-800 transition-all tracking-widest text-xs uppercase"
                  >
                    Analyze Another Profile
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
