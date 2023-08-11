import {TypeToken, TypeTokenName} from "src/types";
import { stripLeading, stripTrailing } from "../literals";

type ExtractedToken = [token: TypeTokenName, data: string | undefined];

/**
 * **extractTypeToken**(payload)
 * 
 * Receives a TypeToken and parses this into a tuple: `[TypeTokenName, data: string | undefined]`
 */
export function extractTypeToken(payload: TypeToken): ExtractedToken {
  const extracted = stripTrailing(stripLeading(payload, "<<"), ">>").split(":");

  return extracted as ExtractedToken;
}
