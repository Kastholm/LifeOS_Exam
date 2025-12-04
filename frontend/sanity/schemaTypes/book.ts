import { defineField, defineType } from "sanity"

export default defineType({
  name: "book",
  title: "Bog",
  type: "document",
  icon: () => "📚",
  fields: [
    defineField({
      name: "number",
      title: "Nummer",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Billede",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "date",
      title: "Dato",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "completed",
      title: "Færdiglæst",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "notes",
      title: "Noter",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
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
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      number: "number",
      completed: "completed",
      media: "image",
    },
    prepare(selection) {
      const { title, number, completed } = selection
      const status = completed ? "✅" : "📖"
      return {
        title: `${number}. ${title}`,
        subtitle: `${status} ${completed ? "Færdiglæst" : "I gang"}`,
        media: selection.media,
      }
    },
  },
  orderings: [
    {
      title: "Nummer (stigende)",
      name: "numberAsc",
      by: [{ field: "number", direction: "asc" }],
    },
    {
      title: "Nummer (faldende)",
      name: "numberDesc",
      by: [{ field: "number", direction: "desc" }],
    },
    {
      title: "Dato (nyeste først)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
    {
      title: "Færdiglæste først",
      name: "completedFirst",
      by: [{ field: "completed", direction: "desc" }],
    },
  ],
})

