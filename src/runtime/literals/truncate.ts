import { Truncate } from "src/types/string-literals/Truncate";


export const truncate = <
  TStr extends string, 
  TMax extends number, 
  TEllipsis extends boolean | string = false
>(content: TStr, maxLength: TMax, ellipsis: TEllipsis = false as TEllipsis) => {
  const overLimit = content.length > maxLength;

  return (
    overLimit
    ? ellipsis 
      ?  `${content.slice(0,maxLength)}${typeof ellipsis === "string" ? ellipsis : "..."}`
      :  content.slice(0,maxLength)
    : content
  ) as Truncate<TStr,TMax,TEllipsis>;

}
