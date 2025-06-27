/**
 * Parser error types
 */
export interface ParseError {
    type: "parse-error";
    subType: string;
    message: string;
    position?: number;
    token?: string;
    context?: Record<string, unknown>;
}

/**
 * Create a parse error
 */
export function createParseError(
    subType: string,
    message: string,
    options: {
        position?: number;
        token?: string;
        context?: Record<string, unknown>;
    } = {}
): ParseError {
    return {
        type: "parse-error",
        subType,
        message,
        ...options,
    };
}

/**
 * Common parse error types
 */
export const PARSE_ERRORS = {
    INVALID_TOKEN: "invalid-token",
    UNEXPECTED_END: "unexpected-end",
    UNMATCHED_DELIMITER: "unmatched-delimiter",
    INVALID_SYNTAX: "invalid-syntax",
    UNSUPPORTED_FEATURE: "unsupported-feature",
} as const;
