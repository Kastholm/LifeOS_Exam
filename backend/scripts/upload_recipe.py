import os
import re
import unicodedata
import requests
import json
import sys
import uuid
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables from .env file in parent directory
load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))

# Sanity configuration (loaded from environment variables)
PROJECT_ID = os.getenv("SANITY_PROJECT_ID", "poi21je0")
DATASET = os.getenv("SANITY_DATASET", "production")
API_VERSION = os.getenv("SANITY_API_VERSION", "2023-05-03")

# You need to get this token from Sanity Management Console
# Go to: https://www.sanity.io/manage/personal/tokens
# Create a token with "Editor" permissions
SANITY_TOKEN = os.getenv("SANITY_API_KEY")

SANITY_STUDIO_URL = os.getenv("SANITY_STUDIO_URL", "https://sanity.io")

BASE_URL = f"https://{PROJECT_ID}.api.sanity.io/v{API_VERSION}/data/mutate/{DATASET}"

headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {SANITY_TOKEN}"
}


def slugify(value: str) -> str:
    """Create a URL-safe slug for IDs (ascii, lowercase, hyphens)."""
    value = str(value or "").strip()
    if not value:
        return "item"
    value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode("ascii")
    value = value.lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    value = re.sub(r"-{2,}", "-", value).strip("-")
    return value or "item"

def check_or_create_category(category_name):
    """Ensure category exists using deterministic ID based on its title."""
    print(f"Ensuring category: {category_name}")

    category_slug = slugify(category_name)
    category_id = f"recipeCategory-{category_slug}"

    mutation = {
        "mutations": [
            {
                "createIfNotExists": {
                    "_type": "recipeCategory",
                    "_id": category_id,
                    "title": category_name,
                }
            }
        ]
    }

    response = requests.post(BASE_URL, headers=headers, json=mutation)
    if response.status_code == 200:
        print(f"Category ensured with ID: {category_id}")
        return category_id
    else:
        print(f"Error ensuring category: {response.text}")
        return None

def check_or_create_tag(tag_name):
    """Ensure tag exists using deterministic ID based on its title."""
    print(f"Ensuring tag: {tag_name}")

    tag_slug = slugify(tag_name)
    tag_id = f"recipeTag-{tag_slug}"

    mutation = {
        "mutations": [
            {
                "createIfNotExists": {
                    "_type": "recipeTag",
                    "_id": tag_id,
                    "title": tag_name,
                }
            }
        ]
    }

    response = requests.post(BASE_URL, headers=headers, json=mutation)
    if response.status_code == 200:
        print(f"Tag ensured with ID: {tag_id}")
        return tag_id
    else:
        print(f"Error ensuring tag: {response.text}")
        return None

