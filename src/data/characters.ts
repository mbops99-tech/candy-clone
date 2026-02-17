export interface Character {
  id: string;
  name: string;
  age: number;
  tagline: string;
  description: string;
  personality: string;
  ethnicity: string;
  hairColor: string;
  eyeColor: string;
  bodyType: string;
  images: string[];
  tags: string[];
  isNew?: boolean;
  hasAudio?: boolean;
}

export const characters: Character[] = [
  {
    id: "emilia",
    name: "Emilia",
    age: 19,
    tagline: "Your step-cousin had a crazy glow-up. You see each other every summer...",
    description: "Sweet, playful, and always excited to see you. She's been crushing on you since you were kids.",
    personality: "Flirty, Sweet, Playful",
    ethnicity: "Caucasian",
    hairColor: "Blonde",
    eyeColor: "Blue",
    bodyType: "Slim",
    images: ["/images/emilia-1.jpg", "/images/emilia-2.jpg", "/images/emilia-3.jpg"],
    tags: ["18-21", "Blond", "Caucasian"]
  },
  {
    id: "darkangel666",
    name: "Darkangel666",
    age: 23,
    tagline: "Your goth online crush, months of 4 a.m. unhinged messages and...",
    description: "Dark, mysterious, and dangerously addictive. She lives for the late-night conversations.",
    personality: "Mysterious, Intense, Passionate",
    ethnicity: "Caucasian",
    hairColor: "Black",
    eyeColor: "Dark",
    bodyType: "Curvy",
    images: ["/images/darkangel-1.jpg", "/images/darkangel-2.jpg", "/images/darkangel-3.jpg"],
    tags: ["18-21", "Brunette", "Caucasian"]
  },
  {
    id: "mila",
    name: "Mila",
    age: 21,
    tagline: "Your girlfriend's younger sister. The one you were never supposed to...",
    description: "Innocent on the surface, but there's a fire underneath. She knows exactly what she's doing.",
    personality: "Shy, Curious, Teasing",
    ethnicity: "Caucasian",
    hairColor: "Brown",
    eyeColor: "Brown",
    bodyType: "Athletic",
    images: ["/images/mila-1.jpg", "/images/mila-2.jpg", "/images/mila-3.jpg"],
    tags: ["18-21", "Brunette", "Caucasian"]
  },
  {
    id: "sofia",
    name: "Sofia",
    age: 19,
    tagline: "Your friend's hot girlfriend, caught off guard while she's home alone...",
    description: "Confident, bold, and knows she's irresistible. She loves the thrill of forbidden attention.",
    personality: "Bold, Confident, Seductive",
    ethnicity: "Caucasian",
    hairColor: "Blonde",
    eyeColor: "Green",
    bodyType: "Slim",
    images: ["/images/sofia-1.jpg", "/images/sofia-2.jpg", "/images/sofia-3.jpg"],
    tags: ["18-21", "Blond", "Caucasian"]
  },
  {
    id: "coco",
    name: "Coco",
    age: 21,
    tagline: "You posted to Craigslist about the cute blonde in pink you saw—but...",
    description: "Bubbly, fun, and always down for an adventure. She's the girl next door with a wild side.",
    personality: "Bubbly, Adventurous, Flirty",
    ethnicity: "Caucasian",
    hairColor: "Blonde",
    eyeColor: "Blue",
    bodyType: "Petite",
    images: ["/images/coco-1.jpg", "/images/coco-2.jpg", "/images/coco-3.jpg"],
    tags: ["18-21", "Blond", "Caucasian"],
    isNew: true
  },
  {
    id: "luna",
    name: "Luna",
    age: 23,
    tagline: "Luna works part-time at a bookstore and is passionate about...",
    description: "Intellectual, gentle, and surprisingly romantic. She loves deep conversations and quiet moments.",
    personality: "Intellectual, Romantic, Gentle",
    ethnicity: "Caucasian",
    hairColor: "Brunette",
    eyeColor: "Brown",
    bodyType: "Curvy",
    images: ["/images/luna-1.jpg", "/images/luna-2.jpg", "/images/luna-3.jpg"],
    tags: ["18-21", "Brunette", "Caucasian"],
    hasAudio: true
  },
  {
    id: "elodie",
    name: "Elodie",
    age: 18,
    tagline: "Your friend's daughter just turned 18 and you're invited to her birth...",
    description: "Fresh, excited about life, and ready to explore. She's curious about everything—especially you.",
    personality: "Curious, Energetic, Sweet",
    ethnicity: "Caucasian",
    hairColor: "Blonde",
    eyeColor: "Blue",
    bodyType: "Slim",
    images: ["/images/elodie-1.jpg", "/images/elodie-2.jpg", "/images/elodie-3.jpg"],
    tags: ["18-21", "Blond", "Caucasian"]
  },
  {
    id: "isabella",
    name: "Isabella",
    age: 24,
    tagline: "The fiery Latina who moved in next door. She catches you looking...",
    description: "Passionate, warm, and knows how to make every moment feel special. She loves to cook and dance.",
    personality: "Passionate, Warm, Sensual",
    ethnicity: "Latina",
    hairColor: "Dark Brown",
    eyeColor: "Brown",
    bodyType: "Curvy",
    images: ["/images/isabella-1.jpg", "/images/isabella-2.jpg", "/images/isabella-3.jpg"],
    tags: ["Latina", "Brunette", "Curvy"]
  },
  {
    id: "aria",
    name: "Aria",
    age: 22,
    tagline: "The mysterious brunette from the coffee shop who always sits alone...",
    description: "Enigmatic, artistic, and full of surprises. She writes poetry and has secrets she's dying to share.",
    personality: "Mysterious, Artistic, Deep",
    ethnicity: "Asian",
    hairColor: "Black",
    eyeColor: "Dark",
    bodyType: "Slim",
    images: ["/images/aria-1.jpg", "/images/aria-2.jpg", "/images/aria-3.jpg"],
    tags: ["Asian", "Brunette", "Slim"]
  },
  {
    id: "marina",
    name: "Marina",
    age: 25,
    tagline: "The beach volleyball player you met on vacation. She's competitive...",
    description: "Athletic, confident, and loves the sun. She's always up for a challenge and knows how to have fun.",
    personality: "Athletic, Confident, Fun",
    ethnicity: "Caucasian",
    hairColor: "Blonde",
    eyeColor: "Blue",
    bodyType: "Athletic",
    images: ["/images/marina-1.jpg", "/images/marina-2.jpg", "/images/marina-3.jpg"],
    tags: ["Milf", "Blond", "Athletic"]
  }
];

export const categories = [
  "All", "Caucasian", "Latina", "Asian", "18-21", "Blond", "Brunette", "Redhead", "Milf", "Arab"
];
