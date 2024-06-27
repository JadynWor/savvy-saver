/* eslint-disable max-len -- disabled, regexes can be long */
/* eslint-disable security/detect-unsafe-regex -- disabled */

export const RegexConstants = {
    CONTAINS_DIGIT: /\d+/u,
    CONTAINS_LOWERCASE: /[a-z]+/u,
    CONTAINS_SYMBOL: /[\W_]+/u,
    CONTAINS_UPPERCASE: /[A-Z]+/u,
    EMAIL: /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/u,
    NO_DIGITS_SYMBOLS_SPACES: /^\w+(?:-+\w*)?$/u,
    NO_SPACES: /\s+/u,
    NO_SYMBOLS: /^\w+$/mu,
    TRAILING_SLASH: /\/$/mu,
    VALID_PHONE:
        /\(?(?<areaCode>\d{3})\)?(?<punctuationBeforeArea>[ .-]?)(?<last3>\d{3})\2(?<last4>\d{4})|^(?<startingPlusOrZeros>\+|00)[1-9][0-9 \-().]{7,32}$/u,
};
