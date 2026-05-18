import React from 'react';
import { motion } from 'motion/react';
import { Shield, TrendingUp, HeartPulse, GraduationCap, Coins, Briefcase } from 'lucide-react';

const plans = [
  {
    title: "Term Insurance",
    description: "Secure your family's future with high life coverage at affordable premiums. Pure protection plan.",
    icon: Shield,
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "Retirement Plans",
    description: "Build a corpus for your golden years. Ensuring regular income and financial independence.",
    icon: Coins,
    color: "bg-orange-100 text-orange-600"
  },
  {
    title: "ULIP Plans",
    description: "Get the dual benefit of insurance and market-linked returns. Wealth creation with protection.",
    icon: TrendingUp,
    color: "bg-purple-100 text-purple-600"
  },
  {
    title: "Child Education",
    description: "Plan for your child's milestones. Secure their higher education even in your absence.",
    icon: GraduationCap,
    color: "bg-green-100 text-green-600"
  },
  {
    title: "Endowment Policy",
    description: "A combination of protection and guaranteed savings. Safest way to meet long term goals.",
    icon: Briefcase,
    color: "bg-indigo-100 text-indigo-600"
  },
  {
    title: "Health Riders",
    description: "Add-on covers for critical illnesses and accidental disability for comprehensive protection.",
    icon: HeartPulse,
    color: "bg-red-100 text-red-600"
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-dark-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-blue-500 uppercase tracking-[0.3em] mb-4">Our Expertise</h2>
          <h3 className="text-3xl md:text-5xl font-light text-white mb-6">Strategic <span className="text-blue-500 italic">Protection</span> Plans</h3>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
            I specialize in identifying the right ICICI Prudential products that align with your specific financial goals and life stage.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-dark-card p-8 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all group relative overflow-hidden"
            >
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-blue-600/5 rounded-full blur-2xl group-hover:bg-blue-600/10 transition-colors" />
              
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-8 bg-dark-input border border-slate-800 transition-transform group-hover:scale-110 group-hover:border-blue-500/30`}>
                <plan.icon size={28} className="text-blue-400" />
              </div>
              
              <h4 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{plan.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                {plan.description}
              </p>
              
              <a 
                href="#quote" 
                className="text-xs font-bold text-blue-500 uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all"
              >
                Inquire Now
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  →
                </motion.span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
