import axios from "axios"

export default axios.create({
    baseURL: "https://www.googleapis.com/books/v1",
    params: {
        maxResults: 5,
        key: "AAIzaSyA0uwhrGlA5_WOMa6yxyu9Q1oS4XRnBAm0"
    }
})