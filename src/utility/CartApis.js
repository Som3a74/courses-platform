const { default: axiosClient } = require("./axiosClient");

export function PostToCart(payload) {
    return axiosClient.post(`/carts`, payload)
}

export function GetCart(email) {
    return axiosClient.get(`carts?populate[products][populate]=banner&filters[email][$eq]=${email}`)
}

export function DeleteCart(id) {
    return axiosClient.delete(`/carts/${id}`)
}