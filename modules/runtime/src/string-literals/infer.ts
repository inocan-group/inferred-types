/* eslint no-cond-assign: "off" */
import type {
    ExpandDictionary,
    Join,
    OptSpace,
} from "inferred-types/types";

type Ext = "string" | "number" | "boolean";
type START = "{{";
type END = "}}";
type InferredString = `infer ${string} extends string` | `infer ${string}`;
type InferredNumber = `infer ${string} extends number`;
type InferredBoolean = `infer ${string} extends boolean`;

type InferenceVars<
    T extends string,
    Vars extends [strings: string[], nums: string[], bools: string[]] = [[], [], []],
>
// Peel off a block
    = T extends `${infer _HEAD}${START}${infer Content}${END}${infer REST}`
        ? (
            Content extends `${OptSpace}infer ${infer Var} extends ${infer Type extends Ext}${OptSpace}`
            // 2a) `{{ infer Foo extends string|number|boolean }}`
                ? Type extends "string"
                    ? InferenceVars<REST, [[...Vars[0], Var], Vars[1], Vars[2]]>
                    : Type extends "number"
                        ? InferenceVars<REST, [Vars[0], [...Vars[1], Var], Vars[2]]>
                        : InferenceVars<REST, [Vars[0], Vars[1], [...Vars[2], Var]]>

            // 2b) `{{ infer Foo }}` with no “extends”
                : Content extends `${OptSpace}infer ${infer Var2}${OptSpace}`
                    ? InferenceVars<REST, [[...Vars[0], Var2], Vars[1], Vars[2]]>

                // 2c) If it’s some other weird content inside `{{ ... }}`, just keep going
                    : InferenceVars<REST, Vars>
        )
    // Done
        : Vars;

type TypeLiteral<
    T extends string,
    Sections extends readonly string[] = [],
> = T extends `${infer HEAD}${START}${infer Content}${END}${infer REST}`
// peel off a block
    ? Content extends InferredNumber
        ? TypeLiteral<REST, [ ...Sections, `${HEAD}${number}`]>
        : Content extends InferredBoolean
            ? TypeLiteral<REST, [ ...Sections, `${HEAD}${boolean}`]>
            : Content extends InferredString
                ? TypeLiteral<REST, [ ...Sections, `${HEAD}${string}`]>

                : Content extends "string"
                    ? TypeLiteral<REST, [ ...Sections, `${HEAD}${string}`]>
                    : Content extends "number"
                        ? TypeLiteral<REST, [ ...Sections, `${HEAD}${number}`]>
                        : Content extends "boolean"
                            ? TypeLiteral<REST, [ ...Sections, `${HEAD}${boolean}`]>
                            : TypeLiteral<REST, [ ...Sections, Content]>

// DONE
    : Join<Sections>;

/**
 * The pattern matching that Typescript employs works less well when
 * we include `${number}` or `${boolean}` string literals in our pattern.
 *
 * For this reason this utility looks for all "blocks" but only looks at them
 * as `${string}` blocks. This allows for a the runtime system to match on
 * a more capable pattern match while maintaining consistency in the "type":
 *
 * - when `TypeLiteral` matches the pattern then we _know_ we can match
 * - when `WideTypeLiteral` matches the pattern then we defer to runtime
 */
type WiderTypeLiteral<
    T extends string,
    Sections extends readonly string[] = [],
> = T extends `${infer HEAD}${START}${infer Content}${END}${infer REST}`
// peel off a block
    ? Content extends InferredNumber
        ? WiderTypeLiteral<REST, [ ...Sections, `${HEAD}${string}`]>
        : Content extends InferredBoolean
            ? WiderTypeLiteral<REST, [ ...Sections, `${HEAD}${string}`]>
            : Content extends InferredString
                ? WiderTypeLiteral<REST, [ ...Sections, `${HEAD}${string}`]>

                : Content extends "string"
                    ? WiderTypeLiteral<REST, [ ...Sections, `${HEAD}${string}`]>
                    : Content extends "number"
                        ? WiderTypeLiteral<REST, [ ...Sections, `${HEAD}${string}`]>
                        : Content extends "boolean"
                            ? WiderTypeLiteral<REST, [ ...Sections, `${HEAD}${string}`]>
                            : WiderTypeLiteral<REST, [ ...Sections, Content]>

// DONE
    : Join<Sections>;

