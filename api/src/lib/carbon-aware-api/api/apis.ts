export * from './carbonAwareApi'
import * as http from 'http'

import { CarbonAwareApi } from './carbonAwareApi'

export class HttpError extends Error {
  constructor(
    public response: http.IncomingMessage,
    public body: any,
    public statusCode?: number
  ) {
    super('HTTP request failed')
    this.name = 'HttpError'
  }
}

export { RequestFile } from '../model/models'

export const APIS = [CarbonAwareApi]
