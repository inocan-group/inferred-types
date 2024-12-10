// import { FnFrom } from "inferred-types/types";
// import { identity } from "../literals";

// export const wrapFn = <
//   TInteriorFn extends TypedFunction,
// >(fn: TInteriorFn) => {
//   return <
//     TWrap extends <I extends ReturnType<TInteriorFn>>(input: I) => unknown
//   >(wrap: TWrap) => <F extends Parameters<TInteriorFn>>(...input: F) => {
//     const interior = fn(input) as ReturnType<TInteriorFn>;
//     return wrap(interior) as ReturnType<TWrap>
//   }
// };

// export const wrapFn = <
//   TWrap extends FnFrom<[any]>,
// >(wrap: TWrap) => {
//   return <TInterior extends (...args: any[]) => Parameters<TWrap>[0]>(fn: TInterior) => {
//     return <TFn extends Parameters<TInterior>>(...args: TFn) => {
//       const interior = identity(fn(...args) as ReturnType<TInterior>) as ()=>ReturnType<TInterior>;
//       const wrapped = wrap(interior()) as ReturnType<TWrap>;

//       return wrapped;
//     }
//   }
// };

export const wrapFn = "NOT IMPLEMENTED" as const;
