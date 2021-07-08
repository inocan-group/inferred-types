/**
 * A type takes the two arguments. The first is an array of string values, the second is the value
 * which is being tested as it whether or not it's _included_ in the array. Result is true or false.
 */
export type Includes<T extends readonly any[], U> = U extends T[number] ? true : false;