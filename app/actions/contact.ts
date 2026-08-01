'use server'

import {
  contactSchema,
  type ContactFieldErrors,
  type ContactResult,
} from '@/lib/validation'

/**
 * Handles a contact / booking enquiry.
 *
 * Validation runs server-side regardless of what the client sent.
 * When Supabase is connected, insert here via the JS client — it
 * parameterises values, so never interpolate input into raw SQL.
 */
export async function submitContact(
  formData: FormData,
): Promise<ContactResult> {
  const parsed = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    projectType: formData.get('projectType'),
    message: formData.get('message'),
  })

  if (!parsed.success) {
    const fieldErrors: ContactFieldErrors = {}

    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof ContactFieldErrors | undefined
      if (field && !fieldErrors[field]) {
        fieldErrors[field] = issue.message
      }
    }

    return {
      ok: false,
      message: 'Please check the highlighted fields and try again.',
      fieldErrors,
    }
  }

  try {
    // TODO: persist to Supabase `enquiries` table once the integration is connected.
    console.log('[v0] New enquiry received:', {
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company,
      projectType: parsed.data.projectType,
      messageLength: parsed.data.message.length,
    })

    return {
      ok: true,
      message: "Thanks — your enquiry is in. I'll reply within one business day.",
    }
  } catch (error) {
    console.log(
      '[v0] Failed to record enquiry:',
      error instanceof Error ? error.message : error,
    )

    return {
      ok: false,
      message:
        'Something went wrong on my end. Please email me directly and I\u2019ll pick it up.',
    }
  }
}
