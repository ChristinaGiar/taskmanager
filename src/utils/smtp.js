import { createClient } from 'smtpexpress'

export const smtpexpressClient = createClient({
  projectId: process.env.REACT_APP_EMAIL_PROJECT_ID,
  projectSecret: process.env.REACT_APP_EMAIL_PROJECT_SECRET,
})
