export const SHAPE_PREFIXES = [
  "string", 
  "number",
  "boolean",
  "true",
  "false",
  "null",
  "undefined", 
  "unknown",
  "opt::", 
  "union::", 
  "tuple::", 
  "object", 
  "record::"
] as const;

export const SHAPE_DELIMITER = "||,||" as const;
