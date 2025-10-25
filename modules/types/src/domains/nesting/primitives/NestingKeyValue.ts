import type { NestedException, Char } from "inferred-types/types";
import { Nesting } from "./Nesting";


export type NestingKeyValueConfig = {
    /** the exit token */
    exit: Char,

    /**
     * optionally specify a new nesting configuration for child nodes
     */
    children?: Nesting;

    /**
     * optionally add exceptions to _entry_ or _exit_ tokens.
     */
    exception?: NestedException;
}

/**
 * **NestingKeyValue**
 *
 * Used to define _entry_ tokens which have a **discrete** set of _exit_ tokens associated
 * to each entry token.
 *
 * - the _keys_ of this type represent the _entry tokens_ that this rule will define
 * - the _values_ of this type define the _exit token(s)_ associated to their _key_. The
 *   _values_ can be expressed in one of two ways:
 *
 *     1. **Simple:**
 *         ```ts
 *          type Example = {
 *              '(': ')'
 *          }
 *         ```
 *        - the _simple_ format is compact and very readable but does not offer advanced features
 *
 *     2. **Detailed:**
 *
 *         ```ts
 *         type Example = {
 *              '(': {
 *                  exit: ')';
 *                  children: DifferentRule;
 *                  exception: {
 *                      entry: {
 *                          ignorePrecededBy: "="
 *                      }
 *                  }
 *              }
 *         }
 *        ```
 *
 *        - the _detailed_ format opens up the ability to configure a different rule for _children_
 *          as well as define _exceptions_ for this level and below.
 *
 * **Related:** `NestingTuple`, `Nesting`
 */
export type NestingKeyValue = Partial<Record<
    Char,
    Char | NestingKeyValueConfig
>>;
