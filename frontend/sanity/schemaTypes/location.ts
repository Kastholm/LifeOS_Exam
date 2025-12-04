import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export default defineType({
  name: 'location',
  title: 'Lokation',
  type: 'document',
  icon: HomeIcon,
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
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Rum', value: 'room' },
          { title: 'Møbel', value: 'furniture' },
          { title: 'Opbevaring', value: 'storage' },
          { title: 'Udendørs', value: 'outdoor' },
          { title: 'Andet', value: 'other' },
        ],
      },
      initialValue: 'room',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'type',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      const typeLabels = {
        room: 'Rum',
        furniture: 'Møbel',
        storage: 'Opbevaring',
        outdoor: 'Udendørs',
        other: 'Andet',
      }
      return {
        title,
        subtitle: typeLabels[subtitle as keyof typeof typeLabels] || subtitle,
      }
    },
  },
  orderings: [
    {
      title: 'Navn A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Type',
      name: 'typeAsc',
      by: [{ field: 'type', direction: 'asc' }],
    },
  ],
})

