/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  Container, 
  IfContains, 
  Keys, 
  Narrowable
} from "../../types/base";
import { hasIndexOf } from "src/runtime";

export const ifHasKey = <
  TContainer extends Container,
  TKey extends PropertyKey,
  IF extends Narrowable,
  ELSE extends Narrowable
>(
  container: TContainer, 
  key: TKey,
  hasKey: <V extends TContainer & Record<TKey, unknown>>(val: V) => IF,
  doesNotHaveKey: <N extends Exclude<TContainer, TKey>>(nonArr: N) => ELSE
) => (
  hasIndexOf(container, key) 
  ? hasKey(container as TContainer & Record<TKey, unknown>)
  : doesNotHaveKey(container as Exclude<TContainer, TKey>)
) as IfContains<Keys<TContainer>, TKey, IF, ELSE>;

