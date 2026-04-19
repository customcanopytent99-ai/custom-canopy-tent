import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const leadType = defineType({
  name: 'lead',
  title: 'Lead',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Full Name',
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email Address',
    }),
    defineField({
      name: 'phone',
      type: 'string',
      title: 'Phone Number',
    }),
    defineField({
      name: 'company',
      type: 'string',
      title: 'Company / Organization',
    }),
    defineField({
      name: 'tentSize',
      type: 'string',
      title: 'Tent Size',
    }),
    defineField({
      name: 'quantity',
      type: 'string',
      title: 'Quantity',
    }),
    defineField({
      name: 'useCase',
      type: 'string',
      title: 'Primary Use Case',
    }),
    defineField({
      name: 'message',
      type: 'text',
      title: 'Project Details / Message',
    }),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Status',
      options: {
        list: [
          {title: 'New', value: 'new'},
          {title: 'Contacted', value: 'contacted'},
          {title: 'Quoted', value: 'quoted'},
          {title: 'Converted', value: 'converted'},
          {title: 'Closed', value: 'closed'},
        ],
      },
      initialValue: 'new',
    }),
  ],
})
