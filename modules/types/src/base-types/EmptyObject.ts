
/**
 * **EmptyObject**
 *
 * An object/dictionary with explicitly **no** defined properties.
 */
export type EmptyObject = NonNullable<unknown>;

/**
 * **ExplicitlyEmptyObject**
 *
 * An `EmptyObject` with it's index keys set to _never_ (which prohibits any
 * key from being added)
 */
export type ExplicitlyEmptyObject = NonNullable<{ [x: string]: never; [x: symbol]: never }>;

