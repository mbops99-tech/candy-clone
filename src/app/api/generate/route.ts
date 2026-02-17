import { NextRequest, NextResponse } from 'next/server'

const COMFYUI_URL = process.env.COMFYUI_URL || 'http://151.247.196.131:8188'

// Candy-style prompt templates
const promptTemplates = {
  selfie: [
    "a selfie",
    "a selfie, close up", 
    "a selfie, gentle smile"
  ],
  standing: [
    "standing upright, one hand on hip, confident expression",
    "standing confidently with a steady posture"
  ],
  sitting: [
    "sitting comfortably in a relaxed position",
    "sitting with legs crossed, seductive look"
  ],
  kneeling: [
    "kneeling with a balanced and composed posture",
    "kneeling upright, hands resting gently on thighs"
  ],
  ass: [
    "naked ass, standing from behind",
    "grabbing naked ass from behind",
    "on all fours grabbing naked ass from behind"
  ],
  breasts: [
    "bare breasts, looking seductive",
    "holding naked breasts and smiling",
    "topless, sitting down and looking sultry"
  ],
  blowjob: [
    "a blowjob",
    "performing oral sex"
  ],
  pussy: [
    "sitting down spreading legs, pussy close up",
    "spreading pussy",
    "legs spread, fingering pussy"
  ],
  cowgirl: [
    "cowgirl position, view from the front, excited",
    "getting fucked in the cowgirl position"
  ],
  doggy: [
    "doggy style sex on all fours",
    "fucked from behind"
  ],
  missionary: [
    "missionary position, legs spread wide",
    "missionary sex with legs in the air"
  ]
}

// Character appearance data
interface CharacterAppearance {
  name: string
  age: number
  ethnicity: string
  hairColor: string
  hairStyle: string
  eyeColor: string
  bodyType: string
  breastSize?: string
  personality: string
}

// Build Candy-style prompt
function buildPrompt(character: CharacterAppearance, action: string, customPrompt?: string): string {
  // Base appearance description
  const appearance = [
    `${character.age} year old`,
    character.ethnicity,
    `${character.hairColor} ${character.hairStyle} hair`,
    `${character.eyeColor} eyes`,
    character.bodyType,
    character.breastSize ? `${character.breastSize} breasts` : ''
  ].filter(Boolean).join(', ')

  // Get action template
  let actionPrompt = customPrompt || ''
  if (!actionPrompt && promptTemplates[action as keyof typeof promptTemplates]) {
    const templates = promptTemplates[action as keyof typeof promptTemplates]
    actionPrompt = templates[Math.floor(Math.random() * templates.length)]
  }

  // Candy uses simple prompts - the model knows what to do
  // Format: "score_9, score_8_up, [appearance], [action], high quality"
  const prompt = `score_9, score_8_up, score_7_up, beautiful ${appearance} woman, ${actionPrompt}, high quality, 8k, photorealistic`
  
  return prompt
}

// Build negative prompt
function buildNegativePrompt(): string {
  return "score_6, score_5, score_4, ugly, deformed, blurry, bad anatomy, bad hands, extra fingers, mutated hands, poorly drawn face, mutation, extra limbs, missing limbs, watermark, text, logo, child, underage, minor"
}

// Create ComfyUI workflow
function createWorkflow(prompt: string, negativePrompt: string, seed?: number) {
  return {
    "3": {
      "class_type": "KSampler",
      "inputs": {
        "cfg": 6,
        "denoise": 1,
        "latent_image": ["5", 0],
        "model": ["4", 0],
        "negative": ["7", 0],
        "positive": ["6", 0],
        "sampler_name": "dpmpp_2m",
        "scheduler": "karras",
        "seed": seed || Math.floor(Math.random() * 2**32),
        "steps": 30
      }
    },
    "4": {
      "class_type": "CheckpointLoaderSimple",
      "inputs": {
        "ckpt_name": "big_love.safetensors"
      }
    },
    "5": {
      "class_type": "EmptyLatentImage",
      "inputs": {
        "batch_size": 1,
        "height": 1216,
        "width": 832
      }
    },
    "6": {
      "class_type": "CLIPTextEncode",
      "inputs": {
        "clip": ["4", 1],
        "text": prompt
      }
    },
    "7": {
      "class_type": "CLIPTextEncode",
      "inputs": {
        "clip": ["4", 1],
        "text": negativePrompt
      }
    },
    "8": {
      "class_type": "VAEDecode",
      "inputs": {
        "samples": ["3", 0],
        "vae": ["4", 2]
      }
    },
    "9": {
      "class_type": "SaveImage",
      "inputs": {
        "filename_prefix": "candy_gen",
        "images": ["8", 0]
      }
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { character, action, customPrompt, seed } = body

    // Build prompts
    const prompt = buildPrompt(character, action, customPrompt)
    const negativePrompt = buildNegativePrompt()

    // Create workflow
    const workflow = createWorkflow(prompt, negativePrompt, seed)

    // Queue in ComfyUI
    const queueResponse = await fetch(`${COMFYUI_URL}/prompt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: workflow })
    })

    if (!queueResponse.ok) {
      throw new Error('Failed to queue prompt')
    }

    const queueResult = await queueResponse.json()
    const promptId = queueResult.prompt_id

    // Wait for completion (poll history)
    let result = null
    for (let i = 0; i < 60; i++) {
      await new Promise(r => setTimeout(r, 2000))
      
      const historyResponse = await fetch(`${COMFYUI_URL}/history/${promptId}`)
      const history = await historyResponse.json()
      
      if (history[promptId]) {
        const outputs = history[promptId].outputs || {}
        for (const nodeId of Object.keys(outputs)) {
          if (outputs[nodeId].images) {
            const image = outputs[nodeId].images[0]
            result = {
              filename: image.filename,
              url: `${COMFYUI_URL}/view?filename=${encodeURIComponent(image.filename)}&type=output`
            }
            break
          }
        }
        break
      }
    }

    if (!result) {
      throw new Error('Generation timeout')
    }

    return NextResponse.json({
      success: true,
      prompt,
      negativePrompt,
      image: result,
      promptId
    })

  } catch (error) {
    console.error('Generate error:', error)
    return NextResponse.json(
      { success: false, error: 'Generation failed' },
      { status: 500 }
    )
  }
}

// GET endpoint for prompt templates
export async function GET() {
  return NextResponse.json({
    templates: promptTemplates,
    actions: Object.keys(promptTemplates)
  })
}
