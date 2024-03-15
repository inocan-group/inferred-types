import { UnionToTuple, RuntimeUnion, Narrowable } from "src/types/index"

/**
 * **asUnion**(...members)
 * 
 * Creates a `RuntimeUnion` which acts as a function which returns
 * the union type but also exposes a `members` property which allows
 * the runtime to check all elements of the union. 
 */
export const asUnion = <
  T extends readonly Narrowable[]
>(...members: T) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fn: any = () => "union" as unknown as UnionToTuple<T>;
  fn.kind = "Union";
  fn.members = members;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fn.includes = (v: any) => members.includes(v);

  return fn as RuntimeUnion<T>;
}
