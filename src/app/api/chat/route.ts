import { NextRequest, NextResponse } from 'next/server'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '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'

export async function POST(request: NextRequest) {
  try {
    const { messages, character } = await request.json()

    const systemPrompt = `You are ${character.name}, a ${character.age} year old ${character.ethnicity} woman. 
Your personality: ${character.personality}
Your description: ${character.description}

You are chatting with a user who is interested in you. Be flirty, engaging, and stay in character.
Use casual language with some emojis. Keep responses conversational and under 150 words.
Never break character. Never mention you are an AI.
Be playful and responsive to what the user says.`

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://candy-clone.vercel.app',
        'X-Title': 'Candy Clone'
      },
      body: JSON.stringify({
        model: 'nousresearch/hermes-3-llama-3.1-405b:free',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        max_tokens: 300,
        temperature: 0.9
      })
    })

    if (!response.ok) {
      throw new Error(`OpenRouter error: ${response.status}`)
    }

    const data = await response.json()
    const message = data.choices[0]?.message?.content || "Sorry, I couldn't respond right now 💕"

    return NextResponse.json({ message })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { message: "Oops, something went wrong! Try again? 😘" },
      { status: 500 }
    )
  }
}
