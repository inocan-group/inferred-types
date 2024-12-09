import type { AustralianNewsUrls } from "./australian";
import type { BelgianNewsUrls } from "./belgian";
import type { CanadianNewsUrls } from "./canadian";
import type { ChineseNewsUrls } from "./chinese";
import type { DanishNewsUrls } from "./danish";
import type { DutchNewsUrls } from "./dutch";
import type { FrenchNewsUrls } from "./french";
import type { GermanNewsUrls } from "./german";
import type { IndianNewsUrls } from "./indian";
import type { ItalianNewsUrls } from "./italian";
import type { JapaneseNewsUrls } from "./japanese";
import type { MexicanNewsUrls } from "./mexican";
import type { NorwegianNewsUrls } from "./norwegian";
import type { SouthKoreanNewsUrls } from "./south-korean";
import type { SpanishNewsUrls } from "./spanish";
import type { SwissNewsUrls } from "./swiss";
import type { TurkishNewsUrls } from "./turkish";
import type { UkNewsUrls } from "./uk";
import type { UsNewsUrls } from "./us";

export * from "./australian";
export * from "./belgian";
export * from "./canadian";
export * from "./chinese";
export * from "./danish";
export * from "./dutch";
export * from "./french";
export * from "./german";
export * from "./indian";
export * from "./italian";
export * from "./japanese";
export * from "./mexican";
export * from "./norwegian";
export * from "./south-korean";
export * from "./spanish";
export * from "./swiss";
export * from "./turkish";
export * from "./uk";
export * from "./us";

/**
 * URLs which point to prominent news sites around the world.
 */
export type NewsUrls =
  | AustralianNewsUrls
  | BelgianNewsUrls
  | CanadianNewsUrls
  | ChineseNewsUrls
  | DanishNewsUrls
  | DutchNewsUrls
  | FrenchNewsUrls
  | GermanNewsUrls
  | IndianNewsUrls
  | ItalianNewsUrls
  | JapaneseNewsUrls
  | MexicanNewsUrls
  | NorwegianNewsUrls
  | SouthKoreanNewsUrls
  | SpanishNewsUrls
  | SwissNewsUrls
  | TurkishNewsUrls
  | UkNewsUrls
  | UsNewsUrls;