def upload_recipe(recipe_data):
    """Upload recipe to Sanity"""
    print("\n=== Starting recipe upload ===\n")
    
    # Process category
    category_id = None
    if recipe_data.get("category"):
        category_id = check_or_create_category(recipe_data["category"])
    
    # Process tags
    tag_refs = []
    if recipe_data.get("tags"):
        for index, tag_name in enumerate(recipe_data["tags"]):
            tag_id = check_or_create_tag(tag_name)
            if tag_id:
                tag_refs.append({
                    "_type": "reference",
                    "_ref": tag_id,
                    "_key": f"tag-{datetime.now().timestamp()}-{index}"
                })
    
    # Create recipe document
    print(f"\nCreating recipe: {recipe_data['title']}")
    # Generate UUID format ID to match Sanity's manual creation format
    recipe_id = str(uuid.uuid4())
    
    recipe_doc = {
        "_type": "recipe",
        "_id": recipe_id,
        "title": recipe_data["title"],
        "url": recipe_data.get("url", "")
    }
    
    # Convert description to portable text array (if provided)
    if recipe_data.get("description"):
        description_value = recipe_data["description"]
        description_blocks = []

        # Option 1: Structured JSON with sections and steps
        # {
        #   "title": "Sådan gør du",
        #   "sections": [
        #     { "title": "Krydret bønnefyld", "steps": ["Step 1", "Step 2"] },
        #     { "title": "Crispy cheese tacos", "steps": [...] }
        #   ]
        # }
        if isinstance(description_value, dict) and "sections" in description_value:
            # Top-level title as H2
            main_title = description_value.get("title")
            if main_title:
                description_blocks.append({
                    "_type": "block",
                    "_key": f"description-title-{datetime.now().timestamp()}",
                    "style": "h2",
                    "markDefs": [],
                    "children": [
                        {
                            "_type": "span",
                            "text": str(main_title),
                            "marks": []
                        }
                    ]
                })

            # Sections with H3 + bullet list items
            for section_index, section in enumerate(description_value.get("sections", [])):
                section_title = section.get("title")
                steps = section.get("steps", [])

                if section_title:
                    description_blocks.append({
                        "_type": "block",
                        "_key": f"description-section-{datetime.now().timestamp()}-{section_index}",
                        "style": "h3",
                        "markDefs": [],
                        "children": [
                            {
                                "_type": "span",
                                "text": str(section_title),
                                "marks": []
                            }
                        ]
                    })

                for step_index, step in enumerate(steps):
                    text = str(step).strip()
                    if not text:
                        continue
                    description_blocks.append({
                        "_type": "block",
                        "_key": f"description-step-{datetime.now().timestamp()}-{section_index}-{step_index}",
                        "style": "normal",
                        "listItem": "bullet",
                        "level": 1,
                        "markDefs": [],
                        "children": [
                            {
                                "_type": "span",
                                "text": text,
                                "marks": []
                            }
                        ]
                    })

        # Option 2: Plain string – split on double newlines into paragraphs
        else:
            paragraphs = [
                p.strip()
                for p in str(description_value).split("\n\n")
                if p.strip()
            ]
            for index, paragraph in enumerate(paragraphs):
                description_blocks.append({
                    "_type": "block",
                    "_key": f"description-{datetime.now().timestamp()}-{index}",
                    "style": "normal",
                    "markDefs": [],
                    "children": [
                        {
                            "_type": "span",
                            "text": paragraph,
                            "marks": []
                        }
                    ]
                })

        if description_blocks:
            recipe_doc["description"] = description_blocks
    
    if recipe_data.get("ingredients"):
        # Convert ingredients list to portable text format
        ingredients_blocks = []
        for ingredient in recipe_data["ingredients"]:
            ingredients_blocks.append({
                "_type": "block",
                "_key": f"ingredient-{datetime.now().timestamp()}-{len(ingredients_blocks)}",
                "style": "normal",
                "markDefs": [],
                "children": [
                    {
                        "_type": "span",
                        "text": ingredient,
                        "marks": []
                    }
                ]
            })
        recipe_doc["ingredients"] = ingredients_blocks
    
    # Add optional fields
    if recipe_data.get("cookingTime"):
        recipe_doc["cookingTime"] = recipe_data["cookingTime"]
    
    if recipe_data.get("timeEstimate"):
        recipe_doc["timeEstimate"] = recipe_data["timeEstimate"]
    
    if recipe_data.get("rating"):
        recipe_doc["rating"] = recipe_data["rating"]
    
    if category_id:
        recipe_doc["category"] = {
            "_type": "reference",
            "_ref": category_id
        }
    
    if tag_refs:
        recipe_doc["tags"] = tag_refs
    
    # Upload recipe
    mutation = {
        "mutations": [
            {
                "create": recipe_doc
            }
        ]
    }
    
    response = requests.post(BASE_URL, headers=headers, json=mutation)
    
    if response.status_code == 200:
        print(f"\n✓ Recipe uploaded successfully with ID: {recipe_id}")
        print(f"✓ View in Sanity Studio: {SANITY_STUDIO_URL}")
        return True
    else:
        print(f"\n✗ Error uploading recipe: {response.text}")
        return False

# Example usage
if __name__ == "__main__":
    # Example recipe data structure (matches structured description format)
    example_recipe = {
  "title": "Pastaret med spinat, champignon og broccoli",
  "url": "https://www.arla.dk/opskrifter/pastaret-med-spinat-og-champignon/",
  "description": {
    "title": "Sådan gør du",
    "sections": [
      {
        "title": "Fremgangsmåde",
        "steps": [
          "Kog pastaen efter anvisning.",
          "Damp eller kog broccoli let i 3-4 minutter.",
          "Svits champignon i smør på en pande.",
          "Tilsæt hvidløg og lad det stege kort.",
          "Rør fløde og citronsaft i og lad simre et par minutter.",
          "Vend spinat i saucen til den falder sammen.",
          "Tilføj broccoli og vend rundt.",
          "Smag til med salt og peber.",
          "Vend pastaen i saucen og server."
        ]
      }
    ]
  },
  "ingredients": [
    "300 g pasta",
    "250 g champignon",
    "1 fed hvidløg",
    "1 spsk smør",
    "2 dl madlavningsfløde",
    "1 håndfuld spinat",
    "200 g broccoli",
    "1 spsk citronsaft",
    "1 tsk salt",
    "1 tsk peber"
  ],
  "category": "Pasta",
  "tags": [
    "pasta",
    "champignon",
    "hvidløg",
    "spinat",
    "broccoli",
    "fløde",
    "citronsaft",
    "vegetar",
    "hurtig"
  ],
  "timeEstimate": 25
}


    
    # Check if JSON file is provided as argument
    if len(sys.argv) > 1:
        with open(sys.argv[1], 'r', encoding='utf-8') as f:
            recipe_data = json.load(f)
    else:
        # Use example recipe
        recipe_data = example_recipe
    
    # Upload the recipe
    upload_recipe(recipe_data)
