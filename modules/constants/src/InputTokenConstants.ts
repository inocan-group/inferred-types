

export const IT_ATOMIC_TOKENS = [
"string",
"number",
"boolean",
"true",
"false",
"undefined",
"unknown",
"any",
"null",
"object",
"Object",
"function",
] as const;

/**
 * All literal token declarations from a base type
 */
export const IT_LITERAL_TOKENS = [
    `String({{string}})`,
    `Number({{number}})`,
    `Boolean({{boolean}})`
] as const;


export const IT_CONTAINER_TOKENS = [
    `Map<{{string}},{{string}}>`,
    `WeakMap<{{string}},{{string}}>`,
    `Set<{{string}}>`,
    `Record<{{string}},{{string}}`,
    `Array<{{string}}>`,
    // tuple
    `[{{string}}]`,
    // object / dict
    `{{{string}}}`
] as const;
