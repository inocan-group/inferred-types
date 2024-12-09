import { TW_MODIFIERS } from "inferred-types/constants"
import { TwModifier } from "inferred-types/types";
import { isTailwindModifier } from "inferred-types/runtime";

const MODS = TW_MODIFIERS.map(i => `${i}:`);

/**
 * Extracts all the modifiers found on the passed in string and
 * removes them.
 *
 * **Related:** `getTailwindModifiers`
 */
export const removeTailwindModifiers = (val: string): string => {
  return MODS.some(i => val.startsWith(i))
    ? removeTailwindModifiers(val.replace(MODS.find(i => val.startsWith(i)) as string, ""))
    : val
}


/**
 * Extracts an array of Tailwind Modifiers found at the start of a Tailwind string.
 */
export const getTailwindModifiers = (val: string): TwModifier[] => {

  return val.split(":").filter(i => isTailwindModifier(i));

}
