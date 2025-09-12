import type {
  AustralianNewsUrls,
  BelgianNewsUrls,
  CanadianNewsUrls,
  ChineseNewsUrls,
  DanishNewsUrls,
  DutchNewsUrls,
  FrenchNewsUrls,
  GermanNewsUrls,
  IndianNewsUrls,
  ItalianNewsUrls,
  JapaneseNewsUrls,
  MexicanNewsUrls,
  NorwegianNewsUrls,
  SouthKoreanNewsUrls,
  SpanishNewsUrls,
  SwissNewsUrls,
  TurkishNewsUrls,
  UkNewsUrls,
  UsNewsUrls,
} from "inferred-types/types";

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
export type NewsUrls
    = | AustralianNewsUrls
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
