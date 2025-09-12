import type { Err, IT_TakeOutcome, IT_TakeArray, IT_Token } from 'inferred-types/types';
import { isErr, err, createTemplateRegExp, isError, retainAfter, nestedSplit, getInputToken } from 'inferred-types/runtime';
import { isOk } from 'runtime/type-guards';

function it_takeArray_Postfix_Grouped<T extends string>(parse: T): IT_TakeOutcome<"array"> {
    // Pattern: `(string | number)[]` or `(string)[][]`
    const groupedRegex = /^\(([^)]+)\)(\[\]*)(.*)$/;
    const match = parse.match(groupedRegex);

    if (!match) {
        return err("wrong-handler/array-postfix-grouped");
    }

    const [, block, arraySuffix, rest] = match;

    // For now, we'll return a basic structure - actual type parsing will be done by getInputToken
    return {
        __kind: "IT_Token" as const,
        kind: "array" as const,
        token: `(${block})${arraySuffix}`,
        type: Array, // This will be refined by the orchestrator
        rest: rest.trim()
    };
}

export function it_takeArray__Postfix<T extends string>(parse: T): IT_TakeOutcome<"array"> {
    // Pattern: `string[]` or `string[][]`
    const postfixRegex = /^([^\[\]]+)(\[\]+)(.*)$/;
    const match = parse.match(postfixRegex);

    if (!match || !match[2]) {
        return err("wrong-handler/array-postfix");
    }

    const [, block, arraySuffix, rest] = match;

    return {
        __kind: "IT_Token" as const,
        kind: "array" as const,
        token: `${block}${arraySuffix}`,
        type: Array, // This will be refined by the orchestrator
        rest: rest.trim()
    };
}

export function it_takeArray__Bracket<T extends string>(parse: T): T extends `Array<${string}` ? IT_TakeArray<T> : Err<"wrong-handler/array-bracketed"> {
    if(parse.startsWith("Array<")) {
        // pattern matches
        const start = retainAfter(parse, "Array<");
        const [block, ...rest] = nestedSplit(start, ">") as readonly string[];
        const parsed = getInputToken(block.trim()); // try to parse the array's type
        if(isError(parsed)) {
            return parsed as T extends `Array<${string}` ? IT_TakeArray<T> : Err<"wrong-handler/array-bracketed">
        }

        return {
            __kind: "IT_Token",
            kind: "array",
            token: `Array<${block.trim()}>`,
            type: parsed.type,
            rest: rest.join(">").trim()
        } as T extends `Array<${string}` ? IT_TakeArray<T> : Err<"wrong-handler/array-bracketed">
    }

    return err(`wrong-handler/array-bracketed`) as unknown as T extends `Array<${string}` ? IT_TakeArray<T> : Err<"wrong-handler/array-bracketed">;
}

function select<TParse extends string>(parseStr: TParse) {
    return <TVariants extends ((str: string) => IT_TakeOutcome<"array">)[]>(...variants: TVariants) => {
        for (const v of variants) {
            const result = v(parseStr);
            if (isErr(result, "malformed-token")) {
                return result;
            } else if (!isErr(result, "wrong-handler")) {
                return result;
            }
        }
        return err("wrong-handler/array");
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
        it_takeArray__Postfix,
        it_takeArray__Bracket
    );
}
