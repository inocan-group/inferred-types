import type { Char } from "types/string-literals";

export type ExitExceptionRules = {

    /**
     * will **ignore** the `exit` token when
     * the character or characters which defined are
     * found in the character _following_ the current
     * character being evaluated.
     */
    ignoreFollowedBy: Char | readonly Char[];
    /**
     * will **ignore** the `exit` token when
     * the character or characters which defined are
     * found in the character _preceding_ the current
     * character being evaluated.
     */
    ignorePrecededBy: Char | readonly Char[];

};

export type EntryExceptionRules = {

    /**
     * will **ignore** the `entry` token when
     * the character or characters which defined are
     * found in the character _following_ the current
     * character being evaluated.
     */
    ignoreFollowedBy: Char | readonly Char[];
    /**
     * will **ignore** the `entry` token when
     * the character or characters which defined are
     * found in the character _preceding_ the current
     * character being evaluated.
     */
    ignorePrecededBy: Char | readonly Char[];

};

/**
 * **NestedException**
 *
 * A structure which allows **exceptions** to be defined for
 * nesting configurations.
 *
 * **Related:** `NestingKeyValue`, `NestingTuple`
 */
export type NestedException = {
    /** define exceptions for the `exit` token */
    exit?: ExitExceptionRules;
    /** define exceptions for the `entry` token */
    entry?: EntryExceptionRules;
};
