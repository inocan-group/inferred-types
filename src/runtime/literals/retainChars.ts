import { RetainChars, TupleToUnion } from "src/types/type-conversion";
import { asChars } from "../type-conversion/asChars";


export const retainChars = <
  TContent extends string,
  TRetain extends readonly string[]
>(
  content: TContent,
  ...retain: TRetain
): RetainChars<TContent, TupleToUnion<TRetain>> => {
  return asChars(content).filter(c => retain.includes(c)).join("") as unknown as RetainChars<TContent, TupleToUnion<TRetain>>
}


