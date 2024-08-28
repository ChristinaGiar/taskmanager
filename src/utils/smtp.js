import { createClient } from 'smtpexpress'

export const smtpexpressClient = createClient({
  projectId: import.meta.env.EMAIL_PROJECT_ID,
  projectSecret: import.meta.env.EMAIL_PROJECT_SECRET,
})
