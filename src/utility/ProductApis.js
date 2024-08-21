const { default: axiosClient } = require("./axiosClient");

export function GetProductData() {
    return axiosClient.get('/products?populate=*')
}

export function GetSingleCourse(id) {
    return axiosClient.get(`/products/${id}?populate=*`)
}

export function getProductsByCategory (category) {
    return axiosClient.get(`/products?filters[category][$eq]=${category}&populate=*`)
}
