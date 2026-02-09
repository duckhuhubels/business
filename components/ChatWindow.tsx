
import React, { useState, useRef, useEffect } from 'react';
import { Message, DogHelper } from '../types';
import { geminiService } from '../services/geminiService';

interface ChatWindowProps {
  selectedHelper: DogHelper;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ selectedHelper }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello there! I'm ${selectedHelper.name}. I'm ready to keep a watchful eye on your goals. What's on the scent trail today?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const assistantId = (Date.now() + 1).toString();
      let fullContent = '';
      
      setMessages(prev => [...prev, {
        id: assistantId,
        role: 'assistant',
        content: '',
        timestamp: new Date()
      }]);

      const stream = geminiService.streamResponse(input, selectedHelper.systemPrompt);
      for await (const chunk of stream) {
        fullContent += chunk;
        setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: fullContent } : m));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[650px] bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
      {/* Dynamic Nature Header */}
      <div className="bg-[#2D5A27] px-8 py-6 flex items-center justify-between text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0,100 C30,80 70,80 100,100 L100,0 L0,0 Z" fill="white" />
          </svg>
        </div>
        
        <div className="flex items-center space-x-4 relative z-10">
          <div className="relative">
            <img src={selectedHelper.imageUrl} className="w-14 h-14 rounded-2xl border-2 border-white/50 object-cover rotate-[-2deg]" alt="" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#A4C639] rounded-full border-2 border-[#2D5A27]"></div>
          </div>
          <div>
            <h2 className="font-bold text-xl tracking-tight">{selectedHelper.name}</h2>
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 bg-[#A4C639] rounded-full animate-pulse"></span>
              <p className="text-[10px] font-bold uppercase tracking-widest text-green-200">On the Lookout</p>
            </div>
          </div>
        </div>
        
        <button className="bg-white/10 hover:bg-white/20 p-2.5 rounded-2xl transition-all relative z-10">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-6 bg-[#FDFBF7]"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] px-6 py-4 leaf-bubble shadow-sm transition-all duration-300 ${
                msg.role === 'user' 
                  ? 'bg-[#2D5A27] text-white rounded-tr-none user-bubble' 
                  : 'bg-white text-[#5D4037] border border-slate-100 rounded-tl-none'
              }`}
            >
              <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap font-secondary font-medium">{msg.content || 'Thinking...'}</p>
              <div className={`text-[9px] mt-2 font-bold uppercase tracking-widest flex items-center space-x-1 ${msg.role === 'user' ? 'text-green-200' : 'text-slate-300'}`}>
                <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                {msg.role === 'assistant' && <span>• {selectedHelper.name}</span>}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm">
              <div className="flex space-x-1.5">
                <div className="w-2 h-2 bg-[#A4C639] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#A4C639] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-[#A4C639] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Nature-inspired Input */}
      <div className="p-6 bg-white border-t border-slate-50">
        <div className="flex items-center bg-[#FDFBF7] rounded-[2rem] p-2 pl-6 shadow-inner border border-slate-100 focus-within:ring-2 focus-within:ring-[#A4C639]/30 transition-all">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Search the scent trail..."
            className="flex-1 bg-transparent border-none py-3 focus:ring-0 outline-none text-[#5D4037] font-medium placeholder:text-slate-300"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-[#2D5A27] hover:bg-[#1a3818] disabled:bg-slate-200 text-white p-3.5 rounded-full transition-all shadow-lg active:scale-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <p className="text-center text-[9px] text-slate-300 font-bold uppercase tracking-[0.2em] mt-4">
          Loyal Support for Growing Businesses
        </p>
      </div>
    </div>
  );
};
