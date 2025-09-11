
export type TakeState<T = unknown> = {
    kind: "TakeState";
    /** the segments of the parse string that were previously parsed */
    parsed: string[];
    /** the remaining _parse string_ after the **take** function parsed a section of it */
    parseString: string;
    /** the tokens which have been parsed from the string so far */
    tokens: T[];
}
