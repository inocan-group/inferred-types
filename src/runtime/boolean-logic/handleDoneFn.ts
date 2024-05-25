import { isDoneFn, isFunction, isObject } from "src/runtime/index";

/**
 * **handleDoneFn**(val, [bare_fn])
 * 
 * Looks at the value passed in and if it's an object with 
 * a property `done` which is a function it will call it; 
 * otherwise it will proxy the value through.
 * 
 * If you wish to also detect a bare function and have it
 * call that too, you can set the `call_bare_fn` to **true**.
 */
export const handleDoneFn = <
  TVal,
  TBareFn extends boolean
>(
  val: TVal,
  call_bare_fn: TBareFn = false as TBareFn
) => {
  return isObject(val) || isFunction(val)
    ? isDoneFn(val)
      ? val.done()
      : isFunction(val)
        ? call_bare_fn ? val() : val
        : val
    : isFunction(val)
      ? call_bare_fn ? val() : val
      : val;
}
