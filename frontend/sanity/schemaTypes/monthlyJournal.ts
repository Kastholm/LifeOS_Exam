import { defineField, defineType } from "sanity"

const richTextConfig = {
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
}

export default defineType({
  name: "monthlyJournal",
  title: "Månedsbog",
  type: "document",
  icon: () => "📅",
  fields: [
    defineField({
      name: "date",
      title: "Dato",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "month",
      title: "Måned",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(12),
    }),
    defineField({
      name: "year",
      title: "År",
      type: "number",
      validation: (Rule) => Rule.required().min(2020),
    }),
    defineField({
      name: "general",
      title: "Generelt",
      ...richTextConfig,
    }),
    defineField({
      name: "work",
      title: "Arbejde",
      ...richTextConfig,
    }),
    defineField({
      name: "training",
      title: "Træning",
      ...richTextConfig,
    }),
    defineField({
      name: "selfDevelopment",
      title: "Selvudvikling",
      ...richTextConfig,
    }),
    defineField({
      name: "development",
      title: "Udvikling",
      ...richTextConfig,
    }),
  ],
  preview: {
    select: {
      month: "month",
      year: "year",
    },
    prepare(selection) {
      const { month, year } = selection
      const monthNames = [
        "Januar",
        "Februar",
        "Marts",
        "April",
        "Maj",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "December",
      ]
      return {
        title: `${monthNames[month - 1]} ${year}`,
        subtitle: `Månedsbog`,
      }
    },
  },
  orderings: [
    {
      title: "Nyeste først",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
})

