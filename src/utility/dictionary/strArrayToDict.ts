import { ExpandRecursively } from "~/types/ExpandRecursively";


/**
 * converts an array of strings `["a", "b", "c"]` into a more type friendly
 * dictionary of the type `{ a: true, b: true, c: true }`
 */
export function strArrayToDict<T extends readonly string[]>(...strings: T) {
  return strings.reduce((acc, str) => {
    acc = { ...acc, [str]: true };
    return acc;
  }, {} as ExpandRecursively<Record<typeof strings[number], true>>);
}
