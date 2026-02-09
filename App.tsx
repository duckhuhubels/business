
import React, { useState } from 'react';
import { ChatWindow } from './components/ChatWindow';
import { DogCard } from './components/DogCard';
import { GrowthStats } from './components/GrowthStats';
import { DOG_HELPERS } from './constants';
import { DogHelper } from './types';

const App: React.FC = () => {
  const [selectedHelper, setSelectedHelper] = useState<DogHelper>(DOG_HELPERS[0]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#5D4037] pb-20 relative selection:bg-[#A4C639]/30">
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#A4C639]/5 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#2D5A27]/5 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/4 right-20 w-32 h-32 bg-[#FFD54F]/10 rounded-full blur-[60px]"></div>
      </div>

      {/* Professional Navigation */}
      <nav className="relative z-10 px-8 py-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4 mb-6 md:mb-0 group cursor-pointer">
          <div className="bg-[#2D5A27] p-3 rounded-[1.2rem] shadow-xl group-hover:rotate-12 transition-transform duration-500">
             <span className="text-2xl">🐾</span>
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#2D5A27] leading-none">CanineConnect</h1>
            <p className="text-[10px] font-bold text-[#A4C639] uppercase tracking-[0.3em] mt-1">Loyal Business Partners</p>
          </div>
        </div>
        
        <div className="flex items-center bg-white/50 backdrop-blur-md px-6 py-3 rounded-full border border-white shadow-sm space-x-8 text-xs font-bold uppercase tracking-widest text-slate-400">
          <a href="#" className="text-[#2D5A27] border-b-2 border-[#2D5A27] pb-1">Kennel</a>
          <a href="#" className="hover:text-[#2D5A27] transition-colors">Resources</a>
          <a href="#" className="hover:text-[#2D5A27] transition-colors">Map</a>
          <div className="h-4 w-px bg-slate-200 mx-2"></div>
          <button className="text-[#2D5A27] font-black hover:scale-105 transition-transform">Sign In</button>
        </div>
      </nav>

      {/* Main Content Layout */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Helper Selection & Analytics */}
        <div className="lg:col-span-4 space-y-10 order-2 lg:order-1">
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-black text-[#5D4037] uppercase tracking-widest">Active Assistants</h2>
              <span className="w-10 h-1 bg-[#A4C639] rounded-full"></span>
            </div>
            <div className="space-y-4">
              {DOG_HELPERS.map(helper => (
                <DogCard 
                  key={helper.id}
                  helper={helper}
                  isSelected={selectedHelper.id === helper.id}
                  onSelect={setSelectedHelper}
                />
              ))}
            </div>
          </section>

          <GrowthStats />
          
          {/* Quick Tasks Section */}
          <div className="bg-[#5D4037] p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
            <div className="absolute bottom-0 right-0 p-4 translate-y-4 translate-x-4 opacity-10 rotate-[-15deg] group-hover:rotate-0 transition-transform duration-700">
               <svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor"><path d="M19,19H5V5H19V19M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M13.96,12.29L11.21,15.54L9.21,13.29L6.5,16.79H17.5L13.96,12.29Z" /></svg>
            </div>
            <h3 className="text-lg font-bold mb-2">Garden Map</h3>
            <p className="text-xs text-stone-300 leading-relaxed mb-4">View your business milestones as a growing landscape.</p>
            <button className="bg-white text-[#5D4037] px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#A4C639] hover:text-white transition-all">Explore Garden</button>
          </div>
        </div>

        {/* Center/Right: Interaction Hub */}
        <div className="lg:col-span-8 space-y-10 order-1 lg:order-2">
          {/* Hero Banner */}
          <div className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-2xl relative overflow-hidden border border-slate-50 group">
             {/* Background Leaves */}
             <div className="absolute -top-10 -right-10 text-[#A4C639]/10 group-hover:text-[#A4C639]/20 transition-colors duration-1000 pointer-events-none">
                <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M17,8C15.34,8 14,9.34 14,11C14,12.66 15.34,14 17,14C18.66,14 20,12.66 20,11C20,9.34 18.66,8 17,8M12,12C10.34,12 9,13.34 9,15C9,16.66 10.34,18 12,18C13.66,18 15,16.66 15,15C15,13.34 13.66,12 12,12M7,8C5.34,8 4,9.34 4,11C4,12.66 5.34,14 7,14C8.66,14 10,12.66 10,11C10,9.34 8.66,8 7,8M12,2A5,5 0 0,0 7,7C7,7.39 7.05,7.77 7.14,8.14C6.16,8.16 5.25,8.5 4.5,9.11C3.56,9.87 3,11.03 3,12.25C3,14.5 4.73,16.33 7,16.69C7,16.89 7,17.1 7,17.31C7,19.9 9.1,22 11.69,22C13.4,22 14.88,21.08 15.69,19.69C16,19.89 16.5,20 17,20C18.66,20 20,18.66 20,17C20,16.5 19.89,16 19.69,15.69C21.08,14.88 22,13.4 22,11.69C22,9.1 19.9,7 17.31,7C17.1,7 16.89,7 16.69,7C16.33,4.73 14.5,3 12.25,3C11.03,3 9.87,3.56 9.11,4.5C8.5,5.25 8.16,6.16 8.14,7.14C7.77,7.05 7.39,7 7,7A5,5 0 0,0 2,12" /></svg>
             </div>
             
             <div className="relative z-10 max-w-xl">
               <div className="flex items-center space-x-3 mb-6">
                 <span className="px-3 py-1 bg-[#A4C639]/10 text-[#2D5A27] rounded-full text-[10px] font-black uppercase tracking-widest">Active Session</span>
                 <div className="flex -space-x-2">
                    {DOG_HELPERS.map(h => <img key={h.id} src={h.imageUrl} className="w-6 h-6 rounded-full border-2 border-white object-cover" />)}
                 </div>
               </div>
               <h2 className="text-4xl md:text-5xl font-black text-[#2D5A27] leading-[1.1] mb-6">
                 Your business's most <span className="text-[#A4C639]">loyal companion.</span>
               </h2>
               <p className="text-slate-500 text-lg leading-relaxed mb-8">
                 Experience a workspace where efficiency meets tranquility. Let our specialized helpers guard your productivity while you grow your dreams.
               </p>
               <div className="flex space-x-4">
                 <button className="bg-[#2D5A27] text-white px-8 py-4 rounded-3xl font-bold shadow-xl hover:scale-105 transition-transform active:scale-95">Fetch Start</button>
                 <button className="bg-white border border-slate-200 text-[#5D4037] px-8 py-4 rounded-3xl font-bold hover:bg-slate-50 transition-colors">Learn More</button>
               </div>
             </div>
          </div>

          <ChatWindow selectedHelper={selectedHelper} />
        </div>

      </main>

      {/* Footer Decoration */}
      <footer className="mt-32 max-w-7xl mx-auto px-8 border-t border-slate-100 pt-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-slate-400">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 grayscale opacity-50">
            <span className="text-xl">🐾</span>
            <span className="font-bold text-[#5D4037] text-lg">CanineConnect</span>
          </div>
          <p className="text-xs leading-relaxed max-w-xs">
            Blending the wisdom of nature with the loyalty of man's best friend to create a more resilient business world.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-8 text-[10px] font-black uppercase tracking-widest">
          <div className="space-y-4">
            <h4 className="text-[#5D4037]">Product</h4>
            <ul className="space-y-2">
              <li className="hover:text-[#2D5A27] cursor-pointer">Assistants</li>
              <li className="hover:text-[#2D5A27] cursor-pointer">The Garden</li>
              <li className="hover:text-[#2D5A27] cursor-pointer">Analytics</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-[#5D4037]">Support</h4>
            <ul className="space-y-2">
              <li className="hover:text-[#2D5A27] cursor-pointer">Help Kennel</li>
              <li className="hover:text-[#2D5A27] cursor-pointer">Privacy Bark</li>
              <li className="hover:text-[#2D5A27] cursor-pointer">Contact</li>
            </ul>
          </div>
        </div>

        <div className="bg-[#A4C639]/5 p-8 rounded-[2rem] border border-[#A4C639]/10">
           <h4 className="text-[#5D4037] text-sm font-black mb-3 italic">"Loyalty is the foundation of every successful venture."</h4>
           <p className="text-[10px] font-medium text-slate-400">— The CanineConnect Philosophy</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
