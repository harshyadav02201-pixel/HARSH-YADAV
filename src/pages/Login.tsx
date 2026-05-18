import React from 'react';
import { motion } from 'motion/react';
import { auth } from '../services/firebase';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  onAuthStateChanged
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ChevronRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate('/dashboard');
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError('Invalid identity credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[150px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-dark-card border border-slate-800 rounded-3xl shadow-2xl p-10 md:p-12">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-600/20">
              <Lock size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Secure Gateway</h1>
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">Client Verification Required</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-600/10 border border-red-600/20 rounded-xl text-red-500 text-xs text-center font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-6 mb-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Authorized Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@provider.com"
                  className="w-full bg-dark-input px-12 py-4 rounded-xl border border-slate-800 text-white outline-none focus:ring-1 focus:ring-blue-600 transition-all placeholder:text-slate-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Security Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-dark-input px-12 py-4 rounded-xl border border-slate-800 text-white outline-none focus:ring-1 focus:ring-blue-600 transition-all placeholder:text-slate-700"
                />
              </div>
            </div>

            <button 
              disabled={loading}
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 group"
            >
              Access Vault
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
               <div className="w-full border-t border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
              <span className="bg-dark-card px-4 text-slate-500">Authorized Partners Only</span>
            </div>
          </div>

          <button 
            onClick={handleGoogleLogin}
            className="w-full py-4 bg-dark-input border border-slate-800 text-white font-bold rounded-xl flex items-center justify-center gap-3 transition-colors hover:bg-slate-800"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
            Continue with G-Account
          </button>

          <p className="mt-8 text-center text-xs text-slate-500">
            For login assistance in Bhadohi, Varanasi, Mirzapur, Jaunpur or Prayagraj, please contact Harsh Yadav at <span className="text-blue-400 font-bold">+91 00000 00000</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
