import type {
  Iso3166_1_Alpha2,
  Iso3166_1_Alpha3,
  Metric,
  OptSpace,
  ReplaceAll,
  UsStateAbbrev,
  Zip5,
  ZipCode,
} from "inferred-types/types";

export type StringLiteralVar = "string"
  | "number"
  | "boolean"
  | "Metric"
  | "OptSpace"
  | "CountryCode"
  | "CountryCode2"
  | "CountryCode3"
  | "UsState"
  | "UsStateName"
  | "Zip5"
  | "ZipCode";

type BaseConvert<T extends string> =
ReplaceAll<
  ReplaceAll<
    ReplaceAll<
      T,
    `{{${OptSpace}string${OptSpace}}}`,
    `${string}`
    >,
  `{{${OptSpace}number${OptSpace}}}`,
  `${number}`
  >,
`{{${OptSpace}boolean${OptSpace}}}`,
`${boolean}`
>;

type Convert<T extends string> =
ReplaceAll<
  ReplaceAll<
    ReplaceAll<
      ReplaceAll<
        ReplaceAll<
          ReplaceAll<
            ReplaceAll<
              BaseConvert<T>,
  `{{${OptSpace}Metric${OptSpace}}}`,
  `${Metric}`
            >,
`{{${OptSpace}OptSpace${OptSpace}}}`,
`${OptSpace}`
          >,
`{{${OptSpace}${"CountryCode" | "CountryCode2"}${OptSpace}}}`,
`${Iso3166_1_Alpha2}`
        >,
`{{${OptSpace}CountryCode3${OptSpace}}}`,
`${Iso3166_1_Alpha3}`
      >,
`{{${OptSpace}UsState${OptSpace}}}`,
`${UsStateAbbrev}`
    >,
`{{${OptSpace}Zip5${OptSpace}}}`,
`${Zip5}`
  >,
`{{${OptSpace}ZipCode${OptSpace}}}`,
`${ZipCode}`
>;

/**
 * a string with at least one dynamic property to be converted
 * with `AsStringLiteral`.
 */
export type StringLiteralTemplate = `${string}{{${OptSpace}ZipCode${StringLiteralVar}}}${string}`;

/**
 * **AsStringLiteral**`<T>`
 *
 * Converts a string literal template into the _type_ of that
 * template string.
 */
export type AsStringLiteral<T extends string | readonly string[]> = T extends readonly string[]
  ? {
      [K in keyof T]: T[K] extends string
        ? Convert<T[K]>
        : never
    }
  : T extends string ? Convert<T> : never;
