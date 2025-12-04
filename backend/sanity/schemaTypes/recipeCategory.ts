import { defineType } from "sanity"
import { Tag } from 'lucide-react'

export default defineType({
  name: "recipeCategory",
  title: "Madkategori",
  type: "document",
  icon: Tag,
  fields: [
    {
      name: "title",
      title: "Titel",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Beskrivelse",
      type: "text",
      rows: 3,
    },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
})
