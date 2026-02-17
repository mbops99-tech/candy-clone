#!/usr/bin/env python3
"""Generate character images using ComfyUI with big_love checkpoint"""

import json
import urllib.request
import urllib.parse
import time
import os
import random

COMFYUI_URL = "http://151.247.196.131:8188"

# Character definitions with prompts
characters = [
    {
        "id": "emilia",
        "prompts": [
            "portrait photo of a beautiful 19 year old blonde woman, blue eyes, sweet smile, natural makeup, soft lighting, casual outfit, looking at camera, high quality, 8k",
            "full body photo of a beautiful 19 year old blonde woman, blue eyes, wearing a red bikini, beach background, summer vibes, natural pose, high quality",
            "lifestyle photo of a beautiful 19 year old blonde woman, blue eyes, taking a selfie, bedroom background, casual clothing, playful expression"
        ]
    },
    {
        "id": "darkangel",
        "prompts": [
            "portrait photo of a beautiful 23 year old goth woman, black hair, dark makeup, pale skin, black lipstick, mysterious expression, dark aesthetic, high quality, 8k",
            "full body photo of a beautiful 23 year old goth woman, black hair, wearing black leather outfit, gothic style, dark background, seductive pose",
            "lifestyle photo of a beautiful 23 year old goth woman, black hair, dark makeup, taking a mirror selfie, bedroom with dark decor"
        ]
    },
    {
        "id": "mila",
        "prompts": [
            "portrait photo of a beautiful 21 year old brunette woman, brown eyes, innocent expression, natural makeup, soft lighting, casual outfit, high quality, 8k",
            "full body photo of a beautiful 21 year old brunette woman, athletic body, wearing white tank top and shorts, living room background, natural pose",
            "lifestyle photo of a beautiful 21 year old brunette woman, brown eyes, shy smile, taking a selfie in bathroom mirror"
        ]
    },
    {
        "id": "sofia",
        "prompts": [
            "portrait photo of a beautiful 19 year old blonde woman, green eyes, confident expression, glamorous makeup, soft lighting, elegant outfit, high quality, 8k",
            "full body photo of a beautiful 19 year old blonde woman, green eyes, wearing white sports bra and yoga pants, fitness pose, gym background",
            "lifestyle photo of a beautiful 19 year old blonde woman, seductive look, taking a selfie on couch, casual home setting"
        ]
    },
    {
        "id": "coco",
        "prompts": [
            "portrait photo of a beautiful 21 year old petite blonde woman, blue eyes, bubbly expression, pink outfit, cute makeup, soft lighting, high quality, 8k",
            "full body photo of a beautiful 21 year old petite blonde woman, wearing pink dress, playful pose, colorful background, kawaii style",
            "lifestyle photo of a beautiful 21 year old petite blonde woman, cute smile, taking a selfie with peace sign, bedroom with pink decor"
        ]
    },
    {
        "id": "luna",
        "prompts": [
            "portrait photo of a beautiful 23 year old brunette woman, brown eyes, intellectual expression, natural makeup, bookstore background, cozy lighting, high quality, 8k",
            "full body photo of a beautiful 23 year old curvy brunette woman, wearing silk pajamas, reading a book, cozy bedroom setting",
            "lifestyle photo of a beautiful 23 year old brunette woman, thoughtful expression, taking a selfie in coffee shop"
        ]
    },
    {
        "id": "elodie",
        "prompts": [
            "portrait photo of a beautiful 18 year old blonde woman, blue eyes, fresh youthful look, minimal makeup, birthday party setting, excited expression, high quality, 8k",
            "full body photo of a beautiful 18 year old blonde woman, slim body, wearing party dress, birthday celebration, balloons background",
            "lifestyle photo of a beautiful 18 year old blonde woman, cute smile, taking a selfie with birthday cake"
        ]
    },
    {
        "id": "isabella",
        "prompts": [
            "portrait photo of a beautiful 24 year old latina woman, dark brown hair, brown eyes, passionate expression, warm lighting, elegant outfit, high quality, 8k",
            "full body photo of a beautiful 24 year old curvy latina woman, wearing red dress, dancing pose, warm lighting, latin vibes",
            "lifestyle photo of a beautiful 24 year old latina woman, sensual expression, taking a selfie in kitchen, cooking setting"
        ]
    },
    {
        "id": "aria",
        "prompts": [
            "portrait photo of a beautiful 22 year old asian woman, black hair, dark eyes, mysterious expression, artistic makeup, coffee shop background, high quality, 8k",
            "full body photo of a beautiful 22 year old slim asian woman, wearing artistic outfit, creative pose, art gallery background",
            "lifestyle photo of a beautiful 22 year old asian woman, thoughtful expression, writing in journal, cozy corner with plants"
        ]
    },
    {
        "id": "marina",
        "prompts": [
            "portrait photo of a beautiful 25 year old athletic blonde woman, blue eyes, confident expression, sun-kissed skin, beach background, high quality, 8k",
            "full body photo of a beautiful 25 year old athletic blonde woman, wearing bikini, volleyball pose, beach setting, summer vibes",
            "lifestyle photo of a beautiful 25 year old athletic blonde woman, sporty look, taking a selfie after workout, gym setting"
        ]
    }
]

