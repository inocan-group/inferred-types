/**
 * **EmptyObject**
 * 
 * An object/dictionary with explicitly **no** defined properties.
 */
export type EmptyObject = Record<string | symbol, never>;
