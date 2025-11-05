import type {
    As,
    AsArray,
    AsDropResult,
    DropParser,
    DropParserFn,
    DropParserKv,
    DropResult,
    DropRule,
    DropRulePolicy,
    FinalizedDropRule,
    Mutable,
} from "inferred-types/types";
import { asArray, createFnWithProps, isDictionary } from "inferred-types/runtime";

type Finalize<T extends DropRule> = As<
    {
        enter: AsArray<T["enter"]>;
        exit: AsArray<T["exit"]>;
        policy: T["policy"] extends DropRulePolicy ? T["policy"] : "inclusive";
    },
    FinalizedDropRule
>;

/**
 * finalizes an array of rules
 */
type FinalizeRules<
    T extends readonly DropRule[]
> = As<{
    [K in keyof T]: Mutable<Finalize<T[K]>>
}, readonly FinalizedDropRule[]>;

/**
 * ensures runtime has a "finalized" version of the rules
 */
function finalize<T extends readonly DropRule[]>(
    rules: T
): FinalizeRules<[...T]> {
    return rules.map((r) => {
        return {
            enter: asArray(r.enter),
            exit: asArray(r.exit),
            policy: r.policy || "inclusive"
        } satisfies FinalizedDropRule;
    }) as FinalizeRules<[...T]>;
}

/**
 * **isDropResult**`(val)`
 *
 * Type guard which validates whether `val` is a `DropResult` type
 * (aka, the successful result of a completed call to
 * `dropParser(...rules)(content)`)
 */
export function isDropResult(val: unknown): val is DropResult {
    return isDictionary(val);
}

/**
 * **dropParser**`(...rules) -> (content) -> DropResult`
 *
 * The drop parser is meant to allow for a set of user defined
 * rules to be configured which will be used to switch the
 * state between "keep" (default) and "drop".
 *
 * 1. first call defines the rules to be used and returns a
 *   reusable function to use these rules to parse strings.
 *     - a rule consists of an `enter` and `exit` configuration
 *     - the `enter` condition is a string -- _or set of strings_
 *       -- which the parser will look for at the head of the parse
 *       string
 *         - when found the "state" of the parser will be moved from
 *         "keep" to "drop"
 *     - the `exit` condition provides an inverse function:
 *         - any string -- _or set of strings_ -- defined will be
 *           used to move the parser's state back to "keep"
 * 2. second call is to pass in the content to be parsed
 *     - the result should be a valid `DropResult` key/value
 *       dictionary
 *     - the `DropResult` is a dictionary of properties which
 *       include the `kept` property (typically what a caller is
 *       most concerned about)
 *     - the dictionary's `toString()` method also provides a
 *       type safe way of getting the `kept` property too.
 *
 */
export function dropParser<const T extends readonly DropRule[]>(...rules: T): DropParser<
    FinalizeRules<[...T]>
> {
    const kv = {
        kind: "drop-parser",
        rules: finalize(rules),
        kept: "",
        dropped: []
    } satisfies DropParserKv<FinalizeRules<[...T]>>;

    const fn: DropParserFn<FinalizeRules<[...T]>> = <const U extends string>(content: U) => {
        const finalRules = kv.rules;
        let kept = "";
        const dropped: string[] = [];
        let state: "keep" | FinalizedDropRule = "keep";
        let pos = 0;

        while (pos < content.length) {
            let matched = false;

            // Try to match a token at current position
            if (state === "keep") {
                // Look for enter tokens in all rules
                for (const rule of finalRules) {
                    const longestMatch = findLongestStartsWith(content.slice(pos), rule.enter);
                    if (longestMatch) {
                        // Apply policy for enter token
                        applyPolicy(rule.policy, rule, longestMatch, "entering");
                        state = rule;
                        pos += longestMatch.length;
                        matched = true;
                        break;
                    }
                }
            }
            else {
                // We're in drop state, look for exit tokens
                const longestMatch = findLongestStartsWith(content.slice(pos), state.exit);
                if (longestMatch) {
                    // Apply policy for exit token
                    applyPolicy(state.policy, state, longestMatch, "exiting");
                    state = "keep";
                    pos += longestMatch.length;
                    matched = true;
                }
            }

            // If no match, take one character
            if (!matched) {
                const char = content[pos];
                if (state === "keep") {
                    kept += char;
                }
                else {
                    // Append to last dropped segment
                    if (dropped.length === 0) {
                        dropped.push(char);
                    }
                    else {
                        dropped[dropped.length - 1] += char;
                    }
                }
                pos++;
            }
        }

        // Remove trailing empty strings from dropped
        while (dropped.length > 0 && dropped[dropped.length - 1] === "") {
            dropped.pop();
        }

        // Helper: find longest match from array of possible strings
        function findLongestStartsWith(str: string, possibilities: string[]): string | null {
            let longest: string | null = null;
            for (const poss of possibilities) {
                if (str.startsWith(poss)) {
                    if (!longest || poss.length > longest.length) {
                        longest = poss;
                    }
                }
            }
            return longest;
        }

        // Helper: apply policy when matching a token
        function applyPolicy(
            policy: DropRulePolicy,
            rule: FinalizedDropRule,
            token: string,
            direction: "entering" | "exiting"
        ) {
            const isExiting = direction === "exiting";

            // Handle kept property based on policy
            if (policy === "inclusive" || policy === "drop-enter" || policy === "drop-exit") {
                // All three policies add tokens to kept
                kept += token;
            }
            else if (policy === "exclusive") {
                // Exclusive: neither enter nor exit tokens added to kept
            }

            // Handle dropped property based on policy
            if (policy === "inclusive" || policy === "drop-enter" || policy === "drop-exit") {
                // For these policies: tokens not added to dropped, just start new segment when exiting
                if (isExiting) {
                    dropped.push("");
                }
            }
            else if (policy === "exclusive") {
                // Exclusive: both enter and exit tokens added to dropped
                if (isExiting) {
                    // Append exit token to last segment, then start new segment
                    if (dropped.length === 0) {
                        dropped.push(token);
                    }
                    else {
                        dropped[dropped.length - 1] += token;
                    }
                    dropped.push("");
                }
                else {
                    // Add enter token as new segment
                    dropped.push(token);
                }
            }
        }

        return {
            kind: "drop-result",
            kept,
            dropped,
            toString() {
                return kept;
            }
        } as AsDropResult<U, FinalizeRules<[...T]>>;
    };

    return createFnWithProps(fn, kv) as unknown as DropParser<FinalizeRules<[...T]>>;
}
