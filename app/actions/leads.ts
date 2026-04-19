'use server'

import { createClient } from 'next-sanity'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-04-17',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Requires a token with write access
})

export async function submitLead(formData: any) {
  try {
    const doc = {
      _type: 'lead',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      tentSize: formData.tentSize,
      quantity: formData.quantity,
      useCase: formData.useCase,
      message: formData.message,
      status: 'new',
    }

    const result = await client.create(doc)
    return { success: true, id: result._id }
  } catch (error) {
    console.error('Submission error:', error)
    return { success: false, error: 'Failed to submit' }
  }
}
