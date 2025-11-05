import { narrow } from "./utils/narrow";

/**
 * The hexadecimal escape sequence used in Typescript
 *
 * - represents decimal `27`
 * - can also be represented as the `u001B` unicode character
 */
export const ESCAPE_CODE = `\x1B` as const;

/**
 * The **BEL** code can often be substituted as a terminal character.
 *
 * - often an alternative to `${TERMINATOR}`
 */
export const BEL = `\x07` as const;

export const ESCAPE_CODE_CHARS = narrow(
    ESCAPE_CODE,
    BEL
);
