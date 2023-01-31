
/**
 * **KvDict**`<K,V>`
 * 
 * A key-value pairing of the type `{ key: K; value: V }` 
 */
export type KvDict<
  K extends string,
  V
> = {key: K; value: V};

