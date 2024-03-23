

type GenNode<
  K extends string | number,
  IsRoot extends boolean
> = IsRoot extends true? `${K}`: `.${K}` | (K extends number? `[${K}]` | `.[${K}]`:never)

/**
 * **DotPathFor**`<T>`
 * 
 * Provides a union of all valid _dot paths_ for the container
 * `T`. 
 * 
 * - If `T` is _not_ a container then it will resolve to
 * `""` because `T` can not be dereferenced.
 * - If `T` is a _wide_ container than it will resolve to `string` as
 * nothing can be determined at design time
 */
export type DotPathFor<
  T extends object,
  IsRoot extends boolean = true,
  K extends keyof T = keyof T
> = K extends string | number 
? GenNode<K,IsRoot> | (T[K] extends object 
  ? `${GenNode<K,IsRoot>}${DotPathFor<T[K],false>}`
  :never)
:never;
