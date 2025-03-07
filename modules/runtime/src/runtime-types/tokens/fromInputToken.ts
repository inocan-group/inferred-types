import { FromInputToken, InputToken } from "inferred-types/types";


export function fromInputToken<T extends InputToken>(token: T) {
    return toOutputToken(token) as unknown as FromInputToken<T>;
}
