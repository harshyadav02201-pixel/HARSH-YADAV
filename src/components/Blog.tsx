import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, ArrowRight, Sparkles, Loader2, Search, Filter, Share2, Twitter, Facebook, Link as LinkIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';

const categories = ['All', 'Life Insurance', 'Health Insurance', 'Investment', 'Tax Planning'];

const initialPosts = [
  {
    id: '1',
    title: 'Why Term Insurance is Essential for Families in Bhadohi',
    excerpt: 'Discover why pure protection plans are the foundation of any sound financial strategy for families in our district...',
    category: 'Life Insurance',
    author: 'Harsh Yadav',
    date: 'Jan 15, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'Tax Saving Tips for Varanasi and Bhadohi Residents',
    excerpt: 'Learn how ICICI Prudential plans can help you maximize your tax benefits under 80C while securing your life...',
    category: 'Tax Planning',
    author: 'Harsh Yadav',
    date: 'Feb 10, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'Health Insurance: A Priority for Mirzapur Households',
    excerpt: 'Medical costs are rising. Here is why a comprehensive health shield is non-negotiable in current times...',
    category: 'Health Insurance',
    author: 'Harsh Yadav',
    date: 'Mar 05, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1505751172107-1696413565d0?auto=format&fit=crop&q=80&w=800'
  }
];

export default function Blog() {
  const [posts, setPosts] = React.useState(initialPosts);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('All');

  const generateAIInsight = async () => {
    setIsGenerating(true);
    try {
      const resp = await fetch('/api/generate-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: 'ICICI Prudential Life Insurance Benefits in Uttar Pradesh context' })
      });
      const data = await resp.json();
      
      const content = data.content;
      const titleMatch = content.match(/Title:\s*(.*)/i);
      const excerptMatch = content.match(/Excerpt:\s*(.*)/i);
      const contentParts = content.split(/Content:\s*/i);
      
      const title = titleMatch ? titleMatch[1].trim() : 'New Strategy Insight';
      const excerpt = excerptMatch ? excerptMatch[1].trim() : 'Expert advice on securing your financial future...';
      const fullContent = contentParts.length > 1 ? contentParts[1].trim() : content;
      
      const newPost = {
        id: Date.now().toString(),
        title: title,
        excerpt: excerpt,
        content: fullContent,
        category: 'Investment',
        author: 'Harsh Yadav (AI Assistant)',
        date: 'Today',
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
      };
      
      setPosts([newPost, ...posts]);
    } catch (error) {
      console.error('Error generating blog:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleShare = (postId: string) => {
    const url = window.location.href + '#blog';
    if (navigator.share) {
      navigator.share({
        title: 'Harsh Yadav Advisory Insight',
        url: url
      });
    } else {
      navigator.clipboard.writeText(url);
      alert('Insight link copied to clipboard!');
    }
  };

  return (
    <section id="blog" className="py-24 bg-dark-bg border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <h2 className="text-sm font-bold text-blue-500 uppercase tracking-[0.4em] mb-4">Strategic Insights</h2>
            <h3 className="text-4xl md:text-6xl font-light text-white leading-tight">Harsh Yadav's <br /> <span className="text-blue-500 italic">Financial Chronicles</span></h3>
          </div>
          <button 
            onClick={generateAIInsight}
            disabled={isGenerating}
            className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 group"
          >
            {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />}
            Generate Intelligence
          </button>
        </div>

        {/* Filters and Search */}
        <div className="grid md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-8 flex flex-wrap gap-3">
             {categories.map(cat => (
               <button
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={cn(
                   "px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest border transition-all",
                   activeCategory === cat 
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20" 
                    : "bg-dark-card text-slate-500 border-slate-800 hover:border-slate-700"
                 )}
               >
                 {cat}
               </button>
             ))}
          </div>
          <div className="md:col-span-4 relative">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
             <input 
              type="text" 
              placeholder="Search insights..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-dark-input pl-12 pr-4 py-3 rounded-xl border border-slate-800 text-white text-sm outline-none focus:ring-1 focus:ring-blue-600 transition-all placeholder:text-slate-700"
             />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="bg-dark-card rounded-3xl overflow-hidden shadow-2xl transition-all border border-slate-800 flex flex-col group hover:border-slate-700"
              >
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 px-3 py-1 rounded text-white text-[10px] font-bold uppercase tracking-widest shadow-lg">
                    {post.category}
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                     <button 
                      onClick={() => handleShare(post.id)}
                      className="p-2 bg-dark-card/80 backdrop-blur-md rounded-lg text-white hover:bg-blue-600 transition-colors border border-white/10"
                     >
                       <Share2 size={16} />
                     </button>
                  </div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500 mb-6">
                    <span className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar size={12} className="text-slate-600" />
                      {post.date}
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-6 leading-tight group-hover:text-blue-400 transition-colors line-clamp-2 italic text-serif">
                    {post.title}
                  </h4>
                  <p className="text-slate-400 text-sm mb-10 leading-relaxed font-light line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto pt-8 border-t border-slate-800/50 flex justify-between items-center text-xs">
                    <a href={`#post-${post.id}`} className="font-bold text-blue-500 uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                      Read Analysis
                      <ArrowRight size={14} />
                    </a>
                    <div className="flex gap-3 text-slate-600">
                       <Twitter size={14} className="hover:text-blue-400 cursor-pointer" />
                       <Facebook size={14} className="hover:text-blue-600 cursor-pointer" />
                       <LinkIcon size={14} className="hover:text-white cursor-pointer" />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filteredPosts.length === 0 && (
          <div className="py-20 text-center opacity-50 border-2 border-dashed border-slate-800 rounded-3xl">
             <Search size={48} className="mx-auto mb-4 text-slate-700" />
             <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">No insights match your query in Bhadohi database.</p>
          </div>
        )}
      </div>
    </section>
  );
}
