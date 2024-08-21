const { default: axios } = require("axios");

const apiKey = process.env.NEXT_PUBLIC_API_KEY
const URLApi = 'http://localhost:1337/api'

const axiosClient = axios.create({
    baseURL: URLApi,
    headers: {
        Authorization: 'Bearer' + apiKey
    }
})

export default axiosClient;