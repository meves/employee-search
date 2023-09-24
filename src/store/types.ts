import { ResponseErrors } from "./libs/constatnts"

export type SearchStatus = 'start' | 'found' | 'notfound'

export type User = {
    id: number
    name: string
    username: string
    email: string
    address: Adress
    phone: string
    website: string
    company: Company
}

type Adress = {    
    street: string
    suite: string
    city: string
    zipcode: string
    geo: Geo
}

type Geo = {
    lat: string
    lng: string
}

type Company = {
    name: string
    catchPhrase: string
    bs: string
}

export type ResponseError = 
    typeof ResponseErrors.NOT_CREDENTIALS |
    typeof ResponseErrors.NOT_FOUND |
    typeof ResponseErrors.SERVER_ERROR
