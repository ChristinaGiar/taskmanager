import { createClient } from '../libs/smtpExpress/helpers/client.ts'

export const smtpexpressClient = createClient({
  projectId: process.env.REACT_APP_EMAIL_PROJECT_ID,
  projectSecret: process.env.REACT_APP_EMAIL_PROJECT_SECRET,
})
