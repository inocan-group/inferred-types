


/**
 * **DefineModifiers**`<T>`
 *
 * Take a tuple of string literals and converts this into a "modifier" where
 * any of the defined modifiers can be expressed singularly as a string or as
 * part of a tuple array of modifiers.
 */
export type DefineModifiers<T extends readonly string[]> = null | T[number] | readonly (T[number])[];


// Each<T, "isLiteral"> extends true
// ? T[number] | readonly T[]
// : Err<
//     `invalid-modifier/wide`,
//     `Call to Modifiers<T> included a wide type in the list of modifier strings!`
// >;
