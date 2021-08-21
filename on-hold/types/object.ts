// import type { TypeOptions, TypeGuard } from "~/types";
// import { type } from "./type";

export type ObjectOption<N extends string | undefined> = {
  name?: N;
};

// export const object = <N extends string | undefined>(props: PropsCallback, opts: TypeOptions<ObjectOption<N>> = {}) => {

//   /**
//    * Object based type-guard
//    */
//   const tg: TypeGuard<null> = (v: unknown): v is null => {
//     return v === "null";
//   };


//   return type<null>()("null", tg, opts);
// };
