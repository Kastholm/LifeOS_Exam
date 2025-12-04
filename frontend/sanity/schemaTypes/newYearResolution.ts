import { defineField, defineType } from "sanity"
import { CalendarIcon } from "@sanity/icons"

export default defineType({
  name: "newYearResolution",
  title: "Nytårsforsæt",
  type: "document",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "year",
      title: "År",
      type: "number",
      validation: (Rule) => Rule.required().min(2020).max(2030),
    }),
    defineField({
      name: "resolutions",
      title: "Forsæt",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "resolution",
              title: "Nytårsforsæt",
              type: "string",
              validation: (Rule) => Rule.required().max(200),
            }),
            defineField({
              name: "completed",
              title: "Fuldført",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: "resolution",
              completed: "completed",
            },
            prepare({ title, completed }) {
              return {
                title: title,
                subtitle: completed ? "✅ Fuldført" : "⏳ I gang",
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      year: "year",
      resolutions: "resolutions",
    },
    prepare({ year, resolutions }) {
      const completedCount = resolutions?.filter((r: any) => r.completed).length || 0
      const totalCount = resolutions?.length || 0
      return {
        title: `Nytårsforsæt ${year}`,
        subtitle: `${completedCount}/${totalCount} fuldført`,
      }
    },
  },
  orderings: [
    {
      title: "År (nyeste først)",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
})

