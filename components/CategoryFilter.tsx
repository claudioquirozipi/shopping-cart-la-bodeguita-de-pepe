'use client'

import { ApiCategory } from '@/lib/api'

interface CategoryFilterProps {
  categories: ApiCategory[]
  selectedId: number | null
  onSelect: (id: number | null) => void
}

export default function CategoryFilter({
  categories,
  selectedId,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => onSelect(null)}
        className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-label font-medium transition-colors ${
          selectedId === null
            ? 'bg-[#E91E63] text-white shadow'
            : 'bg-white text-[#757575] border border-gray-200 hover:border-[#E91E63] hover:text-[#E91E63]'
        }`}
      >
        Todos
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-label font-medium transition-colors ${
            selectedId === cat.id
              ? 'bg-[#E91E63] text-white shadow'
              : 'bg-white text-[#757575] border border-gray-200 hover:border-[#E91E63] hover:text-[#E91E63]'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}
