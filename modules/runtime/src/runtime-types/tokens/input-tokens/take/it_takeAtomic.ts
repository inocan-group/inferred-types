// type AtomicMap = {
//     string: string;
//     number: number;
//     bigint: bigint;
//     boolean: boolean;
//     true: true;
//     false: false;
//     null: null;
//     undefined: undefined;
//     void: void;
//     unknown: unknown;
//     any: any;
//     object: object;
//     Object: object;
// };

// const ATOMIC_TYPES = [
//     "string",
//     "number",
//     "boolean",
//     "unknown",
//     "any",
//     "void",
//     "never",
//     "undefined",
//     "null",
//     "object",
//     "Object",
//     "symbol",
//     "bigint"
// ] as const;

/**
 * **it_takeAtomic**`(parseStr)`
 *
 * Tries to take atomic TypeScript types off the head of the string token.
 *
 * Handles: `string`, `number`, `boolean`, `true`, `false` `unknown`, `any`,
 * `void`, `never`, `undefined`, `null`, `object`, `Object`, `symbol`, and `bigint`
 */
export function it_takeAtomic<T extends string>(_parseStr: T) {
    // const parse = trim(parseStr);
    // const take = takeStart(...ATOMIC_TYPES);

    // const state = take(parse);

    // return last(state.parsed)
}
