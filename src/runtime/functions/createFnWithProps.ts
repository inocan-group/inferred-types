import type { AnyFunction } from "src/types/functions/function-types";
import type { Narrowable } from "src/types/literals";
import { keys } from "src/runtime/dictionary/keys";

/**
 * **createFnWithProps**(fn, params)
 * 
 * Creates a function with a dictionary of key/value pairs.
 */
export function createFnWithProps<
  TFn extends AnyFunction,
  TParams extends Narrowable
>(
  fn: TFn, 
  props: TParams & Record<string, any>
) {
  const combinedProps = Array.from(new Set([...keys(fn), ...keys(props)]));

  if (combinedProps.length === 0) {
    throw new Error(`Can't create FN with Props; no parameters were found in the combined "fn" and "props"!`);
  }
  const combined: any = fn;

  for (const i of keys(props)) {
    combined[i] = props[i as any];
  }
  for (const i of keys(fn)) {
    combined[i] = fn[i];
  }

  return combined as unknown as TFn & TParams;
}

