import { IT_Token } from 'inferred-types/types';
import { isTokenDefinition, isErr, err } from 'inferred-types/runtime';

function it_takeArray_Postfix_Grouped(parse: string) {
    // TODO
    return err("wrong-handler/postfix-array-grouped")
}

function it_takeArray_Postfix(parse: string) {
    // TODO
    return err("wrong-handler/array-postfix")
}

function it_takeArray_Bracket(parse: string) {
    // TODO
    return err("wrong-handler/array-bracketed")
}


function select<TParse extends string>(parseStr: TParse) {
    return <TVariants extends ((str: string) => IT_Token<"array"> | Error)[]>(...variants: TVariants) => {
        for (const v of variants) {
            if(isErr(v(parseStr), "malformed-token")) {
                return v;
            } else if (isTokenDefinition(v)) {
                return v;
            }
        }
        return err(`wrong-handler/array`)
    }
}

/**
 * **it_takeArray**`(parseStr)`
 *
 * Tries to take wide array signatures off the head of the string token.
 *
 * - **PostFix**: `string[]`, `string[][]`, `number[]`, etc.
 * - **PostFix Grouped**: `(string | number)[]`, `(number | boolean)[][]`
 * - **Bracketed**: `Array<string>`, `Array<string | number>`
 */
export function it_takeArray<T extends string>(parseStr: T) {
    const parse = parseStr.trim();

    return select(parse)(
        it_takeArray_Postfix_Grouped,
        it_takeArray_Postfix,
        it_takeArray_Bracket
    );

}
