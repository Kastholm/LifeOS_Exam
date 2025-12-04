import { defineType } from "sanity"
import { UtensilsCrossed } from 'lucide-react'

export default defineType({
  name: "recipe",
  title: "Opskrift",
  type: "document",
  icon: UtensilsCrossed,
  fields: [
    {
      name: "title",
      title: "Titel",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "url",
      title: "URL til opskrift",
      type: "url",
      description: "Link til den originale opskrift",
    },
    {
      name: "image",
      title: "Billede",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alternativ tekst",
          type: "string",
        },
      ],
    },
    {
      name: "description",
      title: "Beskrivelse",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                title: "URL",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              title: "Alternativ tekst",
              type: "string",
            },
            {
              name: "caption",
              title: "Billedtekst",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "ingredients",
      title: "Ingredienser",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
          },
        },
      ],
    },
    {
      name: "category",
      title: "Kategori",
      type: "reference",
      to: [{ type: "recipeCategory" }],
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "recipeTag" }] }],
    },
    {
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule) => Rule.min(1).max(10),
    },
    {
      name: "timeEstimate",
      title: "Tidsestimering (minutter)",
      type: "number",
      description: "Hvor lang tid tager det at lave retten (i minutter)",
      validation: (Rule) => Rule.min(1),
    },
  ],
  orderings: [
    {
      title: "Rating (højest først)",
      name: "ratingDesc",
      by: [{ field: "rating", direction: "desc" }],
    },
    {
      title: "Rating (lavest først)",
      name: "ratingAsc",
      by: [{ field: "rating", direction: "asc" }],
    },
    {
      title: "Titel (A-Å)",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
    {
      title: "Tid (kortest først)",
      name: "timeAsc",
      by: [{ field: "timeEstimate", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      rating: "rating",
      category: "category.title",
      timeEstimate: "timeEstimate",
    },
    prepare({ title, media, rating, category, timeEstimate }) {
      const parts = []
      if (rating) parts.push(`${rating}/10`)
      if (timeEstimate) parts.push(`${timeEstimate} min`)
      if (category) parts.push(category)
      
      return {
        title: title,
        subtitle: parts.join(" • "),
        media,
      }
    },
  },
})

