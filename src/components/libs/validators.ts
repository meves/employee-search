const REGEXP_INPUT = /^[A-Za-zА-Яа-я ,_.]{1,}$/

export const validateInput = (input: string) => {    
    return REGEXP_INPUT.test(input)
}