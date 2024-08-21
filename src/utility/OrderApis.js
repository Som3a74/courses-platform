const { default: axiosClient } = require("./axiosClient");

export function createOrder(data) {
    return axiosClient.post("/orders", data)
}