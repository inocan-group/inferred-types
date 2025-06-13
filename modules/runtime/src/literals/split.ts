import type { Split } from "inferred-types/types";
import { createFnWithProps, last } from "inferred-types/runtime";

type Policy = "omit" | "before" | "after" | "inline";

const SEP = `sep:\u00A0` as const;

function splitUp<
    T extends readonly string[]
>(
    content: string[],
    sep: T,
    policy: Policy = "omit"
) {
    let inline = content;

    for (const s of sep) {
        const pass: string[] = [];
        for (const c of inline) {
            if (c.includes(s) && !c.startsWith(SEP)) {
                const splits = c.split(s);
                const all: string[] = [];
                for (const [idx, split] of splits.entries()) {
                    if (idx < splits.length - 1) { // Corrected condition
                        all.push(split, `${SEP}${s}`);
                    }
                    else {
                        all.push(split);
                    }
                }
                pass.push(...all);
            }
            else {
                pass.push(c);
            }
        }
        inline = pass;
    }

    if (policy === "omit") {
        inline = inline.filter(i => !i.startsWith(SEP));
    }
    else if (policy === "before") {
        let before: string[] = [];
        for (const el of inline) {
            if (el.startsWith(SEP)) {
                const val = el.replace(SEP, "");
                const priorVal = last(before);

                before = [...before.slice(0, -1), `${priorVal}${val}`];
            }
            else {
                before.push(el);
            }
        }
        inline = before;
    }
    else if (policy === "after") {
        const after: string[] = [];
        let next: undefined | string;
        for (const el of inline) {
            if (el.startsWith(SEP)) {
                next = el.replace(SEP, "");
            }
            else {
                if (next) {
                    after.push(`${next}${el}`);
                    next = undefined;
                }
                else {
                    after.push(el);
                }
            }
        }
        inline = after;
    }
    else if (policy === "inline") {
        inline = inline.map(i => i.startsWith(SEP) ? i.replace(SEP, "") : i);
    }

    return inline;
}

function omit<
    T extends string,
    S extends readonly string[]
>(
    str: T,
    ...sep: S
): Split<T, S, "omit"> {
    return splitUp([str], sep, "omit") as unknown as Split<T, S, "omit">;
}

function before<
    T extends string,
    S extends readonly string[]
>(
    str: T,
    ...sep: S
): Split<T, S, "before"> {
    return splitUp([str], sep, "before") as unknown as Split<T, S, "before">;
}

/**
 * Splits the content using the separator(s) and includes the separator in
 * the element _after_ the
 */
function after<
    T extends string,
    S extends readonly string[]
>(
    str: T,
    ...sep: S
) {
    return splitUp([str], sep, "after") as unknown as Split<T, S, "after">;
}

function inline<
    T extends string,
    S extends readonly string[]
>(
    str: T,
    ...sep: S
): Split<T, S, "inline"> {
    return splitUp([str], sep, "inline") as unknown as Split<T, S, "inline">;
}

/**
 * **split**`(str, sep)`
 *
 * Splits a string on a given separator while preserving string literal typing
 * when possible.
 *
 * - The default "policy" is to _omit_ the separator from the return tuple
 * - If you want to use the `before`, `after`, or `inline` policy types
 * they are available as properties of this function.
 */
export const split = createFnWithProps(omit, {
    omit,
    before,
    after,
    inline
}) as typeof omit & {
    omit: typeof omit,
    before: typeof before,
    after: typeof after,
    inline: typeof inline
};
