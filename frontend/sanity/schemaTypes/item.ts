import { defineField, defineType } from 'sanity'
import { PackageIcon } from '@sanity/icons'

export default defineType({
  name: 'item',
  title: 'Genstand',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'quantity',
      title: 'Antal',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
      initialValue: 1,
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Lokation',
      type: 'reference',
      to: [{ type: 'location' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Beskrivelse',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'value',
      title: 'Værdi (1-10)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(10),
      options: {
        list: [
          { title: '1 - Meget lav', value: 1 },
          { title: '2 - Lav', value: 2 },
          { title: '3 - Under middel', value: 3 },
          { title: '4 - Lidt under middel', value: 4 },
          { title: '5 - Middel', value: 5 },
          { title: '6 - Lidt over middel', value: 6 },
          { title: '7 - Over middel', value: 7 },
          { title: '8 - Høj', value: 8 },
          { title: '9 - Meget høj', value: 9 },
          { title: '10 - Ekstrem høj', value: 10 },
        ],
      },
      initialValue: 5,
    }),
    defineField({
      name: 'forSale',
      title: 'Sælg genstand',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'image',
      title: 'Billede',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'purchaseDate',
      title: 'Købsdato',
      type: 'date',
    }),
    defineField({
      name: 'purchasePrice',
      title: 'Købspris (DKK)',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      quantity: 'quantity',
      categoryName: 'category.name',
      locationName: 'location.name',
      forSale: 'forSale',
      media: 'image',
    },
    prepare(selection) {
      const { title, quantity, categoryName, locationName, forSale } = selection
      const subtitle = `${quantity}x • ${categoryName || 'Ingen kategori'} • ${locationName || 'Ingen lokation'}${forSale ? ' • TIL SALG' : ''}`
      return {
        title,
        subtitle,
        media: selection.media,
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
      title: 'Værdi (høj til lav)',
      name: 'valueDesc',
      by: [{ field: 'value', direction: 'desc' }],
    },
    {
      title: 'Antal (høj til lav)',
      name: 'quantityDesc',
      by: [{ field: 'quantity', direction: 'desc' }],
    },
    {
      title: 'Til salg først',
      name: 'forSaleFirst',
      by: [{ field: 'forSale', direction: 'desc' }],
    },
  ],
})

