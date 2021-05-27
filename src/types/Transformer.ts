/**
 * **Transformer**
 *
 * A function responsible for transforming the values of
 * dictionary `I` into dictionary `O` where all _keys_ remain
 * the same.
 */
export type Transformer<
  I extends object,
  O extends { [U in keyof I]: any },
  K extends keyof I & keyof O = keyof I & keyof O
> = (input: I[K], key: K) => O[K];
