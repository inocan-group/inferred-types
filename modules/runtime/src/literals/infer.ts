import type { ExpandDictionary, OptSpace } from "inferred-types/types";

type Ext = "string" | "number" | "boolean";

type InferenceVars<
  T extends string,
  V extends readonly [str: string[], num: string[], bool: string[]] = [[], [], []],
> = T extends `${string}{{${OptSpace}infer ${infer Var} extends ${infer Type extends Ext}${OptSpace}}}${infer REST}`
  ? Type extends "number"
    ? InferenceVars<REST, [V[0], [...V[1], Var], V[2]]>
    : Type extends "boolean"
      ? InferenceVars<REST, [V[0], V[1], [...V[2], Var]]>
      : InferenceVars<REST, [[...V[0], Var], V[1], V[2]]>
  : T extends `${string}{{${OptSpace}infer ${infer Var}${OptSpace}as ${infer Type extends Ext}${OptSpace}}}${infer REST}`
    ? Type extends "number"
      ? InferenceVars<REST, [V[0], [...V[1], Var], V[2]]>
      : Type extends "boolean"
        ? InferenceVars<REST, [V[0], V[1], [...V[2], Var]]>
        : InferenceVars<REST, [[...V[0], Var], V[1], V[2]]>
    : T extends `${string}{{${OptSpace}infer ${infer Var}${OptSpace}}}${infer REST}`
      ? InferenceVars<REST, [[...V[0], Var], V[1], V[2]]>
      : V;

type StrVars<T extends string> = InferenceVars<T>[0];
type NumVars<T extends string> = InferenceVars<T>[1];
type BoolVars<T extends string> = InferenceVars<T>[2];

type Shape<T extends string> = ExpandDictionary<
  Record<StrVars<T>[number], string> &
  Record<NumVars<T>[number], number> &
  Record<BoolVars<T>[number], boolean>
>;

type Lit = "string" | "number" | "boolean";

type LiteralSections<
  T extends string,
  V extends Lit[] = [],
> = T extends `${string}{{${OptSpace}${infer Section extends Lit}${OptSpace}}}${infer REST}`
  ? LiteralSections<REST, [...V, Section]>
  : V;

/**
 * Boolean operator which indicates whether the string literal has any dynamic segments or not
 */
type IsDynamic<T extends string> = LiteralSections<T>["length"] extends 0
  ? InferenceVars<T>["length"] extends 0
    ? false
    : true
  : true;

export type GetInference<TPattern extends string> = <T extends string>(test: T) => Shape<TPattern> | false;

type Returns<T extends string> = IsDynamic<T> extends true
  ? GetInference<T>
  : never;

/**
 * Parse a given inference pattern like:
 *
 * `foo{{infer Foo}} and bar{{infer Bar as number}}`
 *
 * Return an array of alternating static segments and inferred segments:
 * E.g.:
 * [
 *   { static: "foo", dynamic: false },
 *   { varName: "Foo", type: "string", dynamic: true },
 *   { static: " and bar", dynamic: false },
 *   { varName: "Bar", type: "number", dynamic: true },
 *   { static: "", dynamic: false }
 * ]
 */
function parseTemplate(template: string): Array<
  { dynamic: false; text: string } |
  { dynamic: true; varName: string; type: Ext }
> {
  const pattern = /\{\{\s*infer\s+([A-Za-z_]\w*)\s*(?:as\s+(string|number|boolean)\s*)?\}\}/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const segments: Array<{ dynamic: false; text: string } | { dynamic: true; varName: string; type: Ext }> = [];

  do {
    match = pattern.exec(template);
    if (match) {
      const [fullMatch, varName, asType] = match;
      const staticPart = template.slice(lastIndex, match.index);
      if (staticPart) {
        segments.push({ dynamic: false, text: staticPart });
      }
      segments.push({
        dynamic: true,
        varName,
        type: asType ? (asType as Ext) : "string",
      });
      lastIndex = match.index + fullMatch.length;
    }
  } while (match);

  // Remainder after last inference
  const remainder = template.slice(lastIndex);
  if (remainder) {
    segments.push({ dynamic: false, text: remainder });
  }

  return segments;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Convert segments to a regex pattern with named captures.
 */
function buildRegexPattern(segments: ReturnType<typeof parseTemplate>) {
  let regexStr = "^";
  for (const seg of segments) {
    if (!seg.dynamic) {
      // Static text
      regexStr += escapeRegex(seg.text);
    }
    else {
      // Dynamic segment
      switch (seg.type) {
        case "string":
          // Non-greedy capture
          regexStr += `(?<${seg.varName}>.*?)`;
          break;
        case "number":
          regexStr += `(?<${seg.varName}>\\d+)`;
          break;
        case "boolean":
          regexStr += `(?<${seg.varName}>(?:true|false))`;
          break;
      }
    }
  }
  regexStr += "$";
  return new RegExp(regexStr, "s"); // 's' so '.' can match newlines if needed
}

function convertValue(type: Ext, value: string): string | number | boolean {
  switch (type) {
    case "string":
      return value;
    case "number":
      return Number(value);
    case "boolean":
      return value === "true";
  }
}

/**
 * Perform the matching operation given the template and the test string.
 */
function matchTemplate<TTempl extends string>(inference: TTempl, test: string): Shape<TTempl> | false {
  const segments = parseTemplate(inference);
  const regex = buildRegexPattern(segments);
  const match = test.match(regex);
  if (!match)
    return false;

  const result: any = {};
  for (const seg of segments) {
    if (seg.dynamic) {
      const rawVal = match.groups?.[seg.varName];
      if (rawVal === undefined)
        return false; // Shouldn't happen if regex matched
      result[seg.varName.toLowerCase()] = convertValue(seg.type, rawVal);
    }
  }
  return result as Shape<TTempl>;
}

export function infer<TTempl extends string>(inference: TTempl): Returns<TTempl> {
  return ((test: string) => {
    return matchTemplate(inference, test);
  }) as Returns<TTempl>;
}
