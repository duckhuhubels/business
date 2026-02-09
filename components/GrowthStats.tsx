
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'M', growth: 12 },
  { name: 'T', growth: 25 },
  { name: 'W', growth: 18 },
  { name: 'T', growth: 45 },
  { name: 'F', growth: 38 },
  { name: 'S', growth: 10 },
  { name: 'S', growth: 5 },
];

export const GrowthStats: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-[2.5rem] shadow-lg border border-slate-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5">
         <svg className="w-24 h-24" viewBox="0 0 24 24" fill="currentColor"><path d="M17,8C15.34,8 14,9.34 14,11C14,12.66 15.34,14 17,14C18.66,14 20,12.66 20,11C20,9.34 18.66,8 17,8M12,12C10.34,12 9,13.34 9,15C9,16.66 10.34,18 12,18C13.66,18 15,16.66 15,15C15,13.34 13.66,12 12,12M7,8C5.34,8 4,9.34 4,11C4,12.66 5.34,14 7,14C8.66,14 10,12.66 10,11C10,9.34 8.66,8 7,8M12,2A5,5 0 0,0 7,7C7,7.39 7.05,7.77 7.14,8.14C6.16,8.16 5.25,8.5 4.5,9.11C3.56,9.87 3,11.03 3,12.25C3,14.5 4.73,16.33 7,16.69C7,16.89 7,17.1 7,17.31C7,19.9 9.1,22 11.69,22C13.4,22 14.88,21.08 15.69,19.69C16,19.89 16.5,20 17,20C18.66,20 20,18.66 20,17C20,16.5 19.89,16 19.69,15.69C21.08,14.88 22,13.4 22,11.69C22,9.1 19.9,7 17.31,7C17.1,7 16.89,7 16.69,7C16.33,4.73 14.5,3 12.25,3C11.03,3 9.87,3.56 9.11,4.5C8.5,5.25 8.16,6.16 8.14,7.14C7.77,7.05 7.39,7 7,7A5,5 0 0,0 2,12" /></svg>
      </div>
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div>
          <h2 className="text-lg font-bold text-[#5D4037]">Productivity Soil</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Growth Metrics</p>
        </div>
        <div className="text-2xl">🌱</div>
      </div>

      <div className="h-[180px] w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 0, left: -40, bottom: 0 }}>
            <Tooltip 
              cursor={{fill: 'transparent'}}
              contentStyle={{ background: '#2D5A27', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
            />
            <Bar dataKey="growth" radius={[6, 6, 6, 6]} barSize={24}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 3 ? '#2D5A27' : '#D7CCC8'} />
              ))}
            </Bar>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#5D4037', fontSize: 10, fontWeight: 'bold'}} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 p-3 bg-[#FDFBF7] rounded-2xl border border-slate-100 flex items-center space-x-3">
        <div className="bg-[#A4C639] p-2 rounded-lg text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-xs font-bold text-[#5D4037]">Deep Work Peak Reached</p>
      </div>
    </div>
  );
};
