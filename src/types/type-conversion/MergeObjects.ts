import { AfterFirst, AnyObject, AsIndexOf, EmptyObject, ExpandRecursively, ExplicitKeys, First, Flatten, Tuple, Unique } from "src/types/index";

type MergedKeys<
  A extends AnyObject, 
  B extends AnyObject
> = Flatten<Unique<[...ExplicitKeys<A>],[...ExplicitKeys<B>]>>;

type IfOverrideHasKeyValue<
  TKey extends PropertyKey,
  TOverride extends AnyObject,
  ELSE
> = AsIndexOf<TOverride,TKey,ELSE>;


type SetValue<
  TKey extends PropertyKey,
  TDefObj extends AnyObject,
  TOverride extends AnyObject,
> = IfOverrideHasKeyValue<TKey, TOverride, AsIndexOf<TDefObj, TKey>>;

type Process<
  TIndex extends Tuple,
  TDefObj extends AnyObject,
  TOverride extends AnyObject,
  TResult extends AnyObject = object
> = [] extends TIndex
? ExpandRecursively<TResult>
: TIndex extends readonly PropertyKey[]
  ? Process<
    AfterFirst<TIndex>,
    TDefObj,
    TOverride,
    TResult & Record<First<TIndex>, SetValue<First<TIndex>, TDefObj, TOverride>>
  >
  : never;


/**
 * **MergeObjects**`<TDefault,TOverride>`
 * 
 * A type utility that _shallowly merges_ two object types.
 */
export type MergeObjects<
  TDefObj extends AnyObject,
  TOverride extends AnyObject,
> = Process<
  MergedKeys<TDefObj, TOverride> extends Tuple
    ? MergedKeys<TDefObj, TOverride>
    : [], 
  TDefObj,TOverride
>;


