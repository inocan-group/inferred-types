import { UsStateAbbrev, UsStateName } from "inferred-types/types"
import { isString } from "../isString"
import { US_STATE_LOOKUP } from "inferred-types/constants"

const ABBREV = US_STATE_LOOKUP.map(i => i.abbrev);
const NAME = US_STATE_LOOKUP.map(i => i.name);

export const isUsStateAbbreviation = (val: unknown): val is UsStateAbbrev => {
  return isString(val) && ABBREV.includes(val as any);
}

export const isUsStateName = (val: unknown): val is UsStateName => {
  return isString(val) && NAME.includes(val as any);
}

