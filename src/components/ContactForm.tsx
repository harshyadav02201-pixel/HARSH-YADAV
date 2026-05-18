import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase';

export default function ContactForm() {
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    content: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'messages'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Contact Error:', error);
      alert('Failed to send message. Please try WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-dark-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-dark-card rounded-[2rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-slate-800">
          {/* Info Side */}
          <div className="lg:w-2/5 p-12 lg:p-16 bg-[#12141A] text-white border-r border-slate-800">
            <div className="mb-8">
              <span className="bg-blue-600/20 text-blue-400 text-[10px] px-2 py-1 rounded uppercase font-bold tracking-widest border border-blue-600/30">
                Direct Advisory
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-light mb-8 leading-tight">
              Consult with <br /><span className="text-blue-500 italic">Harsh Yadav</span>
            </h3>
            <p className="text-slate-400 mb-12 text-sm leading-relaxed">
              With over a decade of partnership with ICICI Prudential, Harsh Yadav provides bespoke insurance solutions across Uttar Pradesh.
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center shrink-0 border border-slate-700">
                  <Phone size={18} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Direct Line</p>
                  <p className="text-lg font-medium">+91 00000 00000</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center shrink-0 border border-slate-700">
                  <Mail size={18} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Official Email</p>
                  <p className="text-lg font-medium break-all">harshyadav02201@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-16 border-t border-slate-800/50">
              <p className="text-[10px] text-slate-500 mb-4 font-bold uppercase tracking-widest">Global Reach</p>
              <div className="flex gap-3">
                {['IN', 'FB', 'TW'].map(social => (
                  <a key={social} href="#" className="w-8 h-8 rounded bg-slate-800 text-xs flex items-center justify-center hover:bg-blue-600 transition-colors border border-slate-700">
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-3/5 p-12 lg:p-20 bg-dark-card">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form 
                  key="contact-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: 20 }}
                  onSubmit={handleSubmit} 
                  className="space-y-8"
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Your Name</label>
                      <input 
                        required
                        type="text" 
                        className="w-full bg-dark-input px-4 py-3 rounded-lg border border-slate-700 text-white text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                      <input 
                        required
                        type="email" 
                        className="w-full bg-dark-input px-4 py-3 rounded-lg border border-slate-700 text-white text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Inquiry Subject</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-dark-input px-4 py-3 rounded-lg border border-slate-700 text-white text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600"
                      placeholder="e.g. Life Protect Pro Inquiry"
                      value={formData.subject}
                      onChange={e => setFormData({...formData, subject: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Your Message</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full bg-dark-input px-4 py-3 rounded-lg border border-slate-700 text-white text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600 resize-none"
                      placeholder="How can we assist you today?"
                      value={formData.content}
                      onChange={e => setFormData({...formData, content: e.target.value})}
                    />
                  </div>
                  
                  <button 
                    disabled={loading}
                    type="submit"
                    className="w-full md:w-auto px-10 py-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 border border-slate-600 shadow-xl"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                    Submit Inquiry
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <div className="w-24 h-24 bg-green-900/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-900/30">
                    <CheckCircle2 size={48} />
                  </div>
                  <h4 className="text-3xl font-bold text-white mb-4">Transmission Successful</h4>
                  <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-md mx-auto">
                    Your inquiry has been logged. Harsh Yadav sir will respond to your security-first advisory request shortly.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-blue-500 font-bold text-lg hover:underline"
                  >
                    Send another transmission
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
