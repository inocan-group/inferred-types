import { As, Err, Expand, Last, Pop, RetainChars, ReverseLookup, StringKeys, Values } from "inferred-types/types";

export type Stack<
    TDefn extends Record<string,string>
> = {
    /** the characters which traverse further into the stack */
    openChars: StringKeys<TDefn>[number];
    /** the characters which exit up a level in the stack */
    closeChars: Values<TDefn>[number];

    retainChars: StringKeys<TDefn>[number] | Values<TDefn>[number];

    reverse: ReverseLookup<TDefn>;
    /**
     * A lookup table of openning characters to their closing characters.
     */
    lookup: TDefn;
}


type S = Stack<{
    "(": ")",
    "[": "]"
}>;

type ParenthesesCheck<T extends string, Stack extends ("("|")")[] = []> =
T extends `(${infer Remaining}`
    ? ParenthesesCheck<Remaining, ["(", ...Stack]>
    : T extends `)${}`
