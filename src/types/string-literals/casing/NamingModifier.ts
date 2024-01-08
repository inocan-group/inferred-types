import { NamingConvention, IfContains } from "src/types/index";

/**
 * **NamingModifier**`<T>`
 * 
 * Given a `NamingConvention` for `T`, this will provide a type union of valid
 * _modifiers_ for this convention.
 */
export type NamingModifier<T extends NamingConvention> = IfContains<
  ["kebab-case", "snake_case"], T,
  "ALL_CAPS" | "no_caps" | "none",
  "none"
>;
