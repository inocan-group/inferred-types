/**
 * **EmptyObject**
 * 
 * An object/dictionary with explicitly **no** defined properties.
 */
export type EmptyObject = NonNullable<unknown>;

export type ExplicitlyEmptyObject = NonNullable<{[x:string]: never; [x:symbol]: never}>;
