/**
 * String parsing utilities for token processing
 */

/**
 * Trim whitespace from both ends of a string
 */
export function trimToken(token: string): string {
    return token.trim();
}

/**
 * Check if string starts with given prefix
 */
export function tokenStartsWith(str: string, prefix: string): boolean {
    return str.startsWith(prefix);
}

/**
 * Check if string ends with given suffix
 */
export function tokenEndsWith(str: string, suffix: string): boolean {
    return str.endsWith(suffix);
}

/**
 * Find the position of matching delimiter at the same nesting level
 */
export function findMatchingDelimiter(
    token: string,
    startDelim: string,
    endDelim: string,
    startPos: number = 0
): number {
    let level = 0;
    let pos = startPos;

    while (pos < token.length) {
        if (token.slice(pos, pos + startDelim.length) === startDelim) {
            level++;
            pos += startDelim.length;
        }
        else if (token.slice(pos, pos + endDelim.length) === endDelim) {
            level--;
            if (level === 0) {
                return pos;
            }
            pos += endDelim.length;
        }
        else {
            pos++;
        }
    }

    return -1; // No matching delimiter found
}

/**
 * Extract content between delimiters with proper nesting support
 */
export function extractBetweenDelimiters(
    token: string,
    startDelim: string,
    endDelim: string
): { content: string; remaining: string } | null {
    if (!tokenStartsWith(token, startDelim)) {
        return null;
    }

    // Special handling for nested structures like Array<Array<string>>
    if (startDelim.includes("<") && endDelim === ">") {
        return extractNestedAngleBrackets(token, startDelim);
    }

    // Use proper nesting support for all cases
    let level = 1; // We've already matched the first startDelim
    let pos = startDelim.length;

    while (pos < token.length && level > 0) {
        if (token.slice(pos, pos + startDelim.length) === startDelim) {
            level++;
            pos += startDelim.length;
        }
        else if (token.slice(pos, pos + endDelim.length) === endDelim) {
            level--;
            if (level === 0) {
                const content = token.slice(startDelim.length, pos);
                const remaining = token.slice(pos + endDelim.length);
                return { content, remaining };
            }
            pos += endDelim.length;
        }
        else {
            pos++;
        }
    }

    return null; // No matching delimiter found
}

/**
 * Handle nested angle brackets like Array<Array<string>>
 */
function extractNestedAngleBrackets(
    token: string,
    startDelim: string
): { content: string; remaining: string } | null {
    let level = 0;
    let pos = 0;

    // Skip the start delimiter
    if (token.startsWith(startDelim)) {
        pos = startDelim.length;
        level = 1;
    }
    else {
        return null;
    }

    while (pos < token.length && level > 0) {
        const char = token[pos];

        if (char === "<") {
            level++;
        }
        else if (char === ">") {
            level--;
        }

        pos++;
    }

    if (level !== 0) {
        return null; // Unmatched brackets
    }

    const content = token.slice(startDelim.length, pos - 1);
    const remaining = token.slice(pos);

    return { content, remaining };
}

/**
 * Split string by delimiter, respecting nesting levels
 */
export function splitRespectingNesting(
    token: string,
    delimiter: string,
    openDelims: string[] = ["(", "[", "{", "<"],
    closeDelims: string[] = [")", "]", "}", ">"]
): string[] {
    const result: string[] = [];
    let current = "";
    let level = 0;
    let pos = 0;

    while (pos < token.length) {
        const char = token[pos];

        if (openDelims.includes(char)) {
            level++;
            current += char;
        }
        else if (closeDelims.includes(char)) {
            level--;
            current += char;
        }
        else if (token.slice(pos, pos + delimiter.length) === delimiter && level === 0) {
            result.push(current.trim());
            current = "";
            pos += delimiter.length - 1; // -1 because we'll increment at end of loop
        }
        else {
            current += char;
        }

        pos++;
    }

    if (current.trim()) {
        result.push(current.trim());
    }

    return result;
}
