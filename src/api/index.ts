import axios from "axios";

export const baseURL = 'https://jsonplaceholder.typicode.com/'

export const instance = 
    axios.create({
        baseURL,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    })
