import { z } from 'zod'
import { PROJECT_TYPES } from '@/lib/content'

/** Shared by the client form and the server action — one source of truth. */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your name.')
    .max(80, 'That name is a little too long.'),
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email.')
    .max(160, 'That email is too long.')
    .email('Please enter a valid email address.'),
  company: z
    .string()
    .trim()
    .min(2, 'Please tell me your brand or company.')
    .max(120, 'That name is a little too long.'),
  projectType: z.enum(PROJECT_TYPES, {
    message: 'Please choose a project type.',
  }),
  message: z
    .string()
    .trim()
    .min(20, 'A little more detail helps — 20 characters minimum.')
    .max(2000, 'Please keep it under 2000 characters.'),
})

export type ContactInput = z.infer<typeof contactSchema>

export type ContactFieldErrors = Partial<
  Record<keyof ContactInput, string>
>

export interface ContactResult {
  ok: boolean
  message: string
  fieldErrors?: ContactFieldErrors
}
