import type { AsIp6Prefix, Ip6Group } from "inferred-types/types";
import { addToken } from "./shape-helpers/addToken";

export function ip6Prefix<T extends readonly Ip6Group[]>(...groups: T) {
  const empty = addToken("string") as `${string}`;
  const count = 4 - groups.length;
  const fillIn: typeof empty[] = [];
  for (let index = 0; index < count; index++) {
    fillIn.push(empty);
  }
  return [
    "<<string::",
    [
      groups.join(":"),
      fillIn.join(":"),
    ].join(":") as string,
    ">>",
  ].join("") as unknown as AsIp6Prefix<T>;
}
