import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function WhatsAppWidget() {
  const whatsappNumber = "+910000000000"; // Harsh Yadav's number
  const message = "Hello Harsh sir, I would like to discuss insurance plans.";
  
  return (
    <motion.a
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#128C7E] transition-colors"
    >
      <MessageCircle size={32} fill="white" />
    </motion.a>
  );
}
