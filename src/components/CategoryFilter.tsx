import { CATEGORIES } from '../data/products';
import {
  Flame,
  Beef,
  Sparkles,
  Cookie,
  Scissors,
  Utensils,
  Award,
} from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

// Icon mapper helper
const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Beef':
      return <Beef className="w-5 h-5" />;
    case 'Milestone':
    case 'Flame':
    case 'FlameKindling':
      return <Flame className="w-5 h-5 fill-current" />;
    case 'Sparkles':
      return <Sparkles className="w-5 h-5" />;
    case 'Cookie':
      return <Cookie className="w-5 h-5" />;
    case 'Scissors':
      return <Scissors className="w-5 h-5 text-red-500 scale-x-[-1]" />;
    case 'Utensils':
      return <Utensils className="w-5 h-5" />;
    default:
      return <Award className="w-5 h-5 text-amber-500" />;
  }
};

export default function CategoryFilter({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="w-full py-6" id="category-scroller">
      <div className="flex flex-col gap-2 mb-4">
        <h3 className="text-lg font-display font-extrabold text-neutral-900 tracking-tight">
          Browse by Meat Category
        </h3>
        <p className="text-xs text-neutral-500 font-medium leading-none">
          Click to filter our premium, temperature-insulated product selection
        </p>
      </div>

      {/* Horizontal Scrolling Pill Container */}
      <div className="flex gap-2.5 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent -mx-4 px-4 sm:mx-0 sm:px-0">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl whitespace-nowrap text-sm font-bold border cursor-pointer transition-all duration-200 shrink-0 select-none ${
                isSelected
                  ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-200 scale-102'
                  : 'bg-white text-neutral-700 border-neutral-200/80 hover:bg-neutral-50 hover:border-neutral-300'
              }`}
              id={`cat-btn-${category.id}`}
            >
              <span className={isSelected ? 'text-white' : 'text-neutral-500'}>
                {getCategoryIcon(category.icon)}
              </span>
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
