import axios from 'axios'

export const baseUrl = 'https://aw2zxe2ua5.execute-api.us-east-1.amazonaws.com'

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 8000,
})

export const setJWT = (token: String | null) => {
  axiosInstance.defaults.headers.common['Authorization'] = token
    ? `${token}`
    : null
}

const api = {
  get: (url: String) =>
    axiosInstance.get(baseUrl + url).then((res) => res.data),
  post: (url: String, data: any) =>
    axiosInstance.post(baseUrl + url, data).then((res) => res.data),
  put: (url: String, data: any) =>
    axiosInstance.put(baseUrl + url, data).then((res) => res.data),
  patch: (url: String, data: any) =>
    axiosInstance.patch(baseUrl + url, data).then((res) => res.data),
  delete: (url: String) =>
    axiosInstance.delete(baseUrl + url).then((res) => res.data),
}

export default api
