
import React from 'react';
import { DogHelper } from '../types';
import { COLORS } from '../constants';

interface DogCardProps {
  helper: DogHelper;
  isSelected: boolean;
  onSelect: (helper: DogHelper) => void;
}

export const DogCard: React.FC<DogCardProps> = ({ helper, isSelected, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(helper)}
      className={`cursor-pointer transition-all duration-500 wag-hover p-5 rounded-[2rem] border-2 flex items-center space-x-4 ${
        isSelected 
          ? 'bg-white border-[#2D5A27] shadow-xl ring-4 ring-green-100' 
          : 'bg-white/50 border-slate-200 hover:border-green-300 shadow-sm'
      }`}
    >
      <div className="relative flex-shrink-0">
        <img 
          src={helper.imageUrl} 
          alt={helper.name} 
          className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md rotate-[-3deg]"
        />
        {isSelected && (
          <div className="absolute -top-2 -left-2 bg-[#A4C639] text-white rounded-full p-1.5 shadow-lg animate-bounce">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-[#5D4037] text-base">{helper.name}</h3>
          <span className="text-[10px] font-bold uppercase tracking-tighter bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-100">
            {helper.specialty.split(' ')[0]}
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{helper.description}</p>
      </div>
    </div>
  );
};
