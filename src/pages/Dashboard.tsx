import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  ShieldCheck, 
  Clock, 
  Download, 
  LogOut, 
  PlusCircle, 
  AlertCircle,
  FileText,
  TrendingUp,
  User,
  MessageCircle,
  Send,
  CheckCircle2
} from 'lucide-react';
import { auth, db } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Dashboard() {
  const [user, setUser] = React.useState<any>(null);
  const [policies, setPolicies] = React.useState<any[]>([]);
  const [claims, setClaims] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [message, setMessage] = React.useState('');
  const [sendingMsg, setSendingMsg] = React.useState(false);
  const [msgSent, setMsgSent] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        await fetchData(u.uid);
      } else {
        navigate('/login');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const fetchData = async (uid: string) => {
    try {
      const pQuery = query(collection(db, 'policies'), where('userId', '==', uid));
      const cQuery = query(collection(db, 'claims'), where('userId', '==', uid));
      
      const [pSnap, cSnap] = await Promise.all([getDocs(pQuery), getDocs(cQuery)]);
      
      setPolicies(pSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setClaims(cSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setSendingMsg(true);
    try {
      await addDoc(collection(db, 'messages'), {
        userId: user.uid,
        userName: user.displayName || user.email,
        content: message,
        createdAt: serverTimestamp(),
        type: 'premium_portal'
      });
      setMsgSent(true);
      setMessage('');
      setTimeout(() => setMsgSent(false), 5000);
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setSendingMsg(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Baron */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back, {user?.displayName || 'Client'}</h1>
            <p className="text-slate-400">Harsh Yadav Advisory • Secure Portal</p>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-all">
              <PlusCircle size={18} />
              New Policy
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-dark-card border border-slate-800 text-slate-300 rounded-lg font-bold text-sm hover:bg-slate-800 transition-all"
            >
              <LogOut size={18} />
              Secure Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-dark-card border border-slate-800 p-6 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-600/10 rounded-xl">
                <ShieldCheck className="text-blue-400" size={24} />
              </div>
              <span className="text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded">ALL ACTIVE</span>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Active Policies</p>
            <h3 className="text-4xl font-bold text-white">{policies.length}</h3>
          </div>

          <div className="bg-dark-card border border-slate-800 p-6 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-orange-600/10 rounded-xl">
                <BarChart3 className="text-orange-400" size={24} />
              </div>
              <span className="text-[10px] font-bold text-orange-400 bg-orange-400/10 px-2 py-1 rounded">PROCESSING</span>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Open Claims</p>
            <h3 className="text-4xl font-bold text-white">{claims.filter(c => c.status !== 'approved').length}</h3>
          </div>

          <div className="bg-dark-card border border-slate-800 p-6 rounded-2xl relative overflow-hidden">
             <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-green-600/10 rounded-xl">
                <TrendingUp className="text-green-400" size={24} />
              </div>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Renewal Due</p>
            <h3 className="text-2xl font-bold text-white">Nov 12, 2026</h3>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content: Policies */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-dark-card border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
              <div className="px-8 py-6 border-b border-slate-800 flex justify-between items-center">
                <h2 className="font-bold text-white flex items-center gap-2">
                   <FileText size={20} className="text-blue-500" />
                   Active Policy Portfolios
                </h2>
                <button className="text-xs text-blue-400 hover:underline">Download Statement</button>
              </div>
              <div className="p-0">
                {policies.length > 0 ? (
                  <div className="divide-y divide-slate-800">
                    {policies.map(policy => (
                      <div key={policy.id} className="p-8 hover:bg-slate-800/30 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-dark-input rounded-xl border border-slate-700 flex items-center justify-center">
                            <ShieldCheck className="text-blue-400" size={24} />
                          </div>
                          <div>
                            <h4 className="font-bold text-white uppercase text-sm tracking-wide">{policy.type} Protect</h4>
                            <p className="text-xs text-slate-500 font-mono">#{policy.policyNumber}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full md:w-auto">
                          <div>
                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter mb-1">Sum Assured</p>
                            <p className="text-sm font-bold text-white">₹{(policy.sumAssured / 100000).toLocaleString()}L</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter mb-1">Status</p>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-900/30 text-green-400 border border-green-900/50 uppercase font-bold">
                              {policy.status}
                            </span>
                          </div>
                          <div className="flex items-center justify-end">
                             <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
                               <Download size={18} />
                             </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-20 text-center">
                    <AlertCircle size={48} className="mx-auto mb-4 text-slate-700" />
                    <p className="text-slate-500 mb-6">No active policies found in your vault.</p>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm">Contact Advisor</button>
                  </div>
                )}
              </div>
            </div>

            {/* Claims Table */}
            <div className="bg-dark-card border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
               <div className="px-8 py-6 border-b border-slate-800">
                <h2 className="font-bold text-white flex items-center gap-2">
                   <Clock size={20} className="text-orange-500" />
                   Recent Claim History
                </h2>
              </div>
              <div className="p-8">
                 {claims.length > 0 ? (
                   <div className="space-y-4">
                     {claims.map(claim => (
                       <div key={claim.id} className="flex items-center justify-between p-4 bg-dark-input rounded-xl border border-slate-800/50">
                         <div className="flex items-center gap-4">
                           <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                           <div>
                              <p className="text-sm font-bold text-white">Policy: {claim.policyNumber}</p>
                              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{claim.status}</p>
                           </div>
                         </div>
                         <div className="text-right">
                            <p className="text-sm font-bold text-white">₹{claim.amount.toLocaleString()}</p>
                            <p className="text-[10px] text-slate-500">Updated: Dec 12</p>
                         </div>
                       </div>
                     ))}
                   </div>
                 ) : (
                    <div className="text-center py-10 opacity-50">
                      <p className="text-sm text-slate-500 italic">No claims filed in the last 12 months.</p>
                    </div>
                 )}
              </div>
            </div>
          </div>

          {/* Sidebar: Advisor Contact */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl shadow-xl border border-white/10 text-white relative overflow-hidden group">
               <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
               <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/30 shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400" 
                      alt="Harsh Yadav"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                     <h5 className="font-bold text-xl">Harsh Yadav</h5>
                     <p className="text-blue-100 text-sm opacity-80">Principal Advisor</p>
                  </div>
               </div>
               <p className="text-sm text-blue-50 mb-8 leading-relaxed">
                 Need immediate assistance with a claim or document? Harsh sir is available for 1:1 consultation for premium clients.
               </p>
               <a 
                 href="tel:+910000000000"
                 className="flex items-center justify-center gap-2 w-full py-4 bg-white text-blue-700 font-bold rounded-xl shadow-lg hover:bg-blue-50 transition-all hover:scale-[1.02]"
               >
                 <MessageCircle size={20} />
                 Request Fast Track Call
               </a>
            </div>

            <div id="secure-messenger" className="bg-dark-card border border-slate-800 p-8 rounded-3xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl -mr-16 -mt-16" />
               <h5 className="font-bold text-white mb-6 uppercase text-[10px] tracking-[0.2em] text-slate-500 flex items-center gap-2">
                 <ShieldCheck size={14} className="text-blue-500" />
                 Secure Messenger
               </h5>
               
               <AnimatePresence mode="wait">
                 {msgSent ? (
                   <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="py-6 text-center"
                   >
                     <div className="w-12 h-12 bg-green-900/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-900/30">
                       <CheckCircle2 size={24} />
                     </div>
                     <p className="text-sm font-bold text-white mb-1">Message Transmitted</p>
                     <p className="text-[10px] text-slate-500 uppercase tracking-widest">Harsh sir will respond shortly</p>
                   </motion.div>
                 ) : (
                   <motion.form 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSendMessage} 
                    className="space-y-4"
                   >
                     <textarea 
                       required
                       rows={3}
                       placeholder="Security query or claim update..."
                       className="w-full bg-dark-input px-4 py-3 rounded-xl border border-slate-800 text-white text-xs focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-700 resize-none"
                       value={message}
                       onChange={(e) => setMessage(e.target.value)}
                     />
                     <button 
                       disabled={sendingMsg}
                       type="submit"
                       className="w-full py-3 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-600/20 rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                     >
                       {sendingMsg ? (
                         <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                       ) : (
                         <>
                           Transmit Securely
                           <Send size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                         </>
                       )}
                     </button>
                   </motion.form>
                 )}
               </AnimatePresence>
            </div>

            <div className="bg-dark-card border border-slate-800 p-8 rounded-3xl">
               <h5 className="font-bold text-white mb-6 uppercase text-[10px] tracking-[0.2em] text-slate-500">Secure Notifications</h5>
               <div className="space-y-6">
                  <div className="flex gap-4 p-4 bg-red-600/5 border border-red-600/20 rounded-xl">
                     <AlertCircle size={20} className="text-red-400 shrink-0" />
                     <p className="text-xs text-red-100/70">Renewal for <span className="font-bold text-white">IC-881922</span> is due in 3 days. Pay now to avoid lapse.</p>
                  </div>
                  <div className="flex gap-4 p-4 bg-blue-600/5 border border-blue-600/20 rounded-xl">
                     <PlusCircle size={20} className="text-blue-400 shrink-0" />
                     <p className="text-xs text-blue-100/70">New regulatory guidelines for 2026 are now effective. <span className="text-blue-400 font-bold cursor-pointer">Read more</span></p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Persistent Floating Contact Trigger for Premium Clients */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-8 right-8 z-50 group flex flex-col items-end gap-3"
      >
        <div className="bg-dark-card border border-slate-800 p-3 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 pointer-events-none">
          <p className="text-[10px] font-bold text-white uppercase tracking-widest whitespace-nowrap">Priority Advisory Live</p>
        </div>
        <button 
          onClick={() => {
            const el = document.getElementById('secure-messenger');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-14 h-14 bg-blue-600 text-white rounded-2xl shadow-2xl shadow-blue-600/30 flex items-center justify-center hover:bg-blue-700 transition-all hover:scale-110 active:scale-95 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <MessageCircle size={28} className="relative z-10" />
        </button>
      </motion.div>
    </div>
  );
}
