import { AnyObject, Concat, Container, Filter, IfEqual, IfNever, Increment, Keys, Tuple } from "src/types/index";

type HowMany<T extends AnyObject> = Filter<Keys<T>, `ERR_${string}`, "extends"> extends Tuple
? Filter<Keys<T>, `ERR_${string}`, "extends">["length"] extends number
  ? Increment<
      Filter<Keys<T>, `ERR_${string}`, "extends">["length"]
    >
  : never
:never;


type NextError<T extends AnyObject> = HowMany<T> extends number
? IfNever<Concat<["ERR_", HowMany<T>]>, "ERR", Concat<["ERR_", HowMany<T>]>>
: never;

/**
 * **AsPropertyKey**`<T,[C]>`
 * 
 * Proxies `T` through as a `PropertyKey` when it is one, when it is not
 * it converts it into one anyway but with a key name that is immediately
 * identifiable.
 * 
 * #### Error Keying
 * If `T` is not a `PropertyKey` then:
 * - it will use the key `ERR` if no actual container is passed into `C`
 * - if `C` is available then keying will be done based on the container type:
 *    - **Object** - if the container is an object then it will use `ERR_1`
 * or increment the counter as many times as it need not to override an existing key
 *    - **Array** - the index will be converted to -1; subsequent calls will continue to use this index.
 */
export type AsPropertyKey<T, C extends Container = Container> = T extends PropertyKey
? T
: IfEqual<
    C, Container,
    "ERR",
    C extends AnyObject
    ? NextError<C>
    : -1
  >;