# Workflow template for txt2img with big_love checkpoint
def create_workflow(prompt, seed=None):
    if seed is None:
        seed = random.randint(1, 2**32 - 1)
    
    workflow = {
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
                "seed": seed,
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
                "text": f"score_9, score_8_up, score_7_up, {prompt}"
            }
        },
        "7": {
            "class_type": "CLIPTextEncode",
            "inputs": {
                "clip": ["4", 1],
                "text": "score_6, score_5, score_4, ugly, deformed, blurry, bad anatomy, bad hands, extra fingers, mutated hands, poorly drawn face, mutation, extra limbs, missing limbs, floating limbs, disconnected limbs, malformed hands, long neck, watermark, text, logo"
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
                "filename_prefix": "candy",
                "images": ["8", 0]
            }
        }
    }
    return workflow

def queue_prompt(workflow):
    """Queue a prompt in ComfyUI"""
    data = json.dumps({"prompt": workflow}).encode('utf-8')
    req = urllib.request.Request(f"{COMFYUI_URL}/prompt", data=data, headers={'Content-Type': 'application/json'})
    try:
        response = urllib.request.urlopen(req)
        return json.loads(response.read())
    except Exception as e:
        print(f"Error queuing prompt: {e}")
        return None

def get_history(prompt_id):
    """Get generation history"""
    try:
        response = urllib.request.urlopen(f"{COMFYUI_URL}/history/{prompt_id}")
        return json.loads(response.read())
    except:
        return {}

def wait_for_completion(prompt_id, timeout=120):
    """Wait for generation to complete"""
    start = time.time()
    while time.time() - start < timeout:
        history = get_history(prompt_id)
        if prompt_id in history:
            return history[prompt_id]
        time.sleep(2)
    return None

def download_image(filename, output_path):
    """Download generated image"""
    url = f"{COMFYUI_URL}/view?filename={urllib.parse.quote(filename)}&type=output"
    try:
        urllib.request.urlretrieve(url, output_path)
        return True
    except Exception as e:
        print(f"Error downloading {filename}: {e}")
        return False

def main():
    output_dir = "/root/clawd/candy-clone/public/images"
    os.makedirs(output_dir, exist_ok=True)
    
    total = len(characters) * 3
    current = 0
    
    for char in characters:
        char_id = char["id"]
        print(f"\n=== Generating images for {char_id} ===")
        
        for i, prompt in enumerate(char["prompts"], 1):
            current += 1
            print(f"[{current}/{total}] {char_id}-{i}: {prompt[:50]}...")
            
            # Create and queue workflow
            workflow = create_workflow(prompt)
            result = queue_prompt(workflow)
            
            if not result or "prompt_id" not in result:
                print(f"  Failed to queue prompt")
                continue
            
            prompt_id = result["prompt_id"]
            print(f"  Queued: {prompt_id}")
            
            # Wait for completion
            history = wait_for_completion(prompt_id)
            if not history:
                print(f"  Timeout waiting for completion")
                continue
            
            # Find output image
            try:
                outputs = history.get("outputs", {})
                for node_id, node_output in outputs.items():
                    if "images" in node_output:
                        for img in node_output["images"]:
                            filename = img["filename"]
                            output_path = f"{output_dir}/{char_id}-{i}.jpg"
                            if download_image(filename, output_path):
                                print(f"  Saved: {output_path}")
                            break
            except Exception as e:
                print(f"  Error processing output: {e}")

    print(f"\n=== Done! Generated {current} images ===")

if __name__ == "__main__":
    main()
