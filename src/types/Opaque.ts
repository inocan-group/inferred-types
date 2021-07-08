
/**
 * **Opaque**
 * 
 * Create an opaque type, which hides its internal details from the public, and 
 * can only be created by being used explicitly.
 * 
 * Note: taken from [type-fest](https://github.com/sindresorhus/type-fest/blob/main/source/opaque.d.ts)
 * repo.
 */
export type Opaque<Type, Token = unknown> = Type & { readonly __opaque__: Token };