import { keys } from "./keys";

export function createFnWithProps<F extends Function, P extends {}>(fn: F, props: P) {
  return (() => {
    // eslint-disable-next-line prefer-const
    let combined: any = fn;
    for (const prop of keys(props)) {
      combined[prop] = props[prop];
    }
    return combined;
  })() as unknown as F & P;
}
