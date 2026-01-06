import { APIRequestContext } from '@playwright/test';

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  data?: any;
}

export class APIClient {
  constructor(
    private request: APIRequestContext,
    private baseURL: string = 'https://jsonplaceholder.typicode.com'
  ) {}

  async get(endpoint: string, options?: RequestOptions) {
    return this.request.get(`${this.baseURL}${endpoint}`, {
      headers: options?.headers,
    });
  }

  async post(endpoint: string, data: any, options?: RequestOptions) {
    return this.request.post(`${this.baseURL}${endpoint}`, {
      data,
      headers: options?.headers,
    });
  }

  async put(endpoint: string, data: any, options?: RequestOptions) {
    return this.request.put(`${this.baseURL}${endpoint}`, {
      data,
      headers: options?.headers,
    });
  }

  async patch(endpoint: string, data: any, options?: RequestOptions) {
    return this.request.patch(`${this.baseURL}${endpoint}`, {
      data,
      headers: options?.headers,
    });
  }

  async delete(endpoint: string, options?: RequestOptions) {
    return this.request.delete(`${this.baseURL}${endpoint}`, {
      headers: options?.headers,
    });
  }
}
