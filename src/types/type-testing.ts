/**
 * Validates that a given type extends another and returns `true` or `false` type
 */
export type ExpectExtends<VALUE, EXPECTED> = EXPECTED extends VALUE ? true : false;

/**
 * Validates that a given type extends another and returns `any` or `never` as a type
 */
export type AssertExtends<VALUE, EXPECTED> = EXPECTED extends VALUE ? any : never;


export type IfExtends<VALUE, EXPECTED> = EXPECTED extends VALUE ? VALUE : never;

/**
 * Give a type `TValue` and a comparison type `TExtends` 
 */
export type IfExtendsThen<VALUE, EXPECTED, THEN> = EXPECTED extends VALUE ? THEN : never;