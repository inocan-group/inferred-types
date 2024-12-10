import type { UsStateAbbrev, UsStateName } from "inferred-types/types";
import { US_STATE_LOOKUP } from "inferred-types/constants";
import { isString } from "../isString";

const ABBREV = US_STATE_LOOKUP.map(i => i.abbrev);
const NAME = US_STATE_LOOKUP.map(i => i.name);

export function isUsStateAbbreviation(val: unknown): val is UsStateAbbrev {
  return isString(val) && ABBREV.includes(val as any);
}

export function isUsStateName(val: unknown): val is UsStateName {
  return isString(val) && NAME.includes(val as any);
}
