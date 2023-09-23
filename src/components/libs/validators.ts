const REGEXP_INPUT = /^[A-Za-zА-Яа-я ,]{1,}$/

export const validateInput = (input: string) => {    
    return REGEXP_INPUT.test(input)
}