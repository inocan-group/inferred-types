
import { IT_TakeParameters } from 'types/runtime-types/type-defn/input-tokens/IT_TakeParameters';

type Test1 = IT_TakeParameters<'(name: string) => "hi"'>;
//   ^?

export type Debug = Test1;
