import {US_STATE_LOOKUP, US_STATE_LOOKUP_PROVINCES} from "src/constants/index"
import { Mutable, IsTrue } from "src/types/index";


type UsStateLookup = Mutable<typeof US_STATE_LOOKUP>;
type UsProvinceLookup = Mutable<typeof US_STATE_LOOKUP_PROVINCES>;


type _UsStateAbbrev = {
  [K in keyof UsStateLookup]: UsStateLookup[K] extends { abbrev: infer A extends string}
    ? A
    : never;
}[number];

type _UsProvinceAbbrev = {
  [K in keyof UsProvinceLookup]: UsProvinceLookup[K] extends { abbrev: infer A extends string}
    ? A
    : never;
}[number];

/**
 * **UsStateAbbrev**`<TStrict>`
 *
 * A union type which includes all state abbreviations.
 *
 * By default it will also include all US provinces and territories which have
 * a state abbreviation. If you prefer to just use the strict state list then
 * set `TStrict` to **true**.
 *
 * **Related:** `UsStateAbbrev`
 */
export type UsStateAbbrev<TStrict extends boolean = false> = IsTrue<TStrict> extends true
? Exclude<_UsStateAbbrev, _UsProvinceAbbrev>
: _UsStateAbbrev;

type _UsStateName = {
  [K in keyof UsStateLookup]: UsStateLookup[K] extends {
    name: infer A extends string;
  }
    ? A
    : never;
}[number];

type _UsProvinceName = {
  [K in keyof UsProvinceLookup]: UsProvinceLookup[K] extends { name: infer A extends string }
    ? A
    : never;
}[number];

/**
 * **UsStateName**`<TStrict>`
 *
 * A union type which includes all US state names (and provinces with state codes)
 * fully spelled out. If you want _only_ US states set the `TStrict` generic to `true`.
 *
 * **Related:** `UsStateAbbrev`
 */
export type UsStateName<TStrict extends boolean = false> = IsTrue<TStrict> extends true
  ? Exclude<_UsStateName, _UsProvinceName>
  : _UsStateName;



