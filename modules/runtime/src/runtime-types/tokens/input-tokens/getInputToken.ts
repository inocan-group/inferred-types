import { InputToken, InputTokenSuggestions, IT_Token } from "inferred-types/types";


export function getInputToken<T extends InputTokenSuggestions>(token: T): IT_Token {
    // TODO: responsible for parsing the provided token into a `IT_Token` type.
}
