import { StripTrailing } from "src/types/index";

const switchType = <T extends string | number>(content: T) => <V>(val: V) => {
  return typeof content === "number"
    ? Number(val)
    : val;
}

/**
 * **stripTrailing**(content, strip)
 *
 * Runtime utility which ensures that last part of a string has substring
 * removed if it exists and that strong typing is preserved.
 */
export function stripTrailing<
  T extends string | number, 
  U extends string | number
>(
  content: T,
  strip: U
): StripTrailing<T, U> {
  const re = new RegExp(`(.*)${strip}$`);
  return (
    String(content)?.endsWith(String(strip)) 
      ? switchType(content)(String(content).replace(re, "$1"))
      : switchType(content)(String(content))
  ) as unknown as StripTrailing<T, U>;
}

