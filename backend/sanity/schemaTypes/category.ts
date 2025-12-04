import { defineField, defineType } from 'sanity'
import { TagIcon } from '@sanity/icons'

export default defineType({
  name: 'category',
  title: 'Kategori',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: 'description',
      title: 'Beskrivelse',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'color',
      title: 'Farve',
      type: 'string',
      options: {
        list: [
          { title: 'Blå', value: 'blue' },
          { title: 'Grøn', value: 'green' },
          { title: 'Rød', value: 'red' },
          { title: 'Gul', value: 'yellow' },
          { title: 'Lilla', value: 'purple' },
          { title: 'Orange', value: 'orange' },
          { title: 'Pink', value: 'pink' },
          { title: 'Grå', value: 'gray' },
        ],
      },
      initialValue: 'blue',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
    },
  },
  orderings: [
    {
      title: 'Navn A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})
