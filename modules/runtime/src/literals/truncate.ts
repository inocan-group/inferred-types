import type { Truncate } from "inferred-types/types";

export function truncate<
  TStr extends string,
  TMax extends number,
  TEllipsis extends boolean | string = false,
>(content: TStr, maxLength: TMax, ellipsis: TEllipsis = false as TEllipsis) {
  const overLimit = content.length > maxLength;

  return (
    overLimit
      ? ellipsis
        ? `${content.slice(0, maxLength)}${typeof ellipsis === "string" ? ellipsis : "..."}`
        : content.slice(0, maxLength)
      : content
  ) as unknown as Truncate<TStr, TMax, TEllipsis>;
}
