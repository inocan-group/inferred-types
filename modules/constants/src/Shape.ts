export const SHAPE_PREFIXES = [
    "string",
    "number",
    "boolean",
    "null",
    "undefined",
    "unknown",
    "opt::",
    "union::",
    "tuple::",
    "array::",
    "object",
    "record::",
] as const;

export const SHAPE_DELIMITER = "||,||" as const;
