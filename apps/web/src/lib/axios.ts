import axios, { AxiosRequestConfig } from 'axios'

const config: AxiosRequestConfig = {
  baseURL: 'http://localhost:3333'
}

export const api = axios.create(config)
