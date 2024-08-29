import { sendAPI } from '../apis/send-api.ts'
import { HttpService } from './http-service.ts'
import { CredentialOptions } from './types'

export function createClient(credentials: CredentialOptions) {
  let PROJECT_ID = credentials.projectId
  let PROJECT_SECRET = credentials.projectSecret

  const httpService = new HttpService({
    headers: {
      Authorization: `Bearer ${PROJECT_SECRET}`,
    },
  })

  return { sendApi: sendAPI(httpService) }
}
