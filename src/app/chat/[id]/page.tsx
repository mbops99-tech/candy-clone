'use client'

import { useState, useRef, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { characters } from '@/data/characters'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function ChatPage() {
  const params = useParams()
  const character = characters.find(c => c.id === params.id)
  
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (character) {
      setMessages([{
        id: '1',
        role: 'assistant',
        content: `Hey there! 💕 I'm ${character.name}. ${character.description} What's on your mind?`,
        timestamp: new Date()
      }])
    }
  }, [character])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          })),
          character: character
        })
      })

      const data = await response.json()
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!character) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Character not found</h1>
          <Link href="/" className="text-candy-pink hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-candy-gray p-4 flex items-center gap-4 border-b border-gray-800">
          <Link href="/" className="text-gray-400 hover:text-white">
            ← Back
          </Link>
          <div className="w-10 h-10 rounded-full overflow-hidden relative">
            <Image
              src={character.images[0]}
              alt={character.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div>
            <h2 className="font-semibold">{character.name}, {character.age}</h2>
            <p className="text-sm text-gray-400">{character.personality}</p>
          </div>
          <div className="ml-auto flex gap-2">
            <button className="p-2 rounded-full bg-candy-light hover:bg-candy-gray transition-colors">
              📷
            </button>
            <button className="p-2 rounded-full bg-candy-light hover:bg-candy-gray transition-colors">
              🎤
            </button>
            <button className="p-2 rounded-full bg-candy-light hover:bg-candy-gray transition-colors">
              ⚙️
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-4 ${
                  message.role === 'user'
                    ? 'chat-bubble-user text-white'
                    : 'chat-bubble-ai text-white'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="chat-bubble-ai text-white p-4">
                <span className="animate-pulse">Typing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 bg-candy-gray text-white px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-candy-pink"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="btn-primary text-white px-6 py-3 rounded-full disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Character Sidebar */}
      <div className="w-[300px] bg-candy-gray border-l border-gray-800 p-4 hidden lg:block">
        <div className="aspect-[3/4] relative rounded-2xl overflow-hidden mb-4">
          <Image
            src={character.images[0]}
            alt={character.name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <h3 className="text-xl font-bold">{character.name}, {character.age}</h3>
        <p className="text-gray-400 text-sm mt-2">{character.tagline}</p>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Personality:</span>
            <span>{character.personality}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Ethnicity:</span>
            <span>{character.ethnicity}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Hair:</span>
            <span>{character.hairColor}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Eyes:</span>
            <span>{character.eyeColor}</span>
          </div>
        </div>

        <button className="w-full btn-primary text-white py-3 rounded-full mt-6">
          📷 Request Photo
        </button>
      </div>
    </div>
  )
}
