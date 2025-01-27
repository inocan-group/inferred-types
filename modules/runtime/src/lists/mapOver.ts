import type {
  AnyObject,
  Narrowable,
  NarrowObject,
  ObjectKey,
  ToKv,
} from "inferred-types/types";
import { Never } from "inferred-types/constants";
import {
  createFnWithProps,
  isArray,
  isObject,
  isTrue,
  toKeyValue,
} from "inferred-types/runtime";

export type MapOverObject<
  TObj extends AnyObject,
> = {
  kind: "MapOverObject";
} & (
    <
      TCb extends <K extends ToKv<TObj>[number]>(cb: K) => unknown,
    >(cb: TCb) => {
      [K in keyof TObj]: ReturnType<TCb>
    }
  );

export type MapOverObjectToArray<
  TContainer extends AnyObject,
> = {
  kind: "MapOverObjectToArray";
} & (
    <K extends keyof TContainer & PropertyKey>(k: K, v: TContainer[K]) => unknown
  );

export type MapOverArray<
  TContainer extends readonly unknown[],
> = {
  kind: "MapOverArray";
} & (
    <K extends keyof TContainer & PropertyKey>(k: K, v: TContainer[K]) => unknown
  );

type MapOver<
  TContainer extends AnyObject | readonly unknown[],
  TArr extends boolean = false,
> = TContainer extends readonly unknown[]
  ? MapOverArray<TContainer>
  : TContainer extends AnyObject
    ? [TArr] extends [true]
        ? MapOverObjectToArray<TContainer>
        : MapOverObject<TContainer>
    : never;

export function mapOver<
  TContainer extends NarrowObject<N> | AnyObject,
  N extends Narrowable,
  TArr extends boolean,
>(
  input: TContainer,
  toArray: TArr = false as TArr,
): MapOver<TContainer, TArr> {
  const kind = {
    kind: Array.isArray(input)
      ? "MapOverArray"
      : isObject(input) && isTrue(toArray)
        ? "MapOverObjectToArray"
        : isObject(input)
          ? "MapOverObject"
          : Never,
  };

  const fn = <
    TCb extends <KV extends ToKv<TContainer>[number]>(kv: KV) => Narrowable,
  >(
    cb: TCb,
  ) => {
    let output = (
      isTrue(toArray)
        ? [] as any[]
        : isArray(input) ? [] as any[] : {} as Record<ObjectKey, any>
    ) as [TArr] extends [true]
      ? any[]
      : TContainer extends readonly unknown[]
        ? any[]
        : TContainer extends AnyObject
          ? Record<any, any>
          : never;

    const kvs = isObject(input)
      ? toKeyValue(input)
      : input;

    for (const kv of kvs) {
      if (isObject(output) && isObject(input)) {
        // maintain object as object
        output = {
          ...output,
          [kv.key]: cb(kv),
        };
      }
      else if (isArray(output)) {
        output.push(cb(kv));
      }
    }

    return output;
  };
  return createFnWithProps(fn, kind) as unknown as MapOver<TContainer, TArr>;
}
