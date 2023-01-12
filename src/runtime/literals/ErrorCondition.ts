/**
 * **ErrorCondition**`<T>`
 * 
 * A way to express a meaningful error message in type system
 */
export type ErrorCondition<T extends string> = readonly ['ERROR', T];
