'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Character } from '@/data/characters'

interface CharacterCardProps {
  character: Character
}

export default function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link href={`/chat/${character.id}`} className="block">
      <div className="character-card relative rounded-2xl overflow-hidden bg-candy-gray group cursor-pointer">
        {/* Image */}
        <div className="aspect-[3/4] relative">
          <Image
            src={character.images[0]}
            alt={character.name}
            fill
            className="object-cover"
            unoptimized
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* New Badge */}
          {character.isNew && (
            <div className="absolute top-3 right-3 bg-candy-pink text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <span>⚡</span> New
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-semibold text-white">
            {character.name} <span className="text-gray-300 font-normal">{character.age}</span>
          </h3>
          <p className="text-sm text-gray-300 line-clamp-2 mt-1">
            {character.tagline}
          </p>
          
          {/* Action Buttons */}
          <div className="flex gap-2 mt-3">
            <button className="btn-primary text-white text-sm px-4 py-2 rounded-full flex items-center gap-2">
              <span>▶️</span> Play
            </button>
            {character.hasAudio && (
              <button className="bg-candy-light text-white text-sm px-4 py-2 rounded-full flex items-center gap-2 hover:bg-candy-gray transition-colors">
                <span>🎧</span> Audio
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
