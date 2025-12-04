import { defineType } from "sanity"
import { Hash } from 'lucide-react'

export default defineType({
  name: "recipeTag",
  title: "Mad Tag",
  type: "document",
  icon: Hash,
  fields: [
    {
      name: "title",
      title: "Titel",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
})
