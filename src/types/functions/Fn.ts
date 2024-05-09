import { AnyFunction, ObjectKey } from "../base-types";

export type FnDefn = [fn: AnyFunction ] 
| [fn: AnyFunction, desc: string] 
| [fn: AnyFunction, props: Record<ObjectKey, unknown> ];

/**
 * **Fn**`<TArgs,TReturn>`
 */
export type Fn<
  TFn extends FnDefn = FnDefn
> = TFn extends [ fn: AnyFunction ]
? TFn[0]
: TFn extends [ fn: AnyFunction, desc: string]
  ? TFn[0] & { desc: TFn[1] }
  : TFn extends [ fn: AnyFunction, props: Record<ObjectKey, unknown> ]
    ? TFn[0] & TFn[1]
    : never;