type StrVars<T extends string> = InferenceVars<T>[0];
type NumVars<T extends string> = InferenceVars<T>[1];
type BoolVars<T extends string> = InferenceVars<T>[2];

type Shape<T extends string> = ExpandDictionary<
    Record<StrVars<T>[number], string>
    & Record<NumVars<T>[number], number>
    & Record<BoolVars<T>[number], boolean>
>;

type Lit = "string" | "number" | "boolean";

type LiteralSections<
    T extends string,
    V extends Lit[] = [],
> = T extends `${string}{{${OptSpace}${infer Section extends Lit}${OptSpace}}}${infer REST}`
    ? LiteralSections<REST, [...V, Section]>
    : V;

/**
 * Boolean operator which indicates whether the string literal has any dynamic
 * segments or not
 */
type IsDynamic<T extends string> = LiteralSections<T>["length"] extends 0
    ? InferenceVars<T>["length"] extends 0
        ? false
        : true
    : true;

export interface GetInferenceProps<TPattern extends string> {
    vars: {
        string: StrVars<TPattern>;
        numeric: NumVars<TPattern>;
        boolean: BoolVars<TPattern>;
    };
    typeLiteral: TypeLiteral<TPattern>;
    typeWide: WiderTypeLiteral<TPattern>;
}

export type GetInference<TPattern extends string> = (
  <T extends string>(test: T) => T extends TypeLiteral<TPattern>
      ? Shape<TPattern>
      : false | Shape<TPattern>
) & GetInferenceProps<TPattern>;

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
function parseTemplate(template: string) {
    // updated pattern:
    const pattern
        = /\{\{\s*infer\s+([A-Za-z_]\w*)\s*(?:(?:extends|as)\s+(string|number|boolean)\s*)?\}\}/g;

    let lastIndex = 0;
    let match: RegExpExecArray | null;
    const segments: Array<
        { dynamic: false; text: string }
        | { dynamic: true; varName: string; type: "string" | "number" | "boolean" }
    > = [];

    while ((match = pattern.exec(template))) {
        const [fullMatch, varName, asType] = match;
        // everything from the previous index to this match is static text
        const staticPart = template.slice(lastIndex, match.index);
        if (staticPart) {
            segments.push({ dynamic: false, text: staticPart });
        }
        segments.push({
            dynamic: true,
            varName,
            type: asType ? (asType as "string" | "number" | "boolean") : "string",
        });
        lastIndex = match.index + fullMatch.length;
    }

    // push the remainder as static text
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
                    regexStr += "(.*?)";
                    break;
                case "number":
                    regexStr += "(\\d+)";
                    break;
                case "boolean":
                    regexStr += "(true|false)";
                    break;
            }
        }
    }
    regexStr += "$";
    // Remove the "s" flag; just use new RegExp(regexStr)
    return new RegExp(regexStr);
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
function matchTemplate<TTempl extends string>(
    template: TTempl,
    test: string,
): Shape<TTempl> | false {
    const segments = parseTemplate(template);
    const regex = buildRegexPattern(segments);

    // Use exec(...) instead of match(...) so we can access capture groups by index
    const match = regex.exec(test);
    if (!match)
        return false;

    let captureIndex = 1; // Start at 1 because [0] is the full match
    const result: Record<string, unknown> = {};

    for (const seg of segments) {
        if (seg.dynamic) {
            const rawVal = match[captureIndex++];
            // If the capture group is somehow missing or undefined, fail
            if (rawVal === undefined)
                return false;
            result[seg.varName] = convertValue(seg.type, rawVal);
        }
    }
    return result as Shape<TTempl>;
}

/**
 * **infer**`(pattern)`
 *
 * Builds a interference function from a Typescript _string literal template_
 * where:
 *
 * - the template string accepts `{{ string }}` instead of `${string}`, etc.
 * for matching blocks of string characters
 * - you can also extract parts of the string with syntax of `{{ infer Foo }}`
 * - you can also look for _numeric_ or _boolean_ string literals:
 *    - `{{ boolean }}`
 *    - `{{ infer Bar as number }}`
 *
 * ```ts
 * const matcher = infer("{{ infer foo }}-bar");
 * // "foo"
 * const {foo} = matcher("foo-bar");
 * ```
 */
export function infer<TTempl extends string>(
    inference: TTempl,
): Returns<TTempl> {
    return ((test: string) => {
        return matchTemplate(inference, test);
    }) as Returns<TTempl>;
}
