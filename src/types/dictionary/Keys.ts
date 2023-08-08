import { 
  IfNever,
  ExplicitKeys,
  Container,
  ValidKey,
} from "src/types";

/**
 * **Keys**`<TContainer>`
 * 
 * Provides the _explicit keys_ of a container `TContainer` as an array of values.
 *
 * ```ts
 * type Obj = { foo: 1, bar: 2, [key: string]: unknown };
 * type Arr = [1,2,3];
 * // readonly ["foo", "bar"]
 * type K1 = Keys<Obj>;
 * // readonly [0,1,2]
 * type K2 = Keys<Arr>;
 * ```
 * 
 * **Related:** `ValidKey`
 */
export type Keys<
  TContainer extends Container
  > = IfNever<
  TContainer, 
  readonly [],
  IfNever<
    ValidKey<TContainer>,
    readonly [],
    ExplicitKeys<TContainer>
  >
>;
