import { AsIp6Prefix, Ip6Group } from "src/types/string-literals";
import { addToken } from "./shape-helpers/addToken";

export const ip6Prefix = <T extends readonly Ip6Group[]>(...groups: T) => {
  const empty = addToken("string") as `${string}`;
  let count = 4 - groups.length;
  let fillIn: typeof empty[] = [];
  for (let index = 0; index < count; index++) {
    fillIn.push(empty);
  }
  return [
    "<<string::",
    [
      groups.join(":"), 
      fillIn.join(":"),
    ].join(":"),
    ">>"
  ].join("") as unknown as AsIp6Prefix<T>
}
