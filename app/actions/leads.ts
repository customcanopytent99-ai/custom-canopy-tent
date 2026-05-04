'use server'

import { writeClient } from '@/sanity/lib/client'
import { sendLeadEmail } from '@/utils/email'

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

    const result = await writeClient.create(doc)
    
    // Send email notification to admin (non-blocking)
    try {
      await sendLeadEmail(formData)
    } catch (emailError) {
      console.error('Email sending failed but lead was created:', emailError)
    }

    return { success: true, id: result._id }
  } catch (error: any) {
    console.error('Submission error:', error)
    return { success: false, error: error.message || 'Failed to submit' }
  }
}
