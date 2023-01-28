import { IntoSet } from "../../types/lists/sets";



export function intoSet<T extends readonly any[]>(set: T) {
  return set as unknown as IntoSet<T>;
}
