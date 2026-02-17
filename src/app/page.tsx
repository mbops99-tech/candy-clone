'use client'

import { useState } from 'react'
import { characters, categories } from '@/data/characters'
import CharacterCard from '@/components/CharacterCard'

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCharacters = characters.filter(char => {
    const matchesCategory = activeCategory === 'All' || char.tags.includes(activeCategory)
    const matchesSearch = char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         char.tagline.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 text-candy-pink border-b-2 border-candy-pink pb-2">
            <span>♀️</span> Girls
          </button>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white pb-2">
            <span>🎭</span> Anime
          </button>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white pb-2">
            <span>♂️</span> Guys
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="btn-primary text-white px-6 py-2 rounded-full">
            Create Free Account
          </button>
          <button className="text-gray-400 hover:text-white px-4 py-2">
            Login
          </button>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-6">
        <span className="gradient-text">Candy AI</span> Characters
      </h1>

      {/* Search & Filters */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-candy-gray text-white pl-10 pr-4 py-2 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-candy-pink"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        </div>

        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                activeCategory === category
                  ? 'bg-candy-pink text-white'
                  : 'bg-candy-gray text-gray-300 hover:bg-candy-light'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Character Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCharacters.map(character => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      {filteredCharacters.length === 0 && (
        <div className="text-center text-gray-400 py-20">
          No characters found matching your criteria
        </div>
      )}
    </div>
  )
}
