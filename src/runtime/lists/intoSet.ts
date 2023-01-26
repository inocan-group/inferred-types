import { IntoSet } from "src/types/lists/sets";



export function intoSet<T extends readonly any[]>(set: T) {
  return set as unknown as IntoSet<T>;
}
