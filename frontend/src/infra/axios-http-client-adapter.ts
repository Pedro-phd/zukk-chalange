import {
  type HttpClient,
  type HttpRequest,
  type HttpResponse,
  HttpStatusCode,
} from '@/data/protocols/http/http-client'

import axios, { type AxiosResponse } from 'axios'

export class AxiosHttpClientAdapter implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers,
      })
    } catch (error) {
      if (error.response) {
        return {
          statusCode: error.response.status,
          error: error.response.data?.message ?? error.response.message,
        }
      } else if (error.request) {
        return {
          statusCode: HttpStatusCode.serverError,
          error: error.message,
        }
      } else {
        return { statusCode: HttpStatusCode.serverError }
      }
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    }
  }
}
