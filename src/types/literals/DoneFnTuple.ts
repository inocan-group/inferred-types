import { IsTrue, If, Fn, FnDefn, TupleToUnion, Narrow} from "src/types/index";


/**
 * **DoneFnTuple**`<[TTuple],[TMakeUnion],[TFns]>`
 * 
 * This type utility quickly builds the types you'll need for an
 * API surface with the `done()` command returning the stored state
 * as either a **Tuple** or a **Union** of the tuple state.
 * 
 * **Related:** `HasDoneFn`, `Narrow`, `DoneFnKv`, `createDoneTupleFn`
 */
export type DoneFnTuple<
TFns extends {[key: string]: FnDefn} = {
  add: [
    <TAdd extends Narrow>(a: TAdd) => boolean,
    "add a value to the tuple/union"
  ];
},
TMakeUnion extends boolean = false,
TState extends readonly Narrow[] = Narrow[],
> = {
  [K in keyof TFns]: Fn<TFns[K]>
} & { 
  state: TState;
  type_as_union: TMakeUnion;
  done: Fn<[
    () => If<IsTrue<TMakeUnion>, TupleToUnion<TState>, TState>,
    "exits the API surface with the state which has been accumulated so far"
  ]>;
}
