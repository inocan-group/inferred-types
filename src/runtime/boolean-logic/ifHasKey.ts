/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  Container, 
  ContainerBlockKey, 
  IndexOf, 
  Narrowable
} from "src/types";
import { indexOf } from "src/runtime";

export const ifHasKey = <
  TContainer extends Container,
  TKey extends PropertyKey,
  IF extends Narrowable,
  ELSE extends Narrowable
>(
  container: TContainer, 
  key: TKey,
  hasKey: (val: IndexOf<TContainer, TKey>) => IF,
  doesNotHaveKey: <N extends ContainerBlockKey<TContainer, TKey>>(nonArr: N) => ELSE
) => (
  key in container 
  ? hasKey(indexOf(container, key))
  : doesNotHaveKey(container as ContainerBlockKey<TContainer, TKey>)
) as IfContains<Keys<TContainer>, TKey, IF, ELSE>;

